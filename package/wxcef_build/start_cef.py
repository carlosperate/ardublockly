#!/usr/bin/env python2
# -*- coding: utf-8 -*-
#
# Embedding Chromium Embedded Framework browser in a wxPython window to launch
# Ardublockly.
#
# Based on an example to from the CEF Python repository.
#   https://code.google.com/p/cefpython/source/browse/cefpython/cef3/windows/binaries_64bit/wxpython.py
#   Copyright (c) 2012-2014 The CEF Python authors. All rights reserved.
#   Website: http://code.google.com/p/cefpython/
#   New BSD license: 
#     https://code.google.com/p/cefpython/source/browse/cefpython/LICENSE.txt
# 
# Changes are copyright (c) 2015 carlosperate https://github.com/carlosperate/
#

# In Mac cefpython library must be the very first library imported. This is
# because CEF was compiled with the tcmalloc memory allocator which hooks
# globally and replaces the default malloc allocator. If memory was allocated
# using malloc and then freed using tcmalloc then this would result in random
# segmentation faults in an application. See Issue 155 which is to provide CEF
# builds on Mac with tcmalloc disabled:
# https://code.google.com/p/cefpython/issues/detail?id=155
try:
    from cefpython3 import cefpython
    import wx
    import wx.lib.agw.flatmenu as FM
except ImportError as e:
    print(e)
    raise SystemExit("You need to have cefpython3, and wx installed!")
import os
import re
import sys
import time
import codecs
import inspect
import platform
import traceback
try:
    from ardublocklyserver.server import start_server
except ImportError:
    file_dir = os.path.dirname(os.path.realpath(__file__))
    package_dir = os.path.dirname(os.path.dirname(file_dir))
    sys.path.insert(0, package_dir)
    from ardublocklyserver.server import start_server
    os.chdir(package_dir)

# Needed for packaging the application on self contained executable
__file__ = sys.argv[0]

# -----------------------------------------------------------------------------
# Globals

g_applicationSettings = None
g_browserSettings = None
g_countWindows = 0
g_ardutag = "[ardublockly] "
g_ardu_link = "http://localhost:8000/ardublockly/index.html"
g_platform_os = None

# Which method to use for message loop processing.
#   EVT_IDLE - wx application has priority
#   EVT_TIMER - cef browser has priority (default)
# It seems that Flash content behaves better when using a timer.
# Not sure if using EVT_IDLE is correct, it doesn't work on Linux,
# on Windows it works fine. See also the post by Robin Dunn:
# https://groups.google.com/d/msg/wxpython-users/hcNdMEx8u48/MD5Jgbm_k1kJ
USE_EVT_IDLE = False  # If False then Timer will be used

# -----------------------------------------------------------------------------


def GetApplicationPath(file_=None):
    # On Windows after downloading file and calling Browser.GoForward(),
    # current working directory is set to %UserProfile%.
    # Calling os.path.dirname(os.path.realpath(__file__))
    # returns for eg. "C:\Users\user\Downloads". A solution
    # is to cache path on first call.
    if not hasattr(GetApplicationPath, "dir"):
        if hasattr(sys, "frozen"):
            dir = os.path.dirname(sys.executable)
        elif "__file__" in globals():
            dir = os.path.dirname(os.path.realpath(__file__))
        else:
            dir = os.getcwd()
        GetApplicationPath.dir = dir
    # If file is None return current directory without trailing slash.
    if file_ is None:
        file_ = ""
    # Only when relative path.
    if not file_.startswith("/") and not file_.startswith("\\") and (
            not re.search(r"^[\w-]+:", file_)):
        path = GetApplicationPath.dir + os.sep + file_
        if g_platform_os == "windows":
            path = re.sub(r"[/\\]+", re.escape(os.sep), path)
        path = re.sub(r"[/\\]+$", "", path)
        return path
    return str(file_)


def ExceptHook(excType, excValue, traceObject):
    # This hook does the following: in case of exception write it to
    # the "error.log" file, display it to the console, shutdown CEF
    # and exit application immediately by ignoring "finally" (os._exit()).
    error_msg = "\n".join(traceback.format_exception(
        excType, excValue, traceObject))
    error_file = GetApplicationPath("cef_error.log")
    try:
        app_encoding = cefpython.g_applicationSettings["string_encoding"]
    except:
        app_encoding = "utf-8"
    if type(error_msg) == bytes:
        error_msg = error_msg.decode(encoding=app_encoding, errors="replace")
    try:
        with codecs.open(error_file, mode="a", encoding=app_encoding) as fp:
            fp.write("\n[%s] %s\n" % (
                    time.strftime("%Y-%m-%d %H:%M:%S"), error_msg))
    except:
        print(g_ardutag + "WARNING: failed writing to error file: %s" % (
              error_file))
    # Convert error message to ascii before printing, otherwise
    # you may get error like this:
    # | UnicodeEncodeError: 'charmap' codec can't encode characters
    error_msg = error_msg.encode("ascii", errors="replace")
    error_msg = error_msg.decode("ascii", errors="replace")
    print("\n"+error_msg+"\n")
    cefpython.QuitMessageLoop()
    cefpython.Shutdown()
    os._exit(1)


class MainFrame(wx.Frame):
    browser = None
    mainPanel = None

    def GetHandleForBrowser(self):
        if self.mainPanel:
            if g_platform_os == "linux":
                return self.mainPanel.GetGtkWidget()
            else:
                return self.mainPanel.GetHandle()
        else:
            if g_platform_os == "linux":
                return self.GetGtkWidget()
            else:
                return self.GetHandle()

    def __init__(self, url=None, popup=False):
        if popup:
            title = "Popup"
        else:
            title = "Ardublockly"
        wx.Frame.__init__(self, parent=None, id=wx.ID_ANY, title=title)
        size = (1250, 768)

        # This is an optional code to enable High DPI support.
        if (g_platform_os == "windows") \
                and ("auto_zooming" in g_applicationSettings) \
                and (g_applicationSettings["auto_zooming"] == "system_dpi"):
            # This utility function will adjust width/height using
            # OS DPI settings. For 800/600 with Win7 DPI settings
            # being set to "Larger 150%" will return 1200/900.
            size = cefpython.DpiAware.CalculateWindowSize(size[0], size[1])

        self.SetSize(size)

        # On mac the cefpython.Shutdown() has to be place in the onClose method.
        # So, the number of opened windows has to be tracked/
        if g_platform_os == "mac":
            global g_countWindows
            g_countWindows += 1

        if not url:
            url = g_ardu_link

        # Cannot attach browser to the main frame as the menu won't work.
        # Also have to set wx.WANTS_CHARS style for all parent panels/controls
        self.mainPanel = wx.Panel(self, style=wx.WANTS_CHARS)

        # Global client callbacks must be set before browser is created.
        self.clientHandler = ClientHandler()
        cefpython.SetGlobalClientCallback("OnCertificateError",
            self.clientHandler._OnCertificateError)
        cefpython.SetGlobalClientCallback("OnBeforePluginLoad",
            self.clientHandler._OnBeforePluginLoad)
        cefpython.SetGlobalClientCallback("OnAfterCreated",
            self.clientHandler._OnAfterCreated)

        windowInfo = cefpython.WindowInfo()
        (width, height) = self.mainPanel.GetClientSizeTuple()
        windowInfo.SetAsChild(self.GetHandleForBrowser(),
                              [0, 0, width, height])
        self.browser = cefpython.CreateBrowserSync(
            windowInfo,
            browserSettings=g_browserSettings,
            navigateUrl=url)

        self.clientHandler.mainBrowser = self.browser
        self.browser.SetClientHandler(self.clientHandler)

        jsBindings = cefpython.JavascriptBindings(
            bindToFrames=False, bindToPopups=True)
        jsBindings.SetFunction("PyPrint", PyPrint)
        jsBindings.SetProperty("pyProperty", "This was set in Python")
        jsBindings.SetProperty(
            "pyConfig",
            ["This was set in Python",
             {"name": "Nested dictionary", "isNested": True},
             [1, "2", None]])
        self.javascriptExternal = JavascriptExternal(self.browser)
        jsBindings.SetObject("external", self.javascriptExternal)
        self.browser.SetJavascriptBindings(jsBindings)

        self.mainPanel.Bind(wx.EVT_SET_FOCUS, self.OnSetFocus)
        self.mainPanel.Bind(wx.EVT_SIZE, self.OnSize)

        self.Bind(wx.EVT_CLOSE, self.OnClose)
        if USE_EVT_IDLE and not popup:
            # Bind EVT_IDLE only for the main application frame.
            print(g_ardutag +
                  "Using EVT_IDLE to execute the CEF message loop work")
            self.Bind(wx.EVT_IDLE, self.OnIdle)

        main_sizer = wx.BoxSizer(wx.VERTICAL)

        # Only add the menubar to the main application frame
        if not popup:
            self.CreateMenu()
            main_sizer.Add(self.menubar, proportion=0,
                           flag=wx.ALL|wx.ALIGN_TOP|wx.EXPAND, border=0)

        main_sizer.Add(self.mainPanel, proportion=1,
               flag=wx.ALL|wx.ALIGN_TOP|wx.EXPAND, border=0)
        self.SetSizer(main_sizer)
        main_sizer.Layout()

    def CreateMenu(self):
        # File menu
        filemenu = FM.FlatMenu()
        filemenu.Append(1, "Open", "Text", None)
        filemenu.Append(2, "Save As", "Text", None)
        exitItem = filemenu.Append(3, "Exit", "Text", None)
        self.Bind(wx.EVT_MENU, self.OnClose, exitItem)

        # Edit  menu
        editmenu = FM.FlatMenu()
        editmenu.Append(1, "Cut", "Text", wx.ITEM_NORMAL)
        editmenu.Append(2, "Copy", "Text", wx.ITEM_NORMAL)
        editmenu.Append(3, "Paste", "Text", wx.ITEM_NORMAL)
        editmenu.Append(4, "Delete", "Text", wx.ITEM_NORMAL)
        editmenu.Append(5, "Delete All", "Text", wx.ITEM_NORMAL)

        # Tools menu
        toolsmenu = FM.FlatMenu()
        toolsmenu.Append(1, "Verify Program", "Text", wx.ITEM_NORMAL)
        toolsmenu.Append(2, "Open code in Arduino IDE", "Text", wx.ITEM_NORMAL)
        toolsmenu.Append(3, "Upload to Arduino Board", "Text", wx.ITEM_NORMAL)
        toolsmenu.Append(4, "Open Command Line", "Text", wx.ITEM_NORMAL)
        toolsmenu.Append(5, "Settings", "Text", wx.ITEM_NORMAL)

        # Examples menu
        examplesmenu = FM.FlatMenu()
        examplesmenu.Append(1, "Example 1", "Text", wx.ITEM_NORMAL)
        examplesmenu.Append(2, "Example 2", "Text", wx.ITEM_NORMAL)
        examplesmenu.Append(3, "Example 3", "Text", wx.ITEM_NORMAL)
        examplesmenu.Append(4, "Example 4", "Text", wx.ITEM_NORMAL)
        examplesmenu.Append(5, "Example 5", "Text", wx.ITEM_NORMAL)

        # About menu
        aboutmenu = FM.FlatMenu()
        aboutmenu.Append(1, "About Ardublockly", "Text", wx.ITEM_NORMAL)

        # Adding menubar
        self.menubar = FM.FlatMenuBar(self, id=wx.ID_ANY,
                                      iconSize=FM.SmallIcons, spacer=4)
        self.menubar.SetBackgroundColour(wx.Colour(0x00, 0x87, 0x8F, 0xFF))
        self.menubar.ShowCustomize(False)
        self.menubar.SetMargin(4)
        self.menubar.SetToolbarMargin(0)
        self.menubar.SetBarHeight()
        self.menubar.Append(filemenu,"&File")
        self.menubar.Append(editmenu,"&Edit")
        self.menubar.Append(toolsmenu,"&Tools")
        self.menubar.Append(examplesmenu,"&Examples")
        self.menubar.Append(aboutmenu, "&About")
        self.menubar.SetBarHeight()

    def OnSetFocus(self, event):
        if g_platform_os == "windows":
            cefpython.WindowUtils.OnSetFocus(self.GetHandleForBrowser(), 0, 0, 0)

    def OnSize(self, event):
        if g_platform_os == "windows":
            cefpython.WindowUtils.OnSize(self.GetHandleForBrowser(), 0, 0, 0)

    def OnClose(self, event):
        # Remove all CEF browser references so that browser is closed
        # cleanly. Otherwise there may be issues for example with cookies
        # not being flushed to disk when closing app immediately
        # (Issue 158).
        del self.javascriptExternal.mainBrowser
        del self.clientHandler.mainBrowser
        del self.browser

        # Destroy wx frame, this will complete the destruction of CEF browser
        self.Destroy()

        # In wx.chromectrl calling browser.CloseBrowser and/or self.Destroy
        # may cause crashes when embedding multiple browsers in tab
        # (Issue 107). In such case instead of calling CloseBrowser/Destroy
        # try this code:
        # | self.browser.ParentWindowWillClose()
        # | event.Skip()

        # On Win/Linux the call to cefpython.Shutdown() is after app.MainLoop()
        # returns, but on Mac it needs to be here.
        if g_platform_os == "mac":
            global g_countWindows
            g_countWindows -= 1
            if g_countWindows == 0:
                cefpython.Shutdown()
                print(g_ardutag + "OnClose: Exiting")
                wx.GetApp().Exit()

    def OnIdle(self, event):
        cefpython.MessageLoopWork()


def PyPrint(message):
    print(g_ardutag + "PyPrint: " + message)


class JavascriptExternal:
    mainBrowser = None
    stringVisitor = None

    def __init__(self, mainBrowser):
        self.mainBrowser = mainBrowser

    def GoBack(self):
        self.mainBrowser.GoBack()

    def GoForward(self):
        self.mainBrowser.GoForward()

    def SetZoomLevel(self, zoomLevel):
        self.mainBrowser.SetZoomLevel(zoomLevel)

    def CreateAnotherBrowser(self, url=None):
        frame = MainFrame(url=url)
        frame.Show()

    def Print(self, message):
        print(g_ardutag + "Print: " + message)

    def TestAllTypes(self, *args):
        print(g_ardutag + "TestAllTypes: " + str(args))

    def ExecuteFunction(self, *args):
        if g_platform_os == "windows":
            self.mainBrowser.ExecuteFunction(*args)
        else:
            self.mainBrowser.GetMainFrame().ExecuteFunction(*args)

    def TestJSCallback(self, jsCallback):
        print(g_ardutag + "jsCallback.GetFunctionName() = %s" %
              jsCallback.GetFunctionName())
        print(g_ardutag + "jsCallback.GetFrame().GetIdentifier() = %s" %
              jsCallback.GetFrame().GetIdentifier())
        jsCallback.Call("This message was sent from python using js callback")

    def TestJSCallbackComplexArguments(self, jsObject):
        jsCallback = jsObject["myCallback"]
        jsCallback.Call(
            1, None, 2.14, "string", ["list", ["nested list",
                                               {"nested object": None}]],
            {"nested list next": [{"deeply nested object": 1}]})

    def TestPythonCallback(self, jsCallback):
        jsCallback.Call(self.PyCallback)

    def PyCallback(self, *args):
        message = "PyCallback() was executed successfully! " \
                  "Arguments: %s" % str(args)
        print(g_ardutag + ""+message)
        self.mainBrowser.GetMainFrame().ExecuteJavascript(
            "window.alert(\"%s\")" % message)

    def GetSource(self):
        # Must keep a strong reference to the StringVisitor object
        # during the visit.
        self.stringVisitor = StringVisitor()
        self.mainBrowser.GetMainFrame().GetSource(self.stringVisitor)

    def GetText(self):
        # Must keep a strong reference to the StringVisitor object
        # during the visit.
        self.stringVisitor = StringVisitor()
        self.mainBrowser.GetMainFrame().GetText(self.stringVisitor)

    def ShowDevTools(self):
        print(g_ardutag + "external.ShowDevTools called")
        self.mainBrowser.ShowDevTools()

    # -------------------------------------------------------------------------
    # Cookies
    # -------------------------------------------------------------------------
    cookieVisitor = None

    def VisitAllCookies(self):
        # Need to keep the reference alive.
        self.cookieVisitor = CookieVisitor()
        cookieManager = self.mainBrowser.GetUserData("cookieManager")
        if not cookieManager:
            print(g_ardutag + "Cookie manager not yet created! Visit "
                  "the cookietester website first and create some cookies")
            return
        cookieManager.VisitAllCookies(self.cookieVisitor)

    def VisitUrlCookies(self):
        # Need to keep the reference alive.
        self.cookieVisitor = CookieVisitor()
        cookieManager = self.mainBrowser.GetUserData("cookieManager")
        if not cookieManager:
            print(g_ardutag + "Cookie manager not yet created! Visit "
                  "the cookietester website first and create some cookies")
            return
        cookieManager.VisitUrlCookies(
            "http://www.html-kit.com/tools/cookietester/",
            False, self.cookieVisitor)
        # .www.html-kit.com

    def SetCookie(self):
        cookieManager = self.mainBrowser.GetUserData("cookieManager")
        if not cookieManager:
            print(g_ardutag + "Cookie manager not yet created! Visit "
                  "the cookietester website first and create some cookies")
            return
        cookie = cefpython.Cookie()
        cookie.SetName("Created_Via_Python")
        cookie.SetValue("yeah really")
        cookieManager.SetCookie("http://www.html-kit.com/tools/cookietester/",
                cookie)
        print(g_ardutag + "Cookie created! Visit html-kit cookietester to "
              "see it")

    def DeleteCookies(self):
        cookieManager = self.mainBrowser.GetUserData("cookieManager")
        if not cookieManager:
            print(g_ardutag + "Cookie manager not yet created! Visit "
                  "the cookietester website first and create some cookies")
            return
        cookieManager.DeleteCookies(
            "http://www.html-kit.com/tools/cookietester/",
            "Created_Via_Python")
        print(g_ardutag + "Cookie deleted! Visit html-kit cookietester "
              "to see the result")


class StringVisitor:
    def Visit(self, string):
        print(g_ardutag + "StringVisitor.Visit(): string:")
        print("--------------------------------")
        print(string)
        print("--------------------------------")


class CookieVisitor:
    def Visit(self, cookie, count, total, deleteCookie):
        if count == 0:
            print(g_ardutag + "CookieVisitor.Visit(): total cookies: %s" %
                  total)
        print(g_ardutag + "CookieVisitor.Visit(): cookie:")
        print("    " + str(cookie.Get()))
        # True to continue visiting cookies
        return True


class ClientHandler:
    mainBrowser = None  # May be None for global client callbacks.

    def __init__(self):
        pass

    # -------------------------------------------------------------------------
    # DisplayHandler
    # -------------------------------------------------------------------------
    def OnAddressChange(self, browser, frame, url):
        print(g_ardutag + "DisplayHandler::OnAddressChange()")
        print("    url = %s" % url)

    statusMessageCount = 0

    def OnStatusMessage(self, browser, value):
        if not value:
            # Do not notify in the console about empty statuses.
            return
        self.statusMessageCount += 1
        if self.statusMessageCount > 3:
            # Do not spam too much.
            return
        print(g_ardutag + "DisplayHandler::OnStatusMessage()")
        print("    value = %s" % value)

    def OnConsoleMessage(self, browser, message, source, line):
        print(g_ardutag + "DisplayHandler::OnConsoleMessage()")
        print("    message = %s" % message)
        print("    source = %s" % source)
        print("    line = %s" % line)

    # onKeyEvent removed to avoid users using common browser key commands

    # -------------------------------------------------------------------------
    # RequestHandler
    # -------------------------------------------------------------------------
    def OnBeforeBrowse(self, browser, frame, request, isRedirect):
        print(g_ardutag + "RequestHandler::OnBeforeBrowse()")
        print("    url = %s" % request.GetUrl()[:100])
        return False

    def OnBeforeResourceLoad(self, browser, frame, request):
        #print(g_ardutag + "RequestHandler::OnBeforeResourceLoad()")
        #print("    url = %s" % request.GetUrl()[:100])
        #return False
        pass

    def OnResourceRedirect(self, browser, frame, oldUrl, newUrlOut):
        print(g_ardutag + "RequestHandler::OnResourceRedirect()")
        print("    old url = %s" % oldUrl[:100])
        print("    new url = %s" % newUrlOut[0][:100])

    def GetAuthCredentials(self, browser, frame, isProxy, host, port, realm,
            scheme, callback):
        # This callback is called on the IO thread, thus print messages
        # may not be visible.
        print(g_ardutag + "RequestHandler::GetAuthCredentials()")
        print("    host = %s" % host)
        print("    realm = %s" % realm)
        callback.Continue(username="test", password="test")
        return True

    def OnQuotaRequest(self, browser, originUrl, newSize, callback):
        print(g_ardutag + "RequestHandler::OnQuotaRequest()")
        print("    origin url = %s" % originUrl)
        print("    new size = %s" % newSize)
        callback.Continue(True)
        return True

    def GetCookieManager(self, browser, mainUrl):
        # Create unique cookie manager for each browser.
        # You must set the "unique_request_context_per_browser"
        # application setting to True for the cookie manager
        # to work.
        # Return None to have one global cookie manager for
        # all CEF browsers.
        if not browser:
            # The browser param may be empty in some exceptional
            # case, see docs.
            return None
        cookieManager = browser.GetUserData("cookieManager")
        if cookieManager:
            return cookieManager
        else:
            print(g_ardutag + "RequestHandler::GetCookieManager():"\
                    " created cookie manager")
            cookieManager = cefpython.CookieManager.CreateManager("")
            if "cache_path" in g_applicationSettings:
                path = g_applicationSettings["cache_path"]
                # path = os.path.join(path, "cookies_browser_{}".format(
                #     browser.GetIdentifier()))
                cookieManager.SetStoragePath(path)
            browser.SetUserData("cookieManager", cookieManager)
            return cookieManager

    def OnProtocolExecution(self, browser, url, allowExecutionOut):
        # There's no default implementation for OnProtocolExecution on Linux,
        # you have to make OS system call on your own. You probably also need
        # to use LoadHandler::OnLoadError() when implementing this on Linux.
        print(g_ardutag + "RequestHandler::OnProtocolExecution()")
        print("    url = %s" % url)
        if url.startswith("magnet:"):
            print(g_ardutag + "Magnet link allowed!")
            allowExecutionOut[0] = True

    def _OnBeforePluginLoad(self, browser, url, policyUrl, info):
        # This is a global callback set using SetGlobalClientCallback().
        # Plugins are loaded on demand, only when website requires it,
        # the same plugin may be called multiple times.
        # This callback is called on the IO thread, thus print messages
        # may not be visible.
        print(g_ardutag + "RequestHandler::_OnBeforePluginLoad()")
        print("    url = %s" % url)
        print("    policy url = %s" % policyUrl)
        print("    info.GetName() = %s" % info.GetName())
        print("    info.GetPath() = %s" % info.GetPath())
        print("    info.GetVersion() = %s" % info.GetVersion())
        print("    info.GetDescription() = %s" % info.GetDescription())
        # False to allow, True to block plugin.
        return False

    def _OnCertificateError(self, certError, requestUrl, callback):
        # This is a global callback set using SetGlobalClientCallback().
        print(g_ardutag + "RequestHandler::_OnCertificateError()")
        print("    certError = %s" % certError)
        print("    requestUrl = %s" % requestUrl)
        if requestUrl == "https://testssl-expire.disig.sk/index.en.html":
            print("    Not allowed!")
            return False
        if requestUrl \
                == "https://testssl-expire.disig.sk/index.en.html?allow=1":
            print("    Allowed!")
            callback.Continue(True)
            return True
        return False

    def OnRendererProcessTerminated(self, browser, status):
        print(g_ardutag + "RequestHandler::OnRendererProcessTerminated()")
        statuses = {
            cefpython.TS_ABNORMAL_TERMINATION: "TS_ABNORMAL_TERMINATION",
            cefpython.TS_PROCESS_WAS_KILLED: "TS_PROCESS_WAS_KILLED",
            cefpython.TS_PROCESS_CRASHED: "TS_PROCESS_CRASHED"
        }
        statusName = "Unknown"
        if status in statuses:
            statusName = statuses[status]
        print("    status = %s" % statusName)

    def OnPluginCrashed(self, browser, pluginPath):
        print(g_ardutag + "RequestHandler::OnPluginCrashed()")
        print("    plugin path = %s" % pluginPath)

    # -------------------------------------------------------------------------
    # LoadHandler
    # -------------------------------------------------------------------------
    def OnLoadingStateChange(self, browser, isLoading, canGoBack,
            canGoForward):
        print(g_ardutag + "LoadHandler::OnLoadingStateChange()")
        print("    isLoading = %s, canGoBack = %s, canGoForward = %s" %
              (isLoading, canGoBack, canGoForward))

    def OnLoadStart(self, browser, frame):
        print(g_ardutag + "LoadHandler::OnLoadStart()")
        print("    frame url = %s" % frame.GetUrl()[:100])

    def OnLoadEnd(self, browser, frame, httpStatusCode):
        print(g_ardutag + "LoadHandler::OnLoadEnd()")
        print("    frame url = %s" % frame.GetUrl()[:100])
        # For file:// urls the status code = 0
        print("    http status code = %s" % httpStatusCode)
        # Tests for the Browser object methods
        self._Browser_LoadUrl(browser)

    def _Browser_LoadUrl(self, browser):
        if browser.GetUrl() == "data:text/html,Test#Browser.LoadUrl":
             browser.LoadUrl(g_ardu_link)

    def OnLoadError(self, browser, frame, errorCode, errorTextList, failedUrl):
        print(g_ardutag + "LoadHandler::OnLoadError()")
        print("    frame url = %s" % frame.GetUrl()[:100])
        print("    error code = %s" % errorCode)
        print("    error text = %s" % errorTextList[0])
        print("    failed url = %s" % failedUrl)
        # Handle ERR_ABORTED error code, to handle the following cases:
        # 1. Esc key was pressed which calls browser.StopLoad() in OnKeyEvent
        # 2. Download of a file was aborted
        # 3. Certificate error
        if errorCode == cefpython.ERR_ABORTED:
            print(g_ardutag + "LoadHandler::OnLoadError(): Ignoring load "
                  "error: Esc was pressed or file download was aborted, "
                  "or there was certificate error")
            return
        customErrorMessage = "My custom error message!"
        frame.LoadUrl("data:text/html,%s" % customErrorMessage)

    # -------------------------------------------------------------------------
    # LifespanHandler
    # -------------------------------------------------------------------------
    # ** This callback is executed on the IO thread **
    # Empty place-holders: popupFeatures, client.
    def OnBeforePopup(self, browser, frame, targetUrl, targetFrameName,
                      popupFeatures, windowInfo, client, browserSettings,
                      noJavascriptAccess):
        print(g_ardutag + "LifespanHandler::OnBeforePopup()")
        print("    targetUrl = %s" % targetUrl)

        # Set WindowInfo object:
        # > windowInfo[0] = cefpython.WindowInfo()

        # On Windows there are keyboard problems in popups in wxPython, when
        # popup is created using "window.open" or "target=blank".
        # The solution is to create window explicitly, and not depend
        # on CEF to create window internally. See Issue 80 for details:
        # https://code.google.com/p/cefpython/issues/detail?id=80
        #
        # If you set allowPopups=True then CEF will create popup window.
        # The wx.Frame cannot be created here, as this callback is executed on
        # the IO thread. Window should be created on the UI thread.
        # One solution is to call cefpython.CreateBrowser() which runs
        # asynchronously and can be called on any thread.
        # The other solution is to post a task on the UI thread, so that
        # cefpython.CreateBrowserSync() can be used.
        cefpython.PostTask(cefpython.TID_UI, self._CreatePopup, targetUrl)
        allowPopups = False
        return not allowPopups

    def _CreatePopup(self, url):
        frame = MainFrame(url=url, popup=True)
        frame.Show()

    def _OnAfterCreated(self, browser):
        # This is a global callback set using SetGlobalClientCallback().
        print(g_ardutag + "LifespanHandler::_OnAfterCreated()")
        print("    browserId=%s" % browser.GetIdentifier())

    def RunModal(self, browser):
        print(g_ardutag + "LifespanHandler::RunModal()")
        print("    browserId=%s" % browser.GetIdentifier())

    def DoClose(self, browser):
        print(g_ardutag + "LifespanHandler::DoClose()")
        print("    browserId=%s" % browser.GetIdentifier())

    def OnBeforeClose(self, browser):
        print(g_ardutag + "LifespanHandler::OnBeforeClose")
        print("    browserId=%s" % browser.GetIdentifier())

    # -------------------------------------------------------------------------
    # JavascriptDialogHandler
    # -------------------------------------------------------------------------
    def OnJavascriptDialog(self, browser, originUrl, acceptLang, dialogType,
                           messageText, defaultPromptText, callback,
                           suppressMessage):
        print(g_ardutag + "JavascriptDialogHandler::OnJavascriptDialog()")
        print("    originUrl="+originUrl)
        print("    acceptLang="+acceptLang)
        print("    dialogType="+str(dialogType))
        print("    messageText="+messageText)
        print("    defaultPromptText="+defaultPromptText)
        # If you want to suppress the javascript dialog:
        # suppressMessage[0] = True
        return False

    def OnBeforeUnloadJavascriptDialog(self, browser, messageText, isReload,
            callback):
        print(g_ardutag + "OnBeforeUnloadJavascriptDialog()")
        print("    messageText="+messageText)
        print("    isReload="+str(isReload))
        # Return True if the application will use a custom dialog:
        #   callback.Continue(allow=True, userInput="")
        #   return True
        return False

    def OnResetJavascriptDialogState(self, browser):
        print(g_ardutag + "OnResetDialogState()")

    def OnJavascriptDialogClosed(self, browser):
        print(g_ardutag + "OnDialogClosed()")


class ArdublocklyApp(wx.App):
    timer = None
    timerID = 1
    mainFrame = None

    def OnInit(self):
        if not USE_EVT_IDLE:
            print(g_ardutag + "Using TIMER to run CEF message loop")
            self.CreateTimer()
        self.mainFrame = MainFrame()
        self.SetTopWindow(self.mainFrame)
        self.mainFrame.Center()
        self.mainFrame.Show()
        return True

    def show(self):
        self.mainFrame.Show()

    def CreateTimer(self):
        # See "Making a render loop":
        # http://wiki.wxwidgets.org/Making_a_render_loop
        # Timer alternative to  EVT_IDLE in MainFrame.
        self.timer = wx.Timer(self, self.timerID)
        self.timer.Start(10)  # 10ms
        wx.EVT_TIMER(self, self.timerID, self.OnTimer)

    def OnTimer(self, event):
        cefpython.MessageLoopWork()

    def OnExit(self):
        # When app.MainLoop() returns, MessageLoopWork() should
        # not be called anymore.
        print(g_ardutag + "ArdublocklyApp.OnExit")
        if not USE_EVT_IDLE:
            self.timer.Stop()


def cef_init():
    # Browser settings. Individual settings per browser in CreateBrowserSync.
    # https://code.google.com/p/cefpython/wiki/BrowserSettings
    global g_browserSettings
    g_browserSettings = {
        "plugins_disabled": True,
        "file_access_from_file_urls_allowed": True,
        "universal_access_from_file_urls_allowed": True,
        "java_disabled": True,
        "local_storage_disabled": False
    }

    # Application settings
    # https://code.google.com/p/cefpython/wiki/ApplicationSettings
    global g_applicationSettings
    g_applicationSettings = {
        "browser_subprocess_path": "%s%s%s" % (
            cefpython.GetModuleDirectory(), os.sep, "subprocess"),
        "cache_path": "webcache" + os.sep,
        "context_menu": {"enabled": True,
                         "navigation": True,        # Back, Forward, Reload
                         "print": False,
                         "view_source": False,
                         "external_browser": True,  # Open in external browser
                         "devtools": True},         # Developer Tools
        "downloads_enabled": True,
        "ignore_certificate_errors": True,

        "debug": True,
        "log_file": GetApplicationPath("cef_debug.log"),
        "log_severity": cefpython.LOGSEVERITY_INFO,
        "release_dcheck_enabled": False,
        "remote_debugging_port": 0,

        "unique_request_context_per_browser": True,
        "auto_zooming": "system_dpi"
    }

    # "resources_dir_path" must be set on Mac, "locales_dir_path" not.
    if g_platform_os == "mac":
        g_applicationSettings["resources_dir_path"] = \
            cefpython.GetModuleDirectory() + os.sep + "Resources"
    else:
        g_applicationSettings["resources_dir_path"] = \
            cefpython.GetModuleDirectory()
        g_applicationSettings["locales_dir_path"] = \
            cefpython.GetModuleDirectory() + os.sep + "locales"

    # High DPI support is available only on Windows.
    # Example values for auto_zooming are:
    #   "system_dpi", "0.0" (96 DPI), "1.0" (120 DPI),
    #   "2.0" (144 DPI), "-1.0" (72 DPI)
    # Numeric value means a zoom level.
    # Example values that can be set in Win7 DPI settings:
    #   Smaller 100% (Default) = 96 DPI = 0.0 zoom level
    #   Medium 125% = 120 DPI = 1.0 zoom level
    #   Larger 150% = 144 DPI = 2.0 zoom level
    #   Custom 75% = 72 DPI = -1.0 zoom level
    if g_platform_os == "windows":
        #g_applicationSettings["auto_zooming"] = "system_dpi"
        print(g_ardutag + "Calling SetProcessDpiAware")
        cefpython.DpiAware.SetProcessDpiAware()

    # Command line switches set programmatically
    # https://code.google.com/p/cefpython/wiki/CommandLineSwitches
    g_commandLineSwitches = {
        "enable-media-stream": "",
        "no-proxy-server": "",
        #"disable-remote-fonts": False,
        "disable-gpu" : "",
    }
    # On Mac it is required to provide path to a specific locale.pak file.
    # On Win/Linux you only specify the ApplicationSettings.locales_dir_path.
    if g_platform_os == "mac":
        g_commandLineSwitches["locale_pak"] = cefpython.GetModuleDirectory() + \
            "/Resources/en.lproj/locale.pak"

    cefpython.Initialize(g_applicationSettings, g_commandLineSwitches)


def splash_screen():
    import wx.lib.agw.advancedsplash as AS
    image_path = "ardublockly/img/ardublockly_splash.png"
    bitmap = wx.Bitmap(image_path, wx.BITMAP_TYPE_PNG)
    shadow = wx.WHITE
    splash = AS.AdvancedSplash(
        None, bitmap=bitmap, timeout=5000, shadowcolour=shadow,
        agwStyle=AS.AS_TIMEOUT | AS.AS_CENTER_ON_PARENT | AS.AS_SHADOW_BITMAP)


def launch_server(server_root):
    """ Launches the ArdublocklyServer. """
    import threading
    if server_root is not None:
        root_location = os.path.realpath(server_root)
    else:
        root_location = os.path.dirname(os.path.realpath(sys.argv[0]))
    thread = threading.Thread(
        target=start_server, kwargs={"document_root": root_location})
    thread.daemon = True
    print("\n======= Starting Server =======")
    thread.start()


def detect_os():
    """
    Detects the Operating System and sets a global variable to target OS
    specific features to the right platform.
    Options for g_platform_os are: win, lin, mac
    """
    global g_platform_os
    os = platform.system()
    if os == "Windows":
        g_platform_os = "windows"
    elif os == "Linux":
        g_platform_os = "linux"
    elif os == "Darwin":
        g_platform_os = "mac"


def main(argv):
    detect_os()
    print(g_ardutag + "OS: %s" % g_platform_os)
    print(g_ardutag + "Python version: %s" % platform.python_version())
    print(g_ardutag + "wx.version: %s" % wx.version())
    print(g_ardutag + "cefpython GetModuleDirectory: %s" % cefpython.GetModuleDirectory())

    # Intercept python exceptions. Exit app immediately when exception
    # happens on any of the threads.
    sys.excepthook = ExceptHook

    # Checking command line arguments
    server_root = None
    if len(argv) > 0:
        print("\n======= Parsing Command line arguments =======")
        # Windows only issue: In BlocklyRequestHandler, if chdir is fed an
        # 'incorrect' path like 'C:' instead of 'C:\' or C:/' it fails silently
        # maintaining the current working directory. Use regular expressions
        # to catch this corner case.
        if re.match("^[a-zA-Z]:$", argv[0]):
            print('The windows drive letter needs to end in a slash, ' +
                  'eg. %s\\' % arg)
            sys.exit(1)
        # Check if the value is a valid directory
        if os.path.isdir(argv[0]):
            print("Server root will be set to: %s" % argv[0])
            server_root = argv[0]
        else:
            print('Invalid directory: %s ' % argv[0])
            sys.exit(1)

    # Initialise the chromium embedded framework
    cef_init()

    # Launch ArdublocklyServer
    launch_server(server_root)

    # Launch CEF application
    app = ArdublocklyApp(False)
    #splash_screen()
    app.MainLoop()

    # Let wx.App destructor do the cleanup before calling cefpython.Shutdown().
    # This is to ensure reliable CEF shutdown.
    del app

    # On Mac cefpython.Shutdown() is called in MainFrame.OnClose,
    # followed by wx.GetApp.Exit().
    if g_platform_os != "mac":
        print(g_ardutag + "End of main: Exiting")
        cefpython.Shutdown()


if __name__ == '__main__':
    main(sys.argv[1:])

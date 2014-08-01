#!/usr/bin/env python2
# ##############################################################################
# The comment above works if the Python Launcher for Windows path included
# in Python>3.3 does not conflict with the py.exe file added to "C:\Windows"
# Currently this application should work in Python >2.6 and 3.x, although 
# python 2 is prefered, as it is the main development platform. 
###############################################################################
from __future__ import unicode_literals, absolute_import
import os
import platform
import threading
import webbrowser
import ArduinoServerCompiler.ServerCompilerSettings
import ArduinoServerCompiler.BlocklyHTTPServer


def open_browser(filetoload):
    """ Start a browser after waiting for half a second. """

    def _open_browser():
        webbrowser.open('http://%s:%s/%s' %
                        (ArduinoServerCompiler.BlocklyHTTPServer.ADDRESS,
                        ArduinoServerCompiler.BlocklyHTTPServer.PORT,
                        filetoload))

    thread = threading.Timer(0.5, _open_browser)
    thread.start()


def main():
    """
    Initialises the Settings singleton and starts the HTTP Server
    """
    print('Running Python version ' + platform.python_version())
    print("\n======= Loading Settings =======")
    ArduinoServerCompiler.ServerCompilerSettings.ServerCompilerSettings()
    current_dir = os.getcwd()
    app_index = os.path.basename(os.path.normpath(current_dir))
    app_index = os.path.join(app_index, 'apps', 'arduino')
    open_browser(app_index)
    print("\n======= Starting Server =======")
    #parent directory as working directory due to closure requirements
    parent_dir = os.path.dirname(os.getcwd())
    ArduinoServerCompiler.BlocklyHTTPServer.start_server(parent_dir)


if __name__ == "__main__":
    main()

/**
 * @author    carlosperate
 * @copyright 2015 carlosperate https://github.com/carlosperate
 * @license   Licensed under the The MIT License (MIT), a copy can be found in
 *            the electron project directory LICENSE file.
 *
 * @fileoverview Electron entry point continues here. Creates windows and
 *               handles system events.
 */
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const appMenu = require('./appmenu.js');
const server = require('./servermgr.js');
const projectLocator = require('./projectlocator.js');
const createWindow = require('./helpers/window');

const winston = require('winston');
const packageData = require('fs-jetpack').cwd(app.getAppPath()).read('package.json', 'json');

const tag = '[ArdublocklyElec] ';

// Global reference of the window object must be maintain, or the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
var splashWindow = null;

// Set up the app data directory within the Ardublockly root directory
(function setAppData() {
    var appDataPath = projectLocator.getExecDirJetpack().cwd('appdata');
    app.setPath('appData', appDataPath.path());
    app.setPath('userData', appDataPath.path());
    app.setPath('cache', appDataPath.path('GenCache'));
    app.setPath('userCache', appDataPath.path('AppCache'));
    app.setPath('temp', appDataPath.path('temp'));
})();

// Ensure this is a single instance application
const shouldQuit = app.makeSingleInstance(function(cmdLine, workingDirectory) {
  // User tried to run a second instance, focus existing window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

// Electron application entry point
app.on('ready', function() {
    if (shouldQuit) {
      app.quit();
      return;
    }

    setupLogging();
    createSplashWindow();
    server.startServer();

    mainWindow = createWindow('main', {
        width: 1200,
        height: 765,
        title: 'Ardublockly',
        transparent: false,
        backgroundColor: '#EEEEEE',
        frame: true,
        show: false,
        'webPreferences': {
            'nodeIntegration': true,
            'webSecurity': true,
            'allowDisplayingInsecureContent': false,
            'allowRunningInsecureContent': false,
            'java': false,
            'webgl': false,
            'webaudio': true,
            'plugins': false,
            'experimentalFeatures': false,
            'experimentalCanvasFeatures': false,
            'overlayScrollbars': true,
            'textAreasAreResizable': false,
            'directWrite': true
        }
    });

    if (packageData.env.name === 'development') {
        appMenu.setArdublocklyMenu(true);
    } else {
        appMenu.setArdublocklyMenu();
    }

    mainWindow.webContents.on('did-fail-load',
        function(event, errorCode, errorDescription) {
            winston.warn(tag + 'Page failed to load (' + errorCode + '). The ' +
                'server is probably not yet running. Trying again in 200 ms.');
            setTimeout(function() {
                mainWindow.webContents.reload();
            }, 350);
        }
    );

    mainWindow.webContents.on('did-finish-load', function() {
        if (splashWindow !== null) {
            splashWindow.close();
            splashWindow = null;
        }
        mainWindow.show();
    });

    mainWindow.on('close', function() {
        mainWindow = null;
    });

    // Set the download directory to the home folder
    mainWindow.webContents.session.setDownloadPath(
        process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']);

    mainWindow.loadURL('http://localhost:8000/ardublockly');
});

app.on('window-all-closed', function() {
    server.stopServer();
    app.quit();
});

function createSplashWindow() {
    if (splashWindow === null) {
        var projectJetPath = projectLocator.getProjectRootJetpack();
        var imagePath = 'file://' + projectJetPath.path(
            'ardublockly', 'img', 'ardublockly_splash.png');

        splashWindow = new BrowserWindow({
            width: 450,
            height: 300,
            frame: false,
            show: true,
            transparent: true,
            images: true,
            center: true,
            'alwaysOnTop': true,
            'skipTaskbar': true,
            'useContentSize': true
        });
        splashWindow.loadURL(imagePath);
    }
}

function setupLogging() {
    var projectRootPath = projectLocator.getProjectRootPath();
    winston.add(winston.transports.File, {
        json: false,
        filename: projectRootPath + '/ardublockly.log',
        maxsize: 10485760,
        maxFiles: 2
    });
    winston.info(tag + 'Starting Ardublockly version: ' + packageData.version);
    winston.info(tag + 'Ardublockly root dir: ' + projectRootPath);

    // Relevant OS could be win32, linux, darwin
    winston.info(tag + 'OS detected: ' + process.platform);
}

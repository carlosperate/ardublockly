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

const winston = require('winston');

const appMenu = require('./appmenu.js');
const server = require('./servermgr.js');
const projectLocator = require('./projectlocator.js');
const windowStateKeeper = require('./vendor/electron_boilerplate/window_state');
const env = require('fs-jetpack').cwd(app.getAppPath()).read('package.json', 'json').env;

const tag = '[Ardublockly Electron] ';

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

// Preserver of the window size and position between app launches.
var mainWindowState = windowStateKeeper('main', {
    width: 1200,
    height: 765
});

// Electron application entry point
app.on('ready', function() {
    createSplashWindow();

    // Setting up logging system
    var projectRootPath = projectLocator.getProjectRootPath();
    winston.add(winston.transports.File, {
        json: false,
        filename: projectRootPath + '/ardublockly.log',
        maxsize: 10485760,
        maxFiles: 2
    });
    winston.info(tag + 'Ardublockly root dir: ' + projectRootPath);

    // Relevant OS could be win32, linux, darwin
    winston.info(tag + 'OS detected: ' + process.platform);

    server.startServer();

    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        title: 'Ardublockly',
        transparent: false,
        frame: true,
        show: false,
        'web-preferences': {
            'node-integration': true,
            'web-security': true,
            'allow-displaying-insecure-content': false,
            'allow-running-insecure-content': false,
            'java': false,
            'webgl': false,
            'webaudio': true,
            'plugins': false,
            'overlay-scrollbars': true,
            'text-areas-are-resizable': false,
            'subpixel-font-scaling': true,
            'direct-write': true
        }
    });
    if (mainWindowState.isMaximized) {
        mainWindow.maximize();
    }

    if (env.name === 'development') {
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
            }, 200);
        }
    );

    mainWindow.webContents.on('did-finish-load', function() {
        if (splashWindow !== null) {
            splashWindow.close();
            splashWindow = null;
        }
        mainWindow.show();
    });

    // Set the download directory to the home folder
    mainWindow.webContents.session.setDownloadPath(
        process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']);

    mainWindow.loadURL('http://localhost:8000/ardublockly');

    mainWindow.on('close', function() {
        mainWindowState.saveState(mainWindow);
        mainWindow = null;
    });
});

app.on('window-all-closed', function() {
    server.stopServer();
    // Might need to add OS X exception
    // https://github.com/atom/electron/issues/1357
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
            'always-on-top': true,
            'skip-taskbar': true,
            'use-content-size': true
        });
        splashWindow.loadURL(imagePath);
    }
}

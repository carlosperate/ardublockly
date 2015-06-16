'use strict';

var app = require('app');
var appMenu = require('./appmenu.js');
var BrowserWindow = require('browser-window');
var env = require('./vendor/electron_boilerplate/env_config');
var windowStateKeeper = require('./vendor/electron_boilerplate/window_state');


// Global reference of the window object must be maintain, or the window will
// be closed automatically when the javascript object is garbage collected.
var mainWindow = null;

// Preserver of the window size and position between app launches.
var mainWindowState = windowStateKeeper('main', {
    width: 1200,
    height: 765
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        title: 'Ardublockly',
        type: 'desktop',
        'node-integration': false,
        'web-preferences': {
            'web-security': true,
            'java': false,
            'text-areas-are-resizable': false,
            'webgl': false,
            'webaudio': true,
            'plugins': false
        }
    });

    if (mainWindowState.isMaximized) {
        mainWindow.maximize();
    }

    if (env.name === 'development') {
        appMenu.setArdublocklyMenu(true);
        mainWindow.openDevTools();
    } else {
        appMenu.setArdublocklyMenu();
    }

    mainWindow.loadUrl('http://localhost:8000/ardublockly');

    mainWindow.on('close', function () {
        mainWindowState.saveState(mainWindow);
        mainWindow = null;
    });
});

app.on('window-all-closed', function () {
    // Might need to add OS X exception
    // https://github.com/atom/electron/issues/1357 
    app.quit();
});

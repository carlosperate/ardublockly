/**
 * @author    carlosperate
 * @copyright 2015 carlosperate https://github.com/carlosperate
 * @license   Licensed under the The MIT License (MIT), a copy can be found in
 *            the electron project directory LICENSE file.
 *
 * @fileoverview Generates the application menu bar.
 */
'use strict';

var app = require('app');
var Menu = require('menu');
var shell = require('shell');
var dialog = require('dialog');
var jetpack = require('fs-jetpack');
var MenuItem = require('menu-item');
var server = require('./servermgr.js');
var BrowserWindow = require('browser-window');

module.exports.setArdublocklyMenu = function(devMode) {
    if (typeof(devMode)==='undefined') devMode = false;

    var ardublocklyMenu = [
        getFileMenuData(),
        getHelpMenuData(),
    ];

    if (devMode) {
        ardublocklyMenu.push(getDevMenuData());
    }

    Menu.setApplicationMenu(Menu.buildFromTemplate(ardublocklyMenu));
};

var getFileMenuData = function() {
    return {
        label: 'File',
        submenu: [
            {
                label: 'Open',
                accelerator: 'CmdOrCtrl+O',
                click: functionNotImplemented
            }, {
                label: 'Save as',
                accelerator: 'CmdOrCtrl+S',
                click: functionNotImplemented
            }, {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click: function () {
                    app.quit();
                }
            }
        ]
    };
};

var getHelpMenuData = function() {
    return {
        label: 'Help',
        submenu: [
            {
                label: 'Website',
                click: function () {
                    shell.openExternal('http://ardublockly.embeddedlog.com');
                }
            }, {
                label: 'Source code',
                click: function () {
                    shell.openExternal('https://github.com/carlosperate/ardublockly');
                }
            }, {
                type: 'separator'
            },  {
                label: 'About',
                click: functionNotImplemented
            }
        ]
    };
};

var getDevMenuData = function () {
    return {
        label: 'Development',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click: function () {
                    BrowserWindow.getFocusedWindow().reloadIgnoringCache();
                }
            }, {
                label: 'Toggle DevTools',
                accelerator: 'Alt+CmdOrCtrl+I',
                click: function () {
                    BrowserWindow.getFocusedWindow().toggleDevTools();
                }
            }, {
                label: 'Stop server',
                accelerator: 'Shift+CmdOrCtrl+S',
                click: server.stopServer
            }, {
                label: 'Restart server',
                accelerator: 'Shift+CmdOrCtrl+R',
                click: server.restartServer
            }, {
                label: 'Test menu item',
                click: testFunction
            }
        ]
    };
};

var functionNotImplemented = function() {
    dialog.showMessageBox({
        type: "info",
        title: "Dialog",
        buttons: ["ok",],
        message: "This functionality has not yet been implemented."
    });
};

var testFunction = function() {
    // Here you can place any test code you'd like to test on a menu click
    functionNotImplemented();
};

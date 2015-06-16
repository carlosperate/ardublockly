'use strict';

var app = require('app');
var Menu = require('menu');
var MenuItem = require('menu-item');
var BrowserWindow = require('browser-window');
var dialog = require('dialog');
var shell = require('shell');

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
                label: 'Restart server and page',
                accelerator: 'Shift+CmdOrCtrl+R',
                click: function () {
                    BrowserWindow.getFocusedWindow().toggleDevTools();
                }
            }
        ]
    };
};

var functionNotImplemented = function() {
    console.log("test");
    dialog.showMessageBox({
        type: "info",
        title: "Dialog",
        buttons: ["ok",],
        message: "This functionality has not yet been implemented."
    });
};

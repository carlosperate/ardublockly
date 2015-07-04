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

    var ardublocklyMenu = [];
    if (process.platform == "darwin") {
        ardublocklyMenu.push(getMacMenuData());
    }
    ardublocklyMenu.push(getFileMenuData());
    ardublocklyMenu.push(getEditMenuData());
    ardublocklyMenu.push(getProgramMenuData());
    ardublocklyMenu.push(getExamplesMenuData());
    if (process.platform == "darwin") {
        ardublocklyMenu.push(getWindowMenuData());
    }
    ardublocklyMenu.push(getHelpMenuData());

    if (devMode) {
        ardublocklyMenu.push(getDevMenuData());
    }

    Menu.setApplicationMenu(Menu.buildFromTemplate(ardublocklyMenu));
};

var getMacMenuData = function() {
    return {
        label: 'Ardublockly',
        submenu: [
            {
                label: 'About',
                click: functionNotImplemented
            }, {
                type: 'separator'
            }, {
                label: 'Preferences',
                accelerator: 'CmdOrCtrl+,',
                click: function() {
                    BrowserWindow.getFocusedWindow()
                        .webContents
                        .executeJavaScript("ArduinoMaterial.openSettings()");
                }
            }, {
                type: 'separator'
            }, {
                label: 'Services',
                submenu: []
            }, {
                type: 'separator'
            }, {
                label: 'Hide Ardublockly',
                accelerator: 'Command+H',
                selector: 'hide:'
            }, {
                label: 'Hide Others',
                accelerator: 'Command+Shift+H',
                selector: 'hideOtherApplications:'
            }, {
                label: 'Show All',
                selector: 'unhideAllApplications:'
            }, {
                type: 'separator'
            }, {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click: function() {
                    app.quit();
                }
            }
        ]
    };
};

var getFileMenuData = function() {
    var fileMenu = {
        label: 'File',
        submenu: [
            {
                label: 'New',
                accelerator: 'CmdOrCtrl+N',
                click: functionNotImplemented
            }, {
                label: 'Open',
                accelerator: 'CmdOrCtrl+O',
                click: functionNotImplemented
            }, {
                label: 'Save Blocks as',
                accelerator: 'CmdOrCtrl+S',
                click: function() {
                    BrowserWindow.getFocusedWindow()
                        .webContents
                        .executeJavaScript("ArduinoMaterial.saveXmlFile()");
                }
            }, {
                label: 'Save Arduino Sketch as',
                accelerator: 'Shift+CmdOrCtrl+S',
                click: functionNotImplemented
            }
        ]
    };

    // On MacOS the Quit option is in the app menu, so only add it if not mac
    if (process.platform != "darwin") {
        fileMenu.submenu.push(
            {
                type: 'separator'
            }, {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click: function() {
                    app.quit();
                }
            }
        );
    }

    return fileMenu;
};

var getEditMenuData = function() {
    var editMenud = {
        label: 'Edit',
        submenu: [
            {
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                click: functionNotImplemented
            }, {
                label: 'Redo',
                accelerator: 'CmdOrCtrl+Y',
                click: functionNotImplemented
            }, {
                type: 'separator'
            }, {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                click: function() {
                    BrowserWindow.getFocusedWindow()
                        .webContents
                        .executeJavaScript("ArduinoMaterial.blocklyCut()");
                }
            }, {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                click: function() {
                    BrowserWindow.getFocusedWindow()
                        .webContents
                        .executeJavaScript("ArduinoMaterial.blocklyCopy()");
                }
            }, {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                click: function() {
                    BrowserWindow.getFocusedWindow()
                        .webContents
                        .executeJavaScript("ArduinoMaterial.blocklyPaste()");
                }
            }, {
                label: 'Delete',
                accelerator: 'Delete',
                click: function() {
                    BrowserWindow.getFocusedWindow()
                        .webContents
                        .executeJavaScript("ArduinoMaterial.blocklyDelete()");
                }
            }, {
                label: 'Delete All',
                accelerator: 'Delete',
                click: function() {
                    BrowserWindow.getFocusedWindow()
                        .webContents
                        .executeJavaScript("ArduinoMaterial.discard()");
                }
            }
        ]
    };

    // On MacOS Preferences is in the app menu, so only add it if not mac
    if (process.platform != "darwin") {
        editMenud.submenu.push(
            {
                type: 'separator'
            }, {
                label: 'Preferences',
                accelerator: 'CmdOrCtrl+,',
                click: function() {
                    BrowserWindow.getFocusedWindow()
                        .webContents
                        .executeJavaScript("ArduinoMaterial.openSettings()");
                }
            }
        );
    }

    return editMenud;
};

var getExamplesMenuData = function() {
    return {
        label: 'Examples',
        submenu: [
            {
                label: 'Blinky',
                click: function() {
                     BrowserWindow.getFocusedWindow()
                        .webContents
                        .executeJavaScript(
                            'ArduinoMaterial.loadServerXmlFile("examples/' +
                            'blink.xml");');
                }
            }, {
                label: 'Print Serial',
                click: function() {
                     BrowserWindow.getFocusedWindow()
                        .webContents
                        .executeJavaScript(
                            'ArduinoMaterial.loadServerXmlFile("examples/' +
                            'serial_print_ascii_.xml");');
                }
            }, {
                label: 'Servo Knob',
                click: function() {
                     BrowserWindow.getFocusedWindow()
                        .webContents
                        .executeJavaScript(
                            'ArduinoMaterial.loadServerXmlFile("examples/' +
                            'servo_knob.xml");');
                }
            }, {
                label: 'Stepper Knob',
                click: function() {
                     BrowserWindow.getFocusedWindow()
                        .webContents
                        .executeJavaScript(
                            'ArduinoMaterial.loadServerXmlFile("examples/' +
                            'stepper_knob.xml");');
                }
            }
        ]
    };
};

var getProgramMenuData = function() {
    return {
        label: 'Program',
        submenu: [
            {
                label: 'Open sketch in IDE',
                //accelerator: 'CmdOrCtrl+O',
                click: functionNotImplemented
            }, {
                label: 'Verify',
                accelerator: 'CmdOrCtrl+R',
                click: functionNotImplemented
            }, {
                label: 'Upload program',
                accelerator: 'CmdOrCtrl+U',
                click: functionNotImplemented
            }
        ]
    };
};

var getWindowMenuData = function() {
    return {
        label: 'Window',
        submenu: [
            {
                label: 'Minimize',
                accelerator: 'Command+M',
                selector: 'performMiniaturize:'
            }, {
                label: 'Close',
                accelerator: 'Command+W',
                selector: 'performClose:'
           }, {
                type: 'separator'
            }, {
                label: 'Bring All to Front',
                selector: 'arrangeInFront:'
            }
        ]
    };
};

var getHelpMenuData = function() {
    return {
        label: 'Help',
        submenu: [
            {
                label: 'Quick Start',
                click:  function() {
                    shell.openExternal(
                        'http://localhost:8000/documentation/Quick-Start');
                }
            }, {
                label: 'Manual',
                click: function() {
                    shell.openExternal(
                        'http://localhost:8000/documentation/Quick-Start');
                }
            }, {
                type: 'separator'
            }, {
                label: 'Website',
                click: function() {
                    shell.openExternal('http://ardublockly.embeddedlog.com');
                }
            }, {
                label: 'Source code',
                click: function() {
                    shell.openExternal(
                        'https://github.com/carlosperate/ardublockly');
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

var getDevMenuData = function() {
    return {
        label: 'Development',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+F5',
                click: function() {
                    BrowserWindow.getFocusedWindow().reloadIgnoringCache();
                }
            }, {
                label: 'Toggle DevTools',
                accelerator: 'Alt+CmdOrCtrl+I',
                click: function() {
                    BrowserWindow.getFocusedWindow().toggleDevTools();
                }
            }, {
                type: 'separator'
            }, {
                label: 'Stop server',
                accelerator: 'Shift+CmdOrCtrl+S',
                click: server.stopServer
            }, {
                label: 'Restart server',
                accelerator: 'Shift+CmdOrCtrl+R',
                click: server.restartServer
            }, {
                type: 'separator'
            }, {
                label: 'Open side menu',
                click: function() {
                    BrowserWindow.getFocusedWindow()
                        .webContents
                        .executeJavaScript(
                            "$('.button-collapse').sideNav('show')");
                }
            }, {
                type: 'separator'
            },  {
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

/**
 * @author    carlosperate
 * @copyright 2015 carlosperate https://github.com/carlosperate
 * @license   Licensed under the The MIT License (MIT), a copy can be found in
 *            the electron project directory LICENSE file.
 *
 * @fileoverview Generates the application menu bar.
 */
const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const shell = electron.shell;
const dialog = electron.dialog;
const MenuItem = electron.MenuItem;
const BrowserWindow = electron.BrowserWindow;

const server = require('./servermgr.js');

module.exports.setArdublocklyMenu = function(devMode) {
    if (typeof(devMode)==='undefined') devMode = false;

    var ardublocklyMenu = [];
    if (process.platform == 'darwin') {
        ardublocklyMenu.push(getMacMenuData());
    }
    ardublocklyMenu.push(getFileMenuData());
    ardublocklyMenu.push(getEditMenuData());
    ardublocklyMenu.push(getProgramMenuData());
    ardublocklyMenu.push(getExamplesMenuData());
    if (process.platform == 'darwin') {
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
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.openSettings()');
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
                click: function() {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript(
                            'Ardublockly.loadUserXmlFile()', true);
                }
            }, {
                label: 'Save Blocks as',
                accelerator: 'CmdOrCtrl+S',
                click: function() {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.saveXmlFile()');
                }
            }, {
                label: 'Save Arduino Sketch as',
                accelerator: 'Shift+CmdOrCtrl+S',
                click:  function() {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.saveSketchFile()');
                }
            }
        ]
    };

    // On MacOS the Quit option is in the app menu, so only add it if not mac
    if (process.platform != 'darwin') {
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
                click: function() {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.workspace.undo(false)');
                }
            }, {
                label: 'Redo',
                accelerator: 'CmdOrCtrl+Y',
                click: function() {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.workspace.undo(true)');
                }
            }, {
                type: 'separator'
            }, {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                click: function() {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.blocklyCut()');
                }
            }, {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                click: function() {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.blocklyCopy()');
                }
            }, {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                click: function() {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.blocklyPaste()');
                }
            }, {
                label: 'Delete',
                accelerator: 'Delete',
                click: function() {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.blocklyDelete()');
                }
            }, {
                label: 'Delete All',
                accelerator: 'Delete',
                click: function() {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.discardAllBlocks()');
                }
            }
        ]
    };

    // On MacOS Preferences is in the app menu, so only add it if not mac
    if (process.platform != 'darwin') {
        editMenud.submenu.push(
            {
                type: 'separator'
            }, {
                label: 'Preferences',
                accelerator: 'CmdOrCtrl+,',
                click: function() {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.openSettings()');
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
                     BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript(
                            'Ardublockly.loadServerXmlFile("../examples/' +
                            'blink.xml");');
                }
            }, {
                label: 'Serial Print',
                click: function() {
                     BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript(
                            'Ardublockly.loadServerXmlFile("../examples/' +
                            'serial_print_ascii.xml");');
                }
            }, {
                label: 'Serial Repeat Game',
                click: function() {
                     BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript(
                            'Ardublockly.loadServerXmlFile("../examples/' +
                            'serial_repeat_game.xml");');
                }
            }, {
                label: 'Servo Knob',
                click: function() {
                     BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript(
                            'Ardublockly.loadServerXmlFile("../examples/' +
                            'servo_knob.xml");');
                }
            }, {
                label: 'Stepper Knob',
                click: function() {
                     BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript(
                            'Ardublockly.loadServerXmlFile("../examples/' +
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
                click: function() {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.ideSendOpen()');
                }
            }, {
                label: 'Verify',
                accelerator: 'CmdOrCtrl+R',
                click: function() {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.ideSendVerify()');
                }
            }, {
                label: 'Upload program',
                accelerator: 'CmdOrCtrl+U',
                click: function() {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript('Ardublockly.ideSendUpload()');
                }
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
                click: function() {
                    shell.openExternal(
                        'http://localhost:8000/docs/Quick-Start');
                }
            }, {
                label: 'Manual',
                click: function() {
                    shell.openExternal('http://localhost:8000/docs/');
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
                label: 'Report a bug',
                click: function() {
                    shell.openExternal(
                        'https://github.com/carlosperate/ardublockly/issues');
                }
            }, {
                type: 'separator'
            },  {
                label: 'About',
                click: function() {
                    shell.openExternal('http://localhost:8000/docs/About');
                }
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
                    BrowserWindow.getFocusedWindow().webContents
                        .reloadIgnoringCache();
                }
            }, {
                label: 'Toggle DevTools',
                accelerator: 'F12',
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
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript(
                            '$(".button-collapse").sideNav("show")');
                }
            }, {
                label: 'Open extra blocks menu',
                click: function() {
                    BrowserWindow.getFocusedWindow().webContents
                        .executeJavaScript(
                            'Ardublockly.openExtraCategoriesSelect()');
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
        type: 'info',
        title: 'Dialog',
        buttons: ['ok',],
        message: 'This functionality has not yet been implemented.'
    });
};

var testFunction = function() {
    // Here you can place any test code you'd like to test on a menu click
    functionNotImplemented();
};

/**
 * @author    carlosperate
 * @copyright 2015 carlosperate https://github.com/carlosperate
 * @license   Licensed under the The MIT License (MIT), a copy can be found in
 *            the electron project directory LICENSE file.
 *
 * @fileoverview Manages the Ardublockly server.
 */
'use strict';

var os = require('os');
var dialog = require('dialog');
var winston = require('winston');
var jetpack = require('fs-jetpack');
var childProcess = require('child_process');
var projectRootLocator = require('./rootlocator.js');
var env = require('./vendor/electron_boilerplate/env_config');

var tag = '[Server mgr] '

var serverProcess = null;

function getServerExecLocation() {
    // Relevant OS could be win32, linux, darwin
    winston.info(tag + 'OS detected: ' + process.platform);

    var ardublocklyProjRootDir = projectRootLocator.getProjectRootJetpack();

    // Then, work out the location of the python executable files
    if (process.platform == "darwin") {
        var arduexecDir = ardublocklyProjRootDir.dir('server');
    } else {
        var arduexecDir = ardublocklyProjRootDir.dir('arduexec/server');
    }

    // Finally, work out the name of the executable
    var arduexecFileName = 'start';
    if (process.platform == "win32") {
        arduexecFileName += '.exe';
    }

    var executableLocation = arduexecDir.path(arduexecFileName);
    winston.info(tag + 'Server executable: ' + executableLocation);
    return executableLocation;
};

function ardublocklyNotFound(working_dir) {
    dialog.showMessageBox({
        type: "warning",
        title: "Server Error",
        buttons: ["ok"],
        message: "The Ardublockly folder could not be found within the " +
                 "execution directory:\n" + working_dir + "\nThe application " +
                 "won't be able to function properly."
    });
};

module.exports.startServer = function() {
    if (serverProcess === null) {
        var serverExecLocation = getServerExecLocation();
        winston.info(tag + 'Command: ' + serverExecLocation +
                     ' --findprojectroot --nobrowser');
        serverProcess = childProcess.spawn(
                serverExecLocation, ['--findprojectroot', '--nobrowser']);

        // Setting the listeners
        serverProcess.stdout.on('data', function (data) {
            winston.info('[Ardublockly server] ' + data);
        });

        serverProcess.stderr.on('data', function (data) {
            winston.error('[Ardublockly server] ' + data);
        });

        serverProcess.on('close', function (code) {
            if (code !== 0) {
                winston.info('[Ardublockly server] Process exited with code ' +
                             code);
            }
            serverProcess = null;
        });
    }
};

module.exports.stopServer = function() {
    if (serverProcess !== null) {
        // Server executable needs to clean up (kill child), so no SIGKILL
        serverProcess.kill('SIGTERM');
        serverProcess = null;
    }
};

module.exports.restartServer = function() {
    module.exports.stopServer();
    setTimeout(function() {
        module.exports.startServer();
    }, 1000);
};

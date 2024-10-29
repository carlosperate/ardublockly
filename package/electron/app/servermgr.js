/**
 * @author    carlosperate
 * @copyright 2015 carlosperate https://github.com/carlosperate
 * @license   Licensed under the The MIT License (MIT), a copy can be found in
 *            the electron project directory LICENSE file.
 *
 * @fileoverview Manages the Ardublockly server.
 */
const winston = require('winston');
const childProcess = require('child_process');

const projectLocator = require('./projectlocator.js');

const tagMgr = '[ServerMgr] ';
const tagSrv = '[ArdublocklySrv] ';

var serverProcess = null;

module.exports.startServer = function() {
    if (serverProcess === null) {
        var serverExecLocation = projectLocator.getServerExecPath();
        winston.info(tagMgr + 'Command: ' + serverExecLocation +
                     ' --findprojectroot --nobrowser');
        serverProcess = childProcess.spawn(
                serverExecLocation, ['--findprojectroot', '--nobrowser']);

        // Setting the listeners
        serverProcess.stdout.on('data', function(data) {
            winston.info(tagSrv + data);
        });

        serverProcess.stderr.on('data', function(data) {
            winston.error(tagSrv + data);
        });

        serverProcess.on('close', function(code) {
            if (code !== 0) {
                winston.info(tagSrv + 'Process exited with code ' + code);
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
        winston.info(tagMgr + 'Server stopped.');
    }
};

module.exports.restartServer = function() {
    module.exports.stopServer();
    setTimeout(function() {
        module.exports.startServer();
    }, 1000);
};

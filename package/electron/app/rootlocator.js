/**
 * @author    carlosperate
 * @copyright 2015 carlosperate https://github.com/carlosperate
 * @license   Licensed under the The MIT License (MIT), a copy can be found in
 *            the electron project directory LICENSE file.
 *
 * @fileoverview Finds the Ardublockly root directory path.
 */
'use strict';

var winston = require('winston');
var jetpack = require('fs-jetpack');
var env = require('./vendor/electron_boilerplate/env_config');

var tag = '[Project Root Locator] ';

var ardublocklyRootDir = null;

module.exports.getProjectRootJetpack = function() {
    if (ardublocklyRootDir === null) {
        // First, work out the project root directory
        if (env.name === 'development') {
            // In dev mode the file cwd is on the project/package/electron dir
            ardublocklyRootDir = jetpack.dir('../../');
        } else {
            // Cannot use relative paths in build, so let's try to find the
            // ardublockly folder in a node from the executable file path tree
            ardublocklyRootDir = jetpack.dir(__dirname);
            var oldArdublocklyRootDir = '';
            while (ardublocklyRootDir.path() != oldArdublocklyRootDir) {
                //winston.log('info', tag + 'Search for Ardublockly project ' +
                //            'dir: ' + ardublocklyRootDir.cwd());
                // Check if /ardublokly/index.html exists within current path
                if (jetpack.exists(
                        ardublocklyRootDir.path('ardublockly', 'index.html'))) {
                    // Found the right folder, break with this dir loaded
                    break;
                }
                oldArdublocklyRootDir = ardublocklyRootDir.path();
                ardublocklyRootDir = ardublocklyRootDir.dir('../');
            }

            if (ardublocklyRootDir.path() == oldArdublocklyRootDir) {
                ardublocklyRootDir = jetpack.dir('.');
                ardublocklyNotFound(ardublocklyRootDir.path('.'));
            }
        }
        winston.info(tag + 'Ardublockly root dir: ' + ardublocklyRootDir.cwd());
    }

    return ardublocklyRootDir;
};

module.exports.getProjectRootPath = function() {
    return module.exports.getProjectRootJetpack().path();
};

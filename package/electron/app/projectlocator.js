/**
 * @author    carlosperate
 * @copyright 2015 carlosperate https://github.com/carlosperate
 * @license   Licensed under the The MIT License (MIT), a copy can be found in
 *            the electron project directory LICENSE file.
 *
 * @fileoverview Finds the Ardublockly Project directory and files.
 */
const jetpack = require('fs-jetpack');

// Name of the folder containing the electron executable, needs to be synced
// with the name set in the Python server and Electron build files.
const execFolderName = 'arduexec';
const serverExecFolderName = 'server';
const serverExecName = 'start';
module.exports.ardublocklyExecFolderName = execFolderName;

const tag = '[ProjectLocator] ';

var ardublocklyRootDir = null;

function ardublocklyNotFound(working_dir) {
    require('dialog').showMessageBox({
        type: 'warning',
        title: 'Unable to locate Ardublockly folder',
        buttons: ['ok'],
        message: 'The Ardublockly folder could not be found within the ' +
                 'execution directory:\n\t' + working_dir + '\nThe ' +
                 'application will not be able to function properly.'
    });
}

module.exports.getProjectRootJetpack = function() {
    if (ardublocklyRootDir === null) {
        // Cannot use relative paths in build, so let's try to find the
        // ardublockly folder in a node from the executable file path tree
        ardublocklyRootDir = jetpack.dir(__dirname);
        var oldArdublocklyRootDir = '';
        while (ardublocklyRootDir.path() != oldArdublocklyRootDir) {
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
    return ardublocklyRootDir;
};

module.exports.getProjectRootPath = function() {
    return module.exports.getProjectRootJetpack().path();
};

module.exports.getExecDirJetpack = function() {
    return module.exports.getProjectRootJetpack().cwd(execFolderName);
};

module.exports.getExecDirPath = function() {
    return module.exports.getProjectRootJetpack().path(execFolderName);
};

module.exports.getServerExecDirJetpack = function() {
    return module.exports.getProjectRootJetpack()
            .cwd(execFolderName, serverExecFolderName);
};

module.exports.getServerExecDirPath = function() {
    return module.exports.getProjectRootJetpack()
            .path(execFolderName, serverExecFolderName);
};

module.exports.getServerExecPath = function() {
    var finalServerExecName = serverExecName;
    if (process.platform == 'win32') {
        finalServerExecName += '.exe';
    }
    return module.exports.getServerExecDirJetpack().path(finalServerExecName);
};

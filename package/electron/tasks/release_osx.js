'use strict';

var Q = require('q');
var gulpUtil = require('gulp-util');
var jetpack = require('fs-jetpack');
var asar = require('asar');
var utils = require('./utils');

var projectDir;
var releasesDir;
var tmpDir;
var ardublocklyProjectDir;
var finalAppDir;
var manifest;

var init = function () {
    projectDir = jetpack;
    releasesDir = projectDir.dir('./releases');
    tmpDir = projectDir.dir('./tmp', { empty: true });
    ardublocklyProjectDir = projectDir.dir('../../');
    manifest = projectDir.read('app/package.json', 'json');
    finalAppDir = tmpDir.cwd(manifest.productName + '.app');

    return Q();
};

var copyRuntime = function () {
    return projectDir.copyAsync('node_modules/electron-prebuilt/dist/Electron.app', finalAppDir.path());
};

var packageBuiltApp = function () {
    var deferred = Q.defer();

    asar.createPackage(projectDir.path('build'), finalAppDir.path('Contents/Resources/app.asar'), function() {
        deferred.resolve();
    });

    return deferred.promise;
};

var createPropertyListFile = function () {
    // Prepare main Info.plist
    var info = projectDir.read('resources/osx/Info.plist');
    info = utils.replace(info, {
        productName: manifest.productName,
        name: manifest.name,
        identifier: manifest.identifier,
        version: manifest.version
    });
    finalAppDir.write('Contents/Info.plist', info);

    // Prepare Info.plist of Helper app
    info = projectDir.read('resources/osx/helper_app/Info.plist');
    info = utils.replace(info, {
        productName: manifest.productName,
        identifier: manifest.identifier
    });
    finalAppDir.write('Contents/Frameworks/Electron Helper.app/Contents/Info.plist', info);

    return Q();
};

var finalize = function () {
    // Copy icon
    projectDir.copy('resources/osx/icon.icns', finalAppDir.path('Contents/Resources/icon.icns'));

    // Rename executable
    var execDir = finalAppDir.dir('Contents/MacOS/');
    execDir.rename('Electron', manifest.name);

    return Q();
};

var packToDmgFile = function () {
    var deferred = Q.defer();

    var appdmg = require('appdmg');
    var dmgName = manifest.name + '_' + manifest.version + '.dmg';

    // Prepare appdmg config
    var dmgManifest = projectDir.read('resources/osx/appdmg.json');
    dmgManifest = utils.replace(dmgManifest, {
        productName: manifest.productName,
        appPath: finalAppDir.path(),
        dmgIcon: projectDir.path("resources/osx/dmg-icon.icns"),
        dmgBackground: projectDir.path("resources/osx/dmg-background.png")
    });
    tmpDir.write('appdmg.json', dmgManifest);

    // Delete DMG file with this name if already exists
    releasesDir.remove(dmgName);

    gulpUtil.log('Packaging to DMG file...');

    var readyDmgPath = releasesDir.path(dmgName);
    appdmg({
        source: tmpDir.path('appdmg.json'),
        target: readyDmgPath
    })
    .on('error', function (err) {
        console.error(err);
    })
    .on('finish', function () {
        gulpUtil.log('DMG file ready!', readyDmgPath);
        deferred.resolve();
    });

    return deferred.promise;
};

var copyExecFolder = function () {
    // Because the python build file packs the entire arduexe folder as an app
    // package with its respective 'Contents' folder, we want to copy that data
    var finalAppContentDir = finalAppDir.dir('Contents');
    gulpUtil.log('Copying from ' + finalAppDir.cwd() + ' ' +
                 'folder: '+ finalAppContentDir.cwd());
    finalAppDir.copy(finalAppContentDir.cwd(), ardublocklyProjectDir.cwd(), { overwrite: true });
    return Q();
};

var cleanClutter = function () {
    return tmpDir.removeAsync('.');
};

module.exports = function () {
    return init()
    .then(copyRuntime)
    .then(packageBuiltApp)
    .then(createPropertyListFile)
    .then(finalize)
    //.then(packToDmgFile)
    .then(copyExecFolder)
    .then(cleanClutter);
};

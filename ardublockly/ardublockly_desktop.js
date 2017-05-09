/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Front end code relevant only to the Desktop version of
*                Ardublockly.
 */
//'use strict';

/** Create a namespace for the application. */
var Ardublockly = Ardublockly || {};

/**
 * Checks if the current JavaScript is loaded in the rendered process of
 * Electron. Works even if the node integration is turned off.
 * @return {!boolean} True if Ardublockly running in Electron application
 */
Ardublockly.isRunningElectron = function() {
  return navigator.userAgent.toLowerCase().indexOf('ardublockly') > -1;
};

/**
 * Because the Node integration causes conflicts with the way JavaScript
 * libraries are declared as modules, this declares them in the window context.
 * This function is to be executed as soon as this file is loaded, and because
 * of that this file must be called in the HTML before the Materialize library
 * is loaded.
 */
(function loadJsInElectron(){
  if (Ardublockly.isRunningElectron()) {
    var projectLocator = require('electron').remote.require(
        './projectlocator.js');
    var projectRoot = projectLocator.getProjectRootPath();
    window.$ = window.jQuery = require(projectRoot +
        '/ardublockly/js_libs/jquery-2.1.3.min.js');
    window.Hammer = require(projectRoot + '/ardublockly/js_libs/hammer.min.js');
    window.JsDiff = require(projectRoot + '/ardublockly/js_libs/diff.js');
  }
})();

/** Sets all the elements using the container class to have a width of 100%. */
Ardublockly.containerFullWidth = function() {
  var containers = $('.container');
  for (var i = 0; i < containers.length; i++) {
    containers[i].style.width = '100%';
  }
};

/** Hides the side menu button. */
Ardublockly.hideSideMenuButton = function() {
  var sideMenuButton = document.getElementById('button-collapse');
  sideMenuButton.style.setProperty ('display', 'none', 'important');
};

/**
 * Launches a materialize modal as a text prompt 
 * @param {string} message Main text message for the window prompt.
 * @param {string=} defaultValue Input string to be displayed by default.
 * @param {function} callback To process the user input.
 */
Ardublockly.htmlPrompt = function(message, defaultValue, callback) {
  $('#gen_prompt_message').text('');
  $('#gen_prompt_message').append(message);
  $('#gen_prompt_input').val(defaultValue);
  // Bind callback events to buttons
  $('#gen_prompt_ok_link').bind('click', function() {
    callback($('#gen_prompt_input').val());
  });
  $('#gen_prompt_cancel_link').bind('click', function() {
    callback(null);
  });
  $('#gen_prompt').openModal();
  window.location.hash = '';
};

/**
 * Add click listeners to the Compiler and Sketch input fields to launch the 
 * Electron file/folder browsers.
 */
Ardublockly.bindSettingsPathInputs = function() {
  var dialog = require('electron').remote.dialog;

  // Compiler path
  var compilerEl = document.getElementById('settings_compiler_location');
  compilerEl.readOnly = true;
  Ardublockly.bindClick_(compilerEl, function() {
    dialog.showOpenDialog({
      title: 'Select the Arduino IDE executable',
      buttonLabel: 'Select',
      properties: ['openFile']
    }, function (files) {
      if (files && files[0]) {
        ArdublocklyServer.setCompilerLocation(files[0], function(jsonObj) {
          Ardublockly.setCompilerLocationHtml(
              ArdublocklyServer.jsonToHtmlTextInput(jsonObj));
        });
      }
    })
  });
  // Sketch path
  var sketchEl = document.getElementById('settings_sketch_location');
  sketchEl.readOnly = true;
  Ardublockly.bindClick_(sketchEl, function() {
    dialog.showOpenDialog({
      title: 'Select the Arduino IDE executable',
      buttonLabel: 'Select',
      properties: ['openDirectory']
    }, function (folders) {
      if (folders && folders[0]) {
        ArdublocklyServer.setSketchLocation(folders[0], function(jsonObj) {
          Ardublockly.setSketchLocationHtml(
              ArdublocklyServer.jsonToHtmlTextInput(jsonObj));
        });
      }
    })
  });
};

/** Wraps the console.log warn and errors to send data to logging file. */
Ardublockly.redirectConsoleLogging = function() {
  var winston = require('electron').remote.require('winston');
  var consoleLog = console.log;
  var consoleWarning = console.warning;
  var consoleError = console.error;

  // This is magic from Stack Overflow
  // http://stackoverflow.com/questions/14172455/get-name-and-line-of-calling-function-in-node-js
  Object.defineProperty(global, '__stack', {
    get: function() {
      var orig = Error.prepareStackTrace;
      Error.prepareStackTrace = function(_, stack) {
        return stack;
      };
      var err = new Error;
      Error.captureStackTrace(err, arguments.callee);
      var stack = err.stack;
      Error.prepareStackTrace = orig;
      return stack;
    }
  });
  Object.defineProperty(global, '__stackfilename', {
    get: function() {
      return __stack[2].getFileName();
    }
  });
  Object.defineProperty(global, '__line', {
    get: function() {
      return __stack[2].getLineNumber();
    }
  });
  Object.defineProperty(global, '__function', {
    get: function() {
      return __stack[2].getFunctionName();
    }
  });

  // Wrapping console logging
  console.log = function(logMessage){
      consoleLog.apply(console, arguments);
      var tagRenderer = '[Renderer "' + __stackfilename + ':' + __function +
                        '():L' + __line + '"] ';
      winston.info(tagRenderer + logMessage);
  };
  console.warning = function(warnMessage){
     consoleWarning.apply(console, arguments);
     var tagRenderer = '[Renderer "' + __stackfilename + ':' + __function +
                        '():L' + __line + '"] ';
     winston.warn(tagRenderer + warnMessage);
  };
  console.error = function(errMessage){
     consoleError.apply(console, arguments);
     var tagRenderer = '[Renderer "' + __stackfilename + ':' + __function +
                        '():L' + __line + '"] ';
     winston.error(tagRenderer + errMessage);
  };
};

/** Initialize Ardublockly code required for Electron on page load. */
window.addEventListener('load', function load(event) {
  window.removeEventListener('load', load, false);
  if (Ardublockly.isRunningElectron()) {
    // Edit the page layout for better appearance on desktop
    Ardublockly.containerFullWidth();
    Ardublockly.hideSideMenuButton();

    // Open the file or directory browsers when clicking on the Settings inputs
    Ardublockly.bindSettingsPathInputs();

    // Prevent browser zoom changes like pinch-to-zoom
    var webFrame = require('electron').webFrame;
    webFrame.setZoomLevelLimits(1, 1);

    Ardublockly.redirectConsoleLogging();

    // Electron does not offer a prompt, so replace Blocks version with modal
    // Original signature: function(message, opt_defaultInput, opt_callback)
    Blockly.prompt = Ardublockly.htmlPrompt;
  }
});

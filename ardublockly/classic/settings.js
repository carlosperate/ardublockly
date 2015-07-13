/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview JavaScript for Ardublockly Server Compiler settings.
 */
'use strict';

/** Create a namespace for the application. */
var ArduinoSettings = {};

/** Initialize the settings form data on page load. */
window.addEventListener('load', function() {
  // Populate the form data
  ArdublocklyServer.requestCompilerLocation(
      ArduinoSettings.setCompilerLocationHtml);
  ArdublocklyServer.requestSketchLocation(
      ArduinoSettings.setSketchLocationHtml);
  ArdublocklyServer.requestArduinoBoards(
      ArduinoSettings.setArduinoBoardsHtml);
  ArdublocklyServer.requestSerialPorts(ArduinoSettings.setSerialPortsHtml);
  ArdublocklyServer.requestIdeOptions(ArduinoSettings.setIdeHtml);

  // Binding clicks to the form items
  ArduinoSettings.bindClick_('settings_compiler_location', function() {
    ArdublocklyServer.requestNewCompilerLocation(
        ArduinoSettings.setCompilerLocationHtml);
  });
  ArduinoSettings.bindClick_('settings_sketch_location', function() {
    ArdublocklyServer.requestNewSketchLocation(
        ArduinoSettings.setSketchLocationHtml);
  });

  // Check if not running locally (including developer's local network IP)
  if (document.location.hostname != 'localhost' &&
      document.location.hostname != '192.168.0.7') {
    alert('Ardublockly not running locally\n\n' +
          'For Ardublockly to work correctly, the Ardublockly server must be' +
          ' running locally on your computer');
  }
});

/**
 * Sets the compiler location form data retrieve from an updated element.
 * @param {element} jsonResponse JSON data coming back from the server.
 */
ArduinoSettings.setCompilerLocationHtml = function(jsonResponse) {
  if (jsonResponse != null) {
    var newEl = ArdublocklyServer.createElementFromJson(jsonResponse);
    var compLocIp = document.getElementById('settings_compiler_location');
    if (compLocIp != null) {
      compLocIp.value = newEl.value;
    }
  }
};

/**
 * Sets the sketch location form data retrieve from an updated element.
 * @param {element} jsonResponse JSON data coming back from the server.
 */
ArduinoSettings.setSketchLocationHtml = function(jsonResponse) {
  if (jsonResponse != null) {
    var newEl = ArdublocklyServer.createElementFromJson(jsonResponse);
    var sketchLocIp = document.getElementById('settings_sketch_location');
    if (sketchLocIp != null) {
      sketchLocIp.value = newEl.value;
    }
  }
};

/**
 * Replaces the Arduino Boards form data with a new HTMl element.
 * Ensures there is a change listener to call 'setSerialPort' function
 * @param {element} jsonResponse JSON data coming back from the server.
 */
ArduinoSettings.setArduinoBoardsHtml = function(jsonResponse) {
  if (jsonResponse != null) {
    var newEl = ArdublocklyServer.createElementFromJson(jsonResponse);
    var boardDropdown = document.getElementById('board');
    if (boardDropdown != null) {
      newEl.id = 'board';
      newEl.onchange = ArduinoSettings.setBoard;
      boardDropdown.parentNode.replaceChild(newEl, boardDropdown);
    }
  }
};

/**
 * Sets the Arduino Board type with the selected user input from the drop down.
 */
ArduinoSettings.setBoard = function() {
  var el = document.getElementById('board');
  var boardValue = el.options[el.selectedIndex].value;
  //TODO: check how ArdublocklyServer deals with invalid data and sanitise here
  ArdublocklyServer.setArduinoBoard(
      boardValue, ArduinoSettings.setArduinoBoardsHtml);
};

/**
 * Replaces the Serial Port form data with a new HTMl element.
 * Ensures there is a change listener to call 'setSerialPort' function
 * @param {element} jsonResponse JSON data coming back from the server.
 */
ArduinoSettings.setSerialPortsHtml = function(jsonResponse) {
  if (jsonResponse != null) {
    var newEl = ArdublocklyServer.createElementFromJson(jsonResponse);
    var serialDropdown = document.getElementById('serial_port');
    if (serialDropdown != null) {
      newEl.id = 'serial_port';
      newEl.onchange = ArduinoSettings.setSerial;
      serialDropdown.parentNode.replaceChild(newEl, serialDropdown);
    }
  }
};

/** Sets the Serial Port with the selected user input from the drop down. */
ArduinoSettings.setSerial = function() {
  var el = document.getElementById('serial_port');
  var serialValue = el.options[el.selectedIndex].value;
  //TODO: check how ArdublocklyServer deals with invalid data and sanitise
  ArdublocklyServer.setSerialPort(
      serialValue, ArduinoSettings.setSerialPortsHtml);
};

/**
 * Replaces IDE options form data with a new HTMl element.
 * Ensures there is a change listener to call 'setIdeSettings' function
 * @param {element} jsonResponse JSON data coming back from the server.
 */
ArduinoSettings.setIdeHtml = function(jsonResponse) {
  if (jsonResponse != null) {
    var newEl = ArdublocklyServer.createElementFromJson(jsonResponse);
    var ideDropdown = document.getElementById('ide_settings');
    if (ideDropdown != null) {
      newEl.id = 'ide_settings';
      newEl.onchange = ArduinoSettings.setIdeSettings;
      ideDropdown.parentNode.replaceChild(newEl, ideDropdown);
    }
  }
};

/**
 * Sets the IDE settings data with the selected user input from the drop down.
 */
ArduinoSettings.setIdeSettings = function() {
  var el = document.getElementById('ide_settings');
  var ideValue = el.options[el.selectedIndex].value;
  //TODO: check how ArdublocklyServer deals with invalid data and sanitise
  ArdublocklyServer.setIdeOptions(ideValue, ArduinoSettings.setIdeHtml);
};

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!function} func Event handler to bind.
 * @private
 */
ArduinoSettings.bindClick_ = function(el, func) {
  if (typeof el == 'string') {
    el = document.getElementById(el);
  }
  // Need to ensure both, touch and click, events don't fire for the same thing
  var propagateOnce = function(e) {
    e.stopPropagation();
    e.preventDefault();
    func();
  };
  el.addEventListener('ontouchend', propagateOnce);
  el.addEventListener('click', propagateOnce);
};

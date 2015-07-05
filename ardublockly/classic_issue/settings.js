/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview JavaScript for ArduBlockly's Server Compiler settings.
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var ArduinoSettings = {};

/**
 * Initialize the settings form data on page load.
 */
window.addEventListener('load', function() {
  // Populate the form data
  ArduServerCompiler.requestCompilerLocation(
      ArduinoSettings.setCompilerLocationHtml);
  ArduServerCompiler.requestSketchLocation(
      ArduinoSettings.setSketchLocationHtml);
  ArduServerCompiler.requestArduinoBoards(
      ArduinoSettings.setArduinoBoardsHtml);
  ArduServerCompiler.requestSerialPorts(ArduinoSettings.setSerialPortsHtml);
  ArduServerCompiler.requestIdeOptions(ArduinoSettings.setIdeHtml);

  // Binding clicks to the form items
  ArduinoSettings.bindClick_('settings_compiler_location', function() {
    ArduServerCompiler.requestNewCompilerLocation(
        ArduinoSettings.setCompilerLocationHtml);
  });
  ArduinoSettings.bindClick_('settings_sketch_location', function() {
    ArduServerCompiler.requestNewSketchLocation(
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
 * @param {!boolean} new_el New HTML element to replace the one in the current
 *                          DOM. Should contain a complete input text element.
 */
ArduinoSettings.setCompilerLocationHtml = function(new_el) {
  if (new_el != null) {
    var comp_loc_ip = document.getElementById('settings_compiler_location')
    if (comp_loc_ip != null) {
      comp_loc_ip.value = new_el.value;
    }
  }
};

/**
 * Sets the sketch location form data retrieve from an updated element.
 * @param {!boolean} new_el New HTML element to replace the one in the current
 *                          DOM. Should contain a complete input text element.
 */
ArduinoSettings.setSketchLocationHtml = function(new_el) {
  if (new_el != null) {
    var sketch_loc_ip = document.getElementById('settings_sketch_location')
    if (sketch_loc_ip != null) {
      sketch_loc_ip.value = new_el.value;
    }
  }
};

/**
 * Replaces the Arduino Boards form data with a new HTMl element.
 * Ensures there is a change listener to call 'setSerialPort' function
 * @param {!element} new_el New HTML element to replace the one in the current
 *                          DOM. Should contain a complete select element.
 */
ArduinoSettings.setArduinoBoardsHtml = function(new_el) {
  if (new_el != null) {
    var board_dropdown = document.getElementById('board')
    if (board_dropdown != null) {
      new_el.id = 'board';
      new_el.onchange = ArduinoSettings.setBoard;
      board_dropdown.parentNode.replaceChild(new_el, board_dropdown);
    }
  }
};

/**
 * Sets the Arduino Board type with the selected user input from the drop down.
 */
ArduinoSettings.setBoard = function() {
  var el = document.getElementById('board');
  var board_value = el.options[el.selectedIndex].value;
  //TODO: check how ArduServerCompiler deals with invalid data and sanitise here
  ArduServerCompiler.setArduinoBoard(
      board_value, ArduinoSettings.setArduinoBoardsHtml);
};

/**
 * Replaces the Serial Port form data with a new HTMl element.
 * Ensures there is a change listener to call 'setSerialPort' function
 * @param {!element} new_el New HTML element to replace the one in the current
 *                          DOM. Should contain a complete select element.
 */
ArduinoSettings.setSerialPortsHtml = function(new_el) {
  if (new_el != null) {
    var serial_dropdown = document.getElementById('serial_port')
    if (serial_dropdown != null) {
      new_el.id = 'serial_port';
      new_el.onchange = ArduinoSettings.setSerial;
      serial_dropdown.parentNode.replaceChild(new_el, serial_dropdown);
    }
  }
};

/**
 * Sets the Serial Port with the selected user input from the drop down.
 */
ArduinoSettings.setSerial = function() {
  var el = document.getElementById('serial_port');
  var serial_value = el.options[el.selectedIndex].value;
  //TODO: check how ArduServerCompiler deals with invalid data and sanitise
  ArduServerCompiler.setSerialPort(
      serial_value, ArduinoSettings.setSerialPortsHtml);
};

/**
 * Replaces IDE options form data with a new HTMl element.
 * Ensures there is a change listener to call 'setIdeSettings' function
 * @param {!element} new_el New HTML element to replace the one in the current
 *                          DOM. Should contain a complete select element.
 */
ArduinoSettings.setIdeHtml = function(new_el) {
  if (new_el != null) {
    var ide_dropdown = document.getElementById('ide_settings')
    if (ide_dropdown != null) {
      new_el.id = 'ide_settings';
      new_el.onchange = ArduinoSettings.setIdeSettings;
      ide_dropdown.parentNode.replaceChild(new_el, ide_dropdown);
    }
  }
};

/**
 * Sets the IDE settings data with the selected user input from the drop down.
 */
ArduinoSettings.setIdeSettings = function() {
  var el = document.getElementById('ide_settings');
  var ide_value = el.options[el.selectedIndex].value;
  //TODO: check how ArduServerCompiler deals with invalid data and sanitise
  ArduServerCompiler.setIdeOptions(ide_value, ArduinoSettings.setIdeHtml);
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

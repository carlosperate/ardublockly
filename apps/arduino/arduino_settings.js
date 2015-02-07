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
  ArduServerCompiler.requestCompilerLocation(
      ArduinoSettings.setCompilerLocationHtml);
  ArduServerCompiler.requestSketchLocation(
      ArduinoSettings.setSketchLocationHtml);
  ArduServerCompiler.requestArduinoBoards(
      ArduinoSettings.setArduinoBoardsHtml);
  ArduServerCompiler.requestSerialPorts(ArduinoSettings.setSerialPortsHtml);
  ArduServerCompiler.requestIdeOptions(ArduinoSettings.setIdeHtml);
});

/**
 * Sets the compiler location form data retrieve from an updated element.
 * @param {!boolean} new_el New HTML element to replace the one in the current
 *                          DOM. Should contain a complete input text element.
 */
ArduinoSettings.setCompilerLocationHtml = function(new_el) {
  var comp_loc_ip = document.getElementById('settings_compiler_location')
  if (comp_loc_ip != null) {
    comp_loc_ip.value = new_el.value;
  }
};

/**
 * Sets the sketch location form data retrieve from an updated element.
 * @param {!boolean} new_el New HTML element to replace the one in the current
 *                          DOM. Should contain a complete input text element.
 */
ArduinoSettings.setSketchLocationHtml = function(new_el) {
  var sketch_loc_ip = document.getElementById('settings_sketch_location')
  if (sketch_loc_ip != null) {
    sketch_loc_ip.value = new_el.value;
  }
};

/**
 * Replaces the Arduino Boards form data with a new HTMl element.
 * Ensures there is a change listener to call 'setSerialPort' function
 * @param {!element} new_el New HTML element to replace the one in the current
 *                          DOM. Should contain a complete select element.
 */
ArduinoSettings.setArduinoBoardsHtml = function(new_el) {
  var board_dropdown = document.getElementById('board')
  if (board_dropdown != null) {
    new_el.id = 'board';
    new_el.onchange = ArduinoSettings.setBoard;
    board_dropdown.parentNode.replaceChild(new_el, board_dropdown);
  }
  // Refresh the materialize select menus
  // TODO: Currently a reported bug from Materialize
   $('select').material_select();
};

/**
 * Sets the Arduino Board type with the selected user input from the drop down.
 */
ArduinoSettings.setBoard = function() {
  var el = document.getElementById("board");
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
  var serial_dropdown = document.getElementById('serial_port')
  if (serial_dropdown != null) {
    new_el.id = 'serial_port';
    new_el.onchange = ArduinoSettings.setSerial;
    serial_dropdown.parentNode.replaceChild(new_el, serial_dropdown);
  }
  // Refresh the materialize select menus
  // TODO: Currently a reported bug from Materialize
   $('select').material_select();
};

/**
 * Sets the Serial Port with the selected user input from the drop down.
 */
ArduinoSettings.setSerial = function() {
  var el = document.getElementById("serial_port");
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
  var ide_dropdown = document.getElementById('ide_settings')
  if (ide_dropdown != null) {
    new_el.id = 'ide_settings';
    new_el.onchange = ArduinoSettings.setIdeSettings;
    ide_dropdown.parentNode.replaceChild(new_el, ide_dropdown);
  }
  // Refresh the materialize select menus
  // TODO: Currently a reported bug from Materialize
   $('select').material_select();
};

/**
 * Sets the IDE settings data with the selected user input from the drop down.
 */
ArduinoSettings.setIdeSettings = function() {
  var el = document.getElementById("ide_settings");
  var ide_value = el.options[el.selectedIndex].value;
  //TODO: check how ArduServerCompiler deals with invalid data and sanitise
  ArduServerCompiler.setIdeOptions(ide_value, ArduinoSettings.setIdeHtml);
};

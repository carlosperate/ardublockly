/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview General javaScript for Arduino app with material design.
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var ArduinoMaterial = ArduinoMaterial || {};

/**
 * Initialize function for Ardublockly on page load.
 */
window.addEventListener('load', function() {
  // Inject Blockly into content_blocks
  ArduinoMaterial.injectBlockly(
    document.getElementById('content_blocks'), 'arduino_toolbox.xml');

  ArduinoMaterial.materializeJsInit();
  ArduinoMaterial.bindActionFunctions_();
  ArduinoMaterial.bindDesignEventListeners_();
  ArduinoMaterial.bindBlocklyEventListeners_();
});

/**
 * Binds functions to each of the buttons, nav links, and related.
 * @private
 */
ArduinoMaterial.bindActionFunctions_ = function() {
  // Navigation buttons
  ArduinoMaterial.bindClick('button_load', ArduinoMaterial.loadXmlFile);
  ArduinoMaterial.bindClick('button_save', ArduinoMaterial.saveXmlFile);
  ArduinoMaterial.bindClick('button_delete_all', ArduinoMaterial.discard);
  ArduinoMaterial.bindClick('button_settings',
      ArduinoMaterial.populateSettings);
  ArduinoMaterial.bindClick('dropdown_examples',
      ArduinoMaterial.functionNotImplemented);

  // Floating buttons
  ArduinoMaterial.bindClick('button_run', ArduinoMaterial.sendCode);
  ArduinoMaterial.bindClick('button_load_xml',
      ArduinoMaterial.XmlTextareaToBlocks);
  ArduinoMaterial.bindClick(
      'button_toggle_toolbox', ArduinoMaterial.toogleToolbox);

  // Settings fields
  ArduinoMaterial.bindClick('settings_compiler_location', function() {
    ArduServerCompiler.requestNewCompilerLocation(
        ArduinoMaterial.setCompilerLocationHtml);
  });
  ArduinoMaterial.bindClick('settings_sketch_location', function() {
    ArduServerCompiler.requestNewSketchLocation(
        ArduinoMaterial.setSketchLocationHtml);
  });
};

/**
 * Binds the event listeners relevant to the page design.
 * @private
 */
ArduinoMaterial.bindDesignEventListeners_ = function() {
  window.addEventListener(
      'resize', ArduinoMaterial.resizeBlocklyWorkspace, false);
  document.getElementById('xml_collapsible_header').addEventListener(
    'click', ArduinoMaterial.buttonLoadXmlCodeDisplay);
};

/**
 * Binds the event listeners relevant to Blockly.
 * @private
 */
ArduinoMaterial.bindBlocklyEventListeners_ = function() {
  // Renders the code and XML for every Blockly workspace event
  // Unfortunately as the toolbox inject is asynchronous we need to wait
  if(ArduinoMaterial.BLOCKLY_INJECTED == false) {
    setTimeout(ArduinoMaterial.bindBlocklyEventListeners_, 50);
  } else {
    Blockly.addChangeListener(ArduinoMaterial.renderContent);
  }
};

/**
 * Loads an XML file from the users file system and adds the blocks into the
 * Blockly workspace.
 */
ArduinoMaterial.loadXmlFile = function() {
  // Create event listener function
  var parseInputXMLfile = function(e) {
    var files = e.target.files;
    var reader = new FileReader();
    reader.onload = function() {
      var success = ArduinoMaterial.replaceBlocksfromXml(reader.result);
      if (success) {
        ArduinoMaterial.renderContent();
      } else {
        ArduinoMaterial.materialAlert(
            'Invalid XML',
            'The XML file was not successfully parsed into blocks.\
            Please review the XML code and try again.',
            false);
      }
    };
    reader.readAsText(files[0]);
  }
  // Create once invisible browse button with event listener, and click it
  var select_file = document.getElementById("select_file");
  if (select_file == null) {
    var select_file_dom = document.createElement('INPUT');
    select_file_dom.type = 'file';
    select_file_dom.id = 'select_file';
    select_file_dom.style = 'display: none';
    document.body.appendChild(select_file_dom);
    select_file = document.getElementById("select_file");
    select_file.addEventListener('change', parseInputXMLfile, false);
  }
  select_file.click();
};

/**
 * Creates an XML file containing the blocks from the Blockly workspace and
 * prompts the users to save it into their local file system.
 */
ArduinoMaterial.saveXmlFile = function() {
  var blob = new Blob(
      [ArduinoMaterial.generateXml()],
      {type: "text/plain;charset=utf-8"});
  saveAs(blob, "ardublockly.xml");
};

/**
 * Retrieves the Settings from ArduServerCompiler and populates the form data
 * for the Settings modal dialog.
 */
ArduinoMaterial.populateSettings = function() {
  ArduServerCompiler.requestCompilerLocation(
      ArduinoMaterial.setCompilerLocationHtml);
  ArduServerCompiler.requestSketchLocation(
      ArduinoMaterial.setSketchLocationHtml);
  ArduServerCompiler.requestArduinoBoards(ArduinoMaterial.setArduinoBoardsHtml);
  ArduServerCompiler.requestSerialPorts(ArduinoMaterial.setSerialPortsHtml);
  ArduServerCompiler.requestIdeOptions(ArduinoMaterial.setIdeHtml);
};

/**
 * Sets the compiler location form data retrieve from an updated element.
 * @param {!boolean} new_el New HTML element to replace the one in the current
 *                          DOM. Should contain a complete input text element.
 */
ArduinoMaterial.setCompilerLocationHtml = function(new_el) {
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
ArduinoMaterial.setSketchLocationHtml = function(new_el) {
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
ArduinoMaterial.setArduinoBoardsHtml = function(new_el) {
  var board_dropdown = document.getElementById('board')
  if (board_dropdown != null) {
    new_el.id = 'board';
    new_el.onchange = ArduinoMaterial.setBoard;
    board_dropdown.parentNode.replaceChild(new_el, board_dropdown);
  }
  // Refresh the materialize select menus
  // TODO: Currently a reported bug from Materialize
   $('select').material_select();
};

/**
 * Sets the Arduino Board type with the selected user input from the drop down.
 */
ArduinoMaterial.setBoard = function() {
  var el = document.getElementById("board");
  var board_value = el.options[el.selectedIndex].value;
  //TODO: check how ArduServerCompiler deals with invalid data and sanitise here
  ArduServerCompiler.setArduinoBoard(
      board_value, ArduinoMaterial.setArduinoBoardsHtml);
};

/**
 * Replaces the Serial Port form data with a new HTMl element.
 * Ensures there is a change listener to call 'setSerialPort' function
 * @param {!element} new_el New HTML element to replace the one in the current
 *                          DOM. Should contain a complete select element.
 */
ArduinoMaterial.setSerialPortsHtml = function(new_el) {
  var serial_dropdown = document.getElementById('serial_port')
  if (serial_dropdown != null) {
    new_el.id = 'serial_port';
    new_el.onchange = ArduinoMaterial.setSerial;
    serial_dropdown.parentNode.replaceChild(new_el, serial_dropdown);
  }
  // Refresh the materialize select menus
  // TODO: Currently a reported bug from Materialize
   $('select').material_select();
};

/**
 * Sets the Serial Port with the selected user input from the drop down.
 */
ArduinoMaterial.setSerial = function() {
  var el = document.getElementById("serial_port");
  var serial_value = el.options[el.selectedIndex].value;
  //TODO: check how ArduServerCompiler deals with invalid data and sanitise here
  ArduServerCompiler.setSerialPort(
      serial_value, ArduinoMaterial.setSerialPortsHtml);
};

/**
 * Replaces IDE options form data with a new HTMl element.
 * Ensures there is a change listener to call 'setIdeSettings' function
 * @param {!element} new_el New HTML element to replace the one in the current
 *                          DOM. Should contain a complete select element.
 */
ArduinoMaterial.setIdeHtml = function(new_el) {
  var ide_dropdown = document.getElementById('ide_settings')
  if (ide_dropdown != null) {
    new_el.id = 'ide_settings';
    new_el.onchange = ArduinoMaterial.setIdeSettings;
    ide_dropdown.parentNode.replaceChild(new_el, ide_dropdown);
  }
  // Refresh the materialize select menus
  // TODO: Currently a reported bug from Materialize
   $('select').material_select();
};

/**
 * Sets the IDE settings data with the selected user input from the drop down.
 */
ArduinoMaterial.setIdeSettings = function() {
  var el = document.getElementById("ide_settings");
  var ide_value = el.options[el.selectedIndex].value;
  //TODO: check how ArduServerCompiler deals with invalid data and sanitise here
  ArduServerCompiler.setIdeOptions(ide_value, ArduinoMaterial.setIdeHtml);
};

/**
 * Send the Arduino Code to the ArduServerCompiler to process.
 * Shows a loader around the button, blocking it (unblocked upon received
 * message from server).
 */
ArduinoMaterial.sendCode = function() {
  toast('Sending sketch to Arduino IDE...', 4000);
  ArduServerCompiler.sendSketchToServer(
      ArduinoMaterial.generateArduino(), ArduinoMaterial.sendCodeReturn);

  // Change button colour and add spinner during loading time
  document.getElementById('button_run_spinner').style.display = 'block';
  var button_el = document.getElementById('button_run');
  var button_class = button_el.className;
  button_el.className = button_class.replace('arduino_orange', 'grey');
};

/**
 * Send the Arduino Code to the ArduServerCompiler to process
 */
ArduinoMaterial.sendCodeReturn = function(data_back) {
  // Change back button colour and remove spinner
  document.getElementById('button_run_spinner').style.display = 'none';
  var button_el = document.getElementById('button_run');
  var button_class = button_el.className;
  button_el.className = button_class.replace('grey', 'arduino_orange');

  ArduinoMaterial.arduinoIdeModal(data_back);
};

/**
 * Populate the currently selected panel with content generated from the blocks.
 */
ArduinoMaterial.XmlTextareaToBlocks = function() {
  var success = ArduinoMaterial.replaceBlocksfromXml(
      document.getElementById('content_xml').value);
  if (success) {
    ArduinoMaterial.renderContent();
  } else {
    ArduinoMaterial.materialAlert(
        'Invalid XML',
        'The XML inputted into the text area was not successfully parsed into \
        blocks. Please review the XML code and try again.',
        false);
  }
};

/**
 * Populate the currently selected panel with content generated from the blocks.
 */
ArduinoMaterial.renderContent = function() {
  // Render Arduino Code syntax highlighted into element
  var arduino_content = document.getElementById('content_arduino');
  arduino_content.textContent = ArduinoMaterial.generateArduino();;
  if (typeof prettyPrintOne == 'function') {
    var code_html = prettyPrintOne(arduino_content.innerHTML, 'cpp');
    arduino_content.innerHTML = code_html;
  }
  // Generate plain XML into element
  var xml_content = document.getElementById('content_xml');
  xml_content.value = ArduinoMaterial.generateXml();
};

/**
 * Private variable to indicate if the toolbox is meant to be shown.
 * @type {!boolean}
 * @private
 */
ArduinoMaterial.toolbar_showing_ = true;

/**
 * Toggles the toolbox and respective button On and Off
 */
ArduinoMaterial.toogleToolbox = function() {
  if (ArduinoMaterial.toolbar_showing_ == true ) {
    // showToolbox() takes a callback function as its second argument
    ArduinoMaterial.showToolbox(false, 
        function() { ArduinoMaterial.showToolboxButtonState(false); });
  } else {
     ArduinoMaterial.showToolboxButtonState(true);
    ArduinoMaterial.showToolbox(true);
  }
  ArduinoMaterial.toolbar_showing_ = !ArduinoMaterial.toolbar_showing_;
};

/**
 * Returns a boolean indicating if the toolbox is currently visible.
 * @return {boolean} Indicates if the toolbox is currently visible.
 */
ArduinoMaterial.isToolboxVisible = function() {
  return ArduinoMaterial.toolbar_showing_;
};

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!function} func Event handler to bind.
 */
ArduinoMaterial.bindClick = function(el, func) {
  if (typeof el == 'string') {
    el = document.getElementById(el);
  }
  el.addEventListener('click', func, true);
  el.addEventListener('touchend', func, true);
};

/**
 * Populate the currently selected panel with content generated from the blocks.
 */
ArduinoMaterial.functionNotImplemented = function() {
  toast('Function not yet implemented', 4000);
};

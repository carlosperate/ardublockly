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
  ArduinoMaterial.injectBlockly(document.getElementById('content_blocks'));

  ArduinoMaterial.bindDesignEventListeners_();
  ArduinoMaterial.bindBlocklyEventListeners_();
  ArduinoMaterial.bindActionFunctions_();
  ArduinoMaterial.materializeJsInit();

  // Ensure the Blockly element is the correct size
  Blockly.fireUiEvent(window, 'resize');
});

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
  Blockly.addChangeListener(ArduinoMaterial.renderContent);
};

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
  //TODO: IDE settings javascript is bind in html, move it here
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
  ArduServerCompiler.requestIdeOnly(ArduinoMaterial.setIdeHtml);
};

/**
 * Sets the compiler location form data with the input string.
 * @param {!string} location Text to be inputted in the 'text input' element.
 */
ArduinoMaterial.setCompilerLocationHtml = function(location) {
   document.getElementById('settings_compiler_location').value = location;
};

/**
 * Sets the sketch location form data with the input string.
 * @param {!string} location Text to be inputted in the 'text input' element.
 */
ArduinoMaterial.setSketchLocationHtml = function(location) {
   document.getElementById('settings_sketch_location').value = location;
};

/**
 * Sets the IDE load or compile form data with given input.
 * @param {!boolean} ide_only True indicates only load sketch in IDE
 *                            False indicates compile and upload sketch 
 */
ArduinoMaterial.setIdeHtml = function(ide_only) {
  var new_value;
  if (ide_only == 'True') {
    new_value = 'ide_only';
  } else {
    new_value = 'ide_upload';
  }
  document.getElementById('ide_settings').value = new_value;
};

/**
 * Sets the IDE settings data with the input boolean.
 * @param {!boolean} ide_only Indicates if it only loads the sketch in the IDE
 *                            or compiles and upload.
 */
ArduinoMaterial.setIdeSettings = function(ide_value) {
  //var el = document.getElementById("ide_settings");
  //var ide_value = el.options[e.selectedIndex].value;
  var new_value;
  if (ide_value == 'ide_only') {
    new_value = true;
  } else if (ide_value == 'ide_upload') {
    new_value = false;
  }
  //TODO: check how ArduServerCompiler deals with invalid data and sanitise here
  ArduServerCompiler.setIdeOnly(new_value, ArduinoMaterial.setIdeHtml);
};

/**
 * Send the Arduino Code to the ArduServerCompiler to process.
 * Shows a loader around the button, blocking it (unblocked upon received
 * message from server).
 */
ArduinoMaterial.sendCode = function() {
  toast('"Run code" functionality still incomplete', 4000);
  ArduServerCompiler.sendSketchToServer(
      ArduinoMaterial.generateArduino(), ArduinoMaterial.sendCodeReturn);
  document.getElementById('button_run_spinner').style.display = 'block';
};

/**
 * Send the Arduino Code to the ArduServerCompiler to process
 */
ArduinoMaterial.sendCodeReturn = function(data_back) {
  document.getElementById('button_run_spinner').style.display = 'none';
  ArduinoMaterial.materialAlert(
      'Compilation ended',
      'Message back from the compiler: \n' +
      data_back);
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

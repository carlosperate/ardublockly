/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview JavaScript for Arduino app with material design
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var ArduinoMaterial = ArduinoMaterial || {};

/**
 * 
 */
ArduinoMaterial.bindBlocklyEventListeners = function() {
  Blockly.addChangeListener(ArduinoMaterial.renderContent);
}

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
ArduinoMaterial.renderContent = function() {
  var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  document.getElementById('content_xml').value = xmlText;
  //xmlTextarea.focus();
  var content = document.getElementById('content_arduino');
  var code = Blockly.Arduino.workspaceToCode();
  content.textContent = code;
  if (typeof prettyPrintOne == 'function') {
    code = content.innerHTML;
    code = prettyPrintOne(code, 'cpp');
    content.innerHTML = code;
  }
};

/**
 * Execute the user's code.
 * Just a quick and dirty eval.  Catch infinite loops.
 */
ArduinoMaterial.runCode = function() {
  alert('Function not yet implemented');
};

/**
 * Discard all blocks from the workspace.
 */
ArduinoMaterial.discard = function() {
  var count = Blockly.mainWorkspace.getAllBlocks().length;
  if (count < 2 ||
      window.confirm(MSG['discard'].replace('%1', count))) {
    Blockly.mainWorkspace.clear();
    window.location.hash = '';
  }
  ArduinoMaterial.renderContent();
};

/**
 * Open the XML containing the toolbox data
 * @param {!String} xml_path String containing the xml file path.
 * @return {!String} Contains the text in a single string.
 */
ArduinoMaterial.readToolbox = function(xml_path) {
  var request = new XMLHttpRequest();
  request.open("GET", xml_path, false);
  request.send(null);
  return request.responseText;
};

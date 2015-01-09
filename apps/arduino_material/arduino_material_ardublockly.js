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
 * Injects Blockly into a given text area
 */
ArduinoMaterial.injectBlockly = function(el) {
  var toolbox = ArduinoMaterial.readToolbox('arduino_toolbox.xml');
  Blockly.inject(el,
      { media: '../../media/',
        rtl: false,
        scrollbars: true,
        toolbox: toolbox });
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

/**
 * Renders the XML code into a given textarea
 * @param el Textarea element to save the code into.
 */
ArduinoMaterial.generateXml = function(el) {
  var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  el.value = xmlText;
};

/**
 * Renders the Arduino color highlighted code code into an element
 * @param el Pre element to save the code into.
 */
ArduinoMaterial.generateArduino = function(el) {
  var code = Blockly.Arduino.workspaceToCode();
  el.textContent = code;
  if (typeof prettyPrintOne == 'function') {
    code = el.innerHTML;
    code = prettyPrintOne(code, 'cpp');
    el.innerHTML = code;
  }
};

/**
 * Execute the user's code.
 */
ArduinoMaterial.runCode = function() {
  alert("function not yet implemented");
}

/**
 * Togglets the toolbar On and Off from the Blockly workspace
 */
ArduinoMaterial.toolbar_showing = true;
ArduinoMaterial.toogleToolbox = function() {
  
  var myElements = document.querySelectorAll(".blocklyToolboxDiv");
  
  if ( ArduinoMaterial.toolbar_showing == true ) {
    for (var i = 0; i < myElements.length; i++) {
      myElements[i].style.display = 'none';
    }
    ArduinoMaterial.toolbar_showing = false;
  } else {
   for (var i = 0; i < myElements.length; i++) {
      myElements[i].style.display = 'inline';
      //myElements[i].style.position = 'absolute';
    }
    ArduinoMaterial.toolbar_showing = true;
  }
  ArduinoMaterial.resizeBlocks();
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
 * Loads the blocks XML onto the blockly SVG area
 * @param {!String} xml_path String containing the xml file path.
 */
ArduinoMaterial.loadXMLblocks = function(xmlCode) {
  alert('Function not yet implemented');
};

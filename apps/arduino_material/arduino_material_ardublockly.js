/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview JavaScript for Arduino app with material design.
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var ArduinoMaterial = ArduinoMaterial || {};

/**
 * Public variable that indicates if Blockly has been injected.
 * @type {!boolean}
 */
ArduinoMaterial.BLOCKLY_INJECTED = false;

/**
 * Injects Blockly into a given text area. Reads the toolbox from an XMl file.
 * @param {!Element} el Element to inject Blockly into.
 * @param {!string} toolbox_path String containing the toolbox XML file path.
 */
ArduinoMaterial.injectBlockly = function(blockly_el, toolbox_path) {
  // Create a an XML HTTP request
  var request;
  try {   // Firefox, Chrome, IE7+, Opera, Safari
    request = new XMLHttpRequest();
  }
  catch (e) {
    try {   // IE6 and earlier
      request = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (e) {
        throw 'Your browser does not support AJAX. Cannot load toolbox';
      }
    }
  }
  request.open("GET", toolbox_path, true);

  // Once file is open, inject blockly into element with the toolbox string
  request.onreadystatechange = function() {
    if ( (request.readyState == 4) && (request.status == 200) ) {
      Blockly.inject(blockly_el, {
            media: '../../media/',
            rtl: false,
            scrollbars: true,
            toolbox: request.responseText });
      ArduinoMaterial.BLOCKLY_INJECTED = true;
    }
  }

  request.send(null);
};

/**
 * Renders the Arduino color highlighted code code into an element.
 * @return {!string} Arduino code string.
 */
ArduinoMaterial.generateArduino = function() {
  return Blockly.Arduino.workspaceToCode();
};

/**
 * Renders the XML code into a given text area.
 * @return {!string} XML code string.
 */
ArduinoMaterial.generateXml = function() {
  var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  return xmlText;
};

/**
 * Parses the XML from its input to generate and replace the blocks in the
 * Blockly workspace.
 * @param {!string} blocks_xml String of XML code for the blocks.
 * @return {!boolean} Indicates if the XML into blocks parse was successful.
 */
ArduinoMaterial.replaceBlocksfromXml = function(blocks_xml) {
  var xmlDom = null;
  try {
    xmlDom = Blockly.Xml.textToDom(blocks_xml);
  } catch (e) {
    return false;
  }
  Blockly.mainWorkspace.clear();
  var sucess = false;
  if (xmlDom) {
    sucess = ArduinoMaterial.loadBlocksfromXmlDom(xmlDom);
  }
  return sucess;
};

/**
 * Parses the XML from its input to generate and add blocks to the workspace.
 * @param {!string} blocks_xml_dom String of XML DOM code for the blocks.
 * @return {!boolean} Indicates if the XML into blocks parse was successful.
 */
ArduinoMaterial.loadBlocksfromXmlDom = function(blocks_xml_dom) {
  try {
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, blocks_xml_dom);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 * Scrolls In or Out the toolbox from the Blockly workspace.
 * As the jQuery animation takes some time a callback is used to continue
 * operation.
 * @param {!boolean} show Indicates to show or hide the toolbox.
 * @param {function=} callback Function to be called once the animation is
 *                             finished.
 */
ArduinoMaterial.showToolbox = function(show, callback) {
  var toolbox = $( ".blocklyToolboxDiv" );
  if (show == false) {
    toolbox.slideUp('slow', callback);
  } else {
    toolbox.slideDown('slow', callback);
  }
  ArduinoMaterial.resizeBlocklyWorkspace();
};

/**
 * Discard all blocks from the workspace.
 */
ArduinoMaterial.discard = function() {
  var block_count = Blockly.mainWorkspace.getAllBlocks().length;
  if (block_count == 1) {
    Blockly.mainWorkspace.clear();
    ArduinoMaterial.renderContent();
  } else if (block_count > 1) {
    ArduinoMaterial.materialAlert(
        'Delete blocks?',
        'There are ' + block_count + ' blocks on the workspace. Are you \
        sure you want to delete them?',
        true,
        function() {
          Blockly.mainWorkspace.clear();
          ArduinoMaterial.renderContent();
        });
  }
};

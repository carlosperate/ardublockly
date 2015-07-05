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
 * Blockly's main workspace.
 * @type Blockly.WorkspaceSvg
 */
ArduinoMaterial.workspace = null;

/**
 * Public variable that indicates if Blockly has been injected.
 * @type {!boolean}
 */
ArduinoMaterial.BLOCKLY_INJECTED = false;

/**
 * Injects Blockly into a given HTML element. Reads the toolbox from an XMl
 * file.
 * @param {!Element} blocklyEl Element to inject Blockly into.
 * @param {!string} toolboxPath String containing the toolbox XML file path.
 */
ArduinoMaterial.injectBlockly = function(blocklyEl, toolboxPath) {
  // Create a an XML HTTP request
  var request = ArduinoMaterial.ajaxRequest();

  // If file run locally Internet explorer fails here
  try {
    request.open('GET', toolboxPath, true);
  } catch(e) {
    $('#not_running_dialog').openModal();
  }

  // Once file is open, inject blockly into element with the toolbox string
  request.onreadystatechange = function() {
    if ( (request.readyState == 4) && (request.status == 200) ) {
      ArduinoMaterial.workspace = Blockly.inject(blocklyEl, {
            collapse: true,
            comments: true,
            disable: true,
            media: '../blockly/media/',
            rtl: false,
            scrollbars: true,
            toolbox: request.responseText,
            trashcan: true });
      ArduinoMaterial.BLOCKLY_INJECTED = true;
    }
  };

  // If file run locally Chrome will fail here
  try {
    request.send(null);
  } catch(e) {
    $('#not_running_dialog').openModal();
  }
};

/**
 * Loads an XML file from the server and adds the blocks into the Blockly
 * workspace.
 */
ArduinoMaterial.loadXmlBlockFile = function(xmlFile, callbackFileLoaded, 
    callbackConectonError) {
  // Create a an XML HTTP request
  var request = ArduinoMaterial.ajaxRequest();

  // If file run locally Internet explorer fails here
  try {
    request.open('GET', xmlFile, true);
  } catch(e) {
    callbackConectonError();
  }

  // Once file is open, parse the XML into the workspace
  request.onreadystatechange = function() {
    if ( (request.readyState == 4) && (request.status == 200) ) {
      var success = ArduinoMaterial.replaceBlocksfromXml(request.responseText);
      callbackFileLoaded(success);
    }
  }

  // If file run locally Chrome will fail here
  try {
    request.send(null);
  } catch(e) {
    callbackConectonError();
  }
};

/**
 * Renders the Arduino color highlighted code code into an element.
 * @return {!string} Arduino code string.
 */
ArduinoMaterial.generateArduino = function() {
  return Blockly.Arduino.workspaceToCode(ArduinoMaterial.workspace);
};

/**
 * Renders the XML code into a given text area.
 * @return {!string} XML code string.
 */
ArduinoMaterial.generateXml = function() {
  var xmlDom = Blockly.Xml.workspaceToDom(ArduinoMaterial.workspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  return xmlText;
};

/**
 * Parses the XML from its input to generate and replace the blocks in the
 * Blockly workspace.
 * @param {!string} blocksXml String of XML code for the blocks.
 * @return {!boolean} Indicates if the XML into blocks parse was successful.
 */
ArduinoMaterial.replaceBlocksfromXml = function(blocksXml) {
  var xmlDom = null;
  try {
    xmlDom = Blockly.Xml.textToDom(blocksXml);
  } catch (e) {
    return false;
  }
  ArduinoMaterial.workspace.clear();
  var sucess = false;
  if (xmlDom) {
    sucess = ArduinoMaterial.loadBlocksfromXmlDom(xmlDom);
  }
  return sucess;
};

/**
 * Parses the XML from its input to generate and add blocks to the workspace.
 * @param {!string} blocksXmlDom String of XML DOM code for the blocks.
 * @return {!boolean} Indicates if the XML into blocks parse was successful.
 */
ArduinoMaterial.loadBlocksfromXmlDom = function(blocksXmlDom) {
  try {
    Blockly.Xml.domToWorkspace(ArduinoMaterial.workspace, blocksXmlDom);
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
  var resizeWorkspaceAndCallback = function() {
    ArduinoMaterial.workspace.render(); 
    if (callback && ((typeof callback) === (typeof Function))) {
      callback();
    }
  };

  if (show == false) {
    $('.blocklyToolboxDiv').slideUp(300, resizeWorkspaceAndCallback);
  } else {
    $('.blocklyToolboxDiv').slideDown(300, resizeWorkspaceAndCallback);
  }
};

/**
 * Discard all blocks from the workspace.
 */
ArduinoMaterial.discard = function() {
  var blockCount = ArduinoMaterial.workspace.getAllBlocks().length;
  if (blockCount == 1) {
    ArduinoMaterial.workspace.clear();
    ArduinoMaterial.renderContent();
  } else if (blockCount > 1) {
    ArduinoMaterial.materialAlert(
        'Delete blocks?',
        'There are ' + blockCount + ' blocks on the workspace. Are you \
        sure you want to delete them?',
        true,
        function() {
          ArduinoMaterial.workspace.clear();
          ArduinoMaterial.renderContent();
        });
  }
};

/**
 * Checks if Blockly is currently dragging a block.
 */
ArduinoMaterial.blocklyIsDragging = function() {
  if (Blockly.dragMode_ != 0) {
    return true;
  }
  return false;
};

/**
 * Wraps the blockly 'cut' functionality.
 */
ArduinoMaterial.blocklyCut = function() {
  Blockly.copy_(Blockly.selected);
  Blockly.selected.dispose(true, true);
};

/**
 * Wraps the blockly 'copy' functionality.
 */
ArduinoMaterial.blocklyCopy = function() {
  Blockly.hideChaff();
  Blockly.copy_(Blockly.selected);
};

/**
 * Wraps the blockly 'paste' functionality.
 */
ArduinoMaterial.blocklyPaste = function() {
  if (Blockly.clipboardXml_) {
    Blockly.hideChaff();
    Blockly.clipboardSource_.paste(Blockly.clipboardXml_);
  }
};

/**
 * Wraps the blockly 'paste' functionality.
 */
ArduinoMaterial.blocklyDelete = function() {
    if (Blockly.selected && Blockly.selected.isDeletable()) {
      Blockly.hideChaff();
      Blockly.selected.dispose(true, true);
    }
};

/**
 * Creates an AJAX request.
 * @return An XML HTTP Request.
 */
ArduinoMaterial.ajaxRequest = function() {
  var request;
  try {
    // Firefox, Chrome, IE7+, Opera, Safari
    request = new XMLHttpRequest();
  } catch (e) {
    try {
      // IE6 and earlier
      request = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
      try {
        request = new ActiveXObject('Microsoft.XMLHTTP');
      } catch (e) {
        throw 'Your browser does not support AJAX. Cannot load toolbox';
        request = null;
      }
    }
  }
  return request;
};

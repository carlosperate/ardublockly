/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Ardublockly JavaScript for the Blockly resources and bindings.
 */
'use strict';

/** Create a namespace for the application. */
var Ardublockly = Ardublockly || {};

/**
 * Blockly main workspace.
 * @type Blockly.WorkspaceSvg
 */
Ardublockly.workspace = null;

/**
 * Public variable that indicates if Blockly has been injected.
 * @type {!boolean}
 * @private
 */
Ardublockly.BLOCKLY_INJECTED_ = false;

/**
 * Injects Blockly into a given HTML element. Reads the toolbox from an XMl
 * file.
 * @param {!Element} blocklyEl Element to inject Blockly into.
 * @param {!string} toolboxPath String containing the toolbox XML file path.
 * @param {!string} blocklyPath String containing the Blockly directory path.
 */
Ardublockly.injectBlockly = function(blocklyEl, toolboxPath, blocklyPath) {
  // Remove any trailing slashes in the blockly path
  if (blocklyPath.substr(-1) === '/') {
    blocklyPath = blocklyPath.slice(0, -1);
  }

  // Create a an XML HTTP request
  var request = Ardublockly.ajaxRequest();

  // If file run locally Internet explorer fails here
  try {
    request.open('GET', toolboxPath, true);
  } catch (e) {
    $('#not_running_dialog').openModal();
  }

  // Once file is open, inject blockly into element with the toolbox string
  request.onreadystatechange = function() {
    if ((request.readyState == 4) && (request.status == 200)) {
      var xmlTree = Blockly.Xml.textToDom(request.responseText);
      Ardublockly.updateToolboxLanguage(xmlTree);
      Ardublockly.workspace = Blockly.inject(blocklyEl, {
          collapse: true,
          comments: true,
          css: true,
          disable: true,
          grid: false,
          media: blocklyPath + '/media/',
          rtl: false,
          scrollbars: true,
          sounds: true,
          toolbox: xmlTree,
          trashcan: true,
          zoom: {
            enabled: true,
            controls: true,
            wheel: false,
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.3
          }
      });
      Ardublockly.BLOCKLY_INJECTED_ = true;
      Ardublockly.loadSessionStorageBlocks();
    }
  };

  // If file run locally Chrome will fail here
  try {
    request.send(null);
  } catch (e) {
    $('#not_running_dialog').openModal();
  }
};

/** @return {!boolean} Returns the state of Blockly injection. */
Ardublockly.isBlocklyInjected = function() {
  return Ardublockly.BLOCKLY_INJECTED_;
};

/** Binds the event listeners relevant to Blockly. */
Ardublockly.bindBlocklyEventListeners = function() {
  // As the toolbox inject is asynchronous we need to wait until done
  if (Ardublockly.BLOCKLY_INJECTED_ == false) {
    setTimeout(Ardublockly.bindBlocklyEventListeners, 50);
  } else {
    // All event listener should be bind in this else statement
    // Renders the code and XML for every Blockly workspace event
    Ardublockly.workspace.addChangeListener(Ardublockly.renderContent);
  }
};

/**
 * Loads an XML file from the server and adds the blocks into the Blockly
 * workspace.
 * @param {!string} xmlFile XML file path in a reachable server (no local path).
 * @param {!function} callbackFileLoaded Function to be called once the file is
 *     loaded.
 * @param {!function} callbackConectonError Function to be called if there is a
 *     connection error to the XML server.
 */
Ardublockly.loadXmlBlockFile = function(xmlFile, callbackFileLoaded,
    callbackConectonError) {
  // Create a an XML HTTP request
  var request = Ardublockly.ajaxRequest();

  // If file run locally Internet explorer fails here
  try {
    request.open('GET', xmlFile, true);
  } catch (e) {
    callbackConectonError();
  }

  // Once file is open, parse the XML into the workspace
  request.onreadystatechange = function() {
    if ((request.readyState == 4) && (request.status == 200)) {
      var success = Ardublockly.replaceBlocksfromXml(request.responseText);
      callbackFileLoaded(success);
    }
  };

  // If file run locally Chrome will fail here
  try {
    request.send(null);
  } catch (e) {
    callbackConectonError();
  }
};

/**
 * Generates the Arduino code from the Blockly workspace.
 * @return {!string} Arduino code string.
 */
Ardublockly.generateArduino = function() {
  return Blockly.Arduino.workspaceToCode(Ardublockly.workspace);
};

/**
 * Generates the XML DOM and returns it as a string.
 * @return {!string} XML code string.
 */
Ardublockly.generateXml = function() {
  var xmlDom = Blockly.Xml.workspaceToDom(Ardublockly.workspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  return xmlText;
};

/**
 * Parses the XML from its argument input to generate and replace the blocks
 * in the Blockly workspace.
 * @param {!string} blocksXml String of XML code for the blocks.
 * @return {!boolean} Indicates if the XML into blocks parse was successful.
 */
Ardublockly.replaceBlocksfromXml = function(blocksXml) {
  var xmlDom = null;
  try {
    xmlDom = Blockly.Xml.textToDom(blocksXml);
  } catch (e) {
    return false;
  }
  Ardublockly.workspace.clear();
  var sucess = false;
  if (xmlDom) {
    sucess = Ardublockly.loadBlocksfromXmlDom(xmlDom);
  }
  return sucess;
};

/**
 * Parses the XML from its argument input to generate and add blocks to the
 * Blockly workspace.
 * @param {!string} blocksXmlDom String of XML DOM code for the blocks.
 * @return {!boolean} Indicates if the XML into blocks parse was successful.
 */
Ardublockly.loadBlocksfromXmlDom = function(blocksXmlDom) {
  try {
    Blockly.Xml.domToWorkspace(Ardublockly.workspace, blocksXmlDom);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 * Save blocks into session storage. Note that MSIE 11 does not support
 * sessionStorage on file:// URLs.
 */
Ardublockly.saveSessionStorageBlocks = function() {
  if (window.sessionStorage) {
    var xml = Blockly.Xml.workspaceToDom(Ardublockly.workspace);
    var text = Blockly.Xml.domToText(xml);
    window.sessionStorage.loadOnceBlocks = text;
  }
};

/** Load blocks saved on session storage and deletes them from storage. */
Ardublockly.loadSessionStorageBlocks = function() {
  try {
    var loadOnce = window.sessionStorage.loadOnceBlocks;
  } catch (e) {
    // Firefox sometimes throws a SecurityError when accessing sessionStorage.
    // Restarting Firefox fixes this, so it looks like a bug.
    var loadOnce = null;
  }
  if (loadOnce) {
    delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(loadOnce);
    Blockly.Xml.domToWorkspace(Ardublockly.workspace, xml);
  }
};

/** Discard all blocks from the workspace. */
Ardublockly.discardAllBlocks = function() {
  var blockCount = Ardublockly.workspace.getAllBlocks().length;
  if (blockCount == 1) {
    Ardublockly.workspace.clear();
    Ardublockly.renderContent();
  } else if (blockCount > 1) {
    Ardublockly.alertMessage(
        'Delete blocks?',
        'There are ' + blockCount + ' blocks on the workspace. Are you sure ' +
        'you want to delete them?',
        true,
        function() {
          Ardublockly.workspace.clear();
          Ardublockly.renderContent();
        });
  }
};

/**
 * Changes the Arduino board profile if different from the currently set one.
 * @param {string} newBoard Name of the new profile to set.
 */
Ardublockly.changeBlocklyArduinoBoard = function(newBoard) {
  if (Blockly.Arduino.Boards.selected !== Blockly.Arduino.Boards[newBoard]) {
    Blockly.Arduino.Boards.changeBoard(Ardublockly.workspace, newBoard);
  }
};

/**
 * Update the toolbox categories language.
 * @param {!Element} xmlTree Toolbox tree of XML elements.
 */
Ardublockly.updateToolboxLanguage = function(xmlTree) {
  var categories = ['catLogic', 'catLoops', 'catMath', 'catText',
                    'catVariables', 'catFunctions', 'catInputOutput',
                    'catTime', 'catMotors', 'catComms'];
  var categoryNodes = xmlTree.getElementsByTagName('category');
  for (var i = 0, cat; cat = categoryNodes[i]; i++) {
    var catId = cat.getAttribute('id');
    if (MSG[catId]) {
      cat.setAttribute('name', MSG[catId]);
    }
  }
};

/** Closes the toolbox block container sub-menu. */
Ardublockly.blocklyCloseToolbox = function() {
  Ardublockly.workspace.toolbox_.flyout_.hide();
};

/** @return {!integer} The width of the blockly workspace toolbox. */
Ardublockly.blocklyToolboxWidth = function() {
  return Ardublockly.workspace.toolbox_.width;
};

/** @return {!boolean} Indicates if a block is currently being dragged. */
Ardublockly.blocklyIsDragging = function() {
  if (Blockly.dragMode_ != 0) {
    return true;
  }
  return false;
};

/** Wraps the blockly 'cut' functionality. */
Ardublockly.blocklyCut = function() {
  Blockly.copy_(Blockly.selected);
  Blockly.selected.dispose(true, true);
};

/** Wraps the blockly 'copy' functionality. */
Ardublockly.blocklyCopy = function() {
  Blockly.hideChaff();
  Blockly.copy_(Blockly.selected);
};

/** Wraps the blockly 'paste' functionality. */
Ardublockly.blocklyPaste = function() {
  if (Blockly.clipboardXml_) {
    Blockly.hideChaff();
    Blockly.clipboardSource_.paste(Blockly.clipboardXml_);
  }
};

/** Wraps the blockly 'delete' functionality. */
Ardublockly.blocklyDelete = function() {
  if (Blockly.selected && Blockly.selected.isDeletable()) {
    Blockly.hideChaff();
    Blockly.selected.dispose(true, true);
  }
};

/** @return {XMLHttpRequest} An XML HTTP Request multi-browser compatible. */
Ardublockly.ajaxRequest = function() {
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

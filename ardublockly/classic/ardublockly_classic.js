/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview JavaScript for ArduBlockly's Arduino Code application.
 *               Based on the "Code" app developed by:
 *               fraser@google.com (Neil Fraser)
 */
'use strict';

/** Create a namespace for the application. */
var ArdublocklyClassic = {};

/**
 * Blockly's main workspace.
 * @type Blockly.WorkspaceSvg
 */
ArdublocklyClassic.workspace = null;

/**
 * List of tab names.
 * @private
 */
ArdublocklyClassic.TABS_ = ['blocks', 'arduino', 'xml'];

/** Indicates the currently selected tab. */
ArdublocklyClassic.selected = 'blocks';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
ArdublocklyClassic.tabClick = function(clickedName) {
  // If the XML tab was open, save and render the content.
  if (document.getElementById('tab_xml').className == 'tabon') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlText = xmlTextarea.value;
    ArdublocklyClassic.replaceBlocksfromXml(xmlText);
  }

  // Deselect the button, and ensure side panel is hidden
  ArdublocklyClassic.peekCode(false);

  // Deselect all tabs and hide all panes.
  for (var i = 0; i < ArdublocklyClassic.TABS_.length; i++) {
    var name = ArdublocklyClassic.TABS_[i];
    document.getElementById('tab_' + name).className = 'taboff';
    document.getElementById('content_' + name).style.display = 'none';
  }

  // Select the active tab and panel
  ArdublocklyClassic.selected = clickedName;
  document.getElementById('tab_' + clickedName).className = 'tabon';
  document.getElementById('content_' + clickedName).style.display = 'block';

  // This is a workaround, something about the html layout causes the blocks to
  // compress when the block tab is shown after it has been hidden
  if (clickedName === 'blocks' && ArdublocklyClassic.workspace) {
    ArdublocklyClassic.workspace.setVisible(false);
    ArdublocklyClassic.workspace.setVisible(true);
  }
  ArdublocklyClassic.renderContent();

  window.dispatchEvent(new Event('resize'));
};

/**
 * Populate the currently selected panel with content generated from the blocks.
 */
ArdublocklyClassic.renderContent = function() {
  var content = document.getElementById(
      'content_' + ArdublocklyClassic.selected);
  // Initialize the panel
  if (content.id == 'content_xml') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlDom = Blockly.Xml.workspaceToDom(ArdublocklyClassic.workspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlTextarea.value = xmlText;
    xmlTextarea.focus();
  } else if (content.id == 'content_arduino') {
    var code = Blockly.Arduino.workspaceToCode(ArdublocklyClassic.workspace);
    content.textContent = code;
    if (typeof prettyPrintOne == 'function') {
      code = content.innerHTML;
      code = prettyPrintOne(code, 'cpp');
      content.innerHTML = code;
    }
  }
};

/** Initialize Blockly.  Called on page load. */
ArdublocklyClassic.init = function() {
  ArdublocklyClassic.adjustViewport();

  // Inject Blockly asynchronously into content_blocks
  ArdublocklyClassic.injectBlockly(
      document.getElementById('content_blocks'), '../ardublockly_toolbox.xml');

  // Create function to resize blockly if page layout changes
  var onresize = function(e) {
    var bBox = ArdublocklyClassic.getBBox_(
        document.getElementById('content_wrapper'));
    for (var i = 0; i < ArdublocklyClassic.TABS_.length; i++) {
      var el = document.getElementById(
          'content_' + ArdublocklyClassic.TABS_[i]);
      el.style.top = bBox.y + 'px';
      el.style.left = bBox.x + 'px';
      // Height and width need to be set, read back, then set again to
      // compensate for scrollbars.
      el.style.height = bBox.height + 'px';
      el.style.height = (2 * bBox.height - el.offsetHeight) + 'px';
      el.style.width = bBox.width + 'px';
      el.style.width = (2 * bBox.width - el.offsetWidth) + 'px';
    }
    // Make the 'Blocks' tab line up with the toolbox.
    if (ArdublocklyClassic.workspace.toolbox_.width) {
      document.getElementById('tab_blocks').style.minWidth =
          (ArdublocklyClassic.workspace.toolbox_.width - 38) + 'px';
          // Account for the 19 pixel margin and on each side.
    }
  };

  // As Blockly is injected in parallel the binding only happens when done
  var bindBlocklyEventListener = function() {
    if (ArdublocklyClassic.BLOCKLY_INJECTED == false) {
      setTimeout(bindBlocklyEventListener, 50);
    } else {
      window.addEventListener('resize', onresize, false);
      window.dispatchEvent(new Event('resize'));
    }
  };
  bindBlocklyEventListener();

  ArdublocklyClassic.tabClick(ArdublocklyClassic.selected);

  // Binding buttons
  ArdublocklyClassic.bindClick('peek_code', ArdublocklyClassic.peekCode);
  ArdublocklyClassic.bindClick(
      'openButton', ArdublocklyClassic.loadUserXmlFile);
  ArdublocklyClassic.bindClick('saveButton', ArdublocklyClassic.saveXmlFile);
  ArdublocklyClassic.bindClick('trashButton', ArdublocklyClassic.discard);
  ArdublocklyClassic.bindClick(
      'settingsButton', ArdublocklyClassic.openSettings);
  ArdublocklyClassic.bindClick('runButton', ArdublocklyClassic.loadToArduino);

  // Binding tabs
  for (var i = 0; i < ArdublocklyClassic.TABS_.length; i++) {
    var name = ArdublocklyClassic.TABS_[i];
    ArdublocklyClassic.bindClick('tab_' + name,
        function(name_) {
          return function() {ArdublocklyClassic.tabClick(name_);};
        }(name));
  }

  // Check if not running locally (including developer's local network IP)
  if (document.location.hostname != 'localhost' &&
      document.location.hostname != '192.168.0.7') {
    alert('Ardublockly not running locally\n\n' +
          'For Ardublockly to work correctly, the Ardublockly server must be' +
          ' running locally on your computer.');
  }
};
window.addEventListener('load', ArdublocklyClassic.init);

/** Fixes viewport for small screens. */
ArdublocklyClassic.adjustViewport = function() {
  var viewport = document.querySelector('meta[name="viewport"]');
  if (viewport && screen.availWidth < 725) {
    viewport.setAttribute('content',
        'width=725, initial-scale=.35, user-scalable=no');
  }
};

/** Open a centred pop up with the server compiler settings. */
ArdublocklyClassic.openSettings = function() {
  var width = 500;
  var height = 400;
  var left = (screen.width / 2) - (width / 2);
  var top = (screen.height / 2) - (height / 2);
  window.open('settings.html', '_blank',
      'directories=no, titlebar=no, toolbar=no, location=no, status=no, ' +
      'menubar=no, scrollbars=yes, resizable=yes, top=' + top + ', ' +
      'left=' + left + ', width=' + width + ', height=' + height + '');
};

/** Send the Arduino Code to the ArdublocklyServer to process. */
ArdublocklyClassic.loadToArduino = function() {
  ArdublocklyServer.sendSketchToServer(
      Blockly.Arduino.workspaceToCode(ArdublocklyClassic.workspace),
      ArdublocklyClassic.loadToArduinoReturn);
};

/**
 * Displays the IDE output into a modal overlay.
 * Ensures there is a change listener to call 'setSerialPort' function.
 * @param {element} jsonResponse JSON data coming back from the server.
 */
ArdublocklyClassic.loadToArduinoReturn = function(jsonResponse) {
  if (jsonResponse != null) {
    var dataBack = ArdublocklyServer.createElementFromJson(jsonResponse);
    // edit modal with new content
    var modal = document.getElementById('modal_content');
    modal.innerHTML = '';
    modal.appendChild(dataBack);
    // display modal
    document.getElementById('modal_toggle').checked = true;
  } else {
    alert('Ardublockly not running locally\n\n' +
          'To load the blocks code into an Arduino the For Ardublockly ' +
          'server must be running locally on your computer.');
  }
};

/** Discard all blocks from the workspace. */
ArdublocklyClassic.discard = function() {
  var count = ArdublocklyClassic.workspace.getAllBlocks().length;
  var message = 'Delete all ' + count + ' blocks?';
  if (count < 2 || window.confirm(message)) {
    ArdublocklyClassic.workspace.clear();
    window.location.hash = '';
  }
  ArdublocklyClassic.renderContent();
};

/**
 * Store the state the code sidebar visibility
 * @private
 */
ArdublocklyClassic.peekCode_ = false;

/**
 * Loads/unloads the side div with a code peek
 * @param {boolean?} visible Optional argument, indicates the new visibility of
 *                           the code preview.
 */
ArdublocklyClassic.peekCode = function(visible) {
  var peekCodeButton = document.getElementById('peek_code');
  var codePeekContent = document.getElementById('arduino_code_peek');

  if (visible == true) {
    ArdublocklyClassic.peekCode_ = false;
  } else if (visible == false) {
    ArdublocklyClassic.peekCode_ = true;
  }

  if (ArdublocklyClassic.peekCode_ == false) {
    ArdublocklyClassic.peekCode_ = true;
    peekCodeButton.className = 'button_text secondary';
    ArdublocklyClassic.sideContent(true);
    codePeekContent.style.display = 'inline-block';
    // Regenerate arduino code and ensure every click does as well
    ArdublocklyClassic.renderArduinoPeekCode();
    ArdublocklyClassic.workspace.addChangeListener(
        ArdublocklyClassic.renderArduinoPeekCode);
  } else {
    ArdublocklyClassic.peekCode_ = false;
    peekCodeButton.className = 'button_text';
    codePeekContent.style.display = 'none';
    ArdublocklyClassic.sideContent(false);
    // Remove action listeners. TODO: track listener so that first time does not
    // crashes
    //Blockly.removeChangeListener(renderArduinoPeekCode);
  }
};

/**
 * Configure the Block panel to display content on the right
 * @param {boolean} visible Indicated if the content should be shown or hidden.
 */
ArdublocklyClassic.sideContent = function(visible) {
  var sideContent = document.getElementById('side_content');
  var blockContent = document.getElementById('content_blocks');

  // Deselect all tabs and hide all panes.
  for (var i = 0; i < ArdublocklyClassic.TABS_.length; i++) {
    var name = ArdublocklyClassic.TABS_[i];
    document.getElementById('tab_' + name).className = 'taboff';
    document.getElementById('content_' + name).style.display = 'none';
  }

  if (visible === true) {
    // Rearrange panels for blocks and side contents
    blockContent.style.display = 'inline-block';
    document.getElementById('tab_blocks').className = 'tabon';
    blockContent.className = 'content content_blocks_side';
    sideContent.style.display = 'inline-block';
  } else {
    // Restore to original state
    sideContent.style.display = 'none';
    blockContent.className = 'content content_blocks';
    // Select the active tab and panel
    document.getElementById(
        'tab_' + ArdublocklyClassic.selected).className = 'tabon';
    document.getElementById(
        'content_' + ArdublocklyClassic.selected).style.display = 'block';
  }

  window.dispatchEvent(new Event('resize'));
  ArdublocklyClassic.renderContent();
};

/** Updates the Arduino code in the pre area based on the blocks. */
ArdublocklyClassic.renderArduinoPeekCode = function() {
  var codePeakPre = document.getElementById('arduino_pre');
  codePeakPre.textContent = Blockly.Arduino.workspaceToCode(
      ArdublocklyClassic.workspace);
  if (typeof prettyPrintOne == 'function') {
    codePeakPre.innerHTML = prettyPrintOne(codePeakPre.innerHTML, 'cpp');
  }
};

/**
 * Public variable that indicates if Blockly has been injected.
 * @type {!boolean}
 */
ArdublocklyClassic.BLOCKLY_INJECTED = false;

/**
 * Injects Blockly into a given text area. Reads the toolbox from an XMl file.
 * @param {!Element} blocklyEl Element to inject Blockly into.
 * @param {!string} toolboxPath String containing the toolbox XML file path.
 */
ArdublocklyClassic.injectBlockly = function(blocklyEl, toolboxPath) {
  // Create a an XML HTTP request
  var request;
  try {   // Firefox, Chrome, IE7+, Opera, Safari
    request = new XMLHttpRequest();
  }
  catch (e) {
    try {   // IE6 and earlier
      request = new ActiveXObject('Msxml2.XMLHTTP');
    }
    catch (e) {
      try {
        request = new ActiveXObject('Microsoft.XMLHTTP');
      }
      catch (e) {
        throw 'Your browser does not support AJAX. Cannot load toolbox';
      }
    }
  }
  request.open('GET', toolboxPath, true);

  // Once file is open, inject blockly into element with the toolbox string
  request.onreadystatechange = function() {
    if ((request.readyState == 4) && (request.status == 200)) {
      ArdublocklyClassic.workspace = Blockly.inject(blocklyEl, {
            collapse: true,
            comments: true,
            disable: true,
            media: '../../blockly/media/',
            rtl: false,
            scrollbars: true,
            toolbox: request.responseText,
            trashcan: true });
      ArdublocklyClassic.BLOCKLY_INJECTED = true;
    }
  };

  request.send(null);
};

/**
 * Loads an XML file from the users file system and adds the blocks into the
 * Blockly workspace.
 */
ArdublocklyClassic.loadUserXmlFile = function() {
  // Create event listener function
  var parseInputXMLfile = function(e) {
    var files = e.target.files;
    var reader = new FileReader();
    reader.onload = function() {
      var success = ArdublocklyClassic.replaceBlocksfromXml(reader.result);
      if (success) {
        ArdublocklyClassic.renderContent();
      } else {
        alert('Invalid XML!\nThe XML file was not successfully parsed into ' +
              'blocks. Please review the XML code and try again.');
      }
    };
    reader.readAsText(files[0]);
  };
  // Create once invisible browse button with event listener, and click it
  var selectFile = document.getElementById('select_file');
  if (selectFile == null) {
    var selectFileDom = document.createElement('INPUT');
    selectFileDom.type = 'file';
    selectFileDom.id = 'select_file';
    selectFileDom.style.display = 'none';
    document.body.appendChild(selectFileDom);
    selectFile = document.getElementById('select_file');
    selectFile.addEventListener('change', parseInputXMLfile, false);
  }
  selectFile.click();
};

/**
 * Parses the XML from its input to generate and replace the blocks in the
 * Blockly workspace.
 * @param {!string} blocksXml String of XML code for the blocks.
 * @return {!boolean} Indicates if the XML into blocks parse was successful.
 */
ArdublocklyClassic.replaceBlocksfromXml = function(blocksXml) {
  var xmlDom = null;
  var success = true;
  try {
    xmlDom = Blockly.Xml.textToDom(blocksXml);
  } catch (e) {
    success = false;
    var message = 'Error parsing XML:\n' + e + '\n\nSelect \'OK\' to ' +
    'abandon your changes or \'Cancel\' to further edit the XML.';
    var errorAlert = window.confirm(message);
    if (!errorAlert) {
      // Leave the user on the current state
      return success;
    }
  }
  if (xmlDom) {
    ArdublocklyClassic.workspace.clear();
    Blockly.Xml.domToWorkspace(xmlDom, ArdublocklyClassic.workspace);
  }
  return success;
};

/**
 * Creates an XML file containing the blocks from the Blockly workspace and
 * prompts the users to save it into their local file system.
 */
ArdublocklyClassic.saveXmlFile = function() {
  // Generate XML
  var xmlDom = Blockly.Xml.workspaceToDom(ArdublocklyClassic.workspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  // Create blob
  var blob = new Blob(
      [xmlText],
      {type: 'text/plain;charset=utf-8'});
  // Prompt user to save as a file
  saveAs(blob, 'ardublockly.xml');
};

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
 */
ArdublocklyClassic.bindClick = function(el, func) {
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

/**
 * Compute the absolute coordinates and dimensions of an HTML element.
 * @param {!Element} element Element to match.
 * @return {!Object} Contains height, width, x, and y properties.
 * @private
 */
ArdublocklyClassic.getBBox_ = function(element) {
  var height = element.offsetHeight;
  var width = element.offsetWidth;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  return {
    height: height,
    width: width,
    x: x,
    y: y
  };
};

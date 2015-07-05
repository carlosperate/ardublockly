/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview JavaScript for ArduBlockly's Arduino Code application.
 *               Based on the "Code" app developed by:
 *               fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var ArduinoClassic = {};

/**
 * List of tab names.
 * @private
 */
ArduinoClassic.TABS_ = ['blocks', 'arduino', 'xml'];

ArduinoClassic.selected = 'blocks';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
ArduinoClassic.tabClick = function(clickedName) {
  // If the XML tab was open, save and render the content.
  if (document.getElementById('tab_xml').className == 'tabon') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlText = xmlTextarea.value;
    ArduinoClassic.replaceBlocksfromXml(xmlText);
  }

  // Deselect the button, and ensure side panel is hidden
  ArduinoClassic.peekCode(false);

  // Deselect all tabs and hide all panes.
  for (var i = 0; i < ArduinoClassic.TABS_.length; i++) {
    var name = ArduinoClassic.TABS_[i];
    document.getElementById('tab_' + name).className = 'taboff';
    document.getElementById('content_' + name).style.display = 'none';
  }

  // Select the active tab and panel
  ArduinoClassic.selected = clickedName;
  document.getElementById('tab_' + clickedName).className = 'tabon';
  document.getElementById('content_' + clickedName).style.display = 'block';
  ArduinoClassic.renderContent();
  Blockly.fireUiEvent(window, 'resize');
};

/**
 * Populate the currently selected panel with content generated from the blocks.
 */
ArduinoClassic.renderContent = function() {
  var content = document.getElementById('content_' + ArduinoClassic.selected);
  // Initialize the panel
  if (content.id == 'content_xml') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlTextarea.value = xmlText;
    xmlTextarea.focus();
  } else if (content.id == 'content_arduino') {
    var code = Blockly.Arduino.workspaceToCode();
    content.textContent = code;
    if (typeof prettyPrintOne == 'function') {
      code = content.innerHTML;
      code = prettyPrintOne(code, 'cpp');
      content.innerHTML = code;
    }
  }
};

/**
 * Initialize Blockly.  Called on page load.
 */
ArduinoClassic.init = function() {
  ArduinoClassic.adjustViewport();

  // Inject Blockly asynchronously into content_blocks
  ArduinoClassic.injectBlockly(
      document.getElementById('content_blocks'), '../ardublockly_toolbox.xml');

  // Create function to resize blockly if page layout changes
  var onresize = function(e) {
    var bBox = ArduinoClassic.getBBox_(document.getElementById('content_wrapper'));
    for (var i = 0; i < ArduinoClassic.TABS_.length; i++) {
      var el = document.getElementById('content_' + ArduinoClassic.TABS_[i]);
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
    if (Blockly.mainWorkspace.toolbox_.width) {
      document.getElementById('tab_blocks').style.minWidth =
          (Blockly.mainWorkspace.toolbox_.width - 38) + 'px';
          // Account for the 19 pixel margin and on each side.
    }
  };

  // As Blockly is injected in parallel the binding only happens when done
  var bindBlocklyEventListener = function() {
    if (ArduinoClassic.BLOCKLY_INJECTED == false) {
      setTimeout(bindBlocklyEventListener, 50);
    } else {
      window.addEventListener('resize', onresize, false);
      Blockly.fireUiEvent(window, 'resize');
    }
  };
  bindBlocklyEventListener();

  ArduinoClassic.tabClick(ArduinoClassic.selected);

  // Binding buttons
  ArduinoClassic.bindClick('peekCode', ArduinoClassic.peekCode);
  ArduinoClassic.bindClick('openButton', ArduinoClassic.loadUserXmlFile);
  ArduinoClassic.bindClick('saveButton', ArduinoClassic.saveXmlFile);
  ArduinoClassic.bindClick('trashButton', ArduinoClassic.discard);
  ArduinoClassic.bindClick('settingsButton', ArduinoClassic.openSettings);
  ArduinoClassic.bindClick('runButton', ArduinoClassic.loadToArduino);

  // Binding tabs
  for (var i = 0; i < ArduinoClassic.TABS_.length; i++) {
    var name = ArduinoClassic.TABS_[i];
    ArduinoClassic.bindClick('tab_' + name,
        function(name_) {return function() {ArduinoClassic.tabClick(name_);};}(name));
  }

  // Check if not running locally (including developer's local network IP)
  if (document.location.hostname != 'localhost' &&
      document.location.hostname != '192.168.0.7') {
    alert('Ardublockly not running locally\n\n' +
          'For Ardublockly to work correctly, the Ardublockly server must be' +
          ' running locally on your computer.');
  }
};
window.addEventListener('load', ArduinoClassic.init);

/**
 * Fixes viewport for small screens.
 */
ArduinoClassic.adjustViewport = function() {
  var viewport = document.querySelector('meta[name="viewport"]');
  if (viewport && screen.availWidth < 725) {
    viewport.setAttribute('content',
        'width=725, initial-scale=.35, user-scalable=no');
  }
};

/**
 * Open a centered pop up with the server compiler settings.
 */
ArduinoClassic.openSettings = function() {
  var width = 500;
  var height = 400;
  var left = (screen.width / 2) - (width / 2);
  var top = (screen.height / 2) - (height / 2);
  window.open('settings.html', '_blank',
      'directories=no, titlebar=no, toolbar=no, location=no, status=no, ' + 
      'menubar=no, scrollbars=yes, resizable=yes, top=' + top + ', ' +
      'left=' + left + ', width=' + width + ', height=' + height + '');
}

/**
 * Send the Arduino Code to the ArduServerCompiler to process.
 */
ArduinoClassic.loadToArduino = function() {
  ArduServerCompiler.sendSketchToServer(
      Blockly.Arduino.workspaceToCode(),
      ArduinoClassic.loadToArduinoReturn);
};

/**
 * Send the Arduino Code to the ArduServerCompiler to process
 */
ArduinoClassic.loadToArduinoReturn = function(data_back_el) {
  if (data_back_el != null) {
    // edit modal with new content
    var modal = document.getElementById('modal_content');
    modal.innerHTML = '';
    modal.appendChild(data_back_el);
    // display modal
    document.getElementById('modal_toggle').checked = true;
  } else {
    alert('Ardublockly not running locally\n\n' +
          'To load the blocks code into an Arduino the For Ardublockly ' +
          'server must be running locally on your computer.');
  }
};

/**
 * Discard all blocks from the workspace.
 */
ArduinoClassic.discard = function() {
  var count = Blockly.mainWorkspace.getAllBlocks().length;
  var message = 'Delete all ' + count + ' blocks?';
  if (count < 2 || window.confirm(message)) {
    Blockly.mainWorkspace.clear();
    window.location.hash = '';
  }
  ArduinoClassic.renderContent();
};

/**
 * Store the state the code sidebar visibility
 * @private
 */
ArduinoClassic.peek_code_ = false;

/**
 * Loads/unloads the side div with a code peek
 * @param {boolean?} visible Optional argument, indicates the new visibility of
 *                           the code preview.
 */
ArduinoClassic.peekCode = function(visible) {
  var peek_code_button = document.getElementById('peekCode');
  var code_peek_content = document.getElementById('arduino_code_peek');
  
  if (visible == true) {
    ArduinoClassic.peek_code_ = false;
  } else if (visible == false) {
    ArduinoClassic.peek_code_ = true;
  }
  
  if (ArduinoClassic.peek_code_ == false) {
    ArduinoClassic.peek_code_ = true;
    peek_code_button.className = 'button_text secondary';
    ArduinoClassic.sideContent(true);
    code_peek_content.style.display = 'inline-block';
    // Regenerate arduino code and ensure every click does as well
    ArduinoClassic.renderArduinoPeekCode();
    Blockly.addChangeListener(ArduinoClassic.renderArduinoPeekCode);
  } else {
    ArduinoClassic.peek_code_ = false;
    peek_code_button.className = 'button_text';
    code_peek_content.style.display = 'none';
    ArduinoClassic.sideContent(false);
    // Remove action listeners. TODO: track listener so that first time does not
    // crashes
    //Blockly.removeChangeListener(renderArduinoPeekCode);
  }
};

/**
 * Configure the Block panel to display content on the right
 * @param {string} content_name Name of the content div
 * @param {boolean} visible Indicated if the content should be shown or hidden
 */
ArduinoClassic.sideContent = function(visible) {
  var side_content = document.getElementById('side_content');
  var block_content = document.getElementById('content_blocks');

  // Deselect all tabs and hide all panes.
  for (var i = 0; i < ArduinoClassic.TABS_.length; i++) {
    var name = ArduinoClassic.TABS_[i];
    document.getElementById('tab_' + name).className = 'taboff';
    document.getElementById('content_' + name).style.display = 'none';
  }
  
  if(visible == true) {
    // Rearrange panels for blocks and side contents
    block_content.style.display = 'inline-block';
    document.getElementById('tab_blocks').className = 'tabon';
    block_content.className = 'content content_blocks_side';
    side_content.style.display = 'inline-block';
  } else {
    // Restore to original state
    side_content.style.display = 'none';
    block_content.className = 'content content_blocks';
    // Select the active tab and panel
    document.getElementById('tab_' + ArduinoClassic.selected).className = 'tabon';
    document.getElementById('content_' + ArduinoClassic.selected).style.display = 'block';
  }

  Blockly.fireUiEvent(window, 'resize');  
  ArduinoClassic.renderContent();
};

/**
 * Updates the arduino code in the pre area based on the blocks
 */
ArduinoClassic.renderArduinoPeekCode = function() {
  var code_peak_pre = document.getElementById('arduino_pre');
  code_peak_pre.textContent = Blockly.Arduino.workspaceToCode();
  if (typeof prettyPrintOne == 'function') {
    code_peak_pre.innerHTML = prettyPrintOne(code_peak_pre.innerHTML, 'cpp');
  }
};

/**
 * Public variable that indicates if Blockly has been injected.
 * @type {!boolean}
 */
ArduinoClassic.BLOCKLY_INJECTED = false;

/**
 * Injects Blockly into a given text area. Reads the toolbox from an XMl file.
 * @param {!Element} el Element to inject Blockly into.
 * @param {!string} toolbox_path String containing the toolbox XML file path.
 */
ArduinoClassic.injectBlockly = function(blockly_el, toolbox_path) {
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
  request.open('GET', toolbox_path, true);

  // Once file is open, inject blockly into element with the toolbox string
  request.onreadystatechange = function() {
    if ( (request.readyState == 4) && (request.status == 200) ) {
      Blockly.inject(blockly_el, {
            collapse: true,
            comments: true,
            disable: true,
            media: '../../blockly/media/',
            rtl: false,
            scrollbars: true,
            toolbox: request.responseText,
            trashcan: true });
      ArduinoClassic.BLOCKLY_INJECTED = true;
    }
  }

  request.send(null);
};

/**
 * Loads an XML file from the users file system and adds the blocks into the
 * Blockly workspace.
 */
ArduinoClassic.loadUserXmlFile = function() {
  // Create event listener function
  var parseInputXMLfile = function(e) {
    var files = e.target.files;
    var reader = new FileReader();
    reader.onload = function() {
      var success = ArduinoClassic.replaceBlocksfromXml(reader.result);
      if (success) {
        ArduinoClassic.renderContent();
      } else {
        alert('Invalid XML!\nThe XML file was not successfully parsed into ' +
              'blocks. Please review the XML code and try again.');
      }
    };
    reader.readAsText(files[0]);
  }
  // Create once invisible browse button with event listener, and click it
  var select_file = document.getElementById('select_file');
  if (select_file == null) {
    var select_file_dom = document.createElement('INPUT');
    select_file_dom.type = 'file';
    select_file_dom.id = 'select_file';
    select_file_dom.style = 'display: none';
    document.body.appendChild(select_file_dom);
    select_file = document.getElementById('select_file');
    select_file.addEventListener('change', parseInputXMLfile, false);
  }
  select_file.click();
};

/**
 * Parses the XML from its input to generate and replace the blocks in the
 * Blockly workspace.
 * @param {!string} blocks_xml String of XML code for the blocks.
 * @return {!boolean} Indicates if the XML into blocks parse was successful.
 */
ArduinoClassic.replaceBlocksfromXml = function(blocks_xml) {
  var xmlDom = null;
  var success = true;
  try {
    xmlDom = Blockly.Xml.textToDom(blocks_xml);
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
    Blockly.mainWorkspace.clear();
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
  }
  return success;
};

/**
 * Creates an XML file containing the blocks from the Blockly workspace and
 * prompts the users to save it into their local file system.
 */
ArduinoClassic.saveXmlFile = function() {
  // Generate XML
  var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
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
ArduinoClassic.bindClick = function(el, func) {
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
ArduinoClassic.getBBox_ = function(element) {
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

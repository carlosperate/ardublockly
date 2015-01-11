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
  window.addEventListener('resize', ArduinoMaterial.resizeBlocklyWorkspace, false);
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
 * Binds functions to each of the buttons and nav links.
 * @private
 */
ArduinoMaterial.bindActionFunctions_ = function() {
  ArduinoMaterial.bindClick('button_load', ArduinoMaterial.functionNotImplemented);
  ArduinoMaterial.bindClick('button_save', ArduinoMaterial.functionNotImplemented);
  ArduinoMaterial.bindClick('button_delete_all', ArduinoMaterial.discard);
  ArduinoMaterial.bindClick('button_settings', ArduinoMaterial.functionNotImplemented);
  ArduinoMaterial.bindClick('button_run', ArduinoMaterial.runCode);
  ArduinoMaterial.bindClick('button_load_xml', ArduinoMaterial.XmlTextareaToBlocks);
  ArduinoMaterial.bindClick(
      'button_toggle_toolbox', ArduinoMaterial.toogleToolbox);
};

/**
 * Populate the currently selected panel with content generated from the blocks.
 */
ArduinoMaterial.functionNotImplemented = function() {
  toast('Function not yet implemented', 4000);
};

/**
 * Populate the currently selected panel with content generated from the blocks.
 */
ArduinoMaterial.renderContent = function() {
  ArduinoMaterial.generateXml(document.getElementById('content_xml'));
  ArduinoMaterial.generateArduino(document.getElementById('content_arduino'));
};

/**
 * Populate the currently selected panel with content generated from the blocks.
 */
ArduinoMaterial.XmlTextareaToBlocks = function() {
  var success = ArduinoMaterial.replaceBlocksfromXml(
      document.getElementById('content_xml').value);
  if(success) {
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
    // viewToolbox() takes a callback function as its second argument
    ArduinoMaterial.viewToolbox(false, 
        function() { ArduinoMaterial.viewToolboxButtonState(false); });
  } else {
     ArduinoMaterial.viewToolboxButtonState(true);
    ArduinoMaterial.viewToolbox(true);
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




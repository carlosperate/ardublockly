/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview General javaScript for Arduino app with material design
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
  // Inject Ardublockly into content_blocks
  ArduinoMaterial.injectBlockly(document.getElementById('content_blocks'));

  // Add event listeners  
  ArduinoMaterial.bindDesignEventListeners();
  ArduinoMaterial.bindBlocklyEventListeners();

  // Bind functions to buttons and links
  ArduinoMaterial.bindActionFunctions();
  ArduinoMaterial.materializeJsInit();

  // Ensure the blockly element is the correct size
  Blockly.fireUiEvent(window, 'resize');
});

/**
 * Binds the event listeners relevant to the page design
 */
ArduinoMaterial.bindDesignEventListeners = function() {
  window.addEventListener('resize', ArduinoMaterial.resizeBlocks, false);
}

/**
 * Binds the event listeners relevant to Blockly
 */
ArduinoMaterial.bindBlocklyEventListeners = function() {
  Blockly.addChangeListener(ArduinoMaterial.renderContent);
}

/**
 * Binds functions to each of the buttons and nav links
 */
ArduinoMaterial.bindActionFunctions = function() {
  ArduinoMaterial.bindClick('button_delete_all', ArduinoMaterial.discard);
  ArduinoMaterial.bindClick('button_run', ArduinoMaterial.runCode);
  ArduinoMaterial.bindClick('button_load_xml', ArduinoMaterial.runCode);
};

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
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
ArduinoMaterial.renderContent = function() {
  ArduinoMaterial.generateXml(document.getElementById('content_xml'));
  ArduinoMaterial.generateArduino(document.getElementById('content_arduino'));
};

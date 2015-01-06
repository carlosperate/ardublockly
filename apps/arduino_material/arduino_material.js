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
 * Initialize Blockly for Ardublockly. Called on page load.
 */
ArduinoMaterial.init = function() {
  // Inject Ardublockly
  var toolbox = ArduinoMaterial.readToolbox('arduino_toolbox.xml');
  Blockly.inject(document.getElementById('content_blocks'),
      {media: '../../media/',
       rtl: false,
       scrollbars: true,
       toolbox: toolbox});

  // Add event listeners
  ArduinoMaterial.bindDesignEventListeners();
  ArduinoMaterial.bindBlocklyEventListeners();

  // Bind functions to buttons and links
  ArduinoMaterial.bindActionFunctions();
  ArduinoMaterial.materializeJsInit();

  // Ensure the blockly element is the correct size
  Blockly.fireUiEvent(window, 'resize');
};
window.addEventListener('load', ArduinoMaterial.init);

/**
 * Binds functions to each of the buttons and nav links
 */
ArduinoMaterial.bindActionFunctions = function() {
  ArduinoMaterial.bindClick('button_delete_all', ArduinoMaterial.discard);
  ArduinoMaterial.bindClick('button_run', ArduinoMaterial.runCode);
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

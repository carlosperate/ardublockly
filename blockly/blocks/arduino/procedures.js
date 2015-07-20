/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Block for the Arduino functions.
 *               The Arduino built in functions syntax can be found at:
 *               https://arduino.cc/en/Reference/HomePage
 *
 * TODO: This block can be improved to set the new range properly.
 */
'use strict';

goog.provide('Blockly.Blocks.Arduino.procedures');

goog.require('Blockly.Arduino');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.Arduino.procedures.HUE = 290;

Blockly.Blocks['arduino_functions'] = {
  /**
   * Block for defining the Arduino setup() and loop() functions.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField('Arduino run once:');
    this.appendStatementInput('SETUP_FUNC');
    this.appendDummyInput()
        .appendField('Arduino loop forever:');
    this.appendStatementInput('LOOP_FUNC');
    this.setInputsInline(false);
    this.setColour(Blockly.Blocks.Arduino.procedures.HUE);
    this.setTooltip('Defines the Arduino setup() and loop() functions.');
    this.setHelpUrl('https://arduino.cc/en/Reference/Loop');
  },
  /** Removes all the option to disable the block context menu */
  customContextMenu: function(options) {
    // Remove all options from the original reference (=[] won't work)
    options.splice(0, options.length);
  },
  /** @return {!boolean} True if the block instance is in the workspace. */
  getArduinoLoopsInstance: function() {
    return true;
  }
};

/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Block for the Arduino map functionality.
 *               The Arduino built in functions syntax can be found at:
 *               http://arduino.cc/en/Reference/HomePage
 *
 * TODO: This block can be improved to set the new range properly.
 */
'use strict';

goog.provide('Blockly.Blocks.map');

goog.require('Blockly.Blocks');
goog.require('Blockly.StaticTyping');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.map.HUE = 230;

Blockly.Blocks['base_map'] = {
  /**
   * Block for creating a the map function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/map');
    this.setColour(Blockly.Blocks.map.HUE);
    this.appendValueInput('NUM')
        .appendField('Map ')
        .setCheck(Blockly.StaticTyping.BlocklyTypes.NUMBER.compatibles());
    this.appendValueInput('DMAX')
        .appendField('value to [0-')
        .setCheck(Blockly.StaticTyping.BlocklyTypes.NUMBER.compatibles());
    this.appendDummyInput()
        .appendField(']');
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('Re-maps a number from [0-1024] to another range.');
  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.StaticTyping.BlocklyTypes.NUMBER;
  }
};

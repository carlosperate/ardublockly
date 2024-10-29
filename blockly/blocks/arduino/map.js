/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Block for the Arduino map functionality.
 *     The Arduino built in functions syntax can be found at:
 *     http://arduino.cc/en/Reference/HomePage
 *
 * TODO: This block can be improved to set the new range properly.
 */
'use strict';

goog.provide('Blockly.Blocks.map');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.map.HUE = 230;

Blockly.Blocks['base_map'] = {
  /**
   * Block for creating a the map function.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.ARD_MAP,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM",
          "check": Blockly.Types.NUMBER.checkList
        },
        {
          "type": "input_value",
          "name": "FROML",
          "check": Blockly.Types.NUMBER.checkList
        },
        {
          "type": "input_value",
          "name": "FROMH",
          "check": Blockly.Types.NUMBER.checkList
        },
        {
          "type": "input_value",
          "name": "TOL",
          "check": Blockly.Types.NUMBER.checkList
        },
        {
          "type": "input_value",
          "name": "TOH",
          "check": Blockly.Types.NUMBER.checkList
        }
      ],
      "inputsInline": true,
      "output": Blockly.Types.NUMBER.output,
      "colour": Blockly.Blocks.map.HUE,
      "tooltip": Blockly.Msg.ARD_MAP_TIP,
      "helpUrl": 'http://arduino.cc/en/Reference/map'
    });
  },
  /** @return {!string} Type of the block, by definition always an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

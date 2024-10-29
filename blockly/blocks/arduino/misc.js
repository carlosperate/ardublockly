/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Various blocks not matching other categories
 *     functions. The Arduino function syntax can be found at
 *     http://arduino.cc/en/Reference/HomePage
 *
 * TODO: maybe change this to a "PIN" BlocklyType
 */
'use strict';

goog.provide('Blockly.Blocks.misc');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.misc.HUE = 195;


Blockly.Blocks['shiftout'] = {
  /**
   * Block for shiftOut() function of Arduino 
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/language/functions/advanced-io/shiftout/');
    this.setColour(Blockly.Blocks.misc.HUE);
    this.appendDummyInput().appendField(Blockly.Msg.ARD_SHIFTOUT)
	.appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "DATA")
	.appendField(Blockly.Msg.ARD_SHIFTOUT_C)
	.appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),"CLK")
	.appendField(Blockly.Msg.ARD_SHIFTOUT_O)
	.appendField(new Blockly.FieldDropdown([["MSBFIRST","MSBFIRST"],["LSBFIRST","LSBFIRST"]]), "BO");
    this.appendValueInput("BVAL").appendField(Blockly.Msg.ARD_SHIFTOUT_B);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.ARD_SHIFTOUT_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, "DATA", "digitalPins");
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, "CLK", "digitalPins");
  }
};

Blockly.Blocks['bitset'] = {
  /**
   * Block for writing 1st and 2nd row to the display
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/language/functions/bits-and-bytes/bitset/');
    this.setColour(Blockly.Blocks.misc.HUE);
    this.appendValueInput('XVAL').appendField(Blockly.Msg.ARD_BITSET_1);
    this.appendValueInput('NVAL').appendField(Blockly.Msg.ARD_BITSET_2);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_BITSET_TIP)
  }
};

Blockly.Blocks['operation_bitwise'] = {
  /**
   * Block for logical bitwise operations: 'and', 'or', 'xor', 'not', 'shift left', 'shift right'.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [[Blockly.Msg.BITWISE_OPERATION_AND, 'AND'],
         [Blockly.Msg.BITWISE_OPERATION_OR, 'OR'],
	 [Blockly.Msg.BITWISE_OPERATION_XOR, 'XOR'],
         [Blockly.Msg.BITWISE_OPERATION_NOT, 'NOT'],
	 [Blockly.Msg.BITWISE_OPERATION_SHIFTLEFT, 'SHIFTLEFT'],
         [Blockly.Msg.BITWISE_OPERATION_SHIFTRIGHT, 'SHIFTRIGHT']];
    this.setHelpUrl(Blockly.Msg.LOGIC_OPERATION_HELPURL);
    this.setColour(Blockly.Blocks.misc.HUE);
    this.setOutput(true, Blockly.Types.BOOLEAN.output);
    this.appendValueInput('A')
        .setCheck(Blockly.Types.BOOLEAN.checkList);
    this.appendValueInput('B')
        .setCheck(Blockly.Types.BOOLEAN.checkList)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'AND': Blockly.Msg.BITWISE_OPERATION_TOOLTIP_AND,
        'OR': Blockly.Msg.BITWISE_OPERATION_TOOLTIP_OR,
	'XOR': Blockly.Msg.BITWISE_OPERATION_TOOLTIP_XOR,
        'NOT': Blockly.Msg.BITWISE_OPERATION_TOOLTIP_NOT,
        'SHIFTLEFT': Blockly.Msg.BITWISE_OPERATION_TOOLTIP_SHIFTLEFT,
	'SHIFTRIGHT': Blockly.Msg.BITWISE_OPERATION_TOOLTIP_SHIFTRIGHT
      };
      return TOOLTIPS[op];
    });
  }
};

Blockly.Blocks['attach_interrupt'] = {
  /**
   * Block for Interrupts are useful for making things happen automatically in microcontroller programs and can help solve timing problems. 
   * Good tasks for using an interrupt may include reading a rotary encoder, or monitoring user input.
   * @this Blockly.Block
   */
 /**
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/language/functions/external-interrupts/attachinterrupt/');
    this.setColour(Blockly.Blocks.misc.HUE);
    this.appendDummyInput().appendField(Blockly.Msg.ARD_ATTACHINTERRUPT)
	.appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "PIN");
    this.appendValueInput("ISR").appendField(Blockly.Msg.ARD_ATTACHINTERRUPT_FUNC);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_ATTACHINTERRUPT_MODE)
        .appendField(new Blockly.FieldDropdown([["LOW","LOW"],["CHANGE","CHANGE"],["RISING","RISING"],["FALLING","FALLING"],["HIGH","HIGH"]]), "MODE");   
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.ARD_ATTACHINTERRUPT_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, "PIN", "digitalPins");
  }
};

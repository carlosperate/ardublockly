/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Blocks for Arduino Digital and Analogue input and output
 *               functions. The Arduino function syntax can be found at
 *               http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Blocks.Arduino.io');

goog.require('Blockly.Arduino');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.Arduino.io.HUE = 250;

Blockly.Blocks['io_digitalwrite'] = {
  /**
   * Block for creating a 'set pin' to a state.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    this.setColour(Blockly.Blocks.Arduino.io.HUE);
    this.appendDummyInput('')
        .appendField('set digital pin#')
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'PIN');
    this.appendValueInput('STATE', Blockly.StaticTyping.blocklyType.BOOLEAN)
        .appendField('to')
        .setCheck(Blockly.StaticTyping.blocklyType.BOOLEAN);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Write digital value to a specific Port.');
  },
  /** @return {string} The type of return value for the block, an integer. */
  getType: function() {
    return Blockly.StaticTyping.blocklyType.INTEGER;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'PIN', 'digitalPins');
  }
};

Blockly.Blocks['io_digitalread'] = {
  /**
   * Block for creating a 'read pin'.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalRead');
    this.setColour(Blockly.Blocks.Arduino.io.HUE);
    this.appendDummyInput('')
        .appendField('read digital pin#')
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'PIN');
    this.setOutput(true, Blockly.StaticTyping.blocklyType.BOOLEAN);
    this.setTooltip('Reads the digital value of a pin.');
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getType: function() {
    return Blockly.StaticTyping.blocklyType.INTEGER;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'PIN', 'digitalPins');
  }
};

Blockly.Blocks['io_builtin_led'] = {
  /**
   * Block for setting built-in LED to a state.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    this.setColour(Blockly.Blocks.Arduino.io.HUE);
    this.appendDummyInput('')
        .appendField('set LED')
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.builtinLed), 'BUILT_IN_LED');
    this.appendValueInput('STATE', Blockly.StaticTyping.blocklyType.BOOLEAN)
        .appendField('to')
        .setCheck(Blockly.StaticTyping.blocklyType.BOOLEAN);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Turn on or off the built in LED.');
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getType: function() {
    return Blockly.StaticTyping.blocklyType.INTEGER;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'BUILT_IN_LED', 'builtinLed');
  }
};

Blockly.Blocks['io_analogwrite'] = {
  /**
   * Block for creating a 'set pin' to an analogue value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogWrite');
    this.setColour(Blockly.Blocks.Arduino.io.HUE);
    this.appendDummyInput('')
        .appendField('set analogue pin#')
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.analogPins), 'PIN');
    this.appendValueInput('NUM', Blockly.StaticTyping.blocklyType.NUMBER)
        .appendField('to')
        .setCheck(Blockly.StaticTyping.blocklyType.NUMBER);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Write analog value between 0 and 255 to a specific Port.');
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'analogPins');
  }
};

Blockly.Blocks['io_analogread'] = {
  /**
   * Block for reading an analogue input.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.Arduino.io.HUE);
    this.appendDummyInput('')
        .appendField('read analogue pin#')
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.analogPins), 'PIN');
    this.setOutput(true, Blockly.StaticTyping.blocklyType.NUMBER);
    this.setTooltip('Return value between 0 and 1024.');
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getType: function() {
    return Blockly.StaticTyping.blocklyType.INTEGER;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'analogPins');
  }
};

Blockly.Blocks['io_highlow'] = {
  /**
   * Block for creating a pin state.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Constants');
    this.setColour(Blockly.Blocks.Arduino.io.HUE);
    this.appendDummyInput('')
        .appendField(
            new Blockly.FieldDropdown([['HIGH', 'HIGH'], ['LOW', 'LOW']]),
           'STATE');
    this.setOutput(true, Blockly.StaticTyping.blocklyType.BOOLEAN);
    this.setTooltip('Set a pin state logic High or Low.');
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getType: function() {
    return Blockly.StaticTyping.blocklyType.INTEGER;
  }
};

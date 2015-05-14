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


Blockly.Blocks.Arduino.io.HUE = 230;

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
        .appendField(new Blockly.FieldDropdown(profile.default.digital), 'PIN')
    this.appendValueInput('STATE', Blockly.StaticTyping.blocklyType.BOOLEAN)
        .appendField('to')
        .setCheck(Blockly.StaticTyping.blocklyType.BOOLEAN);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Write digital value to a specific Port.');
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
        .appendField(new Blockly.FieldDropdown(profile.default.digital),
                     'PIN');
    this.setOutput(true, Blockly.StaticTyping.blocklyType.BOOLEAN);
    this.setTooltip('Reads the digital value of a pin.');
  },
  /**
   * Retrieves the type of return value for the block, in this case an integer.
   */
  getType: function() {
    return Blockly.StaticTyping.blocklyType.INTEGER;
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
        .appendField(new Blockly.FieldDropdown(profile.default.builtin_led),
                     'BUILT_IN_LED')
    this.appendValueInput('STATE', Blockly.StaticTyping.blocklyType.BOOLEAN)
        .appendField('to')
        .setCheck(Blockly.StaticTyping.blocklyType.BOOLEAN);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Turn on or off the built in LED.');
  },
  /**
   * Retrieves the type of return value for the block, in this case an integer.
   */
  getType: function() {
    return Blockly.StaticTyping.blocklyType.INTEGER;
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
        .appendField(new Blockly.FieldDropdown(profile.default.analog), 'PIN');
    this.appendValueInput('NUM', Blockly.StaticTyping.blocklyType.NUMBER)
        .appendField('to')
        .setCheck(Blockly.StaticTyping.blocklyType.NUMBER);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Write analog value between 0 and 255 to a specific Port.');
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
        .appendField(new Blockly.FieldDropdown(profile.default.analog), 'PIN');
    this.setOutput(true, Blockly.StaticTyping.blocklyType.NUMBER);
    this.setTooltip('Return value between 0 and 1024.');
  },
  /**
   * Retrieves the type of return value for the block, in this case an integer.
   */
  getType: function() {
    return Blockly.StaticTyping.blocklyType.INTEGER;
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
           'STATE')
    this.setOutput(true, Blockly.StaticTyping.blocklyType.BOOLEAN);
    this.setTooltip('Set a pin state logic High or Low.');
  },
  /**
   * Retrieves the type of return value for the block, in this case a boolean.
   */
  getType: function() {
    return Blockly.StaticTyping.blocklyType.INTEGER;
  }
};

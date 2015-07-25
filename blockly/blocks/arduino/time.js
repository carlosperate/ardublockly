/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Blocks for Arduino Time functions.
 *               The arduino built in functions syntax can be found in
 *               http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Blocks.Arduino.time');

goog.require('Blockly.Arduino');
goog.require('Blockly.StaticTyping');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.Arduino.time.HUE = 140;

Blockly.Blocks['time_delay'] = {
  /**
   * Delay block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Delay');
    this.setColour(Blockly.Blocks.Arduino.time.HUE);
    this.appendValueInput(
          'DELAY_TIME_MILI', Blockly.StaticTyping.BlocklyType.NUMBER)
        .setCheck(Blockly.StaticTyping.BlocklyType.NUMBER)
        .appendField('wait');
    this.appendDummyInput()
        .appendField('milliseconds');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Wait specific time in milliseconds');
  }
};

Blockly.Blocks['time_delaymicros'] = {
  /**
   * delayMicroseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DelayMicroseconds');
    this.setColour(Blockly.Blocks.Arduino.time.HUE);
    this.appendValueInput(
        'DELAY_TIME_MICRO', Blockly.StaticTyping.BlocklyType.NUMBER)
        .setCheck(Blockly.StaticTyping.BlocklyType.NUMBER)
        .appendField('wait');
    this.appendDummyInput()
        .appendField('microseconds');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Wait specific time in microseconds');
  }
};

Blockly.Blocks['time_millis'] = {
  /**
   * Elapsed time in milliseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Millis');
    this.setColour(Blockly.Blocks.Arduino.time.HUE);
    this.appendDummyInput('')
        .appendField('current elapsed Time (milliseconds)');
    this.setOutput(true, Blockly.StaticTyping.BlocklyType.NUMBER);
    this.setTooltip('Returns the number of milliseconds since the Arduino ' +
                    'board began running the current program.');
  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.StaticTyping.BlocklyType.INTEGER;
  }
};

Blockly.Blocks['time_micros'] = {
  /**
   * Elapsed time in microseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Micros');
    this.setColour(Blockly.Blocks.Arduino.time.HUE);
    this.appendDummyInput('')
        .appendField('current elapsed Time (microseconds)');
    this.setOutput(true, Blockly.StaticTyping.BlocklyType.NUMBER);
    this.setTooltip('Returns the number of microseconds since the Arduino ' +
                    'board began running the current program.');
  },
  /**
   * Should be a long (32bit), but  for for now an int.
   * @return {string} The type of return value for the block, an integer.
   */
  getBlockType: function() {
    return Blockly.StaticTyping.BlocklyType.INTEGER;
  }
};

Blockly.Blocks['infinite_loop'] = {
  /**
   * Waits forever, end of program.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('');
    this.setColour(Blockly.Blocks.Arduino.time.HUE);
    this.appendDummyInput()
        .appendField('wait forever (end program)');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setTooltip('Wait indefinitely, stopping the program.');
  }
};

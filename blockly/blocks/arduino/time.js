/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino Time functions.
 *     The arduino built in functions syntax can be found in
 *     http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Blocks.time');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.time.HUE = 140;

Blockly.Blocks['time_delay'] = {
  /**
   * Delay block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Delay');
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendValueInput('DELAY_TIME_MILI')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_TIME_DELAY);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TIME_MS);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
  }
};

Blockly.Blocks['time_delaymicros'] = {
  /**
   * delayMicroseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DelayMicroseconds');
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendValueInput('DELAY_TIME_MICRO')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_TIME_DELAY);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TIME_DELAY_MICROS);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_MICRO_TIP);
  }
};

Blockly.Blocks['time_millis'] = {
  /**
   * Elapsed time in milliseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Millis');
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TIME_MILLIS);
    this.setOutput(true, Blockly.Types.LARGE_NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_TIME_MILLIS_TIP);
  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.LARGE_NUMBER;
  }
};

Blockly.Blocks['time_micros'] = {
  /**
   * Elapsed time in microseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Micros');
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TIME_MICROS);
    this.setOutput(true, Blockly.Types.LARGE_NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_TIME_MICROS_TIP);
  },
  /**
   * Should be a long (32bit), but  for for now an int.
   * @return {string} The type of return value for the block, an integer.
   */
  getBlockType: function() {
    return Blockly.Types.LARGE_NUMBER;
  }
};

Blockly.Blocks['infinite_loop'] = {
  /**
   * Waits forever, end of program.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('');
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TIME_INF);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setTooltip(Blockly.Msg.ARD_TIME_INF_TIP);
  }
};

Blockly.Blocks['ds3231_setup'] = {
  /**
   * Block for setting up a real-time clock to receive time and date
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/libraries/ds3231/');
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DS3231_SETUP);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_DS3231_SETUP_TIP);
  }
};

Blockly.Blocks['ds3231_setclock'] = {
  /**
   * Block for manually adjusting time and date
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/libraries/ds3231/');
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendDummyInput()
	.appendField(new Blockly.FieldCheckbox("TRUE"), "SETCLOCK");
        .appendField(Blockly.Msg.ARD_DS3231_SETCLOCK);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DS3231_SETDATE)
        .appendField(new Blockly.FieldTextInput("31"), "SETDAY")
        .appendField(new Blockly.FieldTextInput("12"), "SETMONTH")
        .appendField(new Blockly.FieldTextInput("2021"), "SETYEAR");
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DS3231_SETTIME)
        .appendField(new Blockly.FieldTextInput("12"), "SETHOUR")
        .appendField(new Blockly.FieldTextInput("00"), "SETMINUTE");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_DS3231_SETCLOCK_TIP);
  }
};

Blockly.Blocks['ds3231_read'] = {
  /**
   * Block for writing 1st and 2nd row to the display
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/libraries/ds3231/');
    this.setColour(Blockly.Blocks.time.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DS3231_READ);
    this.appendValueInput("YEAR")
	.appendField(Blockly.Msg.ARD_DS3231_READYEAR)
	.setAlign(Blockly.ALIGN_RIGHT),
    this.appendValueInput("MONTH")
	.appendField(Blockly.Msg.ARD_DS3231_READMONTH)
	.setAlign(Blockly.ALIGN_RIGHT)
    this.appendValueInput("DAY")
	.appendField(Blockly.Msg.ARD_DS3231_READDAY)
	.setAlign(Blockly.ALIGN_RIGHT),
    this.appendValueInput("HOUR")
	.appendField(Blockly.Msg.ARD_DS3231_READHOUR)
	.setAlign(Blockly.ALIGN_RIGHT),
    this.appendValueInput("MINUTE")
	.appendField(Blockly.Msg.ARD_DS3231_READMINUTE)
	.setAlign(Blockly.ALIGN_RIGHT),
    this.appendValueInput("SECOND")
	.appendField(Blockly.Msg.ARD_DS3231_READSECOND)
	.setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_DS3221_READ_TIP);
  },
  /** @return {string} The type of return value for the block, a string. */
  getBlockType: function() {
    return Blockly.Types.TEXT;
  }
};

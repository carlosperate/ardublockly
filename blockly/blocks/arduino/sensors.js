/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Block for the Arduino functions.
 *     The Arduino built in functions syntax can be found at:
 *     https://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Blocks.sensors');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.sensors.HUE = 300;

Blockly.Blocks['sr04_setup'] = {
  /**
   * Block for setup HC-SR04 sensor with echo pin and trigger pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/libraries/hc-sr04/');
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SR04_SETUP)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'ECHO_PIN');
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SR04_SETUP_AND)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'TRIG_PIN');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_SR04_SETUP_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'ECHO_PIN', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'TRIG_PIN', 'digitalPins');
  }
};

Blockly.Blocks['sr04_read'] = {
  /**
   * Block for reading the distance using a HC-SR04 module.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/libraries/hc-sr04/');
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SR04_READ)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'ECHO_PIN');
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_SR04_READ_TIP);
  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'ECHO_PIN', 'digitalPins');
  }
};

Blockly.Blocks['dht11_setup'] = {
  /**
   * Block for setup DHT 11 Temperatur and Humidity sensor.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/libraries/dht-sensor-library/');
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DHT11_SETUP)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'PIN');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_DHT11_SETUP_TIP);
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

Blockly.Blocks['dht11_readt'] = {
  /**
   * Block for measuring temperature with DHT 11 sensor.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/libraries/dht-sensor-library/');
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DHT11_READT)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'PIN');
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_DHT11_READT_TIP);
  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
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

Blockly.Blocks['dht11_readh'] = {
  /**
   * Block for measuring humidity with DHT 11 sensor.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/libraries/dht-sensor-library/');
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DHT11_READH)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'PIN');
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_DHT11_READH_TIP);
  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
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

Blockly.Blocks['gy521_setup'] = {
  /**
   * Block for setup GY521 angle measurement 
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference//en/libraries/gy521/');
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_GY521_SETUP);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_GY521_SETUP_TIP);
  }
};

Blockly.Blocks['gy521_rot'] = {
  /**
   * Block for measuring angles of x, y, z in degree from GY-521 sensor.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference//en/libraries/gy521/');
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_GY521_ROT);
    this.appendValueInput("ROTX")
	.appendField(Blockly.Msg.ARD_GY521_X)
	.setAlign(Blockly.ALIGN_RIGHT),
    this.appendValueInput("ROTY")
	.appendField(Blockly.Msg.ARD_GY521_Y)
	.setAlign(Blockly.ALIGN_RIGHT),
    this.appendValueInput("ROTZ")
	.appendField(Blockly.Msg.ARD_GY521_Z)	
	.setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_GY521_ROT_TIP);
  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['gy521_t'] = {
  /**
   * Block for measuring angles from GY-521 sensor.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference//en/libraries/gy521/');
    this.setColour(Blockly.Blocks.sensors.HUE);
    this.appendValueInput("T")
        .appendField(Blockly.Msg.ARD_GY521_T)
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_GY521_T_TIP);
  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Ardublockly JavaScript for the Blockly resources and bindings.
 */
'use strict';

goog.provide('Blockly.Blocks.groove');

goog.require('Blockly.Blocks');


Blockly.Blocks.groove.HUE = 180;

Blockly.Blocks['grove_led'] = {
  /**
   * Grove LED module block definition.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://www.seeedstudio.com/wiki/Grove_-_LED');
    this.setColour(Blockly.Blocks.groove.HUE);
    this.appendValueInput('STATE')
        .appendField(new Blockly.FieldImage(
            '/blocks/grove/img/led.png', 32, 32))
        .appendField(Blockly.Msg.BLOCKS_GROVE_LED)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.groveDigital), 'CONNECTOR')
        .setCheck(Blockly.Types.BOOLEAN.checkList);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.BLOCKS_GROVE_LED_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'CONNECTOR', 'groveDigital');
  },
  /**
   * Returns a list with the connector used pins. For this block just the first.
   * @this Blockly.Block
   * @return {!Array<string>} List of used pins by this block.
   */
  connectorPinUsage: function() {
    return [this.getFieldValue('CONNECTOR')];
  }
};

Blockly.Blocks['grove_button'] = {
  /**
   * Grove Button module block definition.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://www.seeedstudio.com/wiki/Grove_-_Button');
    this.setColour(Blockly.Blocks.groove.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
            '/blocks/grove/img/button.png', 32, 32))
        .appendField(Blockly.Msg.BLOCKS_GROVE_BUTTON)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.groveDigital), 'CONNECTOR');
    this.setOutput(true, Blockly.Types.BOOLEAN.output);
    this.setTooltip(Blockly.Msg.BLOCKS_GROVE_BUTTON_TIP);
  },
  /** Updates the content of the the pin related fields. */
  updateFields: Blockly.Blocks['grove_led'].updateFields,
  /** Returns a list with the connector pins used. For this, just the first. */
  connectorPinUsage: Blockly.Blocks['grove_led'].connectorPinUsage,
};

Blockly.Blocks['grove_joystick'] = {
  /**
   * Grove Joystick module block definition.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://www.seeedstudio.com/wiki/Grove_-_Thumb_Joystick');
    this.setColour(Blockly.Blocks.groove.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
            '/blocks/grove/img/joystick.png', 32, 32))
        .appendField(Blockly.Msg.BLOCKS_GROVE_JOYSTICK)
        .appendField(new Blockly.FieldDropdown(
            [['x', '0'], ['y', '1']]), 'AXIS')
        .appendField(Blockly.Msg.BLOCKS_GROVE_JOYSTICK_2)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.groveAnalog), 'CONNECTOR');
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.BLOCKS_GROVE_JOYSTICK_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'CONNECTOR', 'groveAnalog');
  },
  /**
   * Returns a list with the connector used pins. For this block both analogues.
   * @this Blockly.Block
   * @return {!Array<string>} List of used pins by this block.
   */
  connectorPinUsage: function() {
    var x = this.getFieldValue('CONNECTOR');
    var y = 'A' + (parseInt(x.replace(/^\D+/g, '')) + 1);
    return [x, y];
  }
};

Blockly.Blocks['grove_pir'] = {
  /**
   * Grove PIR Motion Sensor module block definition.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://seeedstudio.com/wiki/Grove_-_PIR_Motion_Sensor');
    this.setColour(Blockly.Blocks.groove.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
            '/blocks/grove/img/pir.png', 32, 32))
        .appendField(Blockly.Msg.BLOCKS_GROVE_PIR)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.groveDigital), 'CONNECTOR');
    this.setOutput(true, Blockly.Types.BOOLEAN.output);
    this.setTooltip(Blockly.Msg.BLOCKS_GROVE_PIR_TIP);
  },
  /** Updates the content of the the pin related fields. */
  updateFields: Blockly.Blocks['grove_led'].updateFields,
  /** Returns a list with the connector pins used. For this, just the first. */
  connectorPinUsage: Blockly.Blocks['grove_led'].connectorPinUsage,
};

Blockly.Blocks['grove_temperature'] = {
  /**
   * Grove Temperature Sensor module block definition.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(
          'http://www.seeedstudio.com/wiki/Grove_-_Temperature_Sensor_V1.2');
    this.setColour(Blockly.Blocks.groove.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
            '/blocks/grove/img/temperature.png', 32, 32))
        .appendField(Blockly.Msg.BLOCKS_GROVE_TEMPERATURE)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.groveAnalog), 'CONNECTOR');
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.BLOCKS_GROVE_TEMPERATURE_TIP);
  },
  /** Updates the content of the the pin related fields.In this case analog. */
  updateFields: Blockly.Blocks['grove_joystick'].updateFields,
  /** Returns a list with the connector pins used. For this, just the first. */
  connectorPinUsage: Blockly.Blocks['grove_led'].connectorPinUsage,
};

Blockly.Blocks['grove_lcd_rgb'] = {
  /**
   * Grove LCD RGB Backlight module block definition.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://seeedstudio.com/wiki/Grove_-_LCD_RGB_Backlight');
    this.setColour(Blockly.Blocks.groove.HUE);
    this.appendValueInput('LINE_1')
        .appendField(new Blockly.FieldImage(
            '/blocks/grove/img/lcd_rgb.png', 32, 32))
        .appendField(Blockly.Msg.BLOCKS_GROVE_LCD_RGB)
        .setCheck(Blockly.Types.TEXT.checkList);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.BLOCKS_GROVE_LCD_RGB_TIP);
  },
  /**
   * Returns a list with the connector used pins, in this case the I2C pins.
   * @this Blockly.Block
   * @return {!Array<string>} List of used pins by this block.
   */
  connectorPinUsage: function() {
    var groveI2cId = Blockly.Arduino.Boards.selected.groveI2c[1];
    return Blockly.Arduino.Boards.selected.i2cPins[groveI2cId];
  }
};

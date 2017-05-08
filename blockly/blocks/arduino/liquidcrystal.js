/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino Liquid Crystal  library.
 *     The Arduino Liquid Crystal functions syntax can be found in the following URL:
 *     https://www.arduino.cc/en/Reference/LiquidCrystal
 *     Note that this block uses the Blockly.FieldInstance instead of
 *     Blockly.FieldDropdown which generates a unique instance per setup block
 *     in the workspace.
 */

'use strict';

goog.provide('Blockly.Blocks.LiquidCrystal');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.LiquidCrystal.HUE = 300;

Blockly.Blocks['liquidcrystal_config'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_LIQUIDCRYSTAL_CONFIG)
        .appendField(new Blockly.FieldInstance('LCD',Blockly.Msg.ARD_LIQUIDCRYSTAL_DEFAULT_NAME,true,true,false), "liquidcrystal_name");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("RS:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "LCD_RS")
        .appendField("EN:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "LCD_EN")
        .appendField("D4:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "LCD_D4");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("D5:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "LCD_D5")
        .appendField("D6:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "LCD_D6")
        .appendField("D7:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "LCD_D7");
    this.appendValueInput("LCD_COLUMN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("No. of Columns:");
    this.appendValueInput("LCD_ROW")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("No. of Rows:");
    this.setColour(Blockly.Blocks.LiquidCrystal.HUE);
    this.setTooltip(Blockly.Msg.ARD_LIQUIDCRYSTAL_DEFAULT_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Reference/LiquidCrystal');
  }
};

Blockly.Blocks['liquidcrystal_variable'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldInstance('LCD',Blockly.Msg.ARD_LIQUIDCRYSTAL_DEFAULT_NAME,false,true,false), "liquidcrystal_name");
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.LiquidCrystal.HUE);
    this.setTooltip('');
    this.setHelpUrl('https://www.arduino.cc/en/Reference/LiquidCrystal');
  }
};

Blockly.Blocks['liquidcrystal_clear'] = {
  init: function() {
    this.appendValueInput("LCD_NAME")
        .setCheck("String")
        .appendField(Blockly.Msg.ARD_LIQUIDCRYSTAL_CLEAR_DISPLAY);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.LiquidCrystal.HUE);
    this.setTooltip(Blockly.Msg.ARD_LIQUIDCRYSTAL_CLEAR_DISPLAY_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Reference/LiquidCrystal');
  }
};

Blockly.Blocks['liquidcrystal_print'] = {
  /**
   * Block for creating a write to serial com function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://www.arduino.cc/en/Serial/Print');
    this.setColour(Blockly.Blocks.LiquidCrystal.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERIAL_PRINT);
    this.appendValueInput('CONTENT')
        .setCheck(Blockly.Types.TEXT.checkList);
    this.appendValueInput('LCD_NAME')
        .appendField(Blockly.Msg.ARD_LIQUIDCRYSTAL_PRINT_ON_DISPLAY);
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'NEW_LINE')
        .appendField(Blockly.Msg.ARD_SERIAL_PRINT_NEWLINE);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_LIQUIDCRYSTAL_PRINT_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Reference/LiquidCrystal');
  }
};

Blockly.Blocks['liquidcrystal_set_cursor'] = {
  init: function() {
    this.appendValueInput("LCD_NAME")
        .setCheck("String")
        .appendField(Blockly.Msg.ARD_LIQUIDCRYSTAL_SET_CURSOR);
    this.appendValueInput("LCD_COLUMN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Column:");
    this.appendValueInput("LCD_ROW")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Rows:");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.LiquidCrystal.HUE);
    this.setTooltip(Blockly.Msg.ARD_LIQUIDCRYSTAL_SET_CURSOR_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Reference/LiquidCrystal');
  }
};
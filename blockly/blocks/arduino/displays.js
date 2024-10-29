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

goog.provide('Blockly.Blocks.displays');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.displays.HUE = 20;

Blockly.Blocks['max7219_setup'] = {
  /**
   * Block for setup MAX7219 8x8 LED Matrix .
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/libraries/max7219/');
    this.setColour(Blockly.Blocks.displays.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_MAX7219_SETUP_DIN)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'DIN');
    this.setInputsInline(true);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_MAX7219_SETUP_CS)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'CS');
    this.setInputsInline(true);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_MAX7219_SETUP_CLK)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'CLK');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_MAX7219_SETUP_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'DIN', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'CS', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'CLK', 'digitalPins');
  }
};

Blockly.Blocks['max7219_setchar'] = {
  /**
   * Block for creating a logo or character to be displayed with 8x8 MAX7219.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/libraries/max7219/');
    this.setColour(Blockly.Blocks.displays.HUE);
    this.appendDummyInput()
	.appendField(new Blockly.FieldVariable(Blockly.Msg.TEXT_APPEND_VARIABLE), 'VAR')
        .appendField(Blockly.Msg.ARD_MAX7219_SETCHAR)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'DIN');
    this.appendDummyInput()
	.appendField("       ")
        .appendField(new Blockly.FieldCheckbox('FALSE'), '11')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '12')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '13')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '14')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '15')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '16')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '17')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '18');
    this.appendDummyInput()
	.appendField("       ")
        .appendField(new Blockly.FieldCheckbox('FALSE'), '21')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '22')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '23')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '24')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '25')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '26')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '27')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '28');
    this.appendDummyInput()
	.appendField("       ")
        .appendField(new Blockly.FieldCheckbox('FALSE'), '31')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '32')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '33')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '34')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '35')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '36')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '37')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '38');
    this.appendDummyInput()
	.appendField("       ")
        .appendField(new Blockly.FieldCheckbox('FALSE'), '41')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '42')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '43')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '44')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '45')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '46')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '47')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '48');
    this.appendDummyInput()
	.appendField("       ")
        .appendField(new Blockly.FieldCheckbox('FALSE'), '51')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '52')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '53')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '54')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '55')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '56')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '57')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '58');
    this.appendDummyInput()
	.appendField("       ")
        .appendField(new Blockly.FieldCheckbox('FALSE'), '61')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '62')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '63')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '64')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '65')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '66')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '67')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '68');
    this.appendDummyInput()
	.appendField("       ")
        .appendField(new Blockly.FieldCheckbox('FALSE'), '71')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '72')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '73')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '74')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '75')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '76')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '77')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '78');
    this.appendDummyInput()
	.appendField("       ")
        .appendField(new Blockly.FieldCheckbox('FALSE'), '81')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '82')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '83')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '84')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '85')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '86')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '87')
        .appendField(new Blockly.FieldCheckbox('FALSE'), '88');
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.ARD_MAX7219_SETCHAR_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'DIN', 'digitalPins');
  }
};

Blockly.Blocks['max7219_clr'] = {
  /**
   * Block for setup MAX7219 8x8 LED Matrix .
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/libraries/max7219/');
    this.setColour(Blockly.Blocks.displays.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_MAX7219_CLEAR)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'DIN');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_MAX7219_CLEAR_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'DIN', 'digitalPins');
  }
};

Blockly.Blocks['lcd1602_setup'] = {
  /**
   * Block for setup LCD 16 x 2
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/en/Reference/LiquidCrystal');
    this.setColour(Blockly.Blocks.displays.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_LCD1602_SETUP);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_LCD1602_SETUP_PINS)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'DB4')
        .appendField(Blockly.Msg.ARD_LCD1602_SETUP_DB5)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'DB5')
        .appendField(Blockly.Msg.ARD_LCD1602_SETUP_DB6)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'DB6')
        .appendField(Blockly.Msg.ARD_LCD1602_SETUP_DB7)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'DB7');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_LCD1602_SETUP_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'DB4', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'DB5', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'DB6', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'DB7', 'digitalPins');
  }
};

Blockly.Blocks['lcd1602_write'] = {
  /**
   * Block for writing 1st and 2nd row to the display
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/en/Reference/LiquidCrystal');
    this.setColour(Blockly.Blocks.displays.HUE);
    this.appendDummyInput().appendField(Blockly.Msg.ARD_LCD1602_WRITE);
    this.appendValueInput("LINE1").appendField(Blockly.Msg.ARD_LCD1602_LINE1).setAlign(Blockly.ALIGN_RIGHT),
    this.appendValueInput("LINE2").appendField(Blockly.Msg.ARD_LCD1602_LINE2).setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_LCD1602_WRITE_TIP);
  },
  /** @return {string} The type of return value for the block, a string. */
  getBlockType: function() {
    return Blockly.Types.TEXT;
  }
};

Blockly.Blocks['lcd1602_clr'] = {
  /**
   * Block for clearing 1st and 2nd row of 16x2 display
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/en/Reference/LiquidCrystal');
    this.setColour(Blockly.Blocks.displays.HUE);
    this.appendDummyInput().appendField(Blockly.Msg.ARD_LCD1602_CLR);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_LCD1602_CLR_TIP);
  }
};

Blockly.Blocks['sevseg'] = {
  /**
   * Block for setup 7 segment display
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.displays.HUE);
    this.appendDummyInput().appendField(Blockly.Msg.ARD_SEVSEG);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_SEVSEG_TIP);
  }
};

Blockly.Blocks['sevseg_write'] = {
  /**
   * Block for writing digit 0...9 to 7 segment display
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.displays.HUE);
    this.appendDummyInput().appendField(Blockly.Msg.ARD_SEVSEG_WRITE);
    this.appendValueInput("NUM");
    this.setInputsInline(true);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.ARD_SEVSEG_WRITE_TIP);
  },
  /** @return {string} The type of return value for the block, a string. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['foursevseg_setup'] = {
  /**
   * Block for setup Four Digit 7 Segment Display
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.displays.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_FOURSEVSEG);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_FOURSEVSEG_SEGA)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'SEGA')
        .appendField(Blockly.Msg.ARD_FOURSEVSEG_SEGB)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'SEGB')
        .appendField(Blockly.Msg.ARD_FOURSEVSEG_SEGC)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'SEGC')
        .appendField(Blockly.Msg.ARD_FOURSEVSEG_SEGD)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'SEGD');
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_FOURSEVSEG_SEGE)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'SEGE')
        .appendField(Blockly.Msg.ARD_FOURSEVSEG_SEGF)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'SEGF')
        .appendField(Blockly.Msg.ARD_FOURSEVSEG_SEGG)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'SEGG')
        .appendField(Blockly.Msg.ARD_FOURSEVSEG_SEGDP)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'SEGDP');
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_FOURSEVSEG_DIG1)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'DIG1')
        .appendField(Blockly.Msg.ARD_FOURSEVSEG_DIG2)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'DIG2')
        .appendField(Blockly.Msg.ARD_FOURSEVSEG_DIG3)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'DIG3')
        .appendField(Blockly.Msg.ARD_FOURSEVSEG_DIG4)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'DIG4');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_FOURSEVSEG_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SEGA', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SEGB', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SEGC', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SEGD', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SEGE', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SEGF', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SEGG', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SEGDP', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'DIG1', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'DIG2', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'DIG3', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'DIG4', 'digitalPins');
  }
};

Blockly.Blocks['foursevseg_write'] = {
  /**
   * Block for writing digit 0...9 to 7 segment display
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.displays.HUE);
    this.appendDummyInput().appendField(Blockly.Msg.ARD_FOURSEVSEG_WRITE);
    this.appendValueInput("NUM");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setOutput(false);
    this.setTooltip(Blockly.Msg.ARD_FOURSEVSEG_WRITE_TIP);
  },
};

Blockly.Blocks['foursevseg_setchar'] = {
  /**
   * Block for creating a character for 4 digit 7 segment display
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.displays.HUE);
    this.appendDummyInput()
	.appendField(new Blockly.FieldVariable(Blockly.Msg.TEXT_APPEND_VARIABLE), 'VAR')
	.appendField(new Blockly.FieldDropdown([['D1','D1'],['D2','D2'],['D3','D3'],['D4','D4']]), 'PIN')
        .appendField(Blockly.Msg.ARD_FOURSEVSEG_SETCHAR)
    this.appendDummyInput()
	.appendField("          ")
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'A')
	.appendField("       ");
    this.appendDummyInput()
	.appendField("     ")
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'F')
        .appendField("   ")
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'B')
        .appendField("     ");
    this.appendDummyInput()
	.appendField("          ")
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'G')
	.appendField("       ");
    this.appendDummyInput()
	.appendField("     ")
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'E')
        .appendField("   ")
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'C')
        .appendField("     ");
    this.appendDummyInput()
	.appendField("          ")
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'D')
	.appendField("   ")
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'DP')
	.appendField("   ");
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.ARD_FOURSEVSEG_SETCHAR_TIP);
  }
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'PIN', '[['D1','D1'],['D2','D2'],['D3','D3'],['D4','D4']]');
  }
};

Blockly.Blocks['foursevseg_clr'] = {
  /**
   * Block for 
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.displays.HUE);
    this.appendDummyInput().appendField(Blockly.Msg.ARD_FOURSEVSEG_CLR);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_FOURSEVSEG_CLR_TIP);
  }
};

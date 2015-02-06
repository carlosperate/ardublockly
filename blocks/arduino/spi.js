/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Blocks for Arduino SPI library.
 *               The Arduino SPI functions syntax can be found in:
 *               http://arduino.cc/en/Reference/SPI
 */
'use strict';

goog.provide('Blockly.Blocks.Arduino.spi');

goog.require('Blockly.Arduino');


Blockly.Blocks.Arduino.spi.HUE = 255;

Blockly.Blocks['spi_config'] = {
  /**
   * Block for the spi configuration. Info in the setHelpUrl link.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/SPI');
    this.setColour(Blockly.Blocks.Arduino.spi.HUE);
    this.appendDummyInput()
        .appendField('SPI Configuration:');
    this.appendDummyInput()
        .appendField('Data Shift')
        .appendField(
            new Blockly.FieldDropdown(
                [['MSBFIRST', 'MSBFIRST'],['LSBFIRST', 'LSBFIRST']]),
            'SPI_SHIFT_ORDER');
    this.appendDummyInput()
        .appendField('Clock Divide')
        .appendField(
            new Blockly.FieldDropdown(profile.default.spi_clock_divide),
            'SPI_CLOCK_DIVIDE');
    this.appendDummyInput()
        .appendField('SPI Mode (Idle - Edge)')
        .appendField(
            new Blockly.FieldDropdown(
                [['0 (Low - Falling)', 'SPI_MODE0'], 
                 ['1 (Low - Rising)', 'SPI_MODE1'],
                 ['2 (High - Falling)', 'SPI_MODE2'],
                 ['3 (High - Rising)', 'SPI_MODE3']]),
            'SPI_MODE');
    this.setTooltip('Configures the SPI peripheral');
  }
};

Blockly.Blocks['spi_transfer'] = {
  /**
   * Block for for the spi transfer. Info in the setHelpUrl link.
   * @this Blockly.Block
   */
  init: function() {
    // Drop down list to contains all digital pins plus an option for 'none'
    var pin_dropdown_extended = [['none', 'none']];
    for(var i=0; i<profile.default.digital.length; i++) {
        pin_dropdown_extended.push(profile.default.digital[i]);
    }

    this.setHelpUrl('http://arduino.cc/en/Reference/SPITransfer');
    this.setColour(Blockly.Blocks.Arduino.spi.HUE);
    this.appendDummyInput()
        .appendField('To SPI Slave pin')
        .appendField(
            new Blockly.FieldDropdown(pin_dropdown_extended), 'SPI_SS');
    this.appendDummyInput('')
        .appendField('transfer');
    this.appendValueInput('SPI_DATA', '');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Send SPI message to an specified slave device');
  }
};

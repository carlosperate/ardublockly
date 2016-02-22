  /**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino SPI library.
 *     The Arduino SPI functions syntax can be found in:
 *     http://arduino.cc/en/Reference/SPI
 */
'use strict';

goog.provide('Blockly.Blocks.spi');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.spi.HUE = 170;

Blockly.Blocks['spi_setup'] = {
  /**
   * Block for the spi configuration. Info in the setHelpUrl link.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/SPI');
    this.setColour(Blockly.Blocks.spi.HUE);
    this.appendDummyInput()
        .appendField('Setup')
        .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.spi), 'SPI_ID')
        .appendField('configuration:');
    this.appendDummyInput()
        .appendField('data shift')
        .appendField(
            new Blockly.FieldDropdown(
                [['MSBFIRST', 'MSBFIRST'], ['LSBFIRST', 'LSBFIRST']]),
            'SPI_SHIFT_ORDER');
    this.appendDummyInput()
        .appendField('clock divide')
        .appendField(
          new Blockly.FieldDropdown(
              Blockly.Arduino.Boards.selected.spiClockDivide),
          'SPI_CLOCK_DIVIDE');
    this.appendDummyInput()
        .appendField('SPI mode (idle - edge)')
        .appendField(
            new Blockly.FieldDropdown(
                [['0 (Low - Falling)', 'SPI_MODE0'],
                 ['1 (Low - Rising)', 'SPI_MODE1'],
                 ['2 (High - Falling)', 'SPI_MODE2'],
                 ['3 (High - Rising)', 'SPI_MODE3']]),
            'SPI_MODE');
    this.setTooltip('Configures the SPI peripheral.');
  },
  /**
   * Returns the selected SPI instance.
   * @return {!string} SPI instance name.
   * @this Blockly.Block
   */
  getSpiSetupInstance: function() {
    return this.getFieldValue('SPI_ID');
  },
  /**
   * Updates the content of the the board SPI related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SPI_ID', 'spi');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SPI_CLOCK_DIVIDE', 'spiClockDivide');
  }
};

Blockly.Blocks['spi_transfer'] = {
  /**
   * Block for for the spi transfer. Info in the setHelpUrl link.
   * @this Blockly.Block
   */
  init: function() {
    // Drop down list to contain all digital pins plus an option for 'none'
    var slaveNone = [['none', 'none']];
    var digitalPinsExtended = slaveNone.concat(
        Blockly.Arduino.Boards.selected.digitalPins);

    this.setHelpUrl('http://arduino.cc/en/Reference/SPITransfer');
    this.setColour(Blockly.Blocks.spi.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.spi), 'SPI_ID');
    this.appendValueInput('SPI_DATA')
        .setCheck(Blockly.Types.NUMBER.compatibles())
        .appendField('transfer');
    this.appendDummyInput()
        .appendField('to slave pin')
        .appendField(
            new Blockly.FieldDropdown(digitalPinsExtended), 'SPI_SS');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Send a SPI message to an specified slave device.');
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of stepper_config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    // Get the Serial instance from this block
    var thisInstanceName = this.getFieldValue('SPI_ID');

    // Iterate through top level blocks to find a setup instance for the SPI id
    var blocks = Blockly.mainWorkspace.getTopBlocks();
    var setupInstancePresent = false;
    for (var x = 0, length_ = blocks.length; x < length_; x++) {
      var func = blocks[x].getSpiSetupInstance;
      if (func) {
        var setupBlockInstanceName = func.call(blocks[x]);
        if (thisInstanceName == setupBlockInstanceName) {
          setupInstancePresent = true;
        }
      }
    }

    if (!setupInstancePresent) {
      this.setWarningText(
          'A setup block for ' + thisInstanceName + ' must be added to the ' +
          'workspace to use this block!', 'spi_setup');
    } else {
      this.setWarningText(null, 'spi_setup');
    }
  },
  /**
   * Retrieves the type of the selected variable, Arduino code returns a byte,
   * for now set it to integer.
   * @return {!string} Blockly type.
   */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Updates the content of the board SPI related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    // Special case, otherwise Blockly.Arduino.Boards.refreshBlockFieldDropdown
    var field = this.getField('SPI_SS');
    var fieldValue = field.getValue();
    var slaveNone = [['none', 'none']];
    field.menuGenerator_ =
        slaveNone.concat(Blockly.Arduino.Boards.selected['digitalPins']);

    var currentValuePresent = false;
    for (var i = 0, length_ = field.menuGenerator_.length; i < length_; i++) {
      if (fieldValue == field.menuGenerator_[i][1]) {
        currentValuePresent = true;
      }
    }
    // If the old value is not present any more, add a warning to the block.
    if (!currentValuePresent) {
      this.setWarningText(
          'Old pin value ' + fieldValue + ' is no longer available.', 'bPin');
    } else {
      this.setWarningText(null, 'bPin');
    }
  }
};

Blockly.Blocks['spi_transfer_return'] = {
  /**
   * Block for for the spi transfer with a return value.
   * @this Blockly.Block
   */
  init: function() {
    // Drop down list to contain all digital pins plus an option for 'none'
    var slaveNone = [['none', 'none']];
    var digitalPinsExtended = slaveNone.concat(
        Blockly.Arduino.Boards.selected.digitalPins);

    this.setHelpUrl('http://arduino.cc/en/Reference/SPITransfer');
    this.setColour(Blockly.Blocks.spi.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.spi), 'SPI_ID');
    this.appendValueInput('SPI_DATA')
        .appendField('transfer');
    this.appendDummyInput()
        .appendField('to slave pin')
        .appendField(
            new Blockly.FieldDropdown(digitalPinsExtended), 'SPI_SS');
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('Send a SPI message to an specified slave device and get ' +
                    'data back.');
  },
  /** Same as spi_transfer block */
  onchange: Blockly.Blocks['spi_transfer'].onchange,
  /** Same as spi_transfer block */
  getBlockType: Blockly.Blocks['spi_transfer'].getBlockType,
  /** Same as spi_transfer block */
  updateFields: Blockly.Blocks['spi_transfer'].updateFields
};

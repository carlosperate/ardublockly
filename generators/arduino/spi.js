/**
 * @fileoverview Blocks extension for Arduino SPI library.
 * The Arduino SPI functions syntax can be found in the following URL
 * http://arduino.cc/en/Reference/SPI
 */
'use strict';

goog.provide('Blockly.Arduino.spi');

goog.require('Blockly.Arduino');

/**
 * Block for the spi configuration. Info in the setHelpUrl link.
 * @this Blockly.Block
 */
Blockly.Blocks['spi_config'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/SPI');
    this.setColour(255);
    this.appendDummyInput()
        .appendField('SPI Configuration:');
    this.appendDummyInput()
        .appendField('Data Shift')
        .appendField(
            new Blockly.FieldDropdown([['MSBFIRST', 'MSBFIRST'], ['LSBFIRST', 'LSBFIRST']]),
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
    this.setTooltip('');
  }
};

/**
 * Code generator for the spi configuration block. It does not add any LoC to 
 * the loop(), but it generates code for the setup() function.
 */
Blockly.Arduino['spi_config'] = function(block) {
  var spi_shift = block.getFieldValue('SPI_SHIFT_ORDER');
  var spi_clock_divide = block.getFieldValue('SPI_CLOCK_DIVIDE');
  var spi_mode = block.getFieldValue('SPI_MODE');

  Blockly.Arduino.definitions_['define_spi'] = '#include <SPI.h>';
  Blockly.Arduino.setups_['setup_spi_order'] =
      'SPI.setBitOrder(' + spi_shift + ');';
  Blockly.Arduino.setups_['setup_spi_mode'] =
      'SPI.setDataMode(' + spi_mode + ');';
  Blockly.Arduino.setups_['setup_spi_div'] =
      'SPI.setClockDivider(' + spi_clock_divide + ');';
  Blockly.Arduino.setups_['setup_spi_begin'] =
      'SPI.begin();';

  var code = '';
  return code;
};


/**
 * Block for for the spi transfer. Info in the setHelpUrl link.
 * @this Blockly.Block
 */
Blockly.Blocks['spi_transfer'] = {
  init: function() {
    // Drop down list to contains all digital pins plus an option for 'none'
    var pin_dropdown_extended = [['none', 'none']];
    for(var i=0; i<profile.default.digital.length; i++) {
        pin_dropdown_extended.push(profile.default.digital[i]);
    }

    this.setHelpUrl('http://arduino.cc/en/Reference/SPITransfer');
    this.setColour(255);
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

/**
 * Code generator for the spi transfer block. 
 * SPI bus can have several slaves, which are selected using a digital output 
 * as a SS pin. This digital pin will be configured as a normal output (io.js)
 */
Blockly.Arduino['spi_transfer'] = function(block) {
  var spi_ss = block.getFieldValue('SPI_SS');
  var spi_data = Blockly.Arduino.valueToCode(
      block, 'SPI_DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = '';

  Blockly.Arduino.definitions_['define_spi'] = '#include <SPI.h>';
  Blockly.Arduino.setups_['setup_spi_begin'] = 'SPI.begin();';

  // Configure the SPI pins as used, or warn if already in use
  var warning_text = '';
  var pin_type = profile.default.pin_types.SPI;
  for(var i=0; i<profile.default.spi_pins.length; i++) {
    var pin_number = profile.default.spi_pins[i][1];
    if (pin_number in Blockly.Arduino.pins_) {
      if (Blockly.Arduino.pins_[pin_number] != pin_type) {
        warning_text = warning_text +
            'Pin alredy used as ' + Blockly.Arduino.pins_[pin_number] + '\n';
      }
    } else {
      // First time this IO pin is used, so configure it
      Blockly.Arduino.pins_[pin_number] = pin_type;
    }
  }
  if (warning_text === '') {
    block.setWarningText(null);
  } else {
    block.setWarningText(warning_text);
  }

  // Configure the Slave Select as a normal output if a pin is used
  if (spi_ss != 'none') { 
    var pin_type = profile.default.pin_types.OUTPUT;
    var set_up_key = 'setup_io_' + spi_ss;
    Blockly.Arduino.setups_[set_up_key] = 'pinMode(' + spi_ss + ', OUTPUT);';
    
    // If the IO has been configured already set a warning for the user
    if (spi_ss in Blockly.Arduino.pins_) {
      if (Blockly.Arduino.pins_[spi_ss] != pin_type) {
        warning_text = warning_text + 'Pin alredy used as ' +
            Blockly.Arduino.pins_[spi_ss];
      }
    } else {
      // First time this IO pin is used, so configure it
      Blockly.Arduino.pins_[spi_ss] = pin_type;
    }
  }

  if (warning_text === '') {
    block.setWarningText(null);
  } else {
    block.setWarningText(warning_text);
  }

  // Add the code, but only use a SS pin if one is selected
  if (spi_ss != 'none') {
      code = code + 'digitalWrite(' + spi_ss + ', HIGH);\n';
  }
  code = code + 'SPI.transfer(' + spi_data + ');\n';
  if (spi_ss != 'none') {
      code = code + 'digitalWrite(' + spi_ss + ', LOW);\n';
  }

  return code;
};

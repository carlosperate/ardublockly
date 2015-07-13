/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Arduino ode generator for SPI library blocks.
 *               The Arduino SPI functions syntax can be found in:
 *               http://arduino.cc/en/Reference/SPI
 */
'use strict';

goog.provide('Blockly.Arduino.spi');

goog.require('Blockly.Arduino');


/**
 * Code generator for the SPI configuration block. It does not add any LoC to 
 * the loop(), but it generates code for the setup() function.
 * Arduino code: #include <SPI.h>
 *               setup() { SPI.setBitOrder(X);
 *                         SPI.setDataMode(Y);
 *                         SPI.setClockDivider(Z);
 *                         SPI.begin(); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['spi_config'] = function(block) {
  var spiShift = block.getFieldValue('SPI_SHIFT_ORDER');
  var spiClockDivide = block.getFieldValue('SPI_CLOCK_DIVIDE');
  var spiMode = block.getFieldValue('SPI_MODE');

  Blockly.Arduino.definitions_['define_spi'] = '#include <SPI.h>';
  Blockly.Arduino.setups_['setup_spi_order'] =
      'SPI.setBitOrder(' + spiShift + ');';
  Blockly.Arduino.setups_['setup_spi_mode'] =
      'SPI.setDataMode(' + spiMode + ');';
  Blockly.Arduino.setups_['setup_spi_div'] =
      'SPI.setClockDivider(' + spiClockDivide + ');';
  Blockly.Arduino.setups_['setup_spi_begin'] =
      'SPI.begin();';

  var code = '';
  return code;
};

/**
 * Code generator for the SPI transfer block. 
 * SPI bus can have several slaves, which are selected using a digital output 
 * as a SS pin. This digital pin will be configured as a normal output.
 * Arduino code: #include <SPI.h>
 *               setup { pinMode(X, OUTPUT); }
 *               loop  { digitalWrite(X, HIGH);
 *                       SPI.transfer(0);
 *                       digitalWrite(X, LOW); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['spi_transfer'] = function(block) {
  var spiSs = block.getFieldValue('SPI_SS');
  var spiData = Blockly.Arduino.valueToCode(
      block, 'SPI_DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = '';

  Blockly.Arduino.definitions_['define_spi'] = '#include <SPI.h>';
  Blockly.Arduino.setups_['setup_spi_begin'] = 'SPI.begin();';

  // Configure SPI pins (MOSI, MISO, SCK) as used, or warn if already in use
  var warningText = '';
  var pinType = Blockly.Arduino.Boards.pinTypes.SPI;
  for (var i = 0; i < Blockly.Arduino.Boards.selected.spiPins.length; i++) {
    var pin_number = Blockly.Arduino.Boards.selected.spiPins[i][1];
    if (pin_number in Blockly.Arduino.pins_) {
      if (Blockly.Arduino.pins_[pin_number] != pinType) {
        warningText = warningText +
            'SPI needs pin ' + Blockly.Arduino.Boards.selected.spiPins[i][1] +
            ' as ' + Blockly.Arduino.Boards.selected.spiPins[i][0] + '\n' +
            'Pin ' + pin_number + ' already used as ' +
            Blockly.Arduino.pins_[pin_number] + '\n';
      }
    } else {
      // First time this IO pin is used, so configure it
      Blockly.Arduino.pins_[pin_number] = pinType;
    }
  }
  if (warningText === '') {
    block.setWarningText(null);
  } else {
    block.setWarningText(warningText);
  }

  // Configure the Slave Select as a normal output if a pin is used
  if (spiSs != 'none') { 
    pinType = Blockly.Arduino.Boards.pinTypes.OUTPUT;
    var setUpKey = 'setup_io_' + spiSs;
    Blockly.Arduino.setups_[setUpKey] = 'pinMode(' + spiSs + ', OUTPUT);';
    
    // If the IO has been configured already set a warning for the user
    if (spiSs in Blockly.Arduino.pins_) {
      if (Blockly.Arduino.pins_[spiSs] != pinType) {
        warningText = warningText + 'Pin already used as ' +
            Blockly.Arduino.pins_[spiSs];
      }
    } else {
      // First time this IO pin is used, so configure it
      Blockly.Arduino.pins_[spiSs] = pinType;
    }
  }

  if (warningText === '') {
    block.setWarningText(null);
  } else {
    block.setWarningText(warningText);
  }

  // Add the code, but only use a SS pin if one is selected
  if (spiSs != 'none') {
      code = code + 'digitalWrite(' + spiSs + ', HIGH);\n';
  }
  code = code + 'SPI.transfer(' + spiData + ');\n';
  if (spiSs != 'none') {
      code = code + 'digitalWrite(' + spiSs + ', LOW);\n';
  }

  return code;
};

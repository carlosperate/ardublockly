/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Code generator Arduino Digital and Analogue input/output
 *               blocks. The Arduino built in functions syntax can be found at:
 *               http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Arduino.IO');

goog.require('Blockly.Arduino');


/**
 * Function for 'set pin' (X) to a state (Y).
 * Arduino code: setup { pinMode(X, OUTPUT); }
 *               loop  { digitalWrite(X, Y); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['io_digitalwrite'] = function(block) {
  var pinKey = block.getFieldValue('PIN');
  var pinType = profile.default.pin_types.OUTPUT;
  var stateInput = Blockly.Arduino.valueToCode(
      block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) || '0';

  var setUpKey = 'setup_io_' + pinKey;
  var pinMode = 'pinMode(' + pinKey + ', OUTPUT);';
  var code = 'digitalWrite(' + pinKey + ',' + stateInput + ');\n'

  // If the IO has been configured already temporarily change it and restore it
  if (pinKey in Blockly.Arduino.pins_) {
    if (Blockly.Arduino.pins_[pinKey] != pinType) {
      block.setWarningText(
          'Pin already used as ' + Blockly.Arduino.pins_[pinKey]);
    } else {
      block.setWarningText(null);
    }
  } else {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pinKey] = pinType;
    Blockly.Arduino.setups_[setUpKey] = pinMode;
    block.setWarningText(null);
  }

  return code;
};

/**
 * Function for reading a digital pin (X).
 * Arduino code: setup { pinMode(X, INPUT); }
 *               loop  { digitalRead(X)     }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['io_digitalread'] = function(block) {
  var pinKey = block.getFieldValue('PIN');
  var pinType = profile.default.pin_types.INPUT;

  var setUpKey = 'setup_io_' + pinKey;
  var pinMode = 'pinMode(' + pinKey + ', INPUT);';
  var code = 'digitalRead(' + pinKey + ')';

  // If the IO has been configured already temporarily change it and restore it
  if (pinKey in Blockly.Arduino.pins_) {
    if (Blockly.Arduino.pins_[pinKey] != pinType) {
      block.setWarningText(
          'Pin already used as ' + Blockly.Arduino.pins_[pinKey]);
    } else {
      block.setWarningText(null);
    }
  } else {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pinKey] = pinType;
    Blockly.Arduino.setups_[setUpKey] = pinMode;
    block.setWarningText(null);
  }

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Function for setting the state (Y) of a built-in LED (X).
 * Arduino code: setup { pinMode(X, OUTPUT); }
 *               loop  { digitalWrite(X, Y); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['io_builtin_led'] = function(block) {
  var pinKey = block.getFieldValue('BUILT_IN_LED');
  var pinType = profile.default.pin_types.OUTPUT;
  var stateInput = Blockly.Arduino.valueToCode(
      block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) || '0';

  var setUpKey = 'setup_io_' + pinKey;
  var pinMode = 'pinMode(' + pinKey + ', ' + pinType + ');';
  var code = 'digitalWrite(' + pinKey + ',' + stateInput + ');\n'

  // If the IO has been configured already temporarily change it and restore it
  if (pinKey in Blockly.Arduino.pins_) {
    if (Blockly.Arduino.pins_[pinKey] != pinType) {
      block.setWarningText(
          'Pin ' + pinKey + ' already used as ' +
           Blockly.Arduino.pins_[pinKey]);
    } else {
      block.setWarningText(null);
    }
  } else {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pinKey] = pinType;
    Blockly.Arduino.setups_[setUpKey] = pinMode;
    block.setWarningText(null);
  }

  return code;
};

/**
 * Function for setting the state (Y) of an analogue output (X).
 * Arduino code: setup { pinMode(X, OUTPUT); }
 *               loop  { analogWrite(X, Y);  }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['io_analogwrite'] = function(block) {
  var pinKey = block.getFieldValue('PIN');
  var pinType = profile.default.pin_types.OUTPUT;
  var value_num = Blockly.Arduino.valueToCode(
      block, 'NUM', Blockly.Arduino.ORDER_ATOMIC) || '0';

  var setUpKey = 'setup_io_' + pinKey;
  var pinMode = 'pinMode(' + pinKey + ', OUTPUT);';
  var code = 'analogWrite(' + pinKey + ',' + value_num + ');\n'

  // If the IO has been configured already temporarily change it and restore it
  if (pinKey in Blockly.Arduino.pins_) {
    if (Blockly.Arduino.pins_[pinKey] != pinType) {
      block.setWarningText(
          'Pin already used as ' + Blockly.Arduino.pins_[pinKey]);
    } else {
      block.setWarningText(null);
    }
  } else {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pinKey] = pinType;
    Blockly.Arduino.setups_[setUpKey] = pinMode;
    block.setWarningText(null);
  }

  return code;
};

/**
 * Function for reading an analogue pin value (X).
 * Arduino code: setup { pinMode(X, INPUT); }
 *               loop  { analogRead(X)      }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['io_analogread'] = function(block) {
  var pinKey = block.getFieldValue('PIN');
  var pinType = profile.default.pin_types.INPUT;

  var setUpKey = 'setup_io_' + pinKey;
  var pinMode = 'pinMode(' + pinKey + ', ' + pinType + ');';
  var code = 'analogRead(' + pinKey + ')';
  
  // If the IO has been configured already temporarily change it and restore it
  if (pinKey in Blockly.Arduino.pins_) {
    if (Blockly.Arduino.pins_[pinKey] != pinType) {
      block.setWarningText(
          'Pin alredy used as ' + Blockly.Arduino.pins_[pinKey]);
    } else {
      block.setWarningText(null);
    }
  } else {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pinKey] = pinType;
    Blockly.Arduino.setups_[setUpKey] = pinMode;
    block.setWarningText(null);
  }

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


/**
 * Value for defining a digital pin state.
 * Arduino code: loop { HIGH / LOW }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['io_highlow'] = function(block) {
  // Boolean values HIGH and LOW.
  var code = (block.getFieldValue('STATE') == 'HIGH') ? 'HIGH' : 'LOW';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

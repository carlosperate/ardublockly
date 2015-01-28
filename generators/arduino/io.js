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
 * Function for 'set pin' to a state. Arduino code:
 * setup { pinMode(X, OUTPUT) }
 * loop  { digitalWrite(X, Y) }
 */
Blockly.Arduino['io_digitalwrite'] = function(block) {
  var pin_key = block.getFieldValue('PIN');
  var pin_type = profile.default.pin_types.OUTPUT;
  var state_input = Blockly.Arduino.valueToCode(
      block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var set_up_key = 'setup_io_' + pin_key;
  var pin_mode = 'pinMode(' + pin_key + ', OUTPUT);';
  var code = 'digitalWrite(' + pin_key + ',' + state_input + ');\n'

  // If the IO has been configured already temporarily change it and restore it
  if (pin_key in Blockly.Arduino.pins_) {
    if (Blockly.Arduino.pins_[pin_key] != pin_type) {
      block.setWarningText(
          'Pin already used as ' + Blockly.Arduino.pins_[pin_key]);
    } else {
      block.setWarningText(null);
    }
  } else {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pin_key] = pin_type;
    Blockly.Arduino.setups_[set_up_key] = pin_mode;
    block.setWarningText(null);
  }

  return code;
};

/**
 * Function for reading a digital pin. Arduino code:
 * setup { pinMode(X, INPUT) }
 * loop  { digitalRead(X)    }
 */
Blockly.Arduino['io_digitalread'] = function(block) {
  var pin_key = block.getFieldValue('PIN');
  var pin_type = profile.default.pin_types.INPUT;
  var set_up_key = 'setup_io_' + pin_key;
  var pin_mode = 'pinMode(' + pin_key + ', INPUT);';
  var code = 'digitalRead(' + pin_key + ')';

  // If the IO has been configured already temporarily change it and restore it
  if (pin_key in Blockly.Arduino.pins_) {
    if (Blockly.Arduino.pins_[pin_key] != pin_type) {
      block.setWarningText(
          'Pin already used as ' + Blockly.Arduino.pins_[pin_key]);
    } else {
      block.setWarningText(null);
    }
  } else {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pin_key] = pin_type;
    Blockly.Arduino.setups_[set_up_key] = pin_mode;
    block.setWarningText(null);
  }

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Function for setting the state of a built-in LED. Arduino code:
 * setup { pinMode(X, OUTPUT) }
 * loop  { digitalWrite(X, Y) }
 */
Blockly.Arduino['io_builtin_led'] = function(block) {
  var pin_key = block.getFieldValue('BUILT_IN_LED');
  var pin_type = profile.default.pin_types.OUTPUT;
  var state_input = Blockly.Arduino.valueToCode(
      block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var set_up_key = 'setup_io_' + pin_key;
  var pin_mode = 'pinMode(' + pin_key + ', ' + pin_type + ');';
  var code = 'digitalWrite(' + pin_key + ',' + state_input + ');\n'

  // If the IO has been configured already temporarily change it and restore it
  if (pin_key in Blockly.Arduino.pins_) {
    if (Blockly.Arduino.pins_[pin_key] != pin_type) {
      block.setWarningText(
          'Pin ' + pin_key + ' already used as ' +
           Blockly.Arduino.pins_[pin_key]);
    } else {
      block.setWarningText(null);
    }
  } else {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pin_key] = pin_type;
    Blockly.Arduino.setups_[set_up_key] = pin_mode;
    block.setWarningText(null);
  }

  return code;
};

/**
 * Function for setting the state of an analogue output. Arduino code:
 * setup { pinMode(X, OUTPUT) }
 * loop  { analogWrite(X, Y) }
 */
Blockly.Arduino['io_analogwrite'] = function(block) {
  var pin_key = block.getFieldValue('PIN');
  var pin_type = profile.default.pin_types.OUTPUT;
  var value_num = Blockly.Arduino.valueToCode(
      block, 'NUM', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var set_up_key = 'setup_io_' + pin_key;
  var pin_mode = 'pinMode(' + pin_key + ', OUTPUT);';
  var code = 'analogWrite(' + pin_key + ',' + value_num + ');\n'

  // If the IO has been configured already temporarily change it and restore it
  if (pin_key in Blockly.Arduino.pins_) {
    if (Blockly.Arduino.pins_[pin_key] != pin_type) {
      block.setWarningText(
          'Pin already used as ' + Blockly.Arduino.pins_[pin_key]);
    } else {
      block.setWarningText(null);
    }
  } else {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pin_key] = pin_type;
    Blockly.Arduino.setups_[set_up_key] = pin_mode;
    block.setWarningText(null);
  }

  return code;
};

/**
 * Function for reading an analogue pin value. Arduino code:
 * setup { pinMode(X, INPUT) }
 * loop  { analogRead(X)     }
 */
Blockly.Arduino['io_analogread'] = function(block) {
  var pin_key = block.getFieldValue('PIN');
  var pin_type = profile.default.pin_types.INPUT;
  var set_up_key = 'setup_io_' + pin_key;
  var pin_mode = 'pinMode(' + pin_key + ', ' + pin_type + ');';
  var code = 'analogRead(' + pin_key + ')';
  
  // If the IO has been configured already temporarily change it and restore it
  if (pin_key in Blockly.Arduino.pins_) {
    if (Blockly.Arduino.pins_[pin_key] != pin_type) {
      block.setWarningText(
          'Pin alredy used as ' + Blockly.Arduino.pins_[pin_key]);
    } else {
      block.setWarningText(null);
    }
  } else {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pin_key] = pin_type;
    Blockly.Arduino.setups_[set_up_key] = pin_mode;
    block.setWarningText(null);
  }

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


/**
 * Value for defining a digital pin state. Arduino code: HIGH / LOW
 */
Blockly.Arduino['io_highlow'] = function(block) {
  // Boolean values HIGH and LOW.
  var code = (block.getFieldValue('STATE') == 'HIGH') ? 'HIGH' : 'LOW';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

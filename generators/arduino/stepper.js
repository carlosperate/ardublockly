/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Arduino code generator for the Stepper library blocks.
 *               The Arduino Servo functions syntax can be found in the 
 *               following URL: http://arduino.cc/en/Reference/Stepper
 */
'use strict';

goog.provide('Blockly.Arduino.stepper');

goog.require('Blockly.Arduino');


/**
 * Code generator for the stepper generator configuration. Nothing is added 
 * to the 'loop()' function. Sets the pins (X and Y), steps per revolution (Z),
 * speed(A) and instance name (B).
 * Arduino code: #include <Stepper.h>
 *               Stepper B(Z, X, Y);
 *               setup() { B.setSpeed(A); }
 * @param {block} block Block to generate the code from.
 * @return {string} Empty string as no code goes into 'loop()' 
 */
Blockly.Arduino['stepper_config'] = function(block) {
  var pin1 = block.getFieldValue('STEPPER_PIN1');
  var pin2 = block.getFieldValue('STEPPER_PIN2');
  var pin_type = profile.default.pin_types.STEPPER;
  var stepper_name = block.getStepperInstance();
  var stepper_steps = Blockly.Arduino.valueToCode(block, 'STEPPER_STEPS',
      Blockly.Arduino.ORDER_ATOMIC) || '360';
  var stepper_speed = Blockly.Arduino.valueToCode(block, 'STEPPER_SPEED',
      Blockly.Arduino.ORDER_ATOMIC) || '90';
  var global_code = 'Stepper ' + stepper_name + '(' + stepper_steps + ', ' +
      pin1 + ', ' + pin2 + ');';
  var setup_code = stepper_name + '.setSpeed(' + stepper_speed + ');';

  // Maintain the setup regardless of pin conflict, warning should be enough
  Blockly.Arduino.definitions_['define_stepper'] = '#include <Stepper.h>\n';
  Blockly.Arduino.definitions_['global_stepper_' + stepper_name] = global_code;
  Blockly.Arduino.setups_['setup_stepper_' + stepper_name] = setup_code;

  // If the IO has been configured already set a block warning for the user
  var warning_text = '';
  if (pin1 in Blockly.Arduino.pins_) {
    if (Blockly.Arduino.pins_[pin1] != pin_type) {
      warning_text = 'Pin ' + pin1 + ' alredy used as ' +
          Blockly.Arduino.pins_[pin1] + '. ';
    }
  }
  if (pin2 in Blockly.Arduino.pins_) {
    if (Blockly.Arduino.pins_[pin2] != pin_type) {
      warning_text = warning_text + 'Pin ' + pin2 + ' alredy used as ' +
          Blockly.Arduino.pins_[pin2] + '. ';
    }
  }
  if (warning_text === '') {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pin1] = pin_type;
    Blockly.Arduino.pins_[pin2] = pin_type;
    block.setWarningText(null);
  } else {
    block.setWarningText(warning_text);
  }

  return '';
};

/**
 * Code generator for moving the stepper instance (X) a number of steps (Y).
 * Library info in the setHelpUrl link.
 * This block requires the stepper_config block to be present.
 * Arduino code: loop { X.steps(Y) }
 * @param {!block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['stepper_step'] = function(block) {
  var stepper_instance = block.getFieldValue('STEPPER_NAME');
  var stepper_steps = Blockly.Arduino.valueToCode(block, 'STEPPER_STEPS',
      Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = '';
  code = stepper_instance + '.steps(' + stepper_steps + ')';
  
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

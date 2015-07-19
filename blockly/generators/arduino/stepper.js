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
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Empty string as no code goes into 'loop()'.
 */
Blockly.Arduino['stepper_config'] = function(block) {
  var pin1 = block.getFieldValue('STEPPER_PIN1');
  var pin2 = block.getFieldValue('STEPPER_PIN2');
  var pinType = Blockly.Arduino.Boards.pinTypes.STEPPER;
  var stepperName = block.getStepperSetupInstance();
  var stepperSteps = Blockly.Arduino.valueToCode(block, 'STEPPER_STEPS',
      Blockly.Arduino.ORDER_ATOMIC) || '360';
  var stepperSpeed = Blockly.Arduino.valueToCode(block, 'STEPPER_SPEED',
      Blockly.Arduino.ORDER_ATOMIC) || '90';

  var globalCode = 'Stepper ' + stepperName + '(' + stepperSteps + ', ' +
      pin1 + ', ' + pin2 + ');';
  var setupCode = stepperName + '.setSpeed(' + stepperSpeed + ');';

  // Maintain the setup regardless of pin conflict, warning should be enough
  Blockly.Arduino.definitions_['define_stepper'] = '#include <Stepper.h>\n';
  Blockly.Arduino.definitions_['global_stepper_' + stepperName] = globalCode;
  Blockly.Arduino.setups_['setup_stepper_' + stepperName] = setupCode;

  // If the IO has been configured already set a block warning for the user
  var warningText = '';
  if (pin1 in Blockly.Arduino.pins_) {
    if (Blockly.Arduino.pins_[pin1] != pinType) {
      warningText = 'Pin ' + pin1 + ' already used as ' +
          Blockly.Arduino.pins_[pin1] + '. ';
    }
  }
  if (pin2 in Blockly.Arduino.pins_) {
    if (Blockly.Arduino.pins_[pin2] != pinType) {
      warningText = warningText + 'Pin ' + pin2 + ' already used as ' +
          Blockly.Arduino.pins_[pin2] + '. ';
    }
  }
  if (warningText === '') {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pin1] = pinType;
    Blockly.Arduino.pins_[pin2] = pinType;
    block.setWarningText(null);
  } else {
    block.setWarningText(warningText);
  }

  return '';
};

/**
 * Code generator for moving the stepper instance (X) a number of steps (Y).
 * Library info in the setHelpUrl link.
 * This block requires the stepper_config block to be present.
 * Arduino code: loop { X.steps(Y) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['stepper_step'] = function(block) {
  var stepperInstanceName = block.getFieldValue('STEPPER_NAME');
  var stepperSteps = Blockly.Arduino.valueToCode(block, 'STEPPER_STEPS',
      Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = stepperInstanceName + '.step(' + stepperSteps + ');\n';
  return code;
};

/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Arduino code generator for the Servo library blocks.
 *               The Arduino Servo functions syntax can be found in
 *               http://arduino.cc/en/reference/servo
 *
 * TODO: If angle selector added to blocks edit code here.
 */
'use strict';

goog.provide('Blockly.Arduino.servo');

goog.require('Blockly.Arduino');


/**
 * Code generator to set an angle (Y) value to a servo PWM pin (X).
 * Arduino code: #include <Servo.h>
 *               Servo myServo_X;
 *               setup { myServo_X.attach(X); }
 *               loop  { myServo_X.write(Y);  } 
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['servo_write'] = function(block) {
  var pinKey = block.getFieldValue('SERVO_PIN');
  var pinType = profile.default.pin_types.SERVO;
  var servoAngle = Blockly.Arduino.valueToCode(block, 'SERVO_ANGLE', Blockly.Arduino.ORDER_ATOMIC) || '90';

  var servoName = 'myServo_' + pinKey;
  var code = servoName + '.write(' + servoAngle + ');\n';

  // Maintain the setup regardless of pin conflict, warning should be enough
  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['global_servo_' + pinKey] = 'Servo ' + servoName + ';';
  Blockly.Arduino.setups_['setup_servo_' + pinKey] = servoName + '.attach(' + pinKey + ');';

  // If the IO has been configured already set a block warning for the user
  if (pinKey in Blockly.Arduino.pins_) {
     if (Blockly.Arduino.pins_[pinKey] != pinType) {
       block.setWarningText('Pin alredy used as ' + Blockly.Arduino.pins_[pinKey]);
     } else {
       block.setWarningText(null);
     }
  } else {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pinKey] = pinType;
    block.setWarningText(null);
  }

  return code;
};

/**
 * Code generator to read an angle value from a servo PWM pin (X).
 * Arduino code: #include <Servo.h>
 *               Servo myServo_X;
 *               setup { myServo_X.attach(X); }
 *               loop  { myServo_X.read();    }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['servo_read'] = function(block) {
  var pinKey = block.getFieldValue('SERVO_PIN');
  var pinType = profile.default.pin_types.SERVO;

  var servoName = 'myServo_' + pinKey;
  var code = servoName + '.read()';

  // Maintain the setup regardless of pin conflict, warning should be enough
  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['global_servo_' + pinKey] = 'Servo ' + servoName + ';';
  Blockly.Arduino.setups_['setup_servo_' + pinKey] = servoName + '.attach(' + pinKey + ');';

  // If the IO has been configured already set a block warning for the user
  if (pinKey in Blockly.Arduino.pins_) {
     if (Blockly.Arduino.pins_[pinKey] != pinType) {
       block.setWarningText('Pin alredy used as ' + Blockly.Arduino.pins_[pinKey]);
     } else {
       block.setWarningText(null);
     }
  } else {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pinKey] = pinType;
    block.setWarningText(null);
  }

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

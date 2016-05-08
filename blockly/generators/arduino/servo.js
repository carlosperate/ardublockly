/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the Servo library blocks.
 *     The Arduino Servo library docs: http://arduino.cc/en/reference/servo
 *
 * TODO: If angle selector added to blocks edit code here.
 */
'use strict';

goog.provide('Blockly.Arduino.servo');

goog.require('Blockly.Arduino');


/**
 * Code generator to set an angle (Y) value to a servo PWM pin (X).
 * Arduino code: #include <Servo.h>
 *               Servo myServoX;
 *               setup { myServoX.attach(X); }
 *               loop  { myServoX.write(Y);  }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['servo_write'] = function(block) {
  var pinKey = block.getFieldValue('SERVO_PIN');
  var servoAngle = Blockly.Arduino.valueToCode(
      block, 'SERVO_ANGLE', Blockly.Arduino.ORDER_ATOMIC) || '90';
  var servoName = 'myServo' + pinKey;

  Blockly.Arduino.reservePin(
      block, pinKey, Blockly.Arduino.PinTypes.SERVO, 'Servo Write');

  Blockly.Arduino.addInclude('servo', '#include <Servo.h>');
  Blockly.Arduino.addDeclaration('servo_' + pinKey, 'Servo ' + servoName + ';');

  var setupCode = servoName + '.attach(' + pinKey + ');';
  Blockly.Arduino.addSetup('servo_' + pinKey, setupCode, true);

  var code = servoName + '.write(' + servoAngle + ');\n';
  return code;
};

/**
 * Code generator to read an angle value from a servo PWM pin (X).
 * Arduino code: #include <Servo.h>
 *               Servo myServoX;
 *               setup { myServoX.attach(X); }
 *               loop  { myServoX.read();    }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['servo_read'] = function(block) {
  var pinKey = block.getFieldValue('SERVO_PIN');
  var servoName = 'myServo' + pinKey;

  Blockly.Arduino.reservePin(
      block, pinKey, Blockly.Arduino.PinTypes.SERVO, 'Servo Read');

  Blockly.Arduino.addInclude('servo', '#include <Servo.h>');
  Blockly.Arduino.addDeclaration('servo_' + pinKey, 'Servo ' + servoName + ';');

  var setupCode = servoName + '.attach(' + pinKey + ');';
  Blockly.Arduino.addSetup('servo_' + pinKey, setupCode, true);

  var code = servoName + '.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


/**
 * The servo setup block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['servo_config_hub'] = function(block) {
  var servo = block.getFieldValue('NAMESERVO');
  var servoType = block.getFieldValue('SERVOTYPE');
  
  //the hub saved the connector in the attached block
  var hubconnector = block['connector'] || ['0', '1']
  //compute the pins, normally only possible to attach at valid pins
  var pin = hubconnector[0];

  var servoName = 'myServo' + servo;
  //servo is a variable containing the used pins
  Blockly.Arduino.addVariable(servo,
    'int ' + servo + ' = ' + pin + ';', true);
  
  Blockly.Arduino.addInclude('servo', '#include <Servo.h>');
  Blockly.Arduino.addDeclaration('servo_' + servoName, 'Servo ' + servoName + ';');
  Blockly.Arduino.reservePin(block, pin, Blockly.Arduino.PinTypes.SERVO, 'Servo Write');

  var setupCode = servoName + '.attach(' + pin + ');';
  Blockly.Arduino.addSetup('servo_' + servoName, setupCode, true);

  return '';
};

/**
 * Code generator to set an angle (Y) value to a servo PWM pin (X).
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['servohub_write'] = function(block) {
  var servoInstanceName = block.getFieldValue('SERVO_NAME');
  var servoAngle = Blockly.Arduino.valueToCode(
      block, 'SERVO_ANGLE', Blockly.Arduino.ORDER_ATOMIC) || '90';
  var servoName = 'myServo' + servoInstanceName;

  var code = servoName + '.write(' + servoAngle + ');\n';
  return code;
};

/**
 * Code generator to set a speed value to a servo PWM pin.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['servohub_write2'] = function(block) {
  var servoInstanceName = block.getFieldValue('SERVO_NAME');
  var servoSpeed = Blockly.Arduino.valueToCode(
      block, 'SERVO_SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var servoName = 'myServo' + servoInstanceName;

  //convert -100 .. 100 to 0..180 
  var code = servoName + '.write(constrain(map(' + servoSpeed + ', -100, 100, 0, 180), 0, 180));\n';
  return code;
};

/**
 * Code generator to read an angle value from a servo PWM pin (X).
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['servohub_read'] = function(block) {
  var servoInstanceName = block.getFieldValue('SERVO_NAME');
  var servoName = 'myServo' + servoInstanceName;

  var code = servoName + '.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


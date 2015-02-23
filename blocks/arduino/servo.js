/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Arduino blocks for the Servo library.
 *               The Arduino Servo functions can be found in
 *               http://arduino.cc/en/reference/servo
 *
 * TODO: Add angle selector instead of block input.
 */
'use strict';

goog.provide('Blockly.Blocks.Arduino.servo');

goog.require('Blockly.Arduino');


Blockly.Blocks.Arduino.servo.HUE = 50;

Blockly.Blocks['servo_write'] = {
  /**
   * Block for writing an angle value into a servo PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoWrite');
    this.setColour(Blockly.Blocks.Arduino.servo.HUE);
    this.appendDummyInput('')
        .appendField('Set SERVO from Pin')
        .appendField(new Blockly.FieldDropdown(profile.default.pwm), 'SERVO_PIN');
    this.setInputsInline(false);
    this.appendValueInput('SERVO_ANGLE', 'Number')
        .setCheck('Number')
        .appendField("to");
    this.appendDummyInput('')
        .appendField('Degrees (0-180)');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Set a Servo to an specified angle');
  }
};

Blockly.Blocks['servo_read'] = {
  /**
   * Block for reading an angle value of a servo PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoRead');
    this.setColour(Blockly.Blocks.Arduino.servo.HUE);
    this.appendDummyInput('')
        .appendField('Read SERVO from PIN#')
        .appendField(new Blockly.FieldDropdown(profile.default.pwm), 'SERVO_PIN');
    this.setOutput(true, 'Number');
    this.setTooltip('Read a Servo angle');
  },
  /**
   * Retrieves the type of the block, in this case an integer.
   */
  getType: function() {
    return 'int';
  }
};

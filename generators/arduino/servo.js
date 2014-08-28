/**
 * @fileoverview Blocks extension for Arduino Servo library.
 * The Arduino Servo functions syntax can be found in http://arduino.cc/en/reference/servo
 */
'use strict';

goog.provide('Blockly.Arduino.servo');

goog.require('Blockly.Arduino');

/**
 * Description
 */
Blockly.Blocks['servo_write'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoWrite');
    this.setColour(50);
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

/**
 * Description
 */
Blockly.Arduino['servo_write'] = function(block) {
  var pin_key = block.getFieldValue('SERVO_PIN');
  var pin_type = profile.default.pin_types.SERVO;
  var servo_name = 'myServo_' + pin_key;
  var servo_angle = Blockly.Arduino.valueToCode(block, 'SERVO_ANGLE', Blockly.Arduino.ORDER_ATOMIC) || '90';
  var code = servo_name + '.write(' + servo_angle + ');\n';

  // Maintain the setup regardless of pin conflict, warning should be enough
  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['global_servo_' + pin_key] = 'Servo ' + servo_name + ';';
  Blockly.Arduino.setups_['setup_servo_' + pin_key] = servo_name + '.attach(' + pin_key + ');';

  // If the IO has been configured already set a block warning for the user
  if (pin_key in Blockly.Arduino.pins_) {
     if (Blockly.Arduino.pins_[pin_key] != pin_type) {
       block.setWarningText('Pin alredy used as ' + Blockly.Arduino.pins_[pin_key]);
     } else {
       block.setWarningText(null);
     }
  } else {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pin_key] = pin_type;
    block.setWarningText(null);
  }

  return code;
};

/**
 * Description
 */
Blockly.Blocks['servo_read'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoRead');
    this.setColour(50);
    this.appendDummyInput('')
        .appendField('Read SERVO from PIN#')
        .appendField(new Blockly.FieldDropdown(profile.default.pwm), 'SERVO_PIN');
    this.setOutput(true, 'Number');
    this.setTooltip('Read a Servo angle');
  }
};

/**
 * Description
 */
Blockly.Arduino['servo_read'] = function(block) {
  var pin_key = block.getFieldValue('SERVO_PIN');
  var pin_type = profile.default.pin_types.SERVO;
  var servo_name = 'myServo_' + pin_key;
  var code = servo_name + '.read()';

  // Maintain the setup regardless of pin conflict, warning should be enough
  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['global_servo_' + pin_key] = 'Servo ' + servo_name + ';';
  Blockly.Arduino.setups_['setup_servo_' + pin_key] = servo_name + '.attach(' + pin_key + ');';

  // If the IO has been configured already set a block warning for the user
  if (pin_key in Blockly.Arduino.pins_) {
     if (Blockly.Arduino.pins_[pin_key] != pin_type) {
       block.setWarningText('Pin alredy used as ' + Blockly.Arduino.pins_[pin_key]);
     } else {
       block.setWarningText(null);
     }
  } else {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pin_key] = pin_type;
    block.setWarningText(null);
  }

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Code generator for the Arduino serial blocks.
 *               The Arduino built in functions syntax can be found at:
 *               http://arduino.cc/en/Reference/HomePage
 *
 * TODO: There are more function that can be added:
 *       http://arduino.cc/en/Reference/Serial
 */
'use strict';

goog.provide('Blockly.Arduino.serial');

goog.require('Blockly.Arduino');


/**
 * Code generator of block for writing to the serial com.
 * Arduino code: loop { Serial.print(X) }
 */
Blockly.Arduino['serial_print'] = function(block) {
  var content = Blockly.Arduino.valueToCode(
      block, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'Serial.print(' + content + ');\n';
  return code;
};

/**
 * Code generator for block for setting the serial com speed.
 * Arduino code: setup{ Serial.begin(X) }
 */
Blockly.Arduino['serial_speed'] = function(block) {
  var serialId = block.getFieldValue('SERIAL_ID');
  var serialSpeed = block.getFieldValue('SPEED');

  Blockly.Arduino.setups_['setup_serial_' + serialId] =
      serialId + '.begin(' + serialSpeed + ');\n';

  var code = '';
  return code;
};

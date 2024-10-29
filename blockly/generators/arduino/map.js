/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for the Arduino map functionality.
 *     Arduino built-in function docs: http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Arduino.map');

goog.require('Blockly.Arduino');


/**
 * Code generator for the map block.
 * Arduino code: loop { map(x, 0, 1024, 0, y) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['base_map'] = function(block) {
  var vNum = Blockly.Arduino.valueToCode(
      block, 'NUM', Blockly.Arduino.ORDER_NONE) || '10';
  var vFromL = Blockly.Arduino.valueToCode(
      block, 'FROML', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var vFromH = Blockly.Arduino.valueToCode(
      block, 'FROMH', Blockly.Arduino.ORDER_ATOMIC) || '100';
  var vToL = Blockly.Arduino.valueToCode(
      block, 'TOL', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var vToH = Blockly.Arduino.valueToCode(
      block, 'TOH', Blockly.Arduino.ORDER_ATOMIC) || '1000';

  var code = 'map(' + vNum + ', ' + vFromL + ', ' + vFromH + ', ' + vToL + ', ' + vToH + ')';
  return [code, Blockly.Arduino.ORDER_NONE];
};

/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for Arduino Digital and Analogue input/output.
 *     Arduino built in function docs: http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Arduino.misc');

goog.require('Blockly.Arduino');

Blockly.Arduino['shiftout'] = function(block) {
  var data = block.getFieldValue("DATA");
  var clk = block.getFieldValue("CLK");
  var order = block.getFieldValue("BO");
  var type = Blockly.Arduino.valueToCode(block, "BVAL", Blockly.Arduino.ORDER_ATOMIC);
  var code = 'shiftOut('+data+', '+clk+', '+order+', '+type+');\n';
  return code;
}; 

Blockly.Arduino['bitset'] = function(block) {
  var x = Blockly.Arduino.valueToCode(block, "XVAL", Blockly.Arduino.ORDER_ATOMIC);
  var n = Blockly.Arduino.valueToCode(block, "NVAL", Blockly.Arduino.ORDER_ATOMIC);
  var code = 'bitSet('+x+', '+n+');\n';
  return code;
};

/**
 * Code generator for the bitwise operator block.
 * Arduino code: loop { X operator Y }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['operation_bitwise'] = function(block) {
  var OPERATORS = {
    'AND': '&',
    'OR': '|',
    'XOR': '^',
    'NOT': '~',
    'SHIFTLEFT': '<<',
    'SHIFTRIGHT': '>>'
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '&') || (operator == '|') || (operator == '~') || (operator == '~') || (operator == '<<') || (operator == '>>') ? Blockly.Arduino.ORDER_BITWISE_AND :
      Blockly.Arduino.ORDER_BITWISE_OR;
  var argument0 = Blockly.Arduino.valueToCode(block, 'A', order) || 'false';
  var argument1 = Blockly.Arduino.valueToCode(block, 'B', order) || 'false';
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Arduino['attach_interrupt'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var function = Blockly.Arduino.statementToCode(block, 'ISR');
  var mode = block.getFieldValue('MODE');
  Blockly.Arduino.addDeclaration('ai_d','void ai_func() {\n '+function+'\n}\n');
  Blockly.Arduino.addSetup('ai_s','attachInterrupt('+pin+', ai_func, '+mode+');\n');
  return '';
}; 




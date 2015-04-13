/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Generating Arduino code for list blocks.
 *               Based on the Dart list code generator.
 *
 * TODO: A lot of this can be converted to arrays code by creating functions to
 *       replicate this kind of behavior.
 */
'use strict';

goog.provide('Blockly.Arduino.lists');

goog.require('Blockly.Arduino');


Blockly.Arduino['lists_create_empty'] = function(block) {
  // Create an empty list.
  return ['[]', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['lists_create_with'] = function(block) {
  // Create a list with any number of elements of any type.
  var code = new Array(block.itemCount_);
  for (var n = 0; n < block.itemCount_; n++) {
    code[n] = Blockly.Arduino.valueToCode(block, 'ADD' + n,
        Blockly.Arduino.ORDER_NONE) || 'null';
  }
  code = '[' + code.join(', ') + ']';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['lists_repeat'] = function(block) {
  // Create a list with one element repeated.
  if (!Blockly.Arduino.definitions_['lists_repeat']) {
    // Function adapted from Closure's goog.array.repeat.
    var functionName = Blockly.Arduino.variableDB_.getDistinctName('lists_repeat',
        Blockly.Generator.NAME_TYPE);
    Blockly.Arduino.lists_repeat.repeat = functionName;
    var func = [];
    func.push('List ' + functionName + '(value, n) {');
    func.push('  var array = new List(n);');
    func.push('  for (int i = 0; i < n; i++) {');
    func.push('    array[i] = value;');
    func.push('  }');
    func.push('  return array;');
    func.push('}');
    Blockly.Arduino.definitions_['lists_repeat'] = func.join('\n');
  }
  var argument0 = Blockly.Arduino.valueToCode(block, 'ITEM', true) || 'null';
  var argument1 = Blockly.Arduino.valueToCode(block, 'NUM') || '0';
  var code = Blockly.Arduino.lists_repeat.repeat +
      '(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino['lists_length'] = function(block) {
  // Testing the length of a list is the same as for a string.
  return Blockly.Arduino.text_length.call(block);
};

Blockly.Arduino['lists_isEmpty'] = function(block) {
  // Testing a list for being empty is the same as for a string.
  return Blockly.Arduino.text_isEmpty.call(block);
};

Blockly.Arduino['lists_indexOf'] = function(block) {
  // Searching a list for a value is the same as search for a substring.
  return Blockly.Arduino.text_indexOf.call(block);
};

Blockly.Arduino['lists_getIndex'] = function(block) {
  // Indexing into a list is the same as indexing into a string.
  return Blockly.Arduino.text_charAt.call(block);
};

Blockly.Arduino['lists_setIndex'] = function(block) {
  // Set element at index.
  //TODO: Need to add MODE and WHERE inputs.
  var at = Blockly.Arduino.valueToCode(block, 'AT',
      Blockly.Arduino.ORDER_ADDITIVE) || '1';
  var list = Blockly.Arduino.valueToCode(block, 'LIST',
      Blockly.Arduino.ORDER_UNARY_POSTFIX) || '[]';
  var value = Blockly.Arduino.valueToCode(block, 'TO',
      Blockly.Arduino.ORDER_ASSIGNMENT) || 'null';
  // Blockly uses one-based indicies.
  if (at.match(/^\d+$/)) {
    // If the index is a naked number, decrement it right now.
    at = parseInt(at, 10) - 1;
  } else {
    // If the index is dynamic, decrement it in code.
    at += ' - 1';
  }
  return list + '[' + at + '] = ' + value + ';\n';
};

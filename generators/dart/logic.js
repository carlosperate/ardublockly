/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Dart for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

Blockly.Dart = Blockly.Generator.get('Dart');

Blockly.Dart.logic_compare = function() {
  // Comparison operator.
  var mode = this.getTitleValue('OP');
  var operator = Blockly.Dart.logic_compare.OPERATORS[mode];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.Dart.ORDER_EQUALITY : Blockly.Dart.ORDER_RELATIONAL;
  var argument0 = Blockly.Dart.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.Dart.valueToCode(this, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Dart.logic_compare.OPERATORS = {
  EQ: '==',
  NEQ: '!=',
  LT: '<',
  LTE: '<=',
  GT: '>',
  GTE: '>='
};

Blockly.Dart.logic_operation = function() {
  // Operations 'and', 'or'.
  var operator = (this.getTitleValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.Dart.ORDER_LOGICAL_AND :
      Blockly.Dart.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Dart.valueToCode(this, 'A', order) || 'false';
  var argument1 = Blockly.Dart.valueToCode(this, 'B', order) || 'false';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Dart.logic_negate = function() {
  // Negation.
  var order = Blockly.Dart.ORDER_UNARY_PREFIX;
  var argument0 = Blockly.Dart.valueToCode(this, 'BOOL', order) || 'false';
  var code = '!' + argument0;
  return [code, order];
};

Blockly.Dart.logic_boolean = function() {
  // Boolean values true and false.
  var code = (this.getTitleValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.Dart.ORDER_ATOMIC];
};

Blockly.Dart.logic_null = function() {
  // Null data type.
  return ['null', Blockly.Dart.ORDER_ATOMIC];
};

Blockly.Dart.logic_ternary = function() {
  // Ternary operator.
  var value_if = Blockly.Dart.valueToCode(this, 'IF',
      Blockly.Dart.ORDER_CONDITIONAL) || 'false';
  var value_then = Blockly.Dart.valueToCode(this, 'THEN',
      Blockly.Dart.ORDER_CONDITIONAL) || 'null';
  var value_else = Blockly.Dart.valueToCode(this, 'ELSE',
      Blockly.Dart.ORDER_CONDITIONAL) || 'null';
  var code = value_if + ' ? ' + value_then + ' : ' + value_else
  return [code, Blockly.Dart.ORDER_CONDITIONAL];
};

Blockly.Dart.logic_number_property = function() {
  // Check if a number is even, odd, prime, whole, positive, or negative
  // or if it is divisible by certain number. Returns true or false.
  var number_to_check = Blockly.Dart.valueToCode(this, 'NUMBER_TO_CHECK',
      Blockly.Dart.ORDER_MULTIPLICATIVE);
  if (!number_to_check) {
    return ['false', Blockly.Python.ORDER_ATOMIC];
  }
  var dropdown_property = this.getTitleValue('PROPERTY');
  var code;
  if (dropdown_property == 'PRIME') {
    // Prime is a special case as it is not a one-liner test.
    if (!Blockly.Dart.definitions_['isPrime']) {
      Blockly.Dart.definitions_['import_dart_math'] =
          'import \'dart:math\' as Math;';
      var functionName = Blockly.Dart.variableDB_.getDistinctName(
          'isPrime', Blockly.Generator.NAME_TYPE);
      Blockly.Dart.logic_prime= functionName;
      var func = [];
      func.push('bool ' + functionName + '(n) {');
      func.push('  // http://en.wikipedia.org/wiki/Primality_test#Naive_methods');
      func.push('  if (n == 2 || n == 3) {');
      func.push('    return true;');
      func.push('  }');
      func.push('  // False if n is null, negative, is 1, or not whole.');
      func.push('  // And false if n is divisible by 2 or 3.');
      func.push('  if (n == null || n <= 1 || n % 1 != 0 || n % 2 == 0 ||' +
                ' n % 3 == 0) {');
      func.push('    return false;');
      func.push('  }');
      func.push('  // Check all the numbers of form 6k +/- 1, up to sqrt(n).');
      func.push('  for (var x = 6; x <= Math.sqrt(n) + 1; x += 6) {');
      func.push('    if (n % (x - 1) == 0 || n % (x + 1) == 0) {');
      func.push('      return false;');
      func.push('    }');
      func.push('  }');
      func.push('  return true;');
      func.push('}');
      Blockly.Dart.definitions_['isPrime'] = func.join('\n');
    }
    code = Blockly.Dart.logic_prime + '(' + number_to_check + ')';
    return [code, Blockly.Dart.ORDER_FUNCTION_CALL];
  }
  switch (dropdown_property) {
    case 'EVEN':
      code = number_to_check + ' % 2 == 0';
      break;
    case 'ODD':
      code = number_to_check + ' % 2 == 1';
      break;
    case 'WHOLE':
      code = number_to_check + ' % 1 == 0';
      break;
    case 'POSITIVE':
      code = number_to_check + ' > 0';
      break;
    case 'NEGATIVE':
      code = number_to_check + ' < 0';
      break;
    case 'DIVISIBLE_BY':
      var divisor = Blockly.Dart.valueToCode(this, 'DIVISOR',
          Blockly.Dart.ORDER_MULTIPLICATIVE);
      if (!divisor) {
        return ['false', Blockly.Python.ORDER_ATOMIC];
      }
      code = number_to_check + ' % ' + divisor + ' == 0';
      break;
  }
  return [code, Blockly.Dart.ORDER_EQUALITY];
};


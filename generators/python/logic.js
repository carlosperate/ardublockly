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
 * @fileoverview Generating Python for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

Blockly.Python = Blockly.Generator.get('Python');

Blockly.Python.logic_compare = function() {
  // Comparison operator.
  var mode = this.getTitleValue('OP');
  var operator = Blockly.Python.logic_compare.OPERATORS[mode];
  var order = Blockly.Python.ORDER_RELATIONAL;
  var argument0 = Blockly.Python.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.Python.valueToCode(this, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Python.logic_compare.OPERATORS = {
  EQ: '==',
  NEQ: '!=',
  LT: '<',
  LTE: '<=',
  GT: '>',
  GTE: '>='
};

Blockly.Python.logic_operation = function() {
  // Operations 'and', 'or'.
  var operator = (this.getTitleValue('OP') == 'AND') ? 'and' : 'or';
  var order = (operator == 'and') ? Blockly.Python.ORDER_LOGICAL_AND :
      Blockly.Python.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Python.valueToCode(this, 'A', order) || 'False';
  var argument1 = Blockly.Python.valueToCode(this, 'B', order) || 'False';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Python.logic_negate = function() {
  // Negation.
  var argument0 = Blockly.Python.valueToCode(this, 'BOOL',
      Blockly.Python.ORDER_LOGICAL_NOT) || 'False';
  var code = 'not ' + argument0;
  return [code, Blockly.Python.ORDER_LOGICAL_NOT];
};

Blockly.Python.logic_boolean = function() {
  // Boolean values true and false.
  var code = (this.getTitleValue('BOOL') == 'TRUE') ? 'True' : 'False';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.logic_null = function() {
  // Null data type.
  return ['None', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.logic_ternary = function() {
  // Ternary operator.
  var value_if = Blockly.Python.valueToCode(this, 'IF',
      Blockly.Python.ORDER_CONDITIONAL) || 'False';
  var value_then = Blockly.Python.valueToCode(this, 'THEN',
      Blockly.Python.ORDER_CONDITIONAL) || 'None';
  var value_else = Blockly.Python.valueToCode(this, 'ELSE',
      Blockly.Python.ORDER_CONDITIONAL) || 'None';
  var code = value_then + ' if ' + value_if + ' else ' + value_else
  return [code, Blockly.Python.ORDER_CONDITIONAL];
};

Blockly.Python.logic_number_property = function() {
  // Check if a number is even, odd, prime, whole, positive, or negative
  // or if it is divisible by certain number. Returns true or false.
  var number_to_check = Blockly.Python.valueToCode(this, 'NUMBER_TO_CHECK',
      Blockly.Python.ORDER_MULTIPLICATIVE);
  if (!number_to_check) {
    return ['False', Blockly.Python.ORDER_ATOMIC];
  }
  var dropdown_property = this.getTitleValue('PROPERTY');
  var code;
  if (dropdown_property == 'PRIME') {
    // Prime is a special case as it is not a one-liner test.
    if (!Blockly.Python.definitions_['isPrime']) {
      var functionName = Blockly.Python.variableDB_.getDistinctName(
          'isPrime', Blockly.Generator.NAME_TYPE);
      Blockly.Python.logic_prime= functionName;
      var func = [];
      func.push('def ' + functionName + '(n):');
      func.push('  # http://en.wikipedia.org/wiki/Primality_test#Naive_methods');
      func.push('  # If n is not a number but a string, try parsing it.');
      func.push('  if type(n) not in (int, float, long):');
      func.push('    try:');
      func.push('      n = float(n)');
      func.push('    except:');
      func.push('      return False');
      func.push('  if n == 2 or n == 3:');
      func.push('    return True');
      func.push('  # False if n is negative, is 1, or not whole,' +
                ' or if n is divisible by 2 or 3.');
      func.push('  if n <= 1 or n % 1 != 0 or n % 2 == 0 or n % 3 == 0:');
      func.push('    return False');
      func.push('  # Check all the numbers of form 6k +/- 1, up to sqrt(n).');
      func.push('  for x in range(6, int(math.sqrt(n)) + 2, 6):');
      func.push('    if n % (x - 1) == 0 or n % (x + 1) == 0:');
      func.push('      return False');
      func.push('  return True');
      Blockly.Python.definitions_['isPrime'] = func.join('\n');
    }
    code = Blockly.Python.logic_prime + '(' + number_to_check + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
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
      var divisor = Blockly.Python.valueToCode(this, 'DIVISOR',
          Blockly.Python.ORDER_MULTIPLICATIVE);
      // If 'divisor' is some code that evals to 0, Python will raise an error.
      if (!divisor || divisor == '0') {
        return ['False', Blockly.Python.ORDER_ATOMIC];
      }
      code = number_to_check + ' % ' + divisor + ' == 0';
      break;
  }
  return [code, Blockly.Python.ORDER_RELATIONAL];
};

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
 * @fileoverview Generating Python for math blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

Blockly.Python = Blockly.Generator.get('Python');

// If any new block imports any library, add that library name here.
Blockly.Python.addReservedWords('math,random');

Blockly.Python.math_number = function() {
  // Numeric value.
  var code = window.parseFloat(this.getTitleValue('NUM'));
  var order = code < 0 ? Blockly.Python.ORDER_UNARY_SIGN :
              Blockly.Python.ORDER_ATOMIC;
  return [code, order];
};

Blockly.Python.math_arithmetic = function() {
  // Basic arithmetic operators, and power.
  var mode = this.getTitleValue('OP');
  var tuple = Blockly.Python.math_arithmetic.OPERATORS[mode];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.Python.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.Python.valueToCode(this, 'B', order) || '0';
  var code = argument0 + operator + argument1;
  return [code, order];
  // In case of 'DIVIDE', division between integers returns different results
  // in Python 2 and 3. However, is not an issue since Blockly does not
  // guarantee identical results in all languages.  To do otherwise would
  // require every operator to be wrapped in a function call.  This would kill
  // legibility of the generated code.  See:
  // http://code.google.com/p/blockly/wiki/Language
};

Blockly.Python.math_arithmetic.OPERATORS = {
  ADD: [' + ', Blockly.Python.ORDER_ADDITIVE],
  MINUS: [' - ', Blockly.Python.ORDER_ADDITIVE],
  MULTIPLY: [' * ', Blockly.Python.ORDER_MULTIPLICATIVE],
  DIVIDE: [' / ', Blockly.Python.ORDER_MULTIPLICATIVE],
  POWER: [' ** ', Blockly.Python.ORDER_EXPONENTIATION]
};

Blockly.Python.math_single = function() {
  // Math operators with single operand.
  var operator = this.getTitleValue('OP');
  var code;
  var arg;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedence.
    var code = Blockly.Python.valueToCode(this, 'NUM',
        Blockly.Python.ORDER_UNARY_SIGN) || '0';
    return ['-' + code, Blockly.Python.ORDER_UNARY_SIGN];
  }
  Blockly.Python.definitions_['import_math'] = 'import math';
  if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
    arg = Blockly.Python.valueToCode(this, 'NUM',
        Blockly.Python.ORDER_MULTIPLICATIVE) || '0';
  } else {
    arg = Blockly.Python.valueToCode(this, 'NUM',
        Blockly.Python.ORDER_NONE) || '0';
  }
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ABS':
      code = 'math.fabs(' + arg + ')';
      break;
    case 'ROOT':
      code = 'math.sqrt(' + arg + ')';
      break;
    case 'LN':
      code = 'math.log(' + arg + ')';
      break;
    case 'LOG10':
      code = 'math.log10(' + arg + ')';
      break;
    case 'EXP':
      code = 'math.exp(' + arg + ')';
      break;
    case 'POW10':
      code = 'math.pow(10,' + arg + ')';
      break;
    case 'ROUND':
      code = 'round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = 'math.ceil(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = 'math.floor(' + arg + ')';
      break;
    case 'SIN':
      code = 'math.sin(' + arg + ' / 180.0 * math.pi)';
      break;
    case 'COS':
      code = 'math.cos(' + arg + ' / 180.0 * math.pi)';
      break;
    case 'TAN':
      code = 'math.tan(' + arg + ' / 180.0 * math.pi)';
      break;
  }
  if (code) {
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  }
  // Second, handle cases which generate values that may need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ASIN':
      code = 'math.asin(' + arg + ') / math.pi * 180';
      break;
    case 'ACOS':
      code = 'math.acos(' + arg + ') / math.pi * 180';
      break;
    case 'ATAN':
      code = 'math.atan(' + arg + ') / math.pi * 180';
      break;
    default:
      throw 'Unknown math operator: ' + operator;
  }
  return [code, Blockly.Python.ORDER_MULTIPLICATIVE];
};

Blockly.Python.math_constant = function() {
  // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  var constant = this.getTitleValue('CONSTANT');
  if (constant != 'INFINITY') {
    Blockly.Python.definitions_['import_math'] = 'import math';
  }
  return Blockly.Python.math_constant.CONSTANTS[constant];
};

Blockly.Python.math_constant.CONSTANTS = {
  PI: ['math.pi', Blockly.Python.ORDER_MEMBER],
  E: ['math.e', Blockly.Python.ORDER_MEMBER],
  GOLDEN_RATIO: ['(1 + math.sqrt(5)) / 2', Blockly.Python.ORDER_MULTIPLICATIVE],
  SQRT2: ['math.sqrt(2)', Blockly.Python.ORDER_MEMBER],
  SQRT1_2: ['math.sqrt(1 / 2)', Blockly.Python.ORDER_MEMBER],
  INFINITY: ['float(\'inf\')', Blockly.Python.ORDER_ATOMIC]
};

Blockly.Python.math_number_property = function() {
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

Blockly.Python.math_change = function() {
  // Add to a variable in place.
  var argument0 = Blockly.Python.valueToCode(this, 'DELTA',
      Blockly.Python.ORDER_ADDITIVE) || '0';
  var varName = Blockly.Python.variableDB_.getName(this.getTitleValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return varName + ' = (' + varName + ' if type(' + varName +
      ') in (int, float, long) else 0) + ' + argument0 + '\n';
};

// Rounding functions have a single operand.
Blockly.Python.math_round = Blockly.Python.math_single;
// Trigonometry functions have a single operand.
Blockly.Python.math_trig = Blockly.Python.math_single;

Blockly.Python.math_on_list = function() {
  // Math functions for lists.
  var func = this.getTitleValue('OP');
  var list = Blockly.Python.valueToCode(this, 'LIST',
      Blockly.Python.ORDER_NONE) || '[]';
  var code;
  switch (func) {
    case 'SUM':
      code = 'sum(' + list + ')';
      break;
    case 'MIN':
      code = 'min(' + list + ')';
      break;
    case 'MAX':
      code = 'max(' + list + ')';
      break;
    case 'AVERAGE':
      if (!Blockly.Python.definitions_['math_mean']) {
        // This operation exclude null and values that are not int or float:
        //   math_mean([null,null,"aString",1,9]) == 5.0.
        var functionName = Blockly.Python.variableDB_.getDistinctName(
            'math_mean', Blockly.Generator.NAME_TYPE);
        Blockly.Python.math_on_list.math_mean = functionName;
        var func = [];
        func.push('def ' + functionName + '(myList):');
        func.push('  localList = [e for e in myList ' +
            'if type(e) in (int, float, long)]');
        func.push('  if not localList: return');
        func.push('  return float(sum(localList)) / len(localList)');
        Blockly.Python.definitions_['math_mean'] = func.join('\n');
      }
      code = Blockly.Python.math_on_list.math_mean + '(' + list + ')';
      break;
    case 'MEDIAN':
      if (!Blockly.Python.definitions_['math_median']) {
        // This operation exclude null values:
        //   math_median([null,null,1,3]) == 2.0.
        var functionName = Blockly.Python.variableDB_.getDistinctName(
            'math_median', Blockly.Generator.NAME_TYPE);
        Blockly.Python.math_on_list.math_median = functionName;
        var func = [];
        func.push('def ' + functionName + '(myList):');
        func.push('  localList = sorted([e for e in myList ' +
            'if type(e) in (int, float, long)])');
        func.push('  if not localList: return');
        func.push('  if len(localList) % 2 == 0:');
        func.push('    return (localList[len(localList) / 2 - 1] + ' +
            'localList[len(localList) / 2]) / 2.0');
        func.push('  else:');
        func.push('    return localList[(len(localList) - 1) / 2]');
        Blockly.Python.definitions_['math_median'] = func.join('\n');
      }
      code = Blockly.Python.math_on_list.math_median + '(' + list + ')';
      break;
    case 'MODE':
      if (!Blockly.Python.definitions_['math_modes']) {
        // As a list of numbers can contain more than one mode,
        // the returned result is provided as an array.
        // Mode of [3, 'x', 'x', 1, 1, 2, '3'] -> ['x', 1].
        var functionName = Blockly.Python.variableDB_.getDistinctName(
            'math_modes', Blockly.Generator.NAME_TYPE);
        Blockly.Python.math_on_list.math_modes = functionName;
        var func = [];
        func.push('def ' + functionName + '(some_list):');
        func.push('  modes = []');
        func.push('  # Using a lists of [item, count] to keep count rather ' +
                  'than dict');
        func.push('  # to avoid "unhashable" errors when the counted item is ' +
                  'itself a list or dict.');
        func.push('  counts = []');
        func.push('  maxCount = 1');
        func.push('  for item in some_list:');
        func.push('    found = False');
        func.push('    for count in counts:');
        func.push('      if count[0] == item:');
        func.push('        count[1] += 1');
        func.push('        maxCount = max(maxCount, count[1])');
        func.push('        found = True');
        func.push('    if not found:');
        func.push('      counts.append([item, 1])');
        func.push('  for counted_item, item_count in counts:');
        func.push('    if item_count == maxCount:');
        func.push('      modes.append(counted_item)');
        func.push('  return modes');
        Blockly.Python.definitions_['math_modes'] = func.join('\n');
      }
      code = Blockly.Python.math_on_list.math_modes + '(' + list + ')';
      break;
    case 'STD_DEV':
      if (!Blockly.Python.definitions_['math_standard_deviation']) {
        Blockly.Python.definitions_['import_math'] = 'import math';
        var functionName = Blockly.Python.variableDB_.getDistinctName(
            'math_standard_deviation', Blockly.Generator.NAME_TYPE);
        Blockly.Python.math_on_list.math_standard_deviation = functionName;
        var func = [];
        func.push('def ' + functionName + '(numbers):');
        func.push('  n = len(numbers)');
        func.push('  if n == 0: return');
        func.push('  mean = float(sum(numbers)) / n');
        func.push('  variance = sum((x - mean) ** 2 for x in numbers) / n');
        func.push('  return math.sqrt(variance)');
        Blockly.Python.definitions_['math_standard_deviation'] =
            func.join('\n');
      }
      code = Blockly.Python.math_on_list.math_standard_deviation +
          '(' + list + ')';
      break;
    case 'RANDOM':
      Blockly.Python.definitions_['import_random'] = 'import random';
      code = 'random.choice(' + list + ')';
      break;
    default:
      throw 'Unknown operator: ' + func;
  }
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.math_modulo = function() {
  // Remainder computation.
  var argument0 = Blockly.Python.valueToCode(this, 'DIVIDEND',
      Blockly.Python.ORDER_MULTIPLICATIVE) || '0';
  var argument1 = Blockly.Python.valueToCode(this, 'DIVISOR',
      Blockly.Python.ORDER_MULTIPLICATIVE) || '0';
  var code = argument0 + ' % ' + argument1;
  return [code, Blockly.Python.ORDER_MULTIPLICATIVE];
};

Blockly.Python.math_constrain = function() {
  // Constrain a number between two limits.
  var argument0 = Blockly.Python.valueToCode(this, 'VALUE',
      Blockly.Python.ORDER_NONE) || '0';
  var argument1 = Blockly.Python.valueToCode(this, 'LOW',
      Blockly.Python.ORDER_NONE) || '0';
  var argument2 = Blockly.Python.valueToCode(this, 'HIGH',
      Blockly.Python.ORDER_NONE) || 'float(\'inf\')';
  var code = 'min(max(' + argument0 + ', ' + argument1 + '), ' +
      argument2 + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.math_random_int = function() {
  // Random integer between [X] and [Y].
  Blockly.Python.definitions_['import_random'] = 'import random';
  var argument0 = Blockly.Python.valueToCode(this, 'FROM',
      Blockly.Python.ORDER_NONE) || '0';
  var argument1 = Blockly.Python.valueToCode(this, 'TO',
      Blockly.Python.ORDER_NONE) || '0';
  var code = 'random.randint(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.math_random_float = function() {
  // Random fraction between 0 and 1.
  Blockly.Python.definitions_['import_random'] = 'import random';
  return ['random.random()', Blockly.Python.ORDER_FUNCTION_CALL];
};

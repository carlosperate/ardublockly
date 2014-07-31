/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
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
 * @fileoverview Generating Arduino for text blocks.
 * Implements the Serial interface in Arduino: http://arduino.cc/en/Reference/Serial
 */
'use strict';

goog.provide('Blockly.Arduino.text');

goog.require('Blockly.Arduino');


Blockly.Arduino['text'] = function(block) {
  // Text value.
  var code = Blockly.Arduino.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['text_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code;
  if (block.itemCount_ == 0) {
    return ['\'\'', Blockly.Arduino.ORDER_ATOMIC];
  } else if (block.itemCount_ == 1) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'ADD0',
        Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
    code = 'String(' + argument0 + ')';
    return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
  } else {
    code = [];
    code[0] = (Blockly.Arduino.valueToCode(block, 'ADD0',
        Blockly.Arduino.ORDER_NONE) || '\'\'');
    for (var n = 1; n < block.itemCount_; n++) {
      code[n] = '+' + (Blockly.Arduino.valueToCode(block, 'ADD' + n,
          Blockly.Arduino.ORDER_NONE) || '\'\'');
    }
    code = code.join('');
    return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
  }
};

Blockly.Arduino['text_append'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Arduino.valueToCode(block, 'TEXT',
      Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
  return varName + ' += ' + argument0 + ';\n';
};

Blockly.Arduino['text_length'] = function(block) {
  // String length.
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
  return ['((String)' + argument0 + ').length()', Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino['text_isEmpty'] = function(block) {
  // TODO: Is the string null?
  var func = [];
   func.push('boolean isStringEmpty(String msg) {');
   func.push('  if(msg.length()==0) {');
   func.push('    return true;');
   func.push('  } else {');
   func.push('    return false;');
   func.push('  }');
   func.push('}\n\n');
   Blockly.Arduino.definitions_['is_string_empty'] = func.join('\n');
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
  return ['isStringEmpty(' + argument0 + ')', Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino['text_endString'] = function(block) {
  // Return a leading or trailing substring.
  var first = block.getFieldValue('END') == 'FIRST';
  var code;
  if (first) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'NUM',
        Blockly.Arduino.ORDER_NONE) || '1';
    var argument1 = Blockly.Arduino.valueToCode(block, 'TEXT',
        Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
    code = argument1 + '.substring(0, ' + argument0 + ')';
  } else {
    if (!Blockly.Arduino.definitions_['text_tailString']) {
      var functionName = Blockly.Arduino.variableDB_.getDistinctName(
          'text_tailString', Blockly.Generator.NAME_TYPE);
      Blockly.Arduino.text_endString.text_tailString = functionName;
      var func = [];
      func.push('String ' + functionName + '(n, myString) {');
      func.push('  // Return a trailing substring of n characters.');
      func.push('  return myString.substring(myString.length - n);');
      func.push('}');
      Blockly.Arduino.definitions_['text_tailString'] = func.join('\n');
    }
    var argument0 = Blockly.Arduino.valueToCode(block, 'NUM',
        Blockly.Arduino.ORDER_NONE) || '1';
    var argument1 = Blockly.Arduino.valueToCode(block, 'TEXT',
        Blockly.Arduino.ORDER_NONE) || '\'\'';
    code = Blockly.Arduino.text_endString.text_tailString +
        '(' + argument0 + ', ' + argument1 + ')';
  }
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino['text_indexOf'] = function(block) {
  // Search the text for a substring.
  var operator = block.getFieldValue('END') == 'FIRST' ?
      'indexOf' : 'lastIndexOf';
  var argument0 = Blockly.Arduino.valueToCode(block, 'FIND',
      Blockly.Arduino.ORDER_NONE) || '\'\'';
  var argument1 = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
  var code = argument1 + '.' + operator + '(' + argument0 + ') + 1';
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino['text_charAt'] = function(block) {
  // Get letter at index.
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var at = Blockly.Arduino.valueToCode(block, 'AT',
      Blockly.Arduino.ORDER_NONE) || '1';
  var text = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
  switch (where) {
    case 'FIRST':
      var code = text + '.charAt(0)';
      return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
    case 'LAST':
      var code = text + '.slice(-1)';
      return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
    case 'FROM_START':
      // Blockly uses one-based indicies.
      if (at.match(/^-?\d+$/)) {
        // If the index is a naked number, decrement it right now.
        at = parseInt(at, 10) - 1;
      } else {
        // If the index is dynamic, decrement it in code.
        at += ' - 1';
      }
      var code = text + '[' + at + ']';
      return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
    case 'FROM_END':
      var code = text + '.slice(-' + at + ').charAt(0)';
      return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
    case 'RANDOM':
      var functionName = Blockly.Arduino.provideFunction_(
          'text_random_letter',
          [ 'function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
              '(text) {',
            '  var x = Math.floor(Math.random() * text.length);',
            '  return text[x];',
            '}']);
      code = functionName + '(' + text + ')';
      return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
  }
  throw 'Unhandled option (text_charAt).';
};

Blockly.Arduino['text_getSubstring'] = function(block) {
  // Get substring.
  var text = Blockly.Arduino.valueToCode(block, 'STRING',
      Blockly.Arduino.ORDER_MEMBER) || '\'\'';
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  var at1 = Blockly.Arduino.valueToCode(block, 'AT1',
      Blockly.Arduino.ORDER_NONE) || '1';
  var at2 = Blockly.Arduino.valueToCode(block, 'AT2',
      Blockly.Arduino.ORDER_NONE) || '1';
  if (where1 == 'FIRST' && where2 == 'LAST') {
    var code = text;
  } else {
    var functionName = Blockly.Arduino.provideFunction_(
        'text_get_substring',
        [ 'function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
            '(text, where1, at1, where2, at2) {',
          '  function getAt(where, at) {',
          '    if (where == \'FROM_START\') {',
          '      at--;',
          '    } else if (where == \'FROM_END\') {',
          '      at = text.length - at;',
          '    } else if (where == \'FIRST\') {',
          '      at = 0;',
          '    } else if (where == \'LAST\') {',
          '      at = text.length - 1;',
          '    } else {',
          '      throw \'Unhandled option (text_getSubstring).\';',
          '    }',
          '    return at;',
          '  }',
          '  at1 = getAt(where1, at1);',
          '  at2 = getAt(where2, at2) + 1;',
          '  return text.slice(at1, at2);',
          '}']);
    var code = functionName + '(' + text + ', \'' +
        where1 + '\', ' + at1 + ', \'' + where2 + '\', ' + at2 + ')';
  }
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['text_changeCase'] = function(block) {
  // Change capitalization.
  var mode = block.getFieldValue('CASE');
  Blockly.Arduino.text_changeCase.OPERATORS = {
    UPPERCASE: '.toUpperCase()',
    LOWERCASE: '.toLowerCase()',
    TITLECASE: null
  };
  var operator = Blockly.Arduino.text_changeCase.OPERATORS[mode];
  var code;
  if (operator) {
    // Upper and lower case are functions built into Arduino.
    var argument0 = Blockly.Arduino.valueToCode(this, 'TEXT',
        Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
    code = argument0 + operator;
  } else {
    if (!Blockly.Arduino.definitions_['toTitleCase']) {
      // Title case is not a native Dart function.  Define one.
      var functionName = Blockly.Arduino.variableDB_.getDistinctName(
          'text_toTitleCase', Blockly.Generator.NAME_TYPE);
      Blockly.Arduino.text_changeCase.toTitleCase = functionName;
      var func = [];
      func.push('String ' + functionName + '(str) {');
      func.push('  RegExp exp = const RegExp(r\'\\b\');');
      func.push('  List<String> list = str.split(exp);');
      func.push('  String title = \'\';');
      func.push('  for (String part in list) {');
      func.push('    if (part.length > 0) {');
      func.push('      title.add(part[0].toUpperCase());');
      func.push('      if (part.length > 0) {');
      func.push('        title.add(part.substring(1).toLowerCase());');
      func.push('      }');
      func.push('    }');
      func.push('  }');
      func.push('  return title.toString();');
      func.push('}');
      Blockly.Arduino.definitions_['toTitleCase'] = func.join('\n');
    }
    var argument0 = Blockly.Arduino.valueToCode(block, 'TEXT',
        Blockly.Arduino.ORDER_NONE) || '\'\'';
    code = Blockly.Arduino.text_changeCase.toTitleCase + '(' + argument0 + ')';
  }
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino['text_trim'] = function(block) {
  // Trim spaces.
  Blockly.Arduino.text_trim.OPERATORS = {
    LEFT: '.replaceFirst(new RegExp(r\'^\\s+\'), \'\')',
    RIGHT: '.replaceFirst(new RegExp(r\'\\s+$\'), \'\')',
    BOTH: '.trim()'
  };
  var mode = block.getFieldValue('MODE');
  var operator = Blockly.Arduino.text_trim.OPERATORS[mode];
  var argument0 = Blockly.Arduino.valueToCode(this, 'TEXT',
      Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
  return [argument0 + operator, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino['text_print'] = function(block) {
  // Print statement.
  Blockly.Arduino.setups_['serial_begin'] = 'Serial.begin(9600);';
  var argument0 = Blockly.Arduino.valueToCode(block, 'TEXT',
      Blockly.Arduino.ORDER_NONE) || '\'\'';
  return 'Serial.print(' + argument0 + ');\n';
};

Blockly.Arduino['text_prompt'] = function(block) {
  // Prompt function.
  Blockly.Arduino.setups_['serial_begin'] = 'Serial.begin(9600);';
  var msg = Blockly.Arduino.quote_(block.getFieldValue('TEXT'));
  var code = 'Serial.print(' + msg + ');\n';
  var toNumber = block.getFieldValue('TYPE') == 'NUMBER';
  if (toNumber) {
    code = 'parseFloat(' + code + ')';
  }
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino['text_prompt_ext'] = function(block) {
  // Prompt function (external message).
  var func = [];
   func.push('String getUserInputPrompt(String msg) {');
   func.push('  Serial.print(msg);\n');
   func.push('  String content = "";');
   func.push('   while(Serial.available()) {');
   func.push('     content.concat(Serial.read());');
   func.push('   }');
   func.push('  return content;');
   func.push('}\n\n');

  Blockly.Arduino.definitions_['define_string_return'] = func.join('\n');
  Blockly.Arduino.setups_['serial_begin'] = 'Serial.begin(9600);';
  
  var msg = Blockly.Arduino.valueToCode(block, 'TEXT',
      Blockly.Arduino.ORDER_NONE) || '\'\'';
  var code = 'getUserInputPrompt(' + msg + ')';
  var toNumber = block.getFieldValue('TYPE') == 'NUMBER';
  if (toNumber) {
    code = 'parseFloat(' + code + ')';
  }
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/google-blockly/
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
 * @fileoverview Generating JavaScript for math blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.JavaScript.math_number = function() {
  // Numeric value.
  return window.parseFloat(this.getTitleText(0));
};

Blockly.JavaScript.math_arithmetic = function(opt_dropParens) {
  // Basic arithmetic operator.
  var argument0 = Blockly.JavaScript.valueToCode_(this, 0) || '0';
  var argument1 = Blockly.JavaScript.valueToCode_(this, 1) || '0';
  var operator = Blockly.JavaScript.math_arithmetic.MAP_[this.getValueLabel(1)];
  var code = argument0 + ' ' + operator + ' ' + argument1;
  if (!opt_dropParens) {
    code = '(' + code + ')';
  }
  return code;
};

Blockly.JavaScript.math_arithmetic.MAP_ = {
  '+': '+',
  '-': '-',
  '\u00D7': '*',
  '\u00F7': '/'
};

Blockly.JavaScript.math_change = function() {
  // Add to a variable in place.
  var argument0 = Blockly.JavaScript.valueToCode_(this, 0, true) || '0';
  var varName = Blockly.JavaScript.variableDB_.getVariable(this.getTitleText(1));
  return varName + ' += ' + argument0 + ';\n';
};

Blockly.JavaScript.math_negate = function() {
  // Negation operator.
  var argument0 = Blockly.JavaScript.valueToCode_(this, 0) || '0';
  return '- ' + argument0;
};

Blockly.JavaScript.math_abs = function() {
  // Absolute value operator.
  var argument0 = Blockly.JavaScript.valueToCode_(this, 0, true) || '0';
  return 'Math.abs(' + argument0 + ')';
};

Blockly.JavaScript.math_root = function() {
  // Root operator.
  var argument0 = Blockly.JavaScript.valueToCode_(this, 0, true) || '0';
  return 'Math.sqrt(' + argument0 + ')';
};

Blockly.JavaScript.math_modulo = function() {
  // Remainder computation.
  var argument0 = Blockly.JavaScript.valueToCode_(this, 0) || '0';
  var argument1 = Blockly.JavaScript.valueToCode_(this, 1) || '0';
  return argument0 + ' % ' + argument1;
};

Blockly.JavaScript.math_round = function() {
  // Rounding functions.
  var argument0 = Blockly.JavaScript.valueToCode_(this, 0, true) || '0';
  var operator = Blockly.JavaScript.math_round.MAP_[this.getValueLabel(0)];
  return operator + '(' + argument0 + ')';
};

Blockly.JavaScript.math_round.MAP_ = {};
Blockly.JavaScript.math_round.MAP_[Blockly.Language.math_round.MSG_ROUND] = 'Math.round';
Blockly.JavaScript.math_round.MAP_[Blockly.Language.math_round.MSG_ROUNDUP] = 'Math.ceil';
Blockly.JavaScript.math_round.MAP_[Blockly.Language.math_round.MSG_ROUNDDOWN] = 'Math.floor';

Blockly.JavaScript.math_random_float = function() {
  return 'Math.random()';
};

Blockly.JavaScript.math_random_int = function() {
  var argument0 = Blockly.JavaScript.valueToCode_(this, 0) || '0';
  var argument1 = Blockly.JavaScript.valueToCode_(this, 1) || '0';
  var rand1 = 'Math.floor(Math.random() * (' + argument1 + ' - ' + argument0 + ' + 1' + ') + ' + argument0 + ')';
  var rand2 = 'Math.floor(Math.random() * (' + argument0 + ' - ' + argument1 + ' + 1' + ') + ' + argument1 + ')';
  var code;
  if (argument0.match(/^[\d\.]+$/) && argument1.match(/^[\d\.]+$/)) {
    if (parseFloat(argument0) < parseFloat(argument1)) {
      code = rand1;
    } else {
      code = rand2;
    }
  } else {
    code = argument0 + ' < ' + argument1 + ' ? ' + rand1 + ' : ' + rand2;
  }
  return code;
};

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
 * @fileoverview Generating Dart for math blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

Blockly.Dart = Blockly.Generator.get('Dart');

Blockly.Dart.number = function() {
  // Numeric value.
  return Blockly.Dart.scrub_(this,
      window.parseFloat(this.getTitleText(0)));
};

Blockly.Dart.arithmetic = function(opt_dropParens) {
  // Basic arithmetic operator.
  var argument0 = Blockly.Dart.valueToCode_(this, 0) || '0';
  var argument1 = Blockly.Dart.valueToCode_(this, 1) || '0';
  var operator = Blockly.Dart.arithmetic.MAP[this.getValueLabel(1)];
  var code = argument0 + ' ' + operator + ' ' + argument1;
  if (!opt_dropParens) {
    code = '(' + code + ')';
  }
  return Blockly.Dart.scrub_(this, code);
};

Blockly.Dart.arithmetic.MAP = {
  '+': '+',
  '-': '-',
  '\u00D7': '*',
  '\u00F7': '/'
};

Blockly.Dart.root = function() {
  // Root operator.
  var argument0 = Blockly.Dart.valueToCode_(this, 0, true) || '0';
  var code = 'Math.sqrt(' + argument0 + ')';
  return Blockly.Dart.scrub_(this, code);
};


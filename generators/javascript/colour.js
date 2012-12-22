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
 * @fileoverview Generating JavaScript for colour blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.JavaScript.colour_picker = function() {
  // Colour picker.
  var code = this.getTitleValue('COLOUR');
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.colour_rgb = function() {
  // Compose a colour from RGB components.
  var red = Blockly.JavaScript.valueToCode(this, 'RED',
      Blockly.JavaScript.ORDER_COMMA) || 0;
  var green = Blockly.JavaScript.valueToCode(this, 'GREEN',
      Blockly.JavaScript.ORDER_COMMA) || 0;
  var blue = Blockly.JavaScript.valueToCode(this, 'BLUE',
      Blockly.JavaScript.ORDER_COMMA) || 0;

  if (!Blockly.JavaScript.definitions_['colour_rgb']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
        'colour_rgb', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.colour_rgb.functionName = functionName;
    var func = [];
    func.push('function ' + functionName + '(r, g, b) {');
    func.push('  r = Math.round(Math.max(Math.min(Number(r), 1), 0) * 255);');
    func.push('  g = Math.round(Math.max(Math.min(Number(g), 1), 0) * 255);');
    func.push('  b = Math.round(Math.max(Math.min(Number(b), 1), 0) * 255);');
    func.push('  r = (\'0\' + (r || 0).toString(16)).slice(-2);');
    func.push('  g = (\'0\' + (g || 0).toString(16)).slice(-2);');
    func.push('  b = (\'0\' + (b || 0).toString(16)).slice(-2);');
    func.push('  return \'#\' + r + g + b;');
    func.push('}');
    Blockly.JavaScript.definitions_['colour_rgb'] = func.join('\n');
  }
  var code = Blockly.JavaScript.colour_rgb.functionName +
      '(' + red + ', ' + green + ', ' + blue + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.colour_blend = function() {
  // Blend two colours together.
  var c1 = Blockly.JavaScript.valueToCode(this, 'COLOUR1',
      Blockly.JavaScript.ORDER_COMMA) || '\'#000000\'';
  var c2 = Blockly.JavaScript.valueToCode(this, 'COLOUR2',
      Blockly.JavaScript.ORDER_COMMA) || '\'#000000\'';
  var ratio = Blockly.JavaScript.valueToCode(this, 'RATIO',
      Blockly.JavaScript.ORDER_COMMA) || 0.5;
  
  var code = Blockly.JavaScript.colour_blend.functionName +
      '(' + c1 + ', ' + c2 + ', ' + ratio + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

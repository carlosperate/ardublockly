/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Generating Arduino code for colour blocks.
 *               Based on the javascript generator
 *
 * TODO: These blocks do not really serve a purpose for Arduino code.
 */

'use strict';

goog.provide('Blockly.Arduino.colour');

goog.require('Blockly.Arduino');

Blockly.Arduino.colour_picker = function() {
  // Colour picker.
  var code = '\'' + block.getFieldValue('COLOUR') + '\'';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['colour_random'] = function(block) {
  // Generate a random colour.
  var functionName = Blockly.Arduino.provideFunction_(
      'colour_random',
      [ 'function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ + '() {',
        '  var num = Math.floor(Math.random() * Math.pow(2, 24));',
        '  return \'#\' + (\'00000\' + num.toString(16)).substr(-6);',
        '}']);
  var code = functionName + '()';
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['colour_rgb'] = function(block) {
  // Compose a colour from RGB components.
  var red = Blockly.Arduino.valueToCode(block, 'RED',
      Blockly.Arduino.ORDER_NONE) || 0;
  var green = Blockly.Arduino.valueToCode(block, 'GREEN',
      Blockly.Arduino.ORDER_NONE) || 0;
  var blue = Blockly.Arduino.valueToCode(block, 'BLUE',
      Blockly.Arduino.ORDER_NONE) || 0;

  if (!Blockly.Arduino.definitions_['colour_rgb']) {
    Blockly.Arduino.definitions_['import_arduino_math'] =
        'import \'arduino:math\' as Math;';
    var functionName = Blockly.Arduino.variableDB_.getDistinctName(
        'colour_rgb', Blockly.Generator.NAME_TYPE);
    Blockly.Arduino.colour_rgb.functionName = functionName;
    var func = [];
    func.push('String ' + functionName + '(r, g, b) {');
    func.push('  String rs = (Math.max(Math.min(r, 1), 0) * 255).round()' +
              '.toRadixString(16);');
    func.push('  String gs = (Math.max(Math.min(g, 1), 0) * 255).round()' +
              '.toRadixString(16);');
    func.push('  String bs = (Math.max(Math.min(b, 1), 0) * 255).round()' +
              '.toRadixString(16);');
    func.push('  rs = \'0$rs\';');
    func.push('  rs = rs.substring(rs.length - 2);');
    func.push('  gs = \'0$gs\';');
    func.push('  gs = gs.substring(gs.length - 2);');
    func.push('  bs = \'0$bs\';');
    func.push('  bs = bs.substring(bs.length - 2);');
    func.push('  return \'#$rs$gs$bs\';');
    func.push('}');
    Blockly.Arduino.definitions_['colour_rgb'] = func.join('\n');
  }
  var code = Blockly.Arduino.colour_rgb.functionName +
      '(' + red + ', ' + green + ', ' + blue + ')';
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino['colour_blend'] = function(block) {
  // Blend two colours together.
  var c1 = Blockly.Arduino.valueToCode(block, 'COLOUR1',
      Blockly.Arduino.ORDER_NONE) || '\'#000000\'';
  var c2 = Blockly.Arduino.valueToCode(block, 'COLOUR2',
      Blockly.Arduino.ORDER_NONE) || '\'#000000\'';
  var ratio = Blockly.Arduino.valueToCode(block, 'RATIO',
      Blockly.Arduino.ORDER_NONE) || 0.5;

  if (!Blockly.Arduino.definitions_['colour_blend']) {
    Blockly.Arduino.definitions_['import_arduino_math'] =
        'import \'arduino:math\' as Math;';
    var functionName = Blockly.Arduino.variableDB_.getDistinctName(
        'colour_blend', Blockly.Generator.NAME_TYPE);
    Blockly.Arduino.colour_blend.functionName = functionName;
    var func = [];
    func.push('String ' + functionName + '(c1, c2, ratio) {');
    func.push('  ratio = Math.max(Math.min(ratio, 1), 0);');
    func.push('  int r1 = parseInt(\'0x${c1.substring(1, 3)}\');');
    func.push('  int g1 = parseInt(\'0x${c1.substring(3, 5)}\');');
    func.push('  int b1 = parseInt(\'0x${c1.substring(5, 7)}\');');
    func.push('  int r2 = parseInt(\'0x${c2.substring(1, 3)}\');');
    func.push('  int g2 = parseInt(\'0x${c2.substring(3, 5)}\');');
    func.push('  int b2 = parseInt(\'0x${c2.substring(5, 7)}\');');
    func.push('  String rs = (r1 * (1 - ratio) + r2 * ratio).round()' +
              '.toRadixString(16);');
    func.push('  String gs = (g1 * (1 - ratio) + g2 * ratio).round()' +
              '.toRadixString(16);');
    func.push('  String bs = (b1 * (1 - ratio) + b2 * ratio).round()' +
              '.toRadixString(16);');
    func.push('  rs = \'0$rs\';');
    func.push('  rs = rs.substring(rs.length - 2);');
    func.push('  gs = \'0$gs\';');
    func.push('  gs = gs.substring(gs.length - 2);');
    func.push('  bs = \'0$bs\';');
    func.push('  bs = bs.substring(bs.length - 2);');
    func.push('  return \'#$rs$gs$bs\';');
    func.push('}');
    Blockly.Arduino.definitions_['colour_blend'] = func.join('\n');
  }
  var code = Blockly.Arduino.colour_blend.functionName +
      '(' + c1 + ', ' + c2 + ', ' + ratio + ')';
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

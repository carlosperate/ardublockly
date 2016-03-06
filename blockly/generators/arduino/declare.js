/**
 * Visual Blocks Language
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
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
 * @fileoverview Helper functions for generating Arduino blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

goog.provide('Blockly.Arduino.declare');

goog.require('Blockly.Arduino');

Blockly.Arduino['declare_var_int'] = function(block) {
  var value_name = block.getFieldValue('NAME');
  var value_num = Blockly.Arduino.valueToCode(block, "NUM", Blockly.Arduino.ORDER_ATOMIC) || '0';
  
  Blockly.Arduino.addDeclaration('varint_' + value_name,  'int ' + value_name + ' = ' + value_num + ';');
  var code = ''
  return code;
};

Blockly.Arduino['declare_var_uint'] = function(block) {
  var value_name = block.getFieldValue('NAME');
  var value_num = Blockly.Arduino.valueToCode(block, "NUM", Blockly.Arduino.ORDER_ATOMIC) || '0';
  
  Blockly.Arduino.addDeclaration('varuint_' + value_name,  'unsigned int ' + value_name + ' = ' + value_num + ';');
  var code = ''
  return code;
};

Blockly.Arduino['declare_var_long'] = function(block) {
  var value_name = block.getFieldValue('NAME');
  var value_num = Blockly.Arduino.valueToCode(block, "NUM", Blockly.Arduino.ORDER_ATOMIC) || '0';
  
  Blockly.Arduino.addDeclaration('varlong_' + value_name,  'long ' + value_name + ' = ' + value_num + 'L;');
  var code = ''
  return code;
};

Blockly.Arduino['declare_var_ulong'] = function(block) {
  var value_name = block.getFieldValue('NAME');
  var value_num = Blockly.Arduino.valueToCode(block, "NUM", Blockly.Arduino.ORDER_ATOMIC) || '0';
  
  Blockly.Arduino.addDeclaration('varulong_' + value_name,  'unsigned long ' + value_name + ' = ' + value_num + 'UL;');
  var code = ''
  return code;
};

Blockly.Arduino['declare_var_float'] = function(block) {
  var value_name = block.getFieldValue('NAME');
  var value_num = Blockly.Arduino.valueToCode(block, "NUM", Blockly.Arduino.ORDER_ATOMIC) || '0';
  
  Blockly.Arduino.addDeclaration('varfloat_' + value_name,  'float ' + value_name + ' = ' + value_num + ';');
  var code = ''
  return code;
};

Blockly.Arduino['declare_var_bool'] = function(block) {
  var value_name = block.getFieldValue('NAME');
  var value_num = Blockly.Arduino.valueToCode(block, "NUM", Blockly.Arduino.ORDER_ATOMIC) || 'false';
  
  Blockly.Arduino.addDeclaration('varbool_' + value_name,  'boolean ' + value_name + ' = ' + value_num + ';');
  var code = ''
  return code;
};

Blockly.Arduino['declare_var_digin'] = function(block) {
  var value_name = block.getFieldValue('NAME');
  
  var pin = block.getFieldValue('PIN');
  
  Blockly.Arduino.addDeclaration('varint_' + value_name,  'int ' + value_name + ' = ' + pin + ';');
  
  Blockly.Arduino.reservePin(
      block, value_name, Blockly.Arduino.PinTypes.INPUT, 'Digital Read');
  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.INPUT, 'Digital Read');

  var pinSetupCode = 'pinMode(' + value_name + ', INPUT);';
  Blockly.Arduino.addSetup('io_' + value_name, pinSetupCode, false);
  
  var code = ''
  return code;
};

Blockly.Arduino['declare_var_digout'] = function(block) {
  var value_name = block.getFieldValue('NAME');
  
  var pin = block.getFieldValue('PIN');
  
  Blockly.Arduino.addDeclaration('varint_' + value_name,  'int ' + value_name + ' = ' + pin + ';');
  
  Blockly.Arduino.reservePin(
      block, value_name, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');
  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');

  var pinSetupCode = 'pinMode(' + value_name + ', OUTPUT);';
  Blockly.Arduino.addSetup('io_' + value_name, pinSetupCode, false);
  
  var code = ''
  return code;
};

Blockly.Arduino['declare_var_anain'] = function(block) {
  var value_name = block.getFieldValue('NAME');
  
  var pin = block.getFieldValue('PIN');
  
  Blockly.Arduino.addDeclaration('varint_' + value_name,  'int ' + value_name + ' = ' + pin + ';');
  
  Blockly.Arduino.reservePin(
      block, value_name, Blockly.Arduino.PinTypes.INPUT, 'Analogue Read');
  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.INPUT, 'Analogue Read');

  var pinSetupCode = 'pinMode(' + value_name + ', INPUT);';
  Blockly.Arduino.addSetup('io_' + value_name, pinSetupCode, false);
  
  var code = ''
  return code;
};

Blockly.Arduino['declare_var_anaout'] = function(block) {
  var value_name = block.getFieldValue('NAME');
  
  var pin = block.getFieldValue('PIN');
  
  Blockly.Arduino.addDeclaration('varint_' + value_name,  'int ' + value_name + ' = ' + pin + ';');
  
  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Analogue Write');
  Blockly.Arduino.reservePin(
      block, value_name, Blockly.Arduino.PinTypes.OUTPUT, 'Analogue Write');

  var pinSetupCode = 'pinMode(' + value_name + ', OUTPUT);';
  Blockly.Arduino.addSetup('io_' + value_name, pinSetupCode, false);
  
  var code = ''
  return code;
};

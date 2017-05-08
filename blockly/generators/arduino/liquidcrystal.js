'use strict';

goog.provide('Blockly.Arduino.LiquidCrystal');

goog.require('Blockly.Arduino');

Blockly.Arduino['liquidcrystal_config'] = function(block) {

  var pinType = Blockly.Arduino.PinTypes.LCD;

  var rs = block.getFieldValue('LCD_RS');
  var en = block.getFieldValue('LCD_EN');
  var d4 = block.getFieldValue('LCD_D4');
  var d5 = block.getFieldValue('LCD_D5');
  var d6 = block.getFieldValue('LCD_D6');
  var d7 = block.getFieldValue('LCD_D7');

  var lcdName = block.getFieldValue("liquidcrystal_name");

  var lcdRows = Blockly.Arduino.valueToCode(block, 'LCD_ROW',
      Blockly.Arduino.ORDER_ATOMIC) || '2';
  var lcdColumns = Blockly.Arduino.valueToCode(block, 'LCD_COLUMN',
      Blockly.Arduino.ORDER_ATOMIC) || '16';

  Blockly.Arduino.reservePin(block, rs, pinType, 'LCD');
  Blockly.Arduino.reservePin(block, en, pinType, 'LCD');
  Blockly.Arduino.reservePin(block, d4, pinType, 'LCD');
  Blockly.Arduino.reservePin(block, d5, pinType, 'LCD');
  Blockly.Arduino.reservePin(block, d6, pinType, 'LCD');
  Blockly.Arduino.reservePin(block, d7, pinType, 'LCD');

  Blockly.Arduino.addInclude('lcd', '#include <LiquidCrystal.h>');

  var globalCode = 'LiquidCrystal ' + lcdName + '(' + rs + ', ' + en + ', ' + d4 + ', '  + d5 + ', ' + d6 + ', '  + d7 + ');';
  Blockly.Arduino.addDeclaration(lcdName, globalCode);

  var setupCode = lcdName + '.begin(' + lcdColumns + ',' + lcdRows + ');';
  Blockly.Arduino.addSetup(lcdName, setupCode, true);

  return '';
}

Blockly.Arduino['liquidcrystal_variable'] = function(block) {
  var code = block.getFieldValue("liquidcrystal_name");
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino['liquidcrystal_clear'] = function(block) {
  var lcdName = Blockly.Arduino.valueToCode(
      block, 'LCD_NAME', Blockly.Arduino.ORDER_ATOMIC) || Blockly.Msg.ARD_LIQUIDCRYSTAL_DEFAULT_NAME;
  var code = lcdName+'.clear();\n';
  return code;
}

Blockly.Arduino['liquidcrystal_print'] = function(block) {
  var lcdName = Blockly.Arduino.valueToCode(
      block, 'LCD_NAME', Blockly.Arduino.ORDER_ATOMIC) || Blockly.Msg.ARD_LIQUIDCRYSTAL_DEFAULT_NAME;
  var content = Blockly.Arduino.valueToCode(
      block, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var checkbox_name = (block.getFieldValue('NEW_LINE') == 'TRUE');

  if (checkbox_name) {
    var code = lcdName + '.println(' + content + ');\n';
  } else {
    var code = lcdName + '.print(' + content + ');\n';
  }
  return code;
};

Blockly.Arduino['liquidcrystal_set_cursor'] = function(block) {

  var pinType = Blockly.Arduino.PinTypes.LCD;

  var lcdName = Blockly.Arduino.valueToCode(
      block, 'LCD_NAME', Blockly.Arduino.ORDER_ATOMIC) || Blockly.Msg.ARD_LIQUIDCRYSTAL_DEFAULT_NAME;

  var lcdRows = Blockly.Arduino.valueToCode(block, 'LCD_ROW',
      Blockly.Arduino.ORDER_ATOMIC) || '0';
  var lcdColumns = Blockly.Arduino.valueToCode(block, 'LCD_COLUMN',
      Blockly.Arduino.ORDER_ATOMIC) || '0';

  var code = lcdName + '.setCursor(' + lcdColumns + ',' + lcdRows + ');\n';

  return code;
}
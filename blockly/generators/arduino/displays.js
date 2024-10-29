/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Arduino code for the Sensor blocks.
 *
 * 
 *      
 */
'use strict';

goog.provide('Blockly.Arduino.displays');

goog.require('Blockly.Arduino');

/**
 * Code generator to setup MAX7219 8x8 LED Matrix on DIN X, CS Y, CLK Z.
 * Arduino code: #include <LedControl.h>
 *               LedControl max7219_X=LedControl(X,Y,Z,1);
 *               setup  { max7219_X.shutdown(0, false);
 *                        max7219_X.setIntensity(0, 8);
 *                        max7219.clearDisplay(0);}
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['max7219_setup'] = function(block) {
  var din = block.getFieldValue('DIN');
  var cs = block.getFieldValue('CS');
  var clk = block.getFieldValue('CLK');
  var lcName = 'max7219_' + din;
  Blockly.Arduino.addInclude('max7219', '#include <LedControl.h>');
  Blockly.Arduino.addDeclaration('max7219_', 'LedControl '+lcName+'=LedControl('+din+','+clk+','+cs+',1);');
  Blockly.Arduino.addSetup('max7219_sd', lcName+'.shutdown(0,false);');
  Blockly.Arduino.addSetup('max7219_br', lcName+'.setIntensity(0,8);');
  Blockly.Arduino.addSetup('max7219_clr', lcName+'.clearDisplay(0);');
  return '';
};

/**
 * Code generator to create a character that get displayed with MAX7219 8x8 LED Module.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['max7219_setchar'] = function(block) {
  var din = block.getFieldValue('DIN');
  var lcName = 'max7219_' + din;
  var item = block.getFieldValue('VAR');
  var l1 = [if (block.getFieldValue('11') === 'TRUE') {1} else {0}, if(block.getFieldValue('12') === 'TRUE'){1} else {0}, if(block.getFieldValue('13') === 'TRUE'){1} else {0}, if(block.getFieldValue('14') === 'TRUE'){1} else {0}, if(block.getFieldValue('15') === 'TRUE'){1} else {0}, if(block.getFieldValue('16') === 'TRUE'){1} else {0}, if(block.getFieldValue('17') === 'TRUE'){1} else {0}, if(block.getFieldValue('18') === 'TRUE'){1} else {0}];
  var l2 = [if (block.getFieldValue('21') === 'TRUE') {1} else {0}, if(block.getFieldValue('22') === 'TRUE'){1} else {0}, if(block.getFieldValue('23') === 'TRUE'){1} else {0}, if(block.getFieldValue('24') === 'TRUE'){1} else {0}, if(block.getFieldValue('25') === 'TRUE'){1} else {0}, if(block.getFieldValue('26') === 'TRUE'){1} else {0}, if(block.getFieldValue('27') === 'TRUE'){1} else {0}, if(block.getFieldValue('28') === 'TRUE'){1} else {0}];
  var l3 = [if (block.getFieldValue('31') === 'TRUE') {1} else {0}, if(block.getFieldValue('32') === 'TRUE'){1} else {0}, if(block.getFieldValue('33') === 'TRUE'){1} else {0}, if(block.getFieldValue('34') === 'TRUE'){1} else {0}, if(block.getFieldValue('35') === 'TRUE'){1} else {0}, if(block.getFieldValue('36') === 'TRUE'){1} else {0}, if(block.getFieldValue('37') === 'TRUE'){1} else {0}, if(block.getFieldValue('38') === 'TRUE'){1} else {0}];
  var l4 = [if (block.getFieldValue('41') === 'TRUE') {1} else {0}, if(block.getFieldValue('42') === 'TRUE'){1} else {0}, if(block.getFieldValue('43') === 'TRUE'){1} else {0}, if(block.getFieldValue('44') === 'TRUE'){1} else {0}, if(block.getFieldValue('45') === 'TRUE'){1} else {0}, if(block.getFieldValue('46') === 'TRUE'){1} else {0}, if(block.getFieldValue('47') === 'TRUE'){1} else {0}, if(block.getFieldValue('48') === 'TRUE'){1} else {0}];
  var l5 = [if (block.getFieldValue('51') === 'TRUE') {1} else {0}, if(block.getFieldValue('52') === 'TRUE'){1} else {0}, if(block.getFieldValue('53') === 'TRUE'){1} else {0}, if(block.getFieldValue('54') === 'TRUE'){1} else {0}, if(block.getFieldValue('55') === 'TRUE'){1} else {0}, if(block.getFieldValue('56') === 'TRUE'){1} else {0}, if(block.getFieldValue('57') === 'TRUE'){1} else {0}, if(block.getFieldValue('58') === 'TRUE'){1} else {0}];
  var l6 = [if (block.getFieldValue('61') === 'TRUE') {1} else {0}, if(block.getFieldValue('62') === 'TRUE'){1} else {0}, if(block.getFieldValue('63') === 'TRUE'){1} else {0}, if(block.getFieldValue('64') === 'TRUE'){1} else {0}, if(block.getFieldValue('65') === 'TRUE'){1} else {0}, if(block.getFieldValue('66') === 'TRUE'){1} else {0}, if(block.getFieldValue('67') === 'TRUE'){1} else {0}, if(block.getFieldValue('68') === 'TRUE'){1} else {0}];
  var l7 = [if (block.getFieldValue('71') === 'TRUE') {1} else {0}, if(block.getFieldValue('72') === 'TRUE'){1} else {0}, if(block.getFieldValue('73') === 'TRUE'){1} else {0}, if(block.getFieldValue('74') === 'TRUE'){1} else {0}, if(block.getFieldValue('75') === 'TRUE'){1} else {0}, if(block.getFieldValue('76') === 'TRUE'){1} else {0}, if(block.getFieldValue('77') === 'TRUE'){1} else {0}, if(block.getFieldValue('78') === 'TRUE'){1} else {0}];
  var l8 = [if (block.getFieldValue('81') === 'TRUE') {1} else {0}, if(block.getFieldValue('82') === 'TRUE'){1} else {0}, if(block.getFieldValue('83') === 'TRUE'){1} else {0}, if(block.getFieldValue('84') === 'TRUE'){1} else {0}, if(block.getFieldValue('85') === 'TRUE'){1} else {0}, if(block.getFieldValue('86') === 'TRUE'){1} else {0}, if(block.getFieldValue('87') === 'TRUE'){1} else {0}, if(block.getFieldValue('88') === 'TRUE'){1} else {0}];


  Blockly.Arduino.addVariable(item, 'byte '+item+'[8]={B'+l1[0]+l1[1]+l1[2]+l1[3]+l1[4]+l1[5]+l1[6]+l1[7]+',B'+l2[0]+l2[1]+l2[2]+l2[3]+l2[4]+l2[5]+l2[6]+l2[7]+',B'+l3[0]+l3[1]+l3[2]+l3[3]+l3[4]+l3[5]+l3[6]+l3[7]+',B'+l4[0]+l4[1]+l4[2]+l4[3]+l4[4]+l4[5]+l4[6]+l4[7]+',B'+l5[0]+l5[1]+l5[2]+l5[3]+l5[4]+l5[5]+l5[6]+l5[7]+',B'+l6[0]+l6[1]+l6[2]+l6[3]+l6[4]+l6[5]+l6[6]+l6[7]+',B'+l7[0]+l7[1]+l7[2]+l7[3]+l7[4]+l7[5]+l7[6]+l7[7]+',B'+l8[0]+l8[1]+l8[2]+l8[3]+l8[4]+l8[5]+l8[6]+l8[7]+'};\n',true);

  var code = lcName+'.setRow(0,0,'+item+'[0]);\n' + lcName+'.setRow(0,1,'+item+'[1]);\n' + lcName+'.setRow(0,2,'+item+'[2]);\n' + lcName+'.setRow(0,3,'+item+'[3]);\n' + lcName+'.setRow(0,4,'+item+'[4]);\n' + lcName+'.setRow(0,5,'+item+'[5]);\n' + lcName+'.setRow(0,6,'+item+'[6]);\n' + lcName+'.setRow(0,7,'+item+'[7]);\n';

  return code;
};

/**
 * Code generator to clear Display of MAX7219 8x8 LED Matrix on DIN X.
 * Arduino code: #include <LedControl.h>
 *               LedControl max7219_X=LedControl(X,Y,Z,1);
 *               setup  { max7219_X.shutdown(0, false);
 *                        max7219_X.setIntensity(0, 8);
 *                        max7219.clearDisplay(0);}
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['max7219_clr'] = function(block) {
  var din = block.getFieldValue('DIN');
  var lcName = 'max7219_' + din;

  var code = lcName +'.clearDisplay(0);\n';
  return code;
};

/**
 * Code generator to setup LCD 16x2 Display.
 */
Blockly.Arduino['lcd1602_setup'] = function(block) {
  var db4 = block.getFieldValue('DB4');
  var db5 = block.getFieldValue('DB5');
  var db6 = block.getFieldValue('DB6');
  var db7 = block.getFieldValue('DB7');
  Blockly.Arduino.addInclude('lcd', '#include <LiquidCrystal.h>');
  Blockly.Arduino.addDeclaration('lcd_d', 'LiquidCrystal lcd(7, 8, '+db4+', '+db5+', '+db6+', '+db7+');');
  Blockly.Arduino.addSetup('lcd_s', 'lcd.begin(16, 2);');
  return '';
};

/**
 * Code generator to write string or other values as text lines to LCD 16x2 Display
 */
Blockly.Arduino['lcd1602_write'] = function(block) {
  var l1 = Blockly.Arduino.valueToCode(block, 'LINE1', Blockly.Arduino.ORDER_ATOMIC);
  var l2 = Blockly.Arduino.valueToCode(block, 'LINE2', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'lcd.setCursor(0, 0);\nlcd.print('+l1+');\nlcd.setCursor(0,1);\nlcd.print('+l2+');\n';
  return code;
};

/**
 * Code generator to clear lines of LCD 16x2 Display
 */
Blockly.Arduino['lcd1602_clr'] = function(block) {
  var code = 'lcd.clear();\n';
  return code;
};

/**
 * Code generator to create byte table for 7 segment display
 */
Blockly.Arduino['sevseg'] = function(block) {
  Blockly.Arduino.addDeclaration('sevenseg', 'byte seven_seg_digits[10] = {B11111100,B01100000,B11011010,B11110010,B01100110,B10110110,B10111110,B11100000,B11111110,B11100110};');
  return '';
};

/**
 * Code generator to write number to 7 segment display
 */
Blockly.Arduino['sevseg_write'] = function(block) {
  var digit = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'seven_seg_digits['+digit+']';
  return code;
};

/**
 * Code generator to setup 4 Digit 7 Segment Display.
 */
Blockly.Arduino['foursevseg_setup'] = function(block) {
  var segA = block.getFieldValue('SEGA');
  var segB = block.getFieldValue('SEGB');
  var segC = block.getFieldValue('SEGC');
  var segD = block.getFieldValue('SEGD');
  var segE = block.getFieldValue('SEGE');
  var segF = block.getFieldValue('SEGF');
  var segG = block.getFieldValue('SEGG');
  var segDP = block.getFieldValue('SEGDP');
  var dig1 = block.getFieldValue('DIG1');
  var dig2 = block.getFieldValue('DIG2');
  var dig3 = block.getFieldValue('DIG3');
  var dig4 = block.getFieldValue('DIG4');
  Blockly.Arduino.addDeclaration('47seg_d', 'int segA =  '+segA+';\nint segB = '+segB+';\nint segC = '+segC+';\nint segD = '+segD+';\nint segE = '+segE+';\nint segF = '+segF+';\nint segG = '+segG+';\nint segDP = '+segDP+';\nint digit1 = '+dig1+';\nint digit2 = '+dig2+';\nint digit3 = '+dig3+';\nint digit4 = '+dig4+';\nint figur = 0;\nboolean tens = false;\nboolean hundred = false;\n\nvoid numSegs(int numbers) {\n  switch (numbers) {\n    case 0:\n      digitalWrite(segA,HIGH);\n      digitalWrite(segB,HIGH);\n      digitalWrite(segC,HIGH);\n      digitalWrite(segD,HIGH);\n      digitalWrite(segE,HIGH);\n      digitalWrite(segF,HIGH);\n      digitalWrite(segG,LOW);\n      digitalWrite(segDP,LOW);\n      break;\n    case 1:\n      digitalWrite(segA,LOW);\n      digitalWrite(segB,HIGH);\n      digitalWrite(segC,HIGH);\n      digitalWrite(segD,LOW);\n      digitalWrite(segE,LOW);\n      digitalWrite(segF,LOW);\n      digitalWrite(segG,LOW);\n      digitalWrite(segDP,LOW);\n      break;\n    case 2:\n      digitalWrite(segA,HIGH);\n      digitalWrite(segB,HIGH);\n      digitalWrite(segC,LOW);\n      digitalWrite(segD,HIGH);\n      digitalWrite(segE,HIGH);\n      digitalWrite(segF,LOW);\n      digitalWrite(segG,HIGH);\n      digitalWrite(segDP,LOW);\n      break;\n    case 3:\n      digitalWrite(segA,HIGH);\n      digitalWrite(segB,HIGH);\n      digitalWrite(segC,HIGH);\n      digitalWrite(segD,HIGH);\n      digitalWrite(segE,LOW);\n      digitalWrite(segF,LOW);\n      digitalWrite(segG,HIGH);\n      digitalWrite(segDP,LOW);\n      break;\n    case 4:\n      digitalWrite(segA,LOW);\n      digitalWrite(segB,HIGH);\n      digitalWrite(segC,HIGH);\n      digitalWrite(segD,LOW);\n      digitalWrite(segE,LOW);\n      digitalWrite(segF,HIGH);\n      digitalWrite(segG,HIGH);\n      digitalWrite(segDP,LOW);\n      break;\n    case 5:\n      digitalWrite(segA,HIGH);\n      digitalWrite(segB,LOW);\n      digitalWrite(segC,HIGH);\n      digitalWrite(segD,HIGH);\n      digitalWrite(segE,LOW);\n      digitalWrite(segF,HIGH);\n      digitalWrite(segG,HIGH);\n      digitalWrite(segDP,LOW);\n      break;\n    case 6:\n      digitalWrite(segA,HIGH);\n      digitalWrite(segB,LOW);\n      digitalWrite(segC,HIGH);\n      digitalWrite(segD,HIGH);\n      digitalWrite(segE,HIGH);\n      digitalWrite(segF,HIGH);\n      digitalWrite(segG,HIGH);\n      digitalWrite(segDP,LOW);\n      break;\n    case 7:\n      digitalWrite(segA,HIGH);\n      digitalWrite(segB,HIGH);\n      digitalWrite(segC,HIGH);\n      digitalWrite(segD,LOW);\n      digitalWrite(segE,LOW);\n      digitalWrite(segF,LOW);\n      digitalWrite(segG,LOW);\n      digitalWrite(segDP,LOW);\n      break;\n    case 8:\n      digitalWrite(segA,HIGH);\n      digitalWrite(segB,HIGH);\n      digitalWrite(segC,HIGH);\n      digitalWrite(segD,HIGH);\n      digitalWrite(segE,HIGH);\n      digitalWrite(segF,HIGH);\n      digitalWrite(segG,HIGH);\n      digitalWrite(segDP,LOW);\n      break;\n    case 9:\n      digitalWrite(segA,HIGH);\n      digitalWrite(segB,HIGH);\n      digitalWrite(segC,HIGH);\n      digitalWrite(segD,HIGH);\n      digitalWrite(segE,LOW);\n      digitalWrite(segF,HIGH);\n      digitalWrite(segG,HIGH);\n      digitalWrite(segDP,LOW);\n      break;\n    case 10:\n      digitalWrite(segA,LOW);\n      digitalWrite(segB,LOW);\n      digitalWrite(segC,LOW);\n      digitalWrite(segD,LOW);\n      digitalWrite(segE,LOW);\n      digitalWrite(segF,LOW);\n      digitalWrite(segG,LOW);\n      digitalWrite(segDP,LOW);\n      break;\n    case 11:\n      digitalWrite(segA,LOW);\n      digitalWrite(segB,LOW);\n      digitalWrite(segC,LOW);\n      digitalWrite(segD,LOW);\n      digitalWrite(segE,LOW);\n      digitalWrite(segF,LOW);\n      digitalWrite(segG,LOW);\n      digitalWrite(segDP,HIGH);\n      break;\n  \n}');
  Blockly.Arduino.addSetup('47seg_s', 'pinMode(segA,OUTPUT);\n  pinMode(segB,OUTPUT);\n  pinMode(segC,OUTPUT);\n  pinMode(segD,OUTPUT);\n  pinMode(segE,OUTPUT);\n  pinMode(segF,OUTPUT);\n  pinMode(segG,OUTPUT);\n  pinMode(segDP,OUTPUT);\n  pinMode(digit1,OUTPUT);\n  pinMode(digit2,OUTPUT);\n  pinMode(digit3,OUTPUT);\n  pinMode(digit4,OUTPUT);');
  return '';
};

/**
 * Code generator to writes number to 4 Digit 7 Segment Display
 */
Blockly.Arduino['foursevseg_write'] = function(block) {
  var digit = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.addDeclaration('47seg_c', 'void countD() {\n  for (int digit = 1 ; digit < 5 ; digit++) {\n    switch (digit) {\n      case 1:\n        if (figur > 999) {\n          digitalWrite(digit1, LOW);\n          numSegs(figur / 1000);\n          figur %= 1000;\n          if (figur < 100) {\n            tens = true;\n            if (figur < 10) {\n              hundred = true;\n            }\n          } else tens = false;\n        }\n        break;\n      case 2:\n        if (tens == true) {\n          digitalWrite(digit2, LOW);\n          numSegs(0);\n        } if (hundred == true) {\n          break;\n        }\n        if (figur > 99 && figur < 1000) {\n          digitalWrite(digit2, LOW);\n          numSegs(figur / 100);\n          figur %= 100;\n          if (figur < 10) {\n            hundred = true;\n          } else hundred = false;\n        }\n        break;\n      case 3:\n        if (hundred == true) {\n          digitalWrite(digit3, LOW);\n          numSegs(0);\n          break;\n        }\n        if (figur > 9 && figur < 100) {\n          digitalWrite(digit3, LOW);\n          numSegs(figur / 10);\n          figur %= 10;\n        }\n        break;\n      case 4:\n        if (figur < 10) {\n          digitalWrite(digit4, LOW);\n          numSegs(figur);\n          break;\n        }\n    }\n    numSegs(10);\n    digitalWrite(digit1, HIGH);\n    digitalWrite(digit2, HIGH);\n    digitalWrite(digit3, HIGH);\n    digitalWrite(digit4, HIGH);\n  }\n}\n');
  var code = 'tens = false;\nhundred = false;\nfigur = '+digit+';\ncountD(figur);\n';
  return code;
};

/**
 * Code generator to create a character that get displayed with 4 Digit 7 Segment Display
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['foursevseg_setchar'] = function(block) {
  var item = block.getFieldValue('VAR');
  var digit = [if(block.getFieldValue('PIN') === 'D1') {digit1}, if(block.getFieldValue('PIN') === 'D2') {digit2}, if(block.getFieldValue('PIN') === 'D3') {digit3}, if(block.getFieldValue('PIN') === 'D4' {digit4})];
  var segA = [if (block.getFieldValue('A') === 'TRUE') {HIGH} else {LOW}];
  var segB = [if (block.getFieldValue('B') === 'TRUE') {HIGH} else {LOW}];
  var segC = [if (block.getFieldValue('C') === 'TRUE') {HIGH} else {LOW}];
  var segD = [if (block.getFieldValue('D') === 'TRUE') {HIGH} else {LOW}];
  var segE = [if (block.getFieldValue('E') === 'TRUE') {HIGH} else {LOW}];
  var segF = [if (block.getFieldValue('F') === 'TRUE') {HIGH} else {LOW}];
  var segG = [if (block.getFieldValue('G') === 'TRUE') {HIGH} else {LOW}];
  var segDP = [if (block.getFieldValue('DP') === 'TRUE') {HIGH} else {LOW}];
  Blockly.Arduino.addVariable(item, 'void  '+item+'() {\n  digitalWrite('+digit+', LOW);\n  digitalWrite(segA, '+segA+');\n    digitalWrite(segB, '+segB+');\n  digitalWrite(segC, '+segC+');\n  digitalWrite(segD, '+segD+');\n  digitalWrite(segE, '+segE+');\n  digitalWrite(segF, '+segF+');\n  digitalWrite(segG, '+segG+');\n  digitalWrite(segDP, '+segDP+');\n}\n');

  var code = item+'();\n';
  return code;
};

/**
 * Code generator to clear and switch off 4 Digit 7 Segment Display
 */
Blockly.Arduino['foursevseg_clr'] = function(block) {
  Blockly.Arduino.addDeclaration('47seg_v', 'void clearD(){\n  numSegs(10);\n  digitalWrite(digit1, HIGH);\n  digitalWrite(digit2, HIGH);\n  digitalWrite(digit3, HIGH);\n  digitalWrite(digit4, HIGH);\n}');
  var code = 'clearD();\n';
  return code;
};



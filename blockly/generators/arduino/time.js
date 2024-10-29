/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the Time blocks.
 *     Arduino built-in function docs: http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Arduino.time');

goog.require('Blockly.Arduino');


/**
 * Code generator for the delay Arduino block.
 * Arduino code: loop { delay(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.Arduino['time_delay'] = function(block) {
  var delayTime = Blockly.Arduino.valueToCode(
      block, 'DELAY_TIME_MILI', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'delay(' + delayTime + ');\n';
  return code;
};

/**
 * Code generator for the delayMicroseconds block.
 * Arduino code: loop { delayMicroseconds(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.Arduino['time_delaymicros'] = function(block) {
  var delayTimeMs = Blockly.Arduino.valueToCode(
      block, 'DELAY_TIME_MICRO', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'delayMicroseconds(' + delayTimeMs + ');\n';
  return code;
};

/**
 * Code generator for the elapsed time in milliseconds block.
 * Arduino code: loop { millis() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
 Blockly.Arduino['time_millis'] = function(block) {
  var code = 'millis()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator for the elapsed time in microseconds block.
 * Arduino code: loop { micros() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
 Blockly.Arduino['time_micros'] = function(block) {
  var code = 'micros()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator for the wait forever (end of program) block
 * Arduino code: loop { while(true); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.Arduino['infinite_loop'] = function(block) {
  return 'while(true);\n';
};

/**
 * Code generator to setup realtime clock RTC DS3231.
 */
Blockly.Arduino['ds3231_setup'] = function(block) {
  Blockly.Arduino.addInclude('rtc', '#include <Wire.h>\n#include <RTClib.h>');
  Blockly.Arduino.addDeclaration('rtc_d', 'RTC_DS3231 rtc;');
  Blockly.Arduino.addVariable('rtc_v', 'int vYear;\nint vMonth;\nint vDay;\nint vHours;\nint vMinutes;\nint vSecs;');
  Blockly.Arduino.addSetup('rtc_s', 'rtc.begin();');

};

/**
 * Code generator to set clock of RTC DS3231.
 */
Blockly.Arduino['ds3231_setclock'] = function(block) {
  var set = if (block.getFieldValue('SETCLOCK') === 'TRUE') {true} else {false}
  var year = block.getFieldValue('SETYEAR');
  var month = block.getFieldValue('SETMONTH');
  var day = block.getFieldValue('SETDAY');
  var hour = block.getFieldValue('SETHOUR');
  var minute = block.getFieldValue('SETMINUTE');
  Blockly.Arduino.addSetup('rtc_set', 'bool setclock = '+set+';\n  if(setclock == TRUE) {\n    rtc.adjust(DateTime('+year+', '+month+', '+day+', '+hour+', '+minute+', 0));\n  }');
  return '';
};

/**
 * Code generator to read date and time from RTC DS3231
 */
Blockly.Arduino['ds3231_read'] = function(block) {
  var year = Blockly.Arduino.valueToCode(block, 'YEAR', Blockly.Arduino.ORDER_ATOMIC);
  var month = Blockly.Arduino.valueToCode(block, 'MONTH', Blockly.Arduino.ORDER_ATOMIC);
  var day = Blockly.Arduino.valueToCode(block, 'DAY', Blockly.Arduino.ORDER_ATOMIC);
  var hour = Blockly.Arduino.valueToCode(block, 'HOUR', Blockly.Arduino.ORDER_ATOMIC);
  var minute = Blockly.Arduino.valueToCode(block, 'MINUTE', Blockly.Arduino.ORDER_ATOMIC);
  var second = Blockly.Arduino.valueToCode(block, 'SECOND', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.addVariable('rtc_var', 'int '+year+';\nint '+month+';\nint '+day+';\nint '+hour+';\nint '+minute+';\nint '+second+';\n');
  var code = 'DateTime now = rtc.now();\nvYear = now.year();\nvMonth = now.month();\nvDay = now.day();\nvHours = now.hour();\nvMinutes = now.minute();\nvSecs = now.second();\n'+year+' = vYear;\n'+month+' = vMonth;\n'+day+' = vDay;\n'+hour+' = vHours;\n'+minute+' = vMinutes;\n'+second+' = vSecs;\ndelay(1000);\n';
  return code;
};



/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for the Arduino serial blocks.
 *     Arduino Serial library docs: https://www.arduino.cc/en/Reference/Serial
 *
 * TODO: There are more functions that can be added:
 *       http://arduino.cc/en/Reference/Serial
 */
'use strict';

goog.provide('Blockly.Arduino.serial');

goog.require('Blockly.Arduino');


/**
 * Code generator of block for writing to the serial com.
 * Arduino code: loop { Serial.print(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['serial_print'] = function(block) {
  var serialId = block.getFieldValue('SERIAL_ID');
  var content = Blockly.Arduino.valueToCode(
      block, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var checkbox_name = (block.getFieldValue('NEW_LINE') == 'TRUE');

  var serialPins = Blockly.Arduino.Boards.selected.serialPins[serialId];
  for (var i = 0; i < serialPins.length; i++) {
    Blockly.Arduino.reservePin(block, serialPins[i][1],
        Blockly.Arduino.PinTypes.SERIAL, 'SERIAL ' + serialPins[i][0]);
  }

  if (checkbox_name) {
    var code = serialId + '.println(' + content + ');\n';
  } else {
    var code = serialId + '.print(' + content + ');\n';
  }
  return code;
};

/**
 * Code generator for block for setting the serial com speed.
 * Arduino code: setup{ Serial.begin(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code.
 */
Blockly.Arduino['serial_setup'] = function(block) {
	
	
  Blockly.Arduino.addInclude('serial', '#include <SoftwareSerial.h>');
  var serialId = block.getFieldValue('SERIAL_ID');
  var serialSpeed = block.getFieldValue('SPEED');
  var serialSetupCode = serialId + '.begin_(' + serialSpeed + ');';
  //var serialDeclaration = 'SotwareSerial ' + serialId ;
  //Blockly.Arduino.addDeclaration(serialDeclaration, globalCode);
  var pins = [block.getFieldValue('ARD_SERIAL_RX_PIN'),
			  block.getFieldValue('ARD_SERIAL_TX_PIN')];
			  

  var globalCode = 'SotwareSerial ' + serialId + '(';
  for (var i = 0; i < pins.length; i++) {
	  
  //  need to get the following working:
  //Blockly.Arduino.reservePin(block, pins[i], pinType, 'Serial');
  
    globalCode += pins[i] + ', ';
  }
  globalCode = globalCode.slice(0, -2) + '); // RX | TX';
  
  Blockly.Arduino.addDeclaration(serialId, globalCode);
  Blockly.Arduino.addSetup('serial_' + serialId, serialSetupCode, true);
  var code = '';
  return code;
};

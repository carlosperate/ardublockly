/**
 * @license
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
 * Originally developed by the author below and modified for Ardublockly
 * @author gasolin@gmail.com (Fred Lin)
 * The Arduino built in functions syntax can be found in http://arduino.cc/en/Reference/HomePage
 */
'use strict';


Blockly.Blocks['base_map'] = {
  category: 'Math',
  helpUrl: 'http://arduino.cc/en/Reference/map',
  init: function() {
    this.setColour(230);
    this.appendValueInput("NUM", Number)
        .appendTitle("Map ")
        .setCheck(Number);
    this.appendValueInput("DMAX", Number)
        .appendTitle("value to [0-")
        .setCheck(Number);
    this.appendDummyInput("")
        .appendTitle("]");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('Re-maps a number from [0-1024] to another.');
  }
};

Blockly.Arduino['base_map'] = function(block) {
  var value_num = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_NONE);
  var value_dmax = Blockly.Arduino.valueToCode(block, 'DMAX', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'map('+value_num+', 0, 1024, 0, '+value_dmax+')';
  return [code, Blockly.Arduino.ORDER_NONE];
};



Blockly.Blocks['serial_print'] = {
  category: 'Serial',
  helpUrl: 'http://www.arduino.cc/en/Serial/Print',
  init: function() {
    this.setColour(230);
    this.appendValueInput("CONTENT", String)
        .appendTitle("Serial Print");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Prints data to the console/serial port as human-readable ASCII text.');
  }
};

Blockly.Arduino['serial_print'] = function(block) {
  var content = Blockly.Arduino.valueToCode(block, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0'
  
  Blockly.Arduino.setups_['setup_serial_'+profile.default.serial] = 'Serial.begin('+profile.default.serial+');\n';
  
  var code = 'Serial.print('+content+');\nSerial.print(\'\\t\');\n';
  return code;
};

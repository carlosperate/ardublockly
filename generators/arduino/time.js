/**
 * @fileoverview Blocks extension for Arduino Time functions.
 * The arduino built in functions syntax can be found in http://arduino.cc/en/Reference/HomePage
 */
'use strict';

//TODO: When confirm working, replicate for millis(), micros(), and delayMicroseconds()

/**
 * Delay block definition
 */
Blockly.Blocks['time_delay'] = {
  category: 'Time',
  helpUrl: 'http://arduino.cc/en/Reference/delay',
  init: function() {
    this.setColour(120);
    this.appendValueInput("DELAY_TIME", Number)
        .appendTitle("Delay")
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Delay specific time');
  }
};

/**
 * Delay Arduino code generator
 */
 Blockly.Arduino['time_delay'] = function(block) {
  var delay_time = Blockly.Arduino.valueToCode(block, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '1000'
  var code = 'delay(' + delay_time + ');\n';
  return code;
};

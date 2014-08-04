/**
 * @fileoverview Blocks extension for Arduino Time functions.
 * The arduino built in functions syntax can be found in http://arduino.cc/en/Reference/HomePage
 */
'use strict';


/**
 * Delay block definition
 */
Blockly.Blocks['time_delay'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Delay');
    this.setColour(120);
    this.appendValueInput("DELAY_TIME", 'Number')
        .appendField("Delay")
        .setCheck('Number')
        .appendField("Milliseconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Delay specific time in milliseconds');
  }
};

/**
 * Delay Arduino code generator
 */
 Blockly.Arduino['time_delay'] = function(block) {
  var delay_time = Blockly.Arduino.valueToCode(block, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '1000';
  var code = 'delay(' + delay_time + ');\n';
  return code;
};


/**
 * delayMicroseconds block definition
 */
Blockly.Blocks['time_delaymicros'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DelayMicroseconds');
    this.setColour(120);
    this.appendValueInput("DELAY_TIME_MS", 'Number')
        .appendField("Delay")
        .setCheck('Number')
        .appendField("Microseconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Delay specific time in microseconds');
  }
};

/**
 * delayMicroseconds Arduino code generator
 */
 Blockly.Arduino['time_delaymicros'] = function(block) {
  var delay_timems = Blockly.Arduino.valueToCode(block, 'DELAY_TIME_MS', Blockly.Arduino.ORDER_ATOMIC) || '1000';
  var code = 'delayMicroseconds(' + delay_timems + ');\n';
  return code;
};

/**
 * millis block definition
 */
Blockly.Blocks['time_millis'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Millis');
    this.setColour(120);
    this.appendDummyInput("")
        .appendField("Elapsed Time (Milli)");
    this.setOutput(true, 'Number');
    this.setTooltip('Returns the number of milliseconds since the Arduino board began running the current program.');
  }
};

/**
 * millis Arduino code generator
 */
 Blockly.Arduino['time_millis'] = function(block) {
  var code = 'millis()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


/**
 * micros block definition
 */
Blockly.Blocks['time_micros'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Micros');
    this.setColour(120);
    this.appendDummyInput("")
        .appendField("Elapsed Time (Micro)");
    this.setOutput(true, 'Number');
    this.setTooltip('Returns the number of microseconds since the Arduino board began running the current program.');
  }
};

/**
 * micros Arduino code generator
 */
 Blockly.Arduino['time_micros'] = function(block) {
  var code = 'micros()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
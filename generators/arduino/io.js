/**
 * @fileoverview Blocks extension for Arduino Digital and Analogue input/output functions.
 * The Arduino built in functions syntax can be found in http://arduino.cc/en/Reference/HomePage
 */
'use strict';


/**
 * Description
 */
Blockly.Blocks['io_digitalwrite'] = {
  category: 'Input/Output',
  helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
  init: function() {
    this.setColour(230);
    this.appendDummyInput("")
        .appendTitle("DigitalWrite PIN#")
        .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN")
        .appendTitle("Stat")
        .appendTitle(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Write digital value to a specific Port');
  }
};

Blockly.Arduino['io_digitalwrite'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  var dropdown_stat = block.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n'
  return code;
};

/**
 * Description
 */
Blockly.Blocks['io_digitalread'] = {
  category: 'Input/Output',
  helpUrl: 'http://arduino.cc/en/Reference/DigitalRead',
  init: function() {
    this.setColour(230);
    this.appendDummyInput("")
        .appendTitle("DigitalRead PIN#")
        .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

Blockly.Arduino['io_digitalread'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


/**
 * Description
 */
Blockly.Blocks['io_builtin_led'] = {
  category: 'Input/Output',
  helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
  init: function() {
    this.setColour(190);
    this.appendDummyInput("")
        .appendTitle("Build-in LED Stat")
        .appendTitle(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Turn on or off the built in LED');
  }
};

Blockly.Arduino['io_builtin_led'] = function(block) {
  var dropdown_stat = block.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_output_LED_BUILTIN'] = 'pinMode(LED_BUILTIN, OUTPUT);';
  var code = 'digitalWrite(LED_BUILTIN,'+dropdown_stat+');\n'
  return code;
};

/**
 * Description
 */
Blockly.Blocks['io_analogwrite'] = {
  category: 'Input/Output',
  helpUrl: 'http://arduino.cc/en/Reference/AnalogWrite',
  init: function() {
    this.setColour(230);
    this.appendDummyInput("")
        .appendTitle("AnalogWrite PIN#")
        .appendTitle(new Blockly.FieldDropdown(profile.default.analog), "PIN");
    this.appendValueInput("NUM", Number)
        .appendTitle("value")
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Write analog value between 0 and 255 to a specific Port');
  }
};

Blockly.Arduino['io_analogwrite'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  //var dropdown_stat = this.getTitleValue('STAT');
  var value_num = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  //Blockly.Arduino.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'analogWrite('+dropdown_pin+','+value_num+');\n';
  return code;
};

/**
 * Description
 */
Blockly.Blocks['io_analogread'] = {
  category: 'Input/Output',
  helpUrl: 'http://arduino.cc/en/Reference/AnalogRead',
  init: function() {
    this.setColour(230);
    this.appendDummyInput("")
        .appendTitle("AnalogRead PIN#")
        .appendTitle(new Blockly.FieldDropdown(profile.default.analog), "PIN");
    this.setOutput(true, Number);
    this.setTooltip('Return value between 0 and 1024');
  }
};

Blockly.Arduino['io_analogread'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  //Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Description
 */
Blockly.Blocks['io_highlow'] = {
  category: 'Input/Output',
  helpUrl: 'http://arduino.cc/en/Reference/Constants',
  init: function() {
    this.setColour(230);
    this.appendDummyInput("")
        .appendTitle(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), 'BOOL')
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.LANG_LOGIC_BOOLEAN_TOOLTIP_1);
  }
};

Blockly.Arduino['io_highlow'] = function(block) {
  // Boolean values HIGH and LOW.
  var code = (block.getFieldValue('BOOL') == 'HIGH') ? 'HIGH' : 'LOW';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * @fileoverview Blocks extension for Arduino Digital and Analogue input/output functions.
 * The Arduino built in functions syntax can be found in http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Arduino.IO');

goog.require('Blockly.Arduino');


/**
 * Description
 */
Blockly.Blocks['io_digitalwrite'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    this.setColour(230);
    this.appendDummyInput('')
        .appendField('DigitalWrite PIN#')
        .appendField(new Blockly.FieldDropdown(profile.default.digital), 'PIN')
        .appendField("Stat")
        .appendField(new Blockly.FieldDropdown([['HIGH', 'HIGH'], ['LOW', 'LOW']]), 'STAT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Write digital value to a specific Port');
  }
};

Blockly.Arduino['io_digitalwrite'] = function(block) {
  var pin_key = block.getFieldValue('PIN');
  var pin_type = profile.default.pin_types.OUTPUT;
  var dropdown_state = block.getFieldValue('STAT');
  var set_up_key = 'setup_io_' + pin_key;
  var pin_mode = 'pinMode(' + pin_key + ', OUTPUT);';
  var code = 'digitalWrite(' + pin_key + ',' + dropdown_state + ');\n'

  // If the IO has been configured already temporarily change it and restore it
  if (pin_key in Blockly.Arduino.pins_) {
     if (Blockly.Arduino.pins_[pin_key] != pin_type) {
       block.setWarningText('Pin alredy used as ' + Blockly.Arduino.pins_[pin_key]);
     } else {
       block.setWarningText(null);
     }
  } else {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pin_key] = pin_type;
    Blockly.Arduino.setups_[set_up_key] = pin_mode;
    block.setWarningText(null);
  }

  return code;
};

/**
 * Description
 */
Blockly.Blocks['io_digitalread'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalRead');
    this.setColour(230);
    this.appendDummyInput('')
        .appendField('DigitalRead PIN#')
        .appendField(new Blockly.FieldDropdown(profile.default.digital), 'PIN');
    this.setOutput(true, 'Boolean');
    this.setTooltip('');
  }
};

Blockly.Arduino['io_digitalread'] = function(block) {
  var pin_key = block.getFieldValue('PIN');
  var pin_type = profile.default.pin_types.INPUT;
  var set_up_key = 'setup_io_' + pin_key;
  var pin_mode = 'pinMode(' + pin_key + ', INPUT);';
  var code = 'digitalRead(' + pin_key + ')';

  // If the IO has been configured already temporarily change it and restore it
  if (pin_key in Blockly.Arduino.pins_) {
     if (Blockly.Arduino.pins_[pin_key] != pin_type) {
       block.setWarningText('Pin alredy used as ' + Blockly.Arduino.pins_[pin_key]);
     } else {
       block.setWarningText(null);
     }
  } else {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pin_key] = pin_type;
    Blockly.Arduino.setups_[set_up_key] = pin_mode;
    block.setWarningText(null);
  }

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


/**
 * Description
 */
Blockly.Blocks['io_builtin_led'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    this.setColour(190);
    this.appendDummyInput('')
        .appendField('Set LED')
        .appendField(new Blockly.FieldDropdown(profile.default.builtin_led), 'BUILT_IN_LED')
        .appendField("to")
        .appendField(new Blockly.FieldDropdown([['HIGH', 'HIGH'], ['LOW', 'LOW']]), 'STAT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Turn on or off the built in LED');
  }
};

Blockly.Arduino['io_builtin_led'] = function(block) {
  var pin_key = block.getFieldValue('BUILT_IN_LED');
  var pin_type = profile.default.pin_types.OUTPUT;
  var dropdown_stat = block.getFieldValue('STAT');
  var set_up_key = 'setup_io_' + pin_key;
  var pin_mode = 'pinMode(' + pin_key + ', ' + pin_type + ');';
  var code = 'digitalWrite(' + pin_key + ',' + dropdown_stat + ');\n'

  // If the IO has been configured already temporarily change it and restore it
  if (pin_key in Blockly.Arduino.pins_) {
     if (Blockly.Arduino.pins_[pin_key] != pin_type) {
       block.setWarningText('Pin ' + pin_key + ' alredy used as ' + Blockly.Arduino.pins_[pin_key]);
     } else {
       block.setWarningText(null);
     }
  } else {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pin_key] = pin_type;
    Blockly.Arduino.setups_[set_up_key] = pin_mode;
    block.setWarningText(null);
  }

  return code;
};

/**
 * Description
 */
Blockly.Blocks['io_analogwrite'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogWrite');
    this.setColour(230);
    this.appendDummyInput('')
        .appendField('AnalogWrite PIN#')
        .appendField(new Blockly.FieldDropdown(profile.default.analog), 'PIN');
    this.appendValueInput('NUM', 'Number')
        .appendField('value')
        .setCheck('Number');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Write analog value between 0 and 255 to a specific Port');
  }
};

Blockly.Arduino['io_analogwrite'] = function(block) {
  var pin_key = block.getFieldValue('PIN');
  var pin_type = profile.default.pin_types.OUTPUT;
  var value_num = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var set_up_key = 'setup_io_' + pin_key;
  var pin_mode = 'pinMode(' + pin_key + ', OUTPUT);';
  var code = 'analogWrite(' + pin_key + ',' + value_num + ');\n'

  // If the IO has been configured already temporarily change it and restore it
  if (pin_key in Blockly.Arduino.pins_) {
     if (Blockly.Arduino.pins_[pin_key] != pin_type) {
       block.setWarningText('Pin alredy used as ' + Blockly.Arduino.pins_[pin_key]);
     } else {
       block.setWarningText(null);
     }
  } else {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pin_key] = pin_type;
    Blockly.Arduino.setups_[set_up_key] = pin_mode;
    block.setWarningText(null);
  }

  return code;
};

/**
 * Description
 */
Blockly.Blocks['io_analogread'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(230);
    this.appendDummyInput('')
        .appendField('AnalogRead PIN#')
        .appendField(new Blockly.FieldDropdown(profile.default.analog), 'PIN');
    this.setOutput(true, 'Number');
    this.setTooltip('Return value between 0 and 1024');
  }
};

Blockly.Arduino['io_analogread'] = function(block) {
  var pin_key = block.getFieldValue('PIN');
  var pin_type = profile.default.pin_types.INPUT;
  var set_up_key = 'setup_io_' + pin_key;
  var pin_mode = 'pinMode(' + pin_key + ', ' + pin_type + ');';
  var code = 'analogRead(' + pin_key + ')';
  
  // If the IO has been configured already temporarily change it and restore it
  if (pin_key in Blockly.Arduino.pins_) {
     if (Blockly.Arduino.pins_[pin_key] != pin_type) {
       block.setWarningText('Pin alredy used as ' + Blockly.Arduino.pins_[pin_key]);
     } else {
       block.setWarningText(null);
     }
  } else {
    // First time this IO pin is used, so configure it
    Blockly.Arduino.pins_[pin_key] = pin_type;
    Blockly.Arduino.setups_[set_up_key] = pin_mode;
    block.setWarningText(null);
  }

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Description
 */
Blockly.Blocks['io_highlow'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Constants');
    this.setColour(230);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), 'BOOL')
    this.setOutput(true, 'Boolean');
    this.setTooltip("Set a pin state logic High or Low");
  }
};

Blockly.Arduino['io_highlow'] = function(block) {
  // Boolean values HIGH and LOW.
  var code = (block.getFieldValue('BOOL') == 'HIGH') ? 'HIGH' : 'LOW';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

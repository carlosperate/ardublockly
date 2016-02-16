/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for the test 2 blocks.
 */
'use strict';

goog.provide('Blockly.Arduino.grove');

goog.require('Blockly.Arduino');


/**
 * Function for setting the state (Y) of a Grove LED module (X).
 * Connector uses only 1 pin.
 * Arduino code: setup { pinMode(X, OUTPUT); }
 *               loop  { digitalWrite(X, Y); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['grove_led'] = function(block) {
  var pins = block.connectorPinUsage();
  var stateOutput = Blockly.Arduino.valueToCode(
      block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) || 'LOW';

  Blockly.Arduino.reservePin(
      block, pins[0], Blockly.Arduino.PinTypes.GROVE_LED, 'this Grove module');

  var pinSetupCode = 'pinMode(' + pins[0] + ', OUTPUT);';
  Blockly.Arduino.addSetup('grove_led' + pins[0], pinSetupCode, false);

  var code = 'digitalWrite(' + pins[0] + ', ' + stateOutput + ');\n';
  return code;
};

/**
 * Function for reading Grove Button state. Connector uses only 1 pin.
 * Arduino code: setup { pinMode(X, INPUT); }
 *               loop  { digitalRead(X);     }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['grove_button'] = function(block) {
  var pins = block.connectorPinUsage();
  Blockly.Arduino.reservePin(block, pins[0],
      Blockly.Arduino.PinTypes.GROVE_BUTTON, 'this Grove module');

  var pinSetupCode = 'pinMode(' + pins[0] + ', INPUT);';
  Blockly.Arduino.addSetup('grove_button_' + pins[0], pinSetupCode, false);

  var code = 'digitalRead(' + pins[0] + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Function for reading Grove PIR sensor state. Connector uses only 1 pin.
 * Arduino code: setup { pinMode(X, INPUT); }
 *               loop  { digitalRead(X);     }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['grove_pir'] = function(block) {
  var pins = block.connectorPinUsage();
  Blockly.Arduino.reservePin(
      block, pins[0], Blockly.Arduino.PinTypes.GROVE_PIR, 'this Grove module');

  var pinSetupCode = 'pinMode(' + pins[0] + ', INPUT);';
  Blockly.Arduino.addSetup('grove_pir_' + pins[0], pinSetupCode, false);

  var code = 'digitalRead(' + pins[0] + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Function setting a Grove LCD RGB Backlight message. Connector uses I2C.
 * Arduino code: setup { pinMode(X, INPUT); }
 *               loop  { digitalRead(X);     }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['grove_lcd_rgb'] = function(block) {
  var i2cPins = block.connectorPinUsage();
  var line1Text = Blockly.Arduino.valueToCode(
      block, 'LINE_1', Blockly.Arduino.ORDER_ATOMIC) || '""';

  // Reserve I2C pins SDA and SCL
  for (var i = 0; i < i2cPins.length; i++) {
    Blockly.Arduino.reservePin(block, i2cPins[i][1],
        Blockly.Arduino.PinTypes.I2C, 'I2C ' + i2cPins[i][0]);
  }

  Blockly.Arduino.addInclude('grove_lcd_rgb', '#include <rgb_lcd.h>');
  Blockly.Arduino.addDeclaration('grove_lcd_rgb', 'rgb_lcd lcd;', false);

  Blockly.Arduino.addSetup('grove_lcd_rgb_init', 'lcd.begin(16, 2);', false);
  Blockly.Arduino.addSetup('grove_lcd_rgb_colour', 'lcd.setRGB(0, 255, 0);');

  var code = 'lcd.clear();\nlcd.print(' + line1Text + ');';
  return code;
};

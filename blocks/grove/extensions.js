/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Extends Ardublockly functionality for the Grove blocks.
 *     These modules depend on an Arduino Shield, which should connected to the
 *     same pins in all Arduino boards.
 */
'use strict';

goog.provide('Blockly.Arduino.Groove');

goog.require('Blockly.Arduino');
goog.require('Blockly.Arduino.Boards');

/** Initialises all the Groove blocks Ardublockly extensions. */
Blockly.Arduino.Groove.init = function() {
  Blockly.Arduino.Groove.extendBoards();
  Blockly.Arduino.Groove.extendPinTypes();
};

Blockly.Arduino.Groove.genDigitalConnectors = function(pinStart, pinEnd) {
  var connectorIo = [];
  for (var i = pinStart; i < (pinEnd + 1); i++) {
    connectorIo.push(['D' + i.toString(), i.toString()]);
  }
  return connectorIo;
};

/** Extends all the Arduino boards to include Grove connectors.*/
Blockly.Arduino.Groove.extendBoards = function() {
  for (var boardName in Blockly.Arduino.Boards.profiles) {
    var board = Blockly.Arduino.Boards.profiles[boardName];
    board.groveDigital = Blockly.Arduino.Groove.genDigitalConnectors(2, 8);
    board.groveAnalog = Blockly.Arduino.Boards.generateAnalogIo(0, 3);
    board.groveI2c = ['I2C', 'Wire'];
    board.groveUart = ['UART', 'Serial'];
  }
};

/** Extends the pin types to include Grove modules. */
Blockly.Arduino.Groove.extendPinTypes = function() {
  Blockly.Arduino.PinTypes.GROVE_LED = 'GROVE LED';
  Blockly.Arduino.PinTypes.GROVE_BUTTON = 'GROVE BUTTON';
  Blockly.Arduino.PinTypes.GROVE_JOYSTICK = 'GROVE JOYSTICK';
  Blockly.Arduino.PinTypes.GROVE_PIR = 'GROVE PIR';
  Blockly.Arduino.PinTypes.GROVE_TEMPERATURE = 'GROVE TEMPERATURE';
};

/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino Digital and Analogue input and output
 *     functions. The Arduino function syntax can be found at
 *     http://arduino.cc/en/Reference/HomePage
 *
 * TODO: maybe change this to a "PIN" BlocklyType
 */
'use strict';

goog.provide('Blockly.Blocks.io');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.io.HUE = 250;

Blockly.Blocks['io_pinmode'] = {
  init: function() {
    this.jsonInit(
        {
          "type": "io_pinmode",
          "message0": Blockly.Msg.ARD_PINMODE,
          "args0": [
            {
              "type": "field_dropdown",
              "name": "PIN",
              "options": Blockly.Arduino.Boards.selected.digitalPins
            },
            {
              "type": "field_dropdown",
              "name": "MODE",
              "options": [[Blockly.Msg.ARD_OUTPUT, 'OUTPUT'], [Blockly.Msg.ARD_INPUT, 'INPUT'], [Blockly.Msg.ARD_INPUT_PULLUP, 'INPUT_PULLUP']]
            }
          ],
          "previousStatement": null,
          "nextStatement": null,
          "colour": Blockly.Blocks.io.HUE,
          "tooltip": Blockly.Msg.ARD_PINMODE_TIP,
          "helpUrl": 'http://arduino.cc/en/Reference/PinMode'
        }
    );
  },
  updateFields : function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'PIN', 'digitalPins');
  }
};

Blockly.Blocks['io_digitalwrite'] = {
  init: function() {
    this.jsonInit(
        {
          "type": "io_digitalwrite",
          "message0": Blockly.Msg.ARD_DIGITALWRITE,
          "args0": [
            {
              "type": "field_dropdown",
              "name": "PIN",
              "options": Blockly.Arduino.Boards.selected.digitalPins
            },
            {
              "type": "field_dropdown",
              "name": "STATE",
              "options": [[Blockly.Msg.ARD_HIGH, 'HIGH'], [Blockly.Msg.ARD_LOW, 'LOW']]
            }
          ],
          "previousStatement": null,
          "nextStatement": null,
          "colour": Blockly.Blocks.io.HUE,
          "tooltip": Blockly.Msg.ARD_DIGITALWRITE_TIP,
          "helpUrl": 'http://arduino.cc/en/Reference/DigitalWrite'
        }
    );
  },
  updateFields : function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'PIN', 'digitalPins');
  }
};


Blockly.Blocks['io_digitalread'] = {
  init: function() {
    this.jsonInit(
        {
          "type": "io_digitalread",
          "message0": Blockly.Msg.ARD_DIGITALREAD,
          "args0": [
            {
              "type": "field_dropdown",
              "name": "PIN",
              "options": Blockly.Arduino.Boards.selected.digitalPins
            }
          ],
          "output": Blockly.Types.BOOLEAN.output,
          "colour": Blockly.Blocks.io.HUE,
          "tooltip": Blockly.Msg.ARD_DIGITALREAD_TIP,
          "helpUrl": 'http://arduino.cc/en/Reference/DigitalRead'
        }
    );
  },
  getBlockType : function() {
    return Blockly.Types.BOOLEAN;
  },
  updateFields : function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'PIN', 'digitalPins');
  }
};

Blockly.Blocks['io_analogwrite'] = {
  init: function() {
    this.jsonInit(
        {
          "type": "io_analogwrite",
          "message0": Blockly.Msg.ARD_ANALOGWRITE,
          "args0": [
            {
              "type": "field_dropdown",
              "name": "PIN",
              "options": Blockly.Arduino.Boards.selected.pwmPins
            },
            {
              "type": "input_value",
              "name": "NUM",
              "check": Blockly.Types.NUMBER.output
            }
          ],
          "previousStatement": null,
          "nextStatement": null,
          "inputsInline": true,
          "colour": Blockly.Blocks.io.HUE,
          "tooltip": Blockly.Msg.ARD_ANALOGWRITE_TIP,
          "helpUrl": 'http://arduino.cc/en/Reference/AnalogWrite'
        }
    );
  },
  updateFields : function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'pwmPins');
  },
  getBlockType : function() {
    return Blockly.Types.NUMBER;
  }
};


Blockly.Blocks['io_analogread'] = {
  init: function() {
    this.jsonInit(
        {
          "type": "io_analogread",
          "message0": Blockly.Msg.ARD_ANALOGREAD,
          "args0": [
            {
              "type": "field_dropdown",
              "name": "PIN",
              "options": Blockly.Arduino.Boards.selected.analogPins
            }
          ],
          "output": Blockly.Types.NUMBER.output,
          "colour": Blockly.Blocks.io.HUE,
          "tooltip": Blockly.Msg.ARD_ANALOGREAD_TIP,
          "helpUrl": 'http://arduino.cc/en/Reference/AnalogRead'
        }
    );
  },
  getBlockType : function() {
    return Blockly.Types.NUMBER;
  },
  updateFields : function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'analogPins');
  }
};


Blockly.Blocks['io_highlow'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Constants');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(
            new Blockly.FieldDropdown([[Blockly.Msg.ARD_HIGH, 'HIGH'], [Blockly.Msg.ARD_LOW, 'LOW']]),
            'STATE');
    this.setOutput(true, Blockly.Types.BOOLEAN.output);
    this.setTooltip(Blockly.Msg.ARD_HIGHLOW_TIP);
  },
  getBlockType: function() {
    return Blockly.Types.BOOLEAN;
  }
};

Blockly.Blocks['io_inputoutput'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Constants');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(
            new Blockly.FieldDropdown([[Blockly.Msg.ARD_OUTPUT, 'OUTPUT'], [Blockly.Msg.ARD_INPUT, 'INPUT'], [Blockly.Msg.ARD_INPUT_PULLUP, 'INPUT_PULLUP']]),
            'MODE');
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_INPUT_OUTPUT_TIP);
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

// Blockly.Blocks['io_pulsein'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField(Blockly.Msg.ARD_PULSEREAD);
//     this.appendValueInput("PULSETYPE")
//         .setCheck(Blockly.Types.BOOLEAN.check);
//     this.appendDummyInput()
//         .appendField(Blockly.Msg.ARD_PULSEON)
//         .appendField(new Blockly.FieldDropdown(
//             Blockly.Arduino.Boards.selected.digitalPins), "PULSEPIN");
//     this.setOutput(true);
//     this.setInputsInline(true);
//     this.setColour(Blockly.Blocks.io.HUE);
//     this.setTooltip(Blockly.Msg.ARD_PULSE_TIP);
//     this.setHelpUrl('https://www.arduino.cc/en/Reference/PulseIn');
//   },
//   /** @return {!string} The type of input value for the block, an integer. */
//   getBlockType: function() {
//     return Blockly.Types.NUMBER;
//   }
// };
//
// Blockly.Blocks['io_pulsetimeout'] = {
//   init: function () {
//     this.appendDummyInput()
//         .appendField(Blockly.Msg.ARD_PULSEREAD);
//     this.appendValueInput("PULSETYPE")
//         .setCheck(Blockly.Types.BOOLEAN.check);
//     this.appendDummyInput()
//         .appendField(Blockly.Msg.ARD_PULSEON)
//         .appendField(new Blockly.FieldDropdown(
//             Blockly.Arduino.Boards.selected.digitalPins), "PULSEPIN");
//     this.appendDummyInput()
//         .appendField(Blockly.Msg.ARD_PULSETIMEOUT);
//     this.appendValueInput('TIMEOUT')
//         .setCheck(Blockly.Types.NUMBER.output);
//     this.appendDummyInput()
//         .appendField(Blockly.Msg.ARD_PULSETIMEOUT_MS);
//     this.setOutput(true);
//     this.setInputsInline(true);
//     this.setColour(Blockly.Blocks.io.HUE);
//     this.setTooltip(Blockly.Msg.ARD_PULSETIMEOUT_TIP);
//     this.setHelpUrl('https://www.arduino.cc/en/Reference/PulseIn');
//   },
//   /** @return {!string} The type of input value for the block, an integer. */
//   getBlockType: function() {
//     return Blockly.Types.NUMBER;
//   }
// };


// Blockly.Blocks['io_builtin_led'] = {
//   /**
//    * Block for setting built-in LED to a state.
//    * @this Blockly.Block
//    */
//   init: function() {
//     this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
//     this.setColour(Blockly.Blocks.io.HUE);
//     this.appendValueInput('STATE')
//         .appendField(Blockly.Msg.ARD_BUILTIN_LED)
//         .appendField(new Blockly.FieldDropdown(
//             Blockly.Arduino.Boards.selected.builtinLed), 'BUILT_IN_LED')
//         .appendField('to')
//         .setCheck(Blockly.Types.BOOLEAN.checkList);
//     this.setInputsInline(false);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setTooltip(Blockly.Msg.ARD_BUILTIN_LED_TIP);
//   },
//   /**
//    * Updates the content of the the pin related fields.
//    * @this Blockly.Block
//    */
//   updateFields: function() {
//     Blockly.Arduino.Boards.refreshBlockFieldDropdown(
//         this, 'BUILT_IN_LED', 'builtinLed');
//   },
//   /** @return {!string} The type of input value for the block, an integer. */
//   getBlockType: function() {
//     return Blockly.Types.BOOLEAN;
//   },
// };
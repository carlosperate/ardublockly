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

Blockly.Blocks['io_digitalwrite'] = {
  /**
   * Block for creating a 'set pin' to a state.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendValueInput('STATE')
        .appendField(Blockly.Msg.ARD_DIGITALWRITE)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'PIN')
        .appendField(Blockly.Msg.ARD_WRITE_TO)
        .setCheck(Blockly.Types.BOOLEAN.checkList);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'PIN', 'digitalPins');
  }
};

Blockly.Blocks['io_digitalread'] = {
  /**
   * Block for creating a 'read pin'.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalRead');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DIGITALREAD)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'PIN');
    this.setOutput(true, Blockly.Types.BOOLEAN.output);
    this.setTooltip(Blockly.Msg.ARD_DIGITALREAD_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.BOOLEAN;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'PIN', 'digitalPins');
  }
};

Blockly.Blocks['io_digitalread_pullup'] = {
  /**
   * Block for creating a 'read pin'.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/digital-io/pinmode/");
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DIGITALREAD_PULLUP)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'PIN');
    this.setOutput(true, Blockly.Types.BOOLEAN.output);
    this.setTooltip(Blockly.Msg.ARD_DIGITALREAD_PULLUP_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.BOOLEAN;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'PIN', 'digitalPins');
  }
};

Blockly.Blocks['io_builtin_led'] = {
  /**
   * Block for setting built-in LED to a state.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendValueInput('STATE')
        .appendField(Blockly.Msg.ARD_BUILTIN_LED)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.builtinLed), 'BUILT_IN_LED')
        .appendField(Blockly.Msg.ARD_WRITE_TO)
        .setCheck(Blockly.Types.BOOLEAN.checkList);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_BUILTIN_LED_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'BUILT_IN_LED', 'builtinLed');
  },
  /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.BOOLEAN;
  },
};

Blockly.Blocks['io_analogwrite'] = {
  /**
   * Block for creating a 'set pin' to an analogue value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogWrite');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendValueInput('NUM')
        .appendField(Blockly.Msg.ARD_ANALOGWRITE)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.pwmPins), 'PIN')
        .appendField(Blockly.Msg.ARD_WRITE_TO)
        .setCheck(Blockly.Types.NUMBER.output);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_ANALOGWRITE_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'pwmPins');
  },
  /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};

Blockly.Blocks['io_analogread'] = {
  /**
   * Block for reading an analogue input.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_ANALOGREAD)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.analogPins), 'PIN');
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_ANALOGREAD_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'analogPins');
  }
};

Blockly.Blocks['io_highlow'] = {
  /**
   * Block for creating a pin state.
   * @this Blockly.Block
   */
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
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.BOOLEAN;
  }
};

Blockly.Blocks['io_pulsein'] = {
  /**
   * Block for measuring the duration of a pulse in an input pin.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "type": "math_foo",
      "message0": Blockly.Msg.ARD_PULSE_READ,
      "args0": [{
          "type": "input_value",
          "name": "PULSETYPE",
          "check": Blockly.Types.BOOLEAN.check
        }, {
          "type": "field_dropdown",
          "name": "PULSEPIN",
          "options": Blockly.Arduino.Boards.selected.digitalPins
        }
      ],
      "output": Blockly.Types.NUMBER.output,
      "inputsInline": true,
      "colour": Blockly.Blocks.io.HUE,
      "tooltip": Blockly.Msg.ARD_PULSE_TIP,
      "helpUrl": 'https://www.arduino.cc/en/Reference/PulseIn'
    });
  },
  /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['io_pulsetimeout'] = {
  /**
   * Block for measuring (with a time-out) the duration of a pulse in an input
   * pin.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "type": "math_foo",
      "message0": Blockly.Msg.ARD_PULSE_READ_TIMEOUT,
      "args0": [{
          "type": "input_value",
          "name": "PULSETYPE",
          "check": Blockly.Types.BOOLEAN.check
        }, {
          "type": "field_dropdown",
          "name": "PULSEPIN",
          "options": Blockly.Arduino.Boards.selected.digitalPins
        }, {
          "type": "input_value",
          "name": "TIMEOUT",
          "check": Blockly.Types.NUMBER.check
        }
      ],
      "output": Blockly.Types.NUMBER.output,
      "inputsInline": true,
      "colour": Blockly.Blocks.io.HUE,
      "tooltip": Blockly.Msg.ARD_PULSETIMEOUT_TIP,
      "helpUrl": 'https://www.arduino.cc/en/Reference/PulseIn'
    });
  },
  /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['mkpad_setup'] = {
  /**
   * Block for setup 4 x 4 Membrane Key Pad with 4 Row pins and 4 Column pins
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/libraries/keypad/');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_MKPAD_SETUP);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_MKPAD_ROW1)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'ROW1')
        .appendField(Blockly.Msg.ARD_MKPAD_ROW2)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'ROW2')
        .appendField(Blockly.Msg.ARD_MKPAD_ROW3)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'ROW3')
        .appendField(Blockly.Msg.ARD_MKPAD_ROW4)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'ROW4');
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_MKPAD_COL1)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'COL1')
        .appendField(Blockly.Msg.ARD_MKPAD_COL2)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'COL2')
        .appendField(Blockly.Msg.ARD_MKPAD_COL3)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'COL3')
        .appendField(Blockly.Msg.ARD_MKPAD_COL4)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'COL4');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_MKPAD_SETUP_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'ROW1', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'ROW2', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'ROW3', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'ROW4', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'COL1', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'COL2', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'COL3', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'COL4', 'digitalPins');
  }
};

Blockly.Blocks['mkpad_getkey'] = {
  /**
   * Block for getting the pressed key from a 4x4 Membrane Keypad.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/libraries/keypad/');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_MKPAD_SETUP)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'ROW1');
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_MKPAD_GETKEY_TIP);
  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'ROW1', 'digitalPins');
  }
};

Blockly.Blocks['irrecv_setup'] = {
  /**
   * Block for setup KY-022 Infrared Receiver Sensor Module.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/libraries/irremote/');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_IRRECV_SETUP)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'PIN')
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_IRRECV_SETUP_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'PIN', 'digitalPins');
  }
};

Blockly.Blocks['irrecv_read'] = {
  /**
   * Block for receiving values from remote by KY-022 Infrared Receiver Sensor Module.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/libraries/irremote/');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_IRRECV_READ)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'PIN');
    this.setInputsInline(false);
    this.setTooltip(Blockly.Msg.ARD_IRRECV_READ_TIP);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setOutput(true, Blockly.Types.NUMBER.output);
  },
  /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'PIN', 'digitalPins');
  }
};

Blockly.Blocks['rc522_setup'] = {
  /**
   * Block for setup RFID MFRC522 Radio-Frequency IDentification (RFID) Scanner Module.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/libraries/mfrc522/');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_RC522_SETUP)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'RST')
        .appendField(Blockly.Msg.ARD_RC522_SETUP_SS)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), 'SS');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_RC522_SETUP_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'RST', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SS', 'digitalPins');
  }
};

Blockly.Blocks['rc522_getuid'] = {
  /**
   * Block for getting uid from a card or pad using RFID RC522.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/libraries/mfrc522/');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendValueInput('VAR').appendField(Blockly.Msg.ARD_RC522_GETUID);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_RC522_GETUID_TIP);
  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.TEXT;
  }
};

Blockly.Blocks['rc522_adduid'] = {
  /**
   * Block for adding uid to code
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/libraries/mfrc522/');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendValueInput("NUID").appendField(Blockly.Msg.ARD_RC522_ADDUID);
    this.appendValueInput("VAR").appendField(Blockly.Msg.ARD_RC522_ADDUID_AS);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_RC522_ADDUID_TIP);
  } ,
  /** @return {string} The type of return value for the block, a string. */
  getBlockType: function() {
    return Blockly.Types.TEXT;
  }
};

Blockly.Blocks['io_shiftout'] = {
  /**
   * Block for shiftOut() function of Arduino 
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/reference/en/language/functions/advanced-io/shiftout/');
    this.setColour(Blockly.Blocks.various.HUE);
    this.appendDummyInput().appendField(Blockly.Msg.ARD_SHIFTOUT)
	.appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "DATA")
	.appendField(Blockly.Msg.ARD_SHIFTOUT_C)
	.appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),"CLK")
	.appendField(Blockly.Msg.ARD_SHIFTOUT_O)
	.appendField(new Blockly.FieldDropdown([["MSBFIRST","MSBFIRST"],["LSBFIRST","LSBFIRST"]]), "BO");
    this.appendValueInput("BVAL").appendField(Blockly.Msg.ARD_SHIFTOUT_B);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.ARD_SHIFTOUT_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'DATA', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'CLK', 'digitalPins');
  }
};



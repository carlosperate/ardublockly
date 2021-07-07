/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for the Arduino serial communication functions.
 *     The Arduino built in functions syntax can be found at:
 *     http://arduino.cc/en/Reference/HomePage
 *
 * TODO: There are more function that can be added:
 *       http://arduino.cc/en/Reference/Serial
 */
'use strict';

goog.provide('Blockly.Blocks.serial');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.serial.HUE = 160;

Blockly.Blocks['serial_setup'] = {
  /**
   * Block for setting the speed of the serial connection.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Serial/Begin');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERIAL_SETUP)
        .appendField(
			new Blockly.FieldInstance('Serial',
					  'Serial_0',
					  true, true, false),
            'SERIAL_ID')	
        .appendField(Blockly.Msg.ARD_SERIAL_SPEED)
        .appendField(
            new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.serialSpeed), 'SPEED')
        .appendField(Blockly.Msg.ARD_SERIAL_BPS);
		
    this.appendDummyInput('PINS')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_SERIAL_RX_PIN)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'ARD_SERIAL_RX_PIN')
        .appendField(Blockly.Msg.ARD_SERIAL_TX_PIN)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'ARD_SERIAL_TX_PIN');
		

    this.setTooltip(Blockly.Msg.ARD_SERIAL_SETUP_TIP);
  },
  /**
   * Returns the serial instance name.
   * @return {!string} Serial instance name.
   * @this Blockly.Block
   */
  getSerialSetupInstance: function() {
    return this.getFieldValue('SERIAL_ID');
  },
  /**
   * Updates the content of the the serial related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SERIAL_ID', 'serial');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SPEED', 'serialSpeed');
  }
};

Blockly.Blocks['serial_print'] = {
  /**
   * Block for creating a write to serial com function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://www.arduino.cc/en/Serial/Print');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.serial), 'SERIAL_ID')
        .appendField(Blockly.Msg.ARD_SERIAL_PRINT);
    this.appendValueInput('CONTENT');
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'NEW_LINE')
        .appendField(Blockly.Msg.ARD_SERIAL_PRINT_NEWLINE);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_SERIAL_PRINT_TIP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of serial_setup and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    // Get the Serial instance from this block
    var thisInstanceName = this.getFieldValue('SERIAL_ID');
    // Iterate through top level blocks to find setup instance for the serial id
    var blocks = Blockly.mainWorkspace.getTopBlocks();
    var setupInstancePresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getSerialSetupInstance;
      if (func) {
        var setupBlockInstanceName = func.call(blocks[x]);
        if (thisInstanceName == setupBlockInstanceName) {
          setupInstancePresent = true;
          break;
        }
      }
    }

    if (!setupInstancePresent) {
      this.setWarningText(Blockly.Msg.ARD_SERIAL_PRINT_WARN.replace('%1',
          thisInstanceName), 'serial_setup');
    } else {
      this.setWarningText(null, 'serial_setup');
    }
  },
  /**
   * Updates the content of the the serial related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SERIAL_ID', 'serial');
  }
};




Blockly.Blocks['serial_boolean'] = {
  /**
   * Block for boolean data type: true and false.
   * @this Blockly.Block
   */
  init: function() {

    this.jsonInit({
      //"message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "BOOL",
/*           "options": [
            [Blockly.Msg.LOGIC_BOOLEAN_TRUE, "TRUE"],
            [Blockly.Msg.LOGIC_BOOLEAN_FALSE, "FALSE"]
          ] */
        }
      ],
      "output": Blockly.Types.BOOLEAN.output,
/*       "colour": Blockly.Blocks.serial.HUE,
      "tooltip": Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP,
      "helpUrl": Blockly.Msg.LOGIC_BOOLEAN_HELPURL */
    });
	this.setColour(Blockly.Blocks.serial.HUE);

	this.appendDummyInput()
	.appendField(
		new Blockly.FieldInstance('Serial',
								  Blockly.Msg.ARD_SERIAL_DEFAULT_NAME,
								  false, true, false),
		'SERIAL_ID')
	.appendField(Blockly.Msg.ARD_SERIAL_IS_ACTIVE);
  },
  /** Assigns a type to the boolean block. */
  getBlockType: function() {
    return Blockly.Types.BOOLEAN;
  }
};



Blockly.Blocks['serial_read'] = {
  /**
   * Block for numeric value.
   * @this Blockly.Block
   */
  init: function() {
	this.setColour(Blockly.Blocks.serial.HUE);

	this.appendDummyInput()
	.appendField(Blockly.Msg.ARD_SERIAL_READ)
	.appendField(
		new Blockly.FieldInstance('Serial',
								  Blockly.Msg.ARD_SERIAL_DEFAULT_NAME,
								  false, true, false),
		'SERIAL_ID');
		
    this.setOutput(true, Blockly.Types.NUMBER.output);
    // Assign 'this' to a variable for use in the tooltip closure below.

  },
  /**
   * Reads the numerical value from the block and assigns a block type.
   * @this Blockly.Block
   */
  getBlockType: function() {
    //var numString = this.getFieldValue('NUM');
	var numString = '44';
    return Blockly.Types.identifyNumber(numString);
  }
};
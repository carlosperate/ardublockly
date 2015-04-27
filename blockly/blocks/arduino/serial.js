/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Blocks for the Arduino serial communication functions.
 *               The Arduino built in functions syntax can be found at:
 *               http://arduino.cc/en/Reference/HomePage
 *
 * TODO: There are more function that can be added:
 *       http://arduino.cc/en/Reference/Serial
 */
'use strict';

goog.provide('Blockly.Blocks.Arduino.serial');

goog.require('Blockly.Arduino');


Blockly.Blocks.Arduino.serial.HUE = 160;

Blockly.Blocks['serial_print'] = {
  /**
   * Block for creating a write to serial com function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://www.arduino.cc/en/Serial/Print');
    this.setColour(Blockly.Blocks.Arduino.serial.HUE);
    this.appendDummyInput()
        .appendField(
            new Blockly.FieldDropdown(profile.default.serial), 'SERIAL_ID')
        .appendField('print');
    this.appendValueInput('CONTENT', Blockly.StaticTyping.blocklyType.TEXT)
        .setCheck(Blockly.StaticTyping.blocklyType.TEXT);
    this.appendDummyInput()
        .appendField('with new line')
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'NEW_LINE');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Prints data to the console/serial port as ' +
                    'human-readable ASCII text.');
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of serial_speed and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) {
      // Block has been deleted.
      return;
    }
    // Get the Serial instance from this block
    var InstanceName = null;
    var InstanceName = this.getFieldValue('SERIAL_ID');

   // Iterate through blocks to find a setup instance for the same serial id.
    var blocks = Blockly.mainWorkspace.getAllBlocks();
    var setupInstancePresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getSerialSetupInstance;
      if (func) {
        var setupBlockInstanceName = func.call(blocks[x]);
        if (InstanceName == setupBlockInstanceName) {
          setupInstancePresent = true;
        }
      }
    }

    if (!setupInstancePresent) {
      this.setWarningText('A setup block for '+ InstanceName + ' must be ' +
                          'added to the workspace to use this block!');
    } else {
      this.setWarningText(null);
    } /* */
  }
};

Blockly.Blocks['serial_speed'] = {
  /**
   * Block for setting the speed of the serial connection.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Serial/Begin');
    this.setColour(Blockly.Blocks.Arduino.serial.HUE);
    this.appendDummyInput()
        .appendField('setup: ')
        .appendField(
            new Blockly.FieldDropdown(profile.default.serial), 'SERIAL_ID')
        .appendField('speed')
        .appendField(
            new Blockly.FieldDropdown(profile.default.serial_speed), 'SPEED')
        .appendField('bps');
    this.setInputsInline(true);
    this.setTooltip('Selects the speed for a specific Serial peripheral');
  },
  /**
   * Returns the serial_speed instance name, defined in the 'SERIAL_ID' drop
   * down of this block.
   * @return {!Array.<string>} List with the instance name.
   * @this Blockly.Block
   */
  getSerialSetupInstance: function() {
    var instanceName = this.getFieldValue('SERIAL_ID');
    return [instanceName];
  }
};

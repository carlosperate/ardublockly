/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino blocks for the Servo library.
 *     The Arduino Servo functions can be found in
 *     http://arduino.cc/en/reference/servo
 *
 * TODO: Add angle selector instead of block input.
 */
'use strict';

goog.provide('Blockly.Blocks.servo');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.servo.HUE = 60;

Blockly.Blocks['servo_write'] = {
  /**
   * Block for writing an angle value into a servo PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoWrite');
    this.setColour(Blockly.Blocks.servo.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_WRITE)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.pwmPins), 'SERVO_PIN');
    this.setInputsInline(false);
    this.appendValueInput('SERVO_ANGLE')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_SERVO_WRITE_TO);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_WRITE_DEG_180);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_SERVO_WRITE_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SERVO_PIN', 'pwmPins');
  }
};

Blockly.Blocks['servo_read'] = {
  /**
   * Block for reading an angle value of a servo PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoRead');
    this.setColour(Blockly.Blocks.servo.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_READ)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.pwmPins), 'SERVO_PIN');
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_SERVO_READ_TIP);
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
        this, 'SERVO_PIN', 'pwmPins');
  }
};

Blockly.Blocks['servo_config_hub'] = {
  /**
   * Block for adding a servo to a hub.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../media/arduino/Servo.png", 19, 19, "*"))
        .appendField(Blockly.Msg.ARD_SERVOHUB)
        .appendField(new Blockly.Blocks.ComponentFieldVariable(
        Blockly.Msg.ARD_SERVO_DEFAULT_NAME, 'Servo'), 'NAMESERVO')
        .appendField(Blockly.Msg.ARD_SERVO_TYPE)
        .appendField(
            new Blockly.FieldDropdown([ 
                                       [Blockly.Msg.ARD_180SERVO, '180SERVO'],
                                       [Blockly.Msg.ARD_360SERVO, '360SERVO']
                                      ]),
           'SERVOTYPE');
    this.setOutput(true, "HUB_PWM");
    this.setColour(Blockly.Blocks.servo.HUE);
    this.setTooltip(Blockly.Msg.ARD_SERVOHUB_TIP);
    this.setHelpUrl('https://wiki.microduino.cc/index.php/Servo');
  },
  /**
   * Set the connection pins that the component connects to
   * @param {array} array of the connections (as string, eg '1', 'SDA', 'A1', ...
   * @this Blockly.Block
   */
  setHubConnector: function(connector) {
    this['connector'] = connector;
  },
  /**
   * Return the name of the component defined in this block
   * @return {!<string>} The name of the component
   * @this Blockly.Block
   */
  getComponentName: function() {
    return 'Servo';
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('NAMESERVO')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAMESERVO'))) {
      this.setFieldValue(newName, 'NAMESERVO');
    }
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['servohub_write'] = {
  /**
   * Block for writing an angle value into a servo PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoWrite');
    this.setColour(Blockly.Blocks.servo.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVOHUB_WRITE)
        .appendField(new Blockly.Blocks.ComponentFieldVariable(
        Blockly.Msg.ARD_SERVO_DEFAULT_NAME, 'Servo'), 'SERVO_NAME');
    this.setInputsInline(false);
    this.appendValueInput('SERVO_ANGLE')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_SERVO_WRITE_TO);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_WRITE_DEG_180);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_SERVO_WRITE_TIP);
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('SERVO_NAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('SERVO_NAME'))) {
      this.setFieldValue(newName, 'SERVO_NAME');
    }
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of servos and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    var currentDropdown = this.getFieldValue('SERVO_NAME');
    if (Blockly.Blocks.ComponentFieldVariable.CheckSetupPresent(this.workspace, currentDropdown, 'Servo')) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid config
      this.setWarningText(Blockly.Msg.ARD_COMPONENT_WARN1.replace('%1', Blockly.Msg.ARD_SERVO_COMPONENT).replace('%1', Blockly.Msg.ARD_SERVO_COMPONENT));
    }
  }
};

Blockly.Blocks['servohub_read'] = {
  /**
   * Block for reading an angle value of a servo PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoRead');
    this.setColour(Blockly.Blocks.servo.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVOHUB_READ)
        .appendField(new Blockly.Blocks.ComponentFieldVariable(
        Blockly.Msg.ARD_SERVO_DEFAULT_NAME, 'Servo'), 'SERVO_NAME');
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_SERVO_READ_TIP);
  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('SERVO_NAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('SERVO_NAME'))) {
      this.setFieldValue(newName, 'SERVO_NAME');
    }
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of servos and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    var currentDropdown = this.getFieldValue('SERVO_NAME');
    if (Blockly.Blocks.ComponentFieldVariable.CheckSetupPresent(this.workspace, currentDropdown, 'Servo')) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid config
      this.setWarningText(Blockly.Msg.ARD_COMPONENT_WARN1.replace('%1', Blockly.Msg.ARD_SERVO_COMPONENT).replace('%1', Blockly.Msg.ARD_SERVO_COMPONENT));
    }
  }
};


Blockly.Blocks['servohub_write2'] = {
  /**
   * Block for writing an angle value into a servo PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoWrite');
    this.setColour(Blockly.Blocks.servo.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_ROTATE360)
        .appendField(new Blockly.Blocks.ComponentFieldVariable(
        Blockly.Msg.ARD_SERVO_DEFAULT_NAME, 'Servo'), 'SERVO_NAME');
    this.appendValueInput('SERVO_SPEED')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_SERVO_ROTATESPEED);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_ROTATEPERC);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_SERVO_ROTATE_TIP);
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('SERVO_NAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('SERVO_NAME'))) {
      this.setFieldValue(newName, 'SERVO_NAME');
    }
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of servos and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    var currentDropdown = this.getFieldValue('SERVO_NAME');
    if (Blockly.Blocks.ComponentFieldVariable.CheckSetupPresent(this.workspace, currentDropdown, 'Servo')) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid config
      this.setWarningText(Blockly.Msg.ARD_COMPONENT_WARN1.replace('%1', Blockly.Msg.ARD_SERVO_COMPONENT).replace('%1', Blockly.Msg.ARD_SERVO_COMPONENT));
    }
  }
};

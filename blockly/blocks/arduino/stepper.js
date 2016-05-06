/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino Stepper library.
 *     The Arduino Servo functions syntax can be found in the following URL:
 *     http://arduino.cc/en/Reference/Stepper
 *     Additional functions apart from the normal generators have been added to
 *     be able to generate the 'set' drop down menu with all current instances
 *     of the Stepper class:
 *         Blockly.Blocks.stepper.stepperInstances
 *         Blockly.Blocks.stepper.FieldStepperInstance
 *         Blockly.Blocks.stepper.stepperDropdownList
 *
 * TODO: Still need to had some kind of handler to refresh the "set" drop down
 *     menu values if an instance in a 'configure' block is renamed.
 */
'use strict';

goog.provide('Blockly.Blocks.stepper');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.stepper.HUE = 80;

Blockly.Blocks['stepper_config'] = {
  /**
   * Block for for the stepper generator configuration including creating
   * an object instance and setting up the speed. Info in the setHelpUrl link.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/StepperConstructor');
    this.setColour(Blockly.Blocks.stepper.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_STEPPER_SETUP)
        .appendField(new Blockly.Blocks.ComponentFieldVariable(
        Blockly.Msg.ARD_STEPPER_DEFAULT_NAME, 'Stepper'), 'STEPPER_NAME')
        .appendField(Blockly.Msg.ARD_STEPPER_MOTOR);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_STEPPER_PIN1)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'STEPPER_PIN1')
        .appendField(Blockly.Msg.ARD_STEPPER_PIN2)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'STEPPER_PIN2');
    this.appendValueInput('STEPPER_STEPS')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_STEPPER_REVOLVS);
    this.appendValueInput('STEPPER_SPEED')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_STEPPER_SPEED);
    this.setTooltip(Blockly.Msg.ARD_STEPPER_SETUP_TIP);
  },
  /**
   * Return the name of the component defined in this block
   * @return {!<string>} The name of the component
   * @this Blockly.Block
   */
  getComponentName: function() {
    return 'Stepper';
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('STEPPER_NAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('STEPPER_NAME'))) {
      this.setFieldValue(newName, 'STEPPER_NAME');
    }
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.ARRAY;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Boards.refreshBlockFieldDropdown(
        this, 'STEPPER_PIN1', 'digitalPins');
    Blockly.Boards.refreshBlockFieldDropdown(
        this, 'STEPPER_PIN2', 'digitalPins');
  }
};

Blockly.Blocks['stepper_step'] = {
  /**
   * Block for for the stepper 'step()' function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/StepperStep');
    this.setColour(Blockly.Blocks.stepper.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_STEPPER_STEP)
        .appendField(new Blockly.Blocks.ComponentFieldVariable(
        Blockly.Msg.ARD_STEPPER_DEFAULT_NAME, 'Stepper'), 'STEPPER_NAME')
    this.appendValueInput('STEPPER_STEPS')
        .setCheck(Blockly.Types.NUMBER.checkList);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_STEPPER_STEPS);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.ARD_STEPPER_STEP_TIP);
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('STEPPER_NAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('STEPPER_NAME'))) {
      this.setFieldValue(newName, 'STEPPER_NAME');
    }
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.ARRAY;
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of stepper_config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    var currentDropdown = this.getFieldValue('STEPPER_NAME');
    if (Blockly.Blocks.ComponentFieldVariable.CheckSetupPresent(this.workspace, currentDropdown, 'Stepper')) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid stepper config
      this.setWarningText(Blockly.Msg.ARD_COMPONENT_WARN1.replace('%1', Blockly.Msg.ARD_STEPPER_COMPONENT).replace('%1', Blockly.Msg.ARD_STEPPER_COMPONENT));
    }
  }
};

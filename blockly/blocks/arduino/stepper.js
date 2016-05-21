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

/** Strings for easy reference. */
Blockly.Blocks.stepper.noInstance = 'No_Instances';
Blockly.Blocks.stepper.noName = 'Empty_input_name';

/**
 * Finds all user-created instances of the Stepper block config.
 * @return {!Array.<string>} Array of instance names.
 */
Blockly.Blocks.stepper.stepperInstances = function() {
  var stepperList = [];
  var blocks = Blockly.mainWorkspace.getTopBlocks();
  for (var x = 0; x < blocks.length; x++) {
    var getStepperSetupInstance = blocks[x].getStepperSetupInstance;
    if (getStepperSetupInstance) {
      var stepperInstance = getStepperSetupInstance.call(blocks[x]);
        if (stepperInstance) {
          stepperList.push(stepperInstance);
        }
    }
  }
  return stepperList;
};

/**
 * Return a sorted list of instances names for set dropdown menu.
 * @return {!Array.<string>} Array of stepper instances names.
 */
Blockly.Blocks.stepper.stepperDropdownList = function() {
  var stepperList = Blockly.Blocks.stepper.stepperInstances();
  var options = [];
  if (stepperList.length > 0) {
    stepperList.sort(goog.string.caseInsensitiveCompare);
    // Variables are not language-specific, use the name as both the
    // user-facing text and the internal representation.
    for (var x = 0; x < stepperList.length; x++) {
      options[x] = [stepperList[x], stepperList[x]];
    }
  } else {
    // There are no config blocks in the work area
    options[0] = [Blockly.Blocks.stepper.noInstance,
                  Blockly.Blocks.stepper.noInstance];
  }
  return options;
};

/**
 * Class for a variable's dropdown field.
 * @extends {Blockly.FieldDropdown}
 * @constructor
 */
Blockly.Blocks.stepper.FieldStepperInstance = function() {
  Blockly.Blocks.stepper.FieldStepperInstance.superClass_.constructor
      .call(this, Blockly.Blocks.stepper.stepperDropdownList);
};
goog.inherits(
    Blockly.Blocks.stepper.FieldStepperInstance, Blockly.FieldDropdown);


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
        .appendField(new Blockly.FieldTextInput('MyStepper'), 'STEPPER_NAME')
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
   * Returns the stepper instance name, defined in the 'STEPPER_NAME' input
   * String block attached to this block.
   * @return {!string} List with the instance name.
   * @this Blockly.Block
   */
  getStepperSetupInstance: function() {
    var InstanceName = this.getFieldValue('STEPPER_NAME');
    if (!InstanceName) {
      InstanceName = Blockly.Blocks.stepper.noName;
    }
    // Replace all spaces with underscores
    return InstanceName.replace(/ /g, '_');
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
        .appendField(new Blockly.Blocks.stepper.FieldStepperInstance(),
            'STEPPER_NAME');
    this.appendValueInput('STEPPER_STEPS')
        .setCheck(Blockly.Types.NUMBER.checkList);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_STEPPER_STEPS);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.ARD_STEPPER_STEP_TIP);
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
    var instances = Blockly.Blocks.stepper.stepperDropdownList();

    // Check for configuration block presence
    if (instances[0][0] === Blockly.Blocks.stepper.noInstance) {
      // Ensure dropdown menu says there is no config block
      if (currentDropdown !== Blockly.Blocks.stepper.noInstance) {
        this.setFieldValue(Blockly.Blocks.stepper.noInstance, 'STEPPER_NAME');
      }
      this.setWarningText(Blockly.Msg.ARD_STEPPER_STEP_WARN1);
    } else {
      // Configuration blocks present, check if any selected and contains name
      var existingConfigSelected = false;
      for (var x = 0; x < instances.length; x++) {
        // Check if any of the config blocks does not have a name
        if (instances[x][0] === Blockly.Blocks.stepper.noName) {
          // If selected config has no name either, set warning and exit func
          if (currentDropdown === Blockly.Blocks.stepper.noName) {
            this.setWarningText(Blockly.Msg.ARD_STEPPER_STEP_WARN2);
            return;
          }
        } else if (instances[x][0] === currentDropdown) {
          existingConfigSelected = true;
        }
      }

      // At this point select config has a name, check if it exist
      if (existingConfigSelected) {
        // All good, just remove any warnings and exit the function
        this.setWarningText(null);
      } else {
        if ((currentDropdown === Blockly.Blocks.stepper.noName) ||
            (currentDropdown === Blockly.Blocks.stepper.noInstance)) {
          // Just pick the first config block
          this.setFieldValue(instances[0][0], 'STEPPER_NAME');
          this.setWarningText(null);
        } else {
          // Al this point just set a warning to select a valid stepper config
          this.setWarningText(Blockly.Msg.ARD_STEPPER_STEP_WARN3);
        }
      }
    }
  }
};

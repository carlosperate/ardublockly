/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Blocks for Arduino Stepper library.
 *               The Arduino Servo functions syntax can be found in the 
 *               following URL: http://arduino.cc/en/Reference/Stepper
 *               Additional functions apart from the normal generators have 
 *               been added to be able to generate the 'set' drop down menu 
 *               with all current instances of the Stepper class:
 *               Blockly.Blocks.Arduino.stepper.stepperInstances
 *               Blockly.Blocks.Arduino.stepper.FieldStepperInstance
 *               Blockly.Blocks.Arduino.stepper.stepperDropdownList
 *
 * TODO: Still need to had some kind of handler to refresh the "set" drop down
 *       menu values if an instance in a 'configure' block is renamed.
 */
'use strict';

goog.provide('Blockly.Blocks.Arduino.stepper');

goog.require('Blockly.FieldDropdown');

goog.require('Blockly.Arduino');


Blockly.Blocks.Arduino.stepper.HUE = 75;

/**
 * Strings for easy reference
 */
Blockly.Blocks.Arduino.stepper.noInstance = 'No_Instances';
Blockly.Blocks.Arduino.stepper.noName = 'Empty_input_name';

/**
 * Finds all user-created instances of the Stepper block config.
 * @return {!Array.<string>} Array of instance names.
 */
Blockly.Blocks.Arduino.stepper.stepperInstances = function() {
  var stepperList = [];
  var blocks = Blockly.mainWorkspace.getAllBlocks();
  for (var x = 0; x < blocks.length; x++) {
    var getStepperInstance = blocks[x].getStepperInstance;
    if (getStepperInstance) {
      var stepperInstance = getStepperInstance.call(blocks[x]);
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
Blockly.Blocks.Arduino.stepper.stepperDropdownList = function() {
  var stepperList = Blockly.Blocks.Arduino.stepper.stepperInstances();
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
    options[0] = [Blockly.Blocks.Arduino.stepper.noInstance, 
                  Blockly.Blocks.Arduino.stepper.noInstance];
  }
  return options;
};

/**
 * Class for a variable's dropdown field.
 * @extends {Blockly.FieldDropdown}
 * @constructor
 */
Blockly.Blocks.Arduino.stepper.FieldStepperInstance = function() {
  Blockly.Blocks.Arduino.stepper.FieldStepperInstance.superClass_.constructor.call(
      this, Blockly.Blocks.Arduino.stepper.stepperDropdownList);
};
goog.inherits(
    Blockly.Blocks.Arduino.stepper.FieldStepperInstance, Blockly.FieldDropdown);


Blockly.Blocks['stepper_config'] = {
  /**
   * Block for for the stepper generator configuration including creating
   * an object instance and setting up the speed. Info in the setHelpUrl link.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/StepperConstructor');
    this.setColour(Blockly.Blocks.Arduino.stepper.HUE);
    this.appendDummyInput()
        .appendField("setup stepper")
        .appendField(new Blockly.FieldTextInput("MyStepper"), 'STEPPER_NAME');
    this.appendDummyInput()
        .appendField('pin1#')
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'STEPPER_PIN1')
        .appendField('pin2#')
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'STEPPER_PIN2');
    this.appendValueInput('STEPPER_STEPS')
        .setCheck(Blockly.StaticTyping.blocklyType.NUMBER)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('steps in one revolution');
    this.appendValueInput('STEPPER_SPEED')
        .setCheck(Blockly.StaticTyping.blocklyType.NUMBER)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('set speed to');
    this.setTooltip('Configures a stepper motor pinout and other settings');
  },
  /**
   * Returns the stepper instance name, defined in the 'STEPPER_NAME' input
   * String block attached to this block.
   * @return {!Array.<string>} List with the instance name.
   * @this Blockly.Block
   */
  getStepperInstance: function() {
    var InstanceName = this.getFieldValue('STEPPER_NAME');
    if (!InstanceName) {
      InstanceName = Blockly.Blocks.Arduino.stepper.noName;
    }
    // Replace all spaces with underscores
    return InstanceName.replace(/ /g, '_');;
  },
  /** Updates the content of the the pin related fields. */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'STEPPER_PIN1', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
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
    this.setColour(Blockly.Blocks.Arduino.stepper.HUE);
    this.appendDummyInput()
        .appendField('stepper')
        .appendField(new Blockly.Blocks.Arduino.stepper.FieldStepperInstance(),
            'STEPPER_NAME');
    this.appendValueInput('STEPPER_STEPS')
        .setCheck(Blockly.StaticTyping.blocklyType.NUMBER)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('move');
    this.appendDummyInput()
        .appendField('steps');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Turns the stepper motor a specific number of steps.');

    /* For now the FieldStepperInstance is required, will need to replicate
       functionality for JSON implementation.
    this.jsonInit({
      "message0": "stepper %1 move %2 steps",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "STEPPER_NAME",
          "options": Blockly.Blocks.Arduino.stepper.stepperDropdownList()
        },
        {
          "type": "input_value",
          "name": "STEPPER_STEPS",
          "align": "RIGHT"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Blocks.Arduino.stepper.HUE,
      "tooltip": "Turns the stepper motor a specific number of steps.",
      "helpUrl": "http://arduino.cc/en/Reference/StepperStep"
    });*/
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of stepper_config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) {
      // Block has been deleted.
      return;
    }

    var currentDropdown = this.getFieldValue('STEPPER_NAME');
    var instances = Blockly.Blocks.Arduino.stepper.stepperDropdownList();

    // Check for configuration block presence
    if (instances[0][0] === Blockly.Blocks.Arduino.stepper.noInstance) {
      // Ensure dropdown menu says there is no config block
      if (currentDropdown !== Blockly.Blocks.Arduino.stepper.noInstance) {
        this.setFieldValue(
            Blockly.Blocks.Arduino.stepper.noInstance, 'STEPPER_NAME');
      }
      this.setWarningText(
          'A STEPPER configuration block must be added to use this block!');
    } else {
      // Configuration blocks present, check if any selected and contains name
      var existingConfigSelected = false;
      for (var x = 0; x < instances.length; x++) {
        // Check if any of the config blocks does not have a name
        if (instances[x][0] === Blockly.Blocks.Arduino.stepper.noName) {
          // If selected config has no name either, set warning and exit func
          if (currentDropdown === Blockly.Blocks.Arduino.stepper.noName) {
            this.setWarningText('A Name input must be added to the Stepper ' +
                                'configuration block!');
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
        if ((currentDropdown === Blockly.Blocks.Arduino.stepper.noName) ||
            (currentDropdown === Blockly.Blocks.Arduino.stepper.noInstance)) {
          // Just pick the first config block
          this.setFieldValue(instances[0][0], 'STEPPER_NAME');
          this.setWarningText(null);
        } else {
          // Al this point just set a warning to select a valid stepper config
          this.setWarningText('Selected stepper does not exist any more, ' +
                              'please select a new one.');
        }
      }
    }
  }
};

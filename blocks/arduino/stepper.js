/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Blocks for Arduino Stepper library.
 *               The Arduino Servo functions syntax can be found in the 
 *               following URL: http://arduino.cc/en/Reference/Stepper
 *               Additional functions apart from the normal generators have 
 *               been added to be able to generate the 'set' drop down menu 
 *               with all current instaces of the Stepper class:
 *               Blockly.Blocks.stepper.allInstances
 *               Blockly.Blocks.stepper.FieldStepperInstance
 *               Blockly.Blocks.stepper.FieldStepperInstance.dropdownCreate
 *
 * TODO: Still need to had some kind of handler to refresh the "set" drop down
 *       menu values if an instance in a 'configure' block is renamed.
 */
'use strict';

goog.provide('Blockly.Blocks.stepper');

goog.require('Blockly.FieldDropdown');

goog.require('Blockly.Arduino');


Blockly.Blocks.stepper.HUE = 75;

/**
 * Strings for easy reference
 */
Blockly.Blocks.stepper.no_instance = 'No_Instances';
Blockly.Blocks.stepper.no_name = 'Empty_input_name';

/**
 * Finds all user-created instances of the Stepper block config.
 * Based on Blockly.Variables.allVariables
 * @return {!Array.<string>} Array of instance names.
 */
Blockly.Blocks.stepper.allInstances = function() {
  var blocks = Blockly.mainWorkspace.getAllBlocks();
  var variableHash = Object.create(null);

  // Iterate through every block and add each Stetter config name to the hash.
  for (var x = 0; x < blocks.length; x++) {
    var func = blocks[x].getStepperInstance;
    if (func) {
      var blockVariables = func.call(blocks[x]);
      for (var y = 0; y < blockVariables.length; y++) {
        var varName = blockVariables[y];
        // Variable name may be null if the block is only half-built.
        if (varName) {
          variableHash[varName.toLowerCase()] = varName;
        }
      }
    }
  }
  // Flatten the hash into a list.
  var variableList = [];
  for (var name in variableHash) {
    variableList.push(variableHash[name]);
  }

  return variableList;
};

/**
 * Class for a variable's dropdown field.
 * @param {Function} opt_changeHandler A function that is executed when a new
 *     option is selected.  Its sole argument is the new option value.  Its
 *     return value is ignored.
 * @extends {Blockly.FieldDropdown}
 * @constructor
 */
Blockly.Blocks.stepper.FieldStepperInstance = function() {
  Blockly.Blocks.stepper.FieldStepperInstance.superClass_.constructor.call(
      this,
      Blockly.Blocks.stepper.FieldStepperInstance.dropdownCreate);
};
goog.inherits(
    Blockly.Blocks.stepper.FieldStepperInstance, Blockly.FieldDropdown);

/**
 * Return a sorted list of instances names for set dropdown menu.
 * @return {!Array.<string>} Array of variable names.
 * @this {!Blockly.Blocks.stepper.FieldStepperInstance}
 */
Blockly.Blocks.stepper.FieldStepperInstance.dropdownCreate = function() {
  var variableList = Blockly.Blocks.stepper.allInstances();
  var options = [];
  if (variableList.length > 0) {
    variableList.sort(goog.string.caseInsensitiveCompare);
    // Variables are not language-specific, use the name as both the
    // user-facing text and the internal representation.
    for (var x = 0; x < variableList.length; x++) {
      options[x] = [variableList[x], variableList[x]];
    }
  } else {
    // There are no config blocks in the work area
    options[0] = [Blockly.Blocks.stepper.no_instance, 
        Blockly.Blocks.stepper.no_instance];
  }
  
  return options;
};

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
        .appendField('Configure STEPPER:');
    this.appendDummyInput()
        .appendField('PIN1#')
        .appendField(new Blockly.FieldDropdown(profile.default.digital),
            'STEPPER_PIN1')
        .appendField('PIN2#')
        .appendField(new Blockly.FieldDropdown(profile.default.digital),
            'STEPPER_PIN2');
    this.appendValueInput('STEPPER_STEPS')
        .setCheck('Number')
        .appendField('Steps in one revolution');
    this.appendValueInput('STEPPER_SPEED')
        .setCheck('Number')
        .appendField('Set speed to');
    this.appendValueInput('STEPPER_NAME')
        .setCheck('String')
        .appendField('Set name to');
    this.setTooltip('Configures a stepper motor pinout and other settings');
  },
  /**
   * Returns the stepper instance name, defined in the 'STEPPER_NAME' input
   * String block attached to this block.
   * @return {!Array.<string>} List with the instance name.
   * @this Blockly.Block
   */
  getStepperInstance: function() {
    var InstanceName;
    var instanceNameBlock = this.getInputTargetBlock('STEPPER_NAME');
    if (!instanceNameBlock) {
      InstanceName = Blockly.Blocks.stepper.no_name;
    } else {
      InstanceName = instanceNameBlock.getFieldValue('TEXT');
    }
    return [InstanceName];
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
    this.interpolateMsg(
        // TODO: Combine these messages instead of using concatenation.
        'STEPPER' + ' %1 ' +
        'move' + ' %2' + 'steps',
        ['STEPPER_NAME', new Blockly.Blocks.stepper.FieldStepperInstance()],
        ['STEPPER_STEPS', 'Number', Blockly.ALIGN_RIGHT],
        Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Turns the stepper motor a specific number of steps.');
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
    var instances =
        Blockly.Blocks.stepper.FieldStepperInstance.dropdownCreate();
    if (instances[0][0] === Blockly.Blocks.stepper.no_instance) {
      this.setWarningText('A STEPPER configuration block must be added to' +
          'use this block!');
    } else if (instances[0][0] === Blockly.Blocks.stepper.no_name) {
      this.setWarningText('A Name input must be added to the Stepper ' +
          'configuration block!');
    } else {
      this.setWarningText(null);
    }
  }
};

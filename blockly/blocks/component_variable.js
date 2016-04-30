/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Variable input field of a specific component type.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.ComponentFieldVariable');

goog.require('Blockly.Blocks');
//goog.require('Blockly.FieldVariable');


/**
 * Class for a variable's dropdown field.
 * @param {?string} varname The default name for the variable.  If null,
 *     a unique variable name will be generated.
 * @param {Function=} opt_validator A function that is executed when a new
 *     option is selected.  Its sole argument is the new option value.
 * @extends {Blockly.FieldVariable}
 * @constructor
 */
Blockly.Blocks.ComponentFieldVariable = function(varname, component_type, opt_validator) {
  this.component_type = component_type
  //override the dropdownCreate to use for this field
  this.dropdownCreate = Blockly.Blocks.ComponentFieldVariable.dropdownCreateComponents;
  Blockly.Blocks.ComponentFieldVariable.superClass_.constructor.call(this,
      varname, opt_validator);
  this.setValue(varname || '');
};
goog.inherits(Blockly.Blocks.ComponentFieldVariable, Blockly.FieldVariable);

/**
 * Install this dropdown on a block.
 * @param {!Blockly.Block} block The block containing this text.
 */
Blockly.Blocks.ComponentFieldVariable.prototype.init = function(block) {
  if (this.sourceBlock_) {
    // Dropdown has already been initialized once.
    return;
  }
  Blockly.Blocks.ComponentFieldVariable.superClass_.init.call(this, block);
};

Blockly.Blocks.ComponentFieldVariable.ComponentVariables = function(root, component_type) {
  var blocks;
  if (root.getDescendants) {
    // Root is Block.
    blocks = root.getDescendants();
  } else if (root.getAllBlocks) {
    // Root is Workspace.
    blocks = root.getAllBlocks();
  } else {
    throw 'Not Block or Workspace: ' + root;
  }
  var variableHash = Object.create(null);
  // Iterate through every block and add each variable to the hash.
  for (var x = 0; x < blocks.length; x++) {
    if (blocks[x].getComponentName && blocks[x].getVars && 
        (blocks[x].getComponentName() ==  component_type)) {
      var blockVariables = blocks[x].getVars();
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
 * Return a sorted list of variable names for variable dropdown menus.
 * Include a special option at the end for creating a new variable name.
 * @return {!Array.<string>} Array of variable names.
 * @this {!Blockly.FieldVariable}
 */
Blockly.Blocks.ComponentFieldVariable.dropdownCreateComponents = function() {
  if (this.sourceBlock_ && this.sourceBlock_.workspace) {
    var variableList =
        Blockly.Blocks.ComponentFieldVariable.ComponentVariables(this.sourceBlock_.workspace, 
                this.component_type);
  } else {
    var variableList = [];
  }
  // Ensure that the currently selected variable is an option.
  var name = this.getText();
  if (name && variableList.indexOf(name) == -1) {
    variableList.push(name);
  }
  variableList.sort(goog.string.caseInsensitiveCompare);
  variableList.push(Blockly.Msg.RENAME_VARIABLE);
  variableList.push(Blockly.Msg.NEW_VARIABLE);
  // Variables are not language-specific, use the name as both the user-facing
  // text and the internal representation.
  var options = [];
  for (var x = 0; x < variableList.length; x++) {
    options[x] = [variableList[x], variableList[x]];
  }
  return options;
};


/**
 * Finds all user-created instances of the ComponentFieldVariable block config.
 * @return {!Array.<string>} Array of instance names.
 */
Blockly.Blocks.ComponentFieldVariable.Instances = function(component_type) {
  var instList = [];
  var blocks = Blockly.mainWorkspace.getAllBlocks();
  for (var x = 0; x < blocks.length; x++) {
    var getSetupInstance = blocks[x].getComponentName;
    if (getSetupInstance) {
      var Instances = getSetupInstance.call();
      if (Instances) {
        if (Instances == component_type) {
          instList.push(blocks[x].getVars()[0]);
        }
      }
    }
  }
  return instList;
};

Blockly.Blocks.ComponentFieldVariable.CheckSetupPresent = function(currentDropdown, component_type) {
  var instances = Blockly.Blocks.ComponentFieldVariable.Instances(component_type);

  // Check for configuration block presence
  if (! instances) {
    return false;
  } else {
    // Configuration blocks present, check if any selected in this block
    var existingConfigSelected = false;
    for (var x = 0; x < instances.length; x++) {
      if (instances[x] === currentDropdown) {
        existingConfigSelected = true;
      }
    }
    if (existingConfigSelected) {
      return true;
    } else {
      return false;
    }
  }
}

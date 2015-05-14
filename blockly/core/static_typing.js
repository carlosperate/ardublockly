/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview 
 *
 *
 */
'use strict';

goog.provide('Blockly.StaticTyping');

goog.require('Blockly.Block');
goog.require('Blockly.Workspace');


/**
 * Class for a code static typing object that blockly types into a language
 * type.
 * @param {string} name Language name of this generator.
 * @constructor
 */
Blockly.StaticTyping = function(name) {
  this.name_ = name;
};

/** 
 * "Enum-like type" to create blockly variable types.
 * The number type is used to set a general number from the number block, the
 * block itself then analyses the contents and defines if it is an integer or
 * decimal number.
 */
Blockly.StaticTyping.blocklyType = {
  UNDEF: 'Undefined',
  UNSPECIFIED: 'Unspecified',
  NULL: 'Null',
  TEXT: 'Text',
  BOOLEAN: 'Boolean',
  NUMBER: 'Number',
  INTEGER: 'Integer',
  DECIMAL: 'Decimal',
  ERROR: 'Error',
  CHILD_TYPE_MISSING: 'ChildBlockTypeMissing'
};

/**
 * Navigates through the child blocks to get the block type.
 * @param {!Blockly.Block} block Block to navigate through children. 
 * @return {string} Type of the input block.
 */
Blockly.StaticTyping.getChildBlockType = function(block) {
  var blockType = null;
  var nextBlock = [block];
  while ((nextBlock[0].getType == null) &&
         (nextBlock[0].getChildren().length > 0)) {
    nextBlock = nextBlock[0].getChildren();
  }
  if (nextBlock[0] === block) {
    // Set variable block is empty, so no type yet
    blockType = Blockly.StaticTyping.blocklyType.UNDEF;
  } else {
    var func = nextBlock[0].getType;
    if (func) {
      blockType = nextBlock[0].getType();
    } else {
      //TOOD: this is for debugging, means inner block is missing getType
      blockType = Blockly.StaticTyping.blocklyType.CHILD_TYPE_MISSING;
    }
  }
  return blockType;
};

/**
 * Searches a variable name within an associate array of strings containing the
 * variable names as the key and their types as their values.
 * @param {string} varToFind String containing the name of the variable to find.
 * @param {Array<string>} existingVars Associative array containing the variable
 *                                     name as the key and type as value.
 * @return {string} Type of the input variable name.
 */
Blockly.StaticTyping.findListVarType = function(varToFind, existingVars) {
  for (var name in existingVars) {
    if (name === varToFind) {
      return existingVars[varToFind];
    }
  }
  return null;
};

/**
 * Navigates through the blocks collecting all variables and getting their type
 * into an associative array with the variable names as the keys and the type
 * as the values.
 * @param {Blockly.Workspace} workspace workspace to collect variables from.
 * @return {Array<string>} Associative array with the variable names as the keys
 *                         and the type as the values.
 */
Blockly.StaticTyping.getAllVarsWithTypes = function(workspace) {
  var blocks;
  if (workspace.getAllBlocks) {
    blocks = workspace.getAllBlocks();
  } else {
    throw 'Not valid workspace: ' + root;
  }

  var variableTypes = Object.create(null);
  for (var x = 0; x < blocks.length; x++) {
    var getVars = blocks[x].getVars;
    if (getVars) {
      // Iterate through the variables used in this block
      var blockVariables = getVars.call(blocks[x]);
      for (var y = 0; y < blockVariables.length; y++) {
        // Send variable list to getVarType, returns type if first encounter or
        // null if already defined.
        var getVarType = blocks[x].getVarType;
        if (getVarType) {
          var varType = getVarType.call(blocks[x], variableTypes);
          if (varType !== null) {
            variableTypes[blockVariables[y]] = varType;
          }
        } else {
          //TODO: Once all static typing code is done, default this to integer
          //variableTypes[blockVariables[y]] = 'getVarTypeNotDef';
        }
      }
    }
  }

  return variableTypes;
};

/**
 * Regular expression objects to do Number type recognition between an integer
 * and decimal.
 * @private
 */
Blockly.StaticTyping.regExpInt_ = new RegExp(/^\d+$/);
Blockly.StaticTyping.regExpFloat_ = new RegExp(/^[0-9]*[.][0-9]+$/);

/**
 * Navigates through the blocks collecting all variables and getting their type
 * into an associative array with the variable names as the keys and the type
 * as the values.
 * @param {String} String of the number to identify.
 * @return {!Blockly.StaticTyping.blocklyType} Blockly type.
 */
Blockly.StaticTyping.identifyNumber = function(numberString) {
    if (Blockly.StaticTyping.regExpInt_.test(numberString)) {
      return Blockly.StaticTyping.blocklyType.INTEGER;
    } else if (Blockly.StaticTyping.regExpFloat_.test(numberString)) {
      return Blockly.StaticTyping.blocklyType.DECIMAL;
    }
    //TODO: This is just a temporary value for easy bug catching.
    return Blockly.StaticTyping.blocklyType.ERROR;
};

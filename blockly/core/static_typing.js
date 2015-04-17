/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview 
 *
 * TODO: Create some kind of abstract type list that can be turned into
 *       a language specific keyword in the individual generators.
 *
 */
'use strict';

goog.provide('Blockly.StaticTyping');

goog.require('Blockly.Block');

goog.require('Blockly.Workspace');


/**
 * Navigates through the child blocks to get the block type.
 * @param {!Blockly.Block} block Block to navigate through childs. 
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
    blockType = 'defineme';
    //varType = 'int';
  } else {
    var func = nextBlock[0].getType;
    if (func) {
      blockType = nextBlock[0].getType();
    } else {
      //TOOD: this is for debugging, means inner block is missing getType
      blockType = 'innerBlockNoType';
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
 * 
 * @param {string} varToFind String containing the name of the variable to find.
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
          //TODO: Once all static typing code is done, default this to 'int'
          //variableTypes[blockVariables[y]] = 'getVarTypeNotDef';
        }
      }
    }
  }

  return variableTypes;
};

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
  if (nextBlock[0] === this) {
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

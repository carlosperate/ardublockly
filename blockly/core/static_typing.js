/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Object that defines static objects and methods to assign
 *               Blockly types to Blockly blocks. These can then be converted to
 *               language specific types in each language generator.
 */
'use strict';

goog.provide('Blockly.StaticTyping');

goog.require('Blockly.Block');
goog.require('Blockly.Workspace');


/**
 * Class for StaticTyping.
 * @constructor
 */
Blockly.StaticTyping = function() {};

/**
 * "Enum-like" object to create blockly variable types.
 * The number type is used to set a general number from the number block, the
 * block itself then analyses the contents and defines if it is an integer or
 * decimal number.
 * Compatible types have the same value.
 */
Blockly.StaticTyping.BasicTypes = {
  TEXT: 'String',              // General text string type
  BOOLEAN: 'Boolean',          // Boolean type
  NUMBER: 'Number',            // A general number type
  DECIMAL: 'Decimal',          // Number type for numbers with a fractional part
  ARRAY: 'Array',              // Array of any type of items
  COLOUR: 'Colour',            // For the colour blocks, not used in Ardublockly
  NULL: null,                  // Used as a "no type" wild card natively
  UNDEF: 'Undefined',          // Can be used to delegate type assignment
};

/**
 * Blockly Type class constructor.
 */
Blockly.StaticTyping.Type = function(args) {
  if ((args.typeName === undefined) || (args.languageKeyword === undefined) ||
      (args.basicType === undefined) || (args.compatibleTypes === undefined)) {
    throw 'Creating a Type requires the following format:\n{\n' +
          '  typeName: string,\n  languageKeyword: string,\n' +
          '  basicType: Blockly.StaticTyping.BasicTypes,\n' +
          '  compatibleTypes: [Blockly.StaticTyping.BasicTypes,]\n}';
  }
  if (Array.isArray && !Array.isArray(args.compatibleTypes)) {
    throw 'The compatible types for a Blockly Types needs to be a string' +
          'of Blockly.StaticTyping.BasicTypes items.';
  }
  /** @type {string} */
  this.typeName = args.typeName;
  /** @type {string} */
  this.languageKeyword = args.languageKeyword;
  /** @type {Blockly.StaticTyping.BasicTypes} */
  this.basicType = args.basicType;
  /** @type {Array<Blockly.StaticTyping.BasicTypes>} */
  this.compatibleTypes = args.compatibleTypes;
};

/** @return {Array<string>} List of compatible types, including itself. */
Blockly.StaticTyping.Type.prototype.compatibles = function() {
  return this.compatibleTypes.concat(this.basicType);
};

/** Create the types as instantiated objects on this name space. */
Blockly.StaticTyping.BlocklyTypes = {
  // General String type
  TEXT: new Blockly.StaticTyping.Type({
    typeName: 'Text',
    languageKeyword: 'Text',
    basicType: Blockly.StaticTyping.BasicTypes.TEXT,
    compatibleTypes: [],
  }),
  // Single character
  CHARACTER: new Blockly.StaticTyping.Type({
    typeName: 'Character',
    languageKeyword: 'Character',
    basicType: Blockly.StaticTyping.BasicTypes.TEXT,
    compatibleTypes: [],
  }),
  // Boolean
  BOOLEAN: new Blockly.StaticTyping.Type({
    typeName: 'Boolean',
    languageKeyword: 'Boolean',
    basicType: Blockly.StaticTyping.BasicTypes.BOOLEAN,
    compatibleTypes: [Blockly.StaticTyping.BasicTypes.NUMBER],
  }),
  // Integer number
  NUMBER: new Blockly.StaticTyping.Type({
    typeName: 'Number',
    languageKeyword: 'Number',
    basicType: Blockly.StaticTyping.BasicTypes.NUMBER,
    compatibleTypes: [Blockly.StaticTyping.BasicTypes.CHARACTER, 
                      Blockly.StaticTyping.BasicTypes.DECIMAL],
  }),
  // Decimal number
  DECIMAL: new Blockly.StaticTyping.Type({
    typeName: 'Decimal',
    languageKeyword: 'Decimal',
    basicType: Blockly.StaticTyping.BasicTypes.DECIMAL,
    compatibleTypes: [Blockly.StaticTyping.BasicTypes.NUMBER],
  }),
  // Decimal number
  ARRAY: new Blockly.StaticTyping.Type({
    typeName: 'Array',
    languageKeyword: 'Array',
    basicType: Blockly.StaticTyping.BasicTypes.ARRAY,
    compatibleTypes: [],
  }),
  // Null indicate there is no type
  NULL: new Blockly.StaticTyping.Type({
    typeName: 'Null',
    languageKeyword: 'Null',
    basicType: Blockly.StaticTyping.BasicTypes.NULL,
    compatibleTypes: [],
  }),
  // Type not defined, or not yet defined
  UNDEF: new Blockly.StaticTyping.Type({
    typeName: 'Undefined',
    languageKeyword: 'Undefined',
    basicType: Blockly.StaticTyping.BasicTypes.UNDEF,
    compatibleTypes: [],
  }),
  // Set when no child block (supposed to define the variable type) is connected
  CHILD_BLOCK_MISSING: new Blockly.StaticTyping.Type({
    typeName: 'ChildBlockMissing',
    languageKeyword: 'ChildBlockMissing',
    basicType: Blockly.StaticTyping.BasicTypes.UNDEF,
    compatibleTypes: [],
  })
};

/**
 * Adds another type to the Blockly.StaticTyping.BlocklyTypes collection.
 * @param {string} typeName_ Identifiable name of the type.
 * @param {string} languageKeyword_ Language specific keyword for the type.
 * @param {Blockly.StaticTyping.BasicTypes} basicType_ Defines the basic type
 *     name this type refers to.
 * @param {Array<Blockly.StaticTyping.BasicTypes>} compatibleTypes_ List of
 *     other basic types this Type is compatible with.
 */
Blockly.StaticTyping.addType =
    function(typeName_, languageKeyword_, basicType_, compatibleTypes_) {
  // The name is used as the key from the value pair in the BlocklyTypes object
  var key = typeName.toUpperCase();
  if (Blockly.StaticTyping.BlocklyTypes[key] !== undefined) {
    throw 'The Blockly type ' + key + ' already exists.';
  }
  Blockly.StaticTyping.BlocklyTypes[key] = new Blockly.StaticTyping.Type({
    typeName: typeName_,
    languageKeyword: languageKeyword_,
    basicType: basicType_,
    compatibleTypes: compatibleTypes_,
  });
};

/**
 * Navigates through all the blocks, collecting all variables and getting
 * their type into an associative array with the variable names as the keys and
 * the type as the values.
 * @param {Blockly.Workspace} workspace Blockly Workspace to collect variables.
 * @return {Array<Blockly.StaticTyping.Type>} Associative array with the 
 *     variable names as the keys and the type as the values.
 */
Blockly.StaticTyping.getAllVarsWithTypes = function(workspace) {
  var blocks = Blockly.StaticTyping.getAllStatementsOrdered(workspace);
  var varsWithTypes = Object.create(null);
  var varUndefBlockList = Object.create(null);
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].select();  // for step debugging, highlights block in workspace
    // Each statement block iterates through its input children collecting vars
    var blockVarsWithTypes = Blockly.StaticTyping.getBlockVars(blocks[i]);
    for (var j = 0; j < blockVarsWithTypes.length; j++) {
      var varName = blockVarsWithTypes[j][0];
      var varType = blockVarsWithTypes[j][1];
      Blockly.StaticTyping.manageVarsWithTypes(
          blocks[i], varName, varType, varsWithTypes, varUndefBlockList);
    }
  }
  return varsWithTypes;
};

/**
 * Navigates through each top level block in the workspace to collect all
 * statement blocks, in order from top left.
 * @param {Blockly.Workspace} workspace Blockly Workspace to collect blocks.
 * @return {Array<Blockly.Block>} Array containing all workspace statement
 *     blocks.
 */
Blockly.StaticTyping.getAllStatementsOrdered = function(workspace) {
  if (!workspace.getTopBlocks) {
    throw 'Not a valid workspace: ' + workspace;
  }

  /**
   * Navigates through each continuous block to collect all  statement blocks.
   * Function required to use recursion for block input statements.
   * @param {Blockly.Block} startBlock Block to start iterating from..
   * @return {Array<Blockly.Block>} Array containing all continuous statement
   *     blocks.
   */
  var getAllContinuousStatements = function(startBlock) {
    var block = startBlock;
    var nextBlock = null;
    var connections = null;
    var blockNextConnection = null;
    var blocks = [];
    do {
      block.select();  // for step debugging, highlights block in workspace
      blocks.push(block);
      blockNextConnection = block.nextConnection;
      connections = block.getConnections_();
      block = null;
      for (var j = 0; j < connections.length; j++) {
        if (connections[j].type == Blockly.NEXT_STATEMENT) {
          nextBlock = connections[j].targetBlock();
          if (nextBlock) {
            // If it is the next connection select it and move to the next block
            if (connections[j] === blockNextConnection) {
              block = nextBlock;
            } else {
              // Recursion as block children can have their own input statements
              blocks = blocks.concat(getAllContinuousStatements(nextBlock));
            }
          }
        }
      }
    } while (block);

    return blocks;
  };

  var allStatementBlocks = [];
  var topBlocks = workspace.getTopBlocks(true);
  for (var i = 0; i < topBlocks.length; i++) {
    allStatementBlocks = allStatementBlocks.concat(
        getAllContinuousStatements(topBlocks[i]));
  }

  return allStatementBlocks;
};

/**
  * Retrieves the input argument block variables with their set type.
  * @param {Blockly.Block} block Block to retrieve variables from.
  * @return {Array<Blockly.StaticTyping.Type>} Associative array with the block
  *     variable names as the keys and the BlocklyType as the values.
  */
Blockly.StaticTyping.getBlockVars = function(block) {
  var blockVarsWithTypes = [];
  var getVars = block.getVars;
  if (getVars) {
    var blockVariables = getVars.call(block);
    // Iterate through the variables used in this block
    for (var i = 0; i < blockVariables.length; i++) {
      var varName = blockVariables[i];
      var getVarType = block.getVarType;
      if (getVarType) {
        var varType = getVarType.call(block, varName);
        blockVarsWithTypes.push([varName, varType]);
      } else {
        blockVarsWithTypes.push(
            [varName, Blockly.StaticTyping.BlocklyTypes.UNDEF]);
      }
    }
  } // else: !(block.getVars), block does not define vars, so do nothing
  return blockVarsWithTypes;
};

/**
 * Manages the associative array of variables with their type.
 * @param {Blockly.Block} block Blockly providing the variable to manage.
 * @param {string} varName Name of the variable to manage.
 * @param {Blockly.StaticTyping.Type} varType Type assigned by current block.
 * @param {Array<Blockly.StaticTyping.Type>} varsWithTypes Associative array
 *     containing the currently processed variables, with the variable names as
 *     the keys and the type as the values.
 * @param {Array<Blockly.Block>} varUndefBlockList Associative array of blocks
 *     to call back with a type for the variables (used as the key) that they
 *     contain currently undefined.
 */
Blockly.StaticTyping.manageVarsWithTypes = function(
    block, varName, varType, varsWithTypes, varUndefBlockList) {
  if (varsWithTypes[varName] === undefined) {
    // First time variable is encountered, so set type and callback list
    varsWithTypes[varName] = varType;
    varUndefBlockList[varName] = [];

    // If this block type is UNDEF, it will need to know its type
    if ((varType == Blockly.StaticTyping.BlocklyTypes.UNDEF) &&
        (block.setBlockType)) {
      varUndefBlockList[varName].push(block);
    }
  } else if (varsWithTypes[varName] ==
             Blockly.StaticTyping.BlocklyTypes.UNDEF) {
    // Variable encountered before with undefined type, set it now
    varsWithTypes[varName] = varType;

    // If this block type is UNDEF, it will need to know its type
    if (varType == Blockly.StaticTyping.BlocklyTypes.UNDEF) {
      if (block.setBlockType) {
        varUndefBlockList[varName].push(block);
      }
    } else {
      // Valid type added, so update all waiting blocks
      for (var i = 0; i < varUndefBlockList[varName].length; i++) {
        varUndefBlockList[varName][i].setBlockType(varType);
      }
    }
  } else {
    // Variable with valid type already registered
    Blockly.StaticTyping.manageTypeWarning(
        block, varType, varName, varsWithTypes[varName]);

    // If this block type is undefined it might need to get its type
    if ((varType == Blockly.StaticTyping.BlocklyTypes.UNDEF) &&
        (block.setBlockType)) {
      block.setBlockType(varsWithTypes[varName]);
    }
  }
};

/**
 * When a block uses a variable this function can compare its type with the
 * variable type and set a warning if they are not the same or compatible.
 * @param {!Blockly.Block} block The block to manage its warning.
 * @param {!Blockly.StaticTyping.Type} bType The type of this block.
 * @param {!string} vName The variable name.
 * @param {!Blockly.StaticTyping.Type} vType The type of the variable.
 */
Blockly.StaticTyping.manageTypeWarning = function(block, bType, vName, vType) {
  if ((bType == Blockly.StaticTyping.BlocklyTypes.CHILD_BLOCK_MISSING) ||
      (vType == Blockly.StaticTyping.BlocklyTypes.CHILD_BLOCK_MISSING)) {
    // User still has to attach a block to this variable or its first
    // declaration, so for now do not display any warning
    block.setWarningText(null, 'varType');
  } else if ((vType !== bType) &&
             (bType !== Blockly.StaticTyping.BlocklyTypes.UNDEF)) {
    block.setWarningText('The variable ' + vName +' has been first assigned' +
        'to the type "' + vType.typeName + '"\nand this block needs it to be ' +
        'set to the type "' + bType.typeName + '" !', 'varType');
  } else {
    block.setWarningText(null, 'varType');
  }
};

/**
 * Iterates through the list of top level blocks and sets the function arguments
 * types.
 * @param {Blockly.Workspace} workspace Blockly Workspace to collect variables.
 * @param {Array<Blockly.StaticTyping.Type>} Associative array with the variable
 *     names as the keys and the type as the values.
 */
Blockly.StaticTyping.setProcedureArgs = function(workspace, varsWithTypes) {
  var blocks = workspace.getTopBlocks();
  for (var i = 0, length_ = blocks.length; i < length_; i++) {
    var setArgsType = blocks[i].setArgsType;
    if (setArgsType) {
      setArgsType.call(blocks[i], varsWithTypes);
    }
  }
};

/**
 * Navigates through the child blocks of the input block to get the block type.
 * @param {!Blockly.Block} block Block to navigate through children.
 * @return {Blockly.StaticTyping.Type} Type of the input block.
 */
Blockly.StaticTyping.getChildBlockType = function(block) {
  var blockType = null;
  var nextBlock = [block];
  // TODO: Currently only checking the first of any block children
  while ((nextBlock[0].getBlockType === undefined) &&
         (nextBlock[0].getChildren().length > 0)) {
    nextBlock = nextBlock[0].getChildren();
  }
  if (nextBlock[0] === block) {
    // Set variable block is empty, so no type yet
    blockType = Blockly.StaticTyping.BlocklyTypes.CHILD_BLOCK_MISSING;
  } else {
    var func = nextBlock[0].getBlockType;
    if (func) {
      blockType = nextBlock[0].getBlockType();
    } else {
      // Most inner block, supposed to define a type, is missing getBlockType()
      blockType = Blockly.StaticTyping.BlocklyTypes.UNDEF;
    }
  }
  return blockType;
};

/**
 * Regular expression objects to do Number type recognition between an integer
 * and decimal.
 * @private
 */
Blockly.StaticTyping.regExpInt_ = new RegExp(/^\d+$/);
Blockly.StaticTyping.regExpFloat_ = new RegExp(/^[0-9]*[.][0-9]+$/);

/**
 * Uses regular expressions to identify if the input number is an integer or a
 * floating point.
 * @param {string} numberString String of the number to identify.
 * @return {!Blockly.StaticTyping.BlocklyType} Blockly type.
 */
Blockly.StaticTyping.identifyNumber = function(numberString) {
    if (Blockly.StaticTyping.regExpInt_.test(numberString)) {
      return Blockly.StaticTyping.BlocklyTypes.NUMBER;
    } else if (Blockly.StaticTyping.regExpFloat_.test(numberString)) {
      return Blockly.StaticTyping.BlocklyTypes.DECIMAL;
    }
    //TODO: This is just a temporary value for easy bug catching.
    return Blockly.StaticTyping.BlocklyTypes.UNDEF;
};

/**
 * Converts the static types dictionary in to a an array with 2-item arrays.
 * This array only contains the valid types, excluding any error or temp types.
 * @return {!array<array<string>>} Blockly types in the format described above.
 */
Blockly.StaticTyping.blocklyValidTypeArray = function() {
  var typesArray = [];
  for (var typeKey in Blockly.StaticTyping.BlocklyTypes) {
    if ((typeKey !== 'UNDEF') && (typeKey !== 'NULL') &&
        (typeKey !== 'CHILD_BLOCK_MISSING') && (typeKey !== 'ARRAY')) {
      typesArray.push([Blockly.StaticTyping.BlocklyTypes[typeKey].typeName,
                       typeKey]);
    }
  }
  return typesArray;
};

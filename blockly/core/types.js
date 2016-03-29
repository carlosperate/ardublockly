/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Object that defines static objects and methods to assign
 *     Blockly types to Blockly variables. These can then be converted to
 *     language specific types in each language generator.
 */
'use strict';

goog.provide('Blockly.Types');

goog.require('Blockly.Type');


/** Text string. */
Blockly.Types.TEXT = new Blockly.Type({
  typeName: 'Text',
  compatibleTypes: [Blockly.Types.CHARACTER]
});

/** Single character. */
Blockly.Types.CHARACTER = new Blockly.Type({
  typeName: 'Character',
  compatibleTypes: [Blockly.Types.TEXT]
});

/** Boolean. */
Blockly.Types.BOOLEAN = new Blockly.Type({
  typeName: 'Boolean',
  compatibleTypes: [Blockly.Types.NUMBER]
});

/** Integer number. */
Blockly.Types.NUMBER = new Blockly.Type({
  typeName: 'Number',
  compatibleTypes: [Blockly.Types.CHARACTER,
                    Blockly.Types.BOOLEAN,
                    Blockly.Types.DECIMAL]
});

/** Decimal/floating point number. */
Blockly.Types.DECIMAL = new Blockly.Type({
  typeName: 'Decimal',
  compatibleTypes: [Blockly.Type.NUMBER],
});

/** Array/List of items. */
Blockly.Types.ARRAY = new Blockly.Type({
  typeName: 'Array',
  compatibleTypes: [],
});

/** Null indicate there is no type. */
Blockly.Types.NULL = new Blockly.Type({
  typeName: 'Null',
  compatibleTypes: [],
});

/** Type not defined, or not yet defined. */
Blockly.Types.UNDEF = new Blockly.Type({
  typeName: 'Undefined',
  compatibleTypes: [],
});

/** Set when no child block (meant to define the variable type) is connected. */
Blockly.Types.CHILD_BLOCK_MISSING = new Blockly.Type({
  typeName: 'ChildBlockMissing',
  compatibleTypes: [],
});

/**
 * Adds another type to the Blockly.Types collection.
 * @param {string} typeName_ Identifiable name of the type.
 * @param {Array<Blockly.Type>} compatibleTypes_ List of types this Type is
 *     compatible with.
 */
Blockly.Types.addType = function(typeName_, compatibleTypes_) {
  // The name is used as the key from the value pair in the BlocklyTypes object
  var key = typeName.toUpperCase();
  if (Blockly.Types[key] !== undefined) {
    throw 'The Blockly type ' + key + ' already exists.';
  }
  Blockly.Types[key] = new Blockly.Type({
    typeName: typeName_,
    compatibleTypes: compatibleTypes_,
  });
};

/**
 * Converts the static types dictionary in to a an array with 2-item arrays.
 * This array only contains the valid types, excluding any error or temp types.
 * @return {!Array<Array<string>>} Blockly types in the format described above.
 */
Blockly.Types.getValidTypeArray = function() {
  var typesArray = [];
  for (var typeKey in Blockly.Types) {
    if ((typeKey !== 'UNDEF') && (typeKey !== 'CHILD_BLOCK_MISSING') &&
        (typeKey !== 'NULL') && (typeKey !== 'ARRAY') &&
        (typeof Blockly.Types[typeKey] !== 'function') &&
        !(Blockly.Types[typeKey] instanceof RegExp)) {
      typesArray.push([Blockly.Types[typeKey].typeName, typeKey]);
    }
  }
  return typesArray;
};

/**
 * Navigates through child blocks of the argument block to get this block type.
 * @param {!Blockly.Block} block Block to navigate through children.
 * @return {Blockly.Type} Type of the input block.
 */
Blockly.Types.getChildBlockType = function(block) {
  var blockType = null;
  var nextBlock = block;
  // Only checks first input block, so it decides the type. Incoherences amongst
  // multiple inputs dealt at a per-block level with their own block warnings
  while (nextBlock && (nextBlock.getBlockType === undefined) &&
         (nextBlock.inputList.length > 0)) {
    nextBlock = nextBlock.inputList[0].connection.targetBlock();
  }
  if (nextBlock === block) {
    // Set variable block is empty, so no type yet
    blockType = Blockly.Types.CHILD_BLOCK_MISSING;
  } else if (nextBlock === null) {
    // Null return from targetBlock indicates no block connected
    blockType = Blockly.Types.CHILD_BLOCK_MISSING;
  } else {
    var func = nextBlock.getBlockType;
    if (func) {
      blockType = nextBlock.getBlockType();
    } else {
      // Most inner block, supposed to define a type, is missing getBlockType()
      blockType = Blockly.Types.NULL;
    }
  }
  return blockType;
};

/**
 * Regular expressions to identify an integer.
 * @private
 */
Blockly.Types.regExpInt_ = new RegExp(/^\d+$/);

/**
 * Regular expressions to identify a decimal.
 * @private
 */
Blockly.Types.regExpFloat_ = new RegExp(/^[0-9]*[.][0-9]+$/);

/**
 * Uses regular expressions to identify if the input number is an integer or a
 * floating point.
 * @param {string} numberString String of the number to identify.
 * @return {!Blockly.Type} Blockly type.
 */
Blockly.Types.identifyNumber = function(numberString) {
    if (Blockly.Types.regExpInt_.test(numberString)) {
      return Blockly.Types.NUMBER;
    } else if (Blockly.Types.regExpFloat_.test(numberString)) {
      return Blockly.Types.DECIMAL;
    }
    return Blockly.Types.NULL;
};

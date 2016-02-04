/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Object that defines static objects and methods to assign
 *     Blockly types to Blockly blocks. These can then be converted to language
 *     specific types in each language generator.
 */
'use strict';

goog.provide('Blockly.Type');

goog.require('goog.asserts');


/**
 * Blockly Type class constructor.
 * @param {Object} args Object/dictionary with typeName, basicType, and
 *     compatibleTypes.
 * @constructor
 */
Blockly.Type = function(args) {
  if ((args.typeName === undefined) || (args.basicType === undefined) ||
      (args.compatibleTypes === undefined)) {
    throw 'Creating a Type requires the following format:\n{\n' +
          '  typeName: string,\n  basicType: Blockly.Type.BasicTypes,\n' +
          '  compatibleTypes: [Blockly.Type.BasicTypes,]\n}';
  }
  if (!goog.isArray(args.compatibleTypes)) {
    throw 'The compatible types for a Blockly Types needs to be a string' +
          'of Blockly.Type.BasicTypes items.';
  }
  /** @type {string} */
  this.typeName = args.typeName;
  /** @type {Blockly.Type.BasicTypes} */
  this.basicType = args.basicType;
  /** @type {Array<Blockly.Type.BasicTypes>} */
  this.compatibleTypes = args.compatibleTypes;
};

/** @return {Array<string>} List of compatible types, including itself. */
Blockly.Type.prototype.compatibles = function() {
  return this.compatibleTypes.concat(this.basicType);
};

/**
 * "Enum-like" object to create blockly variable types.
 * The number type is used to set a general number from the number block, the
 * block itself then analyses the contents and defines if it is an integer or
 * decimal number.
 * Compatible types have the same value.
 */
Blockly.Type.BasicTypes = {
  TEXT: 'String',              // General text string type
  BOOLEAN: 'Boolean',          // Boolean type
  NUMBER: 'Number',            // A general number type
  DECIMAL: 'Decimal',          // Number type for numbers with a fractional part
  ARRAY: 'Array',              // Array of any type of items
  COLOUR: 'Colour',            // For the colour blocks, not used in Ardublockly
  NULL: null,                  // Used as a "no type" wild card natively
  UNDEF: 'Undefined',          // Can be used to delegate type assignment
};

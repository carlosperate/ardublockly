/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Object that defines Types that can then be converted to
 *     language specific types in each language generator.
 */
'use strict';

goog.provide('Blockly.Type');

goog.require('goog.asserts');


/**
 * Blockly Type class constructor.
 * @param {Object} args Object/dictionary with typeName, and compatibleTypes.
 * @constructor
 */
Blockly.Type = function(args) {
  if ((args.typeName === undefined) || (args.compatibleTypes === undefined)) {
    throw new Error('Creating a Type requires the following format:\n{\n' +
                    '  typeName: string,\n' +
                    '  compatibleTypes: [Blockly.Type,]\n}');
  }
  if (!goog.isArray(args.compatibleTypes)) {
    throw new Error('The compatible types for a Blockly Types needs to be an ' +
                    'array of Blockly.Type items.');
  }
  /** @type {string} */
  this.typeName = args.typeName;
  /**
   * @type {Array<Blockly.Type>} 
   * @private
   */
  this.compatibleTypes_ = args.compatibleTypes;
  this.compatibleTypes_.push(this);
  /**
   * @type {Array<string>}
   * @private
   */
  this.generatedCheckList_ = [];
  this.generateCheckList_();
};

/** Getter for the output property, used for block output types. */
Object.defineProperty(Blockly.Type.prototype, 'output', {
  get: function() {
    return this.typeName;
  },
  set: function(value) {
    console.warn('"Blockly.Type" property "output" is not allowed to be set.');
  }
});

/** Getter for the check property, use for block input checks. */
Object.defineProperty(Blockly.Type.prototype, 'checkList', {
  get : function() {
    return this.generatedCheckList_;
  },
  set: function(value) {
    console.warn('"Blockly.Type" property "check" is not allowed to be set.');
  }
});

/**
 * Generates the Type check list for the blocks input.
 * @param {!Blockly.Type} compatibleType New type to add to compatibility list.
 * @private
 */
Blockly.Type.prototype.generateCheckList_ = function(compatibleType) {
  this.generatedCheckList_ = [];
  for (var i = 0; i < this.compatibleTypes_.length; i++) {
    var unique = true;
    for (var j = 0; j < this.generatedCheckList_.length; j++) {
      if (this.generatedCheckList_[j] === this.compatibleTypes_[i].typeName) {
        unique = false;
      }
    }
    if (unique) {
      this.generatedCheckList_.push(this.compatibleTypes_[i].typeName);
    }
  }
};

/**
 * Adds a new type to be compatible with this one.
 * @param {!Blockly.Type} compatibleType New type to add to compatibility list.
 */
Blockly.Type.prototype.addCompatibleType = function(compatibleType) {
  if (!compatibleType || !compatibleType.constructor ||
      !(compatibleType instanceof Blockly.Type)) {
    throw new Error('To add a compatible type to ' + this.typeName +
                    ' provide a Blockly.Type object.');
  }
  this.compatibleTypes_.push(compatibleType);
  this.generateCheckList_();
};

/**
 * Adds an array of new types to be compatible with this one.
 * @param {!Array<Blockly.Type>} compatibleTypeArray Array of new type to add to
 *     compatibility list.
 */
Blockly.Type.prototype.addCompatibleTypes = function(compatibleTypeArray) {
  if (!goog.isArray(compatibleTypeArray)) {
    throw new Error('To add compatible types to the Blockly Type ' +
                    this.typeName +' provide an array of Blockly.Type items.');
  }
  for (var i = 0; i < compatibleTypeArray.length; i++) {
    if (!compatibleTypeArray[i] || !compatibleTypeArray[i].constructor ||
        !(compatibleTypeArray[i] instanceof Blockly.Type)) {
      throw new Error('To add a compatible type to ' + this.typeName + ' you ' +
                      'must point to a Blockly.Type object.');
    }
    this.compatibleTypes_.push(compatibleTypeArray[i]);
  }
  this.generateCheckList_();
};

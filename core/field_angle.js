/**
 * Visual Blocks Editor
 *
 * Copyright 2013 Google Inc.
 * http://blockly.googlecode.com/
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
 * @fileoverview Angle input field.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldAngle');

goog.require('Blockly.FieldTextInput');


/**
 * Class for an editable angle field.
 * @param {string} text The initial content of the field.
 * @param {Function} opt_changeHandler An optional function that is called
 *     to validate any constraints on what the user entered.  Takes the new
 *     text as an argument and returns the accepted text or null to abort
 *     the change.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldAngle = function(text, opt_changeHandler) {
  var changeHandler;
  if (opt_changeHandler) {
    // Wrap the user's change handler together with the angle validator.
    var thisObj = this;
    changeHandler = function(value) {
      value = Blockly.FieldAngle.angleValidator.call(thisObj, value);
      if (value === null) {
        value = thisObj.getValue();  // Abort, no change.
      }
      opt_changeHandler.call(thisObj, value);
      return value;
    };
  } else {
    changeHandler = Blockly.FieldAngle.angleValidator;
  }

  // Add degree symbol: "360°" (LTR) or "°360" (RTL)
  this.symbol_ = Blockly.createSvgElement('tspan', {}, null);
  this.symbol_.appendChild(document.createTextNode('\u00B0'));

  Blockly.FieldAngle.superClass_.constructor.call(this,
      text, changeHandler);
};
goog.inherits(Blockly.FieldAngle, Blockly.FieldTextInput);

/**
 * Insert a degree symbol.
 * @param {?string} text New text.
 */
Blockly.FieldAngle.prototype.setText = function(text) {
  // Insert degree symbol.
  if (Blockly.RTL) {
    this.textElement_.insertBefore(this.symbol_, this.textElement_.firstChild);
  } else {
    this.textElement_.appendChild(this.symbol_);
  }
  // Cached width is obsolete.  Clear it.
  this.size_.width = 0;

  Blockly.FieldAngle.superClass_.setText.call(this, text);
};

/**
 * Ensure that only an angle may be entered.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid angle, or null if invalid.
 */
Blockly.FieldAngle.angleValidator = function(text) {
  var n = Blockly.FieldTextInput.numberValidator(text);
  if (n !== null) {
    n = n % 360;
    if (n < 0) {
      n += 360;
    }
    n = String(n);
   }
  return n;
};

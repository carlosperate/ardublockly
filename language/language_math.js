/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/google-blockly/
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
 * @fileoverview Math blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

if (!Blockly.Language) {
  Blockly.Language = {};
}


Blockly.Language.number = {
  // Numeric value.
  category: 'Math',
  helpUrl: 'http://en.wikipedia.org/wiki/Number',
  init: function() {
    this.setColour('baby');
    this.addTitle(new Blockly.FieldTextInput('0', function(text) {
      // Ensure that only a number may be entered.
      // TODO: Handle cases like 'o', 'ten', '1,234', '3,14', etc.
      var n = window.parseFloat(text || 0);
      return window.isNaN(n) ? null : String(n);
    }));
    this.setOutput(true);
  }
};


Blockly.Language.arithmetic = {
  // Basic arithmetic operator.
  category: 'Math',
  helpUrl: 'http://en.wikipedia.org/wiki/Arithmetic',
  init: function() {
    this.setColour('green');
    this.setOutput(true);
    this.addInput('', '', Blockly.INPUT_VALUE);
    var dropdown = new Blockly.FieldDropdown('+', function() {
      return ['+', '-', '\u00D7', '\u00F7'];
    });
    this.addInput(dropdown, '', Blockly.INPUT_VALUE);
    this.setInputsInline(true);
  }
};

Blockly.Language.root = {
  // Root operator.
  category: 'Math',
  helpUrl: 'http://en.wikipedia.org/wiki/Square_root',
  init: function() {
    this.setColour('green');
    this.setOutput(true);
    this.addInput('\u221A', '', Blockly.INPUT_VALUE);
    this.setInputsInline(true);
  }
};


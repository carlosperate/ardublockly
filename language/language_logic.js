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
 * @fileoverview Logic blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

if (!Blockly.Language) {
  Blockly.Language = {};
}

Blockly.Language.logic_compare = {
  // Comparison operator.
  category: 'Logic',
  helpUrl: function() {
    var map = {
      '=': 'http://en.wikipedia.org/wiki/Equality_(mathematics)',
      '\u2260': 'http://en.wikipedia.org/wiki/Inequality_(mathematics)',
      '<': 'http://en.wikipedia.org/wiki/Inequality_(mathematics)',
      '\u2264': 'http://en.wikipedia.org/wiki/Inequality_(mathematics)',
      '>': 'http://en.wikipedia.org/wiki/Inequality_(mathematics)',
      '\u2265': 'http://en.wikipedia.org/wiki/Inequality_(mathematics)'
    };
    return map[this.getValueLabel(1)];
  },
  init: function() {
    this.setColour('green');
    this.setOutput(true);
    this.addInput('', '', Blockly.INPUT_VALUE);
    var dropdown = new Blockly.FieldDropdown('=', function() {
      return ['=', '\u2260', '<', '\u2264', '>', '\u2265'];
    });
    this.addInput(dropdown, '', Blockly.INPUT_VALUE);
    this.setInputsInline(true);
  }
};

Blockly.Language.logic_operation = {
  // Logical operations: 'and', 'or'.
  category: 'Logic',
  helpUrl: 'http://en.wikipedia.org/wiki/Logical_disjunction',
  init: function() {
    this.setColour('green');
    this.setOutput(true);
    this.addInput('', '', Blockly.INPUT_VALUE);
    var dropdown = new Blockly.FieldDropdown('and', function() {
      return ['and', 'or'];
    });
    this.addInput(dropdown, '', Blockly.INPUT_VALUE);
    this.setInputsInline(true);
  }
};

Blockly.Language.logic_negate = {
  // Negation.
  category: 'Logic',
  helpUrl: 'http://en.wikipedia.org/wiki/Logical_disjunction',
  init: function() {
    this.setColour('green');
    this.setOutput(true);
    this.addInput('not', '', Blockly.INPUT_VALUE);
  }
};

Blockly.Language.logic_boolean = {
  // Boolean data type: true and false.
  category: 'Logic',
  helpUrl: 'http://en.wikipedia.org/wiki/Boolean_data_type',
  init: function() {
    this.setColour('green');
    this.setOutput(true);
    var dropdown = new Blockly.FieldDropdown('true', function() {
      return ['true', 'false'];
    });
    this.addTitle(dropdown);
  }
};

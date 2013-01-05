/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
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
 * @fileoverview Logic blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Language.logic_compare = {
  // Comparison operator.
  category: Blockly.LANG_CATEGORY_LOGIC,
  helpUrl: Blockly.LANG_LOGIC_COMPARE_HELPURL,
  init: function() {
    this.setColour(120);
    this.setOutput(true, Boolean);
    this.appendValueInput('A');
    this.appendValueInput('B')
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('OP');
      return Blockly.Language.logic_compare.TOOLTIPS[op];
    });
  }
};

Blockly.Language.logic_compare.OPERATORS =
    [['=', 'EQ'],
     ['\u2260', 'NEQ'],
     ['<', 'LT'],
     ['\u2264', 'LTE'],
     ['>', 'GT'],
     ['\u2265', 'GTE']];

Blockly.Language.logic_compare.TOOLTIPS = {
  EQ: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_EQ,
  NEQ: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_NEQ,
  LT: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LT,
  LTE: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LTE,
  GT: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GT,
  GTE: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GTE
};

Blockly.Language.logic_operation = {
  // Logical operations: 'and', 'or'.
  category: Blockly.LANG_CATEGORY_LOGIC,
  helpUrl: Blockly.LANG_LOGIC_OPERATION_HELPURL,
  init: function() {
    this.setColour(120);
    this.setOutput(true, Boolean);
    this.appendValueInput('A')
        .setCheck(Boolean);
    this.appendValueInput('B')
        .setCheck(Boolean)
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('OP');
      return Blockly.Language.logic_operation.TOOLTIPS[op];
    });
  }
};

Blockly.Language.logic_operation.OPERATORS =
    [[Blockly.LANG_LOGIC_OPERATION_AND, 'AND'],
     [Blockly.LANG_LOGIC_OPERATION_OR, 'OR']];

Blockly.Language.logic_operation.TOOLTIPS = {
  AND: Blockly.LANG_LOGIC_OPERATION_TOOLTIP_AND,
  OR: Blockly.LANG_LOGIC_OPERATION_TOOLTIP_OR
};

Blockly.Language.logic_negate = {
  // Negation.
  category: Blockly.LANG_CATEGORY_LOGIC,
  helpUrl: Blockly.LANG_LOGIC_NEGATE_HELPURL,
  init: function() {
    this.setColour(120);
    this.setOutput(true, Boolean);
    this.appendValueInput('BOOL')
        .setCheck(Boolean)
        .appendTitle(Blockly.LANG_LOGIC_NEGATE_INPUT_NOT);
    this.setTooltip(Blockly.LANG_LOGIC_NEGATE_TOOLTIP);
  }
};

Blockly.Language.logic_boolean = {
  // Boolean data type: true and false.
  category: Blockly.LANG_CATEGORY_LOGIC,
  helpUrl: Blockly.LANG_LOGIC_BOOLEAN_HELPURL,
  init: function() {
    this.setColour(120);
    this.setOutput(true, Boolean);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(this.BOOLEANS), 'BOOL');
    this.setTooltip(Blockly.LANG_LOGIC_BOOLEAN_TOOLTIP);
  }
};

Blockly.Language.logic_boolean.BOOLEANS =
    [[Blockly.LANG_LOGIC_BOOLEAN_TRUE, 'TRUE'],
     [Blockly.LANG_LOGIC_BOOLEAN_FALSE, 'FALSE']];

Blockly.Language.logic_null = {
  // Null data type.
  category: Blockly.LANG_CATEGORY_LOGIC,
  helpUrl: Blockly.LANG_LOGIC_NULL_HELPURL,
  init: function() {
    this.setColour(120);
    this.setOutput(true, null);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_LOGIC_NULL);
    this.setTooltip(Blockly.LANG_LOGIC_NULL_TOOLTIP);
  }
};

Blockly.Language.logic_ternary = {
  // Ternary operator.
  category: Blockly.LANG_CATEGORY_LOGIC,
  helpUrl: Blockly.LANG_LOGIC_TERNARY_HELPURL,
  init: function() {
    this.setColour(120);
    this.appendValueInput('IF')
        .setCheck(Boolean)
        .appendTitle(Blockly.LANG_LOGIC_TERNARY_CONDITION);
    this.appendValueInput('THEN')
        .setCheck(null)
        .appendTitle(Blockly.LANG_LOGIC_TERNARY_IF_TRUE);
    this.appendValueInput('ELSE')
        .setCheck(null)
        .appendTitle(Blockly.LANG_LOGIC_TERNARY_IF_FALSE);
    this.setOutput(true, null);
    this.setTooltip(Blockly.LANG_LOGIC_TERNARY_TOOLTIP);
  }
};

Blockly.Language.logic_number_property = {
  category: Blockly.LANG_CATEGORY_LOGIC,
  helpUrl: '',
  init: function() {
    this.setColour(120);
    this.appendValueInput('NUMBER_TO_CHECK')
        .setCheck(Number);
    var dropdown = new Blockly.FieldDropdown(this.PROPERTIES, function(property) {
      var divisorInput = (property == 'DIVISIBLE_BY');
      this.sourceBlock_.updateShape(divisorInput);
    });
    this.appendDummyInput()
        .appendTitle(dropdown, 'PROPERTY');
    this.setInputsInline(true);
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.LANG_LOGIC_IS_TOOLTIP);
  },
  mutationToDom: function() {
    // Save whether the 'divisorInput' should be true of false (present or not).
    var container = document.createElement('mutation');
    var divisorInput = (this.getTitleValue('PROPERTY') == 'DIVISIBLE_BY');
    container.setAttribute('divisor_input', divisorInput);
    return container;
  },
  domToMutation: function(xmlElement) {
    // Restore the 'divisorInput'.
    var divisorInput = (xmlElement.getAttribute('divisor_input') == 'true');
    this.updateShape(divisorInput);
  },
  updateShape: function(divisorInput) {
    // Add or remove a Value Input.
    var inputExists = this.getInput('DIVISOR');
    if (divisorInput) {
      if (!inputExists) {
        this.appendValueInput('DIVISOR')
                 .setCheck(Number);
      }
    } else if (inputExists) {
      this.removeInput('DIVISOR');
    }
  }
};

Blockly.Language.logic_number_property.PROPERTIES =
    [[Blockly.LANG_LOGIC_IS_EVEN, 'EVEN'],
     [Blockly.LANG_LOGIC_IS_ODD, 'ODD'],
     [Blockly.LANG_LOGIC_IS_PRIME, 'PRIME'],
     [Blockly.LANG_LOGIC_IS_WHOLE, 'WHOLE'],
     [Blockly.LANG_LOGIC_IS_POSITIVE, 'POSITIVE'],
     [Blockly.LANG_LOGIC_IS_NEGATIVE, 'NEGATIVE'],
     [Blockly.LANG_LOGIC_IS_DIVISIBLE_BY, 'DIVISIBLE_BY']];


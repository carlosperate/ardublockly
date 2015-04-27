/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
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
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Blocks.math');

goog.require('Blockly.Blocks');
goog.require('Blockly.StaticTyping');


Blockly.Blocks.math.HUE = 230;

Blockly.Blocks['math_number'] = {
  /**
   * Block for numeric value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.MATH_NUMBER_HELPURL);
    this.setColour(Blockly.Blocks.math.HUE);
    this.appendDummyInput()
        .appendField(
            new Blockly.FieldTextInput(
                '0', Blockly.FieldTextInput.numberValidator),
            'NUM');
    this.setOutput(true, Blockly.StaticTyping.blocklyType.NUMBER);
    this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP);
  },
  /**
   * Reads the numerical value from the block and assigns a type.
   * @this Blockly.Block
   */
  getType: function() {
    var numString = this.getFieldValue('NUM');
    return Blockly.StaticTyping.identifyNumber(numString);
  }
};

Blockly.Blocks['math_arithmetic'] = {
  /**
   * Block for basic arithmetic operator.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [[Blockly.Msg.MATH_ADDITION_SYMBOL, 'ADD'],
         [Blockly.Msg.MATH_SUBTRACTION_SYMBOL, 'MINUS'],
         [Blockly.Msg.MATH_MULTIPLICATION_SYMBOL, 'MULTIPLY'],
         [Blockly.Msg.MATH_DIVISION_SYMBOL, 'DIVIDE'],
         [Blockly.Msg.MATH_POWER_SYMBOL, 'POWER']];
    this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, Blockly.StaticTyping.blocklyType.NUMBER);
    this.appendValueInput('A')
        .setCheck(Blockly.StaticTyping.blocklyType.NUMBER);
    this.appendValueInput('B')
        .setCheck(Blockly.StaticTyping.blocklyType.NUMBER)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'ADD': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,
        'MINUS': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,
        'MULTIPLY': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
        'DIVIDE': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,
        'POWER': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_POWER
      };
      return TOOLTIPS[mode];
    });
  }
  //TODO: a setType
};

Blockly.Blocks['math_single'] = {
  /**
   * Block for advanced math operators with single operand.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [[Blockly.Msg.MATH_SINGLE_OP_ROOT, 'ROOT'],
         [Blockly.Msg.MATH_SINGLE_OP_ABSOLUTE, 'ABS'],
         ['-', 'NEG'],
         ['ln', 'LN'],
         ['log10', 'LOG10'],
         ['e^', 'EXP'],
         ['10^', 'POW10']];
    this.setHelpUrl(Blockly.Msg.MATH_SINGLE_HELPURL);
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, Blockly.StaticTyping.blocklyType.NUMBER);
    this.interpolateMsg('%1 %2',
        ['OP', new Blockly.FieldDropdown(OPERATORS)],
        ['NUM', Blockly.StaticTyping.blocklyType.NUMBER, Blockly.ALIGN_RIGHT],
        Blockly.ALIGN_RIGHT);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'ROOT': Blockly.Msg.MATH_SINGLE_TOOLTIP_ROOT,
        'ABS': Blockly.Msg.MATH_SINGLE_TOOLTIP_ABS,
        'NEG': Blockly.Msg.MATH_SINGLE_TOOLTIP_NEG,
        'LN': Blockly.Msg.MATH_SINGLE_TOOLTIP_LN,
        'LOG10': Blockly.Msg.MATH_SINGLE_TOOLTIP_LOG10,
        'EXP': Blockly.Msg.MATH_SINGLE_TOOLTIP_EXP,
        'POW10': Blockly.Msg.MATH_SINGLE_TOOLTIP_POW10
      };
      return TOOLTIPS[mode];
    });
  },
  /**
   * Assigns a type to the block, all these operations are floats.
   */
  getType: function() {
    return Blockly.StaticTyping.blocklyType.DECIMAL;
  }
};

Blockly.Blocks['math_trig'] = {
  /**
   * Block for trigonometry operators.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [[Blockly.Msg.MATH_TRIG_SIN, 'SIN'],
         [Blockly.Msg.MATH_TRIG_COS, 'COS'],
         [Blockly.Msg.MATH_TRIG_TAN, 'TAN'],
         [Blockly.Msg.MATH_TRIG_ASIN, 'ASIN'],
         [Blockly.Msg.MATH_TRIG_ACOS, 'ACOS'],
         [Blockly.Msg.MATH_TRIG_ATAN, 'ATAN']];
    this.setHelpUrl(Blockly.Msg.MATH_TRIG_HELPURL);
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, Blockly.StaticTyping.blocklyType.NUMBER);
    this.appendValueInput('NUM')
        .setCheck(Blockly.StaticTyping.blocklyType.NUMBER)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'SIN': Blockly.Msg.MATH_TRIG_TOOLTIP_SIN,
        'COS': Blockly.Msg.MATH_TRIG_TOOLTIP_COS,
        'TAN': Blockly.Msg.MATH_TRIG_TOOLTIP_TAN,
        'ASIN': Blockly.Msg.MATH_TRIG_TOOLTIP_ASIN,
        'ACOS': Blockly.Msg.MATH_TRIG_TOOLTIP_ACOS,
        'ATAN': Blockly.Msg.MATH_TRIG_TOOLTIP_ATAN
      };
      return TOOLTIPS[mode];
    });
  },
  /**
   * Assigns a type to the block, all these operations are floats.
   */
  getType: function() {
    return Blockly.StaticTyping.blocklyType.DECIMAL;
  }
};

Blockly.Blocks['math_constant'] = {
  /**
   * Block for constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
   * @this Blockly.Block
   */
  init: function() {
    var CONSTANTS =
        [['\u03c0', 'PI'],
         ['e', 'E'],
         ['\u03c6', 'GOLDEN_RATIO'],
         ['sqrt(2)', 'SQRT2'],
         ['sqrt(\u00bd)', 'SQRT1_2'],
         ['\u221e', 'INFINITY']];
    this.setHelpUrl(Blockly.Msg.MATH_CONSTANT_HELPURL);
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, Blockly.StaticTyping.blocklyType.NUMBER);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(CONSTANTS), 'CONSTANT');
    this.setTooltip(Blockly.Msg.MATH_CONSTANT_TOOLTIP);
  },
  /**
   * Assigns a type to the block, all these operations are floats.
   */
  getType: function() {
    return Blockly.StaticTyping.blocklyType.DECIMAL;
  }
};

Blockly.Blocks['math_number_property'] = {
  /**
   * Block for checking if a number is even, odd, prime, whole, positive,
   * negative or if it is divisible by certain number.
   * @this Blockly.Block
   */
  init: function() {
    var PROPERTIES =
        [[Blockly.Msg.MATH_IS_EVEN, 'EVEN'],
         [Blockly.Msg.MATH_IS_ODD, 'ODD'],
         [Blockly.Msg.MATH_IS_PRIME, 'PRIME'],
         [Blockly.Msg.MATH_IS_WHOLE, 'WHOLE'],
         [Blockly.Msg.MATH_IS_POSITIVE, 'POSITIVE'],
         [Blockly.Msg.MATH_IS_NEGATIVE, 'NEGATIVE'],
         [Blockly.Msg.MATH_IS_DIVISIBLE_BY, 'DIVISIBLE_BY']];
    this.setColour(Blockly.Blocks.math.HUE);
    this.appendValueInput('NUMBER_TO_CHECK')
        .setCheck(Blockly.StaticTyping.blocklyType.NUMBER);
    var dropdown = new Blockly.FieldDropdown(PROPERTIES, function(option) {
      var divisorInput = (option == 'DIVISIBLE_BY');
      this.sourceBlock_.updateShape_(divisorInput);
    });
    this.appendDummyInput()
        .appendField(dropdown, 'PROPERTY');
    this.setInputsInline(true);
    this.setOutput(true, Blockly.StaticTyping.blocklyType.BOOLEAN);
    this.setTooltip(Blockly.Msg.MATH_IS_TOOLTIP);
  },
  /**
   * Create XML to represent whether the 'divisorInput' should be present.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var divisorInput = (this.getFieldValue('PROPERTY') == 'DIVISIBLE_BY');
    container.setAttribute('divisor_input', divisorInput);
    return container;
  },
  /**
   * Parse XML to restore the 'divisorInput'.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var divisorInput = (xmlElement.getAttribute('divisor_input') == 'true');
    this.updateShape_(divisorInput);
  },
  /**
   * Modify this block to have (or not have) an input for 'is divisible by'.
   * @param {boolean} divisorInput True if this block has a divisor input.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function(divisorInput) {
    // Add or remove a Value Input.
    var inputExists = this.getInput('DIVISOR');
    if (divisorInput) {
      if (!inputExists) {
        this.appendValueInput('DIVISOR')
            .setCheck(Blockly.StaticTyping.blocklyType.NUMBER);
      }
    } else if (inputExists) {
      this.removeInput('DIVISOR');
    }
  },
  /**
   * Assigns a type to the block, all these operations return booleans.
   */
  getType: function() {
    Blockly.StaticTyping.blocklyType.BOOLEAN;
  }
};

Blockly.Blocks['math_change'] = {
  /**
   * Block for adding to a variable in place.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.MATH_CHANGE_HELPURL);
    this.setColour(Blockly.Blocks.math.HUE);
    this.interpolateMsg(
        // TODO: Combine these messages instead of using concatenation.
        Blockly.Msg.MATH_CHANGE_TITLE_CHANGE + ' %1 ' +
        Blockly.Msg.MATH_CHANGE_INPUT_BY + ' %2',
        ['VAR', new Blockly.FieldVariable(Blockly.Msg.MATH_CHANGE_TITLE_ITEM)],
        ['DELTA', Blockly.StaticTyping.blocklyType.NUMBER, Blockly.ALIGN_RIGHT],
        Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.Msg.MATH_CHANGE_TOOLTIP.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  },
  /**
   * Finds the type of the variable selected in the drop down. Sets it to an
   * an integer if it has not been defined before.
   * @this Blockly.Block
   * @param {Array<string>} existingVars List of variables already defined.
   * @return {string} String to indicate the type if it has not been defined
   *                  before.
   */
  getVarType: function(existingVars) {
    var varName = this.getFieldValue('VAR');

    // Check if variable has been defined already
    var varType = Blockly.StaticTyping.findListVarType(varName, existingVars);
    if (varType != null) {
      if ((varType != Blockly.StaticTyping.blocklyType.INTEGER) &&
          (varType != Blockly.StaticTyping.blocklyType.DECIMAL)) {
        this.setWarningText('This variable type has been previously set to a ' +
            existingVars[varName] + ' and it needs to be a number!');
      } else {
        this.setWarningText(null);
      }
    } else {
      // not defined, so set it to an int
      varType = Blockly.StaticTyping.blocklyType.INTEGER;
      this.setWarningText(null);
    }

    return varType;
  }
};

Blockly.Blocks['math_round'] = {
  /**
   * Block for rounding functions.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [[Blockly.Msg.MATH_ROUND_OPERATOR_ROUND, 'ROUND'],
         [Blockly.Msg.MATH_ROUND_OPERATOR_ROUNDUP, 'ROUNDUP'],
         [Blockly.Msg.MATH_ROUND_OPERATOR_ROUNDDOWN, 'ROUNDDOWN']];
    this.setHelpUrl(Blockly.Msg.MATH_ROUND_HELPURL);
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, Blockly.StaticTyping.blocklyType.NUMBER);
    this.appendValueInput('NUM')
        .setCheck(Blockly.StaticTyping.blocklyType.NUMBER)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setTooltip(Blockly.Msg.MATH_ROUND_TOOLTIP);
  },
  /**
   * Assigns a type to the block, round always returns a float.
   */
  getType: function() {
    return Blockly.StaticTyping.blocklyType.DECIMAL;
  }
};

Blockly.Blocks['math_on_list'] = {
  /**
   * Block for evaluating a list of numbers to return sum, average, min, max,
   * etc.  Some functions also work on text (min, max, mode, median).
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [[Blockly.Msg.MATH_ONLIST_OPERATOR_SUM, 'SUM'],
         [Blockly.Msg.MATH_ONLIST_OPERATOR_MIN, 'MIN'],
         [Blockly.Msg.MATH_ONLIST_OPERATOR_MAX, 'MAX'],
         [Blockly.Msg.MATH_ONLIST_OPERATOR_AVERAGE, 'AVERAGE'],
         [Blockly.Msg.MATH_ONLIST_OPERATOR_MEDIAN, 'MEDIAN'],
         [Blockly.Msg.MATH_ONLIST_OPERATOR_MODE, 'MODE'],
         [Blockly.Msg.MATH_ONLIST_OPERATOR_STD_DEV, 'STD_DEV'],
         [Blockly.Msg.MATH_ONLIST_OPERATOR_RANDOM, 'RANDOM']];
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setHelpUrl(Blockly.Msg.MATH_ONLIST_HELPURL);
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, Blockly.StaticTyping.blocklyType.NUMBER);
    var dropdown = new Blockly.FieldDropdown(OPERATORS, function(newOp) {
      if (newOp == 'MODE') {
        thisBlock.outputConnection.setCheck('Array');
      } else {
        thisBlock.outputConnection.setCheck(Blockly.StaticTyping.blocklyType.NUMBER);
      }
    });
    this.appendValueInput('LIST')
        .setCheck('Array')
        .appendField(dropdown, 'OP');
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'SUM': Blockly.Msg.MATH_ONLIST_TOOLTIP_SUM,
        'MIN': Blockly.Msg.MATH_ONLIST_TOOLTIP_MIN,
        'MAX': Blockly.Msg.MATH_ONLIST_TOOLTIP_MAX,
        'AVERAGE': Blockly.Msg.MATH_ONLIST_TOOLTIP_AVERAGE,
        'MEDIAN': Blockly.Msg.MATH_ONLIST_TOOLTIP_MEDIAN,
        'MODE': Blockly.Msg.MATH_ONLIST_TOOLTIP_MODE,
        'STD_DEV': Blockly.Msg.MATH_ONLIST_TOOLTIP_STD_DEV,
        'RANDOM': Blockly.Msg.MATH_ONLIST_TOOLTIP_RANDOM
      };
      return TOOLTIPS[mode];
    });
  }
  //TODO: a getType once the list code is finished.
};

Blockly.Blocks['math_modulo'] = {
  /**
   * Block for remainder of a division.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.MATH_MODULO_HELPURL);
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, Blockly.StaticTyping.blocklyType.NUMBER);
    this.interpolateMsg(Blockly.Msg.MATH_MODULO_TITLE,
                        ['DIVIDEND',
                         Blockly.StaticTyping.blocklyType.NUMBER,
                         Blockly.ALIGN_RIGHT],
                        ['DIVISOR',
                         Blockly.StaticTyping.blocklyType.NUMBER,
                         Blockly.ALIGN_RIGHT],
                        Blockly.ALIGN_RIGHT);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MATH_MODULO_TOOLTIP);
  },
  /**
   * Assigns a type to the block, modulus only works on integers.
   */
  getType: function() {
    return Blockly.StaticTyping.blocklyType.INTEGER;
  }
};

Blockly.Blocks['math_constrain'] = {
  /**
   * Block for constraining a number between two limits.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.MATH_CONSTRAIN_HELPURL);
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, Blockly.StaticTyping.blocklyType.NUMBER);
    this.interpolateMsg(Blockly.Msg.MATH_CONSTRAIN_TITLE,
                        ['VALUE',
                         Blockly.StaticTyping.blocklyType.NUMBER,
                         Blockly.ALIGN_RIGHT],
                        ['LOW',
                         Blockly.StaticTyping.blocklyType.NUMBER,
                         Blockly.ALIGN_RIGHT],
                        ['HIGH',
                         Blockly.StaticTyping.blocklyType.NUMBER,
                         Blockly.ALIGN_RIGHT],
                        Blockly.ALIGN_RIGHT);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MATH_CONSTRAIN_TOOLTIP);
  }
  //TODO: a getType of the same type as the inputs.
};

Blockly.Blocks['math_random_int'] = {
  /**
   * Block for random integer between [X] and [Y].
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.MATH_RANDOM_INT_HELPURL);
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, Blockly.StaticTyping.blocklyType.NUMBER);
    this.interpolateMsg(Blockly.Msg.MATH_RANDOM_INT_TITLE,
                        ['FROM',
                         Blockly.StaticTyping.blocklyType.NUMBER,
                         Blockly.ALIGN_RIGHT],
                        ['TO',
                         Blockly.StaticTyping.blocklyType.NUMBER,
                         Blockly.ALIGN_RIGHT],
                        Blockly.ALIGN_RIGHT);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MATH_RANDOM_INT_TOOLTIP);
  },
  /**
   * Assigns a type to the block, always an int.
   */
  getType: function() {
    return Blockly.StaticTyping.blocklyType.INTEGER;
  }
};

Blockly.Blocks['math_random_float'] = {
  /**
   * Block for random fraction between 0 and 1.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.MATH_RANDOM_FLOAT_HELPURL);
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, Blockly.StaticTyping.blocklyType.NUMBER);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MATH_RANDOM_FLOAT_TITLE_RANDOM);
    this.setTooltip(Blockly.Msg.MATH_RANDOM_FLOAT_TOOLTIP);
  },
  /**
   * Assigns a type to the block, always a float.
   */
  getType: function() {
    return Blockly.StaticTyping.blocklyType.DECIMAL;
  }
};

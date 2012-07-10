/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
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

if (!Blockly.Language) Blockly.Language = {};

Blockly.Language.math_number = {
  // Numeric value.
  category: '算數',
  helpUrl: 'http://en.wikipedia.org/wiki/Number',
  init: function() {
    this.setColour(230);
    this.appendTitle(new Blockly.FieldTextInput('0', function(text) {
      // Ensure that only a number may be entered.
      // TODO: Handle cases like 'o', 'ten', '1,234', '3,14', etc.
      var n = window.parseFloat(text || 0);
      return window.isNaN(n) ? null : String(n);
    }), 'NUM');
    this.setOutput(true, Number);
    this.setTooltip('A number.');
  }
};

Blockly.Language.math_arithmetic = {
  // Basic arithmetic operator.
  category: '算數',
  helpUrl: 'http://en.wikipedia.org/wiki/Arithmetic',
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendInput('', Blockly.INPUT_VALUE, 'A', Number);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendInput([dropdown, 'OP'], Blockly.INPUT_VALUE, 'B', Number);
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getTitleValue('OP');
      return Blockly.Language.math_arithmetic.TOOLTIPS[mode];
    });
  }
};

Blockly.Language.math_arithmetic.OPERATORS =
    [['+', 'ADD'],
     ['-', 'MINUS'],
     ['\u00D7', 'MULTIPLY'],
     ['\u00F7', 'DIVIDE'],
     ['^', 'POWER']];

Blockly.Language.math_arithmetic.TOOLTIPS = {
  ADD: 'Return the sum of the two numbers.',
  MINUS: 'Return the difference of the two numbers.',
  MULTIPLY: 'Return the product of the two numbers.',
  DIVIDE: 'Return the quotient of the two numbers.',
  POWER: 'Return the first number raised to\nthe power of the second number.'
};

Blockly.Language.math_change = {
  // Add to a variable in place.
  category: '算數',
  helpUrl: 'http://en.wikipedia.org/wiki/Negation',
  init: function() {
    this.setColour(230);
    this.appendTitle('修改');
    this.appendTitle(new Blockly.FieldDropdown(
        Blockly.Variables.dropdownCreate, Blockly.Variables.dropdownChange), 'VAR')
        .setText('變量');
    this.appendInput('自', Blockly.INPUT_VALUE, 'DELTA', Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return 'Add a number to variable "' + thisBlock.getTitleText('VAR') + '".';
    });
  },
  getVars: function() {
    return [this.getTitleText('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleText('VAR'))) {
      this.setTitleText(newName, 'VAR');
    }
  }
};


Blockly.Language.math_single = {
  // Advanced math operators with single operand.
  category: '算數',
  helpUrl: 'http://en.wikipedia.org/wiki/Square_root',
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendInput([dropdown, 'OP'], Blockly.INPUT_VALUE, 'NUM', Number);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getTitleValue('OP');
      return Blockly.Language.math_single.TOOLTIPS[mode];
    });
  }
};

Blockly.Language.math_single.OPERATORS =
    [['開根號', 'ROOT'],
     ['絕對值', 'ABS'],
     ['-', 'NEG'],
     ['ln', 'LN'],
     ['log10', 'LOG10'],
     ['e^', 'EXP'],
     ['10^', 'POW10']];

Blockly.Language.math_single.TOOLTIPS = {
  ROOT: 'Return the square root of a number.',
  ABS: 'Return the absolute value of a number.',
  NEG: 'Return the negation of a number.',
  LN: 'Return the natural logarithm of a number.',
  LOG10: 'Return the base 10 logarithm of a number.',
  EXP: 'Return e to the power of a number.',
  POW10: 'Return 10 to the power of a number.'
};


Blockly.Language.math_round = {
  // Rounding functions.
  category: '算數',
  helpUrl: 'http://en.wikipedia.org/wiki/Rounding',
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendInput([dropdown, 'OP'], Blockly.INPUT_VALUE, 'NUM', Number);
    this.setTooltip('Round a number up or down.');
  }
};

Blockly.Language.math_round.OPERATORS =
    [['四捨五入', 'ROUND'],
     ['無條件進位', 'ROUNDUP'],
     ['無條件捨去', 'ROUNDDOWN']];

Blockly.Language.math_trig = {
  // Trigonometry operators.
  category: '算數',
  helpUrl: 'http://en.wikipedia.org/wiki/Trigonometric_functions',
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendInput([dropdown, 'OP'], Blockly.INPUT_VALUE, 'NUM', Number);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getTitleValue('OP');
      return Blockly.Language.math_trig.TOOLTIPS[mode];
    });
  }
};

Blockly.Language.math_trig.OPERATORS =
    [['sin', 'SIN'],
     ['cos', 'COS'],
     ['tan', 'TAN'],
     ['asin', 'ASIN'],
     ['acos', 'ACOS'],
     ['atan', 'ATAN']];

Blockly.Language.math_trig.TOOLTIPS = {
  SIN: 'Return the sine of a degree.',
  COS: 'Return the cosine of a degree.',
  TAN: 'Return the tangent of a degree.',
  ASIN: 'Return the arcsine of a number.',
  ACOS: 'Return the arccosine of a number.',
  ATAN: 'Return the arctangent of a number.'
};

Blockly.Language.math_on_list = {
  // Evaluate a list of numbers to return sum, average, min, max, etc.
  // Some functions also work on text (min, max, mode, median).
  category: '算數',
  helpUrl: '',
  init: function() {
    this.setColour(230);
    this.setOutput(true, [Number, Array]);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendTitle(dropdown, 'OP');
    this.appendInput('自列表', Blockly.INPUT_VALUE, 'LIST', Array);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getTitleValue('OP');
      return Blockly.Language.math_on_list.TOOLTIPS[mode];
    });
  }
};

Blockly.Language.math_on_list.OPERATORS =
    [['加總', 'SUM'],
     ['最小值', 'MIN'],
     ['最大值', 'MAX'],
     ['平均值', 'AVERAGE'],
     ['中位數', 'MEDIAN'],
     ['比較眾數', 'MODE'],
     ['標準差', 'STD_DEV'],
     ['隨機抽取', 'RANDOM']];

Blockly.Language.math_on_list.TOOLTIPS = {
  SUM: 'Return the sum of all the numbers in the list.',
  MIN: 'Return the smallest number in the list.',
  MAX: 'Return the largest number in the list.',
  AVERAGE: 'Return the arithmetic mean of the list.',
  MEDIAN: 'Return the median number in the list.',
  MODE: 'Return a list of the most common item(s) in the list.',
  STD_DEV: 'Return the standard deviation of the list.',
  RANDOM: 'Return a random element from the list.'
};

Blockly.Language.math_constrain = {
  // Constrain a number between two limits.
  category: '算數',
  helpUrl: 'http://en.wikipedia.org/wiki/Clamping_%28graphics%29',
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendInput('限制數字', Blockly.INPUT_VALUE, 'VALUE', Number);
    this.appendInput('介於 (低)', Blockly.INPUT_VALUE, 'LOW', Number);
    this.appendInput('到 (高)', Blockly.INPUT_VALUE, 'HIGH', Number);
    this.setInputsInline(true);
    this.setTooltip('Constrain a number to be between the specified limits (inclusive).');
  }
};

Blockly.Language.math_modulo = {
  // Remainder of a division.
  category: '算數',
  helpUrl: 'http://en.wikipedia.org/wiki/Modulo_operation',
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendInput('取餘數自', Blockly.INPUT_VALUE, 'DIVIDEND', Number);
    this.appendInput('\u00F7', Blockly.INPUT_VALUE, 'DIVISOR', Number);
    this.setInputsInline(true);
    this.setTooltip('Return the remainder of dividing both numbers.');
  }
};

Blockly.Language.math_random_int = {
  // Random integer between [X] and [Y].
  category: '算數',
  helpUrl: 'http://en.wikipedia.org/wiki/Random_number_generation',
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendTitle('取隨機整數');
    this.appendInput('介於(低)', Blockly.INPUT_VALUE, 'FROM', Number);
    this.appendInput('到(高)', Blockly.INPUT_VALUE, 'TO', Number);
    // TODO: Ensure that only number blocks may used to set range.
    this.setInputsInline(true);
    this.setTooltip('Return a random integer between the two\n specified limits, inclusive.');
  }
};

Blockly.Language.math_random_float = {
  // Random fraction between 0 and 1.
  category: '算數',
  helpUrl: 'http://en.wikipedia.org/wiki/Random_number_generation',
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendTitle('取隨機分數');
    this.setTooltip('Return a random fraction between\n0.0 (inclusive) and 1.0 (exclusive).');
  }
};

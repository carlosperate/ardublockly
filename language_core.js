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
 * @fileoverview Core blocks language for Blockly.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

Blockly.Language = {};

Blockly.Language.ifunless = {
  // If condition.
  category: 'Control',
  helpUrl: 'http://en.wikipedia.org/wiki/Conditional_(programming)',
  init: function() {
    this.setColour('purple');
    this.addTitle(new Blockly.FieldDropdown('if', function() {
      return ['if', 'unless'];
    }));
    this.addInput('test', '', Blockly.INPUT_VALUE);
    this.addInput('then do', '', Blockly.NEXT_STATEMENT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(this));
  }
};

Blockly.Language.foreach = {
  // For each loop.
  category: 'Control',
  helpUrl: 'http://en.wikipedia.org/wiki/For_loop',
  init: function() {
    this.setColour('purple');
    this.addTitle('for each');
    this.addInput('item', '', Blockly.LOCAL_VARIABLE).setText('x');
    this.addInput('in list', '', Blockly.INPUT_VALUE);
    this.addInput('do', '', Blockly.NEXT_STATEMENT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },
  getVars: function() {
    return [this.getVariableInput(0)];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Variables.nameEquals(oldName, this.getVariableInput(0))) {
      this.setVariableInput(0, newName);
    }
  }
};

Blockly.Language.text = {
  // Text value.
  category: 'Text',
  helpUrl: 'http://en.wikipedia.org/wiki/String_(computer_science)',
  init: function() {
    this.setColour('baby');
    this.addTitle('\u201C');
    this.addTitle(new Blockly.FieldTextInput(''));
    this.addTitle('\u201D');
    this.setOutput(true);
    this.setTooltip('A letter, word, or line of text.');
  }
};

Blockly.Language.print = {
  // Print statement.
  category: 'Text',
  helpUrl: 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html',
  init: function() {
    this.setColour('red');
    this.addTitle('print');
    this.addInput('', '', Blockly.INPUT_VALUE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

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

Blockly.Language.compare = {
  // Comparison operator.
  category: 'Math',
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

Blockly.Language.get = {
  // Variable getter.
  category: null,  // Variables are handled specially.
  helpUrl: 'http://en.wikipedia.org/wiki/Variable_(computer_science)',
  init: function() {
    this.setColour('blue');
    this.addTitle('get');
    this.addTitle(new Blockly.FieldDropdown('item',
        Blockly.Variables.dropdownCreate, Blockly.Variables.dropdownChange));
    this.setOutput(true);
  },
  getVars: function() {
    return [this.getTitleText(1)];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Variables.nameEquals(oldName, this.getTitleText(1))) {
      this.setTitleText(newName, 1);
    }
  }
};

Blockly.Language.set = {
  // Variable setter.
  category: null,  // Variables are handled specially.
  helpUrl: 'http://en.wikipedia.org/wiki/Variable_(computer_science)',
  init: function() {
    this.setColour('blue');
    this.addTitle('set');
    this.addTitle(new Blockly.FieldDropdown('item',
        Blockly.Variables.dropdownCreate, Blockly.Variables.dropdownChange));
    this.addInput('', '', Blockly.INPUT_VALUE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },
  getVars: function() {
    return [this.getTitleText(1)];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Variables.nameEquals(oldName, this.getTitleText(1))) {
      this.setTitleText(newName, 1);
    }
  }
};

Blockly.Language.getIndex = {
  // Get element at index.
  category: 'Lists',
  helpUrl: 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm',
  init: function() {
    this.setColour('blue');
    this.addTitle('get item');
    this.setOutput(true);
    this.addInput('from list', '', Blockly.INPUT_VALUE);
    this.addInput('at', '', Blockly.INPUT_VALUE);
    this.setInputsInline(true);
  }
};

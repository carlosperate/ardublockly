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
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

if (!Blockly.Language) Blockly.Language = {};

Blockly.Language.text = {
  // Text value.
  category: '字串',
  helpUrl: 'http://en.wikipedia.org/wiki/String_(computer_science)',
  init: function() {
    this.setColour(160);
    this.appendTitle('\u201C');
    this.appendTitle(new Blockly.FieldTextInput(''), 'TEXT');
    this.appendTitle('\u201D');
    this.setOutput(true, String);
    this.setTooltip('A letter, word, or line of text.');
  }
};

Blockly.Language.text_join = {
  // Create a string made up of any number of elements of any type.
  category: '字串',
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendTitle('建立字串使用');
    this.appendInput('', Blockly.INPUT_VALUE, 'ADD0', null);
    this.appendInput('', Blockly.INPUT_VALUE, 'ADD1', null);
    this.setOutput(true, String);
    this.setMutator(new Blockly.Mutator(['text_create_join_item']));
    this.setTooltip('Create a piece of text by joining\n' +
                    'together any number of items.');
    this.itemCount_ = 2;
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  domToMutation: function(xmlElement) {
    for (var x = 0; x < this.itemCount_; x++) {
      this.removeInput('ADD' + x);
    }
    this.itemCount_ = window.parseInt(xmlElement.getAttribute('items'), 10);
    for (var x = 0; x < this.itemCount_; x++) {
      this.appendInput('', Blockly.INPUT_VALUE, 'ADD' + x, null);
    }
  },
  decompose: function(workspace) {
    var listBlock = new Blockly.Block(workspace, 'text_create_join_container');
    listBlock.initSvg();
    var connection = listBlock.inputList[0];
    for (var x = 0; x < this.itemCount_; x++) {
      var itemBlock = new Blockly.Block(workspace, 'text_create_join_item');
      itemBlock.initSvg();
      // Store a pointer to any connected blocks.
      itemBlock.valueInput_ = this.getInput('ADD' + x).targetConnection;
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return listBlock;
  },
  compose: function(listBlock) {
    // Disconnect all input blocks and destroy all inputs.
    for (var x = 0; x < this.itemCount_; x++) {
      this.removeInput('ADD' + x);
    }
    this.itemCount_ = 0;
    // Rebuild the block's inputs.
    var itemBlock = listBlock.getInputTargetBlock('STACK');
    while (itemBlock) {
      var input =
          this.appendInput('', Blockly.INPUT_VALUE, 'ADD' + this.itemCount_);
      // Reconnect any child blocks.
      if (itemBlock.valueInput_) {
        input.connect(itemBlock.valueInput_);
      }
      this.itemCount_++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Language.text_create_join_container = {
  // Container.
  init: function() {
    this.setColour(160);
    this.appendTitle('加入');
    this.appendInput('', Blockly.NEXT_STATEMENT, 'STACK');
    this.setTooltip('Add, remove, or reorder sections to reconfigure this text block.');
    this.contextMenu = false;
  }
};

Blockly.Language.text_create_join_item = {
  // Add items.
  init: function() {
    this.setColour(160);
    this.appendTitle('字串');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Add an item to the text.');
    this.contextMenu = false;
  }
};

Blockly.Language.text_length = {
  // String length.
  category: '字串',
  helpUrl: 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html',
  init: function() {
    this.setColour(160);
    this.appendInput('長度', Blockly.INPUT_VALUE, 'VALUE', [String, Array]);
    this.setOutput(true, Number);
    this.setTooltip('Returns number of letters (including spaces)\n' +
                    'in the provided text.');
  }
};

Blockly.Language.text_isEmpty = {
  // Is the string null?
  category: '字串',
  helpUrl: 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html',
  init: function() {
    this.setColour(160);
    this.appendInput('為空', Blockly.INPUT_VALUE, 'VALUE', [String, Array]);
    this.setOutput(true, Boolean);
    this.setTooltip('Returns true if the provided text is empty.');
  }
};

Blockly.Language.text_endString = {
  // Return a leading or trailing substring.
  category: '字串',
  helpUrl: 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm',
  init: function() {
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setColour(160);
    this.setOutput(true, String);
    var menu = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendInput([menu, 'END'], Blockly.INPUT_VALUE, 'NUM', Number);
    this.appendInput('在字串中的字元', Blockly.INPUT_VALUE, 'TEXT', String);
    this.setInputsInline(true);
    this.setTooltip('Returns specified number of letters at the beginning or end of the text.');
  }
};

Blockly.Language.text_endString.OPERATORS =
    [['第一個', 'FIRST'], ['最後一個', 'LAST']];

Blockly.Language.text_indexOf = {
  // Find a substring in the text.
  category: '字串',
  helpUrl: 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm',
  init: function() {
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setColour(160);
    this.setOutput(true, Number);
    this.appendTitle('尋找');
    var menu = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendTitle(menu, 'END');
    this.appendInput('出現的字串', Blockly.INPUT_VALUE, 'FIND', String);
    this.appendInput('在字串', Blockly.INPUT_VALUE, 'VALUE', String);
    this.setInputsInline(true);
    this.setTooltip('Returns the index of the first/last occurrence\n' +
                    'of first text in the second text.\n' +
                    'Returns 0 if text is not found.');
  }
};

Blockly.Language.text_indexOf.OPERATORS =
    [['第一個', 'FIRST'], ['最後一個', 'LAST']];

Blockly.Language.text_charAt = {
  // Get a character from the string.
  category: '字串',
  helpUrl: 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm',
  init: function() {
    this.setColour(160);
    //this.appendTitle('');
    this.setOutput(true, String);
    this.appendInput('尋找位於', Blockly.INPUT_VALUE, 'AT', Number);
    this.appendInput('的字元在字串', Blockly.INPUT_VALUE, 'VALUE', String);
    this.setInputsInline(true);
    this.setTooltip('Returns the letter at the specified position.');
  }
};

Blockly.Language.text_changeCase = {
  // Change capitalization.
  category: '字串',
  helpUrl: 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html',
  init: function() {
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setColour(160);
    this.appendTitle('改成');
    var menu = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendInput([menu, 'CASE'], Blockly.INPUT_VALUE, 'TEXT', String);
    this.setOutput(true, String);
    this.setTooltip('Return a copy of the text in a different case.');
  },
};

Blockly.Language.text_changeCase.OPERATORS =
    [['轉大寫', 'UPPERCASE'],
     ['轉小寫', 'LOWERCASE'],
     ['頭字母大寫', 'TITLECASE']];

Blockly.Language.text_trim = {
  // Trim spaces.
  category: '字串',
  helpUrl: 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html',
  init: function() {
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setColour(160);
    this.appendTitle('從');
    var menu = new Blockly.FieldDropdown(this.OPERATORS, function(text) {
      var newTitle = (text == 'both') ? 'sides' : 'side';
      this.sourceBlock_.setTitleText(newTitle, 'SIDES');
      this.setText(text);
    });
    this.appendTitle(menu, 'MODE');
    //this.appendTitle('sides', 'SIDES');
    this.appendInput('消除空格', Blockly.INPUT_VALUE, 'TEXT', String);
    this.setOutput(true, String);
    this.setTooltip('Return a copy of the text with spaces\n' +
                    'removed from one or both ends.');
  },
  mutationToDom: function() {
    // Save whether the 'sides' title should be plural or singular.
    var container = document.createElement('mutation');
    var plural = (this.getTitleValue('MODE') == 'BOTH');
    container.setAttribute('plural', plural);
    return container;
  },
  domToMutation: function(container) {
    // Restore the 'sides' title as plural or singular.
    var plural = (container.getAttribute('plural') == 'true');
    this.setTitleText(plural ? 'sides' : 'side', 'SIDES');
  }
};

Blockly.Language.text_trim.OPERATORS =
    [['兩側', 'BOTH'], ['左側', 'LEFT'], ['右側', 'RIGHT']];

Blockly.Language.text_print = {
  // Print statement.
  category: '字串',
  helpUrl: 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html',
  init: function() {
    this.setColour(160);
    this.appendTitle('印出');
    this.appendInput('', Blockly.INPUT_VALUE, 'TEXT', null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Print the specified text, number or other value.');
  }
};

Blockly.Language.text_prompt = {
  // Prompt function.
  category: '字串',
  helpUrl: 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode92.html',
  init: function() {
    this.setColour(160);
    this.appendTitle('輸入');
    var menu = new Blockly.FieldDropdown(this.TYPES);
    this.appendTitle(menu, 'TYPE');
    this.appendTitle('附提示字串');
    this.appendTitle(new Blockly.FieldTextInput(''), 'TEXT');
    this.setOutput(true, [Number, String]);
    this.setTooltip('Prompt for user input with the specified text.');
  }
};

Blockly.Language.text_prompt.TYPES = [['文字', 'TEXT'], ['數字', 'NUMBER']];
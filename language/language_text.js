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
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

if (!Blockly.Language) {
  Blockly.Language = {};
}


Blockly.Language.text = {
  // Text value.
  category: 'Text',
  helpUrl: 'http://en.wikipedia.org/wiki/String_(computer_science)',
  init: function() {
    this.setColour('brown');
    this.addTitle('\u201C');
    this.addTitle(new Blockly.FieldTextInput(''));
    this.addTitle('\u201D');
    this.setOutput(true);
    this.setTooltip('A letter, word, or line of text.');
  }
};

Blockly.Language.text_length = {
  // String length.
  category: 'Text',
  helpUrl: 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html',
  init: function() {
    this.setColour('brown');
    this.addInput('length', '', Blockly.INPUT_VALUE);
    this.setOutput(true);
  }
};

Blockly.Language.text_changecase = {
  // Change capitalization.
  category: 'Text',
  helpUrl: 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html',
  init: function() {
    this.setColour('brown');
    this.addTitle('to');
    var menu = new Blockly.FieldDropdown('UPPER CASE', function() {
      return ['UPPER CASE', 'lower case', 'Title Case'];
    });
    this.addInput(menu, '', Blockly.INPUT_VALUE);
    this.setOutput(true);
  }
};

Blockly.Language.text_print = {
  // Print statement.
  category: 'Text',
  helpUrl: 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html',
  init: function() {
    this.setColour('brown');
    this.addTitle('print');
    this.addInput('', '', Blockly.INPUT_VALUE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

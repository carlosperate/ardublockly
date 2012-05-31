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
 * @fileoverview Procedure blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

if (!Blockly.Language) {
  Blockly.Language = {};
}

Blockly.Language.procedures_defnoreturn = {
  // Define a procedure with no return value.
  category: null,  // Procedures are handled specially.
  helpUrl: 'http://en.wikipedia.org/wiki/Variable_(computer_science)',
  init: function() {
    this.setColour(290);
    this.addTitle(new Blockly.FieldTextInput('procedure',
        Blockly.Procedures.rename));
    this.addInput('do', '', Blockly.NEXT_STATEMENT);
    //this.setMutator(new Blockly.Mutator(this, ['procedures_mutatorparam']));
    this.setTooltip('A procedure with no return value.');
  },
  getProcedureName: function() {
    return this.getTitleText(0);
  }
};

Blockly.Language.procedures_defreturn = {
  // Define a procedure with a return value.
  category: null,  // Procedures are handled specially.
  helpUrl: 'http://en.wikipedia.org/wiki/Variable_(computer_science)',
  init: function() {
    this.setColour(290);
    this.addTitle(new Blockly.FieldTextInput('procedure',
        Blockly.Procedures.rename));
    this.addInput('do', '', Blockly.NEXT_STATEMENT);
    this.addInput('return', '', Blockly.INPUT_VALUE);
    //this.setMutator(new Blockly.Mutator(this, ['procedures_mutatorparam']));
    this.setTooltip('A procedure with a return value.');
  },
  getProcedureName: function() {
    return this.getTitleText(0);
  }
};

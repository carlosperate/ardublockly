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
 * @fileoverview Procedure blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

if (!Blockly.Language) Blockly.Language = {};

Blockly.Language.procedures_defnoreturn = {
  // Define a procedure with no return value.
  category: null,  // Procedures are handled specially.
  helpUrl: Blockly.LANG_PROCEDURES_DEFNORETURN_HELPURL,
  init: function() {
    this.setColour(290);
    var name = Blockly.Procedures.findLegalName(Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE, this);
    this.appendTitle(new Blockly.FieldTextInput(name, Blockly.Procedures.rename), 'NAME');
    this.appendTitle('', 'PARAMS');
    this.appendInput(Blockly.LANG_PROCEDURES_DEFNORETURN_DO, Blockly.NEXT_STATEMENT, 'STACK');
    //this.setMutator(new Blockly.Mutator(['procedures_mutatorparam']));
    this.setTooltip(Blockly.LANG_PROCEDURES_DEFNORETURN_TOOLTIP_1);
    this.parameters_ = [];
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    for (var x = 0; x < this.parameters_.length; x++) {
      var parameter = document.createElement('param');
      parameter.setAttribute('name', this.parameters_[x]);
      container.appendChild(parameter);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    for (var x = 0; x < this.parameters_.length; x++) {
      this.removeInput('PARAM' + x);
    }
    this.parameters_ = [];
    for (var x = 0, childNode; childNode = xmlElement.childNodes[x]; x++) {
      if (childNode.nodeName == 'param') {
        this.parameters_.push(childNode.getAttribute('name'));
      }
    }
    var paramString = this.parameters_.join(', ');
    this.setTitleText(paramString, 'PARAMS');
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace, 'procedures_mutatorcontainer');
    containerBlock.initSvg();
    var connection = containerBlock.inputList[0];
    for (var x = 0; x < this.parameters_.length; x++) {
      var paramBlock = new Blockly.Block(workspace, 'procedures_mutatorparam');
      paramBlock.initSvg();
      paramBlock.setTitleText(this.parameters_[x], 'NAME');
      // Store the old name.
      paramBlock.oldName = this.parameters_[x];
      connection.connect(paramBlock.previousConnection);
      connection = paramBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    this.parameters_ = [];
    var paramBlock = containerBlock.getInputTargetBlock('STACK');
    while (paramBlock) {
      this.parameters_.push(paramBlock.getTitleText('NAME'));
      paramBlock = paramBlock.nextConnection &&
          paramBlock.nextConnection.targetBlock();
    }
    var paramString = this.parameters_.join(', ');
    this.setTitleText(paramString, 'PARAMS');
  },
  destroy: function() {
    var name = this.getTitleText('NAME');
    var editable = this.editable;
    var workspace = this.workspace;
    // Call parent's destructor.
    Blockly.Block.prototype.destroy.call(this);
    if (this.editable) {
      // Destroy any callers.
      Blockly.Procedures.destroyCallers(name, workspace);
    }
  },
  getProcedureDef: function() {
    // Return the name of the defined procedure
    // and that it does not have a return value.
    return [this.getTitleText('NAME'), false];
  }
};

Blockly.Language.procedures_defreturn = {
  // Define a procedure with a return value.
  category: null,  // Procedures are handled specially.
  helpUrl: Blockly.LANG_PROCEDURES_DEFRETURN_HELPURL,
  init: function() {
    this.setColour(290);
    var name = Blockly.Procedures.findLegalName(Blockly.LANG_PROCEDURES_DEFRETURN_PROCEDURE, this);
    this.appendTitle(new Blockly.FieldTextInput(name, Blockly.Procedures.rename), 'NAME');
    this.appendTitle('', 'PARAMS');
    this.appendInput(Blockly.LANG_PROCEDURES_DEFRETURN_DO, Blockly.NEXT_STATEMENT, 'STACK');
    this.appendInput(Blockly.LANG_PROCEDURES_DEFRETURN_RETURN, Blockly.INPUT_VALUE, 'RETURN', null);
    //this.setMutator(new Blockly.Mutator(['procedures_mutatorparam']));
    this.setTooltip(Blockly.LANG_PROCEDURES_DEFRETURN_TOOLTIP_1);
    this.parameters_ = [];
  },
  mutationToDom: Blockly.Language.procedures_defnoreturn.mutationToDom,
  domToMutation: Blockly.Language.procedures_defnoreturn.domToMutation,
  decompose: Blockly.Language.procedures_defnoreturn.decompose,
  compose: Blockly.Language.procedures_defnoreturn.compose,
  destroy: Blockly.Language.procedures_defnoreturn.destroy,
  getProcedureDef: Blockly.Language.procedures_defnoreturn.getProcedureDef
};

Blockly.Language.procedures_mutatorcontainer = {
  // Procedure container (for mutator dialog).
  init: function() {
    this.setColour(290);
    this.appendTitle('parameters');
    this.appendInput('', Blockly.NEXT_STATEMENT, 'STACK');
    this.setTooltip('');
    this.contextMenu = false;
  }
};

Blockly.Language.procedures_mutatorparam = {
  // Procedure parameter (for mutator dialog).
  init: function() {
    this.setColour(290);
    this.appendTitle('variable:');
    this.appendTitle(new Blockly.FieldTextInput('x'), 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.contextMenu = false;
  }
};

Blockly.Language.procedures_callnoreturn = {
  // Call a procedure with no return value.
  category: null,  // Procedures are handled specially.
  helpUrl: Blockly.LANG_PROCEDURES_CALLNORETURN_HELPURL,
  init: function() {
    this.setColour(290);
    this.appendTitle(Blockly.LANG_PROCEDURES_CALLNORETURN_CALL);
    this.appendTitle(Blockly.LANG_PROCEDURES_CALLNORETURN_PROCEDURE, 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_PROCEDURES_CALLNORETURN_TOOLTIP_1);
  },
  getProcedureCall: function() {
    return this.getTitleText('NAME');
  },
  renameProcedure: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleText('NAME'))) {
      this.setTitleText(newName, 'NAME');
    }
  },
  mutationToDom: function() {
    // Save the name.
    var container = document.createElement('mutation');
    container.setAttribute('name', this.getTitleText('NAME'));
    return container;
  },
  domToMutation: function(xmlElement) {
    // Restore the name.
    var name = xmlElement.getAttribute('name');
    this.setTitleText(name, 'NAME');
  }
};

Blockly.Language.procedures_callreturn = {
  // Call a procedure with a return value.
  category: null,  // Procedures are handled specially.
  helpUrl: Blockly.LANG_PROCEDURES_CALLRETURN_HELPURL,
  init: function() {
    this.setColour(290);
    this.appendTitle(Blockly.LANG_PROCEDURES_CALLRETURN_CALL);
    this.appendTitle(Blockly.LANG_PROCEDURES_CALLRETURN_PROCEDURE, 'NAME');
    this.setOutput(true, null);
    this.setTooltip(Blockly.LANG_PROCEDURES_CALLRETURN_TOOLTIP_1);
  },
  getProcedureCall: Blockly.Language.procedures_callnoreturn.getProcedureCall,
  renameProcedure: Blockly.Language.procedures_callnoreturn.renameProcedure,
  mutationToDom: Blockly.Language.procedures_callnoreturn.mutationToDom,
  domToMutation: Blockly.Language.procedures_callnoreturn.domToMutation
};

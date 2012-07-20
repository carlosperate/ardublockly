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
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    this.setTooltip(Blockly.LANG_PROCEDURES_DEFNORETURN_TOOLTIP_1);
    this.arguments_ = [];
  },
  updateParams_: function() {
    var paramString = this.arguments_.join(', ');
    this.setTitleText(paramString, 'PARAMS');
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    for (var x = 0; x < this.arguments_.length; x++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[x]);
      container.appendChild(parameter);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    this.arguments_ = [];
    for (var x = 0, childNode; childNode = xmlElement.childNodes[x]; x++) {
      if (childNode.nodeName == 'arg') {
        this.arguments_.push(childNode.getAttribute('name'));
      }
    }
    this.updateParams_();
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace, 'procedures_mutatorcontainer');
    containerBlock.initSvg();
    var connection = containerBlock.inputList[0];
    for (var x = 0; x < this.arguments_.length; x++) {
      var paramBlock = new Blockly.Block(workspace, 'procedures_mutatorarg');
      paramBlock.initSvg();
      paramBlock.setTitleText(this.arguments_[x], 'NAME');
      // Store the old location.
      paramBlock.oldLocation = x;
      connection.connect(paramBlock.previousConnection);
      connection = paramBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    this.arguments_ = [];
    oldMap = [];
    var paramBlock = containerBlock.getInputTargetBlock('STACK');
    while (paramBlock) {
      this.arguments_.push(paramBlock.getTitleText('NAME'));
      oldMap.push(paramBlock.oldLocation);
      paramBlock = paramBlock.nextConnection &&
          paramBlock.nextConnection.targetBlock();
    }
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this.getTitleText('NAME'),
                                     this.workspace, this.arguments_, oldMap);
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
    // Return the name of the defined procedure,
    // a list of all its arguments,
    // and that it DOES NOT have a return value.
    return [this.getTitleText('NAME'), this.arguments_, false];
  },
  getVars: function() {
    return this.arguments_;
  },
  renameVar: function(oldName, newName) {
    var change = false;
    for (var x = 0; x < this.arguments_.length; x++) {
      if (Blockly.Names.equals(oldName, this.arguments_[x])) {
        this.arguments_[x] = newName;
        change = true;
      }
    }
    if (change) {
      this.updateParams_();
    }
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
    this.appendInput(['', 'PARAMS'], Blockly.DUMMY_INPUT);
    this.appendInput(Blockly.LANG_PROCEDURES_DEFRETURN_DO, Blockly.NEXT_STATEMENT, 'STACK');
    this.appendInput(Blockly.LANG_PROCEDURES_DEFRETURN_RETURN, Blockly.INPUT_VALUE, 'RETURN', null);
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    this.setTooltip(Blockly.LANG_PROCEDURES_DEFRETURN_TOOLTIP_1);
    this.arguments_ = [];
  },
  updateParams_: Blockly.Language.procedures_defnoreturn.updateParams_,
  mutationToDom: Blockly.Language.procedures_defnoreturn.mutationToDom,
  domToMutation: Blockly.Language.procedures_defnoreturn.domToMutation,
  decompose: Blockly.Language.procedures_defnoreturn.decompose,
  compose: Blockly.Language.procedures_defnoreturn.compose,
  destroy: Blockly.Language.procedures_defnoreturn.destroy,
  getProcedureDef: function() {
    // Return the name of the defined procedure,
    // a list of all its arguments,
    // and that it DOES have a return value.
    return [this.getTitleText('NAME'), this.arguments_, true];
  },
  getVars: Blockly.Language.procedures_defnoreturn.getVars,
  renameVar: Blockly.Language.procedures_defnoreturn.renameVar
};

Blockly.Language.procedures_mutatorcontainer = {
  // Procedure container (for mutator dialog).
  init: function() {
    this.setColour(290);
    this.appendTitle(Blockly.LANG_PROCEDURES_MUTATORCONTAINER_TITLE);
    this.appendInput('', Blockly.NEXT_STATEMENT, 'STACK');
    this.setTooltip('');
    this.contextMenu = false;
  }
};

Blockly.Language.procedures_mutatorarg = {
  // Procedure argument (for mutator dialog).
  init: function() {
    this.setColour(290);
    this.appendTitle(Blockly.LANG_PROCEDURES_MUTATORARG_TITLE);
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
    this.arguments_ = [];
  },
  getProcedureCall: function() {
    return this.getTitleText('NAME');
  },
  renameProcedure: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleText('NAME'))) {
      this.setTitleText(newName, 'NAME');
    }
  },
  setProcedureParameters: function(parameters, oldMap) {
    // Disconnect all argument blocks and destroy all inputs.
    var oldConnections = [];
    for (var x = 0; x < this.arguments_.length; x++) {
      oldConnections[x] = this.getInput('ARG' + x).targetConnection;
      this.removeInput('ARG' + x);
    }
    this.arguments_ = [].concat(parameters);
    // Rebuild the block's arguments.
    for (var x = 0; x < this.arguments_.length; x++) {
      var input = this.appendInput(this.arguments_[x], Blockly.INPUT_VALUE,
          'ARG' + x, null);
      // Reconnect any child blocks.
      if (oldMap && oldMap[x] !== undefined && oldConnections[oldMap[x]]) {
        input.connect(oldConnections[oldMap[x]]);
      }
    }
  },
  mutationToDom: function() {
    // Save the name and arguments (none of which are editable).
    var container = document.createElement('mutation');
    container.setAttribute('name', this.getTitleText('NAME'));
    for (var x = 0; x < this.arguments_.length; x++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[x]);
      container.appendChild(parameter);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    // Restore the name and parameters.
    var name = xmlElement.getAttribute('name');
    this.setTitleText(name, 'NAME');
    this.arguments_ = [];
    for (var x = 0, childNode; childNode = xmlElement.childNodes[x]; x++) {
      if (childNode.tagName && childNode.tagName.toLowerCase() == 'arg') {
        var paramName = childNode.getAttribute('name');
        this.appendInput(paramName, Blockly.INPUT_VALUE,
            'ARG' + this.arguments_.length, null);
        this.arguments_.push(paramName);
      }
    }
  },
  renameVar: function(oldName, newName) {
    for (var x = 0; x < this.arguments_.length; x++) {
      if (Blockly.Names.equals(oldName, this.arguments_[x])) {
        this.arguments_[x] = newName;
        this.getInput('ARG' + x).label.setText(newName);
      }
    }
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
    this.arguments_ = [];
  },
  getProcedureCall: Blockly.Language.procedures_callnoreturn.getProcedureCall,
  renameProcedure: Blockly.Language.procedures_callnoreturn.renameProcedure,
  setProcedureParameters: Blockly.Language.procedures_callnoreturn.setProcedureParameters,
  mutationToDom: Blockly.Language.procedures_callnoreturn.mutationToDom,
  domToMutation: Blockly.Language.procedures_callnoreturn.domToMutation,
  renameVar: Blockly.Language.procedures_callnoreturn.renameVar
};

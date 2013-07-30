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
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

Blockly.Language.controls_if = {
  // If/elseif/else condition.
  helpUrl: Blockly.LANG_CONTROLS_IF_HELPURL,
  init: function() {
    this.setColour(120);
    this.appendValueInput('IF0')
        .setCheck('Boolean')
        .appendTitle(Blockly.LANG_CONTROLS_IF_MSG_IF);
    this.appendStatementInput('DO0')
        .appendTitle(Blockly.LANG_CONTROLS_IF_MSG_THEN);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['controls_if_elseif',
                                         'controls_if_else']));
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return Blockly.LANG_CONTROLS_IF_TOOLTIP_1;
      } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return Blockly.LANG_CONTROLS_IF_TOOLTIP_2;
      } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return Blockly.LANG_CONTROLS_IF_TOOLTIP_3;
      } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return Blockly.LANG_CONTROLS_IF_TOOLTIP_4;
      }
      return '';
    });
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
  },
  mutationToDom: function() {
    if (!this.elseifCount_ && !this.elseCount_) {
      return null;
    }
    var container = document.createElement('mutation');
    if (this.elseifCount_) {
      container.setAttribute('elseif', this.elseifCount_);
    }
    if (this.elseCount_) {
      container.setAttribute('else', 1);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    this.elseifCount_ = window.parseInt(xmlElement.getAttribute('elseif'), 10);
    this.elseCount_ = window.parseInt(xmlElement.getAttribute('else'), 10);
    for (var x = 1; x <= this.elseifCount_; x++) {
      this.appendValueInput('IF' + x)
          .setCheck('Boolean')
          .appendTitle(Blockly.LANG_CONTROLS_IF_MSG_ELSEIF);
      this.appendStatementInput('DO' + x)
          .appendTitle(Blockly.LANG_CONTROLS_IF_MSG_THEN);
    }
    if (this.elseCount_) {
      this.appendStatementInput('ELSE')
          .appendTitle(Blockly.LANG_CONTROLS_IF_MSG_ELSE);
    }
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace, 'controls_if_if');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 1; x <= this.elseifCount_; x++) {
      var elseifBlock = new Blockly.Block(workspace, 'controls_if_elseif');
      elseifBlock.initSvg();
      connection.connect(elseifBlock.previousConnection);
      connection = elseifBlock.nextConnection;
    }
    if (this.elseCount_) {
      var elseBlock = new Blockly.Block(workspace, 'controls_if_else');
      elseBlock.initSvg();
      connection.connect(elseBlock.previousConnection);
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Disconnect the else input blocks and remove the inputs.
    if (this.elseCount_) {
      this.removeInput('ELSE');
    }
    this.elseCount_ = 0;
    // Disconnect all the elseif input blocks and remove the inputs.
    for (var x = this.elseifCount_; x > 0; x--) {
      this.removeInput('IF' + x);
      this.removeInput('DO' + x);
    }
    this.elseifCount_ = 0;
    // Rebuild the block's optional inputs.
    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          this.elseifCount_++;
          var ifInput = this.appendValueInput('IF' + this.elseifCount_)
              .setCheck('Boolean')
              .appendTitle(Blockly.LANG_CONTROLS_IF_MSG_ELSEIF);
          var doInput = this.appendStatementInput('DO' + this.elseifCount_);
          doInput.appendTitle(Blockly.LANG_CONTROLS_IF_MSG_THEN);
          // Reconnect any child blocks.
          if (clauseBlock.valueConnection_) {
            ifInput.connection.connect(clauseBlock.valueConnection_);
          }
          if (clauseBlock.statementConnection_) {
            doInput.connection.connect(clauseBlock.statementConnection_);
          }
          break;
        case 'controls_if_else':
          this.elseCount_++;
          var elseInput = this.appendStatementInput('ELSE');
          elseInput.appendTitle(Blockly.LANG_CONTROLS_IF_MSG_ELSE);
          // Reconnect any child blocks.
          if (clauseBlock.statementConnection_) {
            elseInput.connection.connect(clauseBlock.statementConnection_);
          }
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  },
  saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          var inputIf = this.getInput('IF' + x);
          var inputDo = this.getInput('DO' + x);
          clauseBlock.valueConnection_ =
              inputIf && inputIf.connection.targetConnection;
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          x++;
          break;
        case 'controls_if_else':
          var inputDo = this.getInput('ELSE');
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Language.controls_if_if = {
  // If condition.
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_CONTROLS_IF_IF_TITLE_IF);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.LANG_CONTROLS_IF_IF_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Language.controls_if_elseif = {
  // Else-If condition.
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_CONTROLS_IF_ELSEIF_TITLE_ELSEIF);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_CONTROLS_IF_ELSEIF_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Language.controls_if_else = {
  // Else condition.
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_CONTROLS_IF_ELSE_TITLE_ELSE);
    this.setPreviousStatement(true);
    this.setTooltip(Blockly.LANG_CONTROLS_IF_ELSE_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Language.logic_compare = {
  // Comparison operator.
  helpUrl: Blockly.LANG_LOGIC_COMPARE_HELPURL,
  init: function() {
    this.setColour(120);
    this.setOutput(true, 'Boolean');
    this.appendValueInput('A');
    this.appendValueInput('B')
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('OP');
      return thisBlock.TOOLTIPS[op];
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
  helpUrl: Blockly.LANG_LOGIC_OPERATION_HELPURL,
  init: function() {
    this.setColour(120);
    this.setOutput(true, 'Boolean');
    this.appendValueInput('A')
        .setCheck('Boolean');
    this.appendValueInput('B')
        .setCheck('Boolean')
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('OP');
      return thisBlock.TOOLTIPS[op];
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
  helpUrl: Blockly.LANG_LOGIC_NEGATE_HELPURL,
  init: function() {
    this.setColour(120);
    this.setOutput(true, 'Boolean');
    this.appendValueInput('BOOL')
        .setCheck('Boolean')
        .appendTitle(Blockly.LANG_LOGIC_NEGATE_INPUT_NOT);
    this.setTooltip(Blockly.LANG_LOGIC_NEGATE_TOOLTIP);
  }
};

Blockly.Language.logic_boolean = {
  // Boolean data type: true and false.
  helpUrl: Blockly.LANG_LOGIC_BOOLEAN_HELPURL,
  init: function() {
    this.setColour(120);
    this.setOutput(true, 'Boolean');
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
  helpUrl: Blockly.LANG_LOGIC_NULL_HELPURL,
  init: function() {
    this.setColour(120);
    this.setOutput(true);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_LOGIC_NULL);
    this.setTooltip(Blockly.LANG_LOGIC_NULL_TOOLTIP);
  }
};

Blockly.Language.logic_ternary = {
  // Ternary operator.
  helpUrl: Blockly.LANG_LOGIC_TERNARY_HELPURL,
  init: function() {
    this.setColour(120);
    this.appendValueInput('IF')
        .setCheck('Boolean')
        .appendTitle(Blockly.LANG_LOGIC_TERNARY_CONDITION);
    this.appendValueInput('THEN')
        .appendTitle(Blockly.LANG_LOGIC_TERNARY_IF_TRUE);
    this.appendValueInput('ELSE')
        .appendTitle(Blockly.LANG_LOGIC_TERNARY_IF_FALSE);
    this.setOutput(true);
    this.setTooltip(Blockly.LANG_LOGIC_TERNARY_TOOLTIP);
  }
};

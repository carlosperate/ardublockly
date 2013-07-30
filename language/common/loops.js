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
 * @fileoverview Loop blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Language.controls_repeat = {
  // Repeat n times (internal number).
  helpUrl: Blockly.LANG_CONTROLS_REPEAT_HELPURL,
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_CONTROLS_REPEAT_TITLE_REPEAT)
        .appendTitle(new Blockly.FieldTextInput('10',
            Blockly.FieldTextInput.nonnegativeIntegerValidator), 'TIMES')
        .appendTitle(Blockly.LANG_CONTROLS_REPEAT_TITLE_TIMES);
    this.appendStatementInput('DO')
        .appendTitle(Blockly.LANG_CONTROLS_REPEAT_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_CONTROLS_REPEAT_TOOLTIP);
  }
};

Blockly.Language.controls_repeat_ext = {
  // Repeat n times (external number).
  helpUrl: Blockly.LANG_CONTROLS_REPEAT_HELPURL,
  init: function() {
    this.setColour(120);
    this.appendValueInput('TIMES')
        .setCheck('Number')
        .appendTitle(Blockly.LANG_CONTROLS_REPEAT_TITLE_REPEAT)
    if (Blockly.LANG_CONTROLS_REPEAT_TITLE_TIMES) {
      this.appendDummyInput()
          .appendTitle(Blockly.LANG_CONTROLS_REPEAT_TITLE_TIMES);
    }
    this.appendStatementInput('DO')
        .appendTitle(Blockly.LANG_CONTROLS_REPEAT_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_CONTROLS_REPEAT_TOOLTIP);
  }
};

Blockly.Language.controls_whileUntil = {
  // Do while/until loop.
  helpUrl: Blockly.LANG_CONTROLS_WHILEUNTIL_HELPURL,
  init: function() {
    this.setColour(120);
    this.appendValueInput('BOOL')
        .setCheck('Boolean')
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'MODE');
    this.appendStatementInput('DO')
        .appendTitle(Blockly.LANG_CONTROLS_WHILEUNTIL_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('MODE');
      return thisBlock.TOOLTIPS[op];
    });
  }
};

Blockly.Language.controls_whileUntil.OPERATORS =
    [[Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE, 'WHILE'],
     [Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, 'UNTIL']];

Blockly.Language.controls_whileUntil.TOOLTIPS = {
  WHILE: Blockly.LANG_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,
  UNTIL: Blockly.LANG_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL
};

Blockly.Language.controls_for = {
  // For loop.
  helpUrl: Blockly.LANG_CONTROLS_FOR_HELPURL,
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_CONTROLS_FOR_INPUT_WITH)
        .appendTitle(new Blockly.FieldVariable(null), 'VAR');
    this.appendValueInput('FROM')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LANG_CONTROLS_FOR_INPUT_FROM);
    this.appendValueInput('TO')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LANG_CONTROLS_FOR_INPUT_TO);
    this.appendValueInput('BY')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LANG_CONTROLS_FOR_INPUT_BY);
    if (Blockly.LANG_CONTROLS_FOR_TAIL) {
      this.appendDummyInput()
          .appendTitle(Blockly.LANG_CONTROLS_FOR_TAIL);
    }
    this.appendStatementInput('DO')
        .appendTitle(Blockly.LANG_CONTROLS_FOR_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.LANG_CONTROLS_FOR_TOOLTIP.replace('%1',
          thisBlock.getTitleValue('VAR'));
    });
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  },
  customContextMenu: function(options) {
    var option = {enabled: true};
    var name = this.getTitleValue('VAR');
    option.text = Blockly.LANG_VARIABLES_SET_CREATE_GET.replace('%1', name);
    var xmlTitle = goog.dom.createDom('title', null, name);
    xmlTitle.setAttribute('name', 'VAR');
    var xmlBlock = goog.dom.createDom('block', null, xmlTitle);
    xmlBlock.setAttribute('type', 'variables_get');
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);
  }
};

Blockly.Language.controls_forEach = {
  // For each loop.
  helpUrl: Blockly.LANG_CONTROLS_FOREACH_HELPURL,
  init: function() {
    this.setColour(120);
    this.appendValueInput('LIST')
        .setCheck('Array')
        .appendTitle(Blockly.LANG_CONTROLS_FOREACH_INPUT_ITEM)
        .appendTitle(new Blockly.FieldVariable(null), 'VAR')
        .appendTitle(Blockly.LANG_CONTROLS_FOREACH_INPUT_INLIST);
    if (Blockly.LANG_CONTROLS_FOREACH_INPUT_INLIST_TAIL) {
      this.appendDummyInput()
          .appendTitle(Blockly.LANG_CONTROLS_FOREACH_INPUT_INLIST_TAIL);
      this.setInputsInline(true);
    }
    this.appendStatementInput('DO')
        .appendTitle(Blockly.LANG_CONTROLS_FOREACH_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.LANG_CONTROLS_FOREACH_TOOLTIP.replace('%1',
          thisBlock.getTitleValue('VAR'));
    });
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  },
  customContextMenu: Blockly.Language.controls_for.customContextMenu
};

Blockly.Language.controls_flow_statements = {
  // Flow statements: continue, break.
  helpUrl: Blockly.LANG_CONTROLS_FLOW_STATEMENTS_HELPURL,
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'FLOW');
    this.setPreviousStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('FLOW');
      return thisBlock.TOOLTIPS[op];
    });
  },
  onchange: function() {
    if (!this.workspace) {
      // Block has been deleted.
      return;
    }
    var legal = false;
    // Is the block nested in a control statement?
    var block = this;
    do {
      if (block.type == 'controls_repeat' ||
          block.type == 'controls_forEach' ||
          block.type == 'controls_for' ||
          block.type == 'controls_whileUntil') {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);
    if (legal) {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.LANG_CONTROLS_FLOW_STATEMENTS_WARNING);
    }
  }
};

Blockly.Language.controls_flow_statements.OPERATORS =
    [[Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK, 'BREAK'],
     [Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE, 'CONTINUE']];

Blockly.Language.controls_flow_statements.TOOLTIPS = {
  BREAK: Blockly.LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK,
  CONTINUE: Blockly.LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE
};

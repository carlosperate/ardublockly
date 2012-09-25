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
 * @fileoverview Blocks for building blocks.
 * @author fraser@google.com (Neil Fraser)
 */

if (!Blockly.Language) Blockly.Language = {};

Blockly.Language.factory_base = {
  // Base of new block.
  category: null,
  init: function() {
    this.setColour(120);
    var row = this.appendInput(Blockly.DUMMY_INPUT, '');
    row.appendTitle('category');
    row.appendTitle(new Blockly.FieldTextInput('Math'), 'CAT');
    row = this.appendInput(Blockly.DUMMY_INPUT, '');
    row.appendTitle('name');
    row.appendTitle(new Blockly.FieldTextInput('foo'), 'NAME');
    this.appendInput(Blockly.NEXT_STATEMENT, 'TITLES', 'Title')
        .appendTitle('titles');
    this.appendInput(Blockly.NEXT_STATEMENT, 'INPUTS', 'Input')
        .appendTitle('inputs');
    var dropdown = new Blockly.FieldDropdown([
        ['external inputs', 'EXT'],
        ['inline inputs', 'INT']]);
    this.appendInput(Blockly.DUMMY_INPUT, '')
        .appendTitle(dropdown, 'INLINE');
    dropdown = new Blockly.FieldDropdown([
        ['no connections', 'NONE'],
        ['left output', 'LEFT'],
        ['top+bottom connections', 'BOTH'],
        ['top connection', 'TOP'],
        ['bottom connection', 'BOTTOM']],
        function(option) {
          var block = this.sourceBlock_;
          var outputExists = block.getInput('OUTPUTTYPE');
          var topExists = block.getInput('TOPTYPE');
          var bottomExists = block.getInput('BOTTOMTYPE');
          if (option == 'left output') {
            if (!outputExists) {
              block.appendInput(Blockly.INPUT_VALUE, 'OUTPUTTYPE', 'Type')
                  .appendTitle('output type');
              block.moveInputBefore('OUTPUTTYPE', 'COLOUR');
            }
          } else if (outputExists) {
            block.removeInput('OUTPUTTYPE');
          }
          if (option == 'top connection' ||
              option == 'top+bottom connections') {
            if (!topExists) {
              block.appendInput(Blockly.INPUT_VALUE, 'TOPTYPE', 'Type')
                  .appendTitle('top type');
              block.moveInputBefore('TOPTYPE', 'COLOUR');
            }
          } else if (topExists) {
            block.removeInput('TOPTYPE');
          }
          if (option == 'bottom connection' ||
              option == 'top+bottom connections') {
            if (!bottomExists) {
              block.appendInput(Blockly.INPUT_VALUE, 'BOTTOMTYPE', 'Type')
                  .appendTitle('bottom type');
              block.moveInputBefore('BOTTOMTYPE', 'COLOUR');
            }
          } else if (bottomExists) {
            block.removeInput('BOTTOMTYPE');
          }
          this.setText(option);
        });
    this.appendInput(Blockly.DUMMY_INPUT, '')
        .appendTitle(dropdown, 'CONNECTIONS');
    this.appendInput(Blockly.INPUT_VALUE, 'COLOUR', 'Colour')
        .appendTitle('colour');
    /*
    this.appendInput(Blockly.INPUT_VALUE, 'TOOLLTIP', String)
        .appendTitle('tooltip');
    this.appendInput(Blockly.INPUT_VALUE, 'HELP', String)
        .appendTitle('help url');
    */
    this.setTooltip('');
  }
};

Blockly.Language.title_static = {
  // Text value.
  category: 'Title',
  init: function() {
    this.setColour(160);
    this.appendTitle('text');
    this.appendTitle(new Blockly.FieldTextInput(''), 'TEXT');
    this.setPreviousStatement(true, 'Title');
    this.setNextStatement(true, 'Title');
    this.setTooltip('');
  }
};

Blockly.Language.title_input = {
  // Text input.
  category: 'Title',
  init: function() {
    this.setColour(160);
    this.appendTitle('text input');
    this.appendTitle(new Blockly.FieldTextInput('default'), 'TEXT');
    this.appendTitle(',');
    this.appendTitle(new Blockly.FieldTextInput('NAME'), 'NAME');
    this.setPreviousStatement(true, 'Title');
    this.setNextStatement(true, 'Title');
    this.setTooltip('');
  }
};

Blockly.Language.title_dropdown = {
  // Dropdown menu.
  category: 'Title',
  init: function() {
    this.setColour(160);
    this.appendTitle('dropdown');
    var input = this.appendInput(Blockly.DUMMY_INPUT, '');
    input.appendTitle(new Blockly.FieldTextInput('NAME'), 'NAME');
    input = this.appendInput(Blockly.DUMMY_INPUT, '');
    input.appendTitle(new Blockly.FieldTextInput('item'), 'USER1');
    input.appendTitle(',');
    input.appendTitle(new Blockly.FieldTextInput('ITEM'), 'CPU1');
    input = this.appendInput(Blockly.DUMMY_INPUT, '');
    input.appendTitle(new Blockly.FieldTextInput('item'), 'USER2');
    input.appendTitle(',');
    input.appendTitle(new Blockly.FieldTextInput('ITEM'), 'CPU2');
    input = this.appendInput(Blockly.DUMMY_INPUT, '');
    input.appendTitle(new Blockly.FieldTextInput('item'), 'USER3');
    input.appendTitle(',');
    input.appendTitle(new Blockly.FieldTextInput('ITEM'), 'CPU3');
    this.setPreviousStatement(true, 'Title');
    this.setNextStatement(true, 'Title');
    this.setTooltip('');
    this.itemCount_ = 3;
  }
};

Blockly.Language.title_variable = {
  // Dropdown for variables.
  category: 'Title',
  init: function() {
    this.setColour(160);
    this.appendTitle('variable');
    this.appendTitle(new Blockly.FieldTextInput('item'), 'TEXT');
    this.appendTitle(',');
    this.appendTitle(new Blockly.FieldTextInput('NAME'), 'NAME');
    this.setPreviousStatement(true, 'Title');
    this.setNextStatement(true, 'Title');
    this.setTooltip('');
  }
};

Blockly.Language.input_value = {
  // Value input.
  category: 'Input',
  init: function() {
    this.setColour(210);
    this.appendTitle('value input');
    this.appendInput(Blockly.DUMMY_INPUT, '')
        .appendTitle(new Blockly.FieldTextInput('NAME'), 'NAME');
    this.appendInput(Blockly.NEXT_STATEMENT, 'TITLES', 'Title')
        .appendTitle('titles');
    this.appendInput(Blockly.INPUT_VALUE, 'TYPE', 'Type')
        .appendTitle('type');
    this.setPreviousStatement(true, 'Input');
    this.setNextStatement(true, 'Input');
    this.setTooltip('');
  }
};

Blockly.Language.input_statement = {
  // Statement input.
  category: 'Input',
  init: function() {
    this.setColour(210);
    this.appendTitle('statement input');
    this.appendInput(Blockly.DUMMY_INPUT, '')
        .appendTitle(new Blockly.FieldTextInput('NAME'), 'NAME');
    this.appendInput(Blockly.NEXT_STATEMENT, 'TITLES', 'Title')
        .appendTitle('titles');
    this.appendInput(Blockly.INPUT_VALUE, 'TYPE', 'Type')
        .appendTitle('type');
    this.setPreviousStatement(true, 'Input');
    this.setNextStatement(true, 'Input');
    this.setTooltip('');
  }
};

Blockly.Language.input_dummy = {
  // Dummy input.
  category: 'Input',
  init: function() {
    this.setColour(210);
    this.appendTitle('dummy input');
    this.appendInput(Blockly.NEXT_STATEMENT, 'TITLES', 'Title')
        .appendTitle('titles');
    this.setPreviousStatement(true, 'Input');
    this.setNextStatement(true, 'Input');
    this.setTooltip('');
  }
};

(function() {
  var ColourBlock = function(hue) {
    this.colourHue = hue;
  };
  ColourBlock.prototype.category = 'Colour';
  ColourBlock.prototype.init = function() {
    this.setColour(this.colourHue);
    this.appendTitle('hue:');
    this.appendTitle(new Blockly.FieldTextInput(String(this.colourHue),
                                                ColourBlock.validator), 'HUE');
    this.setOutput(true, 'Colour');
    this.setTooltip('');
  };
  ColourBlock.validator = function(text) {
    // Ensure that only a number may be entered.
    var n = window.parseInt(text || 0, 10);
    if (window.isNaN(n) || n < 0) {
      return null;
    }
    n %= 360;
    this.sourceBlock_.setColour(n);
    return String(n);
  };

  var colours = [65, 120, 160, 210, 230, 290, 330];
  for (var x = 0; x < colours.length; x++) {
    Blockly.Language['colour_' + x] = new ColourBlock(colours[x]);
  }
})();

Blockly.Language.type_group = {
  // Group of types.
  category: 'Type',
  init: function() {
    this.setColour(230);
    this.appendTitle('any of');
    this.appendInput(Blockly.INPUT_VALUE, 'TYPE0', 'Type');
    this.appendInput(Blockly.INPUT_VALUE, 'TYPE1', 'Type');
    this.setOutput(true, 'Type');
    this.setMutator(new Blockly.Mutator(['type_group_item']));
    this.setTooltip('');
    this.typeCount_ = 2;
  },
  mutationToDom: function(workspace) {
    var container = document.createElement('mutation');
    container.setAttribute('types', this.typeCount_);
    return container;
  },
  domToMutation: function(container) {
    for (var x = 0; x < this.typeCount_; x++) {
      this.removeInput('TYPE' + x);
    }
    this.typeCount_ = window.parseInt(container.getAttribute('types'), 10);
    for (var x = 0; x < this.typeCount_; x++) {
      this.appendInput(Blockly.INPUT_VALUE, 'TYPE' + x, null);
    }
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace,
                                           'type_group_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 0; x < this.typeCount_; x++) {
      var typeBlock = new Blockly.Block(workspace, 'type_group_item');
      typeBlock.initSvg();
      connection.connect(typeBlock.previousConnection);
      connection = typeBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Disconnect all input blocks and destroy all inputs.
    for (var x = this.typeCount_ - 1; x >= 0; x--) {
      this.removeInput('TYPE' + x);
    }
    this.typeCount_ = 0;
    // Rebuild the block's inputs.
    var typeBlock = containerBlock.getInputTargetBlock('STACK');
    while (typeBlock) {
      var input = this.appendInput(Blockly.INPUT_VALUE,
                                   'TYPE' + this.typeCount_, null);
      // Reconnect any child blocks.
      if (typeBlock.valueConnection_) {
        input.connection.connect(typeBlock.valueConnection_);
      }
      this.typeCount_++;
      typeBlock = typeBlock.nextConnection &&
          typeBlock.nextConnection.targetBlock();
    }
  },
  saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var typeBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 0;
    while (typeBlock) {
      var input = this.getInput('TYPE' + x);
      typeBlock.valueConnection_ = input && input.connection.targetConnection;
      x++;
      typeBlock = typeBlock.nextConnection &&
          typeBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Language.type_group_container = {
  // Container.
  init: function() {
    this.setColour(230);
    this.appendTitle('add types');
    this.appendInput(Blockly.NEXT_STATEMENT, 'STACK');
    this.setTooltip('');
    this.contextMenu = false;
  }
};

Blockly.Language.type_group_item = {
  // Add type.
  init: function() {
    this.setColour(230);
    this.appendTitle('type');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.contextMenu = false;
  }
};

Blockly.Language.type_null = {
  // Null type.
  category: 'Type',
  valueType: 'null',
  init: function() {
    this.setColour(230);
    this.appendTitle('any');
    this.setOutput(true, 'Type');
    this.setTooltip('');
  }
};

Blockly.Language.type_boolean = {
  // Boolean type.
  category: 'Type',
  valueType: 'Boolean',
  init: function() {
    this.setColour(230);
    this.appendTitle('boolean');
    this.setOutput(true, 'Type');
    this.setTooltip('');
  }
};

Blockly.Language.type_number = {
  // Number type.
  category: 'Type',
  valueType: 'Number',
  init: function() {
    this.setColour(230);
    this.appendTitle('number');
    this.setOutput(true, 'Type');
    this.setTooltip('');
  }
};

Blockly.Language.type_string = {
  // String type.
  category: 'Type',
  valueType: 'String',
  init: function() {
    this.setColour(230);
    this.appendTitle('string');
    this.setOutput(true, 'Type');
    this.setTooltip('');
  }
};

Blockly.Language.type_list = {
  // List type.
  category: 'Type',
  valueType: 'Array',
  init: function() {
    this.setColour(230);
    this.appendTitle('list');
    this.setOutput(true, 'Type');
    this.setTooltip('');
  }
};

Blockly.Language.type_other = {
  // Other type.
  category: 'Type',
  valueType: undefined,
  init: function() {
    this.setColour(230);
    this.appendTitle('other');
    this.appendTitle(new Blockly.FieldTextInput(''), 'TYPE');
    this.setOutput(true, 'Type');
    this.setTooltip('');
  }
};

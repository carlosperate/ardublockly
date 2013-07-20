/**
 * Blockly Demo: Maze
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
 * @fileoverview Demonstration of Blockly: Solving a maze.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

// Extensions to Blockly's language and JavaScript generator.

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.Language.maze_moveForward = {
  // Block for moving forward.
  helpUrl: 'http://code.google.com/p/blockly/wiki/Move',
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('moveForward'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('moveForwardTooltip'));
  }
};

Blockly.JavaScript.maze_moveForward = function() {
  // Generate JavaScript for moving forward.
  return 'Maze.moveForward(\'block_id_' + this.id + '\');\n';
};

Blockly.Language.maze_turn = {
  // Block for turning left or right.
  helpUrl: 'http://code.google.com/p/blockly/wiki/Turn',
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(this.DIRECTIONS), 'DIR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('turnTooltip'));
  }
};

Blockly.Language.maze_turn.DIRECTIONS =
    [[BlocklyApps.getMsg('turnLeft') + ' \u27F2', 'turnLeft'],
     [BlocklyApps.getMsg('turnRight') + ' \u27F3', 'turnRight']];

Blockly.JavaScript.maze_turn = function() {
  // Generate JavaScript for turning left or right.
  var dir = this.getTitleValue('DIR');
  return 'Maze.' + dir + '(\'block_id_' + this.id + '\');\n';
};

Blockly.Language.maze_isPath = {
  // Block for checking if there a path.
  helpUrl: '',
  init: function() {
    this.setColour(120);
    this.setOutput(true, 'Boolean');
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(this.DIRECTIONS), 'DIR');
    this.setTooltip(BlocklyApps.getMsg('isPathTooltip'));
  }
};

Blockly.Language.maze_isPath.DIRECTIONS =
    [[BlocklyApps.getMsg('pathAhead'), 'isPathForward'],
     [BlocklyApps.getMsg('pathLeft') + ' \u27F2', 'isPathLeft'],
     [BlocklyApps.getMsg('pathRight') + ' \u27F3', 'isPathRight']];

Blockly.JavaScript.maze_isPath = function() {
  // Generate JavaScript for checking if there is a path.
  var code = 'Maze.' + this.getTitleValue('DIR') + '()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Language.maze_if = {
  // Block for 'if' conditional if there is a path.
  helpUrl: '',
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(this.DIRECTIONS), 'DIR');
    this.appendStatementInput('DO')
        .appendTitle(BlocklyApps.getMsg('doCode'));
    this.setTooltip(BlocklyApps.getMsg('ifTooltip'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Language.maze_if.DIRECTIONS =
    Blockly.Language.maze_isPath.DIRECTIONS;

Blockly.JavaScript.maze_if = function() {
  // Generate JavaScript for 'if' conditional if there is a path.
  var argument = 'Maze.' + this.getTitleValue('DIR') +
      '(\'block_id_' + this.id + '\')';
  var branch = Blockly.JavaScript.statementToCode(this, 'DO');
  var code = 'if (' + argument + ') {\n' + branch + '}\n';
  return code;
};

Blockly.Language.maze_ifElse = {
  // Block for 'if/else' conditional if there is a path.
  helpUrl: '',
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(this.DIRECTIONS), 'DIR');
    this.appendStatementInput('DO')
        .appendTitle(BlocklyApps.getMsg('doCode'));
    this.appendStatementInput('ELSE')
        .appendTitle(BlocklyApps.getMsg('elseCode'));
    this.setTooltip(BlocklyApps.getMsg('ifelseTooltip'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Language.maze_ifElse.DIRECTIONS =
    Blockly.Language.maze_isPath.DIRECTIONS;

Blockly.JavaScript.maze_ifElse = function() {
  // Generate JavaScript for 'if/else' conditional if there is a path.
  var argument = 'Maze.' + this.getTitleValue('DIR') +
      '(\'block_id_' + this.id + '\')';
  var branch0 = Blockly.JavaScript.statementToCode(this, 'DO');
  var branch1 = Blockly.JavaScript.statementToCode(this, 'ELSE');
  var code = 'if (' + argument + ') {\n' + branch0 +
             '} else {\n' + branch1 + '}\n';
  return code;
};

Blockly.Language.maze_forever = {
  // Do forever loop.
  helpUrl: 'http://code.google.com/p/blockly/wiki/Repeat',
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('repeatUntil'))
        .appendTitle(new Blockly.FieldImage(Maze.SKIN.marker, 12, 16));
    this.appendStatementInput('DO').appendTitle(BlocklyApps.getMsg('doCode'));
    this.setPreviousStatement(true);
    this.setTooltip(BlocklyApps.getMsg('whileTooltip'));
  }
};

Blockly.JavaScript.maze_forever = function() {
  // Generate JavaScript for do forever loop.
  var branch = Blockly.JavaScript.statementToCode(this, 'DO');
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'block_id_' + this.id + '\'') + branch;
  }
  return 'while (true) {\n' + branch + '}\n';
};

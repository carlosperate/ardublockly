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

var MSG = window.parent.MSG;
var maxBlocks = window.parent.maxBlocks;
var toolbox = window.parent.document.getElementById('toolbox');

// Extensions to Blockly's language and JavaScript generator.

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.Language.maze_move = {
  // Block for moving forward or backwards.
  helpUrl: 'http://code.google.com/p/blockly/wiki/Move',
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendTitle(MSG.move)
        .appendTitle(new Blockly.FieldDropdown(this.DIRECTIONS), 'DIR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(MSG.moveTooltip);
  }
};

Blockly.Language.maze_move.DIRECTIONS =
    [[MSG.forward, 'moveForward'], [MSG.backward, 'moveBackward']];

Blockly.JavaScript.maze_move = function() {
  // Generate JavaScript for moving forward or backwards.
  return 'Maze.' + this.getTitleValue('DIR') + '(\'' + this.id + '\');\n';
};

Blockly.Language.maze_turn = {
  // Block for turning left or right.
  helpUrl: 'http://code.google.com/p/blockly/wiki/Turn',
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendTitle(MSG.turn)
        .appendTitle(new Blockly.FieldDropdown(this.DIRECTIONS), 'DIR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(MSG.turnTooltip);
  }
};

Blockly.Language.maze_turn.DIRECTIONS =
    [[MSG.left, 'turnLeft'], [MSG.right, 'turnRight'], [MSG.randomly, 'random']];

Blockly.JavaScript.maze_turn = function() {
  // Generate JavaScript for turning left or right.
  var dir = this.getTitleValue('DIR');
  var code;
  if (dir == 'random') {
    code = 'if (Math.random() < 0.5) {\n' +
           '  Maze.turnLeft(\'' + this.id + '\');\n' +
           '} else {\n' +
           '  Maze.turnRight(\'' + this.id + '\');\n' +
           '}\n';
  } else {
    code = 'Maze.' + dir + '(\'' + this.id + '\');\n';
  }
  return code;
};

Blockly.Language.maze_isWall = {
  // Block for checking if there a wall.
  helpUrl: 'http://code.google.com/p/blockly/wiki/Wall',
  init: function() {
    this.setColour(120);
    this.setOutput(true, Boolean);
    this.appendDummyInput()
        .appendTitle(MSG.wall)
        .appendTitle(new Blockly.FieldDropdown(this.DIRECTIONS), 'DIR');
    this.setTooltip('Returns true if there is a wall\n' +
                    'in the specified direction.');
  }
};

Blockly.Language.maze_isWall.DIRECTIONS =
    [[MSG.ahead, 'isWallForward'],
     [MSG.toTheLeft, 'isWallLeft'],
     [MSG.toTheRight, 'isWallRight'],
     [MSG.behind, 'isWallBackward']];

Blockly.JavaScript.maze_isWall = function() {
   // Generate JavaScript for checking if there is a wall.
  var code = 'Maze.' + this.getTitleValue('DIR') + '()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Language.maze_if = {
  // Block for 'if' conditional if there a wall.
  helpUrl: 'http://code.google.com/p/blockly/wiki/Wall',
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(MSG.ifWall)
        .appendTitle(new Blockly.FieldDropdown(this.DIRECTIONS), 'DIR');
    this.appendStatementInput('DO')
        .appendTitle(MSG.do);
    this.setTooltip(MSG.ifTooltip);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Language.maze_if.DIRECTIONS =
    Blockly.Language.maze_isWall.DIRECTIONS;

Blockly.JavaScript.maze_if = function() {
  // Generate JavaScript for 'if' conditional if there is a wall.
  var argument = 'Maze.' + this.getTitleValue('DIR') + '()';
  var branch = Blockly.JavaScript.statementToCode(this, 'DO');
  var code = 'if (' + argument + ') {\n' + branch + '}';
  return code;
};

Blockly.Language.maze_ifelse = {
  // Block for 'if/else' conditional if there a wall.
  helpUrl: 'http://code.google.com/p/blockly/wiki/Wall',
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(MSG.ifWall)
        .appendTitle(new Blockly.FieldDropdown(this.DIRECTIONS), 'DIR');
    this.appendStatementInput('DO')
        .appendTitle(MSG.do);
    this.appendStatementInput('ELSE')
        .appendTitle(MSG.else);
    this.setTooltip(MSG.ifelseTooltip);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Language.maze_ifelse.DIRECTIONS =
    Blockly.Language.maze_isWall.DIRECTIONS;

Blockly.JavaScript.maze_ifelse = function() {
  // Generate JavaScript for 'if/else' conditional if there is a wall.
  var argument = 'Maze.' + this.getTitleValue('DIR') + '()';
  var branch0 = Blockly.JavaScript.statementToCode(this, 'DO');
  var branch1 = Blockly.JavaScript.statementToCode(this, 'ELSE');
  var code = 'if (' + argument + ') {\n' + branch0 + '} else {\n' +
      branch1 + '}';
  return code;
};

Blockly.Language.maze_forever = {
  // Do forever loop.
  helpUrl: 'http://code.google.com/p/blockly/wiki/Repeat',
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(MSG.repeatUntilFinished);
    this.appendStatementInput('DO').appendTitle(MSG.do);
    this.setPreviousStatement(true);
    this.setTooltip(MSG.whileTooltip);
  }
};

Blockly.JavaScript.maze_forever = function() {
  // Generate JavaScript for do forever loop.
  var branch = Blockly.JavaScript.statementToCode(this, 'DO');
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  return 'while (true) {\n' + branch + '}\n';
};

function init() {
  Blockly.inject(document.body,
      {path: '../../', toolbox: toolbox, maxBlocks: maxBlocks});

  if (window.parent.Maze) {
    // Let the top-level application know that Blockly is ready.
    window.parent.Maze.init(Blockly);
  } else {
    // Attempt to diagnose the problem.
    var msg = 'Error: Unable to communicate between frames.\n\n';
    if (window.parent == window) {
      msg += 'Try loading index.html instead of frame.html';
    } else if (window.location.protocol == 'file:') {
      msg += 'This may be due to a security restriction preventing\n' +
          'access when using the file:// protocol.\n' +
          'http://code.google.com/p/chromium/issues/detail?id=47416';
    }
    alert(msg);
  }
}

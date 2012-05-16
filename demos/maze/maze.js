/**
 * Blockly Demo: Maze
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
 * @fileoverview Demonstration of Blockly: Solving a maze.
 * @author fraser@google.com (Neil Fraser)
 */

// Extensions to Blockly's language and JavaScript generator.

// Define Language and JavaScript, in case this file is loaded too early.
if (!Blockly.Language) {
  Blockly.Language = {};
}
Blockly.JavaScript = Blockly.Generator.get('JavaScript');
Blockly.Dart = Blockly.Generator.get('Dart');
Blockly.Python = Blockly.Generator.get('Python');

Blockly.Language.maze_move = {
  // Block for moving forward or backwards.
  category: 'Maze',
  helpUrl: null,
  init: function() {
    this.setColour(290);
    this.addTitle('move');
    var dropdown = new Blockly.FieldDropdown(function() {
      return Blockly.Language.maze_move.DIRECTIONS;
    });
    this.addTitle(dropdown);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Moves the mouse forward or backward one space.');
  }
};

Blockly.Language.maze_move.DIRECTIONS = ['forward', 'backward'];

Blockly.JavaScript.maze_move = function() {
  // Generate JavaScript for moving forward or backwards.
  var direction = Blockly.Language.maze_move.DIRECTIONS
      .indexOf(this.getTitleText(1));
  return 'Maze.move(' + direction + ');\n';
};
Blockly.Dart.maze_move = Blockly.JavaScript.maze_move;
Blockly.Python.maze_move = Blockly.JavaScript.maze_move;

Blockly.Language.maze_turnLeft = {
  // Block for turning left or right.
  category: 'Maze',
  helpUrl: null,
  init: function() {
    this.setColour(290);
    this.addTitle('turn');
    var dropdown = new Blockly.FieldDropdown(function() {
      return Blockly.Language.maze_turnLeft.DIRECTIONS;
    });
    this.addTitle(dropdown);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Turns the mouse left or right by 90 degrees.');
  }
};

Blockly.Language.maze_turnLeft.DIRECTIONS = ['left', 'right'];

Blockly.Language.maze_turnRight = {
  // Block for turning left or right.
  category: 'Maze',
  helpUrl: null,
  init: function() {
    this.setColour(290);
    this.addTitle('turn');
    var dropdown = new Blockly.FieldDropdown(function() {
      return Blockly.Language.maze_turnLeft.DIRECTIONS;
    });
    this.addTitle(dropdown)
    this.setTitleText(Blockly.Language.maze_turnLeft.DIRECTIONS[1], 1);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Turns the mouse left or right by 90 degrees.');
  }
};

Blockly.JavaScript.maze_turnLeft = function() {
  // Generate JavaScript for turning left or right.
  var direction = Blockly.Language.maze_turnLeft.DIRECTIONS
      .indexOf(this.getTitleText(1));
  return 'Maze.turn(' + direction + ');\n';
};
Blockly.Dart.maze_turnLeft = Blockly.JavaScript.maze_turnLeft;
Blockly.Python.maze_turnLeft = Blockly.JavaScript.maze_turnLeft;

// Turning left and right use the same code.
Blockly.JavaScript.maze_turnRight = Blockly.JavaScript.maze_turnLeft;
Blockly.Dart.maze_turnRight = Blockly.Dart.maze_turnLeft;
Blockly.Python.maze_turnRight = Blockly.Python.maze_turnLeft;

Blockly.Language.maze_isWall = {
  // Block for checking if there a wall.
  category: 'Maze',
  helpUrl: null,
  init: function() {
    this.setColour(290);
    this.setOutput(true);
    this.addTitle('wall');
    var dropdown = new Blockly.FieldDropdown(function() {
      return Blockly.Language.maze_isWall.DIRECTIONS;
    });
    this.addTitle(dropdown);
    this.addTitle('?');
    this.setTooltip('Returns true if there is a wall in ' +
                    'the specified direction.');
  }
};

Blockly.Language.maze_isWall.DIRECTIONS =
    ['ahead', 'to the left', 'to the right', 'behind'];

Blockly.JavaScript.maze_isWall = function() {
  // Generate JavaScript for checking if there is a wall.
  var direction = Blockly.Language.maze_isWall.DIRECTIONS
      .indexOf(this.getTitleText(1));
  return 'Maze.isWall(' + direction + ')';
};
Blockly.Dart.maze_isWall = Blockly.JavaScript.maze_isWall;
Blockly.Python.maze_isWall = Blockly.JavaScript.maze_isWall;

// Create a namespace for the maze.

var Maze = {};

Maze.SIZE = 50;

/**
 * The maze's map is a 2D array of numbers.
 * 0: Empty space.
 * 1: Wall.
 * 2: Starting square.
 * 3. Finish square.
 */
Maze.MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 0, 1, 3, 1],
  [1, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 0, 1, 1, 1, 0, 1],
  [1, 2, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1]];

Maze.NORTH = 0;
Maze.EAST = 4;
Maze.SOUTH = 8;
Maze.WEST = 16;

/**
 * Initialize Blockly and the maze.  Called on page load.
 */
Maze.init = function() {
  //window.onbeforeunload = function() {
  //  return 'Leaving this page will result in the loss of your work.';
  //};

  Blockly.pathToBlockly = '../../';
  Blockly.inject(document.getElementById('editors'));
  
  // Find and name the injected SVG object.
  document.getElementsByTagName('svg')[0].id = 'content_blocks';

  // Locate the start and finish squares.
  for (var y = 0; y < Maze.MAP.length; y++) {
    for (var x = 0; x < Maze.MAP[0].length; x++) {
      if (Maze.MAP[y][x] == 2) {
        Maze.start_ = {x: x, y: y};
      } else if (Maze.MAP[y][x] == 3) {
        Maze.finish_ = {x: x, y: y};
      }
    }
  }

  // Record the map's offset.
  Maze.mapOffsetLeft_ = 0;
  Maze.mapOffsetTop_ = 0;
  var element = document.getElementById('map');
  while (element) {
    Maze.mapOffsetLeft_ += element.offsetLeft;
    Maze.mapOffsetTop_ += element.offsetTop;
    element = element.offsetParent;
  }

  // Make the 'Blocks' tab line up with the toolbox.  
  Blockly.bindEvent_(window, 'resize', null, function() {
    document.getElementById('tab_blocks').style.minWidth =
        (Blockly.Toolbox.width - 40) + 'px';
        // Account for the 19 pixel margin and 1 pixel border on each side.
    });
  Blockly.fireUiEvent(document, window, 'resize');

  // Move the finish icon into position.
  var finishIcon = document.getElementById('finish');
  finishIcon.style.top = Maze.mapOffsetTop_ +
      Maze.SIZE * (Maze.finish_.y + 0.5) - finishIcon.offsetHeight / 2;
  finishIcon.style.left = Maze.mapOffsetLeft_ +
      Maze.SIZE * (Maze.finish_.x + 0.5) - finishIcon.offsetWidth / 2;

  Maze.pegmanX = Maze.start_.x;
  Maze.pegmanY = Maze.start_.y;
  Maze.pegmanD = Maze.EAST;
  Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, Maze.pegmanD);
};

/**
 * List of tab names.
 * @private
 */
Maze.TABS_ = ['blocks', 'javascript', 'dart', 'python', 'xml'];

/**
 * Switch the visible pane when a tab is clicked.
 */
Maze.tabClick = function(id) {
  // First, deselect all tabs and hide all panes.
  for (var x in Maze.TABS_) {
    document.getElementById('tab_' + Maze.TABS_[x]).className = 'taboff';
    document.getElementById('content_' + Maze.TABS_[x]).style.display = 'none';
  }
  // Second, select the active tab.
  document.getElementById(id).className = 'tabon';
  // Third, show the selected pane.
  var content = document.getElementById(id.replace('tab_', 'content_'));
  content.style.display = 'block';
  // Fourth, initialize the pane.
  if (id == 'tab_xml') {
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    var xmlHtml = xmlText.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;').replace(/>/g, '&gt;');
    content.innerHTML = xmlHtml;
  } else if (id == 'tab_javascript') {
    content.innerHTML = Blockly.Generator.workspaceToCode('JavaScript');
  } else if (id == 'tab_dart') {
    content.innerHTML = Blockly.Generator.workspaceToCode('Dart');
  } else if (id == 'tab_python') {
    content.innerHTML = Blockly.Generator.workspaceToCode('Python');
  }
};

/**
 * Execute the user's code.  Heaven help us...
 */
Maze.execute = function() {
  var code = Blockly.Generator.workspaceToCode('JavaScript');
  try {
    eval(code);
  } catch (e) {
    alert(e);
  }
};

/**
 * Display Pegman at a the specified location, facing the specified direction.
 * @param {number} x Horizontal grid (or fraction thereof).
 * @param {number} y Vertical grid (or fraction thereof).
 * @param {number} d Direction (0 - 15) or dance (16 - 17).
 */
Maze.displayPegman = function(x, y, d) {
  var pegmanIcon = document.getElementById('pegman');
  pegmanIcon.style.top = Maze.mapOffsetTop_ +
      Maze.SIZE * (y + 0.5) - pegmanIcon.offsetHeight / 2 - 8;
  pegmanIcon.style.left = Maze.mapOffsetLeft_ +
      Maze.SIZE * (x + 0.5) - pegmanIcon.offsetHeight / 2 + 2;
  pegmanIcon.style.backgroundPosition = -d * pegmanIcon.offsetWidth;
};

// API

/**
 * Move pegman forwards or backwards.
 * @param {number} direction Direction to move.
 */
Maze.move = function(direction) {
  
};

/**
 * Turn pegman left or right.
 * @param {number} direction Direction to turn.
 */
Maze.turn = function(direction) {
  
};

/**
 * Is there a wall next to pegman?
 * @param {number} direction Direction to look.
 * @return {boolean} True if there is a wall.
 */
Maze.isWall = function(direction) {
  
};


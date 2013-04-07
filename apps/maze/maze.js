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

/**
 * Create a namespace for the application.
 */
var Maze = {};

Maze.MAX_LEVEL = 10;
var level = window.location.search.match(/[?&]level=(\d+)/);
level = level ? level[1] : 1;
level = Math.min(Math.max(1, level), Maze.MAX_LEVEL);
document.write(mazepage.start({}, null,
    {MSG: MSG,
     level: level}));
var maxBlocks = [undefined, // Level 0.
    Infinity, Infinity, 2, 5, 5, 5, 5, 10, 7, 10][level];

/**
 * Milliseconds between each animation frame.
 */
Maze.STEP_SPEED = 150;

/**
 * The types of squares in the maze, which is represented
 * as a 2D array of SquareType values.
 * @enum {number}
 */
Maze.SquareType = {
  WALL: 0,
  OPEN: 1,
  START: 2,
  FINISH: 3
};

// The maze square constants defined above are inlined here
// for ease of reading and writing the static mazes.
Maze.map = [
 // Level 0.
 undefined,
 // Level 1.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 1, 3, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
 // Level 2.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 3, 0, 0, 0],
  [0, 0, 2, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
 // Level 3.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 1, 1, 1, 1, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
 // Level 4.
 [[0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 1, 3, 0],
  [0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 0],
  [0, 2, 1, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 0]],
 // Level 5.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 3, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 2, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
 // Level 6.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 3, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 2, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
 // Level 7.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0],
  [0, 2, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0],
  [0, 1, 1, 3, 0, 1, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
 // Level 8.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0],
  [0, 1, 1, 1, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0],
  [0, 2, 1, 1, 0, 3, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
 // Level 9.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [3, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 2, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
 // Level 10.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 3, 0, 1, 0],
  [0, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 2, 1, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]]
][level];

/**
 * Measure maze dimensions and set sizes.
 * ROWS: Number of tiles down.
 * COLS: Number of tiles across.
 * SQUARE_SIZE: Pixel height and width of each maze square (i.e. tile).
 */
Maze.ROWS = Maze.map.length;
Maze.COLS = Maze.map[0].length;
Maze.SQUARE_SIZE = 50;
Maze.PEGMAN_HEIGHT = 52;
Maze.PEGMAN_WIDTH = 49;

Maze.MAZE_WIDTH = Maze.SQUARE_SIZE * Maze.COLS;
Maze.MAZE_HEIGHT = Maze.SQUARE_SIZE * Maze.ROWS;
Maze.PATH_WIDTH = Maze.SQUARE_SIZE / 3;

/**
 * Constants for cardinal directions.  Subsequent code assumes these are
 * in the range 0..3 and that opposites have an absolute difference of 2.
 * @enum {number}
 */
Maze.DirectionType = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3
};

/**
 * Starting direction.
 */
Maze.startDirection = Maze.DirectionType.EAST;

/**
 * PIDs of animation tasks currently executing.
 */
Maze.pidList = [];

Maze.deadEnd = function(x, y, angle) {
  var path = document.createElementNS(Blockly.SVG_NS, 'path');
  path.setAttribute('d',
      'M' + (x + Maze.PATH_WIDTH) + ',' + (y + Maze.SQUARE_SIZE) +
      ' v' + -Maze.SQUARE_SIZE / 2 +
      ' a' + (Maze.PATH_WIDTH / 2) + ',' + (Maze.PATH_WIDTH / 2) + ' 0 0,1 ' +
          Maze.PATH_WIDTH + ',0' +
      ' v' + Maze.SQUARE_SIZE / 2);
  path.setAttribute('fill', 'yellow');
  path.setAttribute('stroke-width', 1);
  path.setAttribute('stroke', '#C8BEAE');
  path.setAttribute('transform', 'rotate(' + angle + ' ' +
      (x + Maze.SQUARE_SIZE / 2) + ' ' + (y + Maze.SQUARE_SIZE / 2) + ')');
  return path;
};

Maze.thru = function(x, y, angle) {
  var rect = document.createElementNS(Blockly.SVG_NS, 'rect');
  rect.setAttribute('x', x + Maze.PATH_WIDTH);
  rect.setAttribute('y', y);
  rect.setAttribute('width', Maze.PATH_WIDTH);
  rect.setAttribute('height', Maze.SQUARE_SIZE);
  rect.setAttribute('fill', 'yellow');
  rect.setAttribute('stroke-width', 1);
  rect.setAttribute('stroke', '#C8BEAE');
  rect.setAttribute('transform', 'rotate(' + angle + ' ' +
      (x + Maze.SQUARE_SIZE / 2) + ' ' + (y + Maze.SQUARE_SIZE / 2) + ')');
  return rect;
};

Maze.elbow = function(x, y, angle) {
  var rx = Maze.PATH_WIDTH / 2;
  var path = document.createElementNS(Blockly.SVG_NS, 'path');
  path.setAttribute('fill', 'yellow');
  path.setAttribute('stroke-width', 1);
  path.setAttribute('stroke', '#C8BEAE');
  path.setAttribute('d',
      'M' + (x + Maze.PATH_WIDTH) + ',' + (y + Maze.SQUARE_SIZE) +
      ' v' + -(Maze.SQUARE_SIZE / 2) +
      ' a' + rx + ',' + rx + ' 0 0,1 ' + rx + ',' + -rx +
      ' h' + (Maze.SQUARE_SIZE / 2) +
      ' v' + Maze.PATH_WIDTH +
      ' h' + -Maze.PATH_WIDTH +
      ' v' + Maze.PATH_WIDTH);
  path.setAttribute('transform', 'rotate(' + angle + ' ' +
      (x + Maze.SQUARE_SIZE / 2) + ' ' + (y + Maze.SQUARE_SIZE / 2) + ')');
  return path;
};

Maze.junction = function(x, y, angle) {
  var path = document.createElementNS(Blockly.SVG_NS, 'path');
  path.setAttribute('fill', 'yellow');
  path.setAttribute('stroke-width', 1);
  path.setAttribute('stroke', '#C8BEAE');
  path.setAttribute('d', 'M' + (x + Maze.PATH_WIDTH) + ',' + y +
      ' h' + Maze.PATH_WIDTH + ' v' + Maze.PATH_WIDTH +
      ' h' + Maze.PATH_WIDTH + ' v' + Maze.PATH_WIDTH +
      ' h' + -Maze.PATH_WIDTH + ' v' + Maze.PATH_WIDTH +
      ' h' + -Maze.PATH_WIDTH + ' v' + -Maze.SQUARE_SIZE);
  path.setAttribute('transform', 'rotate(' + angle + ' ' +
      (x + Maze.SQUARE_SIZE / 2) + ' ' + (y + Maze.SQUARE_SIZE / 2) + ')');
  return path;
};

Maze.cross = function(x, y, angle) {
  var path = document.createElementNS(Blockly.SVG_NS, 'path');
  path.setAttribute('fill', 'yellow');
  path.setAttribute('stroke-width', 1);
  path.setAttribute('stroke', '#C8BEAE');
  path.setAttribute('d', 'M' + (x + Maze.PATH_WIDTH) + ',' + y +
      ' h' + Maze.PATH_WIDTH + ' v' + Maze.PATH_WIDTH +
      ' h' + Maze.PATH_WIDTH + ' v' + Maze.PATH_WIDTH +
      ' h' + -Maze.PATH_WIDTH + ' v' + Maze.PATH_WIDTH +
      ' h' + -Maze.PATH_WIDTH + ' v' + -Maze.PATH_WIDTH +
      ' h' + -Maze.PATH_WIDTH + ' v' + -Maze.PATH_WIDTH +
      ' h' + Maze.PATH_WIDTH + ' v' + -Maze.PATH_WIDTH);
  path.setAttribute('transform', 'rotate(' + angle + ' ' +
      (x + Maze.SQUARE_SIZE / 2) + ' ' + (y + Maze.SQUARE_SIZE / 2) + ')');
  return path;
};

Maze.tile_SHAPES = {
  '10010': [Maze.deadEnd, 0],
  '10001': [Maze.deadEnd, 90],
  '11000': [Maze.deadEnd, 180],
  '10100': [Maze.deadEnd, -90],
  '11010': [Maze.thru, 0],
  '10101': [Maze.thru, 90],
  '10110': [Maze.elbow, 0],
  '10011': [Maze.elbow, 90],
  '11001': [Maze.elbow, 180],
  '11100': [Maze.elbow, -90],
  '11110': [Maze.junction, 0],
  '10111': [Maze.junction, 90],
  '11011': [Maze.junction, 180],
  '11101': [Maze.junction, -90],
  '11111': [Maze.cross, -90]
};

Maze.drawMap = function() {
  var svg = document.getElementById('svgMaze');

  // On subsequent calls within a level, the map must first be cleared.
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }

  // Draw the outer square.
  var square = document.createElementNS(Blockly.SVG_NS, 'rect');
  square.setAttribute('width', Maze.MAZE_WIDTH);
  square.setAttribute('height', Maze.MAZE_HEIGHT);
  square.setAttribute('fill', '#F1EEE7');
  square.setAttribute('stroke-width', 1);
  square.setAttribute('stroke', '#C8BEAE');
  svg.appendChild(square);

  // Draw the tiles making up the maze map.

  // Return a value of '0' if the specified square is wall or out of bounds,
  // '1' otherwise (empty, start, finish).
  var normalize = function(x, y) {
    if (x < 0 || x >= Maze.COLS || y < 0 || y >= Maze.ROWS) {
      return '0';
    }
    return (Maze.map[y][x] == Maze.SquareType.WALL) ? '0' : '1';
  };

  // Compute and draw the tile for each square.
  for (var y = 0; y < Maze.ROWS; y++) {
    for (var x = 0; x < Maze.COLS; x++) {
      // Compute the tile index.
      var tile = normalize(x, y) +
          normalize(x, y - 1) +  // North.
          normalize(x + 1, y) +  // West.
          normalize(x, y + 1) +  // South.
          normalize(x - 1, y);   // East.

      // Draw the tile (or nothing, if wall).
      if (Maze.tile_SHAPES[tile]) {
        var shape = Maze.tile_SHAPES[tile][0];
        var angle = Maze.tile_SHAPES[tile][1];
        svg.appendChild(shape(x * Maze.SQUARE_SIZE,
                              y * Maze.SQUARE_SIZE, angle));
      }
    }
  }

  // Draw the grid lines.
  for (var k = 1; k < Maze.ROWS; k++) {
    var h_line = document.createElementNS(Blockly.SVG_NS, 'line');
    h_line.setAttribute('y1', k * Maze.SQUARE_SIZE);
    h_line.setAttribute('x2', Maze.MAZE_WIDTH);
    h_line.setAttribute('y2', k * Maze.SQUARE_SIZE);
    h_line.setAttribute('stroke', '#C8BEAE');
    h_line.setAttribute('stroke-width', 2);
    svg.appendChild(h_line);
  }
  for (var k = 1; k < Maze.COLS; k++) {
    var v_line = document.createElementNS(Blockly.SVG_NS, 'line');
    v_line.setAttribute('x1', k * Maze.SQUARE_SIZE);
    v_line.setAttribute('x2', k * Maze.SQUARE_SIZE);
    v_line.setAttribute('y2', Maze.MAZE_HEIGHT);
    v_line.setAttribute('stroke', '#C8BEAE');
    v_line.setAttribute('stroke-width', 2);
    svg.appendChild(v_line);
  }

  // Add finish marker.
  var finishMarker = document.createElementNS(Blockly.SVG_NS, 'image');
  finishMarker.setAttribute('id', 'finish');
  finishMarker.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
      'marker.png');
  finishMarker.setAttribute('height', 34);
  finishMarker.setAttribute('width', 20);
  svg.appendChild(finishMarker);

  // Pegman's clipPath element, whose (x, y) is reset by Maze.displayPegman
  var pegmanClip = document.createElementNS(Blockly.SVG_NS, 'clipPath');
  pegmanClip.setAttribute('id', 'pegmanClipPath');
  var clipRect = document.createElementNS(Blockly.SVG_NS, 'rect');
  clipRect.setAttribute('id', 'clipRect');
  clipRect.setAttribute('width', Maze.PEGMAN_WIDTH);
  clipRect.setAttribute('height', Maze.PEGMAN_HEIGHT);
  pegmanClip.appendChild(clipRect);
  svg.appendChild(pegmanClip);

  // Add pegman.
  var pegmanIcon = document.createElementNS(Blockly.SVG_NS, 'image');
  pegmanIcon.setAttribute('id', 'pegman');
  pegmanIcon.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
      'pegman.png');
  pegmanIcon.setAttribute('height', Maze.PEGMAN_HEIGHT);
  pegmanIcon.setAttribute('width', Maze.PEGMAN_WIDTH * 18); // 49 * 18 = 882
  pegmanIcon.setAttribute('clip-path', 'url(#pegmanClipPath)');
  svg.appendChild(pegmanIcon);
};

/**
 * Initialize Blockly and the maze.  Called on page load.
 */
Maze.init = function() {
  // document.dir fails in Mozilla, use document.body.parentNode.dir instead.
  // https://bugzilla.mozilla.org/show_bug.cgi?id=151407
  var rtl = document.body.parentNode.dir == 'rtl';
  var toolbox = document.getElementById('toolbox');
  Blockly.inject(document.getElementById('blockly'),
      {path: '../../',
       maxBlocks: maxBlocks,
       rtl: rtl,
       toolbox: toolbox,
       trashcan: true});
  Blockly.loadAudio_('apps/maze/win.wav', 'win');
  Blockly.loadAudio_('apps/maze/whack.wav', 'whack');

  Blockly.JavaScript.INFINITE_LOOP_TRAP = '  Blockly.Apps.checkTimeout(%1);\n';
  Maze.drawMap();

  //window.addEventListener('beforeunload', function(e) {
  //  if (Blockly.mainWorkspace.getAllBlocks().length > 2) {
  //    e.returnValue = MSG.unloadWarning;  // Gecko.
  //    return MSG.unloadWarning;  // Webkit.
  //  }
  //  return null;
  //});
  var blocklyDiv = document.getElementById('blockly');
  var onresize = function(e) {
    blocklyDiv.style.width = (window.innerWidth - blocklyDiv.offsetLeft - 18) +
        'px';
    blocklyDiv.style.height = (window.innerHeight - 22) + 'px';
  };
  window.addEventListener('resize', onresize);
  onresize();

  if (!('BlocklyStorage' in window)) {
    document.getElementById('linkButton').className = 'disabled';
  }
  // An href with #key trigers an AJAX call to retrieve saved blocks.
  if ('BlocklyStorage' in window && window.location.hash.length > 1) {
    BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else {
    // Load the editor with a starting block.
    var xml = Blockly.Xml.textToDom(
        '<xml>' +
        '  <block type="maze_moveForward" x="250" y="70"></block>' +
        '</xml>');
    // Configure any level-specific buttons.
    if (level > 9) {
      document.getElementById('randomizeButton').style.display = 'inline';
    }
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  }

  // Locate the start and finish squares.
  for (var y = 0; y < Maze.ROWS; y++) {
    for (var x = 0; x < Maze.COLS; x++) {
      if (Maze.map[y][x] == Maze.SquareType.START) {
        Maze.start_ = {x: x, y: y};
      } else if (Maze.map[y][x] == Maze.SquareType.FINISH) {
        Maze.finish_ = {x: x, y: y};
      }
    }
  }

  Maze.reset();
  Blockly.addChangeListener(function() {Blockly.Apps.updateCapacity(MSG)});
};

window.addEventListener('load', Maze.init);

/**
 * Reset the maze to the start position and kill any pending animation tasks.
 */
Maze.reset = function() {
  // Move Pegman into position.
  Maze.pegmanX = Maze.start_.x;
  Maze.pegmanY = Maze.start_.y;
  Maze.pegmanD = Maze.startDirection;
  Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4);

  // Move the finish icon into position.
  var finishIcon = document.getElementById('finish');
  finishIcon.setAttribute('x', Maze.SQUARE_SIZE * (Maze.finish_.x + 0.5) -
      finishIcon.getAttribute('width') / 2);
  finishIcon.setAttribute('y', Maze.SQUARE_SIZE * (Maze.finish_.y + 0.6) -
      finishIcon.getAttribute('height'));

  // Kill all tasks.
  for (var x = 0; x < Maze.pidList.length; x++) {
    window.clearTimeout(Maze.pidList[x]);
  }
  Maze.pidList = [];
};

/**
 * Click the run button.  Start the program.
 */
Maze.runButtonClick = function() {
  // Only allow a single top block on levels 1 and 2.
  if (level <= 2 && Blockly.mainWorkspace.getTopBlocks().length > 1) {
    window.alert(MSG.oneTopBlock);
    return;
  }
  document.getElementById('runButton').style.display = 'none';
  document.getElementById('resetButton').style.display = 'inline';
  Blockly.mainWorkspace.traceOn(true);
  Maze.execute();
};

/**
 * Click the reset button.  Reset the maze.
 */
Maze.resetButtonClick = function() {
  document.getElementById('runButton').style.display = 'inline';
  document.getElementById('resetButton').style.display = 'none';
  Blockly.mainWorkspace.traceOn(false);
  Maze.reset();
};

// Randomization.

/**
 * Move the start and finish to random locations.
 * Set the starting direction randomly.
 */
Maze.randomizeMarkers = function() {
  /**
   * Find a random point that's a dead-end on the maze.
   * Set this point to be the given SquareType.
   * This function is a closure, but does not reference any outside variables.
   * @param {Maze.SquareType} state Should be either Maze.SquareType.START or
   *     Maze.SquareType.FINISH.
   * @return {!Object} X-Y coordinates of new point.
   */
  function findCorner(state) {
    while (true) {
      var x = Math.floor(Math.random() * (Maze.map[0].length - 2)) + 1;
      var y = Math.floor(Math.random() * (Maze.map.length - 2) + 1);
      if (Maze.map[y][x] == Maze.SquareType.OPEN) {
        // Count the walls.
        var walls = 0;
        if (Maze.map[y + 1][x] == Maze.SquareType.WALL) {
          walls++;
        }
        if (Maze.map[y - 1][x] == Maze.SquareType.WALL) {
          walls++;
        }
        if (Maze.map[y][x + 1] == Maze.SquareType.WALL) {
          walls++;
        }
        if (Maze.map[y][x - 1] == Maze.SquareType.WALL) {
          walls++;
        }
        if (walls == 3) {
          Maze.map[y][x] = state;
          return {x: x, y: y};
        }
      }
    }
  }

  // Clear the existing start and finish locations.
  Maze.map[Maze.start_.y][Maze.start_.x] = Maze.SquareType.OPEN;
  Maze.map[Maze.finish_.y][Maze.finish_.x] = Maze.SquareType.OPEN;

  Maze.start_ = findCorner(Maze.SquareType.START);
  Maze.finish_ = findCorner(Maze.SquareType.FINISH);
  Maze.startDirection = Math.floor(Math.random() * 4);
  Maze.reset();
};

/**
 * Execute the user's code.  Heaven help us...
 */
Maze.execute = function() {
  Blockly.Apps.log = [];
  Blockly.Apps.ticks = 1000;
  var code = Blockly.Generator.workspaceToCode('JavaScript');
  try {
    eval(code);
  } catch (e) {
    // A boolean is thrown for normal termination.
    // Abnormal termination is a user error.
    if (typeof e != 'boolean') {
      alert(e);
    }
  }
  // Blockly.Apps.log now contains a transcript of all the user's actions.
  // Reset the maze and animate the transcript.
  Maze.reset();
  Maze.pidList.push(window.setTimeout(Maze.animate, 100));
};

/**
 * Iterate through the recorded path and animate pegman's actions.
 */
Maze.animate = function() {
  // All tasks should be complete now.  Clean up the PID list.
  Maze.pidList = [];

  var action = Blockly.Apps.log.shift();
  if (!action) {
    Blockly.mainWorkspace.highlightBlock(null);
    return;
  }
  Blockly.mainWorkspace.highlightBlock(action[1]);

  switch (action[0]) {
    case 'north':
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX, Maze.pegmanY - 1, Maze.pegmanD * 4]);
      Maze.pegmanY--;
      break;
    case 'east':
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX + 1, Maze.pegmanY, Maze.pegmanD * 4]);
      Maze.pegmanX++;
      break;
    case 'south':
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX, Maze.pegmanY + 1, Maze.pegmanD * 4]);
      Maze.pegmanY++;
      break;
    case 'west':
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX - 1, Maze.pegmanY, Maze.pegmanD * 4]);
      Maze.pegmanX--;
      break;
    case 'fail_forward':
      Maze.scheduleFail(true);
      break;
    case 'fail_backward':
      Maze.scheduleFail(false);
      break;
    case 'left':
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4 - 4]);
      Maze.pegmanD = Maze.constrainDirection4(Maze.pegmanD - 1);
      break;
    case 'right':
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4 + 4]);
      Maze.pegmanD = Maze.constrainDirection4(Maze.pegmanD + 1);
      break;
    case 'finish':
      Maze.scheduleFinish();
      window.setTimeout(Maze.congratulations, 1000);
  }

  Maze.pidList.push(window.setTimeout(Maze.animate, Maze.STEP_SPEED * 5));
};

Maze.congratulations = function() {
  Blockly.Apps.congratulations(window, level, Maze.MAX_LEVEL, MSG);
};

/**
 * Schedule the animations for a move or turn.
 * @param {!Array.<number>} startPos X, Y and direction starting points.
 * @param {!Array.<number>} endPos X, Y and direction ending points.
 */
Maze.schedule = function(startPos, endPos) {
  var deltas = [(endPos[0] - startPos[0]) / 4,
                (endPos[1] - startPos[1]) / 4,
                (endPos[2] - startPos[2]) / 4];
  Maze.displayPegman(startPos[0] + deltas[0],
                     startPos[1] + deltas[1],
                     Maze.constrainDirection16(startPos[2] + deltas[2]));
  Maze.pidList.push(window.setTimeout(function() {
      Maze.displayPegman(startPos[0] + deltas[0] * 2,
          startPos[1] + deltas[1] * 2,
          Maze.constrainDirection16(startPos[2] + deltas[2] * 2));
    }, Maze.STEP_SPEED));
  Maze.pidList.push(window.setTimeout(function() {
      Maze.displayPegman(startPos[0] + deltas[0] * 3,
          startPos[1] + deltas[1] * 3,
          Maze.constrainDirection16(startPos[2] + deltas[2] * 3));
    }, Maze.STEP_SPEED * 2));
  Maze.pidList.push(window.setTimeout(function() {
      Maze.displayPegman(endPos[0], endPos[1],
          Maze.constrainDirection16(endPos[2]));
    }, Maze.STEP_SPEED * 3));
};

/**
 * Schedule the animations and sounds for a failed move.
 * @param {boolean} forward True if forward, false if backward.
 */
Maze.scheduleFail = function(forward) {
  var deltaX = 0;
  var deltaY = 0;
  switch (Maze.pegmanD) {
    case Maze.DirectionType.NORTH:
      deltaY = -0.25;
      break;
    case Maze.DirectionType.EAST:
      deltaX = 0.25;
      break;
    case Maze.DirectionType.SOUTH:
      deltaY = 0.25;
      break;
    case Maze.DirectionType.WEST:
      deltaX = -0.25;
      break;
  }
  if (!forward) {
    deltaX = - deltaX;
    deltaY = - deltaY;
  }
  var direction16 = Maze.constrainDirection16(Maze.pegmanD * 4);
  Maze.displayPegman(Maze.pegmanX + deltaX,
                     Maze.pegmanY + deltaY,
                     direction16);
  Blockly.playAudio('whack', .5);
  Maze.pidList.push(window.setTimeout(function() {
    Maze.displayPegman(Maze.pegmanX,
                       Maze.pegmanY,
                       direction16);
    }, Maze.STEP_SPEED));
  Maze.pidList.push(window.setTimeout(function() {
    Maze.displayPegman(Maze.pegmanX + deltaX,
                       Maze.pegmanY + deltaY,
                       direction16);
    Blockly.playAudio('whack', .5);
  }, Maze.STEP_SPEED * 2));
  Maze.pidList.push(window.setTimeout(function() {
      Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, direction16);
    }, Maze.STEP_SPEED * 3));
};

/**
 * Schedule the animations and sound for a victory dance.
 */
Maze.scheduleFinish = function() {
  var direction16 = Maze.constrainDirection16(Maze.pegmanD * 4);
  Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, 16);
  Blockly.playAudio('win', .5);
  Maze.pidList.push(window.setTimeout(function() {
    Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, 17);
    }, Maze.STEP_SPEED));
  Maze.pidList.push(window.setTimeout(function() {
    Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, 16);
    }, Maze.STEP_SPEED * 2));
  Maze.pidList.push(window.setTimeout(function() {
      Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, direction16);
    }, Maze.STEP_SPEED * 3));
};

/**
 * Display Pegman at a the specified location, facing the specified direction.
 * @param {number} x Horizontal grid (or fraction thereof).
 * @param {number} y Vertical grid (or fraction thereof).
 * @param {number} d Direction (0 - 15) or dance (16 - 17).
 */
Maze.displayPegman = function(x, y, d) {
  var pegmanIcon = document.getElementById('pegman');
  pegmanIcon.setAttribute('x',
      x * Maze.SQUARE_SIZE - d * Maze.PEGMAN_WIDTH + 1);
  pegmanIcon.setAttribute('y',
      Maze.SQUARE_SIZE * (y + 0.5) - Maze.PEGMAN_HEIGHT / 2 - 8);

  var clipRect = document.getElementById('clipRect');
  clipRect.setAttribute('x', x * Maze.SQUARE_SIZE + 1);
  clipRect.setAttribute('y', pegmanIcon.getAttribute('y'));
};

/**
 * Keep the direction within 0-3, wrapping at both ends.
 * @param {number} d Potentially out-of-bounds direction value.
 * @return {number} Legal direction value.
 */
Maze.constrainDirection4 = function(d) {
  if (d < 0) {
    d += 4;
  } else if (d > 3) {
    d -= 4;
  }
  return d;
};

/**
 * Keep the direction within 0-15, wrapping at both ends.
 * @param {number} d Potentially out-of-bounds direction value.
 * @return {number} Legal direction value.
 */
Maze.constrainDirection16 = function(d) {
  if (d < 0) {
    d += 16;
  } else if (d > 15) {
    d -= 16;
  }
  return d;
};

// API
// Human-readable aliases.

Maze.moveForward = function(id) {
  Maze.move(0, id);
};

Maze.moveBackward = function(id) {
  Maze.move(2, id);
};

Maze.turnLeft = function(id) {
  Maze.turn(0, id);
};

Maze.turnRight = function(id) {
  Maze.turn(1, id);
};

Maze.isPathForward = function() {
  return Maze.isPath(0);
};

Maze.isPathRight = function() {
  return Maze.isPath(1);
};

Maze.isPathBackward = function() {
  return Maze.isPath(2);
};

Maze.isPathLeft = function() {
  return Maze.isPath(3);
};

// Core functions.

/**
 * Move pegman forward or backward.
 * @param {number} direction Direction to move (0 = forward, 2 = backward).
 * @param {string} id ID of block that triggered this action.
 */
Maze.move = function(direction, id) {
  if (!Maze.isPath(direction)) {
    Blockly.Apps.log.push(['fail_' + (direction ? 'backward' : 'forward'), id]);
    return;
  }
  // If moving backward, flip the effective direction.
  var effectiveDirection = Maze.pegmanD + direction;
  var command;
  switch (Maze.constrainDirection4(effectiveDirection)) {
    case Maze.DirectionType.NORTH:
      Maze.pegmanY--;
      command = 'north';
      break;
    case Maze.DirectionType.EAST:
      Maze.pegmanX++;
      command = 'east';
      break;
    case Maze.DirectionType.SOUTH:
      Maze.pegmanY++;
      command = 'south';
      break;
    case Maze.DirectionType.WEST:
      Maze.pegmanX--;
      command = 'west';
      break;
  }
  Blockly.Apps.log.push([command, id]);
  if (Maze.pegmanX == Maze.finish_.x && Maze.pegmanY == Maze.finish_.y) {
    // Finished.  Terminate the user's program.
    Blockly.Apps.log.push(['finish', null]);
    throw true;
  }
};

/**
 * Turn pegman left or right.
 * @param {number} direction Direction to turn (0 = left, 1 = right).
 * @param {string} id ID of block that triggered this action.
 */
Maze.turn = function(direction, id) {
  if (direction) {
    // Right turn (clockwise).
    Maze.pegmanD++;
    Blockly.Apps.log.push(['right', id]);
  } else {
    // Left turn (counterclockwise).
    Maze.pegmanD--;
    Blockly.Apps.log.push(['left', id]);
  }
  Maze.pegmanD = Maze.constrainDirection4(Maze.pegmanD);
};

/**
 * Is there a path next to pegman?
 * @param {number} direction Direction to look
 *     (0 = forward, 1 = right, 2 = backward, 3 = left).
 * @return {boolean} True if there is a path.
 */
Maze.isPath = function(direction) {
  var effectiveDirection = Maze.pegmanD + direction;
  var square;
  switch (Maze.constrainDirection4(effectiveDirection)) {
    case Maze.DirectionType.NORTH:
      square = Maze.map[Maze.pegmanY - 1] &&
          Maze.map[Maze.pegmanY - 1][Maze.pegmanX];
      break;
    case Maze.DirectionType.EAST:
      square = Maze.map[Maze.pegmanY][Maze.pegmanX + 1];
      break;
    case Maze.DirectionType.SOUTH:
      square = Maze.map[Maze.pegmanY + 1] &&
          Maze.map[Maze.pegmanY + 1][Maze.pegmanX];
      break;
    case Maze.DirectionType.WEST:
      square = Maze.map[Maze.pegmanY][Maze.pegmanX - 1];
      break;
  }
  return square !== Maze.SquareType.WALL && square !== undefined;
};

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
var frameSrc = (level > 9 ? frameSrc10 : frameSrc9).join('&');
document.write(mazepage.start({}, null,
    {MSG: MSG, level: level, frameSrc: frameSrc}));
var maxBlocks = [undefined, // Level 0.
    Infinity, Infinity, 2, 5, 10, 10, 10, 7, 10, Infinity][level];

/**
 * Milliseconds between each animation frame.
 */
Maze.STEP_SPEED = 150;

/**
 * The maze's map is a 2D array of numbers in the range 0..3.
 */
Maze.WALL_SQUARE = 0;
Maze.OPEN_SQUARE = 1;
Maze.START_SQUARE = 2;
Maze.FINISH_SQUARE = 3;

// The maze square constants defined above are inlined here
// for ease of reading and writing the static mazes.
Maze.MAP = [
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
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 3, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 2, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
 // Level 6.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0],
  [0, 2, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0],
  [0, 1, 1, 3, 0, 1, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
 // Level 7.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0],
  [0, 1, 1, 1, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0],
  [0, 2, 1, 1, 0, 3, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
 // Level 8.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [3, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 2, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
 // Level 9.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 3, 0, 1, 0],
  [0, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 2, 1, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
 // Level 10.
 [[1, 0, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 0, 1, 3, 1],
  [1, 0, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 1, 0],
  [1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 0, 1, 0],
  [1, 2, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 1]]
][level];

/**
 * Measure maze dimensions and set sizes.
 * ROWS: Number of tiles down.
 * COLS: Number of tiles across.
 * SQUARE_SIZE: Pixel height and width of each maze square (i.e. tile).
 */
Maze.ROWS = Maze.MAP.length;
Maze.COLS = Maze.MAP[0].length;
Maze.SQUARE_SIZE = 50;
Maze.PEGMAN_HEIGHT = 52;
Maze.PEGMAN_WIDTH = 49;

Maze.MAZE_WIDTH = Maze.SQUARE_SIZE * Maze.COLS;
Maze.MAZE_HEIGHT = Maze.SQUARE_SIZE * Maze.ROWS;
Maze.PATH_WIDTH = Maze.SQUARE_SIZE / 3;

/**
 * Constants for cardinal directions.
 */
Maze.NORTH = 0;
Maze.EAST = 1;
Maze.SOUTH = 2;
Maze.WEST = 3;

/**
 * Starting direction.
 */
Maze.startDirection = Maze.EAST;

/**
 * PIDs of animation tasks currently executing.
 */
Maze.pidList = [];

Maze.dead_end = function(x, y, angle) {
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
  '10010': [Maze.dead_end, 0],
  '10001': [Maze.dead_end, 90],
  '11000': [Maze.dead_end, 180],
  '10100': [Maze.dead_end, -90],
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

Maze.draw_map = function() {
  var svg = document.getElementById('svgMaze');

  // Draw the outer square.
  var square = document.createElementNS(Blockly.SVG_NS, 'rect');
  square.setAttribute('width', Maze.MAZE_WIDTH);
  square.setAttribute('height', Maze.MAZE_HEIGHT);
  square.setAttribute('fill', '#F1EEE7');
  square.setAttribute('stroke-width', 1);
  square.setAttribute('stroke', '#C8BEAE');
  svg.appendChild(square);

  // Draw the tiles making up the maze map.
  for (var y = 0; y < Maze.ROWS; y++) {
    for (var x = 0; x < Maze.COLS; x++) {
      var tile = String(Math.min(1, Maze.MAP[y][x])) +
          (y == 0 ? 0 : Math.min(1, Maze.MAP[y - 1][x])) +
          (x == Maze.COLS - 1 ? 0 : Math.min(1, Maze.MAP[y][x + 1])) +
          (y == Maze.ROWS - 1 ? 0 : Math.min(1, Maze.MAP[y + 1][x])) +
          (x == 0 ? 0 : Math.min(1, Maze.MAP[y][x - 1]));

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
 * @param {!Blockly} blockly Instance of Blockly from iframe.
 */
Maze.init = function(blockly) {
  window.Blockly = blockly;
  Blockly.JavaScript.INFINITE_LOOP_TRAP = '  Maze.checkTimeout(%1);\n';
  Maze.draw_map();

  //window.onbeforeunload = function() {
  //  if (Blockly.mainWorkspace.getAllBlocks().length > 1 &&
  //      window.location.hash.length <= 1) {
  //    return 'Leaving this page will result in the loss of your work.';
  //  }
  //  return null;
  //};

  if (!('BlocklyStorage' in window)) {
    document.getElementById('linkButton').className = 'disabled';
  }
  // An href with #key trigers an AJAX call to retrieve saved blocks.
  if ('BlocklyStorage' in window && window.location.hash.length > 1) {
    BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else {
    // Load the editor with a starting block.
    if (level < Maze.MAX_LEVEL) {
      var xml = Blockly.Xml.textToDom(
          '<xml>' +
          '  <block type="maze_moveForward" x="250" y="70"></block>' +
          '</xml>');
    } else {
      var xml = Blockly.Xml.textToDom(
          '<xml>' +
          '  <block type="maze_move" x="100" y="70"></block>' +
          '</xml>');
    }
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  }

  // Locate the start and finish squares.
  for (var y = 0; y < Maze.ROWS; y++) {
    for (var x = 0; x < Maze.COLS; x++) {
      if (Maze.MAP[y][x] == Maze.START_SQUARE) {
        Maze.start_ = {x: x, y: y};
      } else if (Maze.MAP[y][x] == Maze.FINISH_SQUARE) {
        Maze.finish_ = {x: x, y: y};
      }
    }
  }

  Maze.reset();

  function onchange() {
    var cap = Blockly.mainWorkspace.remainingCapacity();
    var p = document.getElementById('capacity');
    if (cap == Infinity) {
      p.innerHTML = '';
    } else if (cap == 0) {
      p.innerHTML = MSG.capacity0;
    } else if (cap == 1) {
      p.innerHTML = MSG.capacity1;
    } else {
      cap = Number(cap);
      p.innerHTML = MSG.capacity2.replace('%1', cap);
    }
  }

  Blockly.addChangeListener(onchange);
};

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

/**
 * Execute the user's code.  Heaven help us...
 */
Maze.execute = function() {
  Maze.path = [];
  Maze.ticks = 1000;
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
  // Maze.path now contains a transcript of all the user's actions.
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

  var action = Maze.path.shift();
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
  if (level < Maze.MAX_LEVEL) {
    var proceed = window.confirm(MSG.nextLevel.replace('%1', level + 1));
    if (proceed) {
      window.location = window.location.protocol + '//' +
          window.location.hostname + window.location.pathname +
          '?level=' + (level + 1)
    }
  } else {
    alert(MSG.finalLevel);
  }
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
 * Schedule the animations for a failed move.
 * @param {boolean} forward True if forward, false if backward.
 */
Maze.scheduleFail = function(forward) {
  var deltaX = 0;
  var deltaY = 0;
  if (Maze.pegmanD == Maze.NORTH) {
    deltaY = -0.25;
  } else if (Maze.pegmanD == Maze.EAST) {
    deltaX = 0.25;
  } else if (Maze.pegmanD == Maze.SOUTH) {
    deltaY = 0.25;
  } else if (Maze.pegmanD == Maze.WEST) {
    deltaX = -0.25;
  }
  if (!forward) {
    deltaX = - deltaX;
    deltaY = - deltaY;
  }
  var direction16 = Maze.constrainDirection16(Maze.pegmanD * 4);
  Maze.displayPegman(Maze.pegmanX + deltaX,
                     Maze.pegmanY + deltaY,
                     direction16);
  Maze.pidList.push(window.setTimeout(function() {
    Maze.displayPegman(Maze.pegmanX,
                       Maze.pegmanY,
                       direction16);
    }, Maze.STEP_SPEED));
  Maze.pidList.push(window.setTimeout(function() {
    Maze.displayPegman(Maze.pegmanX + deltaX,
                       Maze.pegmanY + deltaY,
                       direction16);
    }, Maze.STEP_SPEED * 2));
  Maze.pidList.push(window.setTimeout(function() {
      Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, direction16);
    }, Maze.STEP_SPEED * 3));
};

/**
 * Schedule the animations for a victory dance.
 */
Maze.scheduleFinish = function() {
  var direction16 = Maze.constrainDirection16(Maze.pegmanD * 4);
  Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, 16);
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

/**
 * If the user has executed too many actions, we're probably in an infinite
 * loop.  Sadly I wasn't able to solve the Halting Problem for this demo.
 * @param {?string} id ID of loop block to highlight if timeout is reached.
 * @throws {false} Throws an error to terminate the user's program.
 */
Maze.checkTimeout = function(id) {
  if (Maze.ticks-- < 0) {
    if (id) {
      // Highlight an infinite loop on death.
      Maze.path.push(['loop', id]);
    }
    throw false;
  }
};

/**
 * Show the user's code in raw JavaScript.
 */
Maze.showCode = function() {
  var code = Blockly.Generator.workspaceToCode('JavaScript');
  // Strip out serial numbers.
  code = code.replace(/'\d+'/g, '');
  code = code.replace(/\s*Maze\.checkTimeout\(\);/g, '');
  alert(code);
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
    Maze.path.push(['fail_' + (direction ? 'backward' : 'forward'), id]);
    return;
  }
  // If moving backward, flip the effective direction.
  var effectiveDirection = Maze.pegmanD + direction;
  effectiveDirection = Maze.constrainDirection4(effectiveDirection);
  var command;
  if (effectiveDirection == Maze.NORTH) {
    Maze.pegmanY--;
    command = 'north';
  } else if (effectiveDirection == Maze.EAST) {
    Maze.pegmanX++;
    command = 'east';
  } else if (effectiveDirection == Maze.SOUTH) {
    Maze.pegmanY++;
    command = 'south';
  } else if (effectiveDirection == Maze.WEST) {
    Maze.pegmanX--;
    command = 'west';
  }
  Maze.path.push([command, id]);
  if (Maze.pegmanX == Maze.finish_.x && Maze.pegmanY == Maze.finish_.y) {
    // Finished.  Terminate the user's program.
    Maze.path.push(['finish', null]);
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
    Maze.path.push(['right', id]);
  } else {
    // Left turn (counterclockwise).
    Maze.pegmanD--;
    Maze.path.push(['left', id]);
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
  effectiveDirection = Maze.constrainDirection4(effectiveDirection);
  var square;
  if (effectiveDirection == Maze.NORTH) {
    square = Maze.MAP[Maze.pegmanY - 1] &&
      Maze.MAP[Maze.pegmanY - 1][Maze.pegmanX];
  } else if (effectiveDirection == Maze.EAST) {
    square = Maze.MAP[Maze.pegmanY][Maze.pegmanX + 1];
  } else if (effectiveDirection == Maze.SOUTH) {
    square = Maze.MAP[Maze.pegmanY + 1] &&
        Maze.MAP[Maze.pegmanY + 1][Maze.pegmanX];
  } else if (effectiveDirection == Maze.WEST) {
    square = Maze.MAP[Maze.pegmanY][Maze.pegmanX - 1];
  }
  return square !== 0 && square !== undefined;
};

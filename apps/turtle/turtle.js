/**
 * Blockly Demo: Turtle Graphics
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
 * @fileoverview Demonstration of Blockly: Turtle Graphics.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

document.write(turtlepage.start({}, null,
    {MSG: MSG, frameSrc: frameSrc.join('&')}));

/**
 * Create a namespace for the application.
 */
var Turtle = {};

Turtle.HEIGHT = 400;
Turtle.WIDTH = 400;

/**
 * PID of animation task currently executing.
 */
Turtle.pid = 0;

/**
 * Initialize Blockly and the turtle.  Called on page load.
 * @param {!Blockly} blockly Instance of Blockly from iframe.
 */
Turtle.init = function(blockly) {
  window.Blockly = blockly;

  // Add to reserved word list: API, local variables in execution evironment
  // (execute) and the infinite loop detection function.
  Blockly.JavaScript.addReservedWords('Turtle,code,timeouts,checkTimeout');

  window.onbeforeunload = function() {
    if (Blockly.mainWorkspace.getAllBlocks().length > 1) {
      return MSG.unloadWarning;
    }
    return null;
  };

  if (!('BlocklyStorage' in window)) {
    document.getElementById('linkButton').className = 'disabled';
  }

  // Initialize the slider.
  var sliderSvg = document.getElementById('slider');
  Turtle.speedSlider = new Slider(10, 35, 130, sliderSvg);

  // An href with #key trigers an AJAX call to retrieve saved blocks.
  if ('BlocklyStorage' in window && window.location.hash.length > 1) {
    BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else { // Load the editor with starting blocks.
    var xml = Blockly.Xml.textToDom(
        '<xml>' +
        '  <block type="draw_move" x="85" y="100">' +
        '    <value name="VALUE">' +
        '      <block type="math_number">' +
        '        <title name="NUM">10</title>' +
        '      </block>' +
        '    </value>' +
        '  </block>' +
        '</xml>');
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  }

  Turtle.ctxDisplay = document.getElementById('display').getContext('2d');
  Turtle.ctxScratch = document.getElementById('scratch').getContext('2d');
  Turtle.reset();
};

/**
 * Reset the maze to the start position and kill any pending animation tasks.
 */
Turtle.reset = function() {
  // Starting location and heading of the turtle.
  Turtle.x = Turtle.HEIGHT / 2;
  Turtle.y = Turtle.WIDTH / 2;
  Turtle.heading = 0;
  Turtle.penDownValue = true;

  // Clear the display.
  Turtle.ctxScratch.canvas.width = Turtle.ctxScratch.canvas.width;
  Turtle.ctxScratch.strokeStyle = '#000000';
  Turtle.ctxScratch.lineWidth = 1;
  Turtle.ctxScratch.lineCap = 'round';
  Turtle.display();

  // Kill any task.
  if (Turtle.pid) {
    window.clearTimeout(Turtle.pid);
  }
  Turtle.pid = 0;
};

/**
 * Copy the scratch canvas to the display canvas. Add a turtle marker.
 */
Turtle.display = function() {
  Turtle.ctxDisplay.globalCompositeOperation = 'copy';
  Turtle.ctxDisplay.drawImage(Turtle.ctxScratch.canvas, 0, 0);
  Turtle.ctxDisplay.globalCompositeOperation = 'source-over';

  // Draw the turtle body.
  var radius = Turtle.ctxScratch.lineWidth / 2 + 10;
  Turtle.ctxDisplay.beginPath();
  Turtle.ctxDisplay.arc(Turtle.x, Turtle.y, radius, 0, 2 * Math.PI, false);
  Turtle.ctxDisplay.lineWidth = 3;
  Turtle.ctxDisplay.strokeStyle = '#339933';
  Turtle.ctxDisplay.stroke();

  // Draw the turtle head.
  var WIDTH = 0.3;
  var HEAD_TIP = 10;
  var ARROW_TIP = 4;
  var BEND = 6;
  var radians = 2 * Math.PI * Turtle.heading / 360;
  var tipX = Turtle.x + (radius + HEAD_TIP) * Math.sin(radians);
  var tipY = Turtle.y - (radius + HEAD_TIP) * Math.cos(radians);
  radians -= WIDTH;
  var leftX = Turtle.x + (radius + ARROW_TIP) * Math.sin(radians);
  var leftY = Turtle.y - (radius + ARROW_TIP) * Math.cos(radians);
  radians += WIDTH / 2;
  var leftControlX = Turtle.x + (radius + BEND) * Math.sin(radians);
  var leftControlY = Turtle.y - (radius + BEND) * Math.cos(radians);
  radians += WIDTH;
  var rightControlX = Turtle.x + (radius + BEND) * Math.sin(radians);
  var rightControlY = Turtle.y - (radius + BEND) * Math.cos(radians);
  radians += WIDTH / 2;
  var rightX = Turtle.x + (radius + ARROW_TIP) * Math.sin(radians);
  var rightY = Turtle.y - (radius + ARROW_TIP) * Math.cos(radians);
  Turtle.ctxDisplay.beginPath();
  Turtle.ctxDisplay.fillStyle = '#339933';
  Turtle.ctxDisplay.moveTo(tipX, tipY);
  Turtle.ctxDisplay.lineTo(leftX, leftY);
  Turtle.ctxDisplay.bezierCurveTo(leftControlX, leftControlY,
      rightControlX, rightControlY, rightX, rightY);
  Turtle.ctxDisplay.closePath();
  Turtle.ctxDisplay.fill();
};

/**
 * Click the run button.  Start the program.
 */
Turtle.runButtonClick = function() {
  document.getElementById('runButton').style.display = 'none';
  document.getElementById('resetButton').style.display = 'inline';
  document.getElementById('spinner').style.visibility = 'visible';
  Blockly.mainWorkspace.traceOn(true);
  Turtle.execute();
};

/**
 * Click the reset button.  Reset the Turtle.
 */
Turtle.resetButtonClick = function() {
  document.getElementById('runButton').style.display = 'inline';
  document.getElementById('resetButton').style.display = 'none';
  document.getElementById('spinner').style.visibility = 'hidden';
  Blockly.mainWorkspace.traceOn(false);
  Turtle.reset();
};


/**
 * Execute the user's code.  Heaven help us...
 */
Turtle.execute = function() {
  Blockly.JavaScript.INFINITE_LOOP_TRAP = '  checkTimeout();\n';
  var timeouts = 0;
  var checkTimeout = function() {
    if (timeouts++ > 100000) {
      throw null;
    }
  };
  var code = Blockly.Generator.workspaceToCode('JavaScript');
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  Turtle.path = [];
  try {
    eval(code);
  } catch (e) {
    // Null is thrown for infinite loop.
    // Otherwise, abnormal termination is a user error.
    if (e !== null) {
      alert(e);
    }
  }

  // Turtle.path now contains a transcript of all the user's actions.
  // Reset the graphic and animate the transcript.
  Turtle.reset();
  Turtle.pid = window.setTimeout(Turtle.animate, 100);
};

/**
 * Show the user's code in raw JavaScript.
 */
Turtle.showCode = function() {
  var code = Blockly.Generator.workspaceToCode('JavaScript');
  // Strip out serial numbers.
  code = code.replace(/(,\s*)?'\d+'\)/g, ')');
  alert(code);
};

/**
 * Iterate through the recorded path and animate the turtle's actions.
 */
Turtle.animate = function() {
  // All tasks should be complete now.  Clean up the PID list.
  Turtle.pid = 0;

  var tuple = Turtle.path.shift();
  if (!tuple) {
    document.getElementById('spinner').style.visibility = 'hidden';
    Blockly.mainWorkspace.highlightBlock(null);
    return;
  }
  Blockly.mainWorkspace.highlightBlock(tuple.pop());

  switch (tuple[0]) {
    case 'FD':
      if (Turtle.penDownValue) {
        Turtle.ctxScratch.beginPath();
        Turtle.ctxScratch.moveTo(Turtle.x, Turtle.y);
      }
      var distance = tuple[1];
      if (distance) {
        Turtle.x += distance * Math.sin(2 * Math.PI * Turtle.heading / 360);
        Turtle.y -= distance * Math.cos(2 * Math.PI * Turtle.heading / 360);
        var bump = 0;
      } else {
        // WebKit (unlike Gecko) draws nothing for a zero-length line.
        var bump = 0.1;
      }
      if (Turtle.penDownValue) {
        Turtle.ctxScratch.lineTo(Turtle.x, Turtle.y + bump);
        Turtle.ctxScratch.stroke();
      }
      break;
    case 'RT':
      Turtle.heading += tuple[1];
      Turtle.heading %= 360;
      if (Turtle.heading < 0) {
        Turtle.heading += 360;
      }
      break;
    case 'PU':
      Turtle.penDownValue = false;
      break;
    case 'PD':
      Turtle.penDownValue = true;
      break;
    case 'PW':
      Turtle.ctxScratch.lineWidth = tuple[1];
      break;
    case 'PC':
      Turtle.ctxScratch.strokeStyle = tuple[1];
      break;
  }
  Turtle.display();

  // Scale the speed non-linearly, to give better precision at the fast end.
  var stepSpeed = 1000 * Math.pow(Turtle.speedSlider.getValue(), 2);
  Turtle.pid = window.setTimeout(Turtle.animate, stepSpeed);
};

// Turtle API.

Turtle.moveForward = function(distance, id) {
  Turtle.path.push(['FD', distance, id]);
};

Turtle.moveBackward = function(distance, id) {
  Turtle.path.push(['FD', -distance, id]);
};

Turtle.turnRight = function(angle, id) {
  Turtle.path.push(['RT', angle, id]);
};

Turtle.turnLeft = function(angle, id) {
  Turtle.path.push(['RT', -angle, id]);
};

Turtle.penUp = function(id) {
  Turtle.path.push(['PU', id]);
};

Turtle.penDown = function(id) {
  Turtle.path.push(['PD', id]);
};

Turtle.penWidth = function(width, id) {
  Turtle.path.push(['PW', Math.max(width, 0), id]);
};

Turtle.penColour = function(colour, id) {
  Turtle.path.push(['PC', colour, id]);
};

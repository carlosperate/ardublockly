// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="MSG" style="display: none"><span id="moveForward">move forward</span><span id="turnLeft">turn left</span><span id="turnRight">turn right</span><span id="doCode">do</span><span id="elseCode">else</span><span id="pathAhead">if path ahead</span><span id="pathLeft">if path to the left</span><span id="pathRight">if path to the right</span><span id="repeatUntil">repeat until</span><span id="moveForwardTooltip">Moves Pegman forward one space.</span><span id="turnTooltip">Turns Pegman left or right by 90 degrees.</span><span id="ifTooltip">If there is a path in the specified direction, \\nthen do some actions. </span><span id="ifelseTooltip">If there is a path in the specified direction, \\nthen do the first block of actions. \\nOtherwise, do the second block of actions. </span><span id="whileTooltip">Repeat the enclosed actions until finish point \\nis reached. </span><span id="capacity0">You have <span id=\'capacityNumber\'>0</span> blocks left.</span><span id="capacity1">You have <span id=\'capacityNumber\'>1</span> block left.</span><span id="capacity2">You have <span id=\'capacityNumber\'>%1</span> blocks left.</span><span id="nextLevel">Congratulations! Are you ready to proceed to level %1?</span><span id="finalLevel">Congratulations! You have solved the final level.</span><span id="oneTopBlock">On this level, you need to stack together all of the blocks in the white workspace.</span></div><table width="100%" height="100%"><tr height="50"><td colspan=2><div style="display: none;"><select id="languageMenu" onchange="Maze.changeLanguage();"></select></div><h1><span id="title"><a href="../index.html"><span id="blocklyName">Blockly</span></a> : Maze</span> &nbsp; ';
  for (var i103 = 1; i103 < 11; i103++) {
    output += ' ' + ((i103 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i103) + '</span>' : (i103 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i103) + '">' + soy.$$escapeHtml(i103) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i103) + '">' + soy.$$escapeHtml(i103) + '</a>');
  }
  output += '</h1></td></tr><tr><td width="410" valign="top"><div style="position: relative"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'A program is a sequence of blocks.  Stack a couple of \'move forward\' blocks together to help me reach the goal.';
      break;
    case 2:
      output += 'What is the sequence of steps to follow this path?';
      break;
    case 3:
      output += 'Computers have limited memory.  Reach the end of this path using only two blocks.  Use \'repeat\' to run a block more than once.';
      break;
    case 4:
      output += 'Reach the goal using only five blocks.';
      break;
    case 5:
      output += 'Pegman will have to turn left when he cannot go straight.';
      break;
    case 6:
      output += 'An \'if\' block will do something only if the condition is true.  Try turning left if there is a path to the left.';
      break;
    case 7:
      output += 'This maze looks more complicated than the previous one, but it is not.';
      break;
    case 8:
      output += 'You can use more than one \'if\' block.';
      break;
    case 9:
      output += 'If-else blocks will do one thing or the other.';
      break;
    case 10:
      output += 'Can you solve this complicated maze?  Try following the left-hand wall.  Advanced programmers only!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="100%"><tr><td style="width: 190px; text-align: center"><button title="See generated JavaScript code. " onclick="BlocklyApps.showCode();"><img src=\'../../media/1x1.gif\' class="code"></button><button id="linkButton" title="Save and link to blocks." onclick="BlocklyStorage.link();"><img src=\'../../media/1x1.gif\' class="link"></button><button id="randomizeButton" title="Randomize start and finish markers. onclick="Maze.randomizeMarkers();" style="display: none"><img src=\'../../media/1x1.gif\' class="random"></button></td><td style="width: 15px;"><img id="spinner" style="visibility: hidden;" src="loading.gif" height=15 width=15></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();">Run Program</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none">Reset</button></td></tr></table></td><td valign="top"><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></td></tr></table>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

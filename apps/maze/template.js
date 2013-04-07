// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<table width="100%" height="100%"><tr><td width="410" valign="top"><h1><a href="http://blockly.googlecode.com/">Blockly</a> &gt; <a href="../index.html">Apps</a> &gt; ' + soy.$$escapeHtml(opt_ijData.MSG.title) + '</h1><p class="levelLine">' + soy.$$escapeHtml(opt_ijData.MSG.level) + ': &nbsp;';
  for (var i8 = 1; i8 < 11; i8++) {
    output += (i8 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i8) + '</span>' : '<a class="tab" href="?level=' + soy.$$escapeHtml(i8) + '">' + soy.$$escapeHtml(i8) + '</a>';
  }
  output += '</p><div id="bubble"><div id="hint">' + soy.$$escapeHtml(opt_ijData.MSG.hints[opt_ijData.level]) + '</div></div><div id="capacity"></div><img id="pegman_bubble" height=42 width=55 src="pegman_bubble.png"><div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="400px"></div><table width="100%"><tr><td style="width: 190px; text-align: center"><button title="' + soy.$$escapeHtml(opt_ijData.MSG.codeTooltip) + '" onclick="Blockly.Apps.showCode();"><img src=\'../../media/1x1.gif\' class="code"></button><button id="linkButton" title="' + soy.$$escapeHtml(opt_ijData.MSG.linkTooltip) + '" onclick="BlocklyStorage.link();"><img src=\'../../media/1x1.gif\' class="link"></button><button id="randomizeButton" title="$ij.MSG.randomizeTooltip1" onclick="Maze.randomizeMarkers();" style="display: none"><img src=\'../../media/1x1.gif\' class="random"></button></td><td style="width: 15px;"><img id="spinner" style="visibility: hidden;" src="loading.gif" height=15 width=15></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();">' + soy.$$escapeHtml(opt_ijData.MSG.runProgram) + '</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none">' + soy.$$escapeHtml(opt_ijData.MSG.resetProgram) + '</button></td></tr></table></td><td valign="top"><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../generators/javascript.js"><\/script><script type="text/javascript">(function() {for (var x = 0; x < languageSrc.length; x++) {var file = languageSrc[x]; if (file.match(/^\\w+\\/\\w+\\.js$/)) {document.writeln(\'<script type="text/javascript" \' + \'src="../../language/\' + file + \'"><\' + \'/script>\');} else {console.error(\'Illegal language file: \' + file);}}})();<\/script><script type="text/javascript" src="blocks.js"><\/script><script type="text/javascript" src="../common.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></td></tr></table>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

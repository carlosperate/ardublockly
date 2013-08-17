// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">een visuele programmeeromgeving</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">Bekijk de gegenereerde JavaScript code.</span><span id="linkTooltip">Bewaar en verwijs naar blokken.</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Test programma</span><span id="resetProgram">Opnieuw</span><span id="dialogOk">OK</span><span id="dialogCancel">Cancel</span><span id="catLogic">Logic</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Procedures</span><span id="httpRequestError">Er was een probleem met de aanvraag.</span><span id="linkAlert">Deel je oplossing via deze link:\n\n%1</span><span id="hashError">Sorry, \'%1\' Komt niet overeen met opgeslagen instructies.</span><span id="xmlError">Kon je bewaarde instructies niet opladen.  Misschien waren ze gemaakt met een andere versie van Blockly?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">ga vooruit</span><span id="Maze_turnLeft">draai links</span><span id="Maze_turnRight">draai rechts</span><span id="Maze_doCode">doe</span><span id="Maze_elseCode">anders</span><span id="Maze_pathAhead">als de weg verder</span><span id="Maze_pathLeft">als de weg naar links</span><span id="Maze_pathRight">als de weg naar rechts</span><span id="Maze_repeatUntil">doe tot</span><span id="Maze_moveForwardTooltip">Zet Pegman een blokje vooruit. </span><span id="Maze_turnTooltip">Draai Pegman links of rechts over 90 graden.</span><span id="Maze_ifTooltip">Als er een weg in de opgegeven richting is, \\ndoe dan bepaalde acties. </span><span id="Maze_ifelseTooltip">Als er een weg in de opgegeven richting is, \\ndoe dan de eerste groep acties. \\nanders doe de tweede groep acties. </span><span id="Maze_whileTooltip">Doe de ingesloten instructies tot het doel \\nbereikt is. </span><span id="Maze_capacity0">Je hebt 0 instructies over.</span><span id="Maze_capacity1">Je hebt 1 instructie over.</span><span id="Maze_capacity2">Je hebt %1 instructies over.</span><span id="Maze_nextLevel">Proficiat! Ben je klaar om naar niveau %1 te gaan?</span><span id="Maze_finalLevel">Proficiat! Je hebt het laatste niveau opgelost.</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Doolhof</span> &nbsp; ';
  for (var i186 = 1; i186 < 11; i186++) {
    output += ' ' + ((i186 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i186) + '</span>' : (i186 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i186) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i186) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i186) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i186) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Stop een paar \'ga vooruit\' instructies samen en help me op mijn doel te bereiken.';
      break;
    case 2:
      output += 'Wat is de volgorde van instructies om de weg te volgen?';
      break;
    case 3:
      output += 'Computers hebben een beperkt geheugen. Bereik het einde van de weg met enkel 2 instructies. Gebruik \'herhaal\' om een instructie meerdere keren uit te voeren.';
      break;
    case 4:
      output += 'Bereik het doel met enkel 5 instructies.';
      break;
    case 5:
      output += 'Breaking a problem into two pieces can make things easier.';
      break;
    case 6:
      output += 'Een \'als\' instructie zal enkel iets doen als de voorwaarde \'waar\' is. Probeer naar links te draaien als er een weg naar links is.';
      break;
    case 7:
      output += 'Dit doolhof ziet er ingewikkelder uit dan het vorige, maar dit is niet zo.';
      break;
    case 8:
      output += 'Je kan meer dan 1 \'als\' instructie gebruiken.';
      break;
    case 9:
      output += '\'als\' / \'anders\' instructies doen het ene of het andere.';
      break;
    case 10:
      output += 'Kun je dit ingewikkelde doolhof oplossen? Probeer de linker muur te volgen. Enkel voor geavanceerde programmeurs!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="Bekijk de gegenereerde JavaScript code." onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" class="notext" title="Bewaar en verwijs naar blokken." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="primary" onclick="Maze.runButtonClick();" title="Makes the player do what the blocks say."><img src="../../media/1x1.gif" class="run icon21"> Test programma</button><button id="resetButton" class="primary" onclick="Maze.resetButtonClick();" style="display: none" title="Put the player back at the start of the maze."><img src="../../media/1x1.gif" class="stop icon21"> Opnieuw</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + '<div id="dialogDone" class="dialogHiddenContent"><div id="dialogDoneText" style="font-size: large; margin: 1em;"></div><img src="../../media/1x1.gif" id="pegSpin"><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>Op dit niveau moet je alle instructies samenleggen in het witte gedeelte.</div><iframe id="iframeOneTopBlock" src=""></iframe>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

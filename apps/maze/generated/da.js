// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">a visual programming environment</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">Se den genererede JavaScript kode.</span><span id="linkTooltip">Gem og link til blokke.</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Kør Program</span><span id="resetProgram">Nulstil</span><span id="dialogOk">OK</span><span id="dialogCancel">Cancel</span><span id="catLogic">Logic</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Procedures</span><span id="httpRequestError">Der var et problem med forespørgslen.</span><span id="linkAlert">Del dine blokke med dette link:\n\n%1</span><span id="hashError">Beklager, \'%1\' passer ikke med nogen gemt Blockly fil.</span><span id="xmlError">Kunne ikke hente din gemte fil.  Måske er den lavet med en anden udgave af Blockly?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
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
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">flyt fremad</span><span id="Maze_turnLeft">drej venstre</span><span id="Maze_turnRight">drej højre</span><span id="Maze_doCode">gør</span><span id="Maze_elseCode">ellers</span><span id="Maze_pathAhead">hvis sti foran</span><span id="Maze_pathLeft">hvis sti til venstre</span><span id="Maze_pathRight">hvis sti til højre</span><span id="Maze_repeatUntil">gentag indtil</span><span id="Maze_moveForwardTooltip">Flytter pindemand et tern fremad.</span><span id="Maze_turnTooltip">Drejer pindemand 90 grader til højre eller venstre.</span><span id="Maze_ifTooltip">Hvis der er en sti i den angivne retning, \\nså udfør nogle handlinger. </span><span id="Maze_ifelseTooltip">Hvis der er en sti i den angivne retning, \\nså udfør den første handlingsblok. \\nHvis ikke, så udfør den anden handlingsblok. </span><span id="Maze_whileTooltip">Gentag handlingsblok indtil slutpunktet er nået.</span><span id="Maze_capacity0">Du har 0 blokke tilbage.</span><span id="Maze_capacity1">Du har 1 blok tilbage.</span><span id="Maze_capacity2">Du har %1 blokke tilbage.</span><span id="Maze_nextLevel">Tillykke! Er du klar til at fortsætte til bane %1?</span><span id="Maze_finalLevel">Tillykke! Du har klaret den sidste bane!.</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Labyrint</span> &nbsp; ';
  for (var i186 = 1; i186 < 11; i186++) {
    output += ' ' + ((i186 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i186) + '</span>' : (i186 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i186) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i186) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i186) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i186) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Sæt et par \'flyt fremad\' blokke sammen for at hjælpe mig til at nå målet,';
      break;
    case 2:
      output += 'Hvad er sekvensen af handlinger for at følge denne sti?';
      break;
    case 3:
      output += 'Computere har begrænset hukommelse. Prøv at nå enden af denne sti ved kun at bruge to blokke. Brug \'gentag\' til at køre en blok mere end én gang.';
      break;
    case 4:
      output += 'Nå målet ved kun at bruge fem blokke.';
      break;
    case 5:
      output += 'Pindeman er nødt til at dreje til venstre når han ikke kan gå lige ud.';
      break;
    case 6:
      output += 'En \'hvis\' sætning vil kun gøre noget hvis betingelsen er sand. Prøv at dreje til venstre hvis der er en sti til venstre.';
      break;
    case 7:
      output += 'Denne labyring ser mere kompliceret ud en den forrige, men det er den ikke.';
      break;
    case 8:
      output += 'Du kan bruge mere end en \'hvis\' sætning.';
      break;
    case 9:
      output += 'Hvis-ellers sætninger vil gøre den ene eller anden ting.';
      break;
    case 10:
      output += 'Kan du løse denne komplicerede labyrint? Prøv at følge den væggen på venstre hånd.';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="Se den genererede JavaScript kode." onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" class="notext" title="Gem og link til blokke." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="primary" onclick="Maze.runButtonClick();" title="Makes the player do what the blocks say."><img src="../../media/1x1.gif" class="run icon21"> Kør Program</button><button id="resetButton" class="primary" onclick="Maze.resetButtonClick();" style="display: none" title="Put the player back at the start of the maze."><img src="../../media/1x1.gif" class="stop icon21"> Nulstil</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + '<div id="dialogDone" class="dialogHiddenContent"><div id="dialogDoneText" style="font-size: large; margin: 1em;"></div><img src="../../media/1x1.gif" id="pegSpin"><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>På denne bane skal du sætte alle blokkene sammen i det hvide arbejdsfelt.</div><iframe id="iframeOneTopBlock" src=""></iframe>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

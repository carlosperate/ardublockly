// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="subtitle">vizuális programozási környezet</span><span id="linkButton">Save and link to blocks.</span><span id="runTooltip">Program futtatása.</span><span id="runProgram">Program futtatása</span><span id="resetProgram">Alaphelyzet</span><span id="codeTooltip">A JavaScript forráskód megtekintése.</span><span id="catLogic">Logikai műveletek</span><span id="catLoops">Ciklusok</span><span id="catMath">Matematikai műveletek</span><span id="catText">Sztring műveletek</span><span id="catLists">Listakezelés</span><span id="catColour">Színek</span><span id="catVariables">Változók</span><span id="catProcedures">Eljárások</span><span id="httpRequestError">A kéréssel kapcsolatban probléma merült fel.</span><span id="blocklyMessage">Blockly</span><span id="linkAlert">Ezzel a hivatkozással tudod megosztani a programodat:\n\n%1</span><span id="hashError">Elnézést, a \'%1\' hivatkozásnem tartozik egyetlen programhoz sem.</span><span id="xmlError">A programodat nem lehet betölteni.  Elképzelhető, hogy a Blockly egy másik verziójában készült?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<style type="text/css">#dialog {visibility: hidden; background-color: #fff; color: #000; border: 1px solid #000; position: absolute; border-radius: 8px; box-shadow: 5px 5px 5px #888; padding: 10px;}#dialogBorder {visibility: hidden; position: absolute; background-color: #fff; color: #000; border: 1px solid #000; border-radius: 8px; box-shadow: 5px 5px 5px #888;}#dialogShadow {visibility: hidden; position: absolute; top: 0; left: 0; height: 100%; width: 100%; background-color: #000; opacity: 0.3}.dialogAnimate {transition-property: width height left top opacity; transition-duration: 0.2s;}.dialogHiddenContent {visibility: hidden; position: absolute; top: 0; left: 0; z-index: -1;}</style><div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button onclick="BlocklyApps.hideDialog(true)">Elolvastam</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">Menj előre</span><span id="Maze_turnLeft">Fordulj balra</span><span id="Maze_turnRight">Fordulj jobbra</span><span id="Maze_doCode">akkor</span><span id="Maze_elseCode">egyébként</span><span id="Maze_pathAhead">Ha szabad az út előtted</span><span id="Maze_pathLeft">Ha szabad az út balra</span><span id="Maze_pathRight">Ha szabad az út jobbra</span><span id="Maze_repeatUntil">Ismételd a</span><span id="Maze_moveForwardTooltip">Pegman előre lép egy mezőt.</span><span id="Maze_turnTooltip">Pegman 90 fokot fordul balra, vagy jobbra.</span><span id="Maze_ifTooltip">Ha szabad az út a megadott irányban, \\nakkor végrehajtja az utasításokat. </span><span id="Maze_ifelseTooltip">Ha szabad az út a megadott irányban, \\nakkor végrehajtja az első blokkban \\nmegadott utasításokat. Egyébként a \\nmásodik blokkban szereplő utasításokat \\nhajtja végre. </span><span id="Maze_whileTooltip">A beágyazott utasításokat hajtja végre a cél \\neléréséig. </span><span id="Maze_capacity0">Nem használhatsz fel több blokkot.</span><span id="Maze_capacity1">Még 1 blokkot használhatsz fel.</span><span id="Maze_capacity2">Még %1 blokkot használhatsz fel.</span><span id="Maze_nextLevel">Gratulálok! Kész vagy megoldani a(z) %1. szintet?</span><span id="Maze_finalLevel">Gratulálok! Sikeresen megoldottad az utolsó szintet.</span><span id="Maze_oneTopBlock">Ezen a szinten össze kell kapcsolnod minden blokkot a munkaterületen.</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Labirintus</span> &nbsp; ';
  for (var i183 = 1; i183 < 11; i183++) {
    output += ' ' + ((i183 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i183) + '</span>' : (i183 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i183) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i183) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i183) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i183) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Egy program utasítások sorozatából áll. Segíts eljutatni Pegmant a célig, kapcsolj össze néhány \'Menj előre\' blokkot!';
      break;
    case 2:
      output += 'Milyen lépések sorozata kell, hogy eljuttasd Pegmant a célig?';
      break;
    case 3:
      output += 'A számítógépeknek véges a memóriájuk. Juttasd el Pegmant a célig mindössze 2 blokk felhasználásával. Használd az \'Ismételd a célbaérésig\' blokkot egy másik blokk ismételt végrehajtásához.';
      break;
    case 4:
      output += 'Juttasd el Pegmant a célig mindössze 5 blokk felhasználásával.';
      break;
    case 5:
      output += 'Pegmannak balra kellene fordulnia, ha nem tud előre menni az úton.';
      break;
    case 6:
      output += 'Egy \'Ha\' esetén az utasítások csak akkor kerülnek végrehajtásra, ha a feltétel igaz. Próbáld Pegmant balra fordítani, ha van út balra.';
      break;
    case 7:
      output += 'Ez a labirintus bonyolultabbank tűnik az előzőnél, de ez csak a látszat.';
      break;
    case 8:
      output += 'Egynél több \'Ha\' feltételt is használhatsz.';
      break;
    case 9:
      output += 'A Ha-egyébként feltétel esetén vagy az egyik, vagy a másik utasítás-csoport kerül végrehajtásra.';
      break;
    case 10:
      output += 'Végig tudod vezetni Pegmant ezen a bonyolult labirintuson? Próbáld a bal oldali falat követni. Haladó programozóknak!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="A JavaScript forráskód megtekintése." onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button class="notext" id="linkButton" title="Save and link to blocks." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();" title="Makes the character do what the blocks say."><img src="../../media/1x1.gif" class="run icon21"> Program futtatása</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none" title="Put the character back at the start of the maze."><img src="../../media/1x1.gif" class="stop icon21"> Alaphelyzet</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>Ezen a szinten össze kell kapcsolnod minden blokkot a munkaterületen.</div><iframe id="iframeOneTopBlock" src=""></iframe>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

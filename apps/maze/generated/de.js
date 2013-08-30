// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">Visuelle Programmierumgebung</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">Erzeugten JavaScript-Code ansehen.</span><span id="linkTooltip">Speichern und auf Bausteine verlinken.</span><span id="runTooltip">Das Programm ausführen, das von den Bausteinen \\nim Arbeitsbereich definiert ist. </span><span id="runProgram">Programm ausführen</span><span id="resetProgram">Zurücksetzen</span><span id="dialogOk">Okay</span><span id="dialogCancel">Cancel</span><span id="catLogic">Logik</span><span id="catLoops">Schleifen</span><span id="catMath">Mathematik</span><span id="catText">Text</span><span id="catLists">Listen</span><span id="catColour">Farbe</span><span id="catVariables">Variablen</span><span id="catProcedures">Funktionen</span><span id="httpRequestError">Mit der Anfrage gab es ein Problem.</span><span id="linkAlert">Teile deine Bausteine mit diesem Link:\n\n%1</span><span id="hashError">„%1“ stimmt leider mit keinem gespeicherten Programm überein.</span><span id="xmlError">Deine gespeicherte Datei konnte nicht geladen werden. Vielleicht wurde sie mit einer anderen Version von Blockly erstellt.</span><span id="listVariable">Liste</span><span id="textVariable">Text</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.codeDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.storageDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogStorage" class="dialogHiddenContent"><div id="containerStorage"></div>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">Okay</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">vorwärts laufen</span><span id="Maze_turnLeft">links abbiegen</span><span id="Maze_turnRight">rechts abbiegen</span><span id="Maze_doCode">ausführen</span><span id="Maze_elseCode">sonst</span><span id="Maze_pathAhead">wenn Pfad davor ist</span><span id="Maze_pathLeft">wenn Pfad nach links ist</span><span id="Maze_pathRight">wenn Pfad nach rechts ist</span><span id="Maze_repeatUntil">wiederholen bis</span><span id="Maze_moveForwardTooltip">Bewegt den Spieler ein Feld vor.</span><span id="Maze_turnTooltip">Dreht den Spieler um 90 Grad nach links oder \\nrechts. </span><span id="Maze_ifTooltip">Falls es einen Pfad in der angegebenen Richtung \\ngibt, dann einige Aktionen ausführen. </span><span id="Maze_ifelseTooltip">Falls es einen Pfad in der angegebenen Richtung \\ngibt, dann den ersten Aktionenbaustein ausführen, \\nanderenfalls den zweiten. </span><span id="Maze_whileTooltip">Die beigefügten Aktionen wiederholen, \\nbis das Ziel erreicht wurde. </span><span id="Maze_capacity0">Du hast noch <span id=\'capacityNumber\'>0</span> Bausteine.</span><span id="Maze_capacity1">Du hast noch <span id=\'capacityNumber\'>1</span> Baustein.</span><span id="Maze_capacity2">Du hast noch <span id=\'capacityNumber\'>%1</span> Bausteine.</span><span id="Maze_nextLevel">Gratulation! In das Level %1 gehen?</span><span id="Maze_finalLevel">Gratulation! Du hast das Spiel beendet.</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Labyrinth</span> &nbsp; ';
  for (var i194 = 1; i194 < 11; i194++) {
    output += ' ' + ((i194 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i194) + '</span>' : (i194 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i194) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i194) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i194) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i194) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Verbinde einige \'laufe vorwärts\' Blöcke, um mir zu helfen um das Ziel zu erreichen.';
      break;
    case 2:
      output += 'Was ist die Schrittfolge, um diesem Pfad zu folgen?';
      break;
    case 3:
      output += 'Computer haben begrenzten Speicher. Erreiche das Ende dieses Pfads mit nur zwei Bausteinen. Benutze „Wiederholen“, um einen Baustein mehr als einmal auszuführen.';
      break;
    case 4:
      output += 'Erreiche das Ziel mit nur fünf Bausteinen.';
      break;
    case 5:
      output += 'Das Männchen wird links abbiegen, wenn es nicht geradeaus gehen kann.';
      break;
    case 6:
      output += 'Ein „Wenn“-Baustein macht etwas, falls die Bedingung wahr ist. Versuche links abzubiegen, falls es einen Pfad nach links gibt.';
      break;
    case 7:
      output += 'Dieses Labyrinth sieht schwieriger aus als die vorherigen. Ist es aber nicht.';
      break;
    case 8:
      output += 'Du kannst mehr als einen „Wenn“-Baustein benutzen.';
      break;
    case 9:
      output += 'Wenn-Sonst-Bausteine führen das eine oder das andere aus.';
      break;
    case 10:
      output += 'Kannst du dieses komplizierte Labyrinth lösen? Folge der linken Wand. Nur für fortgeschrittene Programmierer!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="Erzeugten JavaScript-Code ansehen." onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" class="notext" title="Speichern und auf Bausteine verlinken." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="primary" onclick="Maze.runButtonClick();" title="Das Zeichen macht das, was die Bausteine sagen."><img src="../../media/1x1.gif" class="run icon21"> Programm ausführen</button><button id="resetButton" class="primary" onclick="Maze.resetButtonClick();" style="display: none" title="Setzt das Zeichen an den Start des Labyrinths \\nzurück. "><img src="../../media/1x1.gif" class="stop icon21"> Zurücksetzen</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + '<div id="dialogDone" class="dialogHiddenContent"><div id="dialogDoneText" style="font-size: large; margin: 1em;"></div><img src="../../media/1x1.gif" id="pegSpin"><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>In diesem Level musst du die ganzen Bausteine in dem weißen Arbeitsbereich zusammenstapeln.</div><iframe id="iframeOneTopBlock" src=""></iframe>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

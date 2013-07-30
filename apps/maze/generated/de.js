// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="MSG" style="display: none"><span id="moveForward">laufe vorwärts</span><span id="turnLeft">drehen links herum</span><span id="turnRight">drehen rechts herum</span><span id="doCode">mache</span><span id="elseCode">ansonsten</span><span id="pathAhead">wenn ein Pfad vor Packman</span><span id="pathLeft">wenn ein Pfad links von Packman</span><span id="pathRight">wenn ein Pfad rechts von Packman</span><span id="repeatUntil">wiederhole bis zum</span><span id="moveForwardTooltip">Packman läuft 1 Feld vor.</span><span id="turnTooltip">Dreht Packman nach links oder rechts.</span><span id="ifTooltip">Führe eine Aktion aus, falls sich an der \\nangegebenen Position ein Pfad befindet. </span><span id="ifelseTooltip">Falls sich an der angegebenen Position ein Pfad \\nbefindet, dann führe die erste Anweisung aus. \\nAnderfalls führe die zweite Anweisung aus. </span><span id="whileTooltip">Führe die angegebene Aktion aus, \\nbis das Ziel erreicht wurde. </span><span id="capacity0">Du hast 0 Anweisungen zur Verfügung.</span><span id="capacity1">Du hast 1 Anweisung zur Verfügung.</span><span id="capacity2">Du hast %1 Anweisungen zur Verfügung.</span><span id="nextLevel">Gratulation! In das Level %1 gehen?</span><span id="finalLevel">Gratulation! Du hast das Spiel beendet.</span><span id="oneTopBlock">On this level, you need to stack together all of the blocks in the white workspace.</span></div><div id="COMMON_MSG" style="display: none"><span id="httpRequestError">Es gab ein Problem während der HTTP Anfrage.</span><span id="linkAlert">Blöcke mit diesem Link teilen:\n\n%1</span><span id="hashError">Entschuldigung, konnte die gespeicherten Blöcke für \'%1\' nicht finden.</span><span id="xmlError">Kann Sicherungsdatei nicht laden.  Diese wurde vermutlich mit einer veralteten Version von Blockly erstellt?</span></div><table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Labyrinth</span> &nbsp; ';
  for (var i118 = 1; i118 < 11; i118++) {
    output += ' ' + ((i118 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i118) + '</span>' : (i118 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i118) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i118) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i118) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i118) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Ein Programm besteht aus einer Aneinanderreihungen von Anweisungen. Verbinde einige \'laufe vorwärts\' Blöcke, um mir zu helfen um das Ziel zu erreichen.';
      break;
    case 2:
      output += 'Welche Anweisungen werden benötigt um dieses Labyrinth zu durchlaufen?';
      break;
    case 3:
      output += 'Computer haben begrenzten Speicher. Dieses Labyrinth lässt sich mit nur 2 Anweisungen lösen. Benutze \'wiederholen\' um eine Anweisung mehr als ein mal aus zu führen.';
      break;
    case 4:
      output += 'Für dieses Labyrinth hast du nur 5 Anweisungen zur verfügung.';
      break;
    case 5:
      output += 'Pacman dreht sich links herum, wenn er nicht weiter geradeaus gehen kann.';
      break;
    case 6:
      output += 'Eine \'wenn\' Bedingung wird führt etwas nur aus, wenn die Bedingung wahr ist. Versuche die Anweisung \'wenn ein Pfad vor Packman\' aus.';
      break;
    case 7:
      output += 'Dieses Labyrinth sieht schwieriger aus als die vorherigen. Ist es aber nicht.';
      break;
    case 8:
      output += 'Du kannst zwei \'wenn\' Bedingungen in einander verschachteln.';
      break;
    case 9:
      output += 'Wenn-ansonsten Anweisungen führen etwas aus wenn eine Bedingung zutrifft oder eine Alternative.';
      break;
    case 10:
      output += 'Schaffst du dieses komplexe Labyrinth. Folge der Wand.';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button title="Erzeugten JavaScript Code anzeigen." onclick="BlocklyApps.showCode();"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" title="Blöcke abspeichern und Link erzeugen." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();" title="Makes the character do what the blocks say."><img src="../../media/1x1.gif" class="run icon21"> Programm ausführen</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none" title=Put the character back at the start of the maze.><img src="../../media/1x1.gif" class="stop icon21"> Zurücksetzen</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

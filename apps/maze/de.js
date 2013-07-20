// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="MSG" style="display: none"><span id="moveForward">laufe vorwärts</span><span id="turnLeft">drehen links herum</span><span id="turnRight">drehen rechts herum</span><span id="doCode">mache</span><span id="elseCode">ansonsten</span><span id="pathAhead">wenn ein Pfad vor Packman</span><span id="pathLeft">wenn ein Pfad links von Packman</span><span id="pathRight">wenn ein Pfad rechts von Packman</span><span id="repeatUntil">wiederhole bis zum</span><span id="moveForwardTooltip">Packman läuft 1 Feld vor.</span><span id="q4wrong">No - Try tracking my direction while following the program.</span><span id="q4right">That\'s right! Good job.</span><span id="q5wrong">No - Try tracking my direction while following the program.</span><span id="q5right">You got it right!</span><span id="q10wrong">No - Try tracking my direction while following the program.</span><span id="q10right">That\'s right!</span><span id="turnTooltip">Dreht Packman nach links oder rechts.</span><span id="ifTooltip">Führe eine Aktion aus, falls sich an der \\nangegebenen Position ein Pfad befindet. </span><span id="ifelseTooltip">Falls sich an der angegebenen Position ein Pfad \\nbefindet, dann führe die erste Anweisung aus. \\nAnderfalls führe die zweite Anweisung aus. </span><span id="whileTooltip">Führe die angegebene Aktion aus, \\nbis das Ziel erreicht wurde. </span><span id="capacity0">Du hast 0 Anweisungen zur Verfügung.</span><span id="capacity1">Du hast 1 Anweisung zur Verfügung.</span><span id="capacity2">Du hast %1 Anweisungen zur Verfügung.</span><span id="nextLevel">Congratulations! You have completed this level.</span><span id="finalLevel">Gratulation! Du hast das Spiel beendet.</span><span id="oneTopBlock">On this level, you need to stack together all of the blocks in the white workspace.</span></div><div id="COMMON_MSG" style="display: none"><span id="httpRequestError">Es gab ein Problem während der HTTP Anfrage.</span><span id="linkAlert">Blöcke mit diesem Link teilen:\n\n%1</span><span id="hashError">Entschuldigung, konnte die gespeicherten Blöcke für \'%1\' nicht finden.</span><span id="xmlError">Kann Sicherungsdatei nicht laden.  Diese wurde vermutlich mit einer veralteten Version von Blockly erstellt?</span></div><table width="100%" height="100%"><tr height="88"><td colspan=3><div style="display: none;"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../media/1x1.gif"><span>&#x25BE;</span></button></div><h1><span id="title"><a href="../index.html">Blockly</a> : Labyrinth</span> &nbsp; ';
  for (var i136 = 1; i136 < 12; i136++) {
    output += ' ' + ((i136 == opt_ijData.level) ? (i136 > 9) ? '<span class="selected doubleDigit tab">' + soy.$$escapeHtml(i136) + '</span>' : '<span class="selected singleDigit tab">' + soy.$$escapeHtml(i136) + '</span>' : (i136 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i136) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i136) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i136) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i136) + '</a>');
  }
  output += '</h1></td></tr><tr><td width="400" valign="top"><div id="shadow"></div><div id="levelFeedback"><div style="padding-bottom: 0.7ex;"><br><textarea id="levelFeedbackText" rows=2 cols=40 style="resize: none; border: 0; text-align: center; overflow: hidden; font-size: 16pt; font-family: Arial;">';
  switch (opt_ijData.level) {
    case 1:
    case 2:
    case 4:
      output += 'Use only the blocks you need to get to complete the level.';
      break;
    case 3:
      output += 'Try using the repeat block so you can complete the level with only 2 blocks.';
      break;
    case 5:
    case 6:
    case 7:
    case 8:
      output += 'Try using the repeat block.';
      break;
    case 9:
    case 10:
      output += 'Use two \'if\' statements so I can move left and right when needed.';
      break;
    case 11:
      output += 'This level requires only four blocks if you use an if-else block.';
      break;
  }
  output += '</textarea><div id="interstitial" style="display: none;">' + ((opt_ijData.level == 2) ? '<img style="margin-left: 110px;" src="repeat_block.png">' : '') + '<br><div id="reinfbubble"><span id="reinfMsg">';
  switch (opt_ijData.level) {
    case 2:
      output += 'A repeat block repeats the blocks inside it until I reach the red marker.';
      break;
    case 3:
      output += 'You have just written some programs. Good job!';
      break;
    case 4:
      output += 'Which direction am I facing after this program ends?';
      break;
    case 5:
      output += 'Here is an if block: I will turn left if there is a path to the left.';
      break;
    case 6:
      output += 'We can place \'if\' blocks inside \'repeat\' blocks. Where am I when this program ends? Click on the correct picture below.';
      break;
    case 7:
      output += 'Repeat blocks allow me to do an action multiple times without additional blocks. \'if\' blocks allow me to do an action based on my surroundings.';
      break;
    case 9:
      output += 'Here is an \'if-else\' block: I move forward if there is a path ahead, but I turn left if not.';
      break;
    case 10:
      output += 'Will the blocks below move me to the red marker?';
      break;
  }
  output += '</span></div><img id="pegman_bubble" height=42 width=55 src="pegman_bubble.png">' + ((opt_ijData.level == 4) ? '<p><img border=2 src="dirs.png">&nbsp;<img src="dirs2.png"><br>' : '') + ((opt_ijData.level == 5) ? '<p><img style="margin-left: 110px;" src="ifblock.png"><br>' : '') + ((opt_ijData.level == 6) ? '<img style="margin-top: 10px;" border=2 src="repeat_block2.png"><br>' : '') + ((opt_ijData.level == 9) ? '<p><img style="margin-left: 60px; height: 150px; width: 260px;" src="if-else2.png"><br><br>' : '') + ((opt_ijData.level == 10) ? '<p><img style="margin-left: 10px; height: 350px; width: 490px;" src="ifelse.png"><br>' : '') + ((opt_ijData.level == 4) ? '<p><input type="radio" name="q4" id="q41" onclick="Maze.showReinfHelp(\'q4w\')"><span style="font-weight: bold"> N</span><br><input type="radio" name="q4" id="q42" onclick="Maze.showReinfHelp(\'q4w\')"><span style="font-weight: bold"> E</span><br><input type="radio" name="q4" id="q43" onclick="Maze.showReinfHelp(\'q4w\')"><span style="font-weight: bold"> S</span><br><input type="radio" name="q4" id="q44" onclick="Maze.showReinfHelp(\'q4r\')"><span style="font-weight: bold"> W</span><br><br></p><div id="shadow"></div><div id="reinfDone"><div style="padding-bottom: 0.7ex;"><div style="text-align: center;" id="reinfFeedbackImage"></div><br><textarea id="reinfFeedbackText" rows=2 cols=40 style="resize: none; border: none; text-align: center; overflow: hidden; font-size: 16pt; font-family: Arial;"></textarea></div><div style="text-align: center; padding-top: 1ex; padding-right: 3ex"><button id="okButton" class="launch" onclick="Maze.hideReinfHelp()&nbsp"><span>OK</span></button></div></div>' : '') + ((opt_ijData.level == 6) ? '<p><img style="margin-left: 30px;" src="repeat_blocka1.png" onclick="Maze.showReinfHelp(\'q5w\')"><img style="margin-left: 20px;" src="repeat_blocka2.png" onclick="Maze.showReinfHelp(\'q5r\')"><img style="margin-left: 20px;" src="repeat_blocka3.png" onclick="Maze.showReinfHelp(\'q5w\')"></p><div id="shadow"></div><div id="reinfDone"><div style="padding-bottom: 0.7ex"><div style="text-align: center;" id="reinfFeedbackImage"></div><br><textarea id="reinfFeedbackText" rows=2 cols=40 style="resize: none; border: none; text-align: center; overflow: hidden; font-size: 16pt; font-family: Arial;"></textarea></div><div style="text-align: center; padding-top: 1ex; padding-right: 3ex;"><button id="okButton" class="launch" onclick="Maze.hideReinfHelp()"><span>OK</span></button></div></div>' : '') + ((opt_ijData.level == 10) ? '<p><input type="radio" name="q8" id="q81" onClick="Maze.showReinfHelp(\'q10r\')"><span style="font-weight: bold"> Yes</span><br><input type="radio" name="q8" id="q82" onClick="Maze.showReinfHelp(\'q10w\')"><span style="font-weight: bold"> No</span><br><br></p><div id="shadow"></div><div id="reinfDone"><div style="padding-bottom: 0.7ex;"><div style="text-align:center;" id="reinfFeedbackImage"></div><br><textarea id="reinfFeedbackText" rows=2 cols=40 style="resize: none; border: none; text-align: center; overflow: hidden; font-size: 16pt; font-family: Arial;"></textarea></div><div style="text-align: center; padding-top: 1ex; padding-right: 3ex;"><button id="okButton" class="launch" onclick="Maze.hideReinfHelp()"><span>OK</span></button></div></div>' : '') + '</div><br><br><div style="text-align: center"><button id="tryLevelAgainButton" class="launch" style="display: none" onclick="Maze.closeDialogButtonClick(false);">Try again</button><button id="nextLevelButton" class="launch" style="display: none" onclick="Maze.closeDialogButtonClick(true);">Gratulation! In das Level %1 gehen?</button></div></div></div><div id=\'maze\' style="display: inline;"><div style="position: relative"><div id="hintBubble"><div id="hint">';
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
    case 11:
      output += 'Use the \'if-else\' block to help me get out of the maze!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="100%"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button title="Erzeugten JavaScript Code anzeigen." onclick="BlocklyApps.showCode();"><img src=\'../media/1x1.gif\' class="code icon21"></button><button id="linkButton" title="Blöcke abspeichern und Link erzeugen." onclick="BlocklyStorage.link();"><img src=\'../media/1x1.gif\' class="link icon21"></button><button id="randomizeButton" title="Randomize start and finish markers. onclick="Maze.randomizeMarkers();" style="display: none"><img src=\'../media/1x1.gif\' class="random icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();"><img src="../media/1x1.gif" class="run icon21"> Programm ausführen</button></button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none"><img src="../media/1x1.gif" class="stop icon21">Zurücksetzen</button></td></tr></table></td><td valign="top"><script type="text/javascript" src="../blockly_compressed.js"><\/script><script type="text/javascript" src="../javascript_compressed.js"><\/script><script type="text/javascript" src="../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></td></tr></table></div><div id="pegmanMenu"></div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 9) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

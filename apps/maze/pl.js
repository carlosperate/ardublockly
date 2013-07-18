// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="MSG" style="display: none"><span id="moveForward">idź naprzód</span><span id="turnLeft">skręć w lewo</span><span id="turnRight">skręć w prawo</span><span id="doCode">wykonaj</span><span id="elseCode">albo</span><span id="pathAhead">jeśli droga prowadzi prosto</span><span id="pathLeft">jeśli droga skręca w lewo</span><span id="pathRight">jeśli droga skręca w prawo</span><span id="repeatUntil">powtarzaj dopóki nie</span><span id="moveForwardTooltip">Przesuwa Pegman-a prosto o jedno pole.</span><span id="turnTooltip">Obraca Pegman-a w lewo lub prawo o 90 stopni.</span><span id="ifTooltip">Jeśli droga prowadzi we wskazanym kierunku, \\nwykonaj polecenia. </span><span id="ifelseTooltip">Jeśli droga prowadzi we wskazanym kierunku, \\nwykonaj pierwszy zestaw poleceń. \\nW przeciwnym razie, wykonaj drugi zestaw \\npoleceń. </span><span id="whileTooltip">Wykonuj zestaw poleceń dopóki nie osiągniesz \\npunktu końcowego. </span><span id="capacity0">Pozostało 0 poleceń.</span><span id="capacity1">Wykorzystano 1 polecenie.</span><span id="capacity2">Wykorzystano %1 poleceń.</span><span id="nextLevel">Gratulacje! Czy chcesz przejść na poziom %1?</span><span id="finalLevel">Gratulacje! Ostatni poziom został rozwiązany.</span><span id="oneTopBlock">Na tym poziomie, ustaw wszystkie polecania na białym polu.</span></div><div id="COMMON_MSG" style="display: none"><span id="httpRequestError">Wystąpił problem z przesłaniem żądania.</span><span id="linkAlert">Udostępnij link ze swoimi poleceniami:\n\n%1</span><span id="hashError">Przepraszamy, \'%1\' jest nieodpowiedni do zapisanych plików Blockly.</span><span id="xmlError">Nie można wgrać pliku.  Może plik został zapisany w innej wersji Blockly?</span></div><table width="100%" height="100%"><tr height="50"><td colspan=3><div style="display: none;" id="farSide"><select id="languageMenu" onchange="Maze.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></div><h1><span id="title"><a href="../index.html">Blockly</a> : Labirynt</span> &nbsp; ';
  for (var i118 = 1; i118 < 11; i118++) {
    output += ' ' + ((i118 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i118) + '</span>' : (i118 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i118) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i118) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i118) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i118) + '</a>');
  }
  output += '</h1></td></tr><tr><td width="400" valign="top"><div style="position: relative"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Program jest ciągiem poleceń. Ustaw kilka poleceń \'idź naprzód\' jedno po drugi abym doszedł do celu.';
      break;
    case 2:
      output += 'Jaki jest ciąg poleceń abym przeszedł tą drogą?';
      break;
    case 3:
      output += 'Komputery mają ograniczoną pamięć. Dojdź do końca drogi używając 2 poleceń. Użyj \'powtarzaj dopóki nie skończysz\' aby wykonać polecenie więcej niż raz.';
      break;
    case 4:
      output += 'Dojdź do końca używając tylko 5 poleceń.';
      break;
    case 5:
      output += 'Pegman powinien skręcić w lewo jeśli nie może iść naprzód.';
      break;
    case 6:
      output += 'Warunek \'jeśli\' wykona polecenia jeśli jest prawdziwy. Spróbuj skręcić w lewo jeśli droga skręca w lewo.';
      break;
    case 7:
      output += 'Ten labirynt wydaje się bardziej skomplikowany niż poprzedni, ale nie jest.';
      break;
    case 8:
      output += 'Możesz użyć więcej razy warunek \'jeśli\'.';
      break;
    case 9:
      output += 'Warunek jeśli-albo służy do wykonania jednego zestawu poleceń albo drugiego.';
      break;
    case 10:
      output += 'Czy dasz radę przejść ten trudny labirynt? Wypróbnuj metodę trzymania się lewą ręką ściany. Tylko dla zaawansowanych programistów!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="100%"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button title="Zobacz utworzony kod JavaScript." onclick="BlocklyApps.showCode();"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" title="Podziel się swoim programem." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();"><img src="../../media/1x1.gif" class="run icon21"> Uruchom program</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none"><img src="../../media/1x1.gif" class="stop icon21"> Wyczyść</button></td></tr></table></td><td width=5></td><td valign="top"><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></td></tr></table><div id="pegmanMenu"></div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

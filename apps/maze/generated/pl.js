// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">graficzne środowisko programistyczne</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">Zobacz utworzony kod JavaScript.</span><span id="linkTooltip">Podziel się swoim programem.</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Uruchom program</span><span id="resetProgram">Wyczyść</span><span id="dialogOk">OK</span><span id="dialogCancel">Cancel</span><span id="catLogic">Logic</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Procedures</span><span id="httpRequestError">Wystąpił problem z przesłaniem żądania.</span><span id="linkAlert">Udostępnij link ze swoimi poleceniami:\n\n%1</span><span id="hashError">Przepraszamy, \'%1\' jest nieodpowiedni do zapisanych plików Blockly.</span><span id="xmlError">Nie można wgrać pliku.  Może plik został zapisany w innej wersji Blockly?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<style type="text/css">#dialog {visibility: hidden; background-color: #fff; color: #000; border: 1px solid #000; position: absolute; border-radius: 8px; box-shadow: 5px 5px 5px #888; padding: 10px;}#dialogBorder {visibility: hidden; position: absolute; background-color: #fff; color: #000; border: 1px solid #000; border-radius: 8px; box-shadow: 5px 5px 5px #888;}#dialogShadow {visibility: hidden; position: fixed; top: 0; left: 0; height: 100%; width: 100%; background-color: #000; opacity: 0.3}.dialogAnimate {transition-property: width height left top opacity; transition-duration: 0.2s; transition-timing-function: linear;}.dialogHiddenContent {visibility: hidden; position: absolute; top: 0; left: 0; z-index: -1;}#dialog button {min-width: 4em;}</style><div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">idź naprzód</span><span id="Maze_turnLeft">skręć w lewo</span><span id="Maze_turnRight">skręć w prawo</span><span id="Maze_doCode">wykonaj</span><span id="Maze_elseCode">albo</span><span id="Maze_pathAhead">jeśli droga prowadzi prosto</span><span id="Maze_pathLeft">jeśli droga skręca w lewo</span><span id="Maze_pathRight">jeśli droga skręca w prawo</span><span id="Maze_repeatUntil">powtarzaj dopóki nie</span><span id="Maze_moveForwardTooltip">Przesuwa Pegman-a prosto o jedno pole.</span><span id="Maze_turnTooltip">Obraca Pegman-a w lewo lub prawo o 90 stopni.</span><span id="Maze_ifTooltip">Jeśli droga prowadzi we wskazanym kierunku, \\nwykonaj polecenia. </span><span id="Maze_ifelseTooltip">Jeśli droga prowadzi we wskazanym kierunku, \\nwykonaj pierwszy zestaw poleceń. \\nW przeciwnym razie, wykonaj drugi zestaw \\npoleceń. </span><span id="Maze_whileTooltip">Wykonuj zestaw poleceń dopóki nie osiągniesz \\npunktu końcowego. </span><span id="Maze_capacity0">Pozostało 0 poleceń.</span><span id="Maze_capacity1">Wykorzystano 1 polecenie.</span><span id="Maze_capacity2">Wykorzystano %1 poleceń.</span><span id="Maze_nextLevel">Gratulacje! Czy chcesz przejść na poziom %1?</span><span id="Maze_finalLevel">Gratulacje! Ostatni poziom został rozwiązany.</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Labirynt</span> &nbsp; ';
  for (var i186 = 1; i186 < 11; i186++) {
    output += ' ' + ((i186 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i186) + '</span>' : (i186 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i186) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i186) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i186) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i186) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
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
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="Zobacz utworzony kod JavaScript." onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" class="notext" title="Podziel się swoim programem." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();" title="Makes the character do what the blocks say."><img src="../../media/1x1.gif" class="run icon21"> Uruchom program</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none" title="Put the character back at the start of the maze."><img src="../../media/1x1.gif" class="stop icon21"> Wyczyść</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + '<div id="dialogDone" class="dialogHiddenContent"><div id="dialogDoneText" style="font-size: large"></div><img src="../../media/1x1.gif" id="pegSpin"><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>Na tym poziomie, ustaw wszystkie polecania na białym polu.</div><iframe id="iframeOneTopBlock" src=""></iframe>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

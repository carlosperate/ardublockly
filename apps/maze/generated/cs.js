// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="subtitle">a visual programming environment</span><span id="linkButton">Ulož a spoj bloky..</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Spusť program</span><span id="resetProgram">Reset</span><span id="codeTooltip">Zobraz generovaný JavaScriptový kód.</span><span id="catLogic">Logic</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Procedures</span><span id="httpRequestError">There was a problem with the request.</span><span id="blocklyMessage">Blockly</span><span id="linkAlert">Sdílej bloky tímto odkazem: %1</span><span id="hashError">Omlouváme se, \'%1\' nesouhlasí s žádným z uložených souborů.</span><span id="xmlError">Nepodařilo se uložit vás soubor.  Pravděpodobně byl vytvořen jinou verzí Blockly?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<style type="text/css">#dialog {visibility: hidden; background-color: #fff; color: #000; border: 1px solid #000; position: absolute; border-radius: 8px; box-shadow: 5px 5px 5px #888; padding: 10px;}#dialogBorder {visibility: hidden; position: absolute; background-color: #fff; color: #000; border: 1px solid #000; border-radius: 8px; box-shadow: 5px 5px 5px #888;}#dialogShadow {visibility: hidden; position: absolute; top: 0; left: 0; height: 100%; width: 100%; background-color: #000; opacity: 0.3}.dialogAnimate {transition-property: width height left top opacity; transition-duration: 0.2s;}.dialogHiddenContent {visibility: hidden; position: absolute; top: 0; left: 0; z-index: -1;}</style><div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="httpRequestError">There was a problem with the request.</span><span id="linkAlert">Sdílej bloky tímto odkazem: %1</span><span id="hashError">Omlouváme se, \'%1\' nesouhlasí s žádným z uložených souborů.</span><span id="xmlError">Nepodařilo se uložit vás soubor.  Pravděpodobně byl vytvořen jinou verzí Blockly?</span><span id="moveForward">pohyb vpřed</span><span id="turnLeft">otočit levá</span><span id="turnRight">otočit pravá</span><span id="doCode">udělej</span><span id="elseCode">jinak</span><span id="pathAhead">pokud cesta vpřed</span><span id="pathLeft">pokud cesta doleva</span><span id="pathRight">pokud cesta doprava</span><span id="repeatUntil">opakuj až do</span><span id="moveForwardTooltip">Pohne Pegmanem vpřed o jedno pole.</span><span id="turnTooltip">Otočí Pegmana vlevo nebo vpravo o 90 stupňů.</span><span id="ifTooltip">Pokud je v daném směru cesta, pak proveď nějakou \\nakci. </span><span id="ifelseTooltip">Pokud je v danném směru cesta, \\npak proveď posloupnost akcí. V \\nopačném případě proveď druhou \\nposloupnost akcí. </span><span id="whileTooltip">Opakuj obsažené akce do té doby, \\ndokud není dosažen cílový bod. </span><span id="capacity0">Počet zbývajících bloků 0.</span><span id="capacity1">Počet zbývajících bloků 1.</span><span id="capacity2">Počet zbývajících bloků %1.</span><span id="nextLevel">Blahopřejeme! Jsi připraven vstoupit do levelu %1?</span><span id="finalLevel">Blahopřejeme! Vyřešil jsi poslední level.</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Bludiště</span> &nbsp; ';
  for (var i191 = 1; i191 < 11; i191++) {
    output += ' ' + ((i191 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i191) + '</span>' : (i191 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i191) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i191) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i191) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i191) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Program je posloupnost příkazů. Poskládej několik pohybů vpřed dohromady a pomoc mi dosáhnout cíle.';
      break;
    case 2:
      output += 'Jaká je posloupnost kroků pro následování této cesty?';
      break;
    case 3:
      output += 'Počítače mají omezenou paměť. Dosáhni cíle s použitím pouze dvou bloků. Použij příkaz \'opakuj\' pro zopakování příkazu.';
      break;
    case 4:
      output += 'Dosáhni cíle s použitím peti bloků.';
      break;
    case 5:
      output += 'Pegman se bude muset otočit vlevo, pokud nebude moci jít rovně.';
      break;
    case 6:
      output += 'Podmínka \'pokud\' udělá něco pouze v případě, že je splněna její podmínka. Zkus se otočit vlevo, pokud je nalevo cesta.';
      break;
    case 7:
      output += 'Toto bludiště na první pohled vypadá komplikovaněji než to předchozí, ale není.';
      break;
    case 8:
      output += 'Můžeš použít více něž jeden výraz \'pokud\'.';
      break;
    case 9:
      output += 'Příkaz \'pokud-jinak\' provede buď něco, nebo něco jiného.';
      break;
    case 10:
      output += 'Dokážeš vyřešit toto komplikované bludiště? Zkus se přidržovat zdi po levé ruce.';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="Zobraz generovaný JavaScriptový kód." onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button class="notext" id="linkButton" title="Ulož a spoj bloky.." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();" title="Makes the character do what the blocks say."><img src="../../media/1x1.gif" class="run icon21"> Spusť program</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none" title=Put the character back at the start of the maze.><img src="../../media/1x1.gif" class="stop icon21"> Reset</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>V tomto levelu musíš posbírat všechny bloky na bílém pozadí.</div>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

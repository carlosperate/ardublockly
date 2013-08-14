// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="subtitle">un entorn visual de programació</span><span id="linkButton">Desa i enllaça als blocs.</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Executa el programa</span><span id="resetProgram">Reinicialitza</span><span id="codeTooltip">Veure el codi JavaScript generat.</span><span id="catLogic">Logic</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Procedures</span><span id="httpRequestError">Hi ha hagut un problema amb la sol·licitud.</span><span id="blocklyMessage">Blockly</span><span id="linkAlert">Comparteix els teus blocs amb aquest enllaç: %1</span><span id="hashError">Ho sentim, \'%1\' no es correspon amb cap fitxer desat de Blockly.</span><span id="xmlError">No s\'ha pogut carregar el teu fitxer desat.  Potser va ser creat amb una versió diferent de Blockly?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<style type="text/css">#dialog {visibility: hidden; background-color: #fff; color: #000; border: 1px solid #000; position: absolute; border-radius: 8px; box-shadow: 5px 5px 5px #888; padding: 10px;}#dialogBorder {visibility: hidden; position: absolute; background-color: #fff; color: #000; border: 1px solid #000; border-radius: 8px; box-shadow: 5px 5px 5px #888;}#dialogShadow {visibility: hidden; position: absolute; top: 0; left: 0; height: 100%; width: 100%; background-color: #000; opacity: 0.3}.dialogAnimate {transition-property: width height left top opacity; transition-duration: 0.2s; transition-timing-function: linear;}.dialogHiddenContent {visibility: hidden; position: absolute; top: 0; left: 0; z-index: -1;}</style><div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button onclick="BlocklyApps.hideDialog(true)">D\'acord</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">mou endavant</span><span id="Maze_turnLeft">gira esquerra</span><span id="Maze_turnRight">gira dreta</span><span id="Maze_doCode">fes</span><span id="Maze_elseCode">si no</span><span id="Maze_pathAhead">al davant</span><span id="Maze_pathLeft">si camí a l\'esquerra</span><span id="Maze_pathRight">si camí a la dreta</span><span id="Maze_repeatUntil">repeteix fins al</span><span id="Maze_moveForwardTooltip">Mou el Pegman endavant un espai.</span><span id="Maze_turnTooltip">Gira el Pegman a l\'esquerra o a la dreta 90 graus.</span><span id="Maze_ifTooltip">Si hi ha un camí en la direcció especificada, \\nllavors fes algunes accions. </span><span id="Maze_ifelseTooltip">Si hi ha un camí en la direcció especificada, \\nllavors fes el primer bloc d\'accions. \\nSi no, fes el segon bloc d\'accions. </span><span id="Maze_whileTooltip">Repeteix les accions de dins del bloc fins \\narribar al punt final. </span><span id="Maze_capacity0">Et resten 0 blocs.</span><span id="Maze_capacity1">Et resten 1 blocs.</span><span id="Maze_capacity2">Et resten %1 blocs.</span><span id="Maze_nextLevel">Felicitats! Estàs preparat per a procedir amb el nivell %1?</span><span id="Maze_finalLevel">Felicitats! Has resolt el nivell final.</span><span id="Maze_oneTopBlock">En aquest nivell, has d\'apilar junts tots els blocs a l\'espai de treball blanc.</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Laberint</span> &nbsp; ';
  for (var i183 = 1; i183 < 11; i183++) {
    output += ' ' + ((i183 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i183) + '</span>' : (i183 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i183) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i183) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i183) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i183) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Un programa és una seqüència de declaracions. Apila un parell de blocs \'mou endavant\' junts per ajudar-me a arribar a la meta.';
      break;
    case 2:
      output += 'Quina és la seqüència de passos per a seguir aquest camí?';
      break;
    case 3:
      output += 'Els ordinadors tenen una memòria limitada. Arriba al final d\'aquest camí utilitzant només dos blocs. Utilitza \'repeteix\' per a executar un bloc més d\'una vegada.';
      break;
    case 4:
      output += 'Arriba a la meta utilitzant només cinc blocs.';
      break;
    case 5:
      output += 'Pegman haurà de girar a l\'esquerra quan no pugui continuar endavant.';
      break;
    case 6:
      output += 'Una condició \'si\' farà fer alguna cosa només si la condició és certa. Prova de girar a l\'esquerra si hi ha un camí a l\'esquerra.';
      break;
    case 7:
      output += 'Aquest laberint sembla més complicat que l\'anterior, però no ho és!.';
      break;
    case 8:
      output += 'Pots utilitzar més d\'una declaració \'si\'.';
      break;
    case 9:
      output += 'Les declaracions \'si-si no\' faran fer una cosa o una altra.';
      break;
    case 10:
      output += 'Pots resoldre aquest complicat laberint? Prova de seguir la paret de l\'esquerra. Només programadors avançats!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="Veure el codi JavaScript generat." onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button class="notext" id="linkButton" title="Desa i enllaça als blocs." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();" title="Makes the character do what the blocks say."><img src="../../media/1x1.gif" class="run icon21"> Executa el programa</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none" title="Put the character back at the start of the maze."><img src="../../media/1x1.gif" class="stop icon21"> Reinicialitza</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>En aquest nivell, has d\'apilar junts tots els blocs a l\'espai de treball blanc.</div><iframe id="iframeOneTopBlock" src=""></iframe>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

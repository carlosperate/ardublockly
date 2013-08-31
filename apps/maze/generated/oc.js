// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">un environament de programacion visual</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">Veire lo còde JavaScript generat.</span><span id="linkTooltip">Salva e liga als blòts.</span><span id="runTooltip">Aviar lo programa definit pels blòts dins \\nl’espaci de trabalh. </span><span id="runProgram">Executa lo programa</span><span id="resetProgram">Reïnicializar</span><span id="dialogOk">D\'acòrdi</span><span id="dialogCancel">Cancel</span><span id="catLogic">Logic</span><span id="catLoops">Boclas</span><span id="catMath">Math</span><span id="catText">Tèxte</span><span id="catLists">Listas</span><span id="catColour">Color</span><span id="catVariables">Variablas</span><span id="catProcedures">Proceduras</span><span id="httpRequestError">I a agut un problèma amb la demanda.</span><span id="linkAlert">Partejatz vòstres blòts gràcia a aqueste ligam :\n\n%1</span><span id="hashError">O planhèm, \'%1\' correspond pas a un fichièr Blockly salvament.</span><span id="xmlError">Impossible de cargar lo fichièr de salvament.  Benlèu qu\'es estat creat amb una autra version de Blockly ?</span><span id="listVariable">lista</span><span id="textVariable">tèxte</span></div>';
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
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">D\'acòrdi</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">avança</span><span id="Maze_turnLeft">vira a esquèrra</span><span id="Maze_turnRight">vira a drecha</span><span id="Maze_doCode">far</span><span id="Maze_elseCode">siquenon</span><span id="Maze_pathAhead">se camin davant</span><span id="Maze_pathLeft">se camin cap a esquèrra</span><span id="Maze_pathRight">se camin cap a drecha</span><span id="Maze_repeatUntil">repetís fins a</span><span id="Maze_moveForwardTooltip">Fa avançar sénher Pegman en avant d\'un espaci.</span><span id="Maze_turnTooltip">Fa virar sénher Pegman a esquèrra o a drecha de \\n90 grases. </span><span id="Maze_ifTooltip">Se i a un camin dins la direccion especificada, \\nalara efectua aquelas accions. </span><span id="Maze_ifelseTooltip">Se i a un camin dins la direccion especificada, \\nalara fasètz lo premièr blòt d\'accions. \\nSiquenon fasètz lo segond blòt d\'accions. </span><span id="Maze_whileTooltip">Repetíse los blòts que son a l\'interior fins a \\naténher la tòca. </span><span id="Maze_capacity0">Te demòra %0 blòt.</span><span id="Maze_capacity1">Te demòra %1 blòt.</span><span id="Maze_capacity2">Te demòran %2 blòts.</span><span id="Maze_nextLevel">Òsca ! Sètz prèst pel nivèl %1?</span><span id="Maze_finalLevel">Òsca ! As acabat lo darrièr nivèl.</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Laberint</span> &nbsp; ';
  for (var i158 = 1; i158 < 11; i158++) {
    output += ' ' + ((i158 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i158) + '</span>' : (i158 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i158) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i158) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i158) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i158) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Un programa es una sequéncia d\'instruccions. Empila de blòts d\'instruccions \'avança\' per m\'ajudar a aténher ma tòca.';
      break;
    case 2:
      output += 'Quina es la sequéncia de blòts a executar per seguir aqueste camin ?';
      break;
    case 3:
      output += 'Los ordenadors an pas gaire de memòria. Utilizatz solament dos blòts per aténher la tòca. Utilizatz lo blòt \'repetís\' per executar un blòt mai d\'un còp.';
      break;
    case 4:
      output += 'Atenh la tòca en utilizant solament cinc blòts.';
      break;
    case 5:
      output += 'Sénher Pegman aurà de virar a esquèrra quand poirà pas mai avançar tot drech.';
      break;
    case 6:
      output += 'An \'if\' block will do something only if the condition is true.  Try turning left if there is a path to the left.';
      break;
    case 7:
      output += 'This maze looks more complicated than the previous one, but it is not.';
      break;
    case 8:
      output += 'Podètz utilizar mai d\'una sola instruccion \'se\'.';
      break;
    case 9:
      output += 'Un blòt \'Se-Siquenon\' executa una causa o una autra.';
      break;
    case 10:
      output += 'Can you solve this complicated maze?  Try following the left-hand wall.  Advanced programmers only!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="Veire lo còde JavaScript generat." onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" class="notext" title="Salva e liga als blòts." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="primary" onclick="Maze.runButtonClick();" title="Far far al caractèr çò que los blòts dison."><img src="../../media/1x1.gif" class="run icon21"> Executa lo programa</button><button id="resetButton" class="primary" onclick="Maze.resetButtonClick();" style="display: none" title="Remetre lo caractèr al començament del laberint."><img src="../../media/1x1.gif" class="stop icon21"> Reïnicializar</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + '<div id="dialogDone" class="dialogHiddenContent"><div id="dialogDoneText" style="font-size: large; margin: 1em;"></div><img src="../../media/1x1.gif" id="pegSpin"><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>Dins aqueste nivèl, avètz besonh d\'empilar los blòts los uns en dessús dels autres dins la zòna de trabalh blanca.</div><iframe id="iframeOneTopBlock" src=""></iframe>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">a visual programming environment</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">Veja o código JavaScript gerado.</span><span id="linkTooltip">Salva conexão com o blockly.</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Executar programa</span><span id="resetProgram">Reiniciar</span><span id="dialogOk">OK</span><span id="dialogCancel">Cancel</span><span id="catLogic">Logic</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Procedures</span><span id="httpRequestError">Houve um problema com a solicitação.</span><span id="linkAlert">Compartilhe os seus blocos com este link:\n\n%1</span><span id="hashError">Desculpe, \'%1\' não corresponde a um blockly salvo.</span><span id="xmlError">Não foi possível ler o seu arquivo salvo.  Talvez ele tenha sido gerado por uma versão antiga do Blockly?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
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
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">Mover para a frente</span><span id="Maze_turnLeft">gire para a esquerda</span><span id="Maze_turnRight">gire para a direita</span><span id="Maze_doCode">faça</span><span id="Maze_elseCode">senão</span><span id="Maze_pathAhead">se existe um caminho em frente</span><span id="Maze_pathLeft">se existe um caminho para a esquerda</span><span id="Maze_pathRight">se existe um caminho para a direita</span><span id="Maze_repeatUntil">repita até o</span><span id="Maze_moveForwardTooltip">Move o Pegman um quadro para frente.</span><span id="Maze_turnTooltip">Gire o Pegman 90 graus para esquerda ou para a \\ndireita. </span><span id="Maze_ifTooltip">Se existe um caminho na direção especificada, \\nentao executa algumas ações. </span><span id="Maze_ifelseTooltip">Se não existe um caminho na direção \\nespecificada, então execute o primeiro \\nbloco de ações. Senão, execute o \\nsegundo bloco de ações. </span><span id="Maze_whileTooltip">Repita as ações seguintes até que o ponto final \\nseja alcançado. </span><span id="Maze_capacity0">Você tem mais 0 blocos.</span><span id="Maze_capacity1">Você tem mais 1 blocos.</span><span id="Maze_capacity2">Você tem mais %1 blocos.</span><span id="Maze_nextLevel">Parabéns! Você está apto para o nível %1?</span><span id="Maze_finalLevel">Parabéns! Você resolveu o nível final.</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Quebra-cabeça</span> &nbsp; ';
  for (var i186 = 1; i186 < 11; i186++) {
    output += ' ' + ((i186 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i186) + '</span>' : (i186 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i186) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i186) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i186) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i186) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Empilhe alguns blocos \'Mover para a frente\' para ajudar-me a chegar ao destino.';
      break;
    case 2:
      output += 'Qual é a sequência de passos para seguir este caminho?';
      break;
    case 3:
      output += 'Os computadores têm uma memoria limitada. Chegue ao destino usando apenas dois blocos. Utilize o comando \'repita\' para executar um bloco várias vezes.';
      break;
    case 4:
      output += 'Chegue ao destino utilizando apenas cinco blocos.';
      break;
    case 5:
      output += 'Pegman will have to turn left when he cannot go straight.';
      break;
    case 6:
      output += 'A condição \'se\' executa algo apenas se a condição for verdadeira. Tente girar à esquerda se existe um caminho à esquerda';
      break;
    case 7:
      output += 'Este quebra-cabeças parece ser mais complicado que o anterior, mas nao é.';
      break;
    case 8:
      output += 'Você pode utilizar mais de um comando \'se\'.';
      break;
    case 9:
      output += 'O comando \'Se-senão\' faz uma coisa ou outra.';
      break;
    case 10:
      output += 'Você consegue resolver este quebra cabeças complexo. Tente seguir o muro do lado esquerdo. Para programadores avançados apenas!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="Veja o código JavaScript gerado." onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" class="notext" title="Salva conexão com o blockly." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="primary" onclick="Maze.runButtonClick();" title="Makes the player do what the blocks say."><img src="../../media/1x1.gif" class="run icon21"> Executar programa</button><button id="resetButton" class="primary" onclick="Maze.resetButtonClick();" style="display: none" title="Put the player back at the start of the maze."><img src="../../media/1x1.gif" class="stop icon21"> Reiniciar</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + '<div id="dialogDone" class="dialogHiddenContent"><div id="dialogDoneText" style="font-size: large; margin: 1em;"></div><img src="../../media/1x1.gif" id="pegSpin"><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>Neste nível, você precisa empilhar todos os blocos nos espaços em branco.</div><iframe id="iframeOneTopBlock" src=""></iframe>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

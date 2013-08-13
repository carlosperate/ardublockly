// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="subtitle">un entorno de programación visual</span><span id="linkButton">Guarda conexión a los bloques. </span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Ejecuta el programa.</span><span id="resetProgram">Reinicializar</span><span id="codeTooltip">Mira el código JavaScript generado.</span><span id="catLogic">Logic</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Procedures</span><span id="httpRequestError">Hubo un problema con la petición.</span><span id="blocklyMessage">Blockly</span><span id="linkAlert">Comparte tus bloques con esta conexión:\n\n%1</span><span id="hashError">Lo siento, \'%1\' no corresponde con ningún archivo Blockly guardado.</span><span id="xmlError">No se pudo cargar el archivo guardado.  ¿Quizá fue creado con otra versión de Blockly?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<style type="text/css">#dialog {visibility: hidden; background-color: #fff; color: #000; border: 1px solid #000; position: absolute; border-radius: 8px; box-shadow: 5px 5px 5px #888; padding: 10px;}#dialogBorder {visibility: hidden; position: absolute; background-color: #fff; color: #000; border: 1px solid #000; border-radius: 8px; box-shadow: 5px 5px 5px #888;}#dialogShadow {visibility: hidden; position: absolute; top: 0; left: 0; height: 100%; width: 100%; background-color: #000; opacity: 0.3}.dialogAnimate {transition-property: width height left top opacity; transition-duration: 0.2s;}.dialogHiddenContent {visibility: hidden; position: absolute; top: 0; left: 0; z-index: -1;}</style><div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button onclick="BlocklyApps.hideDialog(true)">Aceptar</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="httpRequestError">Hubo un problema con la petición.</span><span id="linkAlert">Comparte tus bloques con esta conexión:\n\n%1</span><span id="hashError">Lo siento, \'%1\' no corresponde con ningún archivo Blockly guardado.</span><span id="xmlError">No se pudo cargar el archivo guardado.  ¿Quizá fue creado con otra versión de Blockly?</span><span id="moveForward">Mover hacia delante</span><span id="turnLeft">gira izquierda</span><span id="turnRight">gira derecha</span><span id="doCode">haz esto</span><span id="elseCode">sino</span><span id="pathAhead">si hay camino enfrente</span><span id="pathLeft">si hay camino a la izquierda</span><span id="pathRight">si hay camino a la derecha</span><span id="repeatUntil">repite hasta</span><span id="moveForwardTooltip">Mueve a Pegman un cuadro hacia delante.</span><span id="turnTooltip">Gira a Pegman a izquierda o derecha 90 grados.</span><span id="ifTooltip">Si hay un camino en la dirección especificada, \\nentonces ejecuta unas acciones. </span><span id="ifelseTooltip">Si hay un camino en la dirección especificada, \\nentonces ejecuta las primeras acciones. \\nSino, haz el segundo conjunto de acciones. </span><span id="whileTooltip">Repite las acciones encapsuladas hasta terminar.</span><span id="capacity0">Te quedan 0 bloques.</span><span id="capacity1">Te quedan 1 bloque.</span><span id="capacity2">Te quedan %1 bloques.</span><span id="nextLevel">¡Felicidades! ¿Estas listo/a para seguir al siguiente nivel %1?</span><span id="finalLevel">¡Felicidades! Haz resuelto el último nivel.</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Laberinto</span> &nbsp; ';
  for (var i191 = 1; i191 < 11; i191++) {
    output += ' ' + ((i191 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i191) + '</span>' : (i191 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i191) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i191) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i191) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i191) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Un programa es una secuencia de declaraciones. Une un par de bloques de ‘avanza’ para ayudarme a llegar a la meta.';
      break;
    case 2:
      output += '¿Cuál es la secuencia de pasos para seguir este camino?';
      break;
    case 3:
      output += 'Las computadoras tienen memoria limitada. Llega al final de este camino usando tan sólo dos bloques. Utiliza \'repetir\' para ejecutar un bloque más de una vez.';
      break;
    case 4:
      output += 'Llega a la meta con tan sólo cinco bloques.';
      break;
    case 5:
      output += 'Pegman tiene que girar a la izquierda cuando no pueda ir recto.';
      break;
    case 6:
      output += 'Una condición \'si\' va hacer algo solamente si la condición es verdadera. Intenta girar a la izquierda si hay camino a la izquierda.';
      break;
    case 7:
      output += 'Este laberinto parece más complicado que el anterior, pero no lo es.';
      break;
    case 8:
      output += 'Puedes usar más de una declaración \'si\'.';
      break;
    case 9:
      output += 'Las declaraciones \'si-sino\' hacen una cosa u otra.';
      break;
    case 10:
      output += '¿Puedes resolver este complicado laberinto? Intenta seguir la pared de la izquierda.';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="Mira el código JavaScript generado." onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button class="notext" id="linkButton" title="Guarda conexión a los bloques. " onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();" title="Makes the character do what the blocks say."><img src="../../media/1x1.gif" class="run icon21"> Ejecuta el programa.</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none" title=Put the character back at the start of the maze.><img src="../../media/1x1.gif" class="stop icon21"> Reinicializar</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>En este nivel, necesitas apilar los bloques en el espacio en blanco.</div><iframe id="iframeOneTopBlock" src=""></iframe>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

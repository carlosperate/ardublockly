// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="MSG" style="display: none"><span id="moveForward">Mover hacia delante</span><span id="turnLeft">gira izquierda</span><span id="turnRight">gira derecha</span><span id="doCode">haz esto</span><span id="elseCode">sino</span><span id="pathAhead">si hay camino enfrente</span><span id="pathLeft">si hay camino a la izquierda</span><span id="pathRight">si hay camino a la derecha</span><span id="repeatUntil">repite hasta</span><span id="moveForwardTooltip">Mueve a Pegman un cuadro hacia delante.</span><span id="turnTooltip">Gira a Pegman a izquierda o derecha 90 grados.</span><span id="ifTooltip">Si hay un camino en la dirección especificada, \\nentonces ejecuta unas acciones. </span><span id="ifelseTooltip">Si hay un camino en la dirección especificada, \\nentonces ejecuta las primeras acciones. \\nSino, haz el segundo conjunto de acciones. </span><span id="whileTooltip">Repite las acciones encapsuladas hasta terminar.</span><span id="capacity0">Te quedan 0 bloques.</span><span id="capacity1">Te quedan 1 bloque.</span><span id="capacity2">Te quedan %1 bloques.</span><span id="nextLevel">¡Felicidades! ¿Estas listo/a para seguir al siguiente nivel %1?</span><span id="finalLevel">¡Felicidades! Haz resuelto el último nivel.</span><span id="oneTopBlock">En este nivel, necesitas apilar los bloques en el espacio en blanco.</span></div><div id="COMMON_MSG" style="display: none"><span id="httpRequestError">Hubo un problema con la petición.</span><span id="linkAlert">Comparte tus bloques con esta conexión:\n\n%1</span><span id="hashError">Lo siento, \'%1\' no corresponde con ningún archivo Blockly guardado.</span><span id="xmlError">No se pudo cargar el archivo guardado.  ¿Quizá fue creado con otra versión de Blockly?</span></div><table width="100%" height="100%"><tr height="50"><td colspan=3><div style="display: none;"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></div><h1><span id="title"><a href="../index.html">Blockly</a> : Laberinto</span> &nbsp; ';
  for (var i118 = 1; i118 < 11; i118++) {
    output += ' ' + ((i118 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i118) + '</span>' : (i118 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i118) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i118) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i118) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i118) + '</a>');
  }
  output += '</h1></td></tr><tr><td width="400" valign="top"><div style="position: relative"><div id="hintBubble"><div id="hint">';
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
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="100%"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button title="Mira el código JavaScript generado." onclick="BlocklyApps.showCode();"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" title="Guarda conexión a los bloques. " onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();"><img src="../../media/1x1.gif" class="run icon21"> Ejecuta el programa.</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none"><img src="../../media/1x1.gif" class="stop icon21"> Reinicializar</button></td></tr></table></td><td width=5></td><td valign="top"><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></td></tr></table><div id="pegmanMenu"></div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

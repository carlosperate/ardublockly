// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="MSG" style="display: none"><span id="moveForward">mou endavant</span><span id="turnLeft">gira esquerra</span><span id="turnRight">gira dreta</span><span id="doCode">fes</span><span id="elseCode">si no</span><span id="pathAhead">al davant</span><span id="pathLeft">si camí a l\'esquerra</span><span id="pathRight">si camí a la dreta</span><span id="repeatUntil">repeteix fins al</span><span id="moveForwardTooltip">Mou el Pegman endavant un espai.</span><span id="turnTooltip">Gira el Pegman a l\'esquerra o a la dreta 90 graus.</span><span id="ifTooltip">Si hi ha un camí en la direcció especificada, \\nllavors fes algunes accions. </span><span id="ifelseTooltip">Si hi ha un camí en la direcció especificada, \\nllavors fes el primer bloc d\'accions. \\nSi no, fes el segon bloc d\'accions. </span><span id="whileTooltip">Repeteix les accions de dins del bloc fins \\narribar al punt final. </span><span id="capacity0">Et resten 0 blocs.</span><span id="capacity1">Et resten 1 blocs.</span><span id="capacity2">Et resten %1 blocs.</span><span id="nextLevel">Felicitats! Estàs preparat per a procedir amb el nivell %1?</span><span id="finalLevel">Felicitats! Has resolt el nivell final.</span><span id="oneTopBlock">En aquest nivell, has d\'apilar junts tots els blocs a l\'espai de treball blanc.</span></div><table width="100%" height="100%"><tr height="50"><td colspan=3><div style="display: none;" id="farSide"><select id="languageMenu" onchange="Maze.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></div><h1><span id="title"><a href="../index.html"><span id="blocklyName">Blockly</span></a> : Laberint</span> &nbsp; ';
  for (var i103 = 1; i103 < 11; i103++) {
    output += ' ' + ((i103 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i103) + '</span>' : (i103 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i103) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i103) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i103) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i103) + '</a>');
  }
  output += '</h1></td></tr><tr><td width="400" valign="top"><div style="position: relative"><div id="hintBubble"><div id="hint">';
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
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="100%"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button title="Veure el codi JavaScript generat." onclick="BlocklyApps.showCode();"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" title="Desa i enllaça als blocs." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();"><img src="../../media/1x1.gif" class="run icon21"> Executa el programa</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none"><img src="../../media/1x1.gif" class="stop icon21"> Reinicialitza</button></td></tr></table></td><td width=5></td><td valign="top"><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></td></tr></table><div id="pegmanMenu"></div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

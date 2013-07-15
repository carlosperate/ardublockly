// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="MSG" style="display: none"><span id="moveForward">avance</span><span id="turnLeft">tourne à gauche</span><span id="turnRight">tourne à droite</span><span id="doCode">faire</span><span id="elseCode">sinon</span><span id="pathAhead">si chemin devant</span><span id="pathLeft">si chemin vers la gauche</span><span id="pathRight">si chem vers la droite</span><span id="repeatUntil">répète jusqu\'a</span><span id="moveForwardTooltip">Fais avancer monsieur Pegman en avant d\'un espace.</span><span id="turnTooltip">Fais tourner monsieur Pegman à gauche ou à \\ndroite de 90 degrés. </span><span id="ifTooltip">Si il y\'a un chemin dans la direction specifiée, \\nalors effectue ces actions. </span><span id="ifelseTooltip">Si il y\'a un chemin dans la direction specifiée, \\nalors fais le premier bloc d\'actions. \\nSinon fais le second bloc d\'actions. </span><span id="whileTooltip">Répète les blocs qui sont à l\'intérieur jusqu\'à \\natteindre le but. </span><span id="capacity0">Il te reste 0 blocs.</span><span id="capacity1">Il te reste 1 bloc.</span><span id="capacity2">Il te reste %1 blocs.</span><span id="nextLevel">Bravo ! Est tu prêt pour le niveau %1?</span><span id="finalLevel">Bravo ! Tu as fini le dernier niveau.</span><span id="oneTopBlock">Dans ce niveau, tu as besoin d\'empiler les blocs les uns au dessus des autres dans la zone de travail blanche.</span></div><table width="100%" height="100%"><tr height="50"><td colspan=3><div style="display: none;" id="farSide"><select id="languageMenu" onchange="Maze.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></div><h1><span id="title"><a href="../index.html"><span id="blocklyName">Blockly</span></a> : Labyrinthe Blocky</span> &nbsp; ';
  for (var i103 = 1; i103 < 11; i103++) {
    output += ' ' + ((i103 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i103) + '</span>' : (i103 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i103) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i103) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i103) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i103) + '</a>');
  }
  output += '</h1></td></tr><tr><td width="400" valign="top"><div style="position: relative"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Un programme est une séquence d\'instructions. Empile des blocs d\'instructions \'avance\' pour m\'aider à atteindre mon but.';
      break;
    case 2:
      output += 'Qu\'elle est la séquence de blocs à exécuter pour suivre ce chemin ?';
      break;
    case 3:
      output += 'Les ordinateurs n\'ont pas beaucoup de mémoire. Utilise seulement deux blocs pour atteindre le but. Utilise le bloc \'repète\' pour exécuter un bloc plus d\'une fois.';
      break;
    case 4:
      output += 'Atteint le but en utilisant seulement cinq blocs.';
      break;
    case 5:
      output += 'Monsieur Pegman devra tourner à gauche quand il ne pourra plus avancer tout droit.';
      break;
    case 6:
      output += 'Un bloc \'si\' va exécuter ce qu\'il y a dedans seulement si la condition est vraie. Essaie de tourner à gauche si il y a un chemin sur la gauche.';
      break;
    case 7:
      output += 'Ce labyrinthe a l\'air plus compliqué que le précédent, mais il ne l\'est pas.';
      break;
    case 8:
      output += 'Tu peux utiliser plus d\'une seule instruction \'si\'.';
      break;
    case 9:
      output += 'Un bloc \'Si-Sinon\' exécute une chose ou une autre.';
      break;
    case 10:
      output += 'Peux tu résoudre ce labyrinthe plus difficile? Essaie de suivre le mur du côté de ta main gauche.';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="100%"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button title="Voir le code JavaScript généré\'." onclick="BlocklyApps.showCode();"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" title="Sauvegarde et lies aux blocs." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();"><img src="../../media/1x1.gif" class="run icon21"> Execute le programme</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none"><img src="../../media/1x1.gif" class="stop icon21"> Reset</button></td></tr></table></td><td width=5></td><td valign="top"><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></td></tr></table><div id="pegmanMenu"></div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

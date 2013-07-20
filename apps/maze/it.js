// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="MSG" style="display: none"><span id="moveForward">avanza diritto</span><span id="turnLeft">svolta a sinistra</span><span id="turnRight">svolta a destra</span><span id="doCode">fa\'</span><span id="elseCode">altrimenti</span><span id="pathAhead">se c\'è strada avanti</span><span id="pathLeft">se c\'è strada a sinistra</span><span id="pathRight">se c\'è strada a destra</span><span id="repeatUntil">ripeti sino alla</span><span id="moveForwardTooltip">Avanza la pedina di una casella.</span><span id="turnTooltip">Gira la pedina verso destra o sinistra di 90 gradi.</span><span id="ifTooltip">Se c\'è strada nella direzione indicata, \\nallora fa\' qualcosa. </span><span id="ifelseTooltip">Se c\'è strada nella direzione indicata, \\nAllora esegui la prima serie di azioni. \\nAltrimenti esegui la seconda serie di \\nazioni. </span><span id="whileTooltip">Ripeti l\'azione scelta sino al punto di arrivo.</span><span id="capacity0">Puoi usare altri 0 blocchi.</span><span id="capacity1">Puoi usare altri 1 blocchi.</span><span id="capacity2">Puoi usare altri %1 blocchi.</span><span id="nextLevel">Gaudio! Sei pronto a passare al livello %1?</span><span id="finalLevel">Tripudio! Hai risolto l\'ultimo livello.</span><span id="oneTopBlock">In questo livello dovrai impilare tutti i blocchi nella zona bianca.</span></div><div id="COMMON_MSG" style="display: none"><span id="httpRequestError">La richiesta non è stata soddisfatta.</span><span id="linkAlert">Condividi i tuoi blocchi con questo indirizzo:\n\n%1</span><span id="hashError">Mi spiace, \'%1\' non corrisponde con nessun documento di saved Blockly salvato.</span><span id="xmlError">Non è stato possibile caricare il documento.  Forse è stato creato con una versione diversa di Blockly?</span></div><table width="100%" height="100%"><tr height="50"><td colspan=3><div style="display: none;"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></div><h1><span id="title"><a href="../index.html">Blockly</a> : Labirinto</span> &nbsp; ';
  for (var i118 = 1; i118 < 11; i118++) {
    output += ' ' + ((i118 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i118) + '</span>' : (i118 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i118) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i118) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i118) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i118) + '</a>');
  }
  output += '</h1></td></tr><tr><td width="400" valign="top"><div style="position: relative"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Un programma è una sequenza di istruzioni. Impila un paio di blocchi \'avanza diritto\' per aiutarmi a raggiungere l\'arrivo.';
      break;
    case 2:
      output += 'Che passi sono necessari per seguire questa strada?';
      break;
    case 3:
      output += 'I computer hanno una memoria limitata. Raggiungi l\'arrivo usando solo due blocchi. Scegli \'ripeti\' per eseguire un blocco più di una volta.';
      break;
    case 4:
      output += 'Raggiungi l\'obiettivo usando solo cinque blocchi.';
      break;
    case 5:
      output += 'La pedina dovrà girare a sinistra quando non può procedere diritto.';
      break;
    case 6:
      output += 'Con \'se\' l\'azione verrà eseguita solo se la condizione è soddisfatta. Prova a girare a sinistra se c\'è una strada a sinistra.';
      break;
    case 7:
      output += 'Questo labirinto sembra più difficile del precedente, ma non lo è.';
      break;
    case 8:
      output += 'Puoi usare più di una istruzione \'se\'.';
      break;
    case 9:
      output += 'Le istruzioni if-else cercheranno di compiere la prima azione o la seconda.';
      break;
    case 10:
      output += 'Sai risolvere questo labirinto intricato? Prova a seguire il muro di sinistra. Solo per programmatori avanzati!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="100%"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button title="Guarda il codice Javascript generato." onclick="BlocklyApps.showCode();"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" title="Salva e crea un link ai blocchi." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();"><img src="../../media/1x1.gif" class="run icon21"> Esegui il programma</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none"><img src="../../media/1x1.gif" class="stop icon21"> Ricomincia</button></td></tr></table></td><td width=5></td><td valign="top"><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></td></tr></table><div id="pegmanMenu"></div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

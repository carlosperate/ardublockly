// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="subtitle">a visual programming environment</span><span id="linkButton">Salva e crea un link ai blocchi.</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Esegui il programma</span><span id="resetProgram">Ricomincia</span><span id="codeTooltip">Guarda il codice Javascript generato.</span><span id="catLogic">Logic</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Procedures</span><span id="httpRequestError">La richiesta non è stata soddisfatta.</span><span id="blocklyMessage">Blockly</span><span id="linkAlert">Condividi i tuoi blocchi con questo indirizzo:\n\n%1</span><span id="hashError">Mi spiace, \'%1\' non corrisponde con nessun documento di saved Blockly salvato.</span><span id="xmlError">Non è stato possibile caricare il documento.  Forse è stato creato con una versione diversa di Blockly?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
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

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="Puzzle_country1">Australia</span><span id="Puzzle_country1Flag">flag_au.png</span><span id="Puzzle_country1FlagHeight">50</span><span id="Puzzle_country1FlagWidth">100</span><span id="Puzzle_country1Language">Inglese</span><span id="Puzzle_country1City1">Melbourne</span><span id="Puzzle_country1City2">Sydney</span><span id="Puzzle_country1HelpUrl">http://it.wikipedia.org/wiki/Australia</span><span id="Puzzle_country2">Germania</span><span id="Puzzle_country2Flag">flag_de.png</span><span id="Puzzle_country2FlagHeight">60</span><span id="Puzzle_country2FlagWidth">100</span><span id="Puzzle_country2Language">Tedesco</span><span id="Puzzle_country2City1">Berlino</span><span id="Puzzle_country2City2">Monaco di Baviera</span><span id="Puzzle_country2HelpUrl">http://it.wikipedia.org/wiki/Germania</span><span id="Puzzle_country3">Cina</span><span id="Puzzle_country3Flag">flag_cn.png</span><span id="Puzzle_country3FlagHeight">66</span><span id="Puzzle_country3FlagWidth">100</span><span id="Puzzle_country3Language">Cinese</span><span id="Puzzle_country3City1">Pechino</span><span id="Puzzle_country3City2">Shanghai</span><span id="Puzzle_country3HelpUrl">http://it.wikipedia.org/wiki/Cina</span><span id="Puzzle_country4">Brasile</span><span id="Puzzle_country4Flag">flag_br.png</span><span id="Puzzle_country4FlagHeight">70</span><span id="Puzzle_country4FlagWidth">100</span><span id="Puzzle_country4Language">Portoghese</span><span id="Puzzle_country4City1">Rio de Janeiro</span><span id="Puzzle_country4City2">San Paolo</span><span id="Puzzle_country4HelpUrl">http://it.wikipedia.org/wiki/Brasile</span><span id="Puzzle_flag">bandiera:</span><span id="Puzzle_language">lingua:</span><span id="Puzzle_languageChoose">scegli...</span><span id="Puzzle_cities">città:</span><span id="Puzzle_error0">Perfetto!\nTutti i %1 blocchi sono corretti.</span><span id="Puzzle_error1">Quasi! Un blocco non è corretto.</span><span id="Puzzle_error2">%1 blocchi non sono corretti.</span><span id="Puzzle_tryAgain">Il blocco evidenziato non è corretto.\nProva ancora.</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : Puzzle</span></h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp(true);">Aiuto</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">Controlla le risposte</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>' + apps.dialog(null, null, opt_ijData) + '<div id="help" class="dialogHiddenContent"><div style="padding-bottom: 0.7ex">Per ogni paese (verde), attaccaci la sua bandiera, scegli la lingua e fai la lista della sua città.</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe>' + apps.ok(null, null, opt_ijData) + '</div><div id="answers" class="dialogHiddenContent"><div id="answerMessage"></div><div id="graph"><div id="graphValue"></div></div>' + apps.ok(null, null, opt_ijData) + '</div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

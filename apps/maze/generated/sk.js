// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">vizuálne programovacie prostredie</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">Prezrieť vygenerovaný javascriptový kód.</span><span id="linkTooltip">Uložiť a zdieľať odkaz na tento program.</span><span id="runTooltip">Spustiť program, zložený z dielcov na pracovnej \\nploche. </span><span id="runProgram">Spustiť program</span><span id="resetProgram">Odznova</span><span id="dialogOk">OK</span><span id="dialogCancel">Cancel</span><span id="catLogic">Logika</span><span id="catLoops">Cykly</span><span id="catMath">Matematické</span><span id="catText">Text</span><span id="catLists">Zoznamy</span><span id="catColour">Farby</span><span id="catVariables">Premenné</span><span id="catProcedures">Procedúry</span><span id="httpRequestError">Problém so spracovaním požiadavky.</span><span id="linkAlert">Zdieľať tento program skopírovaním odkazu\n\n%1</span><span id="hashError">Prepáč, \'%1\' nie je meno žiadnemu uloženému programu.</span><span id="xmlError">Nebolo možné načítať uložený súbor. Možno bol vytvorený v inej verzii Blocky.</span><span id="listVariable">zoznam</span><span id="textVariable">text</span></div>';
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
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">choď dopredu</span><span id="Maze_turnLeft">otoč sa vľavo</span><span id="Maze_turnRight">otoč sa vpravo</span><span id="Maze_doCode">urob</span><span id="Maze_elseCode">inak</span><span id="Maze_pathAhead">ak je cesta pred</span><span id="Maze_pathLeft">ak je cesta vľavo</span><span id="Maze_pathRight">ak je cesta vpravo</span><span id="Maze_repeatUntil">opakuj až do</span><span id="Maze_moveForwardTooltip">Posun hráča o jednu dĺžku dopredu.</span><span id="Maze_turnTooltip">Otočiť hráča o 90 stupňov vľavo či vpravo.</span><span id="Maze_ifTooltip">Ak je tým smerom cesta, vykonaj príkazy.</span><span id="Maze_ifelseTooltip">Ak je tým smerom cesta, vykonaj prvý blok príkazov.\\nInak vykonaj druhý blok príkazov.</span><span id="Maze_whileTooltip">Opakuj príkazy vo vnútri až kým neprídeš do cieľa.</span><span id="Maze_capacity0">Zostalo ti <span id=\'capacityNumber\'>0</span> dielcov.</span><span id="Maze_capacity1">Zostalo ti ešte <span id=\'capacityNumber\'>1</span> dielec.</span><span id="Maze_capacity2">Zostalo ti ešte <span id=\'capacityNumber\'>%1</span> dielcov.</span><span id="Maze_nextLevel">Gratulujeme! Priprav sa na na vstup do levelu %2!</span><span id="Maze_finalLevel">Gratulujeme! Posledný level je šťastne vyriešený!</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Bludisko</span> &nbsp; ';
  for (var i194 = 1; i194 < 11; i194++) {
    output += ' ' + ((i194 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i194) + '</span>' : (i194 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i194) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i194) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i194) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i194) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Program je postupnosť dielcov. Spoj dokopy niekoľko dielcov \'pohyb vpred\' a pomôž mi prísť do cieľa.';
      break;
    case 2:
      output += 'Akú postupnosť krokov treba na prejdenie tejto cesty?';
      break;
    case 3:
      output += 'Pamäte v počítačoch nikdy nie je dosť. Dosiahni cieľ len použítím dvoch blokov. Na zopakovanie príkazu použi príkaz \'opakuj\'.';
      break;
    case 4:
      output += 'Dosiahni cieľ len použitím piatich dielcov.';
      break;
    case 5:
      output += 'Ak Pegman nemôže ísť rovno, bude sa musieť otočiť vľavo.';
      break;
    case 6:
      output += 'Dielec \'ak\' urobí niečo len vtedy, ak je splnená podmienka. Skús otočenie vľavo, ak je cesta naľavo.';
      break;
    case 7:
      output += 'Toto bludisko vyzerá síce zložitejšie ako predošlé, ale nie je.';
      break;
    case 8:
      output += 'Môžeš použiť aj viac ako jeden \'ak\'.';
      break;
    case 9:
      output += 'Príkaz ak-tak urobí buď jedno, alebo druhé.';
      break;
    case 10:
      output += 'A zvládneš aj toto komplikované bludisko? Skús ísť popri ľavej stene. Len pre pokročilých programátorov!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="Prezrieť vygenerovaný javascriptový kód." onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" class="notext" title="Uložiť a zdieľať odkaz na tento program." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="primary" onclick="Maze.runButtonClick();" title="Postavička urobí to, čo je napísané na dielci."><img src="../../media/1x1.gif" class="run icon21"> Spustiť program</button><button id="resetButton" class="primary" onclick="Maze.resetButtonClick();" style="display: none" title="Presunúť postavičku späť na začiatok."><img src="../../media/1x1.gif" class="stop icon21"> Odznova</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + '<div id="dialogDone" class="dialogHiddenContent"><div id="dialogDoneText" style="font-size: large; margin: 1em;"></div><img src="../../media/1x1.gif" id="pegSpin"><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>Na tejto úrovni musíš na bielej ploche poskladať všetky diely skladačky.</div><iframe id="iframeOneTopBlock" src=""></iframe>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">een visuele programmeeromgeving</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">Bekijk de gemaakte JavaScriptcode.</span><span id="linkTooltip">Opslaan en koppelen naar blokken.</span><span id="runTooltip">Voer het programma uit dat met de blokken in de \\nwerkruimte is gemaakt. </span><span id="runProgram">Programma uitvoeren</span><span id="resetProgram">Opnieuw instellen</span><span id="dialogOk">OK</span><span id="dialogCancel">Annuleren</span><span id="catLogic">Logica</span><span id="catLoops">Lussen</span><span id="catMath">Formules</span><span id="catText">Tekst</span><span id="catLists">Lijsten</span><span id="catColour">Kleur</span><span id="catVariables">Variabelen</span><span id="catProcedures">Procedures</span><span id="httpRequestError">Er is een probleem opgetreden tijdens het verwerken van het verzoek.</span><span id="linkAlert">Deel uw blokken via deze koppeling:\n\n%1</span><span id="hashError">"%1" komt helaas niet overeen met een opgeslagen bestand.</span><span id="xmlError">Uw opgeslagen bestand kan niet geladen worden. Is het misschien gemaakt met een andere versie van Blockly?</span><span id="listVariable">lijst</span><span id="textVariable">tekst</span></div>';
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
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">ga vooruit</span><span id="Maze_turnLeft">linksaf</span><span id="Maze_turnRight">rechtsaf</span><span id="Maze_doCode">uitvoeren</span><span id="Maze_elseCode">anders</span><span id="Maze_pathAhead">als de weg verder</span><span id="Maze_pathLeft">als pad naar links</span><span id="Maze_pathRight">als pad naar rechts</span><span id="Maze_repeatUntil">herhalen totdat</span><span id="Maze_moveForwardTooltip">Hiermee wordt Pegman één vakje vooruit verplaatst.</span><span id="Maze_turnTooltip">Hiermee draait Pegman 90 graden naar links of \\nnaar rechts. </span><span id="Maze_ifTooltip">Als er een pad in de aangegeven richting is, \\nvoer dan wat handelingen uit. </span><span id="Maze_ifelseTooltip">Als er een pad is in de aangegeven richting, \\nvoer dan het eerste blok van handelingen uit, \\nanders het tweede blok. </span><span id="Maze_whileTooltip">Herhaal de ingesloten handelingen totdat het \\neindpunt is bereikt. </span><span id="Maze_capacity0">U hebt %0 blokken over.</span><span id="Maze_capacity1">U hebt %1 blok over.</span><span id="Maze_capacity2">U hebt %2 blokken over.</span><span id="Maze_nextLevel">Gefeliciteerd! Bent u klaar om verder te gaan naar niveau %1?</span><span id="Maze_finalLevel">Gefeliciteerd! U hebt het laatste niveau opgelost.</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Doolhof</span> &nbsp; ';
  for (var i158 = 1; i158 < 11; i158++) {
    output += ' ' + ((i158 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i158) + '</span>' : (i158 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i158) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i158) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i158) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i158) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Stop een paar \'ga vooruit\' instructies samen en help me op mijn doel te bereiken.';
      break;
    case 2:
      output += 'Wat is de volgorde van stappen om deze weg te volgen?';
      break;
    case 3:
      output += 'Computers hebben een beperkt geheugen. Ga naar het einde van dit pad door maximaal twee blokken te gebruiken. Gebruik "herhalen" om een blok meerdere keren uit te voeren.';
      break;
    case 4:
      output += 'Bereik het einde met maximaal vijf blokken.';
      break;
    case 5:
      output += 'Pegman moet linksaf gaan als hij niet rechtdoor kan.';
      break;
    case 6:
      output += 'Het blok "als" doet alleen iets als de voorwaarde waar is. Probeer naar link te draaien als er een pad naar links is.';
      break;
    case 7:
      output += 'Dit doolhof ziet er ingewikkelder dan het vorige, maar het is niet.';
      break;
    case 8:
      output += 'U kunt meer dan één "als"-blok gebruiken.';
      break;
    case 9:
      output += '"als-dan"-blokken doen het ene of het andere.';
      break;
    case 10:
      output += 'Kunt u dit ingewikkelde doolhof oplossen? Probeer de linkermuur te volgen. Dit is een opdracht voor gevorderde programmeurs!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="Bekijk de gemaakte JavaScriptcode." onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" class="notext" title="Opslaan en koppelen naar blokken." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="primary" onclick="Maze.runButtonClick();" title="Zorgt ervoor dat het karakter doet wat de \\nblokken voorschrijven. "><img src="../../media/1x1.gif" class="run icon21"> Programma uitvoeren</button><button id="resetButton" class="primary" onclick="Maze.resetButtonClick();" style="display: none" title="Zet het karakter terug aan het begin van het \\ndoolhof. "><img src="../../media/1x1.gif" class="stop icon21"> Opnieuw instellen</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + '<div id="dialogDone" class="dialogHiddenContent"><div id="dialogDoneText" style="font-size: large; margin: 1em;"></div><img src="../../media/1x1.gif" id="pegSpin"><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>Op dit niveau moet u alle blokken uit de witte werkruimte opstapelen.</div><iframe id="iframeOneTopBlock" src=""></iframe>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

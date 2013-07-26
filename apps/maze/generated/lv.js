// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="MSG" style="display: none"><span id="moveForward">ej uz priekšu</span><span id="turnLeft">pagriezies pa kreisi</span><span id="turnRight">pagriezies pa labi</span><span id="doCode">dari</span><span id="elseCode">citādi</span><span id="pathAhead">ja priekšā ir brīvs ceļš</span><span id="pathLeft">ja pa kreisi ir brīvs ceļš</span><span id="pathRight">ja pa labi ir brīvs ceļš</span><span id="repeatUntil">atkārto tikmēr kamēr</span><span id="moveForwardTooltip">Pārvieto cilvēciņu uz priekšu par vienu soli.</span><span id="turnTooltip">Pārvieto cilvēciņu pa kreisi vai pa labi par 90 \\ngrādiem. </span><span id="ifTooltip">Ja attiecīgajā virzienā ir brīvs ceļš, \\ntad izpildīt attiecīgās darbības. </span><span id="ifelseTooltip">Ja attiecīgajā virzienā ir brīvs ceļš, \\ntad izpildīt pirmo bloku ar darbībām. \\nCitādi izpildīt otro bloku ar darbībām. </span><span id="whileTooltip">Atkārtot iekļautās darbības kamēr sasniegts mērķis.</span><span id="capacity0">Tev atlikuši 0 bloki.</span><span id="capacity1">Tev atlicis 1 bloks.</span><span id="capacity2">Tev atlikuši %1 bloki.</span><span id="nextLevel">Apsveicu! Vai esi gatavs turpināt ar %1 līmeni?</span><span id="finalLevel">Apsveicu! Tu esi atrisinājis pēdējo līmeni.</span><span id="oneTopBlock">Šajā līmenī tev bloki jāsaliek kopā baltajā laumumā.</span></div><div id="COMMON_MSG" style="display: none"><span id="httpRequestError">Pieprasījuma kļūda.</span><span id="linkAlert">Dalies ar saviem blokiem ar šo saiti:\n\n%1</span><span id="hashError">Atvaino, bet \'%1\' neatbilst nevienam saglabātajam bloku failam.</span><span id="xmlError">Nevaru ielādēt tavu saglabāto failu.  Iespējams, tas tika izveidots ar citu Blockly versiju?</span></div><table width="100%" height="100%"><tr height="50"><td colspan=3><div style="display: none;"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></div><h1><span id="title"><a href="../index.html">Blockly</a> : Labirints</span> &nbsp; ';
  for (var i118 = 1; i118 < 11; i118++) {
    output += ' ' + ((i118 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i118) + '</span>' : (i118 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i118) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i118) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i118) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i118) + '</a>');
  }
  output += '</h1></td></tr><tr><td width="400" valign="top"><div style="position: relative"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Programma ir vairākas secīgas darbības. Saliec kopā dažus \'ej uz priekšu\' blokus lai mēs varētu sasniegt mērķi.';
      break;
    case 2:
      output += 'Kāda ir darbību kārtība, lai varētu sekot šim ceļam?';
      break;
    case 3:
      output += 'Datoriem ir ierobežota atmiņa. Sasniedz ceļa mērķi lietojot tikai divus blokus. Lieto atkārtošanas bloku lai varētu izpildīt darbību vairāk kā vienu reizi.';
      break;
    case 4:
      output += 'Sasniedz mērķi lietojot tikai piecus blokus.';
      break;
    case 5:
      output += 'Cilvēciņam jāpagriežas pa kreisi tad, kad viņš vairs nevarēs iet taisni.';
      break;
    case 6:
      output += 'Pārbaudes komanda \'ja\' dara kaut ko tikai tad, ja pārbaude ir patiesa. Pamēģini pagriezties pa kreisi, ja pa kreisi ir brīvs ceļš.';
      break;
    case 7:
      output += 'Šis labirints izskatās sarežģītāks ne kā iepriekšējais, bet patiesībā tā nav.';
      break;
    case 8:
      output += 'Tu vari lietot vairākas pārbaudes komandas \'ja\'.';
      break;
    case 9:
      output += 'Pārbaudes komandas \'ja-citādi\' izpildīs vai nu vienu, vai otru bloku atkarībā no pārbaudes.';
      break;
    case 10:
      output += 'Vai tu vari atrisināt šo sarežģīto labirintu? Mēģini sekot sienai kreisajā pusē. Šis ir pieredzējušiem programmētājiem!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="100%"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button title="Apskatīt ģenerēto JavaScript pirmkodu." onclick="BlocklyApps.showCode();"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" title="Saglamāt un piesaistīt blokiem." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();" title="Makes the character do what the blocks say."><img src="../../media/1x1.gif" class="run icon21"> Izpildīt programmu</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none" title=Put the character back at the start of the maze.><img src="../../media/1x1.gif" class="stop icon21"> Sākt no sākuma</button></td></tr></table></td><td width=5></td><td valign="top"><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></td></tr></table><div id="pegmanMenu"></div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

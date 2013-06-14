// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="MSG" style="display:none"><span id="moveForward">ej uz priekšu</span><span id="turnLeft">pagriezies pa kreisi</span><span id="turnRight">pagriezies pa labi</span><span id="doCode">dari</span><span id="elseCode">citādi</span><span id="pathAhead">ja priekšā ir brīvs ceļš</span><span id="pathLeft">ja pa kreisi ir brīvs ceļš</span><span id="pathRight">ja pa labi ir brīvs ceļš</span><span id="repeatUntil">atkārto tikmēr kamēr</span><span id="moveForwardTooltip">Pārvieto cilvēciņu uz priekšu par vienu soli.</span><span id="turnTooltip">Pārvieto cilvēciņu pa kreisi vai pa labi par 90 \\ngrādiem. </span><span id="ifTooltip">Ja attiecīgajā virzienā ir brīvs ceļš, \\ntad izpildīt attiecīgās darbības. </span><span id="ifelseTooltip">Ja attiecīgajā virzienā ir brīvs ceļš, \\ntad izpildīt pirmo bloku ar darbībām. \\nCitādi izpildīt otro bloku ar darbībām. </span><span id="whileTooltip">Atkārtot iekļautās darbības kamēr sasniegts mērķis.</span><span id="capacity0">Tev atlikuši 0 bloki.</span><span id="capacity1">Tev atlicis 1 bloks.</span><span id="capacity2">Tev atlikuši %1 bloki.</span><span id="nextLevel">Apsveicu! Vai esi gatavs turpināt ar %1 līmeni?</span><span id="finalLevel">Apsveicu! Tu esi atrisinājis pēdējo līmeni.</span><span id="oneTopBlock">Šajā līmenī tev bloki jāsaliek kopā baltajā laumumā.</span></div><table width="100%" height="100%"><tr height="50"><td colspan=2><h1><a href="../index.html"><span id="blocklyName">Blockly</span></a> &gt; <span id="maze">Labirints</span>&nbsp;';
  for (var i103 = 1; i103 < 11; i103++) {
    output += ' ' + ((i103 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i103) + '</span>' : (i103 < opt_ijData.level) ? '<a class="tab previous" href="?level=' + soy.$$escapeHtml(i103) + '">' + soy.$$escapeHtml(i103) + '</a>' : '<a class="tab" href="?level=' + soy.$$escapeHtml(i103) + '">' + soy.$$escapeHtml(i103) + '</a>');
  }
  output += '</h1></td></tr><tr><td width="410" valign="top"><div style="position: relative"><div id="hintBubble"><div id="hint">';
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
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="100%"><tr><td style="width: 190px; text-align: center"><button title="Apskatīt ģenerēto JavaScript pirmkodu." onclick="BlocklyApps.showCode();"><img src=\'../../media/1x1.gif\' class="code"></button><button id="linkButton" title="Saglamāt un piesaistīt blokiem." onclick="BlocklyStorage.link();"><img src=\'../../media/1x1.gif\' class="link"></button><button id="randomizeButton" title="Ģenerēt nejaušus starta un finiša marķierus. onclick="Maze.randomizeMarkers();" style="display: none"><img src=\'../../media/1x1.gif\' class="random"></button></td><td style="width: 15px;"><img id="spinner" style="visibility: hidden;" src="loading.gif" height=15 width=15></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();">Izpildīt programmu</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none">Sākt no sākuma</button></td></tr></table></td><td valign="top"><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../generators/javascript.js"><\/script><script type="text/javascript" src="../common.js"><\/script><script type="text/javascript">BlocklyApps.loadLanguageScripts(languageSrc);<\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></td></tr></table>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

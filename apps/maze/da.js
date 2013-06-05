// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="MSG" style="display:none"><span id="fullTitle">Blockly Labyrint</span><span id="moveForward">flyt fremad</span><span id="turnLeft">drej venstre</span><span id="turnRight">drej højre</span><span id="doCode">gør</span><span id="elseCode">ellers</span><span id="pathAhead">hvis sti foran</span><span id="pathLeft">hvis sti til venstre</span><span id="pathRight">hvis sti til højre</span><span id="repeatUntil">gentag indtil</span><span id="moveForwardTooltip">Flytter pindemand et tern fremad.</span><span id="turnTooltip">Drejer pindemand 90 grader til højre eller venstre.</span><span id="ifTooltip">Hvis der er en sti i den angivne retning, \\nså udfør nogle handlinger. </span><span id="ifelseTooltip">Hvis der er en sti i den angivne retning, \\nså udfør den første handlingsblok. \\nHvis ikke, så udfør den anden handlingsblok. </span><span id="whileTooltip">Gentag handlingsblok indtil slutpunktet er nået.</span><span id="capacity0">Du har 0 blokke tilbage.</span><span id="capacity1">Du har 1 blok tilbage.</span><span id="capacity2">Du har %1 blokke tilbage.</span><span id="nextLevel">Tillykke! Er du klar til at fortsætte til bane %1?</span><span id="finalLevel">Tillykke! Du har klaret den sidste bane!.</span><span id="oneTopBlock">På denne bane skal du sætte alle blokkene sammen i det hvide arbejdsfelt.</span><span id="fullTitle">Blockly Labyrint</span></div><table width="100%" height="100%"><tr><td width="410" valign="top"><h1><a href="http://blockly.googlecode.com/">Blockly</a> &gt; <a href="../index.html">Apps</a> &gt; Labyrint</h1><div>Bane &nbsp;';
  for (var i112 = 1; i112 < 11; i112++) {
    output += (i112 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i112) + '</span>' : '<a class="tab" href="?level=' + soy.$$escapeHtml(i112) + '">' + soy.$$escapeHtml(i112) + '</a>';
  }
  output += '</div><div style="position: relative"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Et program er en sekvens af erklæringer. Sæt et par \'flyt fremad\' blokke sammen for at hjælpe mig til at nå målet,';
      break;
    case 2:
      output += 'Hvad er sekvensen af handlinger for at følge denne sti?';
      break;
    case 3:
      output += 'Computere har begrænset hukommelse. Prøv at nå enden af denne sti ved kun at bruge to blokke. Brug \'gentag\' til at køre en blok mere end én gang.';
      break;
    case 4:
      output += 'Nå målet ved kun at bruge fem blokke.';
      break;
    case 5:
      output += 'Pindeman er nødt til at dreje til venstre når han ikke kan gå lige ud.';
      break;
    case 6:
      output += 'En \'hvis\' sætning vil kun gøre noget hvis betingelsen er sand. Prøv at dreje til venstre hvis der er en sti til venstre.';
      break;
    case 7:
      output += 'Denne labyring ser mere kompliceret ud en den forrige, men det er den ikke.';
      break;
    case 8:
      output += 'Du kan bruge mere end en \'hvis\' sætning.';
      break;
    case 9:
      output += 'Hvis-ellers sætninger vil gøre den ene eller anden ting.';
      break;
    case 10:
      output += 'Kan du løse denne komplicerede labyrint? Prøv at følge den væggen på venstre hånd.';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="100%"><tr><td style="width: 190px; text-align: center"><button title="Se den genererede JavaScript kode." onclick="Blockly.Apps.showCode();"><img src=\'../../media/1x1.gif\' class="code"></button><button id="linkButton" title="Gem og link til blokke." onclick="BlocklyStorage.link();"><img src=\'../../media/1x1.gif\' class="link"></button><button id="randomizeButton" title="Placér tilfældige startpunkter og slutpunkter. onclick="Maze.randomizeMarkers();" style="display: none"><img src=\'../../media/1x1.gif\' class="random"></button></td><td style="width: 15px;"><img id="spinner" style="visibility: hidden;" src="loading.gif" height=15 width=15></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();">Kør Program</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none">Nulstil</button></td></tr></table></td><td valign="top"><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../generators/javascript.js"><\/script><script type="text/javascript" src="../common.js"><\/script><script type="text/javascript">Blockly.Apps.loadLanguageScripts(languageSrc);<\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></td></tr></table>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

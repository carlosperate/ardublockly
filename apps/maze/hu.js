// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="MSG" style="display:none"><span id="fullTitle">Blockly Labirintus</span><span id="moveForward">Menj előre</span><span id="turnLeft">Fordulj balra</span><span id="turnRight">Fordulj jobbra</span><span id="doCode">akkor</span><span id="elseCode">egyébként</span><span id="pathAhead">Ha szabad az út előtted</span><span id="pathLeft">Ha szabad az út balra</span><span id="pathRight">Ha szabad az út jobbra</span><span id="repeatUntil">Ismételd a</span><span id="moveForwardTooltip">Pegman előre lép egy mezőt.</span><span id="turnTooltip">Pegman 90 fokot fordul balra, vagy jobbra.</span><span id="ifTooltip">Ha szabad az út a megadott irányban, \\nakkor végrehajtja az utasításokat. </span><span id="ifelseTooltip">Ha szabad az út a megadott irányban, \\nakkor végrehajtja az első blokkban \\nmegadott utasításokat. Egyébként a \\nmásodik blokkban szereplő utasításokat \\nhajtja végre. </span><span id="whileTooltip">A beágyazott utasításokat hajtja végre a cél \\neléréséig. </span><span id="capacity0">Nem használhatsz fel több blokkot.</span><span id="capacity1">Még 1 blokkot használhatsz fel.</span><span id="capacity2">Még %1 blokkot használhatsz fel.</span><span id="nextLevel">Gratulálok! Kész vagy megoldani a(z) %1. szintet?</span><span id="finalLevel">Gratulálok! Sikeresen megoldottad az utolsó szintet.</span><span id="oneTopBlock">Ezen a szinten össze kell kapcsolnod minden blokkot a munkaterületen.</span><span id="fullTitle">Blockly Labirintus</span></div><table width="100%" height="100%"><tr><td width="410" valign="top"><h1><a href="http://blockly.googlecode.com/">Blockly</a> &gt; <a href="../index.html">Apps</a> &gt; Labirintus</h1><div>Szint &nbsp;';
  for (var i112 = 1; i112 < 11; i112++) {
    output += (i112 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i112) + '</span>' : '<a class="tab" href="?level=' + soy.$$escapeHtml(i112) + '">' + soy.$$escapeHtml(i112) + '</a>';
  }
  output += '</div><div style="position: relative"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Egy program utasítások sorozatából áll. Segíts eljutatni Pegmant a célig, kapcsolj össze néhány \'Menj előre\' blokkot!';
      break;
    case 2:
      output += 'Milyen lépések sorozata kell, hogy eljuttasd Pegmant a célig?';
      break;
    case 3:
      output += 'A számítógépeknek véges a memóriájuk. Juttasd el Pegmant a célig mindössze 2 blokk felhasználásával. Használd az \'Ismételd a célbaérésig\' blokkot egy másik blokk ismételt végrehajtásához.';
      break;
    case 4:
      output += 'Juttasd el Pegmant a célig mindössze 5 blokk felhasználásával.';
      break;
    case 5:
      output += 'Pegmannak balra kellene fordulnia, ha nem tud előre menni az úton.';
      break;
    case 6:
      output += 'Egy \'Ha\' esetén az utasítások csak akkor kerülnek végrehajtásra, ha a feltétel igaz. Próbáld Pegmant balra fordítani, ha van út balra.';
      break;
    case 7:
      output += 'Ez a labirintus bonyolultabbank tűnik az előzőnél, de ez csak a látszat.';
      break;
    case 8:
      output += 'Egynél több \'Ha\' feltételt is használhatsz.';
      break;
    case 9:
      output += 'A Ha-egyébként feltétel esetén vagy az egyik, vagy a másik utasítás-csoport kerül végrehajtásra.';
      break;
    case 10:
      output += 'Végig tudod vezetni Pegmant ezen a bonyolult labirintuson? Próbáld a bal oldali falat követni. Haladó programozóknak!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="100%"><tr><td style="width: 190px; text-align: center"><button title="JavaScript forráskód megtekintése." onclick="Blockly.Apps.showCode();"><img src=\'../../media/1x1.gif\' class="code"></button><button id="linkButton" title="Mentés és Hivatkozás a kódhoz. " onclick="BlocklyStorage.link();"><img src=\'../../media/1x1.gif\' class="link"></button><button id="randomizeButton" title="Start és Cél véletlenszerű elhelyezése. onclick="Maze.randomizeMarkers();" style="display: none"><img src=\'../../media/1x1.gif\' class="random"></button></td><td style="width: 15px;"><img id="spinner" style="visibility: hidden;" src="loading.gif" height=15 width=15></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();">Program futtatása</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none">Alaphelyzet</button></td></tr></table></td><td valign="top"><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../generators/javascript.js"><\/script><script type="text/javascript" src="../common.js"><\/script><script type="text/javascript">Blockly.Apps.loadLanguageScripts(languageSrc);<\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></td></tr></table>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

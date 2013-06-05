// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="MSG" style="display:none"><span id="fullTitle">Blockly Bludiště</span><span id="moveForward">pohyb vpřed</span><span id="turnLeft">otočit levá</span><span id="turnRight">otočit pravá</span><span id="doCode">udělej</span><span id="elseCode">jinak</span><span id="pathAhead">pokud cesta vpřed</span><span id="pathLeft">pokud cesta doleva</span><span id="pathRight">pokud cesta doprava</span><span id="repeatUntil">opakuj až do</span><span id="moveForwardTooltip">Pohne Pegmanem vpřed o jedno pole.</span><span id="turnTooltip">Otočí Pegmana vlevo nebo vpravo o 90 stupňů.</span><span id="ifTooltip">Pokud je v daném směru cesta, pak proveď nějakou \\nakci. </span><span id="ifelseTooltip">Pokud je v danném směru cesta, \\npak proveď posloupnost akcí. V \\nopačném případě proveď druhou \\nposloupnost akcí. </span><span id="whileTooltip">Opakuj obsažené akce do té doby, \\ndokud není dosažen cílový bod. </span><span id="capacity0">Počet zbývajících bloků 0.</span><span id="capacity1">Počet zbývajících bloků 1.</span><span id="capacity2">Počet zbývajících bloků %1.</span><span id="nextLevel">Blahopřejeme! Jsi připraven vstoupit do levelu %1?</span><span id="finalLevel">Blahopřejeme! Vyřešil jsi poslední level.</span><span id="oneTopBlock">V tomto levelu musíš posbírat všechny bloky na bílém pozadí.</span><span id="fullTitle">Blockly Bludiště</span></div><table width="100%" height="100%"><tr><td width="410" valign="top"><h1><a href="http://blockly.googlecode.com/">Blockly</a> &gt; <a href="../index.html">Apps</a> &gt; Bludiště</h1><div>Level &nbsp;';
  for (var i112 = 1; i112 < 11; i112++) {
    output += (i112 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i112) + '</span>' : '<a class="tab" href="?level=' + soy.$$escapeHtml(i112) + '">' + soy.$$escapeHtml(i112) + '</a>';
  }
  output += '</div><div style="position: relative"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Program je posloupnost příkazů. Poskládej několik pohybů vpřed dohromady a pomoc mi dosáhnout cíle.';
      break;
    case 2:
      output += 'Jaká je posloupnost kroků pro následování této cesty?';
      break;
    case 3:
      output += 'Počítače mají omezenou paměť. Dosáhni cíle s použitím pouze dvou bloků. Použij příkaz \'opakuj\' pro zopakování příkazu.';
      break;
    case 4:
      output += 'Dosáhni cíle s použitím peti bloků.';
      break;
    case 5:
      output += 'Pegman se bude muset otočit vlevo, pokud nebude moci jít rovně.';
      break;
    case 6:
      output += 'Podmínka \'pokud\' udělá něco pouze v případě, že je splněna její podmínka. Zkus se otočit vlevo, pokud je nalevo cesta.';
      break;
    case 7:
      output += 'Toto bludiště na první pohled vypadá komplikovaněji než to předchozí, ale není.';
      break;
    case 8:
      output += 'Můžeš použít více něž jeden výraz \'pokud\'.';
      break;
    case 9:
      output += 'Příkaz \'pokud-jinak\' provede buď něco, nebo něco jiného.';
      break;
    case 10:
      output += 'Dokážeš vyřešit toto komplikované bludiště? Zkus se přidržovat zdi po levé ruce.';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="100%"><tr><td style="width: 190px; text-align: center"><button title="Zobraz generovaný JavaScriptový kód." onclick="Blockly.Apps.showCode();"><img src=\'../../media/1x1.gif\' class="code"></button><button id="linkButton" title="Ulož a spoj bloky.." onclick="BlocklyStorage.link();"><img src=\'../../media/1x1.gif\' class="link"></button><button id="randomizeButton" title="Vygeneruj náhodně pozice startovního a cílového \\nbodu.  onclick="Maze.randomizeMarkers();" style="display: none"><img src=\'../../media/1x1.gif\' class="random"></button></td><td style="width: 15px;"><img id="spinner" style="visibility: hidden;" src="loading.gif" height=15 width=15></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();">Spusť program</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none">Reset</button></td></tr></table></td><td valign="top"><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../generators/javascript.js"><\/script><script type="text/javascript" src="../common.js"><\/script><script type="text/javascript">Blockly.Apps.loadLanguageScripts(languageSrc);<\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></td></tr></table>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

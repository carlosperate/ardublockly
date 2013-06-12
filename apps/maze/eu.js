// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="MSG" style="display:none"><span id="moveForward">mugi aurrera</span><span id="turnLeft">biratu ezker</span><span id="turnRight">biratu eskuin</span><span id="doCode">egin</span><span id="elseCode">bestela</span><span id="pathAhead">bidea badago aurrera</span><span id="pathLeft">bidea badago ezkerrera</span><span id="pathRight">bidea badago eskuinera</span><span id="repeatUntil">arte errepikatu</span><span id="moveForwardTooltip">Pegman aurreruntz tarte bat mugitzen du.</span><span id="turnTooltip">Pegman ezkerrerantz edo eskuinerantz 90 gradu \\nbiratzen du. </span><span id="ifTooltip">Esandako norantzan bidea badago, \\nekintza batzu burutu. </span><span id="ifelseTooltip">Esandako norantzan bidea badago, \\nekintzen lehenengo blokea burutu. \\nBestela, ekintzen bigarren blokea \\nburutu. </span><span id="whileTooltip">Errepikatu barruko ekintzak bukaera punturaino \\niritsi arte. </span><span id="capacity0">0 bloke geratzen dira.</span><span id="capacity1">Bloke 1 geratzen da.</span><span id="capacity2">%1 bloke geratzen dira.</span><span id="nextLevel">Zorionak! Prest al zaude %1 mailara pasatzeko?</span><span id="finalLevel">Zorionak! Azken maila gainditu duzu.</span><span id="oneTopBlock">Maila honetan, bloke guztiak lan-eremu txurian pilatu behar dituzu.</span></div><table width="100%" height="100%"><tr height="50"><td colspan=2><h1><a href="../index.html"><span id="blocklyName">Blockly</span></a> &gt; <span id="maze">Labirintoa</span>&nbsp;';
  for (var i103 = 1; i103 < 11; i103++) {
    output += ' ' + ((i103 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i103) + '</span>' : (i103 < opt_ijData.level) ? '<a class="tab previous" href="?level=' + soy.$$escapeHtml(i103) + '">' + soy.$$escapeHtml(i103) + '</a>' : '<a class="tab" href="?level=' + soy.$$escapeHtml(i103) + '">' + soy.$$escapeHtml(i103) + '</a>');
  }
  output += '</h1></td></tr><tr><td width="410" valign="top"><div style="position: relative"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Programa bat agindu multzo edo sekuentzia bat da. Elkartu \'mugi aurrera\' bloke pare bat helmugara iritsi ahal izateko.';
      break;
    case 2:
      output += 'Zein da pausuen sekuentzia bide hau egiteko?';
      break;
    case 3:
      output += 'Ordenagailuek memoria mugatua daukate. Saiatu zaitez bide honen bukaerara iristen soilik bi bloke erabiliz. Erabili \'errepikatu\' bloke bat behin baino gehiagotan to run a block more than once.';
      break;
    case 4:
      output += 'Iritsi helmugara soilik bost bloke erabiliz.';
      break;
    case 5:
      output += 'Pegman-ek ezkerrera egin beharko du aurrera joan ezin denean.';
      break;
    case 6:
      output += '\'if\' bloke batek zeozer egingo du bakarrik baldintza betetzen bada. Saiatu ezkerrera biratzen ezkerrera bidea baldin badago.';
      break;
    case 7:
      output += 'Labirinto honek aurrekoa baino zailagoa ematen du, baina ez da.';
      break;
    case 8:
      output += '\'if\' bloke bat baino gehiago erabili ditzakezu.';
      break;
    case 9:
      output += 'If-else blokeek gauza bat edo bestea egingo dute.';
      break;
    case 10:
      output += 'Labirinto zail honi irtenbidea aurkitu diezaiokezu? Saia zaitez ezker-pareta jarraitzen.';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="100%"><tr><td style="width: 190px; text-align: center"><button title="Ikusi sorturiko JavaScript kodea." onclick="Blockly.Apps.showCode();"><img src=\'../../media/1x1.gif\' class="code"></button><button id="linkButton" title="Gorde eta lotura sortu." onclick="BlocklyStorage.link();"><img src=\'../../media/1x1.gif\' class="link"></button><button id="randomizeButton" title="Ausazko hasiera eta bukaera puntuak. onclick="Maze.randomizeMarkers();" style="display: none"><img src=\'../../media/1x1.gif\' class="random"></button></td><td style="width: 15px;"><img id="spinner" style="visibility: hidden;" src="loading.gif" height=15 width=15></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();">Programa exekutatu</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none">Berriz hasi</button></td></tr></table></td><td valign="top"><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../generators/javascript.js"><\/script><script type="text/javascript" src="../common.js"><\/script><script type="text/javascript">Blockly.Apps.loadLanguageScripts(languageSrc);<\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></td></tr></table>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

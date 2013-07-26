// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="MSG" style="display: none"><span id="moveForward">ga vooruit</span><span id="turnLeft">draai links</span><span id="turnRight">draai rechts</span><span id="doCode">doe</span><span id="elseCode">anders</span><span id="pathAhead">als de weg verder</span><span id="pathLeft">als de weg naar links</span><span id="pathRight">als de weg naar rechts</span><span id="repeatUntil">doe tot</span><span id="moveForwardTooltip">Zet Pegman een blokje vooruit. </span><span id="turnTooltip">Draai Pegman links of rechts over 90 graden.</span><span id="ifTooltip">Als er een weg in de opgegeven richting is, \\ndoe dan bepaalde acties. </span><span id="ifelseTooltip">Als er een weg in de opgegeven richting is, \\ndoe dan de eerste groep acties. \\nanders doe de tweede groep acties. </span><span id="whileTooltip">Doe de ingesloten instructies tot het doel \\nbereikt is. </span><span id="capacity0">Je hebt 0 instructies over.</span><span id="capacity1">Je hebt 1 instructie over.</span><span id="capacity2">Je hebt %1 instructies over.</span><span id="nextLevel">Proficiat! Ben je klaar om naar niveau %1 te gaan?</span><span id="finalLevel">Proficiat! Je hebt het laatste niveau opgelost.</span><span id="oneTopBlock">Op dit niveau moet je alle instructies samenleggen in het witte gedeelte.</span></div><div id="COMMON_MSG" style="display: none"><span id="httpRequestError">Er was een probleem met de aanvraag.</span><span id="linkAlert">Deel je oplossing via deze link:\n\n%1</span><span id="hashError">Sorry, \'%1\' Komt niet overeen met opgeslagen instructies.</span><span id="xmlError">Kon je bewaarde instructies niet opladen.  Misschien waren ze gemaakt met een andere versie van Blockly?</span></div><table width="100%" height="100%"><tr height="50"><td colspan=3><div style="display: none;"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></div><h1><span id="title"><a href="../index.html">Blockly</a> : Doolhof</span> &nbsp; ';
  for (var i118 = 1; i118 < 11; i118++) {
    output += ' ' + ((i118 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i118) + '</span>' : (i118 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i118) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i118) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i118) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i118) + '</a>');
  }
  output += '</h1></td></tr><tr><td width="400" valign="top"><div style="position: relative"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Een programma is een lijst van instructies. Stop een paar \'ga vooruit\' instructies samen en help me op mijn doel te bereiken.';
      break;
    case 2:
      output += 'Wat is de volgorde van instructies om de weg te volgen?';
      break;
    case 3:
      output += 'Computers hebben een beperkt geheugen. Bereik het einde van de weg met enkel 2 instructies. Gebruik \'herhaal\' om een instructie meerdere keren uit te voeren.';
      break;
    case 4:
      output += 'Bereik het doel met enkel 5 instructies.';
      break;
    case 5:
      output += 'Een \'als\' instructie zal enkel iets doen als de voorwaarde \'waar\' is. Probeer naar links te draaien als er een weg naar links is.';
      break;
    case 6:
      output += 'Dit doolhof ziet er ingewikkelder uit dan het vorige, maar dit is niet zo.';
      break;
    case 7:
      output += 'Je kan meer dan 1 \'als\' instructie gebruiken.';
      break;
    case 8:
      output += '\'als\' / \'anders\' instructies doen het ene of het andere.';
      break;
    case 9:
      output += 'Kun je dit ingewikkelde doolhof oplossen? Probeer de linker muur te volgen.';
      break;
    case 10:
      output += 'Dit doolhof heeft gegevens structuren nodig. Enkel voor geavanceerde programmeurs!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="100%"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button title="Bekijk de gegenereerde JavaScript code." onclick="BlocklyApps.showCode();"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" title="Bewaar en verwijs naar blokken." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();" title="Makes the character do what the blocks say."><img src="../../media/1x1.gif" class="run icon21"> Test programma</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none" title=Put the character back at the start of the maze.><img src="../../media/1x1.gif" class="stop icon21"> Opnieuw</button></td></tr></table></td><td width=5></td><td valign="top"><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></td></tr></table><div id="pegmanMenu"></div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

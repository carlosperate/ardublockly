// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="country1">Aostralia</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">Saozneg</span><span id="country1City1">Melbourne</span><span id="country1City2">Sydney</span><span id="country1HelpUrl">http://br.wikipedia.org/wiki/Aostralia</span><span id="country2">Alamagn</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">Alamaneg</span><span id="country2City1">Berlin</span><span id="country2City2">München</span><span id="country2HelpUrl">http://br.wikipedia.org/wiki/Alamagn</span><span id="country3">Sina</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">Sinad</span><span id="country3City1">Beijing</span><span id="country3City2">Shanghai</span><span id="country3HelpUrl">http://br.wikipedia.org/wiki/Sina</span><span id="country4">Brazil</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">Portugaleg</span><span id="country4City1">Rio de Janeiro</span><span id="country4City2">São Paulo</span><span id="country4HelpUrl">http://br.wikipedia.org/wiki/Brazil</span><span id="flag">banniel :</span><span id="language">yezh :</span><span id="languageChoose">dibab...</span><span id="cities">keodedoù :</span><span id="error0">Dispar !\nReizh eo an/ar %1 bloc\'h.</span><span id="error1">Tost ! Direizh eo ur bloc\'h.</span><span id="error2">Direizh eo %1 bloc\'h.</span><span id="tryAgain">Direizh eo ar bloc\'h oc\'h usskediñ.\nKendalc\'hit da arnodiñ.</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : Puzzle</span></h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp(true);">Skoazell</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">Gwiriañ ar respontoù</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="shadow"></div><div id="helpBorder"></div><div id="help"><div style="padding-bottom: 0.7ex">Evit kement bro (e gwer), stag he banniel, dibab he yezh, ha gra ur verniadenn eus he c\'herioù.</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe><div class="farSide" style="padding: 1ex 3ex 0"><button id="okButton" onclick="Puzzle.hideHelp(true)">Mat eo</button></div></div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="notouch"></div>';
};

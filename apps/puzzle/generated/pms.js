// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="country1">Australia</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">Anglèis</span><span id="country1City1">Melbourne</span><span id="country1City2">Sydney</span><span id="country1HelpUrl">http://pms.wikipedia.org/wiki/Australia</span><span id="country2">Almagna</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">Alman</span><span id="country2City1">Berlin</span><span id="country2City2">Mùnich</span><span id="country2HelpUrl">http://pms.wikipedia.org/wiki/Gërmania</span><span id="country3">Cin-a</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">Cinèis</span><span id="country3City1">Pechin</span><span id="country3City2">Shangai</span><span id="country3HelpUrl">http://pms.wikipedia.org/wiki/Cin-a</span><span id="country4">Brasil</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">Portughèis</span><span id="country4City1">Rio de Janeiro</span><span id="country4City2">San Pàul</span><span id="country4HelpUrl">http://pms.wikipedia.org/wiki/Brasil</span><span id="flag">drapò:</span><span id="language">lenga:</span><span id="languageChoose">sern...</span><span id="cities">sità:</span><span id="error0">Përfet! Tuti ij %1 blòch a son giust.</span><span id="error1">Scasi! Un blòch a va nen bin.</span><span id="error2">%1 blòch a van nen bin.</span><span id="tryAgain">Ël blòch evidensià a va nen bin. Preuva torna.</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : S-ciapatesta</span></h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp(true);">Giuté</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">Contròla le rispòste</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="shadow"></div><div id="helpBorder"></div><div id="help"><div style="padding-bottom: 0.7ex">Për minca pais (an verd), tachje sò drapò, sern soa lenga, e fa na colòna ëd soe sità.</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe><div class="farSide" style="padding: 1ex 3ex 0"><button id="okButton" onclick="Puzzle.hideHelp(true)">Va bin</button></div></div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="notouch"></div>';
};

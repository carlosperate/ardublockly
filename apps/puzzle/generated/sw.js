// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="country1">Australia</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">Kingereza</span><span id="country1City1">Melbourne</span><span id="country1City2">Sydney</span><span id="country1HelpUrl">http://sw.wikipedia.org/wiki/Australia</span><span id="country2">Ujerumani</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">Kijerumani</span><span id="country2City1">Berlin</span><span id="country2City2">Munich</span><span id="country2HelpUrl">http://sw.wikipedia.org/wiki/Ujerumani</span><span id="country3">China</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">Kichina</span><span id="country3City1">Beijing</span><span id="country3City2">Shanghai</span><span id="country3HelpUrl">http://sw.wikipedia.org/wiki/China</span><span id="country4">Brazil</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">Kireno</span><span id="country4City1">Rio de Janeiro</span><span id="country4City2">Sao Paulo</span><span id="country4HelpUrl">http://sw.wikipedia.org/wiki/Brazil</span><span id="flag">bendera:</span><span id="language">lugha:</span><span id="languageChoose">chagua...</span><span id="cities">miji:</span><span id="error0">Hongera!\nVishiku vyote %1 ni sahihi.</span><span id="error1">Uko karibu! Kishiku kimoja ni kosefu.</span><span id="error2">Vishiku vi%1 ni kosefu.</span><span id="tryAgain">Kishiku kinachobainishwa ni kosefu.</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : Fumbo</span></h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp(true);">Huduma</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">Kuangalia Majibu</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="shadow"></div><div id="helpBorder"></div><div id="help"><div style="padding-bottom: 0.7ex">Kwa kila nchi (kijani), ambatisha bendera yake, kuchagua lugha yake, na kupanganya miji yake.</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe><div class="farSide" style="padding: 1ex 3ex 0"><button id="okButton" onclick="Puzzle.hideHelp(true)">Sawa</button></div></div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="notouch"></div>';
};

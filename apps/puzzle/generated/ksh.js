// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="country1">Außtraalije</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">Änglesch</span><span id="country1City1">Mälbörn</span><span id="country1City2">Sydney</span><span id="country1HelpUrl">http://ksh.wikipedia.org/wiki/Außtraalijje_(Schtaat)</span><span id="country2">Deutschland</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">Deutsch</span><span id="country2City1">Bälliin</span><span id="country2City2">Mönnsche</span><span id="country2HelpUrl">http://ksh.wikipedia.org/wiki/Deutschland</span><span id="country3">Schiina</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">Schineesesch</span><span id="country3City1">Peeking</span><span id="country3City2">Schanghai</span><span id="country3HelpUrl">http://ksh.wikipedia.org/wiki/Schiina</span><span id="country4">Brasiilije</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">Pochtojeesesch</span><span id="country4City1">Rio_de_Schaneero</span><span id="country4City2">São Paulo</span><span id="country4HelpUrl">http://ksh.wikipedia.org/wiki/Brasiilije</span><span id="flag">Fahn:</span><span id="language">Schprooch:</span><span id="languageChoose">Söhk jäd uß...</span><span id="cities">Schtädt:</span><span id="error0">Supper!\nAlle %1 Klözje sin reschtesch.</span><span id="error1">Beinah! Ei Klözje es verkeeht.</span><span id="error2">%1 Klözje sin verkeeht.</span><span id="tryAgain">Dat eine Klözje es verkeht.\nVersöhg et norr_ens.</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : Possel</span></h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp(true);">Hölp</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">Prööve!</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="shadow"></div><div id="helpBorder"></div><div id="help"><div style="padding-bottom: 0.7ex">För jedes Land, en Jröhn, donn däm sing Fahn draan, söhk sing Schprooch uß, un donn däm sing Schtädt opleßte.</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe><div class="farSide" style="padding: 1ex 3ex 0"><button id="okButton" onclick="Puzzle.hideHelp(true)">Jebongt!</button></div></div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

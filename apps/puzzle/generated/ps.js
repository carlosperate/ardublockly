// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="country1">آسټراليا</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">انګرېزي</span><span id="country1City1">مېلبورن</span><span id="country1City2">سېډني</span><span id="country1HelpUrl">http://en.wikipedia.org/wiki/Australia</span><span id="country2">جرمني</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">جرمن</span><span id="country2City1">برلين</span><span id="country2City2">ميونيښ</span><span id="country2HelpUrl">http://en.wikipedia.org/wiki/Germany</span><span id="country3">چين</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">چينايي</span><span id="country3City1">بيجېنګ</span><span id="country3City2">شانګهای</span><span id="country3HelpUrl">http://en.wikipedia.org/wiki/China</span><span id="country4">برازيل</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">پارټوګيسي</span><span id="country4City1">رايو ډي جېنېرو</span><span id="country4City2">ساو پاولو</span><span id="country4HelpUrl">http://en.wikipedia.org/wiki/Brazil</span><span id="flag">رپی</span><span id="language">ژبه:</span><span id="languageChoose">ټاکل...</span><span id="cities">ښارونه</span><span id="error0">ډېر ښه!\nټول %1 بنديزونه سم دي.</span><span id="error1">نژدې دی! يو بنديز سم نه دی.</span><span id="error2">%1 بنديزونه سم نه دي.</span><span id="tryAgain">The highlighted block is not correct.\\nKeep trying.</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : Puzzle</span></h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp(true);">لارښود</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">ځوابونه کره کول</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="shadow"></div><div id="helpBorder"></div><div id="help"><div style="padding-bottom: 0.7ex">For each country (green), attach its flag, choose its language, and make a stack of its cities.</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe><div class="farSide" style="padding: 1ex 3ex 0"><button id="okButton" onclick="Puzzle.hideHelp(true)">ښه</button></div></div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

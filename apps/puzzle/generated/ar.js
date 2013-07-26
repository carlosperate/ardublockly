// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="country1">أستراليا</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">الإنكليزية</span><span id="country1City1">ملبورن</span><span id="country1City2">سدني</span><span id="country1HelpUrl">https://ar.wikipedia.org/أستراليا</span><span id="country2">ألمانيا</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">ألماني</span><span id="country2City1">برلين</span><span id="country2City2">ميونيخ</span><span id="country2HelpUrl">https://ar.wikipedia.org/wiki/ألمانيا</span><span id="country3">الصين</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">الصينية</span><span id="country3City1">بكين</span><span id="country3City2">شنغهاي</span><span id="country3HelpUrl">https://ar.wikipedia.org/wiki/الصين</span><span id="country4">البرازيل</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">البرتغالية</span><span id="country4City1">ريوديجانيرو</span><span id="country4City2">ساوباولو</span><span id="country4HelpUrl">https://ar.wikipedia.org/البرازيل</span><span id="flag">راية:</span><span id="language">اللغة:</span><span id="languageChoose">اختر...</span><span id="cities">المُدُن:</span><span id="error0">ممتاز!\nكل المكعبات %1 صحيحة.</span><span id="error1">اقتربت! مكعّب واحد غير صحيح.</span><span id="error2">%1 مكعبات غير صحيحة.</span><span id="tryAgain">الكتلّة المُبرَزَة غير صحيحة.\nواصل المحاولة.</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : أحجية</span></h1></td><td><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp(true);">مساعدة</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">تحقّق من الإجابات</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="shadow"></div><div id="helpBorder"></div><div id="help"><div style="padding-bottom: 0.7ex">لكل بلد (بالأخضر) صِل العلم و اختر لغتها و جمّع مدنها.</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe><div class="farSide" style="padding: 1ex 3ex 0"><button id="okButton" onclick="Puzzle.hideHelp(true)">حسن</button></div></div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="notouch"></div>';
};

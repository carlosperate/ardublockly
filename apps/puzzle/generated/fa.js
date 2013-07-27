// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="country1">استرالیا</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">انگلیسی</span><span id="country1City1">ملبورن</span><span id="country1City2">سیدنی</span><span id="country1HelpUrl">http://en.wikipedia.org/wiki/Australia</span><span id="country2">آلمان</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">آلمانی</span><span id="country2City1">برلین</span><span id="country2City2">مونیخ</span><span id="country2HelpUrl">http://en.wikipedia.org/wiki/Germany</span><span id="country3">چین</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">چینی</span><span id="country3City1">پکن</span><span id="country3City2">شانگهای</span><span id="country3HelpUrl">http://en.wikipedia.org/wiki/China</span><span id="country4">برزیل</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">پرتغالی</span><span id="country4City1">ریو دو ژانیرو</span><span id="country4City2">سائو پائولو</span><span id="country4HelpUrl">http://en.wikipedia.org/wiki/Brazil</span><span id="flag">پرچم:</span><span id="language">زبان:</span><span id="languageChoose">انتخاب کنید...</span><span id="cities">شهرها:</span><span id="error0">عالی!\nتمام  %1 بلوک\u200Cها درست است.</span><span id="error1">تقریبا! یک بلوک نادرست است.</span><span id="error2"> %1 بلوک\u200Cها نادرست است.</span><span id="tryAgain">بلوک پررنگ شده درست نیست.\nمجددا تلاش کنید.</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : پازل</span></h1></td><td style="display: none;"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp(true);">راهنما</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">بررسی پاسخ</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="shadow"></div><div id="helpBorder"></div><div id="help"><div style="padding-bottom: 0.7ex">برای هر کشور (سبز)، در کنار پرچم\u200Cشان، زبانشان را انتخاب کنید و فهرست شهرهایش را مشخص نمائید</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe><div class="farSide" style="padding: 1ex 3ex 0"><button id="okButton" onclick="Puzzle.hideHelp(true)">تأیید</button></div></div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="notouch"></div>';
};

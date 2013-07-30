// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="country1">澳大利亚</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">英语</span><span id="country1City1">墨尔本</span><span id="country1City2">悉尼</span><span id="country1HelpUrl">http://en.wikipedia.org/wiki/Australia</span><span id="country2">德国</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">德语</span><span id="country2City1">柏林</span><span id="country2City2">慕尼黑</span><span id="country2HelpUrl">http://en.wikipedia.org/wiki/Germany</span><span id="country3">中国</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">汉语</span><span id="country3City1">北京</span><span id="country3City2">上海</span><span id="country3HelpUrl">http://en.wikipedia.org/wiki/China</span><span id="country4">巴西</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">葡萄牙语</span><span id="country4City1">里约热内卢</span><span id="country4City2">圣保罗</span><span id="country4HelpUrl">http://en.wikipedia.org/wiki/Brazil</span><span id="flag">国旗</span><span id="language">语言：</span><span id="languageChoose">请选择...</span><span id="cities">城市</span><span id="error0">完美!\n%1 的所有块都正确。</span><span id="error1">差不多了 ！还有一个块是不正确的。</span><span id="error2">%1 块不正确</span><span id="tryAgain">高亮块不正确，请重试。</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : Puzzle</span></h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp(true);">帮助</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">账户核查</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="shadow"></div><div id="helpBorder"></div><div id="help"><div style="padding-bottom: 0.7ex">为每个国家 （绿色）添加国旗、 选择语言，和创建城市列表。</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe><div class="farSide" style="padding: 1ex 3ex 0"><button id="okButton" onclick="Puzzle.hideHelp(true)">确认</button></div></div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="notouch"></div>';
};

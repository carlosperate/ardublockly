// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="country1">ავსტრალია</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">ინგლისური</span><span id="country1City1">მელბურნი</span><span id="country1City2">სიდნეი</span><span id="country1HelpUrl">http://ka.wikipedia.org/wiki/ავსტრალია</span><span id="country2">გერმანია</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">გერმანული</span><span id="country2City1">ბერლინი</span><span id="country2City2">მიუნხენი</span><span id="country2HelpUrl">http://ka.wikipedia.org/wiki/გერმანია</span><span id="country3">ჩინეთი</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">ჩინური</span><span id="country3City1">პეკინი</span><span id="country3City2">შანხაი</span><span id="country3HelpUrl">http://ka.wikipedia.org/wiki/ჩინეთი</span><span id="country4">ბრაზილია</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">პორტუგალიური</span><span id="country4City1">რიო-დე-ჟანეირო</span><span id="country4City2">სან-პაულუ</span><span id="country4HelpUrl">http://ka.wikipedia.org/wiki/ბრაზილია</span><span id="flag">დროშა:</span><span id="language">ენა:</span><span id="languageChoose">აირჩიეთ...</span><span id="cities">ქალაქები:</span><span id="error0">ბრწყინვალეა!\nყველა %1 ბლოკი სწორია.</span><span id="error1">თითქმის! ერთი ბლოკი არასწორია.</span><span id="error2">%1 ბლოკი არასწორია.</span><span id="tryAgain">გამოყოფილი ბლოკი არასწორია.\nკიდევ სცადეთ.</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : თავსატეხი</span></h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp(true);">დახმარება</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">პასუხების შემოწმება</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="shadow"></div><div id="helpBorder"></div><div id="help"><div style="padding-bottom: 0.7ex">თითოეულ ქვეყანას (მწვანე), მიამაგრეთ მისი დროშა, აირჩიეთ ოფიციალური ენა და ამ ქვეყანაში მდებარე ქალაქები.</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe><div class="farSide" style="padding: 1ex 3ex 0"><button id="okButton" onclick="Puzzle.hideHelp(true)">კარგი</button></div></div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="notouch"></div>';
};

// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="country1">ਆਸਟਰੇਲੀਆ</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">ਅੰਗਰੇਜ਼ੀ</span><span id="country1City1">ਮੈਲਬਰਨ</span><span id="country1City2">ਸਿਡਨੀ</span><span id="country1HelpUrl">http://pa.wikipedia.org/wiki/ਆਸਟਰੇਲੀਆ</span><span id="country2">ਜਰਮਨੀ</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">ਗਰਮਨ</span><span id="country2City1">ਬਰਲਿਨ</span><span id="country2City2">ਮਿਊਨਿਖ</span><span id="country2HelpUrl">http://pa.wikipedia.org/wiki/ਜਰਮਨੀ</span><span id="country3">ਚੀਨ</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">ਚੀਨੀ</span><span id="country3City1">ਬੀਜਿੰਗ</span><span id="country3City2">ਸ਼ੰਘਾਈ</span><span id="country3HelpUrl">http://pa.wikipedia.org/wiki/ਚੀਨ</span><span id="country4">ਬ੍ਰਾਜ਼ੀਲ</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">ਪੁਰਤਗਾਲੀ</span><span id="country4City1">ਰਿਓ ਡੀ ਜਨੇਰੋ</span><span id="country4City2">ਸਾਓ ਪਾਓਲੋ</span><span id="country4HelpUrl">http://pa.wikipedia.org/wiki/ਬ੍ਰਾਜ਼ੀਲ</span><span id="flag">ਝੰਡਾ:</span><span id="language">ਭਾਸ਼ਾ:</span><span id="languageChoose">ਚੁਣੋ...</span><span id="cities">ਸ਼ਹਿਰ:</span><span id="error0">ਬਹੁਤ ਵਧੀਆ!\nਸਾਰੇ $1 ਬਲਾਕ ਸਹੀ ਹਨ।</span><span id="error1">ਬਸ ਹੋ ਗਿਆ ਸੀ! ਇੱਕ ਬਲਾਕ ਗ਼ਲਤ ਸੀ।</span><span id="error2">%1 ਬਲਾਕ ਗ਼ਲਤ ਹਨ।</span><span id="tryAgain">ਉੱਭਰਿਆ ਹੋਇਆ ਬਲਾਕ ਗ਼ਲਤ ਹੈ।\nਕੋਸ਼ਿਸ਼ ਕਰਦੇ ਰਹੋ।</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : ਬੁਝਾਰਤ</span></h1></td><td style="display: none;"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp(true);">ਮਦਦ</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">ਜੁਆਬ ਚੈੱਕ ਕਰੋ</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="shadow"></div><div id="helpBorder"></div><div id="help"><div style="padding-bottom: 0.7ex">ਹਰੇਕ ਦੇਸ਼ (ਹਰਾ) ਲਈ, ਉਹਦਾ ਝੰਡਾ ਲਗਾਓ, ਉਹਦੀ ਭਾਸ਼ਾ ਚੁਣੋ ਅਤੇ ਉਹਦੇ ਸ਼ਹਿਰਾਂ ਦਾ ਢੇਰ ਬਣਾਓ।</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe><div class="farSide" style="padding: 1ex 3ex 0"><button id="okButton" onclick="Puzzle.hideHelp(true)">ਠੀਕ ਹੈ।</button></div></div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="notouch"></div>';
};

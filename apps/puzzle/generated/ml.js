// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="country1">ഓസ്ട്രേലിയ</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">ഇംഗ്ലീഷ്</span><span id="country1City1">മെൽബൺ</span><span id="country1City2">സിഡ്നി</span><span id="country1HelpUrl">http://ml.wikipedia.org/wiki/Australia</span><span id="country2">ജർമ്മനി</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">ജെർമ്മൻ</span><span id="country2City1">ബെർലിൻ</span><span id="country2City2">മ്യൂണിക്</span><span id="country2HelpUrl">http://ml.wikipedia.org/wiki/Germany</span><span id="country3">ചൈന</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">ചൈനീസ്</span><span id="country3City1">ബീജിങ്ങ്</span><span id="country3City2">ഷാങ്ഹായ്</span><span id="country3HelpUrl">http://ml.wikipedia.org/wiki/China</span><span id="country4">ബ്രസീൽ</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">പോർച്ചുഗീസ്</span><span id="country4City1">റിയോ ഡി ജനീറോ</span><span id="country4City2">സാവോ പോളോ</span><span id="country4HelpUrl">http://ml.wikipedia.org/wiki/Brazil</span><span id="flag">പതാക:</span><span id="language">ഭാഷ:</span><span id="languageChoose">തിരഞ്ഞെടുക്കുക:</span><span id="cities">പട്ടണങ്ങൾ:</span><span id="error0">കൊള്ളാം!\nഎല്ലാ %1 തടയലുകളും ശരിയാണ്.</span><span id="error1">കുഴപ്പമില്ല! ഒരു തടയൽ ശരിയല്ല.</span><span id="error2">%1 തടയലുകൾ ശരിയല്ല.</span><span id="tryAgain">പ്രമുഖമാക്കി കാണിക്കുന്ന തടയൽ ശരിയല്ല.\nവീണ്ടും ശ്രമിക്കുക.</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : പ്രഹേളിക</span></h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp(true);">സഹായം</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">ഉത്തരങ്ങൾ പരിശോധിക്കുക</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="shadow"></div><div id="helpBorder"></div><div id="help"><div style="padding-bottom: 0.7ex">ഓരോ രാജ്യത്തിനും (പച്ച), അതിന്റെ പതാക ചേർക്കുക, ഭാഷ തിരഞ്ഞെടുക്കുക ഒപ്പം നഗരങ്ങളുടെ പട്ടിക തയ്യാറാക്കുക.</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe><div class="farSide" style="padding: 1ex 3ex 0"><button id="okButton" onclick="Puzzle.hideHelp(true)">ശരി</button></div></div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="notouch"></div>';
};

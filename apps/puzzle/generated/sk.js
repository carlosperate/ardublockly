// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="country1">Austrália</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">Angličtina</span><span id="country1City1">Melbourne</span><span id="country1City2">Sydney</span><span id="country1HelpUrl">http://sk.wikipedia.org/wiki/Austr%C3%A1lia_%28%C5%A1t%C3%A1t%29</span><span id="country2">Nemecko</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">Nemčina</span><span id="country2City1">Berlín</span><span id="country2City2">Mníchov</span><span id="country2HelpUrl">http://sk.wikipedia.org/wiki/Nemecko</span><span id="country3">Čína</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">Čínština</span><span id="country3City1">Peking</span><span id="country3City2">Šanghaj</span><span id="country3HelpUrl">http://sk.wikipedia.org/wiki/%C4%8C%C3%ADna</span><span id="country4">Brazília</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">Portugalčina</span><span id="country4City1">Rio de Janeiro</span><span id="country4City2">São Paulo</span><span id="country4HelpUrl">http://sk.wikipedia.org/wiki/Braz%C3%ADlia</span><span id="flag">vlajka:</span><span id="language">jazyk:</span><span id="languageChoose">zvoliť...</span><span id="cities">mestá:</span><span id="error0">Výborne!\nVšetkých %1 blokov je na svojom mieste.</span><span id="error1">Skoro! Jeden blok je nesprávne.</span><span id="error2">%1 blokov je nesprávne.</span><span id="tryAgain">Zvýraznený blok je nesprávne.\nSkúšaj ďalej.</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : Skladačka</span></h1></td><td style="display: none;"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp(true);">Pomoc</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">Skontrolovať</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="shadow"></div><div id="helpBorder"></div><div id="help"><div style="padding-bottom: 0.7ex">Každej krajine (zelená) priraď vlajku, jazyk a zoznam miest.</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe><div class="farSide" style="padding: 1ex 3ex 0"><button id="okButton" onclick="Puzzle.hideHelp(true)">OK</button></div></div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="notouch"></div>';
};

// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="country1">Австралија</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">англиски</span><span id="country1City1">Мелбурн</span><span id="country1City2">Сиднеј</span><span id="country1HelpUrl">http://mk.wikipedia.org/wiki/Австралија</span><span id="country2">Германија</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">германски</span><span id="country2City1">Берлин</span><span id="country2City2">Минхен</span><span id="country2HelpUrl">http://mk.wikipedia.org/wiki/Германија</span><span id="country3">Кина</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">кинески</span><span id="country3City1">Пекинг</span><span id="country3City2">Шангај</span><span id="country3HelpUrl">http://mk.wikipedia.org/wiki/Кина</span><span id="country4">Бразил</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">португалски</span><span id="country4City1">Рио де Жанеиро</span><span id="country4City2">Сао Паоло</span><span id="country4HelpUrl">http://mk.wikipedia.org/wiki/Бразил</span><span id="flag">знаме:</span><span id="language">јазик:</span><span id="languageChoose">одберете...</span><span id="cities">градови:</span><span id="error0">Совршено!\nСите %1 блокови се точни.</span><span id="error1">За малку! Само еден блок е грешен.</span><span id="error2">Има %1 грешни блокови.</span><span id="tryAgain">Потцртаниот блок не е исправен.\nОбидувајте се и понатаму.</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : Сложувалка</span></h1></td><td><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp(true);">Помош</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">Провери одговори</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="shadow"></div><div id="helpBorder"></div><div id="help"><div style="padding-bottom: 0.7ex">За секоја земја (зелено), прикачете го знамето, изберете кој јазик го зборува и наредете ги градовите.</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe><div class="farSide" style="padding: 1ex 3ex 0"><button id="okButton" onclick="Puzzle.hideHelp(true)">ОК</button></div></div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="notouch"></div>';
};

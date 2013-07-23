// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="country1">Αυστραλία</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">Αγγλικά</span><span id="country1City1">Μελβούρνη</span><span id="country1City2">Σίδνεϊ</span><span id="country1HelpUrl">http://el.wikipedia.org/wiki/Αυστραλία</span><span id="country2">Γερμανία</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">Γερμανικά</span><span id="country2City1">Βερολίνο</span><span id="country2City2">Μόναχο</span><span id="country2HelpUrl">http://el.wikipedia.org/wiki/Γερμανία</span><span id="country3">Κίνα</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">Κινεζικά</span><span id="country3City1">Πεκίνο</span><span id="country3City2">Σαγκάη</span><span id="country3HelpUrl">http://el.wikipedia.org/wiki/Κίνα</span><span id="country4">Βραζιλία</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">Πορτογαλικά</span><span id="country4City1">Ρίο ντε Τζανέιρο</span><span id="country4City2">Σάο Πάολο</span><span id="country4HelpUrl">http://el.wikipedia.org/wiki/Βραζιλία</span><span id="flag">σημαία</span><span id="language">γλώσσα:</span><span id="languageChoose">διάλεξε...</span><span id="cities">πόλεις:</span><span id="error0">Τέλεια!\nΚαι τα %1 μπλοκ είναι σωστά.</span><span id="error1">Σχεδόν! Ένα μπλοκ είναι λάθος.</span><span id="error2">%1 μπλοκ είναι λάθος.</span><span id="tryAgain">Το επισημασμένο μπλοκ δεν είναι σωστό.\nΣυνέχισε την προσπάθεια.</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : Παζλ</span></h1></td><td><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp();">Βοήθεια</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">Έλεγξε τις απαντήσεις</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="shadow"></div><div id="help"><div style="padding-bottom: 0.7ex">Για κάθε χώρα (πράσινα μπλοκ), σύνδεσε τη σημαία της, τη γλώσσα της και κάνε μια στοίβα με τις πόλεις της.</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe><div class="farSide" style="padding: 1ex 3ex 0"><button id="okButton" onclick="Puzzle.hideHelp()">ΟΚ</button></div></div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="notouch"></div>';
};

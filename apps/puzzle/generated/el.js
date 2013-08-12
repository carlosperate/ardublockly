// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.start = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="subtitle">Ένα οπτικό περιβάλλον προγραμματισμού</span><span id="linkButton">Αποθήκευση και σύνδεσμος στα μπλοκ.</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Εκτέλεση Προγράμματος</span><span id="resetProgram">Επανεκκίνηση</span><span id="codeTooltip">Δες τον κώδικα JavaScript που δημιουργήθηκε.</span><span id="linkButton">Αποθήκευση και σύνδεσμος στα μπλοκ.</span><span id="catLogic">Logic</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Procedures</span><span id="httpRequestError">Υπήρξε πρόβλημα με το αίτημα.</span><span id="blocklyMessage">Blockly (Μπλοκλι)</span><span id="linkAlert">Μοιράσου τα blocks σου με αυτό το σύνδεσμο:\n\n%1</span><span id="hashError">Λυπάμαι, το \'%1\' δεν αντιστοιχεί σε κανένα αποθηκευμένο αρχείο Μπλόκλι.</span><span id="xmlError">Δεν μπορώ να φορτώσω το αποθηκευμένο αρχείο σου.  Μήπως δημιουργήθηκε από μία παλιότερη έκδοση του Μπλόκλι.</span><span id="listVariable">list</span><span id="textVariable">text</span></div>' + codepage.start(null, null, opt_ijData) + graphpage.start(null, null, opt_ijData) + mazepage.start(null, null, opt_ijData) + planepage.start(null, null, opt_ijData) + puzzlepage.start(null, null, opt_ijData) + turtlepage.start(null, null, opt_ijData) + ok(null, null, opt_ijData);
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<style type="text/css">#dialog {visibility: hidden; background-color: #fff; color: #000; border: 1px solid #000; position: absolute; border-radius: 8px; box-shadow: 5px 5px 5px #888; padding: 10px;}#dialogBorder {visibility: hidden; position: absolute; background-color: #fff; color: #000; border: 1px solid #000; border-radius: 8px; box-shadow: 5px 5px 5px #888;}#dialogShadow {visibility: hidden; position: absolute; top: 0; left: 0; height: 100%; width: 100%; background-color: #000; opacity: 0.3}.dialogAnimate {transition-property: width height left top opacity; transition-duration: 0.2s;}.dialogHiddenContent {visibility: hidden; position: absolute; top: 0; left: 0; z-index: -1;}</style><div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="country1">Αυστραλία</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">Αγγλικά</span><span id="country1City1">Μελβούρνη</span><span id="country1City2">Σίδνεϊ</span><span id="country1HelpUrl">http://el.wikipedia.org/wiki/Αυστραλία</span><span id="country2">Γερμανία</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">Γερμανικά</span><span id="country2City1">Βερολίνο</span><span id="country2City2">Μόναχο</span><span id="country2HelpUrl">http://el.wikipedia.org/wiki/Γερμανία</span><span id="country3">Κίνα</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">Κινεζικά</span><span id="country3City1">Πεκίνο</span><span id="country3City2">Σαγκάη</span><span id="country3HelpUrl">http://el.wikipedia.org/wiki/Κίνα</span><span id="country4">Βραζιλία</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">Πορτογαλικά</span><span id="country4City1">Ρίο ντε Τζανέιρο</span><span id="country4City2">Σάο Πάολο</span><span id="country4HelpUrl">http://el.wikipedia.org/wiki/Βραζιλία</span><span id="flag">σημαία:</span><span id="language">γλώσσα:</span><span id="languageChoose">διάλεξε...</span><span id="cities">πόλεις:</span><span id="error0">Τέλεια!\nΚαι τα %1 μπλοκ είναι σωστά.</span><span id="error1">Σχεδόν! Ένα μπλοκ είναι λάθος.</span><span id="error2">%1 μπλοκ είναι λάθος.</span><span id="tryAgain">Το επισημασμένο μπλοκ δεν είναι σωστό.\nΣυνέχισε την προσπάθεια.</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly (Μπλοκλι)</a> : Παζλ</span></h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp(true);">Βοήθεια</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">Έλεγξε τις απαντήσεις</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>' + apps.dialog(null, null, opt_ijData) + '<div id="help" class="dialogHiddenContent"><div style="padding-bottom: 0.7ex">Για κάθε χώρα (πράσινα μπλοκ), σύνδεσε τη σημαία της, τη γλώσσα της και κάνε μια στοίβα με τις πόλεις της.</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe>' + apps.ok(null, null, opt_ijData) + '</div><div id="answers" class="dialogHiddenContent"><div id="answerMessage"></div><div id="graph"><div id="graphValue"></div></div>' + apps.ok(null, null, opt_ijData) + '</div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

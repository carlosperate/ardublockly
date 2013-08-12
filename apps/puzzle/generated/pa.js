// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.start = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="subtitle">a visual programming environment</span><span id="linkButton">Save and link to blocks.</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Run Program</span><span id="resetProgram">Reset</span><span id="codeTooltip">See generated JavaScript code.</span><span id="linkButton">Save and link to blocks.</span><span id="catLogic">Logic</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Procedures</span><span id="httpRequestError">There was a problem with the request.</span><span id="blocklyMessage">Blockly</span><span id="linkAlert">Share your blocks with this link:\\n\\n%1</span><span id="hashError">Sorry, \'%1\' doesn\'t correspond with any saved program.</span><span id="xmlError">Could not load your saved file.  Perhaps it was created with a different version of Blockly?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>' + codepage.start(null, null, opt_ijData) + graphpage.start(null, null, opt_ijData) + mazepage.start(null, null, opt_ijData) + planepage.start(null, null, opt_ijData) + puzzlepage.start(null, null, opt_ijData) + turtlepage.start(null, null, opt_ijData) + ok(null, null, opt_ijData);
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
  return '<div style="display: none"><span id="country1">ਆਸਟਰੇਲੀਆ</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">ਅੰਗਰੇਜ਼ੀ</span><span id="country1City1">ਮੈਲਬਰਨ</span><span id="country1City2">ਸਿਡਨੀ</span><span id="country1HelpUrl">http://pa.wikipedia.org/wiki/ਆਸਟਰੇਲੀਆ</span><span id="country2">ਜਰਮਨੀ</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">ਗਰਮਨ</span><span id="country2City1">ਬਰਲਿਨ</span><span id="country2City2">ਮਿਊਨਿਖ</span><span id="country2HelpUrl">http://pa.wikipedia.org/wiki/ਜਰਮਨੀ</span><span id="country3">ਚੀਨ</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">ਚੀਨੀ</span><span id="country3City1">ਬੀਜਿੰਗ</span><span id="country3City2">ਸ਼ੰਘਾਈ</span><span id="country3HelpUrl">http://pa.wikipedia.org/wiki/ਚੀਨ</span><span id="country4">ਬ੍ਰਾਜ਼ੀਲ</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">ਪੁਰਤਗਾਲੀ</span><span id="country4City1">ਰਿਓ ਡੀ ਜਨੇਰੋ</span><span id="country4City2">ਸਾਓ ਪਾਓਲੋ</span><span id="country4HelpUrl">http://pa.wikipedia.org/wiki/ਬ੍ਰਾਜ਼ੀਲ</span><span id="flag">ਝੰਡਾ:</span><span id="language">ਭਾਸ਼ਾ:</span><span id="languageChoose">ਚੁਣੋ...</span><span id="cities">ਸ਼ਹਿਰ:</span><span id="error0">ਬਹੁਤ ਵਧੀਆ!\nਸਾਰੇ $1 ਬਲਾਕ ਸਹੀ ਹਨ।</span><span id="error1">ਬਸ ਹੋ ਗਿਆ ਸੀ! ਇੱਕ ਬਲਾਕ ਗ਼ਲਤ ਸੀ।</span><span id="error2">%1 ਬਲਾਕ ਗ਼ਲਤ ਹਨ।</span><span id="tryAgain">ਉੱਭਰਿਆ ਹੋਇਆ ਬਲਾਕ ਗ਼ਲਤ ਹੈ।\nਕੋਸ਼ਿਸ਼ ਕਰਦੇ ਰਹੋ।</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : ਬੁਝਾਰਤ</span></h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp(true);">ਮਦਦ</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">ਜੁਆਬ ਚੈੱਕ ਕਰੋ</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>' + apps.dialog(null, null, opt_ijData) + '<div id="help" class="dialogHiddenContent"><div style="padding-bottom: 0.7ex">ਹਰੇਕ ਦੇਸ਼ (ਹਰਾ) ਲਈ, ਉਹਦਾ ਝੰਡਾ ਲਗਾਓ, ਉਹਦੀ ਭਾਸ਼ਾ ਚੁਣੋ ਅਤੇ ਉਹਦੇ ਸ਼ਹਿਰਾਂ ਦਾ ਢੇਰ ਬਣਾਓ।</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe>' + apps.ok(null, null, opt_ijData) + '</div><div id="answers" class="dialogHiddenContent"><div id="answerMessage"></div><div id="graph"><div id="graphValue"></div></div>' + apps.ok(null, null, opt_ijData) + '</div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

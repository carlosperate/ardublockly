// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return '<table id="header" width="100%"><tr><td valign="bottom"><h1><a href="http://blockly.googlecode.com/">Blockly</a> &gt; <a href="../index.html">Apps</a> &gt; ' + soy.$$escapeHtml(opt_ijData.MSG.title) + '</h1></td><td align="right"><button id="helpButton" onclick="Puzzle.showHelp();">' + soy.$$escapeHtml(opt_ijData.MSG.help) + '</button><button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">' + soy.$$escapeHtml(opt_ijData.MSG.checkAnswers) + '</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../language/' + soy.$$escapeHtml(opt_ijData.MSG.languageSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="shadow"></div><div id="help"><div style="padding-bottom: 0.7ex">' + soy.$$escapeHtml(opt_ijData.MSG.helpText) + '</div><div><img src="' + soy.$$escapeHtml(opt_ijData.MSG.helpImage) + '"></div><div style="text-align: right; padding-top: 1ex; padding-right: 3ex"><button id="okButton" onclick="Puzzle.hideHelp()">' + soy.$$escapeHtml(opt_ijData.MSG.helpOk) + '</button></div></div>';
};

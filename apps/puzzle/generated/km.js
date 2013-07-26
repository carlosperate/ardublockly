// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="country1">អូស្ត្រាលី</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">ភាសាអង់គ្លេស</span><span id="country1City1">ម៉ែលបូន</span><span id="country1City2">ស៊ីដនី</span><span id="country1HelpUrl">http://km.wikipedia.org/wiki/អូស្ត្រាលី</span><span id="country2">អាល្លឺម៉ង់</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">ភាសាអាល្លឺម៉ង់</span><span id="country2City1">ប៊ែរឡាំង</span><span id="country2City2">មុយនិច</span><span id="country2HelpUrl">http://km.wikipedia.org/wiki/អាល្លឺម៉ង់</span><span id="country3">ចិន</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">ភាសាចិន</span><span id="country3City1">ប៉េកាំង</span><span id="country3City2">សៀងហៃ</span><span id="country3HelpUrl">http://km.wikipedia.org/wiki/ចិន</span><span id="country4">ប្រេស៊ីល</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">ភាសាព័រទុយហ្គាល់</span><span id="country4City1">រ្យូដេចានេរ៉ូ</span><span id="country4City2">សៅប៉ូឡូ</span><span id="country4HelpUrl">http://km.wikipedia.org/wiki/ប្រេស៊ីល</span><span id="flag">ទង់ជាតិ</span><span id="language">ភាសា៖</span><span id="languageChoose">ជ្រើសរើស...</span><span id="cities">ទីក្រុង៖</span><span id="error0">ល្អណាស់!\nផ្គុំត្រូវប្លុកចំនួន%1ទាំងអស់ហើយ។</span><span id="error1">ជិតហើយៗ! នៅសល់តែប្លុកមួយទៀតមិនទាន់ត្រូវ។</span><span id="error2">នៅសល់ប្លុកចំនួន %1 ទៀតមិនទាន់ត្រឹមត្រូវ។</span><span id="tryAgain">ប្លុកដែលដាក់ពណ៌ហ៊ុំមិនទាន់ត្រឹមត្រូវទេ។\nសូមព្យាយាមបន្ត។</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : ល្បែងផ្គុំប្លុក</span></h1></td><td><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp(true);">ជំនួយ</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">ផ្ទៀងផ្ទាត់ចម្លើយ</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="shadow"></div><div id="helpBorder"></div><div id="help"><div style="padding-bottom: 0.7ex">ភ្ជាប់ទង់ជាតិ ជ្រើសរើសភាសា និង ផ្គុំឈ្មោះទីក្រុងសម្រាប់ប្រទេសនីមួយៗ (ពណ៌បៃតង)។</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe><div class="farSide" style="padding: 1ex 3ex 0"><button id="okButton" onclick="Puzzle.hideHelp(true)">យល់ព្រម</button></div></div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="notouch"></div>';
};

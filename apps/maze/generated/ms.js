// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">persekitaran pengaturcaraan visual</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">Lihat kod JavaScript yang dihasilkan.</span><span id="linkTooltip">Simpan dan pautkan kepada blok.</span><span id="runTooltip">Jalankan aturcara yang ditetapkan oleh blok-blok \\ndi dalam ruang kerja. </span><span id="runProgram">Jalankan Program</span><span id="resetProgram">Reset</span><span id="dialogOk">OK</span><span id="dialogCancel">Cancel</span><span id="catLogic">Logik</span><span id="catLoops">Gelung</span><span id="catMath">Matematik</span><span id="catText">Teks</span><span id="catLists">Senarai</span><span id="catColour">Warna</span><span id="catVariables">Pemboleh ubah</span><span id="catProcedures">Prosedur</span><span id="httpRequestError">Permintaan itu terdapat masalah.</span><span id="linkAlert">Kongsikan blok-blok anda dengan pautan ini:\n\n%1</span><span id="hashError">Maaf, \'%1\' tidak berpadanan dengan sebarang aturcara yang disimpan.</span><span id="xmlError">Fail simpanan anda tidak dapat dimuatkan. Jangan-jangan ia dicipta dengan versi Blockly yang berlainan?</span><span id="listVariable">senarai</span><span id="textVariable">teks</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.codeDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.storageDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogStorage" class="dialogHiddenContent"><div id="containerStorage"></div>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">mara ke hadapan</span><span id="Maze_turnLeft">belok kiri</span><span id="Maze_turnRight">belok kanan</span><span id="Maze_doCode">lakukan</span><span id="Maze_elseCode">jika tidak</span><span id="Maze_pathAhead">jika ada laluan ke hadapan</span><span id="Maze_pathLeft">jika ada laluan ke kiri</span><span id="Maze_pathRight">jika ada laluan ke kanan</span><span id="Maze_repeatUntil">ulangi sehingga</span><span id="Maze_moveForwardTooltip">Mengalihkan Pegman satu petak ke hadapan.</span><span id="Maze_turnTooltip">Membelokkan Pegman 90 darjah ke kiri atau ke kanan.</span><span id="Maze_ifTooltip">Jika terdapat laluan ke arah yang tertentu, \\nlakukan beberapa tindakan. </span><span id="Maze_ifelseTooltip">Jika terdapat laluan ke arah yang tertentu, \\nambil blok tindakan yang pertama. \\nJika tidak, ambil blok tindakan yang kedua. </span><span id="Maze_whileTooltip">Ulangi tindakan-tindakan yang dilampirkan \\nsehingga titik penamat dicapai. </span><span id="Maze_capacity0">Tinggal %0 blok.</span><span id="Maze_capacity1">Tinggal %1 blok.</span><span id="Maze_capacity2">Tinggal %1 blok.</span><span id="Maze_nextLevel">Tahniah! Adakah anda sedia untuk meningkat ke peringkat %1?</span><span id="Maze_finalLevel">Tahniah! Anda telah menyelesaikan peringkat terakhir.</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Maze</span> &nbsp; ';
  for (var i158 = 1; i158 < 11; i158++) {
    output += ' ' + ((i158 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i158) + '</span>' : (i158 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i158) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i158) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i158) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i158) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Program merupakan turutan blok. Susunkan beberapa blok \'maju\' untuk menolong saya mencapai tempat tujuan.';
      break;
    case 2:
      output += 'Apakah turutan langkah untuk mengikuti jalan ini?';
      break;
    case 3:
      output += 'Komputer mempunyai memori yang terhad. Capai hujung jalan dengan menggunakan dua blok sahaja. Gunakan \'ulang\' untuk menjalankan satu blok lebih daripada sekali.';
      break;
    case 4:
      output += 'Capai tempat tujuan dengan menggunakan lima blok sahaja.';
      break;
    case 5:
      output += 'Pegman akan perlu membelok ke kiri apabila tidak dapat berjalan ke hadapan.';
      break;
    case 6:
      output += 'An \'if\' block will do something only if the condition is true.  Try turning left if there is a path to the left.';
      break;
    case 7:
      output += 'This maze looks more complicated than the previous one, but it is not.';
      break;
    case 8:
      output += 'You can use more than one \'if\' block.';
      break;
    case 9:
      output += 'If-else blocks will do one thing or the other.';
      break;
    case 10:
      output += 'Can you solve this complicated maze?  Try following the left-hand wall.  Advanced programmers only!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="Lihat kod JavaScript yang dihasilkan." onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" class="notext" title="Simpan dan pautkan kepada blok." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="primary" onclick="Maze.runButtonClick();" title="Makes the player do what the blocks say."><img src="../../media/1x1.gif" class="run icon21"> Jalankan Program</button><button id="resetButton" class="primary" onclick="Maze.resetButtonClick();" style="display: none" title="Put the player back at the start of the maze."><img src="../../media/1x1.gif" class="stop icon21"> Reset</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + '<div id="dialogDone" class="dialogHiddenContent"><div id="dialogDoneText" style="font-size: large; margin: 1em;"></div><img src="../../media/1x1.gif" id="pegSpin"><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>Di tingkat ini, anda perlu menyusun semua blok secara bertingkat-tingkat ini di dalam ruang kerja putih.</div><iframe id="iframeOneTopBlock" src=""></iframe>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

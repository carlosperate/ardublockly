// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="subtitle">a visual programming environment</span><span id="linkButton">Blokları ve bağlantı adresini kaydet.</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Programı Çalıştır</span><span id="resetProgram">Tekrar</span><span id="codeTooltip">Oluşturulan JavaScript kodunu görüntüle.</span><span id="catLogic">Logic</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Procedures</span><span id="httpRequestError">İstek ile ilgili bir problem var.</span><span id="blocklyMessage">Blockly</span><span id="linkAlert">Bloklarını bu link ile paylaş:\n\n%1</span><span id="hashError">Üzgünüz, \'%1\' herhangi bir blok kaydı ile uyuşmuyor</span><span id="xmlError">Kaydedilen dosyanız yüklenemiyor\nBlockly\'nin önceki sürümü ile kaydedilmiş olabilir mi?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<style type="text/css">#dialog {visibility: hidden; background-color: #fff; color: #000; border: 1px solid #000; position: absolute; border-radius: 8px; box-shadow: 5px 5px 5px #888; padding: 10px;}#dialogBorder {visibility: hidden; position: absolute; background-color: #fff; color: #000; border: 1px solid #000; border-radius: 8px; box-shadow: 5px 5px 5px #888;}#dialogShadow {visibility: hidden; position: absolute; top: 0; left: 0; height: 100%; width: 100%; background-color: #000; opacity: 0.3}.dialogAnimate {transition-property: width height left top opacity; transition-duration: 0.2s;}.dialogHiddenContent {visibility: hidden; position: absolute; top: 0; left: 0; z-index: -1;}</style><div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button onclick="BlocklyApps.hideDialog(true)">TAMAM</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="httpRequestError">İstek ile ilgili bir problem var.</span><span id="linkAlert">Bloklarını bu link ile paylaş:\n\n%1</span><span id="hashError">Üzgünüz, \'%1\' herhangi bir blok kaydı ile uyuşmuyor</span><span id="xmlError">Kaydedilen dosyanız yüklenemiyor\nBlockly\'nin önceki sürümü ile kaydedilmiş olabilir mi?</span><span id="moveForward">ileri git</span><span id="turnLeft">sola dön</span><span id="turnRight">sağa dön</span><span id="doCode">yap</span><span id="elseCode">yoksa</span><span id="pathAhead">eğer önde yol varsa</span><span id="pathLeft">eğer solda yol varsa</span><span id="pathRight">eğer sağda yol varsa</span><span id="repeatUntil">kadar tekrar et</span><span id="moveForwardTooltip">Pegman\'i bir boşluk ileri götürür.</span><span id="turnTooltip">Pegman\'i sola veya sağa döndürür.</span><span id="ifTooltip">Eğer belirtilen yönde yol varsa, \\nbelirtilen hareketleri yap. </span><span id="ifelseTooltip">Eğer belirtilen yönde yol varsa, \\nbelirtilen hareketleri ilk bloğunu \\nyap, yoksa ikinci bloğu yap. </span><span id="whileTooltip">Bitiş noktasına ulaşana kadar kapsanan \\nhareketleri yap. </span><span id="capacity0">0 adet bloğun kaldı.</span><span id="capacity1">1 adet bloğun kaldı.</span><span id="capacity2">%1 adet bloğun kaldı.</span><span id="nextLevel">Tebrikler! %1. seviyeye geçmeye hazır mısın?</span><span id="finalLevel">Tebrikler! Son seviyeyi de tamamladın!</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Labirent</span> &nbsp; ';
  for (var i191 = 1; i191 < 11; i191++) {
    output += ' ' + ((i191 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i191) + '</span>' : (i191 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i191) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i191) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i191) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i191) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Program demek, bir ifadeler sıralaması demektir. Bir kaç \'ileri git\' bloğunu bir araya getirerek beni hedefe ulaştır.';
      break;
    case 2:
      output += 'Bu yolu izlemek için hangi adımları izlemeli?';
      break;
    case 3:
      output += 'Bilgisayarların sınırlı hafızaları vardır. Bu yüzden sende hedefe sadece iki blok kullanarak ulaşmalısın. \'tekrar\' bloğunu kullanarak aynı bloğu birden fazla kullanabilirsin.';
      break;
    case 4:
      output += 'Hedefe sadece beş blok kullanarak ulaş.';
      break;
    case 5:
      output += 'Pegman ileri gidemediğinden sola dönmeli.';
      break;
    case 6:
      output += 'Bir \'eğer\' koşulu ancak belirtilen koşul doğru oluyorsa birşeyler yapar. Eğer solda yol varsa sola dönmeyi dene.';
      break;
    case 7:
      output += 'Bu labirent öncekine göre daha karmaşık gözüküyor, ama aslında öyle değil.';
      break;
    case 8:
      output += 'Birden fazla \'eğer\' ifadesi kullanabilirsin.';
      break;
    case 9:
      output += 'Eğer-değilse ifadeleri ya bir şeyi ya da diğerini yapar.';
      break;
    case 10:
      output += 'Bu karmaşık labirenti de çözebilir misin? Soldaki duvarı dene. Sadece gelişmiş programcılar için!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="Oluşturulan JavaScript kodunu görüntüle." onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button class="notext" id="linkButton" title="Blokları ve bağlantı adresini kaydet." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();" title="Makes the character do what the blocks say."><img src="../../media/1x1.gif" class="run icon21"> Programı Çalıştır</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none" title=Put the character back at the start of the maze.><img src="../../media/1x1.gif" class="stop icon21"> Tekrar</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>Bu bölümde beyaz çalışma alanındaki bütün blokları bir araya getirmelisin.</div>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

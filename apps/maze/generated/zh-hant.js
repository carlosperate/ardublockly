// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">視覺化程式設計環境</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">查看產生的JavaScript程式碼。</span><span id="linkTooltip">儲存模組並提供連結。</span><span id="runTooltip">於工作區中運行模組所定義的程式。</span><span id="runProgram">運行程式</span><span id="resetProgram">重設</span><span id="dialogOk">確定</span><span id="dialogCancel">Cancel</span><span id="catLogic">邏輯</span><span id="catLoops">迴圈</span><span id="catMath">數學公式</span><span id="catText">文字</span><span id="catLists">列表</span><span id="catColour">顏色</span><span id="catVariables">變數</span><span id="catProcedures">程序</span><span id="httpRequestError">請求存在問題。</span><span id="linkAlert">以此連結分享您的模組：\n\n%1</span><span id="hashError">對不起，「%1」並未對應任何已保存的程式。</span><span id="xmlError">未能載入您保存的檔案。或許它是由其他版本的Blockly創建？</span><span id="listVariable">列表</span><span id="textVariable">文字</span></div>';
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
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">確定</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">向前移動</span><span id="Maze_turnLeft">左轉</span><span id="Maze_turnRight">右轉</span><span id="Maze_doCode">執行</span><span id="Maze_elseCode">或</span><span id="Maze_pathAhead">如前方有路</span><span id="Maze_pathLeft">如左方有路</span><span id="Maze_pathRight">如右方有路</span><span id="Maze_repeatUntil">重覆直至</span><span id="Maze_moveForwardTooltip">移前一步。</span><span id="Maze_turnTooltip">向左或右90度。</span><span id="Maze_ifTooltip">若某方向有路可行，就去執行某些動作。</span><span id="Maze_ifelseTooltip">若某方向有路可行，就去執行第一個模組指定的動作，若否，執行第二個模組指定的動作。.</span><span id="Maze_whileTooltip">重覆包含的動作直至到達終點。</span><span id="Maze_capacity0">你餘下<span id=\'capacityNumber\'>0</span>模組。</span><span id="Maze_capacity1">你餘下<span id=\'capacityNumber\'>1</span>模組。</span><span id="Maze_capacity2">你餘下<span id=\'capacityNumber\'>%1</span>模組。</span><span id="Maze_nextLevel">恭喜！準備好前進至第%1關了嗎？</span><span id="Maze_finalLevel">恭喜！你已完成最終關卡。</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : 迷宮</span> &nbsp; ';
  for (var i194 = 1; i194 < 11; i194++) {
    output += ' ' + ((i194 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i194) + '</span>' : (i194 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i194) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i194) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i194) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i194) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += '程或是由一系列模組組成。將數個「前移」模組堆砌起來以實現目標。';
      break;
    case 2:
      output += '要如何才可以沿著路徑走？';
      break;
    case 3:
      output += '電腦的記憶體有限。只使用兩個模組來到達此路徑的終點。使用「重覆」來再次運行該模組。';
      break;
    case 4:
      output += '僅使用五個模紅來到達終點。';
      break;
    case 5:
      output += '於無法直行時應該左轉。';
      break;
    case 6:
      output += '「若」模組只會於條件為真時執行。如果有一條向左的路徑，嘗試左右轉動。';
      break;
    case 7:
      output += '這個迷宮看起來比前一個更複雜，但實際上不是。';
      break;
    case 8:
      output += '您可以使用多於一個「若」模組。';
      break;
    case 9:
      output += '「若/或」模組可以於兩種事件中選擇。';
      break;
    case 10:
      output += '你能否解決這複雜迷宮？嘗試沿著左邊的牆壁。只限高級軟種件工程師 ！';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="查看產生的JavaScript程式碼。" onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" class="notext" title="儲存模組並提供連結。" onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="primary" onclick="Maze.runButtonClick();" title="讓人物按模組的指令工作。"><img src="../../media/1x1.gif" class="run icon21"> 運行程式</button><button id="resetButton" class="primary" onclick="Maze.resetButtonClick();" style="display: none" title="將人物放回迷宮開端。"><img src="../../media/1x1.gif" class="stop icon21"> 重設</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + '<div id="dialogDone" class="dialogHiddenContent"><div id="dialogDoneText" style="font-size: large; margin: 1em;"></div><img src="../../media/1x1.gif" id="pegSpin"><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>在這關，你需要於白色的工作區中堆疊所有模組。</div><iframe id="iframeOneTopBlock" src=""></iframe>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

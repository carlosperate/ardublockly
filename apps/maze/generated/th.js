// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="subtitle">a visual programming environment</span><span id="linkButton">บันทึกและเชื่อมโยงไปยังบล็อค</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">เรียกใช้โปรแกรม</span><span id="resetProgram"> ตั้งค่าใหม่</span><span id="codeTooltip">ดูโค้ด JavaScript ที่ถูกสร้างขึ้น.</span><span id="catLogic">Logic</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Procedures</span><span id="httpRequestError">มีปัญหาเกี่ยวกับการร้องขอ</span><span id="blocklyMessage">Blockly (บล็อค-ลี่)</span><span id="linkAlert">แบ่งปันบล็อคต่างๆของคุณด้วยลิงก์นี้:\n\n%1</span><span id="hashError">ขอโทษด้วย, \'%1\' ไม่สอดคล้องกับไฟล์ Blockly ที่บันทึกไว้</span><span id="xmlError">ไม่สามารถโหลดไฟล์ที่บันทึกไว้ของคุณได้\nบางทีมันอาจจะถูกสร้างขึ้นด้วย Blockly เวอร์ชันที่แตกต่างกัน?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<style type="text/css">#dialog {visibility: hidden; background-color: #fff; color: #000; border: 1px solid #000; position: absolute; border-radius: 8px; box-shadow: 5px 5px 5px #888; padding: 10px;}#dialogBorder {visibility: hidden; position: absolute; background-color: #fff; color: #000; border: 1px solid #000; border-radius: 8px; box-shadow: 5px 5px 5px #888;}#dialogShadow {visibility: hidden; position: absolute; top: 0; left: 0; height: 100%; width: 100%; background-color: #000; opacity: 0.3}.dialogAnimate {transition-property: width height left top opacity; transition-duration: 0.2s; transition-timing-function: linear;}.dialogHiddenContent {visibility: hidden; position: absolute; top: 0; left: 0; z-index: -1;}</style><div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">เคลื่อน ไปข้างหน้า</span><span id="Maze_turnLeft">หัน ซ้าย</span><span id="Maze_turnRight">หัน ขวา</span><span id="Maze_doCode">ทำ</span><span id="Maze_elseCode">นอกเหนือจากนี้</span><span id="Maze_pathAhead">ถ้า เส้นทาง ไปข้างหน้า</span><span id="Maze_pathLeft">ถ้า เส้นทาง ไปทางซ้าย</span><span id="Maze_pathRight">ถ้า เส้นทาง ไปทางขวา</span><span id="Maze_repeatUntil">ทำซ้ำจนกว่าจะ</span><span id="Maze_moveForwardTooltip">เคลื่อน Pegman ไปข้างหน้า หนึ่งช่อง.</span><span id="Maze_turnTooltip">หัน Pegman ไปทางซ้ายหรือขวา 90 องศา.</span><span id="Maze_ifTooltip">ถ้ามีเส้นทางไปทางทิศทางที่กำหนด \\nแล้วให้กระทำการบางอย่าง </span><span id="Maze_ifelseTooltip">ถ้ามีเส้นทางไปทางทิศทางที่ระบุ \\nแล้วให้ทำการกระทำต่างๆภายในบล็อคแรก \\nไม่เช่นนั้น ให้ทำการกระทำต่างๆภายในบล็อคที่สอง </span><span id="Maze_whileTooltip">ทำซ้ำทุกการกระทำภายใน จนกว่าจะถึงจุดสิ้นสุด.</span><span id="Maze_capacity0">คุณมีบล็อคเหลือ 0</span><span id="Maze_capacity1">คุณมีบล็อคเหลือ 1</span><span id="Maze_capacity2">คุณมีบล็อคเหลือ %1</span><span id="Maze_nextLevel">ยินดีด้วย! คุณพร้อมที่จะไปต่อที่ระดับ %1 แล้วหรือยัง?</span><span id="Maze_finalLevel">ยินดีด้วย! คุณได้ไขปัญหาในระดับสุดท้ายสำเร็จแล้ว</span><span id="Maze_oneTopBlock">ในระดับนี้ คุณต้องต่อทุกบล็อคเข้าด้วยกันบนพื้นที่ว่างสีขาว</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly (บล็อค-ลี่)</a> : เขาวงกต</span> &nbsp; ';
  for (var i183 = 1; i183 < 11; i183++) {
    output += ' ' + ((i183 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i183) + '</span>' : (i183 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i183) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i183) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i183) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i183) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'โปรแกรม คือ ลำดับของคำสั่งหลายๆคำสั่ง -> ต่อบล็อค \'เคลื่อน ไปข้างหน้า\' สองอันเข้าด้วยกัน เพื่อช่วยให้ฉันถึงจุดหมายปลายทาง';
      break;
    case 2:
      output += 'ลำดับขั้นตอนเพื่อไปตามเส้นทางนี้คืออะไร?';
      break;
    case 3:
      output += 'คอมพิวเตอร์มีหน่วยความจำที่จำกัด -> ไปให้ถึงปลายทางนี้โดยใช้เพียงสองบล็อค -> ใช้ \'ทำซ้ำ\' เพื่อเรียกใช้บล็อคมากกว่าหนึ่งครั้ง';
      break;
    case 4:
      output += 'ถึงจุดหมายปลายทางโดยใช้เพียงห้าบล็อค';
      break;
    case 5:
      output += 'Pegman will have to turn left when he cannot go straight.';
      break;
    case 6:
      output += 'เงื่อนไข \'ถ้า\' จะทำอะไรบางอย่างก็ต่อเมื่อเงื่อนไขเป็นจริงเท่านั้น -> ลองหันซ้ายถ้ามีเส้นทางไปทางซ้าย';
      break;
    case 7:
      output += 'เขาวงกตนี้ดูเหมือนจะซับซ้อนกว่าอันก่อนหน้านี้ -> แต่เปล่าเลย';
      break;
    case 8:
      output += 'คุณสามารถใช้ คำสั่ง \'ถ้า\' ได้มากกว่าหนึ่ง';
      break;
    case 9:
      output += 'คำสั่ง \'ถ้า-นอกเหนือจากนี้\' จะทำสิ่งหนึ่ง หรือ อื่นๆ';
      break;
    case 10:
      output += 'คุณสามารถไขปัญหาเขาวงกตที่ซับซ้อนนี้ได้หรือไม่? -> ลองตามผนังด้านซ้ายมือดู';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="ดูโค้ด JavaScript ที่ถูกสร้างขึ้น." onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button class="notext" id="linkButton" title="บันทึกและเชื่อมโยงไปยังบล็อค" onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();" title="Makes the character do what the blocks say."><img src="../../media/1x1.gif" class="run icon21"> เรียกใช้โปรแกรม</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none" title="Put the character back at the start of the maze."><img src="../../media/1x1.gif" class="stop icon21">  ตั้งค่าใหม่</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>ในระดับนี้ คุณต้องต่อทุกบล็อคเข้าด้วยกันบนพื้นที่ว่างสีขาว</div><iframe id="iframeOneTopBlock" src=""></iframe>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

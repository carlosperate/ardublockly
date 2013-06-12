// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="MSG" style="display:none"><span id="moveForward">เคลื่อน ไปข้างหน้า</span><span id="turnLeft">หัน ซ้าย</span><span id="turnRight">หัน ขวา</span><span id="doCode">ทำ</span><span id="elseCode">นอกเหนือจากนี้</span><span id="pathAhead">ถ้า เส้นทาง ไปข้างหน้า</span><span id="pathLeft">ถ้า เส้นทาง ไปทางซ้าย</span><span id="pathRight">ถ้า เส้นทาง ไปทางขวา</span><span id="repeatUntil">ทำซ้ำจนกว่าจะ</span><span id="moveForwardTooltip">เคลื่อน Pegman ไปข้างหน้า หนึ่งช่อง.</span><span id="turnTooltip">หัน Pegman ไปทางซ้ายหรือขวา 90 องศา.</span><span id="ifTooltip">ถ้ามีเส้นทางไปทางทิศทางที่กำหนด \\nแล้วให้กระทำการบางอย่าง </span><span id="ifelseTooltip">ถ้ามีเส้นทางไปทางทิศทางที่ระบุ \\nแล้วให้ทำการกระทำต่างๆภายในบล็อคแรก \\nไม่เช่นนั้น ให้ทำการกระทำต่างๆภายในบล็อคที่สอง </span><span id="whileTooltip">ทำซ้ำทุกการกระทำภายใน จนกว่าจะถึงจุดสิ้นสุด.</span><span id="capacity0">คุณมีบล็อคเหลือ 0</span><span id="capacity1">คุณมีบล็อคเหลือ 1</span><span id="capacity2">คุณมีบล็อคเหลือ %1</span><span id="nextLevel">ยินดีด้วย! คุณพร้อมที่จะไปต่อที่ระดับ %1 แล้วหรือยัง?</span><span id="finalLevel">ยินดีด้วย! คุณได้ไขปัญหาในระดับสุดท้ายสำเร็จแล้ว</span><span id="oneTopBlock">ในระดับนี้ คุณต้องต่อทุกบล็อคเข้าด้วยกันบนพื้นที่ว่างสีขาว</span></div><table width="100%" height="100%"><tr height="50"><td colspan=2><h1><a href="../index.html"><span id="blocklyName">Blockly</span></a> &gt; <span id="maze">เขาวงกต</span>&nbsp;';
  for (var i103 = 1; i103 < 11; i103++) {
    output += ' ' + ((i103 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i103) + '</span>' : (i103 < opt_ijData.level) ? '<a class="tab previous" href="?level=' + soy.$$escapeHtml(i103) + '">' + soy.$$escapeHtml(i103) + '</a>' : '<a class="tab" href="?level=' + soy.$$escapeHtml(i103) + '">' + soy.$$escapeHtml(i103) + '</a>');
  }
  output += '</h1></td></tr><tr><td width="410" valign="top"><div style="position: relative"><div id="hintBubble"><div id="hint">';
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
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="100%"><tr><td style="width: 190px; text-align: center"><button title="ดูโค้ด JavaScript ที่ถูกสร้างขึ้น." onclick="Blockly.Apps.showCode();"><img src=\'../../media/1x1.gif\' class="code"></button><button id="linkButton" title="บันทึกและเชื่อมโยงไปยังบล็อค" onclick="BlocklyStorage.link();"><img src=\'../../media/1x1.gif\' class="link"></button><button id="randomizeButton" title="ทำการสุ่ม จุดเริ่มต้น และจุดสิ้นสุด. onclick="Maze.randomizeMarkers();" style="display: none"><img src=\'../../media/1x1.gif\' class="random"></button></td><td style="width: 15px;"><img id="spinner" style="visibility: hidden;" src="loading.gif" height=15 width=15></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();">เรียกใช้โปรแกรม</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none"> ตั้งค่าใหม่</button></td></tr></table></td><td valign="top"><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../generators/javascript.js"><\/script><script type="text/javascript" src="../common.js"><\/script><script type="text/javascript">Blockly.Apps.loadLanguageScripts(languageSrc);<\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></td></tr></table>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

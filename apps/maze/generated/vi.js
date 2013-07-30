// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="MSG" style="display: none"><span id="moveForward">đi tới</span><span id="turnLeft">quay qua trái</span><span id="turnRight">quay qua phải</span><span id="doCode">hãy</span><span id="elseCode">nếu không</span><span id="pathAhead">nếu có đường phía trước</span><span id="pathLeft">nếu có đường bên trái</span><span id="pathRight">nếu có đường bên phải</span><span id="repeatUntil">lặp lại cho đến</span><span id="moveForwardTooltip">Di chuyển Pegman tới một bước. </span><span id="turnTooltip">Quay Pegman qua bên trái hoặc bên phải 90 độ.</span><span id="ifTooltip">Nếu có đường ở hướng đấy, hãy thực hiện các lệnh \\nđưa ra. </span><span id="ifelseTooltip">Nếu có đường ở hướng đấy, hãy thực hiện các lệnh \\nthứ nhất. Nếu không, thực hiện các lệnh thứ hai. </span><span id="whileTooltip">Thực hiện các lệnh được bao gồm cho đến khi đến \\nđích </span><span id="capacity0">Bạn còn 0 mảnh.</span><span id="capacity1">Bạn còn 1 mảnh.</span><span id="capacity2">Bạn còn %1 mảnh.</span><span id="nextLevel">Chúc mừng! Bạn đã sẵn sàng qua vòng %1?</span><span id="finalLevel">Chúc mừng! Bạn đã giải xong vòng cuối cùng.</span><span id="oneTopBlock">Ở vòng này, bạn cần gắn chồng các mảnh lệnh lên nhau trong khoảng trắng (còn được gọi là sân chơi) để tạo chuỗi mệnh lệnh cần thiết.</span></div><div id="COMMON_MSG" style="display: none"><span id="httpRequestError">Hoạt động bị trục trặc, không thực hiện được yêu cầu của bạn.</span><span id="linkAlert">Dùng liên kết này để chia sẽ chương trình của bạn:\n\n%1</span><span id="hashError">Không tìm thấy chương trình được lưu ở \'%1\'.</span><span id="xmlError">Không mở được chương trình của bạn.  Có thể nó nằm trong một phiên bản khác của Blockly?</span></div><table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Ma trận</span> &nbsp; ';
  for (var i118 = 1; i118 < 11; i118++) {
    output += ' ' + ((i118 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i118) + '</span>' : (i118 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i118) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i118) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i118) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i118) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Một chương trình là một chuỗi các lệnh. Chồng hai mảnh \'đi tới\' lên nhau để giúp tớ đến đích.';
      break;
    case 2:
      output += 'Chuỗi lệnh gì sẽ giải ma trận này?';
      break;
    case 3:
      output += 'Bộ nhớ của máy vi tính có hạn. Ở vòng này bạn chỉ được dùng hai mảnh để đến đích. Mảnh \'lặp lại\' sẽ chạy một lệnh nhiều lần.';
      break;
    case 4:
      output += 'Để giải ma trận này, bạn chỉ được dùng năm mảnh.';
      break;
    case 5:
      output += 'Pegman will have to turn left when he cannot go straight.';
      break;
    case 6:
      output += 'Mảnh \'nếu [điều kiện]\' nhìn vào điều kiện rồi chỉ thực hiện lệnh nếu có điều kiện ấy. Hãy thử rẽ trái nếu có đường bên trái.';
      break;
    case 7:
      output += 'Ma trận này nhìn rắc rối hơn cái trước, nhưng thực sự chúng cũng khá giống nhau.';
      break;
    case 8:
      output += 'Bạn có thể dùng hơn một mảnh \'nếu...\', để xử lý nhiều điều kiện khác nhau.';
      break;
    case 9:
      output += 'Mảnh \'nếu-nếu không\' sẽ giúp bạn. Nó sẽ thực hiện một trong hai lệnh hoặc nhóm lệnh đưa ra. Lệnh ở \'nếu không\' chỉ chạy khi điều kiện ấy không có thật.';
      break;
    case 10:
      output += 'Bạn có thể giải cái ma trận rắc rối này? Gợi ý: Thử đi sát theo một bức tường, y như bạn đang giữ một tay theo suốt bức tường ấy, dù nó rẻ phải hay trái.';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button title="Xem code theo ngôn ngữ JavaScript." onclick="BlocklyApps.showCode();"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" title="Lưu và lấy liên kết." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();" title="Makes the character do what the blocks say."><img src="../../media/1x1.gif" class="run icon21"> Chạy</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none" title=Put the character back at the start of the maze.><img src="../../media/1x1.gif" class="stop icon21"> Về Điểm Khởi Đầu</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

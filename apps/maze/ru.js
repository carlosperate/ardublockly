// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="MSG" style="display: none"><span id="moveForward">идите вперёд</span><span id="turnLeft">повернитесь налево</span><span id="turnRight">повернитесь направо</span><span id="doCode">сделайте </span><span id="elseCode">иначе</span><span id="pathAhead">если путь впереди</span><span id="pathLeft">если путь cлева</span><span id="pathRight">если путь cправа</span><span id="repeatUntil">повторяйте пока не</span><span id="moveForwardTooltip">Продвиньте Пегмена вперёд на один шаг.</span><span id="turnTooltip">Поверните Пегмена на 90 градусов влево или вправо.</span><span id="ifTooltip">Если путь в указанном направление действителен, \\nто произведите какие-нибудь действия. </span><span id="ifelseTooltip">Если путь в указанном направление действителен, \\nто произведите первый блок действий . \\nИначе, произведите второй блок действий. </span><span id="whileTooltip">Повторяйте действия заключенные в скобках до \\nдостижения конечной точки. </span><span id="capacity0">У вас осталось 0 блоков.</span><span id="capacity1">У вас осталось 1 блоков.</span><span id="capacity2">У вас осталось %1 блоков.</span><span id="nextLevel">Поздравляем! Вы готовы перейти на уровень%1?</span><span id="finalLevel">Поздравляем! Вы прошли заключительный уровень.</span><span id="oneTopBlock">На данном уровне вам необходимо сложить вместе все блоки на белом рабочем поле.</span></div><table width="100%" height="100%"><tr height="50"><td colspan=3><div style="display: none;" id="farSide"><select id="languageMenu" onchange="Maze.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></div><h1><span id="title"><a href="../index.html"><span id="blocklyName">Blockly</span></a> : Лабиринт</span> &nbsp; ';
  for (var i103 = 1; i103 < 11; i103++) {
    output += ' ' + ((i103 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i103) + '</span>' : (i103 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i103) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i103) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i103) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i103) + '</a>');
  }
  output += '</h1></td></tr><tr><td width="400" valign="top"><div style="position: relative"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Программа-это последовательность выполняемых операций. Сгруппируйте несколько \'идите вперёд\' блоков, чтобы помочь мне достичь цели.';
      break;
    case 2:
      output += 'Какие шаги надо принять, чтобы пройти этот путь?';
      break;
    case 3:
      output += 'Память компьютеров ограничена. Пройдите до конца этого пути, используя только два блока. Для запуска блока более одного раза используйте команду \'повтор\'.';
      break;
    case 4:
      output += 'Дойдите до цели, используя только пять блоков.';
      break;
    case 5:
      output += 'Если Пегмен не может пройти прямо, то он должен будет повернуть налево.';
      break;
    case 6:
      output += 'Команда \'если\' будет выполнена только в случае верного условия. Попробуйте повернуть налево, если путь влево доступен.';
      break;
    case 7:
      output += 'Этот лабиринт кажется намного сложнее предыдущего, но это не так.';
      break;
    case 8:
      output += 'Вы можете использовать команду \'если\' несколько раз.';
      break;
    case 9:
      output += 'Команда \'если-иначе\' выполнит одно или другое действие.';
      break;
    case 10:
      output += 'Можете ли вы решить этот сложный лабиринт? Попробуйте придерживаться левой стены.';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="100%"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button title="См. полученный код JavaScript. " onclick="BlocklyApps.showCode();"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" title="Сохраните и закрепите за блоком." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();"><img src="../../media/1x1.gif" class="run icon21"> Запустить Программу</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none"><img src="../../media/1x1.gif" class="stop icon21"> Сбросить</button></td></tr></table></td><td width=5></td><td valign="top"><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></td></tr></table><div id="pegmanMenu"></div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

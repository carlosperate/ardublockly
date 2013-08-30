// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">візуальне середовище програмування</span><span id="blocklyMessage">Blockly (Блоклі)</span><span id="codeTooltip">Див. згенерований код JavaScript. </span><span id="linkTooltip">Зберегти і пов\'язати з блоками.</span><span id="runTooltip">Запустіть програму, визначену блоками у робочій \\nобласті. </span><span id="runProgram">Запустити програму</span><span id="resetProgram">Очистити</span><span id="dialogOk">OK</span><span id="dialogCancel">Скасувати</span><span id="catLogic">Логіка</span><span id="catLoops">Петлі</span><span id="catMath">Математика</span><span id="catText">Текст</span><span id="catLists">Списки</span><span id="catColour">Колір</span><span id="catVariables">Змінні</span><span id="catProcedures">Процедури</span><span id="httpRequestError">Виникла проблема із запитом.</span><span id="linkAlert">Поділитися вашим блоками через посилання:\n\n%1</span><span id="hashError">На жаль, "%1" не відповідає жодній збереженій програмі.</span><span id="xmlError">Не вдалося завантажити ваш збережений файл.  Можливо, він був створений з іншої версії Blockly?</span><span id="listVariable">список</span><span id="textVariable">текст</span></div>';
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
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">рух вперед</span><span id="Maze_turnLeft">поворот вліво</span><span id="Maze_turnRight">поворот вправо</span><span id="Maze_doCode">зробити</span><span id="Maze_elseCode">інше</span><span id="Maze_pathAhead">якщо шлях попереду</span><span id="Maze_pathLeft">якщо шлях наліво</span><span id="Maze_pathRight">якщо шлях праворуч</span><span id="Maze_repeatUntil">повторити, поки</span><span id="Maze_moveForwardTooltip">Переміщує гравця вперед на одне місце.</span><span id="Maze_turnTooltip">Повертає гравця ліворуч або праворуч на 90 \\nградусів. </span><span id="Maze_ifTooltip">Якщо існує шлях у вказаному напрямку, \\nпотім виконати певні дії. </span><span id="Maze_ifelseTooltip">Якщо існує шлях у вказаному напрямку, \\nпотім зробіть перший блок заходів. \\nВ іншому випадку, зробіть другий блок \\nзаходів. </span><span id="Maze_whileTooltip">Повторювати закриті дії, поки кінцева точка не \\nдосягнеться. </span><span id="Maze_capacity0">У вас лишилося <span id=\'capacityNumber\'>0</span> блоків.</span><span id="Maze_capacity1">У вас лишився <span id=\'capacityNumber\'>1</span> блок.</span><span id="Maze_capacity2">У вас лишилося <span id=\'capacityNumber\'>%1</span> блоків.</span><span id="Maze_nextLevel">Вітаємо! Ви готові приступити до рівня %1?</span><span id="Maze_finalLevel">Вітаємо! Ви розв\'язали фінальний рівень.</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly (Блоклі)</a> : Лабіринт</span> &nbsp; ';
  for (var i194 = 1; i194 < 11; i194++) {
    output += ' ' + ((i194 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i194) + '</span>' : (i194 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i194) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i194) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i194) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i194) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Складайте кілька блоків рухом вперед разом, щоб допомогти мені досягти мети.';
      break;
    case 2:
      output += 'Яка послідовність кроків, щоб йти цим шляхом?';
      break;
    case 3:
      output += 'Комп\'ютери мають обмежену пам\'ять. Дійдіть до кінця цього шляху, використовуючи всього два блоки. Використовуйте \'repeat\', щоб запустити блок більше, ніж один раз.';
      break;
    case 4:
      output += 'Досягніть мети, використовуючи тільки п\'ять блоків.';
      break;
    case 5:
      output += 'Розбиття проблеми на дві частини може зробити речі легшими.';
      break;
    case 6:
      output += 'Блок „якщо“ буде робити щось, лише якщо ця умова є істинною.  Спробуйте поворот вліво, якщо існує шлях ліворуч.';
      break;
    case 7:
      output += 'Цей лабіринт виглядає складнішим, ніж попередній, але це не так.';
      break;
    case 8:
      output += 'Ви можете використовувати більше одного блоку \'якщо\'.';
      break;
    case 9:
      output += 'Блоки „якщо-інакше“ будуть робити одне або інше.';
      break;
    case 10:
      output += 'Ви можете вирішити цей складний лабіринт?  Спробуйте скористатися наведеною лівосторонньою стіною.  Тільки для досвідчених програмістів!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="Див. згенерований код JavaScript. " onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" class="notext" title="Зберегти і пов\'язати з блоками." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="primary" onclick="Maze.runButtonClick();" title="Гравець робить усе, що кажуть блоки."><img src="../../media/1x1.gif" class="run icon21"> Запустити програму</button><button id="resetButton" class="primary" onclick="Maze.resetButtonClick();" style="display: none" title="Покладіть гравця назад в початок лабіринту."><img src="../../media/1x1.gif" class="stop icon21"> Очистити</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + '<div id="dialogDone" class="dialogHiddenContent"><div id="dialogDoneText" style="font-size: large; margin: 1em;"></div><img src="../../media/1x1.gif" id="pegSpin"><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>На цьому рівні, вам необхідно скласти разом всі блоки в білій робочій області.</div><iframe id="iframeOneTopBlock" src=""></iframe>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

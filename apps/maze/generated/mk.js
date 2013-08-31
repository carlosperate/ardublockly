// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">визуелна околина за програмирање</span><span id="blocklyMessage">Блокли</span><span id="codeTooltip">Погл. создадениот JavaScript-код. </span><span id="linkTooltip">Зачувај и стави врска до блокчињата.</span><span id="runTooltip">Пушти го програмот определен од блокчињата во \\nработниот простор. </span><span id="runProgram">Пушти го програмот</span><span id="resetProgram">Одново</span><span id="dialogOk">ОК</span><span id="dialogCancel">Откажи</span><span id="catLogic">Логика</span><span id="catLoops">Јамки</span><span id="catMath">Математика</span><span id="catText">Текст</span><span id="catLists">Списоци</span><span id="catColour">Боја</span><span id="catVariables">Променливи</span><span id="catProcedures">Процедури</span><span id="httpRequestError">Се појави проблем во барањето.</span><span id="linkAlert">Споделете ги вашите блокчиња со оваа врска:\n\n%1</span><span id="hashError">„%1“ не одговара на ниеден зачуван програм.</span><span id="xmlError">Не можев да ја вчитам зачуваната податотека. Да не сте ја создале со друга верзија на Blockly?</span><span id="listVariable">список</span><span id="textVariable">текст</span></div>';
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
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">ОК</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">мрдни напред</span><span id="Maze_turnLeft">сврти лево</span><span id="Maze_turnRight">сврти десно</span><span id="Maze_doCode">изведи</span><span id="Maze_elseCode">инаку</span><span id="Maze_pathAhead">ако има пат напред</span><span id="Maze_pathLeft">ако има пат лево</span><span id="Maze_pathRight">ако има пат десно</span><span id="Maze_repeatUntil">повторувај сè до</span><span id="Maze_moveForwardTooltip">Го мрднува играчот напред за едно место.</span><span id="Maze_turnTooltip">Го свртува играчот на лево или на десно за 90 \\nстепени. </span><span id="Maze_ifTooltip">Ако постои патека во зададената насока, \\nтогаш изврши некои дејства. </span><span id="Maze_ifelseTooltip">Ако постои патека во зададената насока, \\nтогаш изврши го првиот блок дејства. \\nВо спротивно, изврши го вториот. </span><span id="Maze_whileTooltip">Повторувај ги зададените дејства додека дојдеш \\nдо целта (крајот). </span><span id="Maze_capacity0">Ви преостануваат %0 блокчиња.</span><span id="Maze_capacity1">Ви преостанува %1 блокче.</span><span id="Maze_capacity2">Имате уште %2 блокчиња.</span><span id="Maze_nextLevel">Честитаме! Дали сте да преминете на Ниво %1?</span><span id="Maze_finalLevel">Честитаме! Го решивте последното ниво.</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Блокли</a> : Лавиринт</span> &nbsp; ';
  for (var i158 = 1; i158 < 11; i158++) {
    output += ' ' + ((i158 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i158) + '</span>' : (i158 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i158) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i158) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i158) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i158) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Наредете две блокчиња „оди напред“ за да ми помогнете да дојдам до целта.';
      break;
    case 2:
      output += 'Со која низа чекори можеме да ја проследиме патекава?';
      break;
    case 3:
      output += 'Сметачите имаат ограничена меморија. Дојдете до крајот на со помош на само два блока. Послужете се со „повтори“ за да пуштите едно блокче повеќе пати.';
      break;
    case 4:
      output += 'Стигнете до целта со само пет блокчиња.';
      break;
    case 5:
      output += 'Ќе ви биде полесно ако го поделите проблемот на два дела.';
      break;
    case 6:
      output += 'Блокчето „ако“ ќе изврши нешто само ако условот е точен. На пример, свртете лево ако има патека натаму.';
      break;
    case 7:
      output += 'Овој лавиринт изгледа посложен од претходниот, но не е.';
      break;
    case 8:
      output += 'Можете да употребите повеќе од едно блокче „ако“.';
      break;
    case 9:
      output += 'Блокчињата „ако-тогаш“ ќе извршат или едно нешто или друго.';
      break;
    case 10:
      output += 'Дали можете да го решите овој сложен лавиринт? Обидете се со следниов ѕид на лево. Само за напредни програмери!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="Погл. создадениот JavaScript-код. " onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" class="notext" title="Зачувај и стави врска до блокчињата." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="primary" onclick="Maze.runButtonClick();" title="Му кажува на играчот да прави како што велат \\nблокчињата. "><img src="../../media/1x1.gif" class="run icon21"> Пушти го програмот</button><button id="resetButton" class="primary" onclick="Maze.resetButtonClick();" style="display: none" title="Врати го играчот на почетокот од лавиринтот."><img src="../../media/1x1.gif" class="stop icon21"> Одново</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + '<div id="dialogDone" class="dialogHiddenContent"><div id="dialogDoneText" style="font-size: large; margin: 1em;"></div><img src="../../media/1x1.gif" id="pegSpin"><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>На ова ниво ќе треба да ги наредите сите блокчиња во белиот работен простор.</div><iframe id="iframeOneTopBlock" src=""></iframe>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};

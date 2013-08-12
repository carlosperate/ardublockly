// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.start = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="subtitle">Ένα οπτικό περιβάλλον προγραμματισμού</span><span id="linkButton">Αποθήκευση και σύνδεσμος στα μπλοκ.</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Εκτέλεση Προγράμματος</span><span id="resetProgram">Επανεκκίνηση</span><span id="codeTooltip">Δες τον κώδικα JavaScript που δημιουργήθηκε.</span><span id="linkButton">Αποθήκευση και σύνδεσμος στα μπλοκ.</span><span id="catLogic">Logic</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Procedures</span><span id="httpRequestError">Υπήρξε πρόβλημα με το αίτημα.</span><span id="blocklyMessage">Blockly (Μπλοκλι)</span><span id="linkAlert">Μοιράσου τα blocks σου με αυτό το σύνδεσμο:\n\n%1</span><span id="hashError">Λυπάμαι, το \'%1\' δεν αντιστοιχεί σε κανένα αποθηκευμένο αρχείο Μπλόκλι.</span><span id="xmlError">Δεν μπορώ να φορτώσω το αποθηκευμένο αρχείο σου.  Μήπως δημιουργήθηκε από μία παλιότερη έκδοση του Μπλόκλι.</span><span id="listVariable">list</span><span id="textVariable">text</span></div>' + codepage.start(null, null, opt_ijData) + graphpage.start(null, null, opt_ijData) + mazepage.start(null, null, opt_ijData) + planepage.start(null, null, opt_ijData) + puzzlepage.start(null, null, opt_ijData) + turtlepage.start(null, null, opt_ijData) + ok(null, null, opt_ijData);
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<style type="text/css">#dialog {visibility: hidden; background-color: #fff; color: #000; border: 1px solid #000; position: absolute; border-radius: 8px; box-shadow: 5px 5px 5px #888; padding: 10px;}#dialogBorder {visibility: hidden; position: absolute; background-color: #fff; color: #000; border: 1px solid #000; border-radius: 8px; box-shadow: 5px 5px 5px #888;}#dialogShadow {visibility: hidden; position: absolute; top: 0; left: 0; height: 100%; width: 100%; background-color: #000; opacity: 0.3}.dialogAnimate {transition-property: width height left top opacity; transition-duration: 0.2s;}.dialogHiddenContent {visibility: hidden; position: absolute; top: 0; left: 0; z-index: -1;}</style><div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="httpRequestError">Υπήρξε πρόβλημα με το αίτημα.</span><span id="linkAlert">Μοιράσου τα blocks σου με αυτό το σύνδεσμο:\n\n%1</span><span id="hashError">Λυπάμαι, το \'%1\' δεν αντιστοιχεί σε κανένα αποθηκευμένο αρχείο Μπλόκλι.</span><span id="xmlError">Δεν μπορώ να φορτώσω το αποθηκευμένο αρχείο σου.  Μήπως δημιουργήθηκε από μία παλιότερη έκδοση του Μπλόκλι.</span><span id="moveForward">προχώρησε</span><span id="turnLeft">στρίψε αριστερά</span><span id="turnRight">στρίψε δεξιά</span><span id="doCode">κάνε</span><span id="elseCode">ειδάλλως</span><span id="pathAhead">εαν υπάρχει μονοπάτι μπροστά</span><span id="pathLeft">εαν υπάρχει μονοπάτι προς τα αριστερά</span><span id="pathRight">εαν υπάρχει μονοπάτι προς τα δεξιά</span><span id="repeatUntil">επανάλαβε μέχρι</span><span id="moveForwardTooltip">Κινεί το ανθρωπάκι μία θέση μπροστά.</span><span id="turnTooltip">Το ανθρωπάκι στρίβει αριστερά ή δεξιά κατά 90 \\nμοίρες. </span><span id="ifTooltip">Αν υπάρχει ένα μονοπάτι προς τη προσδιορισμένη \\nκατεύθυνση, τότε κάνε μερικές δουλειές. </span><span id="ifelseTooltip">Αν υπάρχει ένα μονοπάτι προς τη προσδιορισμένη \\nκατεύθυνση, τότε κάνε το πρώτο block από δουλειές. \\nΕιδάλλως, κάνε το δεύτερο block από δουλειές. </span><span id="whileTooltip">Επανέλαβε τις περικλειόμενες εργασίες until \\nfinish point is reached. </span><span id="capacity0">Έχεις άλλα 0 blocks ακόμα.</span><span id="capacity1">Έχεις άλλα 1 block ακόμα.</span><span id="capacity2">Έχεις άλλα %1 blocks ακόμα.</span><span id="nextLevel">Συγχαρητήρια! Θα προχωρήσεις στο επίπεδο %1?</span><span id="finalLevel">Congratulations! Έλυσες το τελευταίο επίπεδο.</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly (Μπλοκλι)</a> : Λαβύρινθος</span> &nbsp; ';
  for (var i201 = 1; i201 < 11; i201++) {
    output += ' ' + ((i201 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i201) + '</span>' : (i201 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i201) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i201) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i201) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i201) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Το πρόγραμμα είναι μια ακολουθία από εντολές. Στοίβαξε δύο μπλοκ \'προχώρησε\' για να φτάσω στο τέρμα.';
      break;
    case 2:
      output += 'Ποια είναι η ακολουθία των βημάτων που πρέπει να ακολουθήσω σε αυτό το μονοπάτι;';
      break;
    case 3:
      output += 'Οι υπολογιστές έχουν περιορισμένη μνήμη. Προσπάθησε να φτάσεις στο τέλος του μονοπατιού χρησιμοποιώντας μόνο δύο μπλοκ. Χρησιμοποίησε το μπλοκ \'επανέλαβε\' για να τρέξεις το μπλοκ που θέλεις περισσότερες φορές.';
      break;
    case 4:
      output += 'Φτάσε στο τέρμα χρησιμοπιώντας μόνο πέντε μπλοκ';
      break;
    case 5:
      output += 'Το ανθρωπάκι πρέπει να στρίψει αριστερά όταν δεν μπορεί να πάει μπροστά.';
      break;
    case 6:
      output += 'Μια συνθήκη \'εάν\' θα εκτελέσει κάτι μόνο αν είναι αληθής. Προσπάθησε να στρίψεις αριστερά, εάν υπάρχει μονοπάτι προς τα αριστερά.';
      break;
    case 7:
      output += 'Αυτός ο λαβύρινθος φαίνεται πιο περίπλοκος από τον προηγούμενο, αλλά δεν είναι.';
      break;
    case 8:
      output += 'Μπορείς να χρησιμοποιήσεις περισσότερα από ένα μπλοκ \'εάν\'.';
      break;
    case 9:
      output += 'Τα μπλοκ \'εάν...ειδάλλως\' θα κάνουν είτε το ένα είτε το άλλο.';
      break;
    case 10:
      output += 'Μπορείς να επιλύσεις αυτόν τον περίπλοκο λαβύρινθο; Προσπάθησε να ακολουθήσεις τον αριστερό τοίχο. Μόνο προχωρημένοι προγραμματιστές!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="Δες τον κώδικα JavaScript που δημιουργήθηκε." onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button class="notext" id="linkButton" title="Αποθήκευση και σύνδεσμος στα μπλοκ." onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();" title="Makes the character do what the blocks say."><img src="../../media/1x1.gif" class="run icon21"> Εκτέλεση Προγράμματος</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none" title=Put the character back at the start of the maze.><img src="../../media/1x1.gif" class="stop icon21"> Επανεκκίνηση</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>Σε αυτό το επίπεδο, πρέπει να στοιβάξεις όλα τα blocks στο λευκό χώρο εργασίας.</div>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="MSG" style="display:none"><span id="fullTitle">Ο Λαβύρινθος του Μπλοκλι (Blockly)</span><span id="moveForward">προχώρησε</span><span id="turnLeft">στρίψε αριστερά</span><span id="turnRight">στρίψε δεξιά</span><span id="doCode">κάνε</span><span id="elseCode">ειδάλλως</span><span id="pathAhead">εαν υπάρχει μονοπάτι μπροστά</span><span id="pathLeft">εαν υπάρχει μονοπάτι προς τα αριστερά</span><span id="pathRight">εαν υπάρχει μονοπάτι προς τα δεξιά</span><span id="repeatUntil">επανάλαβε μέχρι</span><span id="moveForwardTooltip">Κινεί το ανθρωπάκι μία θέση μπροστά.</span><span id="turnTooltip">Το ανθρωπάκι στρίβει αριστερά ή δεξιά κατά 90 \\nμοίρες. </span><span id="ifTooltip">Αν υπάρχει ένα μονοπάτι προς τη προσδιορισμένη \\nκατεύθυνση, τότε κάνε μερικές δουλειές. </span><span id="ifelseTooltip">Αν υπάρχει ένα μονοπάτι προς τη προσδιορισμένη \\nκατεύθυνση, τότε κάνε το πρώτο block από δουλειές. \\nΕιδάλλως, κάνε το δεύτερο block από δουλειές. </span><span id="whileTooltip">Επανέλαβε τις περικλειόμενες εργασίες until \\nfinish point is reached. </span><span id="capacity0">Έχεις άλλα 0 blocks ακόμα.</span><span id="capacity1">Έχεις άλλα 1 block ακόμα.</span><span id="capacity2">Έχεις άλλα %1 blocks ακόμα.</span><span id="nextLevel">Συγχαρητήρια! Θα προχωρήσεις στο επίπεδο %1?</span><span id="finalLevel">Congratulations! Έλυσες το τελευταίο επίπεδο.</span><span id="oneTopBlock">Σε αυτό το επίπεδο, πρέπει να στοιβάξεις όλα τα blocks στο λευκό χώρο εργασίας.</span><span id="fullTitle">Ο Λαβύρινθος του Μπλοκλι (Blockly)</span></div><table width="100%" height="100%"><tr><td width="410" valign="top"><h1><a href="http://blockly.googlecode.com/">Blockly</a> &gt; <a href="../index.html">Apps</a> &gt; Λαβύρινθος</h1><div>Επίπεδο &nbsp;';
  for (var i112 = 1; i112 < 11; i112++) {
    output += (i112 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i112) + '</span>' : '<a class="tab" href="?level=' + soy.$$escapeHtml(i112) + '">' + soy.$$escapeHtml(i112) + '</a>';
  }
  output += '</div><div style="position: relative"><div id="hintBubble"><div id="hint">';
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
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="100%"><tr><td style="width: 190px; text-align: center"><button title="Δες τον κώδικα JavaScript που δημιουργήθηκε." onclick="Blockly.Apps.showCode();"><img src=\'../../media/1x1.gif\' class="code"></button><button id="linkButton" title="Αποθήκευση και σύνδεσμος στα μπλοκ." onclick="BlocklyStorage.link();"><img src=\'../../media/1x1.gif\' class="link"></button><button id="randomizeButton" title="Δημιουγία τυχαίων σημείων αφετηρίας και \\nτερματισμού.  onclick="Maze.randomizeMarkers();" style="display: none"><img src=\'../../media/1x1.gif\' class="random"></button></td><td style="width: 15px;"><img id="spinner" style="visibility: hidden;" src="loading.gif" height=15 width=15></td><td><button id="runButton" class="launch" onclick="Maze.runButtonClick();">Εκτέλεση Προγράμματος</button><button id="resetButton" class="launch" onclick="Maze.resetButtonClick();" style="display: none">Επανεκκίνηση</button></td></tr></table></td><td valign="top"><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../generators/javascript.js"><\/script><script type="text/javascript" src="../common.js"><\/script><script type="text/javascript">Blockly.Apps.loadLanguageScripts(languageSrc);<\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></td></tr></table>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};

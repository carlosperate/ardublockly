/**
 * Blockly Demo: Puzzle
 *
 * Copyright 2013 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Demonstration of Blockly: Puzzle.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var Puzzle = {};

document.write(puzzlepage.start({}, null,
    {MSG: MSG}));

/**
 * Initialize Blockly and the puzzle.  Called on page load.
 */
Puzzle.init = function() {
  // document.dir fails in Mozilla, use document.body.parentNode.dir instead.
  // https://bugzilla.mozilla.org/show_bug.cgi?id=151407
  var rtl = document.body.parentNode.dir == 'rtl';
  Blockly.inject(document.getElementById('blockly'),
      {path: '../../',
       rtl: rtl,
       trashcan: false});

  // window.addEventListener('beforeunload', function(e) {
  //   if (Blockly.mainWorkspace.getAllBlocks().length > 2) {
  //     e.returnValue = MSG.unloadWarning;  // Gecko.
  //     return MSG.unloadWarning;  // Webkit.
  //   }
  //   return null;
  // });
  var blocklyDiv = document.getElementById('blockly');
  var onresize = function(e) {
    blocklyDiv.style.width = (window.innerWidth - blocklyDiv.offsetLeft - 18) +
        'px';
    blocklyDiv.style.height = (window.innerHeight - blocklyDiv.offsetTop - 22) +
        'px';
  };
  onresize();
  window.addEventListener('resize', onresize);
  Blockly.fireUiEvent(window, 'resize');

  // Add the blocks.
  var blocks = [];
  for (var i = 1, country; country = MSG['country' + i]; i++) {
    var block = new Blockly.Block(Blockly.mainWorkspace, 'country');
    block.setTitleValue(country, 'NAME');
    block.country = i;
    block.helpUrl = MSG['country' + i + 'HelpUrl'];
    blocks.push(block);
    var flag = MSG['country' + i + 'Flag'];
    var flagHeight = MSG['country' + i + 'FlagHeight'];
    var flagWidth = MSG['country' + i + 'FlagWidth'];
    var block = new Blockly.Block(Blockly.mainWorkspace, 'flag');
    block.getInput('IMG')
        .appendTitle(new Blockly.FieldImage(flag, flagWidth, flagHeight));
    block.country = i;
    blocks.push(block);
    for (var j = 1, city; city = MSG['country' + i + 'City' + j]; j++) {
      var block = new Blockly.Block(Blockly.mainWorkspace, 'city');
      block.setTitleValue(city, 'NAME');
      block.country = i;
      blocks.push(block);
    }
  }

  var MARGIN = 50;
  Blockly.svgResize();
  var workspaceBox = Blockly.svgSize();
  workspaceBox.width -= MARGIN;
  workspaceBox.height -= MARGIN;

  for (var i = 0, block; block = blocks[i]; i++) {
    block.deletable = false;
    block.initSvg();
    block.render();
    var blockBox = block.svg_.getRootElement().getBBox();
    // Spread the blocks horizontally, grouped loosely by type.
    var dx = Math.round(Math.random() *
                        (workspaceBox.width - blockBox.width));
    var dy = Math.round(Math.random() *
                        (workspaceBox.height - blockBox.height));
    block.moveBy(dx, dy);
  }

  Puzzle.showHelp();
};

window.addEventListener('load', Puzzle.init);

/**
 * Return a list of all languages.
 * @return {!Array<!Array<string>>} Array of human-readable and
 *   language-neutral tuples.
 */
Puzzle.languages = function() {
  var list = [[MSG.languageChoose, '0']];
  for (var i = 1, lang; lang = MSG['country' + i + 'Language']; i++) {
    list[i] = [lang, String(i)];
  }
  return list;
};

/**
 * Count and highlight the errors.
 */
Puzzle.checkAnswers = function() {
  var blocks = Blockly.mainWorkspace.getAllBlocks();
  var errors = 0;
  for (var b = 0, block; block = blocks[b]; b++) {
    if (!block.isCorrect()) {
      errors++;
      // Bring the offending block to the front.
      block.select();
    }

  }
  var message;
  if (errors == 1) {
    message = MSG.error1 + '\n' + MSG.tryAgain;
  } else if (errors) {
    message = MSG.error2.replace('%1', errors) + '\n' + MSG.tryAgain;
  } else {
    message = MSG.error0.replace('%1', blocks.length);
  }
  alert(message);
};

/**
 * Show the help pop-up.
 */
Puzzle.showHelp = function() {
  document.getElementById('help').style.display = 'block';
  document.getElementById('shadow').style.display = 'block';
};

/**
 * Hide the help pop-up.
 */
Puzzle.hideHelp = function () {
  document.getElementById('help').style.display = 'none';
  document.getElementById('shadow').style.display = 'none';
};

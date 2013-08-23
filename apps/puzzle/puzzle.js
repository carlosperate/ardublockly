/**
 * Blockly Apps: Puzzle
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
 * @fileoverview JavaScript for Blockly's Puzzle application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var Puzzle = {};

// Supported languages.
BlocklyApps.LANGUAGES = {
  // Format: ['Language name', 'direction', 'XX_compressed.js']
  af: ['Afrikaans', 'ltr', 'en_compressed.js'],
  ar: ['العربية', 'rtl', 'en_compressed.js'],
  cs: ['Česky', 'ltr', 'en_compressed.js'],
  'be-tarask': ['Taraškievica', 'ltr', 'en_compressed.js'],
  br: ['Brezhoneg', 'ltr', 'en_compressed.js'],
  ca: ['Català', 'ltr', 'en_compressed.js'],
  cdo: ['閩東語', 'ltr', 'zh_tw_compressed.js'],
  da: ['Dansk', 'ltr', 'en_compressed.js'],
  de: ['Deutsch', 'ltr', 'de_compressed.js'],
  el: ['Ελληνικά', 'ltr', 'en_compressed.js'],
  en: ['English', 'ltr', 'en_compressed.js'],
  eu: ['Euskara', 'ltr', 'en_compressed.js'],
  fa: ['یسراف', 'rtl', 'en_compressed.js'],
  fi: ['Suomi', 'ltr', 'en_compressed.js'],
  fo: ['Føroyskt', 'ltr', 'en_compressed.js'],
  fr: ['Français', 'ltr', 'en_compressed.js'],
  frr: ['Frasch', 'ltr', 'de_compressed.js'],
  gl: ['Galego', 'ltr', 'en_compressed.js'],
  hak: ['客家話', 'ltr', 'en_compressed.js'],
  he: ['עברית', 'rtl', 'en_compressed.js'],
  hu: ['Magyar', 'ltr', 'en_compressed.js'],
  ia: ['Interlingua', 'ltr', 'en_compressed.js'],
  it: ['Italiano', 'ltr', 'en_compressed.js'],
  ja: ['日本語', 'ltr', 'en_compressed.js'],
  ka: ['ქართული', 'ltr', 'en_compressed.js'],
  km: ['ភាសាខ្មែរ', 'ltr', 'en_compressed.js'],
  ko: ['한국어', 'ltr', 'en_compressed.js'],
  ksh: ['Ripoarėsch', 'ltr', 'de_compressed.js'],
  ky: ['Кыргызча', 'ltr', 'en_compressed.js'],
  la: ['Latine', 'ltr', 'en_compressed.js'],
  lb: ['Lëtzebuergesch', 'ltr', 'de_compressed.js'],
  lt: ['Lietuvių', 'ltr', 'en_compressed.js'],
  lv: ['Latviešu', 'ltr', 'en_compressed.js'],
  ml: ['മലയാളം', 'ltr', 'en_compressed.js'],
  mk: ['Македонски', 'ltr', 'en_compressed.js'],
  ms: ['Bahasa Melayu', 'ltr', 'en_compressed.js'],
  mzn: ['مازِرونی', 'rtl', 'en_compressed.js'],
  nb: ['Norsk Bokmål', 'ltr', 'en_compressed.js'],
  nl: ['Nederlands, Vlaams', 'ltr', 'en_compressed.js'],
  oc: ['Lenga d\'òc', 'ltr', 'en_compressed.js'],
  pa: ['पंजाबी', 'ltr', 'en_compressed.js'],
  pl: ['Polski', 'ltr', 'en_compressed.js'],
  pms: ['Piemontèis', 'ltr', 'en_compressed.js'],
  ps: ['پښتو', 'rtl', 'en_compressed.js'],
  'pt-br': ['Português', 'ltr', 'pt_br_compressed.js'],
  ru: ['Русский', 'ltr', 'en_compressed.js'],
  sk: ['Slovenčina', 'ltr', 'en_compressed.js'],
  sv: ['Svenska', 'ltr', 'en_compressed.js'],
  sw: ['Kishwahili', 'ltr', 'en_compressed.js'],
  tr: ['Türkçe', 'ltr', 'en_compressed.js'],
  uk: ['Українська', 'ltr', 'en_compressed.js'],
  vi: ['Tiếng Việt', 'ltr', 'vi_compressed.js'],
  'zh-hans': ['简体字', 'ltr', 'zh_tw_compressed.js'],
  'zh-hant': ['中文', 'ltr', 'zh_tw_compressed.js']
};
BlocklyApps.LANG = BlocklyApps.getLang();
Puzzle.RTL = BlocklyApps.LANGUAGES[BlocklyApps.LANG][1] == 'rtl';

document.write('<script type="text/javascript" src="generated/' +
               BlocklyApps.LANG + '.js"></script>\n');

/**
 * Initialize Blockly and the puzzle.  Called on page load.
 */
Puzzle.init = function() {
  BlocklyApps.init();

  Blockly.inject(document.getElementById('blockly'),
      {path: '../../',
       rtl: Puzzle.RTL,
       scrollbars: false,
       trashcan: false});

  var blocklyDiv = document.getElementById('blockly');
  var onresize = function(e) {
    blocklyDiv.style.width = (window.innerWidth - 20) + 'px';
    blocklyDiv.style.height =
        (window.innerHeight - blocklyDiv.offsetTop - 15) + 'px';
  };
  onresize();
  window.addEventListener('resize', onresize);
  Blockly.fireUiEvent(window, 'resize');

  // Add the blocks.
  if (window.sessionStorage.loadOnceBlocks) {
    var text = window.sessionStorage.loadOnceBlocks;
    delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(text);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } else {
    // Create one of every block.
    var blocksCountries = [];
    var blocksFlags = [];
    var blocksCities = [];
    var i = 1;
    while (BlocklyApps.getMsgOrNull('Puzzle_country' + i)) {
      var block = new Blockly.Block(Blockly.mainWorkspace, 'country');
      block.populate(i);
      blocksCountries.push(block);
      var block = new Blockly.Block(Blockly.mainWorkspace, 'flag');
      block.populate(i);
      blocksFlags.push(block);
      var j = 1;
      while (BlocklyApps.getMsgOrNull('Puzzle_country' + i + 'City' + j)) {
        var block = new Blockly.Block(Blockly.mainWorkspace, 'city');
        block.populate(i, j);
        blocksCities.push(block);
        j++;
      }
      i++;
    }
    Puzzle.shuffle(blocksCountries);
    Puzzle.shuffle(blocksFlags);
    Puzzle.shuffle(blocksCities);
    var blocks = [].concat(blocksCountries, blocksFlags, blocksCities);
    if (Puzzle.RTL) {
      blocks.reverse();
    }
    // Initialize all the blocks.
    for (var i = 0, block; block = blocks[i]; i++) {
      block.setDeletable(false);
      block.initSvg();
      block.render();
    }
    var totalArea = 0;
    // Measure the surface area of each block.
    for (var i = 0, block; block = blocks[i]; i++) {
      var blockBox = block.svg_.getRootElement().getBBox();
      block.cached_width_ = blockBox.width;
      block.cached_height_ = blockBox.height;
      block.cached_area_ = blockBox.width * blockBox.height;
      totalArea += block.cached_area_;
    }
    // Position the blocks randomly.
    var MARGIN = 50;
    Blockly.svgResize();
    var workspaceBox = Blockly.svgSize();
    workspaceBox.width -= MARGIN;
    workspaceBox.height -= MARGIN;
    var countedArea = 0;
    for (var i = 0, block; block = blocks[i]; i++) {
      var blockBox = block.svg_.getRootElement().getBBox();
      // Spread the blocks horizontally, grouped by type.
      // Spacing is proportional to block's area.
      if (Puzzle.RTL) {
        var dx = blockBox.width +
                 (countedArea / totalArea) * workspaceBox.width;
      } else {
        var dx = (countedArea / totalArea) *
                 (workspaceBox.width - blockBox.width);
      }
      dx = Math.round(dx + Math.random() * MARGIN);
      var dy = Math.round(Math.random() *
                          (workspaceBox.height - blockBox.height));
      block.moveBy(dx, dy);
      countedArea += block.cached_area_;
    }
    Puzzle.showHelp(false);
    /**
     * HACK:
     * Chrome (v28) displays a broken image tag on any image that is also
     * shown in the help dialog.  Selecting the block fixes the problem.
     * If Chrome stops corrupting the Australian flag, delete this entire hack.
     */
    if (goog.userAgent.WEBKIT) {
      var blocks = Blockly.mainWorkspace.getAllBlocks();
      for (var i = 0, block; block = blocks[i]; i++) {
        block.select();
      }
      Blockly.selected.unselect();
    }
  }
};

if (window.location.pathname.match(/readonly.html$/)) {
  window.addEventListener('load', BlocklyApps.initReadonly);
} else {
  window.addEventListener('load', Puzzle.init);
}

/**
 * Shuffles the values in the specified array using the Fisher-Yates in-place
 * shuffle (also known as the Knuth Shuffle).
 * Runtime: O(n)
 * Based on Closure's goog.array.shuffle.
 * @param {!Array} arr The array to be shuffled.
 */
Puzzle.shuffle = function(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    // Choose a random array index in [0, i] (inclusive with i).
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
};

/**
 * Return a list of all languages.
 * @return {!Array<!Array<string>>} Array of human-readable and
 *   language-neutral tuples.
 */
Puzzle.languages = function() {
  var list = [[BlocklyApps.getMsg('Puzzle_languageChoose'), '0']];
  var i = 1;
  var lang;
  while (lang = BlocklyApps.getMsgOrNull('Puzzle_country' + i + 'Language')) {
    list[i] = [lang, String(i)];
    i++;
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

  var graphValue = document.getElementById('graphValue');
  window.setTimeout(function() {
      graphValue.style.width =
          (100 * (blocks.length - errors) / blocks.length) + 'px';
  }, 500);

  var messages;
  if (errors == 1) {
    messages = [BlocklyApps.getMsg('Puzzle_error1'),
                BlocklyApps.getMsg('Puzzle_tryAgain')];
  } else if (errors) {
    messages = [BlocklyApps.getMsg('Puzzle_error2').replace('%1', errors),
                BlocklyApps.getMsg('Puzzle_tryAgain')];
  } else {
    messages = [BlocklyApps.getMsg('Puzzle_error0').replace(
        '%1', blocks.length)];
  }
  var textDiv = document.getElementById('answerMessage');
  textDiv.innerHTML = '';
  for (var i = 0; i < messages.length; i++) {
    var line = document.createElement('div');
    line.appendChild(document.createTextNode(messages[i]));
    textDiv.appendChild(line);
  }

  var content = document.getElementById('answers');
  var button = document.getElementById('checkButton');
  var style = {
    width: '25%',
    left: Puzzle.RTL ? '5%' : '70%',
    top: '5em'
  };
  BlocklyApps.showDialog(content, button, true, true, style,
      BlocklyApps.stopDialogKeyDown);
  BlocklyApps.startDialogKeyDown();
};

/**
 * Show the help pop-up.
 * @param {boolean} animate Animate the pop-up opening.
 */
Puzzle.showHelp = function(animate) {
  var help = document.getElementById('help');
  var button = document.getElementById('helpButton');
  var style = {
    width: '50%',
    left: '25%',
    top: '5em'
  };
  BlocklyApps.showDialog(help, button, animate, true, style,
      BlocklyApps.stopDialogKeyDown);
  BlocklyApps.startDialogKeyDown();
};

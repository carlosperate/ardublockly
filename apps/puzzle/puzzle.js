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
  frr: ['Frasch', 'ltr',  'de_compressed.js'],
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
  'pt-br': ['Português', 'ltr', 'en_compressed.js'],
  ru: ['Русский', 'ltr', 'en_compressed.js'],
  sk: ['Slovenčina', 'ltr', 'en_compressed.js'],
  sv: ['Svenska', 'ltr', 'en_compressed.js'],
  sw: ['Kishwahili', 'ltr', 'en_compressed.js'],
  tr: ['Türkçe', 'ltr', 'en_compressed.js'],
  uk: ['Українська', 'ltr', 'en_compressed.js'],
  vi: ['Tiếng Việt', 'ltr', 'vi_compressed.js'],
  'zh-hans': ['简体字', 'ltr', 'zh_tw_compressed.js'],
  'zh-hant': ['>中文/a>', 'ltr', 'zh_tw_compressed.js']
};
BlocklyApps.LANG = BlocklyApps.getLang();

document.write('<script type="text/javascript" src="generated/' +
               BlocklyApps.LANG + '.js"></script>\n');

/**
 * Initialize Blockly and the puzzle.  Called on page load.
 */
Puzzle.init = function() {
  BlocklyApps.init();

  var rtl = BlocklyApps.LANGUAGES[BlocklyApps.LANG][1] == 'rtl';
  Blockly.inject(document.getElementById('blockly'),
      {path: '../../',
       rtl: rtl,
       scrollbars: false,
       trashcan: false});

  var blocklyDiv = document.getElementById('blockly');
  var onresize = function(e) {
    blocklyDiv.style.width = (window.innerWidth - 20) + 'px';
    blocklyDiv.style.height =
        (window.innerHeight - blocklyDiv.offsetTop - 22) + 'px';
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
    Puzzle.hideHelp(false);
  } else {
    // Create one of every block.
    var blocksCountries = [];
    var blocksFlags = [];
    var blocksCities = [];
    var i = 1;
    while (BlocklyApps.getMsgOrNull('country' + i)) {
      var block = new Blockly.Block(Blockly.mainWorkspace, 'country');
      block.populate(i);
      blocksCountries.push(block);
      var block = new Blockly.Block(Blockly.mainWorkspace, 'flag');
      block.populate(i);
      blocksFlags.push(block);
      var j = 1;
      while (BlocklyApps.getMsgOrNull('country' + i + 'City' + j)) {
        var block = new Blockly.Block(Blockly.mainWorkspace, 'city');
        block.populate(i, j);
        blocksCities.push(block);
        j++;
      }
      i++;
    }
    blocksCountries.sort(Puzzle.shuffleComp);
    blocksFlags.sort(Puzzle.shuffleComp);
    blocksCities.sort(Puzzle.shuffleComp);
    var blocks = [].concat(blocksCountries, blocksFlags, blocksCities);
    // Initialize all the blocks.
    for (var i = 0, block; block = blocks[i]; i++) {
      block.deletable = false;
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
    workspaceBox.width -= 2 * MARGIN;
    workspaceBox.height -= MARGIN;
    var countedArea = 0;
    for (var i = 0, block; block = blocks[i]; i++) {
      var blockBox = block.svg_.getRootElement().getBBox();
      // Spread the blocks horizontally, grouped by type.
      // Spacing is proportional to block's area.
      var dx = Math.round((countedArea / totalArea) *
                          (workspaceBox.width - blockBox.width) +
                          Math.random() * MARGIN);
      var dy = Math.round(Math.random() *
                          (workspaceBox.height - blockBox.height));
      block.moveBy(dx, dy);
      countedArea += block.cached_area_;
    }
    Puzzle.showHelp(false);
  }
};


/**
 * Initialize Blockly for the help.  Called on page load.
 */
Puzzle.initHelp = function() {
  var rtl = BlocklyApps.LANGUAGES[BlocklyApps.LANG][1] == 'rtl';
  Blockly.inject(document.getElementById('blockly'),
      {path: '../../',
       readOnly: true,
       rtl: rtl,
       scrollbars: false});

  // Add the blocks.
  var xml = document.getElementById('blocks');
  Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
};

if (window.location.pathname.match(/help.html$/)) {
  window.addEventListener('load', Puzzle.initHelp);
} else {
  window.addEventListener('load', Puzzle.init);
}

/**
 * Comparison function for shuffling an array.
 * Warning: This is not a true shuffle, do not use for non-trivial purposes.
 * @param {Object} a First object.
 * @param {Object} b Second object.
 * @return {number} Ordering result.
 */
Puzzle.shuffleComp = function(a, b) {
  return Math.random() - 0.5;
};

/**
 * Return a list of all languages.
 * @return {!Array<!Array<string>>} Array of human-readable and
 *   language-neutral tuples.
 */
Puzzle.languages = function() {
  var list = [[BlocklyApps.getMsg('languageChoose'), '0']];
  var i = 1;
  var lang;
  while (lang = BlocklyApps.getMsgOrNull('country' + i + 'Language')) {
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
  var message;
  if (errors == 1) {
    message = BlocklyApps.getMsg('error1') + '\n' +
        BlocklyApps.getMsg('tryAgain');
  } else if (errors) {
    message = BlocklyApps.getMsg('error2').replace('%1', errors) + '\n' +
        BlocklyApps.getMsg('tryAgain');
  } else {
    message = BlocklyApps.getMsg('error0').replace('%1', blocks.length);
  }
  alert(message);
};

/**
 * Opaque data from bindEvent_.
 * @type {Array.<!Array>}
 */
Puzzle.keyDownHandler_ = null;

/**
 * Show the help pop-up.
 * @param {boolean} animate Animate the pop-up opening.
 */
Puzzle.showHelp = function(animate) {
  var help = document.getElementById('help');
  var shadow = document.getElementById('shadow');
  shadow.style.visibility = 'visible';
  shadow.style.opacity = 0.3;
  var border = document.getElementById('helpBorder');
  function endResult() {
    help.style.visibility = 'visible';
    border.style.visibility = 'hidden';
  }
  if (animate) {
    border.style.visibility = 'visible';
    // In 100ms show the help and hide the animated border.
    window.setTimeout(endResult, 100);
  } else {
    // No animation.  Just set the final state.
    endResult();
  }
  // Match the animated border to the help window's size and location.
  border.style.width = help.offsetWidth + 'px';
  border.style.height = help.offsetHeight + 'px';
  border.style.left = help.offsetLeft + 'px';
  border.style.top = help.offsetTop + 'px';
  border.style.opacity = 0.8;
  Puzzle.keyDownHandler_ =
      Blockly.bindEvent_(document, 'keydown', null, Puzzle.keyDown);
};

/**
 * Hide the help pop-up.
 * @param {boolean} animate Animate the pop-up closing.
 */
Puzzle.hideHelp = function(animate) {
  var shadow = document.getElementById('shadow');
  shadow.style.opacity = 0;
  var border = document.getElementById('helpBorder');
  // Match the animated border to the help button's size and width.
  var button = document.getElementById('helpButton');
  border.style.width = (button.offsetWidth - 2) + 'px';
  border.style.height = (button.offsetHeight - 2) + 'px';
  var left = 0;
  var top = 0;
  do {
    left += button.offsetLeft;
    top += button.offsetTop;
    button = button.offsetParent;
  } while (button)
  border.style.left = left + 'px';
  border.style.top = top + 'px';
  border.style.opacity = 0.2;
  function endResult() {
    shadow.style.visibility = 'hidden';
    border.style.visibility = 'hidden';
  }
  if (animate) {
    // In 100ms hide both the shadow and the animated border.
    border.style.visibility = 'visible';
    window.setTimeout(endResult, 100);
  } else {
    // No animation.  Just set the final state.
    endResult();
  }
  document.getElementById('help').style.visibility = 'hidden';
  if (Puzzle.keyDownHandler_) {
    Blockly.unbindEvent_(Puzzle.keyDownHandler_);
    Puzzle.keyDownHandler_ = null;
  }
};

/**
 * If the user preses enter, space, or escape, hide the help.
 * @param {!Event} e Keyboard event.
 */
Puzzle.keyDown = function(e) {
  if (e.keyCode == 13 || e.keyCode == 27 || e.keyCode == 32) {
    Puzzle.hideHelp(true);
  }
};

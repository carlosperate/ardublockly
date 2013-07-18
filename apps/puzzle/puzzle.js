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

// Supported languages.
BlocklyApps.LANGUAGES = {
  // Format: ['Language name', 'direction', 'XX_compressed.js']
  af: ['Afrikaans', 'ltr', 'en_compressed.js'],
  ms: ['Bahasa Melayu', 'ltr', 'en_compressed.js'],
  cs: ['Česky', 'ltr', 'en_compressed.js'],
  de: ['Deutsch', 'ltr', 'de_compressed.js'],
  en: ['English', 'ltr', 'en_compressed.js'],
  gl: ['Galego', 'ltr', 'en_compressed.js'],
  el: ['Ελληνικά', 'ltr', 'en_compressed.js'],
  he: ['עברית', 'rtl', 'en_compressed.js'],
  hu: ['Magyar', 'ltr', 'en_compressed.js'],
  ia: ['Interlingua', 'ltr', 'en_compressed.js'],
  it: ['Italiano', 'ltr', 'en_compressed.js'],
  sw: ['Kishwahili', 'ltr', 'en_compressed.js'],
  la: ['Latine', 'ltr', 'en_compressed.js'],
  lv: ['Latviešu', 'ltr', 'en_compressed.js'],
  lb: ['Lëtzebuergesch', 'ltr', 'en_compressed.js'],
  mk: ['Македонски', 'ltr', 'en_compressed.js'],
  nl: ['Nederlands, Vlaams', 'ltr', 'en_compressed.js'],
  pl: ['Polski', 'ltr', 'en_compressed.js'],
  'pt-br': ['Português', 'ltr', 'en_compressed.js'],
  ru: ['Русский', 'ltr', 'en_compressed.js'],
  ksh: ['Ripoarėsch', 'ltr', 'en_compressed.js'],
  sv: ['Svenska', 'ltr', 'en_compressed.js'],
  vi: ['Tiếng Việt', 'ltr', 'vi_compressed.js'],
  tr: ['Türkçe', 'ltr', 'en_compressed.js'],
  'zh-hans': ['简体字', 'ltr', 'zh_tw_compressed.js'],
  hak: ['客家話', 'ltr', 'en_compressed.js'],
  ja: ['日本語', 'ltr', 'en_compressed.js'],
  ko: ['한국어', 'ltr', 'en_compressed.js']};
BlocklyApps.LANG = BlocklyApps.getLang();

document.write('<script type="text/javascript" src="' +
               BlocklyApps.LANG + '.js"></script>\n');

var MSG = {};

/**
 * Initialize Blockly and the puzzle.  Called on page load.
 */
Puzzle.init = function() {
  var spans = document.getElementById('MSG').getElementsByTagName('span');
  for (var x = 0, span; span = spans[x]; x++) {
    MSG[span.id] = span.innerHTML;
    // Convert newline sequences.
    MSG[span.id] = MSG[span.id].replace(/\\n/g, '\n');
  }
  document.title = document.getElementById('title').textContent;
  // document.dir fails in Mozilla, use document.body.parentNode.dir instead.
  // https://bugzilla.mozilla.org/show_bug.cgi?id=151407
  var rtl = BlocklyApps.LANGUAGES[BlocklyApps.LANG][1] == 'rtl';
  document.head.parentElement.setAttribute('dir',
      BlocklyApps.LANGUAGES[BlocklyApps.LANG][1]);
  document.head.parentElement.setAttribute('lang', BlocklyApps.LANG);

  // Populate the language selection menu.
  var languageMenu = document.getElementById('languageMenu');
  languageMenu.options.length = 0;
  for (var lang in BlocklyApps.LANGUAGES) {
    var option = new Option(BlocklyApps.LANGUAGES[lang][0], lang);
    if (lang == BlocklyApps.LANG) {
      option.selected = true;
    }
    languageMenu.options.add(option);
  }
  // HACK: Firefox v21 does not allow the setting of style.float.
  // Use setAttribute instead.
  //languageMenu.parentElement.style.display = 'block';
  //languageMenu.parentElement.style.float = rtl ? 'left' : 'right';
  languageMenu.parentElement.setAttribute('style',
      'display: block; float: ' + (rtl ? 'left' : 'right') + ';');

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
    blocklyDiv.style.width = (window.innerWidth - 20) + 'px';
    blocklyDiv.style.height = (window.innerHeight - blocklyDiv.offsetTop - 22) +
        'px';
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
    for (var i = 1, country; country = MSG['country' + i]; i++) {
      var block = new Blockly.Block(Blockly.mainWorkspace, 'country');
      block.populate(i);
      blocksCountries.push(block);
      var block = new Blockly.Block(Blockly.mainWorkspace, 'flag');
      block.populate(i);
      blocksFlags.push(block);
      for (var j = 1; MSG['country' + i + 'City' + j]; j++) {
        var block = new Blockly.Block(Blockly.mainWorkspace, 'city');
        block.populate(i, j);
        blocksCities.push(block);
      }
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
    Puzzle.showHelp();
  }
};

window.addEventListener('load', Puzzle.init);

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
 * Opaque data from bindEvent_.
 * @type {Array.<!Array>}
 */
Puzzle.keyDownHandler_ = null;

/**
 * Show the help pop-up.
 */
Puzzle.showHelp = function() {
  document.getElementById('help').style.display = 'block';
  document.getElementById('shadow').style.display = 'block';
  Puzzle.keyDownHandler_ =
      Blockly.bindEvent_(document, 'keydown', null, Puzzle.keyDown);
};

/**
 * Hide the help pop-up.
 */
Puzzle.hideHelp = function () {
  document.getElementById('help').style.display = 'none';
  document.getElementById('shadow').style.display = 'none';
  Blockly.unbindEvent_(Puzzle.keyDownHandler_);
  Puzzle.keyDownHandler_ = null;
};

/**
 * If the user preses enter, space, or escape, hide the help.
 * @param {!Event} e Keyboard event.
 */
Puzzle.keyDown = function(e) {
  if (e.keyCode == 13 || e.keyCode == 27 || e.keyCode == 32) {
    Puzzle.hideHelp();
  }
};

 /**
  * Save the blocks and reload with a different language.
  */
Puzzle.changeLanguage = function() {
  var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  var text = Blockly.Xml.domToText(xml);
  window.sessionStorage.loadOnceBlocks = text;
  var languageMenu = document.getElementById('languageMenu');
  var newLang = languageMenu.options[languageMenu.selectedIndex].value;
  window.location = window.location.protocol + '//' +
      window.location.host + window.location.pathname + '?lang=' + newLang;
};

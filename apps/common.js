/**
 * Visual Blocks Editor
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
 * @fileoverview Common support code for Blockly apps.
 * @author fraser@google.com (Neil Fraser)
 */

'use strict';

var BlocklyApps = {};

/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if paramater not found.
 * @return {string} The parameter value or the default value if not found.
 */
BlocklyApps.getStringParamFromUrl = function(name, defaultValue) {
  var val =
      window.location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
  return val ? decodeURIComponent(val[1]) : defaultValue;
};

/**
 * Extracts a numeric parameter from the URL.
 * If the parameter is absent or less than min_value, min_value is
 * returned.  If it is greater than max_value, max_value is returned.
 * @param {string} name The name of the parameter.
 * @param {number} minValue The minimum legal value.
 * @param {number} maxValue The maximum legal value.
 * @return {number} A number in the range [min_value, max_value].
 */
BlocklyApps.getNumberParamFromUrl = function(name, minValue, maxValue) {
  var val = Number(BlocklyApps.getStringParamFromUrl(name, 'NaN'));
  return isNaN(val) ? minValue : Math.min(Math.max(minValue, val), maxValue);
};

/**
 * Use a series of heuristics that determine the likely language of this user.
 * Use a session cookie to load/save the language preference.
 * @return {string} User's language.
 * @throws {string} If no languages exist in this app.
 */
BlocklyApps.getLang = function() {
  // First choice: The URL specified language.
  var lang = BlocklyApps.getStringParamFromUrl('lang', '');
  if (BlocklyApps.LANGUAGES[lang]) {
    // Save this explicit choice as cookie.
    // Use of a session cookie for saving language is explicitly permitted
    // in the EU's Cookie Consent Exemption policy.  Section 3.6:
    // http://ec.europa.eu/justice/data-protection/article-29/documentation/
    //   opinion-recommendation/files/2012/wp194_en.pdf
    document.cookie = 'lang=' + escape(lang) + '; path=/';
    return lang;
  }
  // Second choice: Language cookie.
  var cookie = document.cookie.match(/(^|;)\s*lang=(\w+)/);
  if (cookie) {
    lang = unescape(cookie[2]);
    if (BlocklyApps.LANGUAGES[lang]) {
      return lang;
    }
  }
  // Third choice: The browser's language.
  lang = navigator.language;
  if (BlocklyApps.LANGUAGES[lang]) {
    return lang;
  }
  // Fourth choice: English.
  lang = 'en';
  if (BlocklyApps.LANGUAGES[lang]) {
    return lang;
  }
  // Fifth choice: I'm feeling lucky.
  for (var lang in BlocklyApps.LANGUAGES) {
    return lang;
  }
  // Sixth choice: Die.
  throw 'No languages available.'
};

/**
 * User's language.
 * @type {?string}
 */
BlocklyApps.LANG = undefined;

/**
 * List of languages supported by this app.  Keys should be in ISO 639 format.
 * @type {Object}
 */
BlocklyApps.LANGUAGES = undefined;

/**
 * Load the specified language file(s).
 * @param {!Array<string>} languageSrc Array of language files.
 */
BlocklyApps.loadLanguageScripts = function(languageSrc) {
  for (var x = 0; x < languageSrc.length; x++) {
    var file = languageSrc[x];
    if (file.match(/^(\w+\/)*\w+\.js$/)) {
      document.writeln('<script type="text/javascript" ' +
          'src="../../' + file + '"><' + '/script>');
    } else {
      console.error('Illegal language file: ' + file);
    }
  }
};

/**
 * Updates the document's 'capacity' element's innerHTML with a message
 * indicating how many more blocks are permitted.  The capacity
 * is retrieved from Blockly.mainWorkspace.remainingCapacity().
 */
BlocklyApps.updateCapacity = function() {
  var cap = Blockly.mainWorkspace.remainingCapacity();
  var p = document.getElementById('capacity');
  if (cap == Infinity) {
    p.style.display = 'none';
  } else {
    p.style.display = 'inline';
    if (cap == 0) {
      p.innerHTML = BlocklyApps.getMsg('capacity0');
    } else if (cap == 1) {
      p.innerHTML = BlocklyApps.getMsg('capacity1');
    } else {
      cap = Number(cap);
      p.innerHTML = BlocklyApps.getMsg('capacity2').replace('%1', cap);
    }
  }
};

/**
 * Highlight the block (or clear highlighting).
 * @param {?string} id ID of block that triggered this action.
 */
BlocklyApps.highlight = function(id) {
  if (id) {
    var m = id.match(/^block_id_(\d+)$/)
    if (m) {
      id = m[1];
    }
  }
  Blockly.mainWorkspace.highlightBlock(id);
};

/**
 * If the user has executed too many actions, we're probably in an infinite
 * loop.  Sadly I wasn't able to solve the Halting Problem.
 * @param {?string} opt_id ID of loop block to highlight if timeout is reached.
 * @throws {false} Throws an error to terminate the user's program.
 */
BlocklyApps.checkTimeout = function(opt_id) {
  if (opt_id) {
    BlocklyApps.log.push([null, opt_id]);
  }
  if (BlocklyApps.ticks-- < 0) {
    // Highlight an infinite loop on death.
    throw false;
  }
};

/**
 * Convert the user's code to raw JavaScript.
 * @param {string} code Generated code.
 * @return {string} The code without serial numbers and timeout checks.
 */
BlocklyApps.stripCode = function(code) {
  // Strip out serial numbers.
  code = code.replace(/(,\s*)?'block_id_\d+'\)/g, ')');
  // Remove timeouts.
  var regex = new RegExp(Blockly.JavaScript.INFINITE_LOOP_TRAP
      .replace('(%1)', '\\(\\)'), 'g');
  return code.replace(regex, '');
};

/**
 * Show the user's code in raw JavaScript.
 */
BlocklyApps.showCode = function() {
  var code = Blockly.Generator.workspaceToCode('JavaScript');
  code = BlocklyApps.stripCode(code);
  window.alert(code);
};

/**
 * Gets the message with the given key from the document.
 * @param {string} key The key of the document element.
 * @return {string} The innerHTML of the specified element, or undefined if the
 *     element was not found.
 */
BlocklyApps.getMsg = function(key) {
  var element = document.getElementById(key);
  if (element) {
    return element.innerHTML;
  } else {
    return '[Unknown message: ' +  key + ']';
  }
};

/**
 * On touch enabled browsers, add touch-friendly variants of event handlers
 * for elements such as buttons whose event handlers are specified in the
 * markup. For example, ontouchend is treated as equivalent to onclick.
 */
BlocklyApps.addTouchEvents = function() {
  // Do nothing if the browser doesn't support touch.
  if (!('ontouchstart' in document.documentElement)) {
    return;
  }
  // Treat ontouchend as equivalent to onclick for buttons.
  var buttons = document.getElementsByTagName('button');
  for (var i = 0, button; button = buttons[i]; i++) {
    if (!button.ontouchend) {
      button.ontouchend = button.onclick;
    }
  }
};

// Add events for touch devices when the window is done loading.
window.addEventListener('load', BlocklyApps.addTouchEvents, false);

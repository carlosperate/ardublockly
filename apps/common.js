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

Blockly.Apps = {};

/**
 * Updates the document's 'capacity' element's innerHTML with a message
 * indicating how many more blocks are permitted.  The capacity
 * is retrieved from Blockly.mainWorkspace.remainingCapacity().
 * @param {!Object} MSG An object with appropriate text properties for
 *     capacity0, capacity1, and capacity2.
 */
Blockly.Apps.updateCapacity = function(MSG) {
  var cap = Blockly.mainWorkspace.remainingCapacity();
  var p = parent.document.getElementById('capacity');
  if (cap == Infinity) {
    p.innerHTML = '';
  } else if (cap == 0) {
    p.innerHTML = MSG.capacity0;
  } else if (cap == 1) {
    p.innerHTML = MSG.capacity1;
  } else {
    cap = Number(cap);
    p.innerHTML = MSG.capacity2.replace('%1', cap);
  }
};

/**
 * Congratulates the user for completing the level and offers to
 * direct them to the next level, if available.
 * @param {!Object} window
 * @param {number} level The current level.
 * @param {number} maxLevel The maxmium available level.
 * @param {!Object} MSG An object with appropriate text properties for
 *     MSG.nextLevel and MSG.finalLevel.
 */
Blockly.Apps.congratulations = function(window, level, maxLevel, MSG) {
  if (level < maxLevel) {
    var proceed = window.confirm(MSG.nextLevel.replace('%1', level + 1));
    if (proceed) {
      window.location = window.location.protocol + '//' +
          window.location.host + window.location.pathname +
          '?level=' + (level + 1);
    }
  } else {
    alert(MSG.finalLevel);
  }
};

/**
 * Convert the user's code to raw JavaScript.
 * @param {string} code Generated code.
 * @return {string} The code without serial numbers and timeout checks.
 */
Blockly.Apps.stripCode = function(code) {
  // Strip out serial numbers.
  code = code.replace(/'\d+'/g, '');
  // Remove timeouts.
  var regex = new RegExp(Blockly.JavaScript.INFINITE_LOOP_TRAP
      .replace('(%1)', '\\(\\)'), 'g');
  return code.replace(regex, '');
};

/**
 * Show the user's code in raw JavaScript.
 */
Blockly.Apps.showCode = function() {
  var code = Blockly.Generator.workspaceToCode('JavaScript');
  code = Blockly.Apps.stripCode(code);
  alert(code);
};

/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
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
 * @fileoverview Blocks for plane demo.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Language.plane_get_rows1st = {
  // First class row variable getter.
  helpUrl: Blockly.LANG_VARIABLES_GET_HELPURL,
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendTitle(MSG.getRows1);
    this.setOutput(true, 'Number');
  }
};

Blockly.Language.plane_get_rows2nd = {
  // Second class row variable getter.
  helpUrl: Blockly.LANG_VARIABLES_GET_HELPURL,
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendTitle(MSG.getRows2);
    this.setOutput(true, 'Number');
  }
};

Blockly.JavaScript.plane_get_rows1st = function() {
  // First class row variable getter.
  return ['planeSvg.rows1st', Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript.plane_get_rows2nd = function() {
  // Second class row variable getter.
  return ['planeSvg.rows2nd', Blockly.JavaScript.ORDER_MEMBER];
};

/**
 * Calculate the correct answer.
 * @return {number} Number of seats.
 */
function answer() {
  return 2 + (planeSvg.rows1st * 4) + (planeSvg.rows2nd * 5);
}

/**
 * Redraw the SVG to show a new number of rows.
 * @param {number} newRows
 */
function redraw(newRows) {
  var rows1st = planeSvg.rows1st;
  var rows2nd = planeSvg.rows2nd;
  if (newRows != rows1st) {
    while (newRows < rows1st) {
      var row = planeSvg.document.getElementById('row1st' + rows1st);
      row.parentNode.removeChild(row);
      rows1st--;
    }
    while (newRows > rows1st) {
      rows1st++;
      var row = planeSvg.document.createElementNS('http://www.w3.org/2000/svg',
                                                  'use');
      row.setAttribute('id', 'row1st' + rows1st);
      row.setAttribute('x', (rows1st - 1) * 20);
      row.setAttributeNS('http://www.w3.org/1999/xlink',
          'xlink:href', '#row1st');
      planeSvg.SVG.appendChild(row);
    }

    newRows = Math.floor((21 - newRows) * 1.11);
    while (newRows < rows2nd) {
      var row = planeSvg.document.getElementById('row2nd' + rows2nd);
      row.parentNode.removeChild(row);
      rows2nd--;
    }
    while (newRows > rows2nd) {
      rows2nd++;
      var row = planeSvg.document.createElementNS('http://www.w3.org/2000/svg',
                                                  'use');
      row.setAttribute('id', 'row2nd' + rows2nd);
      row.setAttribute('x', 400 - (rows2nd - 1) * 18);
      row.setAttributeNS('http://www.w3.org/1999/xlink',
          'xlink:href', '#row2nd');
      planeSvg.SVG.appendChild(row);
    }

    planeSvg.setText('row1stText', MSG.rows1.replace('%1', rows1st));
    planeSvg.setText('row2ndText', MSG.rows2.replace('%1', rows2nd));
    planeSvg.rows1st = rows1st;
    planeSvg.rows2nd = rows2nd;
    recalculate();
  }
}

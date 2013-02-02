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

Blockly.Language.plane_get_rows = {
  // Row variable getter.
  helpUrl: Blockly.LANG_VARIABLES_GET_HELPURL,
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_VARIABLES_GET_TITLE)
        .appendTitle('rows');
    this.setOutput(true, null);
  }
};

Blockly.JavaScript.plane_get_rows = function() {
  // Row variable getter.
  return ['planeSvg.rows1st', Blockly.JavaScript.ORDER_MEMBER];
};

/**
 * Redraw the SVG to show a new number of rows.
 * @param {number} newRows
 */
function redraw(newRows) {
  var rows1st = planeSvg.rows1st;
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
    planeSvg.setText('row1stText', 'Rows: ' + rows1st);
    planeSvg.rows1st = rows1st;
    recalculate();
  }
}

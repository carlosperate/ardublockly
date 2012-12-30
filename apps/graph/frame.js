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
 * @fileoverview Blocks for graph demo.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

Blockly.Language.graph_get_x = {
  // x variable getter.
  category: 'Variables',
  helpUrl: Blockly.LANG_VARIABLES_GET_HELPURL,
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_VARIABLES_GET_TITLE)
        .appendTitle('x');
    this.setOutput(true, null);
  }
};

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.JavaScript.graph_get_x = function() {
  // x variable getter.
  return ['x', Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.Language.graph_set_y = {
  // Y variable setter.
  category: null,
  helpUrl: Blockly.LANG_VARIABLES_SET_HELPURL,
  deletable: false,
  init: function() {
    this.setColour(330);
    this.appendValueInput('VALUE')
        .appendTitle(Blockly.LANG_VARIABLES_SET_TITLE)
        .appendTitle('y');
    this.setTooltip(Blockly.LANG_VARIABLES_SET_TOOLTIP);
  }
};

Blockly.JavaScript.graph_set_y = function() {
  // Y variable setter.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '';
  return argument0 + ';';
};

var keepers = ['math_number', 'math_arithmetic', 'math_single', 'math_round',
               'math_trig', 'math_constrain', 'math_modulo',
               'math_random_int', 'math_random_float', 
               'graph_get_x', 'graph_set_y',
               'logic_ternary', 'logic_compare', 'logic_operation',
               'logic_negate', 'logic_boolean'];

/**
 * Initialize Blockly.
 */
function init() {
  // Whitelist of blocks to keep.
  var newLanguage = {};
  for (var x = 0; x < keepers.length; x++) {
    newLanguage[keepers[x]] = Blockly.Language[keepers[x]];
  }
  Blockly.Language = newLanguage;

  Blockly.inject(document.body, {path: '../../'});
  
  if (window.parent.Graph) {
    // Let the top-level application know that Blockly is ready.
    window.parent.Graph.init(Blockly);
  } else {
    // Attempt to diagnose the problem.
    var msg = 'Error: Unable to communicate between frames.\n\n';
    if (window.parent == window) {
      msg += 'Try loading index.html instead of frame.html';
    } else if (window.location.protocol == 'file:') {
      msg += 'This may be due to a security restriction preventing\n' +
          'access when using the file:// protocol.\n' +
          'http://code.google.com/p/chromium/issues/detail?id=47416';
    }
    alert(msg);
  }
}
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
 * @fileoverview Generating Python for colour blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Python = Blockly.Generator.get('Python');

Blockly.Python.colour_picker = function() {
  // Colour picker.
  var code = this.getTitleValue('COLOUR');
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.colour_rgb = function() {
  // Compose a colour from RGB components.
  // TODO
};

Blockly.Python.colour_blend = function() {
  // Blend two colours together.
  // TODO
};

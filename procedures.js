/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/google-blockly/
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
 * @fileoverview Utility functions for handling procedures.
 * @author fraser@google.com (Neil Fraser)
 */

/**
 */
Blockly.Procedures = {};

Blockly.Procedures.NAME_TYPE = 'procedure';

/**
 * Does this procedure have a legal name?  Illegal names include names of
 * procedures already defined.
 * @param {string} name The questionable name.
 * @param {Blockly.Block} opt_exclude Optional block to exclude from
 *     comparisons (one doesn't want to collide with oneself).
 * @return {boolean} True if the name is legal.
 */
Blockly.Procedures.isLegalName = function(name, opt_exclude) {
  name = name.toLowerCase();
  var blocks = Blockly.mainWorkspace.getAllBlocks();
  // Iterate through every block and check the name.
  for (var x = 0; x < blocks.length; x++) {
    if (blocks[x] == opt_exclude) {
      continue;
    }
    var func = blocks[x].getProcedureDef;
    if (func) {
      var procName = func.call(blocks[x]);
      // Procedure name may be null if the block is only half-built.
      if (procName && procName.toLowerCase() == name) {
        return false;
      }
    }
  }
  return true;
};

/**
 * Rename a procedure.  Called by the editable field.
 * @param {string} text The proposed new name.
 * @return {?string} The accepted name, or null if rejected.
 */
Blockly.Procedures.rename = function(text) {
  if (!this.sourceBlock_.editable) {
    return text;
  }
  // Strip leading and trailing whitespace.  Beyond this, all names are legal.
  text = text.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
  if (!text) {
    return null;
  }
  // Ensure two identically-named procedures don't exist.
  while (!Blockly.Procedures.isLegalName(text, this.sourceBlock_)) {
    // Collision with another procedure.
    var r = text.match(/^(.*?)(\d+)$/);
    if (!r) {
      text += '2';
    } else {
      text = r[1] + (parseInt(r[2], 10) + 1);
    }
  }
  return text;
};

/**
 * Construct the blocks required by the flyout for the procedure category.
 * @param {!Array.<!Blockly.Block>} blocks List of blocks to show.
 * @param {!Array.<number>} gaps List of widths between blocks.
 * @param {number} margin Standard margin width for calculating gaps.
 * @param {!Blockly.Workspace} workspace The flyout's workspace.
 */
Blockly.Procedures.flyoutCategory = function(blocks, gaps, margin, workspace) {
  if (Blockly.Language.procedures_defnoreturn) {
    var block = new Blockly.Block(workspace, 'procedures_defnoreturn');
    block.initSvg();
    blocks.push(block);
    gaps.push(margin * 2);
  }
  if (Blockly.Language.procedures_defnoreturn) {
    var block = new Blockly.Block(workspace, 'procedures_defreturn');
    block.initSvg();
    blocks.push(block);
    gaps.push(margin * 2);
  }
};

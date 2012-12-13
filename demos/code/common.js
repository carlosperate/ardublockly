/**
 * Visual Blocks Editor
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
 * @fileoverview JavaScript for Blockly code demo (langaue-neutral).
 * @author fraser@google.com (Neil Fraser)
 */

/**
 * List of tab names.
 * @private
 */
var TABS_ = ['blocks', 'javascript', 'dart', 'python', 'xml'];

var selected = 'blocks';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} id ID of tab clicked.
 */
function tabClick(id) {
  // If the XML tab was open, save and render the content.
  if (document.getElementById('tab_xml').className == 'tabon') {
    var xmlTextarea = document.getElementById('textarea_xml');
    var xmlText = xmlTextarea.value;
    var xmlDom = null;
    try {
      xmlDom = Blockly.Xml.textToDom(xmlText);
    } catch (e) {
      var q =
          window.confirm(BAD_XML.replace('%1', e));
      if (!q) {
        // Leave the user on the XML tab.
        return;
      }
    }
    if (xmlDom) {
      Blockly.mainWorkspace.clear();
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
    }
  }

  // Deselect all tabs and hide all panes.
  for (var x in TABS_) {
    document.getElementById('tab_' + TABS_[x]).className = 'taboff';
    document.getElementById('content_' + TABS_[x]).style.display = 'none';
  }

  // Select the active tab.
  selected = id.replace('tab_', '');
  document.getElementById(id).className = 'tabon';
  // Show the selected pane.
  var content = document.getElementById('content_' + selected);
  content.style.display = 'block';
  renderContent();
}

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
function renderContent() {
  var content = document.getElementById('content_' + selected);
  // Initialize the pane.
  if (content.id == 'content_blocks') {
    // If the workspace was changed by the XML tab, Firefox will have performed
    // an incomplete rendering due to Blockly being invisible.  Rerender.
    Blockly.mainWorkspace.render();
  } else if (content.id == 'content_xml') {
    var xmlTextarea = document.getElementById('textarea_xml');
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlTextarea.value = xmlText;
    xmlTextarea.focus();
  } else if (content.id == 'content_javascript') {
    content.innerHTML = Blockly.Generator.workspaceToCode('JavaScript');
  } else if (content.id == 'content_dart') {
    content.innerHTML = Blockly.Generator.workspaceToCode('Dart');
  } else if (content.id == 'content_python') {
    content.innerHTML = Blockly.Generator.workspaceToCode('Python');
  }
}

/**
 * Initialize Blockly.  Called on page load.
 * @param {!Blockly} blockly Instance of Blockly from iframe.
 */
function init(blockly) {
  //window.onbeforeunload = function() {
  //  return 'Leaving this page will result in the loss of your work.';
  //};

  window.Blockly = blockly;

  // Make the 'Blocks' tab line up with the toolbox.
  if (Blockly.Toolbox) {
    window.setTimeout(function() {
        document.getElementById('tab_blocks').style.minWidth =
            (Blockly.Toolbox.width - 38) + 'px';
            // Account for the 19 pixel margin and on each side.
    }, 1);
  }

  // An href with #key trigers an AJAX call to retrieve saved blocks.
  if (window.location.hash.length > 1) {
    BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else {
    // Restore saved blocks in a separate thread so that subsequent
    // initialization is not affected from a failed load.
    window.setTimeout(BlocklyStorage.restoreBlocks, 0);
  }

  // Hook a save function onto unload.
  BlocklyStorage.backupOnUnload();

  tabClick('tab_' + selected);
}

/**
 * Execute the user's code.
 * Just a quick and dirty eval.  No checks for infinite loops, etc.
 */
function runJS() {
  var code = Blockly.Generator.workspaceToCode('JavaScript');
  try {
    eval(code);
  } catch (e) {
    alert(BAD_CODE.replace('%1', e));
  }
}

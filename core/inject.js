/**
 * Visual Blocks Editor
 *
 * Copyright 2011 Google Inc.
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
 * @fileoverview Functions for injecting Blockly into a web page.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.inject');

goog.require('Blockly.TopComponent');
goog.require('goog.dom');


/**
 * Initialize the SVG document with various handlers.
 * @param {!Element} container Containing element.
 * @param {Object} opt_options Optional dictionary of options.
 */
Blockly.inject = function(container, opt_options) {
  // Verify that the container is in document.
  if (!goog.dom.contains(document, container))
    throw 'Error: container is not in current document.';

  if (opt_options) {
    // TODO(scr): don't mix this in to global variables.
    goog.mixin(Blockly, Blockly.parseOptions_(opt_options));
  }

  if (Blockly.inject.svgComponent_)
    throw 'Error: Blockly already injected';

  Blockly.inject.topComponent_ = new Blockly.TopComponent();
  Blockly.inject.topComponent_.decorate(container);
  // TODO(scr): When Toolbox is a component, add this line back.
  // Blockly.mainWorkspace = Blockly.inject.topComponent_.getWorkspace();
  Blockly.svg = Blockly.inject.topComponent_.getSvg();
  Blockly.widgetDiv = Blockly.inject.topComponent_.getWidget();
  Blockly.init_();
};

/**
 * Configure Blockly to behave according to a set of options.
 * @param {!Object} options Dictionary of options.
 * @return {Object} Parsed options.
 * @private
 */
Blockly.parseOptions_ = function(options) {
  var editable = !options['readOnly'];
  if (editable) {
    var tree = options['toolbox'] || '<xml />';
    if (typeof tree == 'string') {
      tree = Blockly.Xml.textToDom(tree);
    }
    var hasCategories = !!tree.getElementsByTagName('category').length;
    var hasTrashcan = options['trashcan'];
    if (hasTrashcan === undefined) {
      hasTrashcan = hasCategories;
    }
  } else {
    var hasCategories = false;
    var hasTrashcan = false;
    var tree = null;
  }
  return {
      RTL: !!options['rtl'],
      editable: editable,
      pathToBlockly: options['path'] || './',
      Toolbox: hasCategories ? Blockly.Toolbox : undefined,
      Trashcan: hasTrashcan ? Blockly.Trashcan : undefined,
      languageTree: tree
  };
};

/**
 * Initialize Blockly with various handlers.
 * @private
 */
Blockly.init_ = function() {
  Blockly.bindEvent_(window, 'resize', document,
      goog.partial(Blockly.svgResize, undefined));
  // Bind events for scrolling the workspace.
  // Most of these events should be bound to the SVG's surface.
  // However, 'mouseup' has to be on the whole document so that a block dragged
  // out of bounds and released will know that it has been released.
  // Also, 'keydown' has to be on the whole document since the browser doesn't
  // understand a concept of focus on the SVG image.
  Blockly.bindEvent_(Blockly.svg, 'mousedown', null, Blockly.onMouseDown_);
  Blockly.bindEvent_(document, 'mouseup', null, Blockly.onMouseUp_);
  Blockly.bindEvent_(Blockly.svg, 'mousemove', null, Blockly.onMouseMove_);
  Blockly.bindEvent_(Blockly.svg, 'contextmenu', null, Blockly.onContextMenu_);
  Blockly.bindEvent_(document, 'keydown', null, Blockly.onKeyDown_);

  var addScrollbars = true;
  if (Blockly.languageTree) {
    if (Blockly.Toolbox) {
      Blockly.Toolbox.init();
    } else if (Blockly.Flyout) {
      // Build a fixed flyout with the root blocks.
      Blockly.mainWorkspace.flyout_.init();
      Blockly.mainWorkspace.flyout_.show(Blockly.languageTree.childNodes);
      addScrollbars = false;
    }
  }
  if (addScrollbars) {
    Blockly.mainWorkspace.scrollbar = new Blockly.ScrollbarPair(
        Blockly.mainWorkspace.getBubbleCanvas(),
        Blockly.getMainWorkspaceMetrics, Blockly.setMainWorkspaceMetrics);
  }

  Blockly.mainWorkspace.addTrashcan(Blockly.getMainWorkspaceMetrics);

  // Load the sounds.
  Blockly.loadAudio_('click');
  Blockly.loadAudio_('delete');
};

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

  Blockly.inject.svgComponent_ = new Blockly.SvgComponent();
  Blockly.inject.svgComponent_.render(container);
  Blockly.mainWorkspace = Blockly.inject.svgComponent_.getWorkspace();
  Blockly.svg = Blockly.inject.svgComponent_.getSvg();
  Blockly.widgetDiv = Blockly.inject.svgComponent_.getWidget();
  Blockly.init_();
};

/**
 * Configure Blockly to behave according to a set of options.
 * @param {!Object} options Dictionary of options.
 * @return {Object} Parsed options.
 * @private
 */
Blockly.parseOptions_ = function(options) {
  return {
      RTL: !!options['rtl'],
      editable: !options['readOnly'],
      pathToBlockly: options['path'] || './',
      Trashcan: (options['trashcan'] === false) ? undefined : Blockly.Trashcan
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

  if (Blockly.editable) {
    Blockly.Toolbox && Blockly.Toolbox.init();
  }

  Blockly.mainWorkspace.addTrashcan(Blockly.getMainWorkspaceMetrics);
  Blockly.mainWorkspace.scrollbar = new Blockly.ScrollbarPair(
      Blockly.mainWorkspace.getBubbleCanvas(),
      Blockly.getMainWorkspaceMetrics, Blockly.setMainWorkspaceMetrics);

  // Load the sounds.
  Blockly.loadAudio_('click');
  Blockly.loadAudio_('delete');
};

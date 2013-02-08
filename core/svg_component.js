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

goog.provide('Blockly.SvgComponent');

goog.require('goog.asserts');
goog.require('Blockly.Component');



/**
 * @constructor
 * @extends {Blockly.Component}
 */
Blockly.SvgComponent = function() {
  Blockly.SvgComponent.superClass_.constructor.call(this);
};
goog.inherits(Blockly.SvgComponent, Blockly.Component);


/** @override */
Blockly.SvgComponent.prototype.createDom = function() {
  // Closure can be trusted to create HTML widgets with the proper direction.
  goog.ui.Component.setDefaultRightToLeft(Blockly.RTL);

  // Load CSS.
  Blockly.loadCss();

  // Build the SVG DOM.
  /*
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:html="http://www.w3.org/1999/xhtml"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    class="blocklySvg">
    ...
  </svg>
  */
  var svg = Blockly.createSvgElement('svg', {
    'xmlns': 'http://www.w3.org/2000/svg',
    'xmlns:html': 'http://www.w3.org/1999/xhtml',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    'version': '1.1',
    'class': 'blocklySvg'
  }, null);
  this.setElementInternal(svg);

  /*
  <defs>
    ... filters go here ...
  </defs>
  */
  var defs = Blockly.createSvgElement('defs', {}, svg);
  var filter, feSpecularLighting, feMerge, pattern;
  /*
    <filter id="blocklyEmboss">
      <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur"/>
      <feSpecularLighting in="blur" surfaceScale="1" specularConstant="0.5"
                          specularExponent="10" lighting-color="white"
                          result="specOut">
        <fePointLight x="-5000" y="-10000" z="20000"/>
      </feSpecularLighting>
      <feComposite in="specOut" in2="SourceAlpha" operator="in"
                   result="specOut"/>
      <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic"
                   k1="0" k2="1" k3="1" k4="0"/>
    </filter>
  */
  filter = Blockly.createSvgElement('filter', {'id': 'blocklyEmboss'}, defs);
  Blockly.createSvgElement('feGaussianBlur',
      {'in': 'SourceAlpha', 'stdDeviation': 1, 'result': 'blur'}, filter);
  feSpecularLighting = Blockly.createSvgElement('feSpecularLighting',
      {'in': 'blur', 'surfaceScale': 1, 'specularConstant': 0.5,
      'specularExponent': 10, 'lighting-color': 'white', 'result': 'specOut'},
      filter);
  Blockly.createSvgElement('fePointLight',
      {'x': -5000, 'y': -10000, 'z': 20000}, feSpecularLighting);
  Blockly.createSvgElement('feComposite',
      {'in': 'specOut', 'in2': 'SourceAlpha', 'operator': 'in',
      'result': 'specOut'}, filter);
  Blockly.createSvgElement('feComposite',
      {'in': 'SourceGraphic', 'in2': 'specOut', 'operator': 'arithmetic',
      'k1': 0, 'k2': 1, 'k3': 1, 'k4': 0}, filter);
  /*
    <filter id="blocklyTrashcanShadowFilter">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
      <feOffset in="blur" dx="1" dy="1" result="offsetBlur"/>
      <feMerge>
        <feMergeNode in="offsetBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  */
  filter = Blockly.createSvgElement('filter',
      {'id': 'blocklyTrashcanShadowFilter'}, defs);
  Blockly.createSvgElement('feGaussianBlur',
      {'in': 'SourceAlpha', 'stdDeviation': 2, 'result': 'blur'}, filter);
  Blockly.createSvgElement('feOffset',
      {'in': 'blur', 'dx': 1, 'dy': 1, 'result': 'offsetBlur'}, filter);
  feMerge = Blockly.createSvgElement('feMerge', {}, filter);
  Blockly.createSvgElement('feMergeNode', {'in': 'offsetBlur'}, feMerge);
  Blockly.createSvgElement('feMergeNode', {'in': 'SourceGraphic'}, feMerge);
  /*
    <filter id="blocklyShadowFilter">
      <feGaussianBlur stdDeviation="2"/>
    </filter>
  */
  filter = Blockly.createSvgElement('filter',
      {'id': 'blocklyShadowFilter'}, defs);
  Blockly.createSvgElement('feGaussianBlur', {'stdDeviation': 2}, filter);
  /*
    <pattern id="blocklyDisabledPattern" patternUnits="userSpaceOnUse"
             width="10" height="10">
      <rect width="10" height="10" fill="#aaa" />
      <path d="M 0 0 L 10 10 M 10 0 L 0 10" stroke="#cc0" />
    </pattern>
  */
  pattern = Blockly.createSvgElement('pattern',
      {'id': 'blocklyDisabledPattern', 'patternUnits': 'userSpaceOnUse',
       'width': 10, 'height': 10}, defs);
  Blockly.createSvgElement('rect',
      {'width': 10, 'height': 10, 'fill': '#aaa'}, pattern);
  Blockly.createSvgElement('path',
      {'d': 'M 0 0 L 10 10 M 10 0 L 0 10', 'stroke': '#cc0'}, pattern);

  /**
   * @type {!Blockly.Workspace}
   * @private
   */
  this.workspace_ = new Blockly.Workspace(Blockly.editable);
  this.addChild(this.workspace_, true);

  /**
   * Create an HTML container for popup overlays (e.g. editor widgets).
   * @type {!Element}
   * @private
   */
  this.widget_ = goog.dom.createDom('div', {
      'class': 'blocklyWidgetDiv'});
};


/** @override */
Blockly.SvgComponent.prototype.enterDocument = function() {
  Blockly.SvgComponent.superClass_.enterDocument.call(this);

  // Sadly browsers (Chrome vs Firefox) are currently inconsistent in laying
  // out content in RTL mode.  Therefore Blockly forces the use of LTR,
  // then manually positions content in RTL as needed.
  var element = this.getElement();
  var container = element.parentElement;
  container.setAttribute('dir', 'LTR');

  var svg = this.getSvg();

  // TODO(scr): make components out of these children as well and add
  // them in createDom().
  Blockly.mainWorkspace = this.workspace_;
  if (Blockly.editable) {
    // Determine if there needs to be a category tree, or a simple list of
    // blocks.  This cannot be changed later, since the UI is very different.
    if (Blockly.Toolbox) {
      // TODO(scr): When Toolbox is a component, remove this line.
      Blockly.Toolbox.createDom(svg, container);
    } else {
      /**
       * @type {Blockly.Flyout}
       * @private
       */
      this.workspace_.flyout_ = new Blockly.Flyout(
          this.workspace_, Blockly.getMainWorkspaceMetrics, true);
      this.workspace_.flyout_.autoClose = false;
      // Insert the flyout behind the workspace so that blocks appear on top.
      this.workspace_.flyout_.renderBefore(this.workspace_.svgGroup_);
      var workspaceChanged = function() {
        // Delete any block that's sitting on top of the flyout, or off window.
        if (Blockly.Block.dragMode_ == 0) {
          var blocks = this.getTopBlocks(false);
          var svgSize = Blockly.svgSize();
          var MARGIN = 10;
          for (var b = 0, block; block = blocks[b]; b++) {
            var xy = block.getRelativeToSurfaceXY();
            var bBox = block.getSvgRoot().getBBox();
            if ((xy.y < MARGIN - bBox.height) ||  // Off the top.
                (Blockly.RTL ? xy.x > svgSize.width - this.flyout_.width_ + MARGIN :
                 xy.x < this.flyout_.width_ - MARGIN) ||  // Over the flyout.
                (xy.y > svgSize.height - MARGIN) || // Off the bottom.
                (Blockly.RTL ? xy.x < MARGIN :
                 xy.x > svgSize.width - MARGIN) // Off the far edge.
                ) {
              block.dispose(false, true);
            }
          }
        }
      }
      Blockly.bindEvent_(this.workspace_.getCanvas(), 'blocklyWorkspaceChange',
          this.workspace_, workspaceChanged);
    }
  } else {
    // Not editable.  Neither of these will be needed.
    delete Blockly.Toolbox;
    delete Blockly.Flyout;
  }
  Blockly.Tooltip && svg.appendChild(Blockly.Tooltip.createDom());
  if (Blockly.editable && Blockly.FieldDropdown) {
    svg.appendChild(Blockly.FieldDropdown.createDom());
  }
  if (Blockly.ContextMenu && Blockly.ContextMenu) {
    svg.appendChild(Blockly.ContextMenu.createDom());
  }

  Blockly.svgResize(element);
  container.appendChild(this.widget_);
};


/**
 * @return {!Blockly.Workspace} The workspace.
 */
Blockly.SvgComponent.prototype.getWorkspace = function() {
  return this.workspace_;
};


/**
 * @return {!Element} The svg.
 */
Blockly.SvgComponent.prototype.getSvg = function() {
  var svg = this.getElement();
  goog.asserts.assertObject(svg);
  return svg;
};


/**
 * @return {!Element} The widget.
 */
Blockly.SvgComponent.prototype.getWidget = function() {
  return this.widget_;
};

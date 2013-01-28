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

goog.require('goog.ui.Component');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
Blockly.SvgComponent = function() {
  Blockly.SvgComponent.superClass_.constructor.call(this);
};
goog.inherits(Blockly.SvgComponent, goog.ui.Component);


/** @override */
Blockly.SvgComponent.prototype.createDom = function() {
  // Load CSS.
  //<link href="blockly.css" rel="stylesheet" type="text/css" />
  var link = goog.dom.createDom('link', {
      'href': Blockly.pathToBlockly + 'media/blockly.css',
      'rel': 'stylesheet',
      'type': 'text/css'});
  Blockly.bindEvent_(link, 'load', null, Blockly.cssLoaded);
  var head = document.head || document.getElementsByTagName('head')[0];
  if (!head) {
    throw 'No head in document.';
  }
  head.appendChild(link);

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
  if (Blockly.Toolbox && Blockly.editable) {
    svg.appendChild(Blockly.Toolbox.createDom());
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
  return this.getElement();
};


/**
 * @return {!Element} The widget.
 */
Blockly.SvgComponent.prototype.getWidget = function() {
  return this.widget_;
};

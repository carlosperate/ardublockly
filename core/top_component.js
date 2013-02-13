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
 * @fileoverview This top component can contain both the html & svg trees
 * to make it possible to have multiple workspaces in the same page.
 * @see {Blockly.Component}
 * @author scr@google.com (Sheridan Rawlins)
 */
'use strict';

goog.provide('Blockly.TopComponent');

goog.require('goog.dom.classes');
goog.require('goog.functions');
goog.require('Blockly.Component');
goog.require('Blockly.SvgComponent');
goog.require('Blockly.Toolbox');



/**
 * TopComponent works with Blockly.Component to provide methods to contained
 * Blockly.Component objects that are managed by this component.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {Blockly.Component}
 */
Blockly.TopComponent = function(opt_domHelper) {
  Blockly.TopComponent.superClass_.constructor.call(this, opt_domHelper);
};
goog.inherits(Blockly.TopComponent, Blockly.Component);
goog.addSingletonGetter(Blockly.TopComponent);


/**
 * Populates the dom for this component; shared by createDom & decorateInternal.
 * @private
 */
Blockly.TopComponent.prototype.populateDom_ = function() {
  goog.dom.classes.add(this.getElement(), 'blocklyDiv');

  /**
   * @type {!Blockly.SvgComponent}
   * @private
   */
  this.svgComponent_ = new Blockly.SvgComponent(this.getDomHelper());
  this.addChild(this.svgComponent_, true);

  if (Blockly.editable) {
    /**
     * @type {!Blockly.Toolbox}
     * @private
     */
    this.toolbox_ = Blockly.Toolbox.getInstance();
    // TODO(scr): Once use of getInstance is removed, change to this line:
    // this.toolbox_ = new Blockly.Toolbox(this.getDomHelper());
    this.addChild(this.toolbox_, true);
  }
};


/** @override */
Blockly.TopComponent.prototype.createDom = function() {
  Blockly.TopComponent.superClass_.createDom.call(this);

  this.populateDom_();
};


/** @override */
Blockly.TopComponent.prototype.decorateInternal = function(element) {
  Blockly.TopComponent.superClass_.decorateInternal.call(this, element);

  this.populateDom_();
};


/** @override */
Blockly.TopComponent.prototype.enterDocument = function() {
  Blockly.TopComponent.superClass_.enterDocument.call(this);

  this.getHandler().listen(
      this, Blockly.TopComponent.EventType.HIDECHAFF, this.onHideChaff_, true);
};


/**
 * @param {!goog.events.Event} e The event.
 */
Blockly.TopComponent.prototype.onHideChaff_ = function(e) {
  // TODO(scr): Ultimately, stop listening to ourself and all
  // subcomponents should hide themselves on this event. See Toolbox
  // for an example.
  Blockly.Tooltip && Blockly.Tooltip.hide();
  Blockly.ContextMenu && Blockly.ContextMenu.hide();
  Blockly.FieldDropdown && Blockly.FieldDropdown.hide();
  Blockly.FieldColour && Blockly.FieldColour.hide();
};


/** @override */
Blockly.TopComponent.prototype.isBlocklyTop = goog.functions.TRUE;


/** @override */
Blockly.TopComponent.prototype.getWorkspace_ = function() {
  return this.svgComponent_.getWorkspace_();
};


/** @override */
Blockly.TopComponent.prototype.getSvg_ = function() {
  return this.svgComponent_.getSvg_();
};


/** @override */
Blockly.TopComponent.prototype.getWidget_ = function() {
  return this.svgComponent_.getWidget_();
};


/** @override */
Blockly.TopComponent.prototype.getToolbox_ = function() {
  return this.toolbox_;
};


/**
 * @enum {string}
 */
Blockly.TopComponent.EventType = {
  HIDECHAFF: 'hidechaff'
};
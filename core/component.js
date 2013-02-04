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
 * @fileoverview Create a subclass of goog.ui.Component that Blockly
 * components can inherit from to get common methods.
 */
'use strict';

goog.provide('Blockly.Component');

goog.require('goog.asserts');
goog.require('goog.ui.Component');



/**
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
Blockly.Component = function(opt_domHelper) {
  Blockly.Component.superClass_.constructor.call(this, opt_domHelper);
};
goog.inherits(Blockly.Component, goog.ui.Component);


/**
 * Get the topmost component in this tree of components.
 * @return {!goog.ui.Component} The topmost component.
 */
Blockly.Component.prototype.topComponent = function() {
  var top = this;
  while(top.parent_) {
    top = top.parent_;
  }
  return top;
};


/**
 * @return {!Element}
 * @throws {Error} When the top component does not have a getSvg_
 *     method or has not overridden it.
 */
Blockly.Component.prototype.getSvg = function() {
  var top = this.topComponent();
  goog.asserts.assertFunction(top.getSvg_);
  return top.getSvg_();
};


/**
 * Top components must override this method.
 * @return {!Element} The svg element.
 */
Blockly.Component.prototype.getSvg_ = goog.abstractMethod;

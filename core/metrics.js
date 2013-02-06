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
 * @fileoverview Metrics of the main workspace.
 * @author scr@google.com (Sheridan Rawlins)
 */
'use strict';

goog.provide('Blockly.Metrics');

goog.require('goog.object');



/**
 * @param {Object=} opt_initialValues Values to initialize the Metrics to.
 * @constructor
 */
Blockly.Metrics = function(opt_initialValues) {
  if (opt_initialValues)
    goog.object.extend(this, opt_initialValues);
};


/**
 * Height of the visible rectangle.
 * @type {number}
 */
Blockly.Metrics.prototype.viewHeight = 0;

/**
 * Width of the visible rectangle.
 * @type {number}
 */
Blockly.Metrics.prototype.viewWidth = 0;

/**
 * Height of the contents.
 * @type {number}
 */
Blockly.Metrics.prototype.contentHeight = 0;

/**
 * Width of the content.
 * @type {number}
 */
Blockly.Metrics.prototype.contentWidth = 0;

/**
 * Offset of top edge of visible rectangle from parent.
 * @type {number}
 */
Blockly.Metrics.prototype.viewTop = 0;

/**
 * Offset of left edge of visible rectangle from parent.
 * @type {number}
 */
Blockly.Metrics.prototype.viewLeft = 0;

/**
 * Offset of the top-most content from the y=0 coordinate.
 * @type {number}
 */
Blockly.Metrics.prototype.contentTop = 0;


/**
 * Offset of the left-most content from the x=0 coordinate.
 * @type {number}
 */
Blockly.Metrics.prototype.contentLeft = 0;

/**
 * Top-edge of view.
 * @type {number}
 */
Blockly.Metrics.prototype.absoluteTop = 0;


/**
 * Left-edge of view.
 * @type {number}
 */
Blockly.Metrics.prototype.absoluteLeft = 0;

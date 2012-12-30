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
 * @fileoverview Interactivity for the plane image.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

var rows1st = 0;
var rows2nd = 0;
var SVG = document.getElementById('plane');

/**
 * Redraw the rows when the slider has moved.
 * @param {number} value New slider position.
 */
function sliderChange(value) {
  var newRows = Math.round((1 - value) * 410 / 20);
  parent.redraw(newRows);
}

/**
 * Change the text of a label.
 * @param {string} id ID of element to change.
 * @param {string} text New text.
 */
function setText(id, text) {
  var el = document.getElementById(id);
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
  el.appendChild(document.createTextNode(text));
}

// Initialize the slider.
var rowSlider = new Slider(60, 330, 425, SVG, sliderChange);
rowSlider.setValue(0.225);

// Give the parent page a handle to this window.
parent.planeLoaded(window);
// Draw five 1st class rows.
parent.redraw(5);

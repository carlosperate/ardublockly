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
 * @fileoverview Blocks for graphing calculator app.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

if ('BlocklyStorage' in window) {
  BlocklyStorage.DISCARD_WARNING = 'Delete all "%1" blocks?';
  BlocklyStorage.HTTPREQUEST_ERROR = 'There was a problem with the request.\n';
  BlocklyStorage.LINK_ALERT = 'Share your blocks with this link:\n\n';
  BlocklyStorage.HASH_ERROR = 'Sorry, "%1" doesn\'t correspond with any saved Blockly file.';
  BlocklyStorage.XML_ERROR = 'Could not load your saved file.\n'+
      'Perhaps it was created with a different version of Blockly?\nXML: ';
}
/**
 * Create a namespace for the application.
 */
var Graph = {};

/**
 * Initialize Blockly and the graph.  Called on page load.
 * @param {!Blockly} blockly Instance of Blockly from iframe.
 */
Graph.init = function(blockly) {
  window.Blockly = blockly;

  window.onbeforeunload = function() {
    if (Blockly.mainWorkspace.getAllBlocks().length > 1 &&
        window.location.hash.length <= 1) {
      return 'Leaving this page will result in the loss of your work.';
    }
    return null;
  };

  if (!('BlocklyStorage' in window)) {
    document.getElementById('linkButton').className = 'disabled';
  }
  // An href with #key trigers an AJAX call to retrieve saved blocks.
  if ('BlocklyStorage' in window && window.location.hash.length > 1) {
    BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else { // Load the editor with a starting block.
    var xml = Blockly.Xml.textToDom(
        '<xml>' +
        '  <block type="graph_set_y" x="85" y="100"></block>' +
        '</xml>');
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  }

  Blockly.mainWorkspace.getCanvas().addEventListener('blocklyWorkspaceChange',
      window.parent.Graph.drawVisualization, false);
};
// Load the Google Chart Tools Visualization API and the chart package.
google.load('visualization', '1', {packages: ['corechart']});

/**
 * Visualize the graph of y = f(x) using Google Chart Tools.
 * For more documentation on Google Chart Tools, see this linechart example:
 * google-developers.appspot.com/chart/interactive/docs/gallery/linechart
 */
Graph.drawVisualization = function() {
  // Create and populate the data table.
  var data = google.visualization.arrayToDataTable(Graph.plot());

  var options = { //curveType: "function",
                  width: 400, height: 400,
                  chartArea: {left: '10%', width: '85%', height: '85%'}
                };

  // Create and draw the visualization, passing in the data and options.
  new google.visualization.LineChart(document.getElementById('visualization')).
      draw(data, options);
  var funcText = document.getElementById('funcText');
  if (funcText.lastChild) {
    funcText.removeChild(funcText.lastChild);
  }
  funcText.appendChild(document.createTextNode('y = ' + Graph.getFunction()));
};

/**
 * Plot points on the function y = f(x).
 * @return {!Array.<!Array>} 2D Array of points on the graph.
 */
Graph.plot = function() {
  // Get JavaScript code for f(x).
  var formula = Graph.getFunction();
  // Initialize a table with two column headings.
  var table = [];
  var y;
  // TODO: Improve range and scale of graph
  for (var x = -10; x <= 10; x = Math.round((x + 0.1) * 10) / 10) {
    try {
      y = eval(formula);
    } catch (e) {
      y = NaN;
    }
    if (!isNaN(y)) {
      // Prevent y from being displayed inconsistently, some in decimals, some
      // in scientific notation, often when y has accumulated rounding errors.
      y = Math.round(y * Math.pow(10, 14)) / Math.pow(10, 14);
      table.push([x, y]);
    }
  }
  // Add column heading to table.
  if (table.length == 0) {
  // If there is no value row in table, add a [0, 0] row to prevent graph error.
    table.unshift(['x', 'y'], [0, 0]);
  } else {
    table.unshift(['x', 'y']);
  }
  return table;
};

/**
 * Get from blocks the right hand side content of the function y = f(x).
 * @return {String} Formula in JavaScipt for f(x).
 */
Graph.getFunction = function() {
  var topBlocks = Blockly.mainWorkspace.getTopBlocks(false);
  var yBlock;
  // Set yBlock to only the code plugged into 'graph_set_y'.
  for (var j = 0; j < topBlocks.length; j++) {
    if (topBlocks[j].type == 'graph_set_y') {
      yBlock = topBlocks[j];
    }
  }
  if (!yBlock) {
    return NaN;
  }
  var generator = Blockly.Generator.get('JavaScript');
  generator.init();
  var code = generator.blockToCode(yBlock);
  // Remove the ";" generally ending the JavaScript statement y = {code};.
  return code.replace(/;$/, "");
};

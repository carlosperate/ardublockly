/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview JavaScript to configure front end design for the Arduino app
 *               with material design
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var ArduinoMaterial = ArduinoMaterial || {};

/**
 * Initialises the js/jQuery required for the materialize framework
 */
ArduinoMaterial.materializeJsInit = function() {
  $(document).ready(function() {
    // Accordion collapsible
    $('.collapsible').collapsible();
    // Nav bar
    $('.button-collapse').sideNav({menuWidth: 240, activationWidth: 70});
  });
};

/**
 * 
 */
ArduinoMaterial.resizeBlocks = function(e) {
  var content_blocks = document.getElementById('content_blocks');
  var wrapper_panel_size =
      ArduinoMaterial.getBBox_(document.getElementById('blocks_panel'));
  content_blocks.style.top = wrapper_panel_size.y + 'px';
  content_blocks.style.left = wrapper_panel_size.x + 'px';
  // Height and width need to be set, read back, then set again to
  // compensate for scrollbars.
  content_blocks.style.height = wrapper_panel_size.height + 'px';
  content_blocks.style.height =
      (2 * wrapper_panel_size.height - content_blocks.offsetHeight) + 'px';
  content_blocks.style.width = wrapper_panel_size.width + 'px';
  content_blocks.style.width =
      (2 * wrapper_panel_size.width - content_blocks.offsetWidth) + 'px';
  //Blockly.MsvgResize();
   Blockly.mainWorkspace.render();
  //alert(
  //  "resized " + wrapper_panel_size.width + " " + content_blocks.style.width);
};

/**
 * Compute the absolute coordinates and dimensions of an HTML element.
 * @param {!Element} element Element to match.
 * @return {!Object} Contains height, width, x, and y properties.
 * @private
 */
ArduinoMaterial.getBBox_ = function(element) {
  var height = element.offsetHeight;
  var width = element.offsetWidth;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  return {
    height: height,
    width: width,
    x: x,
    y: y
  };
};

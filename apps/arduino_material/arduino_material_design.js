/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview JavaScript for Arduino app with material design
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
ArduinoMaterial.bindDesignEventListeners = function() {
  window.addEventListener('resize', ArduinoMaterial.resizeBlocks, false);
}

/**
 * 
 */
ArduinoMaterial.resizeBlocks = function(e) {
  // Using a set time out due to differences in stacked events in browsers
  setTimeout(function() {
    var el = document.getElementById('content_blocks');
    var bBox = ArduinoMaterial.getBBox_(document.getElementById('blocks_panel'));
    el.style.top = bBox.y + 'px';
    el.style.left = bBox.x + 'px';
    // Height and width need to be set, read back, then set again to
    // compensate for scrollbars.
    el.style.height = bBox.height + 'px';
    el.style.height = (2 * bBox.height - el.offsetHeight) + 'px';
    el.style.width = bBox.width + 'px';
    el.style.width = (2 * bBox.width - el.offsetWidth) + 'px';
   //alert("resized " + bBox.height + " " + bBox.width);
  }, 1000);
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

/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview JavaScript to configure front end design for the Arduino app
 *               with material design.
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var ArduinoMaterial = ArduinoMaterial || {};

/**
 * Initialises the js/jQuery required for the materialize framework.
 */
ArduinoMaterial.materializeJsInit = function() {
  $(document).ready(function() {
    // Navigation bar
    $('.button-collapse').sideNav({
      menuWidth: 240,
      activationWidth: 70,
      edge: 'left'});
    // Accordion collapsible
    $('.collapsible').collapsible();
    // Drop down menus
    $(".dropdown-button").dropdown({hover: false});
    // Overlay content panels using modals (android dialogs)
    $('.modal-trigger').leanModal({
      dismissible: true,
      opacity: .5,
      in_duration: 300,
      out_duration: 200
     });
    // Pop-up tool tips
    $('.tooltipped').tooltip({"delay": 50});
    // Select menus
    $('select').material_select();
  });
};

/**
 * Resizes the container for Blockly and forces a re-render of the SVG. 
 */
ArduinoMaterial.runButtonSpinner = function(active) {
  var spinner = document.getElementById('button_run_spinner');
  var button_el = document.getElementById('button_run');
  var button_class = button_el.className;
  if (active) {
    spinner.style.display = 'block';
    button_el.className = button_class.replace('arduino_orange', 'grey');
  } else  {
    spinner.style.display = 'none';
    button_el.className = button_class.replace('grey', 'arduino_orange');
 }
};

/**
 * Displays or hides the 'load textarea xml' button.
 */
ArduinoMaterial.buttonLoadXmlCodeDisplay = function() {
  var xml_button = document.getElementById('button_load_xml');
  var xml_button_body = document.getElementById('xml_collapsible_body');
  // Waiting to check status due to the animation delay
  setTimeout(function() {
    if (xml_button_body.style.display == 'none') {
      $('#button_load_xml').hide();
    } else {
      $('#button_load_xml').fadeIn('slow');
    } 
  }, 500); 
};

/**
 * Sets the class and content of the toolbox On and Off button.
 * @param {!boolean} toolbox_visible Indicates if the toolbox visibility.
 */
ArduinoMaterial.showToolboxButtonState = function(toolbox_visible) {
  var toolbox_button = document.getElementById('button_toggle_toolbox');
  var toolbox_button_icon = document.getElementById('button_toggle_toolbox_icon');
  // Element conatins several classes, use replace to maintain the rest
  if (toolbox_visible == true) {
    toolbox_button.className = toolbox_button.className.replace(
      "button_toggle_toolbox_on", "button_toggle_toolbox_off"); 
    toolbox_button_icon.className = toolbox_button_icon.className.replace(
     'mdi-action-visibility', 'mdi-action-visibility-off');
  } else {
    toolbox_button.className = toolbox_button.className.replace(
      "button_toggle_toolbox_off", "button_toggle_toolbox_on"); 
    toolbox_button_icon.className = toolbox_button_icon.className.replace(
     'mdi-action-visibility-off', 'mdi-action-visibility');
  }
};

/**
 * Resizes the container for Blockly and forces a re-render of the SVG. 
 */
ArduinoMaterial.resizeBlocklyWorkspace = function() {
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
  //Blockly.mainWorkspace.render();
  //alert(
  //  "resized " + wrapper_panel_size.width + " " + content_blocks.style.width);

  // Sets the toolbox toggle button width to that of the toolbox
  if ( ArduinoMaterial.isToolboxVisible() &&
       Blockly.mainWorkspace.toolbox_.width ) {
    // For some reason normal set style and getElementById didn't work
    $('#button_toggle_toolbox').width(Blockly.mainWorkspace.toolbox_.width);
  }
};

/**
 * Sets the text for a "Materialize Modal" (like an android Dialog) to have
 * alert-like HTML messages.
 * @param {!string} title HTML to include in title.
 * @param {!element} body HTML to include in body.
 * @param {boolean=} confirm Indicates if the user is shown and option to just
 *                            'Ok' or 'Ok and cancel'.
 * @param {string=|function=} callback If confirm option is selected this would
 *                                     be the function called when clicked 'OK'.
 */
ArduinoMaterial.materialAlert = function(title, body, confirm, callback) {
  $("#gen_alert_title").text(title);
  $("#gen_alert_body").text('');
  $("#gen_alert_body").append(body);
  if (confirm == true) {
    $("#gen_alert_cancel_link").css({'display': 'block'});
    if (callback) {
      $("#gen_alert_ok_link").bind('click', callback);
    } 
  } else {
    $("#gen_alert_cancel_link").css({'display': 'none'});
    $("#gen_alert_ok_link").unbind('click');
  }
  $('#gen_alert').openModal();
  window.location.hash = '';
};

/**
 * Populates the Arduino output data modal and opens it.
 * @param {!element} body_el HTML to include into dialog content.
 */
ArduinoMaterial.arduinoIdeModal = function(body_el) {
  $("#arduino_dialog_body").text('');
  $("#arduino_dialog_body").append(body_el);
  $('#arduino_dialog').openModal();
  window.location.hash = '';
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

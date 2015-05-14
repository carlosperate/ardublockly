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
    // Drop down menus
    $('.dropdown-button').dropdown({hover: false});
    // Overlay content panels using modals (android dialogs)
    $('.modal-trigger').leanModal({
      dismissible: true,
      opacity: .5,
      in_duration: 300,
      out_duration: 200
     });
    // Pop-up tool tips
    $('.tooltipped').tooltip({'delay': 50});
    // Select menus
    $('select').material_select();
  });
};

/**
 * Resizes the container for Blockly and forces a re-render of the SVG. 
 */
ArduinoMaterial.runButtonSpinner = function(active) {
  var spinner = document.getElementById('button_run_spinner');
  var buttonEl = document.getElementById('button_run');
  var buttonClass = buttonEl.className;
  if (active) {
    spinner.style.display = 'block';
    buttonEl.className = buttonClass.replace('arduino_orange', 'grey');
  } else  {
    spinner.style.display = 'none';
    buttonEl.className = buttonClass.replace('grey', 'arduino_orange');
 }
};

/**
 * Displays or hides the 'load textarea xml' button.
 */
ArduinoMaterial.buttonLoadXmlCodeDisplay = function() {
  //var xmlButton = document.getElementById('button_load_xml');
  var xmlButtonBody = document.getElementById('xml_collapsible_body');
  // Waiting to check status due to the animation delay
  setTimeout(function() {
    if (xmlButtonBody.style.display == 'none') {
      $('#button_load_xml').hide();
    } else {
      $('#button_load_xml').fadeIn('slow');
    } 
  }, 500); 
};

/**
 * Sets the class and content of the toolbox On and Off button.
 * @param {!boolean} toolboxVisible Indicates if the toolbox visibility.
 */
ArduinoMaterial.showToolboxButtonState = function(toolboxVisible) {
  var toolboxButton = document.getElementById('button_toggle_toolbox');
  var toolboxButtonIcon = document.getElementById('button_toggle_toolbox_icon');
  // Element conatins several classes, use replace to maintain the rest
  if (toolboxVisible == true) {
    toolboxButton.className = toolboxButton.className.replace(
      'button_toggle_toolbox_on', 'button_toggle_toolbox_off'); 
    toolboxButtonIcon.className = toolboxButtonIcon.className.replace(
     'mdi-action-visibility', 'mdi-action-visibility-off');
  } else {
    toolboxButton.className = toolboxButton.className.replace(
      'button_toggle_toolbox_off', 'button_toggle_toolbox_on'); 
    toolboxButtonIcon.className = toolboxButtonIcon.className.replace(
     'mdi-action-visibility-off', 'mdi-action-visibility');
  }
};

/**
 * Resizes the container for Blockly and forces a re-render of the SVG. 
 */
ArduinoMaterial.resizeBlocklyWorkspace = function() {
  var contentBlocks = document.getElementById('content_blocks');
  var wrapperPanelSize =
      ArduinoMaterial.getBBox_(document.getElementById('blocks_panel'));

  contentBlocks.style.top = wrapperPanelSize.y + 'px';
  contentBlocks.style.left = wrapperPanelSize.x + 'px';
  // Height and width need to be set, read back, then set again to
  // compensate for scrollbars.
  contentBlocks.style.height = wrapperPanelSize.height + 'px';
  contentBlocks.style.height =
      (2 * wrapperPanelSize.height - contentBlocks.offsetHeight) + 'px';
  contentBlocks.style.width = wrapperPanelSize.width + 'px';
  contentBlocks.style.width =
      (2 * wrapperPanelSize.width - contentBlocks.offsetWidth) + 'px';

  //Blockly.MsvgResize();
  //Blockly.mainWorkspace.render();
  //alert(
  //  'resized ' + wrapperPanelSize.width + ' ' + contentBlocks.style.width);

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
  $('#gen_alert_title').text(title);
  $('#gen_alert_body').text('');
  $('#gen_alert_body').append(body);
  if (confirm == true) {
    $('#gen_alert_cancel_link').css({'display': 'block'});
    if (callback) {
      $('#gen_alert_ok_link').bind('click', callback);
    } 
  } else {
    $('#gen_alert_cancel_link').css({'display': 'none'});
    $('#gen_alert_ok_link').unbind('click');
  }
  $('#gen_alert').openModal();
  window.location.hash = '';
};

/**
 * Populates the Arduino output data modal and opens it.
 * @param {!element} bodyEl HTML to include into dialog content.
 */
ArduinoMaterial.arduinoIdeModal = function(bodyEl) {
  $('#arduino_dialog_body').text('');
  $('#arduino_dialog_body').append(bodyEl);
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

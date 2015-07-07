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
 * Initialises all the design related JavaScript.
 */
ArduinoMaterial.designJsInit = function() {
  ArduinoMaterial.materializeJsInit();
  ArduinoMaterial.resizeToggleToolboxBotton();
  ArduinoMaterial.sketchNameSizeEffect();
};

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
        in_duration: 200,
        out_duration: 250
     });
    // Pop-up tool tips
    $('.tooltipped').tooltip({'delay': 50});
    // Select menus
    $('select').material_select();
  });
};

/**
 * Binds the event listeners relevant to the page design.
 * @private
 */
ArduinoMaterial.bindDesignEventListeners_ = function() {
  // Resize blockly workspace on window resize
  window.addEventListener(
      'resize', ArduinoMaterial.resizeBlocklyWorkspace, false);
  // Display/hide the XML load button when the XML collapsible header is clicked
  document.getElementById('xml_collapsible_header').addEventListener(
      'click', ArduinoMaterial.buttonLoadXmlCodeDisplay);
  // Toggle the content height on click to the IDE output collapsible header
  document.getElementById('ide_output_collapsible_header').addEventListener(
      'click', function() {
        ArduinoMaterial.contentHeightToggle();
      });
  // Display/hide the additional IDE buttons when mouse over/out of play button
  $("#button_run").mouseenter(function () {
      ArduinoMaterial.showExtraIdeButtons(true);
  });
  $("#ide_buttons_wrapper").mouseleave(function () {
      ArduinoMaterial.showExtraIdeButtons(false); 
  });
};

/**
 * Sets the spinner around the play button ON or OFF.
 * @param {!boolean} active True turns ON the spinner, false OFF.
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
 * Displays or hides the 'load textarea xml' button based on the state of the
 * collapsible 'xml_collapsible_body'.
 */
ArduinoMaterial.buttonLoadXmlCodeDisplay = function() {
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
 * Displays or hides the addition Arduino IDE action buttons.
 * Hide/display effects done with CCS3 transitions on visibility and opacity.
 * @param {!boolean} show Indicates if the extra buttons are to be shown.
 */
ArduinoMaterial.showExtraIdeButtons = function(show) {
  var openIdeButton = document.getElementById('button_open_ide');
  var verifyButton = document.getElementById('button_verify');
  if (show) {
    // prevent previously set time-out to hide buttons while trying to show them
    clearTimeout(ArduinoMaterial.outHoldtimeoutHandle);
    clearTimeout(ArduinoMaterial.hidetimeoutHandle);
    verifyButton.style.visibility = 'visible';
    verifyButton.style.opacity = '1';
    ArduinoMaterial.showtimeoutHandle = setTimeout(function() {
      openIdeButton.style.visibility = 'visible';
      openIdeButton.style.opacity = '1';
    }, 50);
  } else {
    // As the mouse out can be accidental, only hide them after a delay 
    ArduinoMaterial.outHoldtimeoutHandle = setTimeout(function() {
      // Prevent show time-out to affect the hiding of the buttons 
      clearTimeout(ArduinoMaterial.showtimeoutHandle);
      openIdeButton.style.visibility = 'hidden';
      openIdeButton.style.opacity = '0';
      ArduinoMaterial.hidetimeoutHandle = setTimeout(function() {
        verifyButton.style.visibility = 'hidden';
        verifyButton.style.opacity = '0';
      }, 50);
    }, 200);
  }
};

/**
 * Sets the class and content of the toolbox View and Hide button.
 * @param {!boolean} toolboxVisible Indicates if the toolbox visibility.
 */
ArduinoMaterial.showToolboxButtonState = function(toolboxVisible) {
  var toolboxButton = document.getElementById('button_toggle_toolbox');
  var toolboxButtonIcon = document.getElementById('button_toggle_toolbox_icon');
  // Element contains several classes, use replace to maintain the rest
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
 * Resizes the toolbox button to toggle its visibility to the width of the
 * toolbox.
 * The toolbox width does not change with workspace width, so safe to do once,
 * but it needs to be done after blockly has been injected.
 * @private
 */
ArduinoMaterial.resizeToggleToolboxBotton = function() {
  // As the toolbox inject is asynchronous we need to wait
  if (ArduinoMaterial.BLOCKLY_INJECTED == false) {
    setTimeout(ArduinoMaterial.resizeToggleToolboxBotton, 50);
  } else {
    // Sets the toolbox toggle button width to that of the toolbox
    if ( ArduinoMaterial.isToolboxVisible() &&
         ArduinoMaterial.workspace.toolbox_.width ) {
      // For some reason normal set style and getElementById didn't work
      $('#button_toggle_toolbox').width(ArduinoMaterial.workspace.toolbox_.width);
    }
  }
};

/**
 * Resizes the container for Blockly. 
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
 * Populates the Arduino IDE output content area and visually highlights it
 * to call for the user attention.
 * @param {!element} bodyEl HTML to include into IDE output content area.
 */
ArduinoMaterial.arduinoIdeOutput = function(bodyEl) {
  var ideOuputContent = document.getElementById('content_ide_output');
  ideOuputContent.innerHTML = '';
  ideOuputContent.appendChild(bodyEl);
  ArduinoMaterial.highlightIdeOutputHeader();
};

/**
 * Hides the side menu button.
 */
ArduinoMaterial.hideSideMenuButton = function() {
  var sideMenuButton = document.getElementById('button-collapse');
  sideMenuButton.style.display = 'none';
};

/**
 * Sets all the elements using the container class to have a width of 100%.
 */
ArduinoMaterial.containerFullWidth = function() {
  var containers = $('.container');
  for (var i = 0; i < containers.length; i++) {
    containers[i].style.width = '100%';
  }
};

/**
 * Initialises the sketch name input text JavaScript to dynamically adjust its
 * width to the width of its contents. 
 */
ArduinoMaterial.sketchNameSizeEffect = function() {
  var resizeInput = function() {
    var inputSize = ($(this).val().length > 1) ? ($(this).val().length - 1) : 1;
    $(this).attr('size', inputSize);
  };

  var correctInput = function() {
    // If nothing in the input, add default name
    if ($(this).val() == '') {
      $(this).val('Sketch_Name');
      $(this).attr('size', 10);
    }
    // Replace all spaces with underscores
    $(this).val($(this).val().replace(/ /g, '_'));
  };

  var sketchNameInput = $('#sketch_name');
  sketchNameInput.val('Sketch_Name');
  sketchNameInput.attr('size', 10);
  sketchNameInput.keyup(resizeInput).each(resizeInput);
  sketchNameInput.blur(correctInput);
};

/**
 * Creates a highlight animation to the Arduino IDE output header.
 */
ArduinoMaterial.highlightIdeOutputHeader = function() {
  var header = document.getElementById('ide_output_collapsible_header');
  var h = 'ide_output_header_highlight';
  var n = 'ide_output_header_normal';
  header.className = header.className.replace(/ide_output_header_\S+/, h);
  setTimeout(function() {
    header.className = header.className.replace(/ide_output_header_\S+/, n);
    setTimeout(function() { 
      header.className = header.className.replace(/ide_output_header_\S+/, h);
      setTimeout(function() { 
        header.className = header.className.replace(/ide_output_header_\S+/, n);
      }, 500);
    }, 500);
  }, 500);
};

/**
 * Controls the height of the block and collapsible content between 2 states 
 * using CSS classes.
 * It's state is dependent on the state of the IDE output collapsible. The
 * collapsible functionality from Materialize framework adds the active class,
 * so this class is consulted to shrink or expand the content height.
 * @param {!Boolean} shrinkIt Indicates if the contents should be shrunk.
 */
ArduinoMaterial.contentHeightToggle = function() {
  var outputHeader = document.getElementById('ide_output_collapsible_header');
  var blocks = document.getElementById('blocks_panel');
  var arduino = document.getElementById('content_arduino');
  var xml = document.getElementById('content_xml');

  // Blockly doesn't resize with CSS3 transitions enabled, so do it manually
  var timerId = setInterval(function () {
    Blockly.fireUiEvent(window, 'resize');
  }, 15);
  setTimeout(function() {
    clearInterval(timerId);
  }, 400);

  // Apart from checking if the output is visible, do not bother to shrink in
  // small screens as the minimum height of the content will kick in and cause
  // the content to be behind the IDE output data anyway. 
  if (outputHeader.className.match('active') && $(window).height() > 850) {
    blocks.className = "content height_transition blocks_panel_small";
    arduino.className = "content height_transition content_arduino_small";
    xml.className = "content height_transition content_xml_small";
  } else {
    blocks.className = "content height_transition blocks_panel_large";
    arduino.className = "content height_transition content_arduino_large";
    xml.className = "content height_transition content_xml_large";
  }

  // If the height transition CSS is left then blockly does not resize
  setTimeout(function() {
    blocks.className = blocks.className.replace('height_transition', '');
    arduino.className= arduino.className.replace('height_transition', '');
    xml.className= xml.className.replace('height_transition', '');
  }, 400);
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

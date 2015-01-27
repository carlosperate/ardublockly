/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Ajax calls to the ArduServerCompiler python server
 */
'use strict';

/**
 * Create a name space for the application.
 */
var ArduServerCompiler = {};

/**
 * Sends Form data to the ArduBlocklyServer using Ajax
 * @param {!string} url Requestor URL
 * @param {!string} params Form parameters in the "var=x&var2=y" format
 * @param {!function} callback Request callback function.
 * @return False if an error occurred 
 */
ArduServerCompiler.ajaxPostForm = function(url, params, callback) {
  var request = ArduServerCompiler.createAjaxRequest();
  request.open("POST", url, true);
  //TODO: Look for a non-deprecated content-type
  request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  request.setRequestHeader("Content-length", params.length);
  request.setRequestHeader("Connection", "close");

  // The data received is JSON, so it needs to be converted into the right
  // format to be displayed in the page.
  request.onreadystatechange = function() {
    if ( (request.readyState == 4) && (request.status == 200) ) {
      var el = ArduServerCompiler.createElementFromJson(request.responseText);
      callback(el);
    }
  }

  // Send the data
  request.send(params);
};

/**
 * Sends plain data to the ArduBlocklyServer using Ajax
 * @param {!string} url Requester URL
 * @param {!string} params Form parameters in the "var=x&var2=y" format
 * @param {!function} callback Request callback function.
 * @return False if an error occurred 
 */
ArduServerCompiler.ajaxPostPlain = function(url, data, callback) {
  var request = ArduServerCompiler.createAjaxRequest();
  request.open("POST", url, true);
  //TODO: Look for a non-deprecated content-type
  request.setRequestHeader("Content-type","text/plain");
  request.setRequestHeader("Content-length", data.length);
  request.setRequestHeader("Connection", "close");

  // The data received is JSON, so it needs to be converted into the right
  // format to be displayed in the page.
  request.onreadystatechange = function() {
    if ( (request.readyState == 4) && (request.status == 200) ) {
      var el = ArduServerCompiler.createElementFromJson(request.responseText);
      callback(el);
    }
  }

  // Send the data
  request.send(data);
};

/**
 * Creates an AJAX request 
 * @return An XML HTTP Request
 */
ArduServerCompiler.createAjaxRequest = function() {
  var request = false;
  try {
    // Firefox, Chrome, IE7+, Opera, Safari
    request = new XMLHttpRequest();
  }
  catch (e) {
    // IE6 and earlier
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (e) {
        throw 'Your browser does not support AJAX. You will not be able to' +
              'Upload a sketch';
        request = null;
      }
    }
  }
  return request;
}

/**
 * Creates an HTML element based on the JSON data received from the server.
 * @param {!string} json_data A string containing the JSON data to be parsed.
 * @return {!element} An HTML element, which type depends on the JSON 'element'
 *                    key (currently only text input or drop down)
 */
ArduServerCompiler.createElementFromJson = function(json_data) {
  var parsed_json = JSON.parse(json_data);
  var element;

  if (parsed_json.element == 'text_input') {
    // Simple text input
    element = document.createElement('input');
    element.setAttribute('type', 'text');
    element.setAttribute('value', parsed_json.display_text);
  }else if (parsed_json.element == 'dropdown') {
    // Drop down list of unknown length with a selected item
    element = document.createElement('select');
    element.name = parsed_json.response_type;
    for (var i=0; i<parsed_json.options.length; i++) {
      var option = document.createElement("option"); 
      option.value = parsed_json.options[i].value;
      option.text = parsed_json.options[i].display_text;
      // Check selected option and mark it
      if (parsed_json.options[i].value == parsed_json.selected) {
        option.selected = true;
      }
      element.appendChild(option);
    }
  } else if (parsed_json.element == 'div_ide_output') {
    // Formatted text for the Arduino IDE CLI output
    var el_title = document.createElement('h4');
    el_title.innerHTML = parsed_json.conclusion;
    if (parsed_json.success == true) {
      el_title.className = 'arduino_dialog_success';
    } else {
      el_title.className = 'arduino_dialog_failure';
    }

    var el_out = document.createElement('span');
    el_out.className = 'arduino_dialog_out';
    el_out.innerHTML = parsed_json.output.split('\n').join('<br />');

    element = document.createElement("div");
    element.appendChild(el_title);
    element.appendChild(el_out);

    // Only ouput error message if it was not successful
    if (parsed_json.success == false) {
      var el_err = document.createElement('span');
      el_err.className = 'arduino_dialog_out_error'
      el_err.innerHTML = parsed_json.error_output.split('\n').join('<br />');
      element.appendChild(el_err);
    } 
  } else {
    //TODO: Not recognised alert the user/developer somehow
  }

  return element;
};

/**
 * Gets the current Compiler location from the ArduServerCompiler settings.
 * @param {!function} callback Callback function for the server request, must
 *                             one argument to receive the new location within
 *                             an HTML element of type input text.
 */
ArduServerCompiler.requestCompilerLocation = function(callback) {
   ArduServerCompiler.ajaxPostForm(
      "ArduServerCompilerSettings.html",
      "compiler=get",
      callback)
};

/**
 * Request to the ArduServerCompiler to prompt the user for a new compiler
 * location. Done by the Python server because a 'file browse' triggered by
 * the browser with JS will obscure the user information for security reasons.
 * @param {!function} callback Callback function for the server request, must
 *                             one argument to receive the new location within
 *                             an HTML element of type input text.
 */
ArduServerCompiler.requestNewCompilerLocation = function(callback) {
  //TODO: Remove the something=else, its there for testing purposes
  ArduServerCompiler.ajaxPostForm(
      "ArduServerCompilerSettings.html",
      "compiler=set&something=else",
      callback)
};

/**
 * Gets the current Sketch location from the ArduServerCompiler settings.
 * @param {!function} callback Callback function for the server request, must
 *                             one argument to receive the new location within
 *                             an HTML element of type input text.
 */
ArduServerCompiler.requestSketchLocation = function(callback) {
   ArduServerCompiler.ajaxPostForm(
      "ArduServerCompilerSettings.html",
      "sketch=get",
      callback)
};

/**
 * Request to the ArduServerCompiler to prompt the user for a new sketch
 * location. Done by the Python server because a 'file browse' triggered by
 * the browser with JS will obscure the user information for security reasons.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new location 
 *                             within an HTML element of type input text.
 */
ArduServerCompiler.requestNewSketchLocation = function(callback) {
  ArduServerCompiler.ajaxPostForm(
      "ArduServerCompilerSettings.html",
      "sketch=set",
      callback)
};

/**
 * Request to the ArduServerCompiler to return JSON data containing all
 * available target Arduino Boards, and the selected one in the settings.
 * The data is then processed into an HTML element and sent to the callback
 * function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML select element.
 */
ArduServerCompiler.requestArduinoBoards = function(callback) {
  ArduServerCompiler.ajaxPostForm(
      "ArduServerCompilerSettings.html",
      "board=get",
      callback)
};

/**
 * Sends the inputted Arduino Board type to the ArduServerCompiler Settings.
 * The new settings menu for the Board type is then processed into an HTML
 * element and sent to the callback function as an argument.
 * @param {!string} new_board Indicates which board has been selected.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML select element.
 */
ArduServerCompiler.setArduinoBoard = function(new_board, callback) {
  ArduServerCompiler.ajaxPostForm(
      "ArduServerCompilerSettings.html",
      "board=set&value=" + new_board,
      callback)
};

/**
 * Request to the ArduServerCompiler to return JSON data containing all
 * available serial ports in the computer, and the selected one in the
 * settings. The data is then processed into an HTML element and sent to the
 * callback function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML select element.
 */
ArduServerCompiler.requestSerialPorts = function(callback) {
  ArduServerCompiler.ajaxPostForm(
      "ArduServerCompilerSettings.html",
      "serial=get",
      callback)
};

/**
 * Sends the inputted Serial Port to the ArduServerCompiler Settings. The new
 * settings menu for the Serial Port is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!string} new_port Indicates which port has been selected.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML select element.
 */
ArduServerCompiler.setSerialPort = function(new_port, callback) {
  ArduServerCompiler.ajaxPostForm(
      "ArduServerCompilerSettings.html",
      "serial=set&value=" + new_port,
      callback)
};

/**
 * Gets the current IDE setting from the ArduServerCompiler settings. The new
 * settings menu for the IDE options is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML select element.
 */
ArduServerCompiler.requestIdeOptions = function(callback) {
  ArduServerCompiler.ajaxPostForm(
      "ArduServerCompilerSettings.html",
      "ide=get",
      callback)
};

/**
 * Sends the inputted IDE option to the ArduServerCompiler Settings. The new
 * settings menu for the IDE options is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!string} ide_option Indicates which option has been selected.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML select element.
 */
ArduServerCompiler.setIdeOptions = function(ide_option, callback) {
  ArduServerCompiler.ajaxPostForm(
      "ArduServerCompilerSettings.html",
      "ide=set&value=" + ide_option,
      callback)
};


/**
 * Sends the Arduino code to the ArduServerCompiler to be processed as defined
 * by the settings.
 * @param {!string} code Arduino code in a single string format
 */
ArduServerCompiler.sendSketchToServer = function(code, callback) {
  ArduServerCompiler.ajaxPostPlain(
      "SendSketch.html",
      code,
      callback);
};

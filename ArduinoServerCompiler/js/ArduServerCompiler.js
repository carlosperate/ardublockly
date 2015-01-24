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
  var request = false;
  try {
    // Firefox, Chrome, IE7+, Opera, Safari
    request = new XMLHttpRequest();
  }
  catch (e) {
    // IE6-
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (e) {
        alert("Your browser does not support AJAX!");
        return false;
      }
    }
  }
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
  var request = false;
  try {
    // Firefox, Chrome, IE7+, Opera, Safari
    request = new XMLHttpRequest();
  }
  catch (e) {
    // IE6-
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (e) {
        alert("Your browser does not support AJAX!");
        return false;
      }
    }
  }
  request.open("POST", url, true);
  //TODO: Look for a non-deprecated content-type
  request.setRequestHeader("Content-type","text/plain");
  request.setRequestHeader("Content-length", data.length);
  request.setRequestHeader("Connection", "close");

  // The data received is JSON, so it needs to be converted into the right
  // format to be displayed in the page.
  request.onreadystatechange = function() {
    if ( (request.readyState == 4) && (request.status == 200) ) {
      callback(request.responseText);
    }
  }

  // Send the data
  request.send(data);
};

/**
 * Creates an HTML element based on the JSON data received from the server.
 * @param {!string} json_data A string containing the JSON data to be parsed.
 * @return {!element} Description
 */
ArduServerCompiler.createElementFromJson = function(json_data) {
  var parsed_json = JSON.parse(json_data);
  var element;

  if (parsed_json.element == "text_input") {
    // Simple text input
    element = document.createElement("input");
    element.setAttribute('type', 'text');
    element.setAttribute('value', parsed_json.display_text);
  } else if (parsed_json.element == "dropdown") {
    // Drop down list of unknown length with a selected item
    element = document.createElement("select");
    element.name = parsed_json.setting_type;
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
  } else {
    //TODO: Not recognised 
  }

  return element;
};

/**
 * Gets the current Compiler location from the ArduServerCompiler settings.
 * @param {!function} callback Callback function for the server request, must
 *                             one argument to receive the new location as a
 *                             string.
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
 * the browser with js will obscure the user information for security reasons.
 * @param {!function} callback Callback function for the server request, must
 *                             one argument to receive the new location as a
 *                             string.
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
 *                             one argument to receive the new location as a
 *                             string.
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
 * the browser with js will obscure the user information for security reasons.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new location as
 *                             a string.
 */
ArduServerCompiler.requestNewSketchLocation = function(callback) {
  ArduServerCompiler.ajaxPostForm(
      "ArduServerCompilerSettings.html",
      "sketch=set",
      callback)
};

/**
 * Request to the ArduServerCompiler to return JSON data containing all
 * available serial ports in the computer, and the selected one in the
 * settings. The data is then processed into an HTML element and send to the
 * callback function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             a string.
 */
ArduServerCompiler.requestSerialPorts = function(callback) {
  ArduServerCompiler.ajaxPostForm(
      "ArduServerCompilerSettings.html",
      "serialPort=get",
      callback)
};

/**
 * Sends the inputted Serial Port to the ArduServerCompiler Settings. The new
 * settings menu for the Serial Port is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!string} new_port Indicates which port is selected.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             a string.
 */
ArduServerCompiler.setSerialPort = function(new_port, callback) {
  ArduServerCompiler.ajaxPostForm(
      "ArduServerCompilerSettings.html",
      "serialPort=set&value=" + new_port,
      callback)
};

/**
 * Gets the current IDE setting from the ArduServerCompiler settings. The new
 * settings menu for the IDE options is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             a boolean.
 */
ArduServerCompiler.requestIdeOnly = function(callback) {
  ArduServerCompiler.ajaxPostForm(
      "ArduServerCompilerSettings.html",
      "ideLaunch=get",
      callback)
};

/**
 * Sends the inputted IDE option to the ArduServerCompiler Settings. The new
 * settings menu for the IDE options is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!string} ide_option Indicates which option is selected.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML element.
 */
ArduServerCompiler.setIdeOnly = function(ide_option, callback) {
  ArduServerCompiler.ajaxPostForm(
      "ArduServerCompilerSettings.html",
      "ideLaunch=set&value=" + ide_option,
      callback)
};


/**
 * Sends the Arduino code to the ArduServerCompiler to be processed as defined
 * by the settings.
 * @param {!string} code Arduino code in a single string format
 */
ArduServerCompiler.sendSketchToServer = function(code, callback) {
  ArduServerCompiler.ajaxPostPlain(
      "ArduServerCompiler.html",
      code,
      callback);
};

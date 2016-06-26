/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Ajax calls to the Ardublockly Server python program.
 */
'use strict';

/** Create a name space for the application. */
var ArdublocklyServer = {};

/**
 * Sends Form data to the ArduBlocklyServer using Ajax.
 * @param {!string} url Requestor URL.
 * @param {!string} params Form parameters in the 'var=x&var2=y' format.
 * @param {!function} callback Request callback function.
 */
ArdublocklyServer.ajaxPostForm = function(url, params, callback) {
  var request = ArdublocklyServer.createAjaxRequest();
  try {
    request.open('POST', url, true);
    request.setRequestHeader(
        'Content-type', 'application/x-www-form-urlencoded');
  } catch (e) {
    // The request will fail if opening the html directly on a browser, so
    // let's just send the callback nullified and the front end will deal.
    callback(null);
  }

  // The data received is JSON, so it needs to be converted into the right
  // format to be displayed in the page.
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      if (request.status == 200) {
        callback(request.responseText);
      } else if (request.status == 405) {
        // return a null element which will be dealt with in the front end
        callback(null);
      }
    }
  };

  // Send the data
  try {
    request.send(params);
  } catch (e) {
    // Nullify callback to indicate error
    callback(null);
  }
};

/**
 * Sends plain data to the ArduBlocklyServer using Ajax.
 * @param {!string} url Requester URL.
 * @param {!string} data Plain text currently used to send Arduino code only.
 * @param {!function} callback Request callback function.
 */
ArdublocklyServer.ajaxPostPlain = function(url, data, callback) {
  var request = ArdublocklyServer.createAjaxRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'text/plain');

  // The data received is JSON, so it needs to be converted into the right
  // format to be displayed in the page.
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      if (request.status == 200) {
        callback(request.responseText);
      } else if (request.status == 405) {
        // return a null element which will be dealt with in the front end
        callback(null);
      }
    }
  };

  // Send the data
  try {
    request.send(data);
  } catch (e) {
    // The request will fail if opening the html directly on a browser, so
    // let's just send the callback nullified and the front end will deal.
    callback(null);
  }
};

/**
 * Reads JSON data from the server and forwards formatted JavaScript object.
 * @param {!string} fileLocation Location for the JSON data.
 * @param {!function} jsonDataCb Callback with JSON object or null for error.
 */
Ardublockly.getJsonData = function(fileLocation, jsonDataCb) {
  var request = ArdublocklyServer.createAjaxRequest();
  request.overrideMimeType("application/json");
  var requestCb = function() {
    if (request.readyState == 4) {
      if (request.status == 200) {
        var jsonObj = null;
        try {
          jsonObj = JSON.parse(request.responseText);
        } catch(e) {
          console.error('Incorrectly formatted JSON data from ' + fileLocation);
          throw e;
        }
        jsonDataCb(jsonObj);
      } else {
        jsonDataCb(null);
      }
    }
  };
  try {
    request.open('GET', fileLocation, true);
    request.onreadystatechange = requestCb;
    request.send(null);
  } catch (e) {
    jsonDataCb(null);
  }
};

/** @return {XMLHttpRequest} An XML HTTP Request multi-browser compatible. */
ArdublocklyServer.createAjaxRequest = function() {
  var request = false;
  try {
    // Firefox, Chrome, IE7+, Opera, Safari
    request = new XMLHttpRequest();
  }
  catch (e) {
    // IE6 and earlier
    try {
      request = new ActiveXObject('Msxml2.XMLHTTP');
    }
    catch (e) {
      try {
        request = new ActiveXObject('Microsoft.XMLHTTP');
      }
      catch (e) {
        throw 'Your browser does not support AJAX. You will not be able to' +
              'use all of Ardublockly features.';
        request = null;
      }
    }
  }
  return request;
};

/**
 * Creates an HTML element based on the JSON data received from the server.
 * @param {!string} json_data A string containing the JSON data to be parsed.
 * @return {!element} An HTML element, which type depends on the JSON 'element'
 *                    key (currently only text input or drop down).
 */
ArdublocklyServer.createElementFromJson = function(json_data) {
  var parsed_json = JSON.parse(json_data);
  var element = null;

  if (parsed_json.element == 'text_input') {
    // Simple text input
    element = document.createElement('input');
    element.setAttribute('type', 'text');
    element.setAttribute('value', parsed_json.display_text);
  } else if (parsed_json.element == 'dropdown') {
    // Drop down list of unknown length with a selected item
    element = document.createElement('select');
    element.name = parsed_json.response_type;
    for (var i = 0; i < parsed_json.options.length; i++) {
      var option = document.createElement('option');
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
    el_title.innerHTML = Ardublockly.getLocalStr(parsed_json.conclusion);
    if (parsed_json.success == true) {
      el_title.className = 'arduino_dialog_success';
    } else {
      el_title.className = 'arduino_dialog_failure';
    }

    var el_out = document.createElement('span');
    el_out.className = 'arduino_dialog_out';
    // If larger than 50 characters then don't bother looking for language key
    if (parsed_json.output.length < 50) {
      el_out.innerHTML = Ardublockly.getLocalStr(parsed_json.output) ||
                         parsed_json.output.split('\n').join('<br />');
    } else {
      el_out.innerHTML = parsed_json.output.split('\n').join('<br />');
    }

    element = document.createElement('div');
    element.appendChild(el_title);
    element.appendChild(el_out);

    // Only ouput error message if it was not successful
    if (parsed_json.success == false) {
      var el_err = document.createElement('span');
      el_err.className = 'arduino_dialog_out_error';
      // If larger than 50 characters then don't bother looking for language key
      if (parsed_json.output.length < 50) {
        el_err.innerHTML = Ardublockly.getLocalStr(parsed_json.error_output) ||
                           parsed_json.error_output.split('\n').join('<br />');
      } else {
        el_err.innerHTML = parsed_json.error_output.split('\n').join('<br />');
      }
      element.appendChild(el_err);
    }
  } else {
    //TODO: Not recognised, alert the user/developer somehow
  }

  return element;
};

/**
 * Gets the current Compiler location from the ArdublocklyServer settings.
 * @param {!function} callback Callback function for the server request, must
 *                             one argument to receive the new location within
 *                             an HTML element of type input text.
 */
ArdublocklyServer.requestCompilerLocation = function(callback) {
   ArdublocklyServer.ajaxPostForm(
      'ArduServerCompilerSettings.html',
      'compiler=get',
      callback);
};

/**
 * Request to the Ardublockly Server to prompt the user for a new compiler
 * location. Done by the Python server because a 'file browse' triggered by
 * the browser with JS will obscure the user information for security reasons.
 * @param {!function} callback Callback function for the server request, must
 *                             one argument to receive the new location within
 *                             an HTML element of type input text.
 */
ArdublocklyServer.requestNewCompilerLocation = function(callback) {
  //TODO: Remove the something=else, its there for testing purposes
  ArdublocklyServer.ajaxPostForm(
      'ArduServerCompilerSettings.html',
      'compiler=set&something=else',
      callback);
};

/**
 * Gets the current Sketch location from the Ardublockly Server settings.
 * @param {!function} callback Callback function for the server request, must
 *                             one argument to receive the new location within
 *                             an HTML element of type input text.
 */
ArdublocklyServer.requestSketchLocation = function(callback) {
   ArdublocklyServer.ajaxPostForm(
      'ArduServerCompilerSettings.html',
      'sketch=get',
      callback);
};

/**
 * Request to the Ardublockly Server to prompt the user for a new sketch
 * location. Done by the Python server because a 'file browse' triggered by
 * the browser with JS will obscure the user information for security reasons.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new location
 *                             within an HTML element of type input text.
 */
ArdublocklyServer.requestNewSketchLocation = function(callback) {
  ArdublocklyServer.ajaxPostForm(
      'ArduServerCompilerSettings.html',
      'sketch=set',
      callback);
};

/**
 * Request to the Ardublockly Server to return JSON data containing all
 * available target Arduino Boards, and the selected one in the settings.
 * The data is then processed into an HTML element and sent to the callback
 * function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML select element.
 */
ArdublocklyServer.requestArduinoBoards = function(callback) {
  ArdublocklyServer.ajaxPostForm(
      'ArduServerCompilerSettings.html',
      'board=get',
      callback);
};

/**
 * Sends the inputted Arduino Board type to the Ardublockly Server Settings.
 * The new settings menu for the Board type is then processed into an HTML
 * element and sent to the callback function as an argument.
 * @param {!string} new_board Indicates which board has been selected.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML select element.
 */
ArdublocklyServer.setArduinoBoard = function(new_board, callback) {
  ArdublocklyServer.ajaxPostForm(
      'ArduServerCompilerSettings.html',
      'board=set&value=' + new_board,
      callback);
};

/**
 * Request to the Ardublockly Server to return JSON data containing all
 * available serial ports in the computer, and the selected one in the
 * settings. The data is then processed into an HTML element and sent to the
 * callback function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML select element.
 */
ArdublocklyServer.requestSerialPorts = function(callback) {
  ArdublocklyServer.ajaxPostForm(
      'ArduServerCompilerSettings.html',
      'serial=get',
      callback);
};

/**
 * Sends the inputted Serial Port to the Ardublockly Server Settings. The new
 * settings menu for the Serial Port is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!string} new_port Indicates which port has been selected.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML select element.
 */
ArdublocklyServer.setSerialPort = function(new_port, callback) {
  ArdublocklyServer.ajaxPostForm(
      'ArduServerCompilerSettings.html',
      'serial=set&value=' + new_port,
      callback);
};

/**
 * Gets the current IDE setting from the Ardublockly Server settings. The new
 * settings menu for the IDE options is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML select element.
 */
ArdublocklyServer.requestIdeOptions = function(callback) {
  ArdublocklyServer.ajaxPostForm(
      'ArduServerCompilerSettings.html',
      'ide=get',
      callback);
};

/**
 * Sends the inputted IDE option to the Ardublockly Server Settings. The new
 * settings menu for the IDE options is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!string} ide_option Indicates which option has been selected.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML select element.
 */
ArdublocklyServer.setIdeOptions = function(ide_option, callback) {
  ArdublocklyServer.ajaxPostForm(
      'ArduServerCompilerSettings.html',
      'ide=set&value=' + ide_option,
      callback);
};


/**
 * Sends the Arduino code to the ArdublocklyServer to be processed as defined
 * by the settings.
 * @param {!string} code Arduino code in a single string format.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML select element.
 */
ArdublocklyServer.sendSketchToServer = function(code, callback) {
  ArdublocklyServer.ajaxPostPlain(
      'SendSketch.html',
      code,
      callback);
};

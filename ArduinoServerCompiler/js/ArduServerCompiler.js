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
  request.onreadystatechange = function() {
    if ( (request.readyState == 4) && (request.status == 200) ) {
       callback(request.responseText);
    }
  }
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
  request.onreadystatechange = function() {
    if ( (request.readyState == 4) && (request.status == 200) ) {
       callback(request.responseText);
    }
  }
  request.send(data);
}

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
 *                             one argument to receive the new location as a
 *                             string.
 */
ArduServerCompiler.requestNewSketchLocation = function(callback) {
  ArduServerCompiler.ajaxPostForm(
      "ArduServerCompilerSettings.html",
      "sketch=set",
      callback)
};

/**
 * Gets the current IDE setting from the ArduServerCompiler settings.
 * @param {!function} callback Callback function for the server request, must
 *                             one argument to receive the new setting as a
 *                             boolean.
 */
ArduServerCompiler.requestIdeOnly = function(callback) {
  ArduServerCompiler.ajaxPostForm(
      "ArduServerCompilerSettings.html",
      "ideOnly=get",
      callback)
}

/**
 * Sends the Arduino code to the ArduServerCompiler to be processed as defined
 * by the settings.
 * @param {!function} callback Callback function for the server request, must
 *                             one argument to receive the new setting as a
 *                             boolean.
 */
ArduServerCompiler.setIdeOnly = function(ide_only, callback) {
  var new_value = "False";
  if (ide_only == true) {
    new_value = "True";
  }
  ArduServerCompiler.ajaxPostForm(
      "ArduServerCompilerSettings.html",
      "ideOnly=set&value=" + new_value,
      callback)
}

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

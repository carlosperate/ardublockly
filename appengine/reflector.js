/**
 * Blockly Demo: Web Worker Reflector
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
 * @fileoverview Store JavaScript code temporarily and reserve it as web
 * workers.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

// Create a namespace.
var BlocklyReflector = {};

/**
 * The currently executing web worker.
 * @type {Worker}
 */
BlocklyReflector.worker_ = null;

/**
 * Execute the provided code in a worker thread.
 * @param {string} code JavaScript code to execute.
 * @param {!Function} messageFunction Function to call when the worker sends a
 *     message back to the main context.
 */
BlocklyReflector.runJS = function(code, messageFunction) {
  BlocklyReflector.stopJS();
  BlocklyReflector.messageFunction_ = messageFunction;
  BlocklyReflector.makeRequest_('/reflector', 'js', code);  
};

/**
 * Terminate the current worker thread.
 */
BlocklyReflector.stopJS = function() {
  if (BlocklyReflector.worker_) {
    BlocklyReflector.worker_.terminate();
  }
  BlocklyReflector.worker_ = null;
};

/**
 * Global reference to current AJAX request.
 * @type XMLHttpRequest
 * @private
 */
BlocklyReflector.httpRequest_ = null;

/**
 * Fire a new AJAX request.
 * @param {string} url URL to fetch.
 * @param {string} name Name of parameter.
 * @param {string} content Content of parameter.
 * @private
 */
BlocklyReflector.makeRequest_ = function(url, name, content) {
  if (BlocklyReflector.httpRequest_) {
    // AJAX call is in-flight.
    BlocklyReflector.httpRequest_.abort();
  }
  BlocklyReflector.httpRequest_ = new XMLHttpRequest();
  BlocklyReflector.httpRequest_.onreadystatechange =
      BlocklyReflector.handleRequest_;
  BlocklyReflector.httpRequest_.open('POST', url);
  BlocklyReflector.httpRequest_.setRequestHeader('Content-Type',
      'application/x-www-form-urlencoded');
  BlocklyReflector.httpRequest_.send(name + '=' + encodeURIComponent(content));
};

/**
 * Callback function for AJAX call.
 * @private
 */
BlocklyReflector.handleRequest_ = function() {
  if (BlocklyReflector.httpRequest_.readyState == 4) {
    if (BlocklyReflector.httpRequest_.status != 200) {
      alert(BlocklyReflector.HTTPREQUEST_ERROR +
            'httpRequest_.status: ' + BlocklyReflector.httpRequest_.status);
    } else {
      var key = BlocklyReflector.httpRequest_.responseText.trim();
      BlocklyReflector.worker_ = new Worker('/reflector?key=' + key);
      BlocklyReflector.worker_.onmessage = BlocklyReflector.messageFunction_;
      BlocklyReflector.worker_.postMessage('');  // Start the worker.
    }
    BlocklyReflector.httpRequest_ = null;
  }
};

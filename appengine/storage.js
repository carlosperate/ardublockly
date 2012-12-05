/**
 * Blockly Demo: Storage
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
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
 * @fileoverview Loading and saving blocks with localStorage and cloud storage.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

/**
 * Backup code blocks to localStorage.
 */
function backup_blocks() {
  if ('localStorage' in window) {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var url = getURL()
    window.localStorage.setItem(url, Blockly.Xml.domToText(xml));
  }
}

/**
 * Restore code blocks from localStorage.
 */
function restore_blocks() {
  var url = getURL()
  if ('localStorage' in window && window.localStorage[url]) {
    var xml = Blockly.Xml.textToDom(window.localStorage[url]);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  }
}

function getURL() {
  var url = window.location.href;
  var hash = url.indexOf('#');
  if (hash != -1) {
    url = url.substring(0, hash)
  }
  return url
}

/**
 * Discard all blocks from the workspace.
 */
function discard() {
  var count = Blockly.mainWorkspace.getAllBlocks().length;
  if (count < 2 || window.confirm(STORAGE_DISCARD_WARNING.replace('%1', count))) {
    Blockly.mainWorkspace.clear();
    window.location.hash = '';
  }
}

/**
 * Save blocks to database and return a link containing key to XML.
 */
function link() {
  var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  var data = Blockly.Xml.domToText(xml);
  makeRequest('/storage.py', 'xml', data);
}

/**
 * Retrieve XML text from database using given key.
 * @param {string} key Key to XML, obtained from href.
 */
function retrieveXML(key) {
  var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  makeRequest('/storage.py', 'key', key);
}

/**
 * Global reference to current AJAX request.
 * @type XMLHttpRequest
 */
var httpRequest = null;

/**
 * Fire a new AJAX request.
 * @param {string} url URL to fetch.
 * @param {string} name Name of parameter.
 * @param {string} content Content of parameter.
 */
function makeRequest(url, name, content) {
  if (httpRequest) {
    // AJAX call is in-flight.
    httpRequest.abort();
  }
  httpRequest = new XMLHttpRequest();
  httpRequest.name = name;
  httpRequest.onreadystatechange = handleRequest;
  httpRequest.open('POST', url);
  httpRequest.setRequestHeader('Content-Type',
      'application/x-www-form-urlencoded');
  httpRequest.send(name + '=' + encodeURIComponent(content));
}

/**
 * Callback function for AJAX call.
 */
function handleRequest() {
  if (httpRequest.readyState == 4) {
    if (httpRequest.status != 200) {
      alert(STORAGE_HTTPREQUEST_ERROR + 
            'httpRequest.status: ' + httpRequest.status);
    } else {
      var data = httpRequest.responseText.trim();
      if (httpRequest.name == 'xml') {
        window.location.hash = data;
        alert(STORAGE_LINK_ALERT + window.location.href);
      } else if (httpRequest.name == 'key') {
        if (!data.length) {
          alert(STORAGE_HASH_ERROR.replace('%1', window.location.hash));
        } else {
          loadXML(data);
        }
      }
    }
    httpRequest = null;
  }
}

/**
 * Load blocks from XML.
 * @param {string} xml Text represetation of XML.
 */
function loadXML(xml) {
  try {
    xml = Blockly.Xml.textToDom(xml);
  } catch (e) {
    alert(STORAGE_XML_ERROR + xml);
    return;
  }
  // Clear the workspace to avoid merge.
  Blockly.mainWorkspace.clear();
  Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
}

/**
 * Bind an event to a function call.
 * @param {!Element} element Element upon which to listen.
 * @param {string} name Event name to listen to (e.g. 'mousedown').
 * @param {!Function} func Function to call when event is triggered.
 *     W3 browsers will call the function with the event object as a parameter,
 *     MSIE will not.
 */
function bindEvent(element, name, func) {
  if (element.addEventListener) {  // W3C
    element.addEventListener(name, func, false);
  } else if (element.attachEvent) {  // IE
    element.attachEvent('on' + name, func);
  }
}

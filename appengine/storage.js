/**
 * Blockly Demo: Storage
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
 * @fileoverview Loading and saving blocks with localStorage and cloud storage.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

// Create a namespace.
var BlocklyStorage = {};

/**
 * Backup code blocks to localStorage.
 * @private
 */
BlocklyStorage.backupBlocks_ = function() {
  if ('localStorage' in window) {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var url = BlocklyStorage.getUrl_();
    window.localStorage.setItem(url, Blockly.Xml.domToText(xml));
  }
};

/**
 * Bind the localStorage backup function to the unload event.
 */
BlocklyStorage.backupOnUnload = function() {
  if (window.addEventListener) {  // W3C
    window.addEventListener('unload', BlocklyStorage.backupBlocks_, false);
  } else if (window.attachEvent) {  // IE
    window.attachEvent('onunload', BlocklyStorage.backupBlocks_);
  }
};

/**
 * Restore code blocks from localStorage.
 */
BlocklyStorage.restoreBlocks = function() {
  var url = BlocklyStorage.getUrl_();
  if ('localStorage' in window && window.localStorage[url]) {
    var xml = Blockly.Xml.textToDom(window.localStorage[url]);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  }
};

/**
 * Gets the current URL, not including the hash.
 * @return {string} Current URL.
 * @private
 */
BlocklyStorage.getUrl_ = function() {
  var url = window.location.href;
  var hash = url.indexOf('#');
  if (hash != -1) {
    url = url.substring(0, hash)
  }
  return url;
};

/**
 * Discard all blocks from the workspace.
 */
BlocklyStorage.discard = function() {
  var count = Blockly.mainWorkspace.getAllBlocks().length;
  if (count < 2 ||
      window.confirm(BlocklyStorage.DISCARD_WARNING.replace('%1', count))) {
    Blockly.mainWorkspace.clear();
    window.location.hash = '';
  }
};

/**
 * Save blocks to database and return a link containing key to XML.
 */
BlocklyStorage.link = function() {
  var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  var data = Blockly.Xml.domToText(xml);
  BlocklyStorage.makeRequest_('/storage.py', 'xml', data);
};

/**
 * Retrieve XML text from database using given key.
 * @param {string} key Key to XML, obtained from href.
 */
BlocklyStorage.retrieveXml = function(key) {
  var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  BlocklyStorage.makeRequest_('/storage.py', 'key', key);
};

/**
 * Global reference to current AJAX request.
 * @type XMLHttpRequest
 * @private
 */
BlocklyStorage.httpRequest_ = null;

/**
 * Fire a new AJAX request.
 * @param {string} url URL to fetch.
 * @param {string} name Name of parameter.
 * @param {string} content Content of parameter.
 * @private
 */
BlocklyStorage.makeRequest_ = function(url, name, content) {
  if (BlocklyStorage.httpRequest_) {
    // AJAX call is in-flight.
    BlocklyStorage.httpRequest_.abort();
  }
  BlocklyStorage.httpRequest_ = new XMLHttpRequest();
  BlocklyStorage.httpRequest_.name = name;
  BlocklyStorage.httpRequest_.onreadystatechange =
      BlocklyStorage.handleRequest_;
  BlocklyStorage.httpRequest_.open('POST', url);
  BlocklyStorage.httpRequest_.setRequestHeader('Content-Type',
      'application/x-www-form-urlencoded');
  BlocklyStorage.httpRequest_.send(name + '=' + encodeURIComponent(content));
};

/**
 * Callback function for AJAX call.
 * @private
 */
BlocklyStorage.handleRequest_ = function() {
  if (BlocklyStorage.httpRequest_.readyState == 4) {
    if (BlocklyStorage.httpRequest_.status != 200) {
      alert(BlocklyStorage.HTTPREQUEST_ERROR + 
            'httpRequest_.status: ' + BlocklyStorage.httpRequest_.status);
    } else {
      var data = BlocklyStorage.httpRequest_.responseText.trim();
      if (BlocklyStorage.httpRequest_.name == 'xml') {
        window.location.hash = data;
        alert(BlocklyStorage.LINK_ALERT + window.location.href);
      } else if (BlocklyStorage.httpRequest_.name == 'key') {
        if (!data.length) {
          alert(BlocklyStorage.HASH_ERROR.replace('%1', window.location.hash));
        } else {
          BlocklyStorage.loadXml_(data);
        }
      }
    }
    BlocklyStorage.httpRequest_ = null;
  }
};

/**
 * Load blocks from XML.
 * @param {string} xml Text represetation of XML.
 * @private
 */
BlocklyStorage.loadXml_ = function(xml) {
  try {
    xml = Blockly.Xml.textToDom(xml);
  } catch (e) {
    alert(BlocklyStorage.XML_ERROR + xml);
    return;
  }
  // Clear the workspace to avoid merge.
  Blockly.mainWorkspace.clear();
  Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
};

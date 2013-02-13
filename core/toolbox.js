/**
 * Visual Blocks Editor
 *
 * Copyright 2011 Google Inc.
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
 * @fileoverview Toolbox from whence to create blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Toolbox');

goog.require('Blockly.Flyout');
goog.require('goog.asserts');
goog.require('goog.object');
goog.require('goog.style');
goog.require('goog.ui.tree.TreeControl');
goog.require('goog.ui.tree.TreeNode');



/**
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {Blockly.Component}
 */
Blockly.Toolbox = function(opt_domHelper) {
  Blockly.Toolbox.superClass_.constructor.call(this, opt_domHelper);

  /**
   * @type {Object.<string,*>}
   * @private
   */
  this.config_ = goog.object.clone(Blockly.Toolbox.DEFAULT_CONFIG_);
  this.config_['cleardotPath'] =
      Blockly.pathToBlockly + 'media/1x1.gif';
  this.config_['cssCollapsedFolderIcon'] =
      'blocklyTreeIconClosed' + (Blockly.RTL ? 'Rtl' : 'Ltr');
};
goog.inherits(Blockly.Toolbox, Blockly.Component);
goog.addSingletonGetter(Blockly.Toolbox);


/**
 * Width of the toolbox.
 * @type {number}
 */
Blockly.Toolbox.prototype.width = 0;


/**
 * The SVG group currently selected.
 * @type {SVGGElement}
 * @private
 */
Blockly.Toolbox.prototype.selectedOption_ = null;


/**
 * Configuration constants for Closure's tree UI.
 * @type {Object.<string,*>}
 * @const
 * @private
 */
Blockly.Toolbox.DEFAULT_CONFIG_ = {
  indentWidth: 19,
  cssRoot: 'blocklyTreeRoot',
  cssHideRoot: 'blocklyHidden',
  cssItem: '',
  cssTreeRow: 'blocklyTreeRow',
  cssItemLabel: 'blocklyTreeLabel',
  cssTreeIcon: 'blocklyTreeIcon',
  cssExpandedFolderIcon: 'blocklyTreeIconOpen',
  cssFileIcon: 'blocklyTreeIconNone',
  cssSelectedRow: 'blocklyTreeSelected'
};


/**
 * @param {!Event} e The event.
 * @private
 */
Blockly.Toolbox.prototype.onMouseDown_ = function(e) {
  if (Blockly.isRightButton(e) || e.target == this.getElement()) {
    // Close flyout.
    Blockly.hideChaff(/* opt_allowToolbox */ false);
  } else {
    // Just close popups.
    Blockly.hideChaff(/* opt_allowToolbox */ true);
  }
};


/** @override */
Blockly.Toolbox.prototype.createDom = function() {
  // Create an HTML container for the Toolbox menu.
  var div = this.getDomHelper().createDom(
    'div', {
      'class': 'blocklyToolboxDiv blocklyHidden',
      'dir': Blockly.RTL ? 'RTL' : 'LTR'
    });
  this.setElementInternal(div);

  /**
   * @type {!Blockly.Flyout}
   * @private
   */
  this.flyout_ = new Blockly.Flyout(
      this.getWorkspace(), Blockly.getMainWorkspaceMetrics, true);
  this.addChild(this.flyout_);
  this.flyout_.render(this.getSvg());

  /**
   * @type {!Blockly.Toolbox.TreeControl}
   * @private
   */
  this.tree_ = new Blockly.Toolbox.TreeControl(
      'root', this.config_, this.getDomHelper());
  this.tree_.setShowRootNode(false);
  this.tree_.setShowLines(false);
  this.tree_.setShowExpandIcons(false);
  this.tree_.setSelectedItem(null);
  this.populate_();
  this.addChild(this.tree_, true);
  goog.dom.classes.remove(this.getElement(), 'blocklyHidden');
};


/**
 * Initializes the toolbox.
 * @override
 */
Blockly.Toolbox.prototype.enterDocument = function() {
  Blockly.Toolbox.superClass_.enterDocument.call(this);

  var handler = this.getHandler();
  // If the document resizes, reposition the toolbox.
  handler.listen(goog.global, goog.events.EventType.RESIZE, this.position_);

  // Clicking on toolbar closes popups.
  handler.listen(
      this.getElement(), goog.events.EventType.MOUSEDOWN, this.onMouseDown_);

  // Tree events.
  handler.listen(this, Blockly.Flyout.EventType.SHOWFLYOUT, this.onShowFlyout_);
  handler.listen(this, Blockly.Flyout.EventType.HIDEFLYOUT, this.onHideFlyout_);

  // Hide the chaff.
  handler.listen(this.topComponent(),
                 Blockly.TopComponent.EventType.HIDECHAFF, this.onHideChaff_);
  
  // Fire a resize event since the toolbox may have changed width and height.
  Blockly.fireUiEvent(window, 'resize');
};


/**
 * @param {!goog.events.Event} e The event.
 * @private
 */
Blockly.Toolbox.prototype.onHideChaff_ = function(e) {
  if (!e['allowToolbox'] && this.getFlyout().autoClose) {
    this.getToolbox().clearSelection();
  }
};


/**
 * Hide the flyout.
 * @param {goog.events.EventLike} e The event
 */
Blockly.Toolbox.prototype.onHideFlyout_ = function(e) {
  this.flyout_.hide();
};


/**
 * Show the flyout blocks.
 * @param {goog.events.EventLike} e The event
 */
Blockly.Toolbox.prototype.onShowFlyout_ = function(e) {
  this.flyout_.show(e.blocks);
};


/**
 * @return {!Blockly.Flyout} The flyout.
 */
Blockly.Toolbox.prototype.getFlyout = function() {
  return this.flyout_;
};


/**
 * Move the toolbox to the edge.
 * @private
 */
Blockly.Toolbox.prototype.position_ = function() {
  var treeDiv = this.getElement();
  var svgBox = goog.style.getBorderBox(this.getSvg());
  var svgSize = this.svgSize();
  if (Blockly.RTL) {
    var x = svgSize.left + 1;
    x += svgSize.width - treeDiv.offsetWidth;
    treeDiv.style.left = x + 'px';
  } else {
    treeDiv.style.marginLeft = svgBox.left;
  }
  var y = svgSize.top +
      parseInt(svgBox.top, 10);
  treeDiv.style.top = y + 'px';
  treeDiv.style.height = svgSize.height + 'px';
  this.width = treeDiv.offsetWidth;
};


/**
 * Fill the toolbox with categories and blocks.
 * @private
 */
Blockly.Toolbox.prototype.populate_ = function() {
  var rootOut = this.tree_;
  rootOut.blocks = [];
  function syncTrees(treeIn, treeOut) {
    for (var i = 0, childIn; childIn = treeIn.childNodes[i]; i++) {
      if (!childIn.tagName) {
        // Skip over text.
        continue;
      }
      var name = childIn.tagName.toUpperCase();
      if (name == 'CATEGORY') {
        var childOut = rootOut.createNode(childIn.getAttribute('name'));
        childOut.blocks = [];
        treeOut.add(childOut);
        var custom = childIn.getAttribute('custom');
        if (custom) {
          // Variables and procedures have special categories that are dynamic.
          childOut.blocks = custom;
        } else {
          syncTrees(childIn, childOut);
        }
      } else if (name == 'BLOCK') {
        treeOut.blocks.push(childIn);
      }
    }
  }
  syncTrees(Blockly.languageTree, this.tree_);

  if (rootOut.blocks.length) {
    throw 'Toolbox cannot have both blocks and categories in the root level.';
  }
};


/**
 * Unhighlight any previously specified option.
 */
Blockly.Toolbox.prototype.clearSelection = function() {
  this.tree_.setSelectedItem(null);
};

// Extending Closure's Tree UI.

/**
 * Extention of a TreeControl object that uses a custom tree node.
 * @param {string} html The HTML content of the node label.
 * @param {Object=} opt_config The configuration for the tree. See
 *    goog.ui.tree.TreeControl.DefaultConfig. If not specified, a default config
 *    will be used.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.tree.TreeControl}
 */
Blockly.Toolbox.TreeControl = function(html, opt_config, opt_domHelper) {
  goog.ui.tree.TreeControl.call(this, html, opt_config, opt_domHelper);
};
goog.inherits(Blockly.Toolbox.TreeControl, goog.ui.tree.TreeControl);


/**
 * Creates a new tree node using a custom tree node.
 * @param {string} html The html content of the node label.
 * @return {goog.ui.tree.TreeNode} The new item.
 * @override
 */
Blockly.Toolbox.TreeControl.prototype.createNode = function(html) {
  return new Blockly.Toolbox.TreeNode(html || '', this.getConfig(),
      this.getDomHelper());
};


/**
 * Display/hide the flyout when an item is selected.
 * @param {goog.ui.tree.BaseNode} node The item to select.
 * @override
 */
Blockly.Toolbox.TreeControl.prototype.setSelectedItem = function(node) {
  if (this.selectedItem_ == node) {
    return;
  }
  goog.ui.tree.TreeControl.prototype.setSelectedItem.call(this, node);
  if (node && node.blocks && node.blocks.length) {
    this.dispatchEvent(
        {
          type: Blockly.Flyout.EventType.SHOWFLYOUT,
          blocks: node.blocks
        });
  } else {
    // Hide the flyout.
    this.dispatchEvent(Blockly.Flyout.EventType.HIDEFLYOUT);
  }
};



/**
 * An single node in the tree, customized for Blockly's UI.
 * @param {string} html The html content of the node label.
 * @param {Object=} opt_config The configuration for the tree. See
 *    goog.ui.tree.TreeControl.DefaultConfig. If not specified, a default config
 *    will be used.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.tree.TreeNode}
 */
Blockly.Toolbox.TreeNode = function(html, opt_config, opt_domHelper) {
  goog.ui.tree.TreeNode.call(this, html, opt_config, opt_domHelper);
};
goog.inherits(Blockly.Toolbox.TreeNode, goog.ui.tree.TreeNode);


/** @override */
Blockly.Toolbox.TreeNode.prototype.enterDocument = function() {
  Blockly.Toolbox.TreeNode.superClass_.enterDocument.call(this);
  var resize = function() {
    Blockly.fireUiEvent(window, 'resize');
  };
  var handler = this.getHandler();
  // Fire a resize event since the toolbox may have changed width.
  handler.listen(
      this.getTree(), goog.ui.tree.BaseNode.EventType.EXPAND, resize);
  handler.listen(
      this.getTree(), goog.ui.tree.BaseNode.EventType.COLLAPSE, resize);

  Blockly.fireUiEvent(window, 'resize');
};


/**
 * Do not show the +/- icon.
 * @return {string} The source for the icon.
 * @override
 */
Blockly.Toolbox.TreeNode.prototype.getExpandIconHtml = function() {
  return '<span></span>';
};


/**
 * Supress population of the +/- icon.
 * @return {null} Null.
 * @protected
 * @override
 */
Blockly.Toolbox.TreeNode.prototype.getExpandIconElement = function() {
  return null;
};


/**
 * Expand or collapse the node on mouse click.
 * @param {!goog.events.BrowserEvent} e The browser event.
 * @override
 */
Blockly.Toolbox.TreeNode.prototype.onMouseDown = function(e) {
  // Expand icon.
  if (this.hasChildren() && this.isUserCollapsible_) {
    this.toggle();
    this.select();
  } else if (this.isSelected()) {
    this.getTree().setSelectedItem(null);
  } else {
    this.select();
  }
  this.updateRow();
};


/**
 * Supress the inherited double-click behaviour.
 * @param {!goog.events.BrowserEvent} e The browser event.
 * @override
 */
Blockly.Toolbox.TreeNode.prototype.onDoubleClick_ = function(e) {
  // NOP.
};

/**
 * Visual Blocks Editor
 *
 * Copyright 2011 Google Inc.
 * http://code.google.com/p/google-blockly/
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
 * In the interests of a consistent UI, the toolbox shares some functions and
 * properties with the context menu.
 * @author fraser@google.com (Neil Fraser)
 */

// Name space for the toolbox.
Blockly.Toolbox = {};

/**
 * Width of the toolbox.
 */
Blockly.Toolbox.width = 0;

/**
 * The SVG group currently selected.
 * @type {Element}
 * @private
 */
Blockly.Toolbox.selectedOption_ = null;

/**
 * Corner radius of the flyout background.
 */
Blockly.Toolbox.CORNER_RADIUS = 8;

/**
 * Creates the toolbox's DOM.  Only needs to be called once.
 * @return {!Element} The toolbox's SVG group.
 */
Blockly.Toolbox.createDom = function() {
  /*
  <g>
    <g>
      <rect class="blocklyFlyoutBackground" rx="8" ry="8"/>
      <g></g>
    </g>
    <rect class="blocklyToolboxBackground" height="100%"/>
    <g class="blocklyToolboxOptions">
    </g>
  </g>
  */
  var svgGroup = Blockly.createSvgElement('g', {}, null);
  Blockly.Toolbox.svgGroup_ = svgGroup;
  var svgFlyout = Blockly.createSvgElement('g', {}, svgGroup);
  Blockly.Toolbox.svgFlyout_ = svgFlyout;
  Blockly.Toolbox.svgFlyoutBackground_ = Blockly.createSvgElement('rect',
      {'class': 'blocklyFlyoutBackground', rx: 8, ry: 8}, svgFlyout);
  Blockly.Toolbox.svgFlyoutOptions_ =
      Blockly.createSvgElement('g', {}, svgFlyout);
  Blockly.Toolbox.flyoutWorkspace_ = new Blockly.Workspace(false);
  Blockly.Toolbox.svgFlyoutOptions_.appendChild(
      Blockly.Toolbox.flyoutWorkspace_.createDom());
  Blockly.Toolbox.svgBackground_ = Blockly.createSvgElement('rect',
      {'class': 'blocklyToolboxBackground', height: '100%'}, svgGroup);
  Blockly.Toolbox.svgOptions_ = Blockly.createSvgElement('g',
      {'class': 'blocklyToolboxOptions'}, svgGroup);
  return svgGroup;
};

/**
 * Return an object with all the metrics required to size scrollbars for the
 * toolbox menu.  The following properties are computed:
 * .viewHeight: Height of the visible rectangle,
 * .viewWidth: Width of the visible rectangle,
 * .contentHeight: Height of the contents,
 * .viewTop: Offset of top edge of visible rectangle from parent,
 * .contentTop: Offset of the top-most content from the y=0 coordinate,
 * .absoluteTop: Top-edge of view.
 * .absoluteLeft: Left-edge of view.
 * @return {!Object} Contains size and position metrics of the toolbox.
 */
Blockly.Toolbox.getMenuMetrics = function() {
  var viewHeight = Blockly.svgSize().height;
  var viewWidth = Blockly.Toolbox.width;
  var optionBox = Blockly.Toolbox.svgOptions_.getBBox();
  return {
    viewHeight: viewHeight,
    viewWidth: viewWidth,
    contentHeight: optionBox.height + optionBox.y,
    viewTop: -Blockly.Toolbox.svgOptions_.scrollY,
    contentTop: 0,
    absoluteTop: 0,
    // absoluteLeft should be 0, but Firefox leaks by a pixel.
    absoluteLeft: Blockly.RTL ? -1 : 1
  };
};

/**
 * Sets the Y translation of the toolbox menu to match the scrollbars.
 * @param {!Object} yRatio Contains a y property which is a float
 *     between 0 and 1 specifying the degree of scrolling.
 */
Blockly.Toolbox.setMenuMetrics = function(yRatio) {
  var metrics = Blockly.Toolbox.getMenuMetrics();
  if (typeof yRatio.y == 'number') {
    Blockly.Toolbox.svgOptions_.scrollY = -metrics.contentHeight * yRatio.y -
        metrics.contentTop;
  }
  Blockly.Toolbox.svgOptions_.setAttribute('transform', 'translate(0,' +
      (Blockly.Toolbox.svgOptions_.scrollY + metrics.absoluteTop) + ')');
};

/**
 * Return an object with all the metrics required to size scrollbars for the
 * flyout.  The following properties are computed:
 * .viewHeight: Height of the visible rectangle,
 * .viewWidth: Width of the visible rectangle,
 * .contentHeight: Height of the contents,
 * .viewTop: Offset of top edge of visible rectangle from parent,
 * .contentTop: Offset of the top-most content from the y=0 coordinate,
 * .absoluteTop: Top-edge of view.
 * .absoluteLeft: Left-edge of view.
 * @return {!Object} Contains size and position metrics of the flyout.
 */
Blockly.Toolbox.getFlyoutMetrics = function() {
  if (Blockly.Toolbox.svgFlyout_.style.display != 'block') {
    // Flyout is hidden.  Return a dummy metric that disables the scrollbar.
    return {
      viewHeight: 10,
      viewWidth: 10,
      contentHeight: 1,
      viewTop: 0,
      contentTop: 0,
      absoluteTop: Blockly.Toolbox.CORNER_RADIUS,
      absoluteLeft: 0
    };
  }

  var viewHeight = Blockly.svgSize().height -
                   2 * Blockly.Toolbox.CORNER_RADIUS;
  var viewWidth = Blockly.Toolbox.svgFlyout_.width +
                  Blockly.Toolbox.CORNER_RADIUS;
  var optionBox = Blockly.Toolbox.svgFlyoutOptions_.getBBox();
  return {
    viewHeight: viewHeight,
    viewWidth: viewWidth,
    contentHeight: optionBox.height + optionBox.y,
    viewTop: -Blockly.Toolbox.svgFlyoutOptions_.scrollY,
    contentTop: 0,
    absoluteTop: Blockly.Toolbox.CORNER_RADIUS,
    absoluteLeft: 0
  };
};

/**
 * Sets the Y translation of the flyout to match the scrollbars.
 * @param {!Object} yRatio Contains a y property which is a float
 *     between 0 and 1 specifying the degree of scrolling.
 */
Blockly.Toolbox.setFlyoutMetrics = function(yRatio) {
  var metrics = Blockly.Toolbox.getFlyoutMetrics();
  if (typeof yRatio.y == 'number') {
    Blockly.Toolbox.svgFlyoutOptions_.scrollY =
        -metrics.contentHeight * yRatio.y - metrics.contentTop;
  }
  Blockly.Toolbox.svgFlyoutOptions_.setAttribute('transform', 'translate(0,' +
      (Blockly.Toolbox.svgFlyoutOptions_.scrollY + metrics.absoluteTop) +
      ')');
};

/**
 * Initializes the toolbox.
 */
Blockly.Toolbox.init = function() {
  Blockly.Toolbox.languageTree = Blockly.Toolbox.buildTree_();
  Blockly.Toolbox.populateOptions_(Blockly.Toolbox.languageTree);

  // Add scrollbars to menu panel.
  new Blockly.Scrollbar(Blockly.Toolbox.svgOptions_,
      Blockly.Toolbox.getMenuMetrics,
      Blockly.Toolbox.setMenuMetrics,
      false, false);

  // Add scrollbars to flyout.
  Blockly.Toolbox.svgFlyout_.width = 0;
  var scrollbarPair = new Blockly.Scrollbar(Blockly.Toolbox.svgFlyoutOptions_,
      Blockly.Toolbox.getFlyoutMetrics,
      Blockly.Toolbox.setFlyoutMetrics,
      false, false);

  // List of background buttons that lurk behind each block to catch clicks
  // landing in the blocks' lakes and bays.
  Blockly.Toolbox.svgFlyoutOptions_.buttons_ = [];

  Blockly.Toolbox.position_();

  // If the document resizes, reposition the toolbox.
  Blockly.bindEvent_(window, 'resize', null, Blockly.Toolbox.position_);
};

/**
 * Move the toolbox to the edge.
 * @private
 */
Blockly.Toolbox.position_ = function() {
  var svgSize = Blockly.svgSize();
  Blockly.Toolbox.svgFlyoutBackground_.setAttribute('height',
      Math.max(0, svgSize.height));
  if (Blockly.RTL) {
    Blockly.Toolbox.svgGroup_.setAttribute('transform',
        'translate(' + (svgSize.width - Blockly.Toolbox.width) + ',0)');
  }
};

/**
 * String to prefix on categories of each block in the toolbox.
 * Used to prevent collisions with built-in properties like 'toString'.
 * @private
 */
Blockly.Toolbox.PREFIX_ = 'cat_';

/**
 * Category used for variables.
 */
Blockly.Toolbox.VARIABLE_CAT = 'variables';

/**
 * Build the hierarchical tree of block types.
 * @return {!Object} Tree object.
 * @private
 */
Blockly.Toolbox.buildTree_ = function() {
  var tree = {};
  // Populate the tree structure.
  for (var name in Blockly.Language) {
    if (name != '$') {
      var block = Blockly.Language[name];
      if (block.category) {
        var cat = Blockly.Toolbox.PREFIX_ + window.encodeURI(block.category);
        if (cat in tree) {
          tree[cat].push(name);
        } else {
          tree[cat] = [name];
        }
      }
    }
  }
  return tree;
};

/**
 * Fill the toolbox with options.
 * @param {!Object} tree Hierarchical tree of block types.
 * @private
 */
Blockly.Toolbox.populateOptions_ = function(tree) {
  // Create an option for each category.
  var options = [];
  for (var cat in tree) {
    var option = {};
    option.text =
        window.decodeURI(cat.substring(Blockly.Toolbox.PREFIX_.length));
    option.cat = cat;
    options.push(option);
  }
  var option = {};
  if (Blockly.Language.variables_get && Blockly.Language.variables_set) {
    // Variables have a special category that is dynamic.
    options.push({text: Blockly.MSG_VARIABLE_CATEGORY,
                  cat: Blockly.Toolbox.VARIABLE_CAT});
  }

  function callbackFactory(cat, element) {
    return function(e) {
      var oldSelectedOption = Blockly.Toolbox.selectedOption_;
      Blockly.hideChaff();
      if (oldSelectedOption != element) {
        Blockly.Toolbox.selectOption_(cat, element);
      }
      // This mouse click has been handled, don't bubble up to document.
      e.stopPropagation();
    };
  }

  // Erase all existing options.
  Blockly.removeChildren_(Blockly.Toolbox.svgOptions_);

  var TOP_MARGIN = 4;
  var maxWidth = 0;
  var resizeList = [Blockly.Toolbox.svgBackground_];
  for (var x = 0, option; option = options[x]; x++) {
    var gElement = Blockly.ContextMenu.optionToDom(option.text);
    var rectElement = gElement.firstChild;
    var textElement = gElement.lastChild;
    Blockly.Toolbox.svgOptions_.appendChild(gElement);

    gElement.setAttribute('transform', 'translate(0, ' +
        (x * Blockly.ContextMenu.Y_HEIGHT + TOP_MARGIN) + ')');
    Blockly.bindEvent_(gElement, 'mousedown', null,
                       callbackFactory(option.cat, gElement));
    resizeList.push(rectElement);
    // Compute the length of the longest text length.
    maxWidth = Math.max(maxWidth, textElement.getComputedTextLength());
  }
  // Run a second pass to resize all options to the required width.
  maxWidth += Blockly.ContextMenu.X_PADDING * 2;
  for (var x = 0; x < resizeList.length; x++) {
    resizeList[x].setAttribute('width', maxWidth);
  }
  if (Blockly.RTL) {
    // Right-align the text.
    for (var x = 0, gElement;
         gElement = Blockly.Toolbox.svgOptions_.childNodes[x]; x++) {
      var textElement = gElement.lastChild;
      textElement.setAttribute('x', maxWidth -
          textElement.getComputedTextLength() - Blockly.ContextMenu.X_PADDING);
    }
  }
  Blockly.Toolbox.width = maxWidth;

  // Right-click on empty areas of the toolbox does not generate a context menu.
  Blockly.bindEvent_(Blockly.Toolbox.svgGroup_, 'mousedown', null,
      function(e) {
        if (e.button == 2) {
          Blockly.hideChaff(true);
          e.stopPropagation();
        }
      });

  // Fire a resize event since the toolbox may have changed width and height.
  Blockly.fireUiEvent(Blockly.svgDoc, window, 'resize');
};

/**
 * Highlight the specified option.
 * @param {?string} cat The category name of the newly specified option,
 *     or null to select nothing.
 * @param {Element} newSelectedOption The SVG group for the selected option,
 *     or null to select nothing.
 * @private
 */
Blockly.Toolbox.selectOption_ = function(cat, newSelectedOption) {
  Blockly.Toolbox.selectedOption_ = newSelectedOption;
  if (newSelectedOption) {
    Blockly.addClass_(newSelectedOption, 'blocklyMenuSelected');
    Blockly.Toolbox.showFlyout_(cat);
  }
};

/**
 * Unhighlight any previously specified option.  Hide the flyout.
 */
Blockly.Toolbox.clearSelection = function() {
  var oldSelectedOption = Blockly.Toolbox.selectedOption_;
  if (oldSelectedOption) {
    Blockly.removeClass_(oldSelectedOption, 'blocklyMenuSelected');
    Blockly.Toolbox.hideFlyout_();
    Blockly.Toolbox.selectedOption_ = null;
  }
};

/**
 * Hide and empty the flyout.
 * @private
 */
Blockly.Toolbox.hideFlyout_ = function() {
  Blockly.Toolbox.svgFlyout_.style.display = 'none';
  // Delete all the blocks.
  var blocks = Blockly.Toolbox.flyoutWorkspace_.getTopBlocks();
  for (var x = 0, block; block = blocks[x]; x++) {
    block.destroy();
  }
  // Delete all the background buttons.
  for (var x = 0, rect; rect = Blockly.Toolbox.svgFlyoutOptions_.buttons_[x];
       x++) {
    Blockly.unbindEvent_(rect, 'mousedown', rect.wrapper_);
    rect.parentNode.removeChild(rect);
  }
  Blockly.Toolbox.svgFlyoutOptions_.buttons_ = [];
};

/**
 * Show and populate the flyout.
 * @param {string} id The category of blocks to show.
 * @private
 */
Blockly.Toolbox.showFlyout_ = function(id) {
  var margin = Blockly.Toolbox.CORNER_RADIUS;
  var svgFlyout = Blockly.Toolbox.svgFlyout_;
  var svgFlyoutBackground = Blockly.Toolbox.svgFlyoutBackground_;
  var svgFlyoutOptions = Blockly.Toolbox.svgFlyoutOptions_;
  svgFlyout.style.display = 'block';

  // Create the blocks to be shown in this flyout.
  var blocks = [];
  var gaps = [];
  if (id == Blockly.Toolbox.VARIABLE_CAT) {
    // Special category for variables.
    var variableList = Blockly.Variables.allVariables();
    variableList.sort(Blockly.caseInsensitiveComparator);
    // In addition to the user's variables, we also want to display the default
    // variable name at the top.  We also don't want this duplicated if the
    // user has created a variable of the same name.
    variableList.unshift(null);
    var defaultVariable = undefined;
    for (var i = 0; i < variableList.length; i++) {
      if (variableList[i] === defaultVariable) {
        continue;
      }
      var getBlock = new Blockly.Block(Blockly.Toolbox.flyoutWorkspace_, 'variables_set');
      var setBlock = new Blockly.Block(Blockly.Toolbox.flyoutWorkspace_, 'variables_get');
      if (variableList[i] === null) {
        defaultVariable = getBlock.getTitleText(1);
      } else {
        getBlock.setTitleText(variableList[i], 1);
        setBlock.setTitleText(variableList[i], 1);
      }
      blocks.push(getBlock, setBlock);
      gaps.push(margin, margin * 3);
    }
  } else {
    // Category defined in language file.
    for (var i = 0, name; name = Blockly.Toolbox.languageTree[id][i]; i++) {
      var block = new Blockly.Block(Blockly.Toolbox.flyoutWorkspace_, name);
      blocks[i] = block;
      gaps[i] = margin * 2;
    }
  }

  // Lay out the blocks vertically.
  var flyoutWidth = 0;
  var cursorY = margin;
  for (var i = 0, block; block = blocks[i]; i++) {
    // There is no good way to handle comment bubbles inside the flyout.
    // Blocks shouldn't come with predefined comments, but someone will
    // try this, I'm sure.  Kill the comment.
    Blockly.Comment && block.setCommentText(null);
    block.render();
    var bBox = block.svg_.svgGroup_.getBBox();
    var x = Blockly.RTL ? 0 : margin * 2 + Blockly.BlockSvg.TAB_WIDTH;
    block.moveBy(x, cursorY);
    flyoutWidth = Math.max(flyoutWidth, bBox.width);
    cursorY += bBox.height + gaps[i];
    Blockly.bindEvent_(block.svg_.svgGroup_, 'mousedown', null,
                       Blockly.Toolbox.createBlockFunc_(block));
  }
  flyoutWidth += margin + Blockly.BlockSvg.TAB_WIDTH + margin / 2 +
                 Blockly.Scrollbar.scrollbarThickness;

  for (var i = 0, block; block = blocks[i]; i++) {
    if (Blockly.RTL) {
      // With the flyoutWidth known, reposition the blocks to the right-aligned.
      block.moveBy(flyoutWidth - margin - Blockly.BlockSvg.TAB_WIDTH, 0);
    }
    // Create an invisible rectangle over the block to act as a button.  Just
    // using the block as a button is poor, since blocks have holes in them.
    var bBox = block.svg_.svgGroup_.getBBox();
    var xy = block.getRelativeToSurfaceXY();
    var rect = Blockly.createSvgElement('rect',
        {width: bBox.width, height: bBox.height,
        x: xy.x + bBox.x, y: xy.y + bBox.y,
        'fill-opacity': 0}, null);
    // Add the rectangles under the blocks, so that the blocks' tooltips work.
    svgFlyoutOptions.insertBefore(rect, svgFlyoutOptions.firstChild);
    rect.wrapper_ = Blockly.bindEvent_(rect, 'mousedown', null,
        Blockly.Toolbox.createBlockFunc_(block));
    svgFlyoutOptions.buttons_[i] = rect;
  }

  svgFlyoutOptions.setAttribute('transform', 'translate(0, ' + margin + ')');
  var svgSize = Blockly.svgSize();
  svgFlyoutBackground.setAttribute('width', flyoutWidth + margin);
  var x = Blockly.RTL ? -flyoutWidth : Blockly.Toolbox.width - margin;
  svgFlyout.setAttribute('transform', 'translate(' + x + ', 0)');
  svgFlyout.width = flyoutWidth;

  // Fire a resize event to update the flyout's scrollbar.
  Blockly.fireUiEvent(Blockly.svgDoc, window, 'resize');
};

/**
 * Create a copy of this block on the workspace.
 * @param {!Blockly.Block} originBlock The toolbox block to copy.
 * @return {!Function} Function to call when block is clicked.
 * @private
 */
Blockly.Toolbox.createBlockFunc_ = function(originBlock) {
  return function(e) {
    if (e.button == 2) {
      // Right-click.  Don't create a block, let the context menu show.
      return;
    }
    // Create the new block by cloning the block in the toolbox (via XML).
    var xml = Blockly.Xml.blockToDom_(originBlock);
    var block = Blockly.Xml.domToBlock_(Blockly.mainWorkspace, xml);
    // Place it in the same spot as the toolbox copy.
    var margin = Blockly.Toolbox.CORNER_RADIUS;
    var metrics = Blockly.getMainWorkspaceMetrics();
    var xy = Blockly.getAbsoluteXY_(originBlock.svg_.svgGroup_);
    var x = xy.x + metrics.viewLeft - metrics.absoluteLeft;
    var y = xy.y + metrics.viewTop - metrics.absoluteTop;
    block.moveBy(x, y);
    block.render();
    // Start a dragging operation on the new block.
    block.onMouseDown_(e);
  };
};

/**
 * Is the specified block in the toolbox's flyout?
 * This function is used to detect and prevent the closure of the flyout if
 * the user right-clicks on a toolbox's block.
 * @param {!Blockly.Block} block The block.
 * @return {boolean} True if the block is in the flyout.
 */
Blockly.Toolbox.isBlockInFlyout = function(block) {
  return block.workspace == Blockly.Toolbox.flyoutWorkspace_;
};

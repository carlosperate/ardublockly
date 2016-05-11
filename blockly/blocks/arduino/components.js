/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Block for standard Arduino components.
 */
'use strict';

goog.provide('Blockly.Blocks.components');

goog.require('Blockly.Blocks');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.components.HUE = '#70D65C'; //110;


Blockly.Blocks['core_hub_component'] = {
  /**
   * Block for the core hub component to which you can connect sensors/light/...
   * @this Blockly.Block
   */
  init: function() {
    this.arguments_ = [];
    this.setHelpUrl(''); //Blockly.Msg.ARD_CONTROLS_EFFECT_HELPURL);
    this.setColour(Blockly.Blocks.components.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_BOARD)
        .appendField(
            new Blockly.FieldDropdown(
                [['Arduino Uno', 'uno'],
                 ['Arduino Duemilanove', 'duemilanove_168p'],
                 ['Arduino Mega', 'mega'],
                 ['Arduino Leonardo/Yun', 'leonardo']
                ]), 'BOARD');
    this.setMutator(new Blockly.Mutator(['core_hub_digpin',
                                         'core_hub_anapin',
                                         'core_hub_pwmpin',
                                         'core_hub_digdigpin']));
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(Blockly.Msg.ARD_COMPONENT_BOARD_TIP);
    this.digCount_ = 0;
    this.anaCount_ = 0;
    this.pwmCount_ = 0;
    this.digdigCount_ = 0;
  },
  /**
   * Returns the Arduino Board name that is required for this block.
   * @return {!string} Board name.
   * @this Blockly.Block
   */
  getBoardName: function() {
    return this.getFieldValue('BOARD');
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks if the board selected corresponds to the what it should be
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    // Iterate through top level blocks to find if there are other board modules
    var blocks = this.workspace.getAllBlocks();
    var otherBoardPresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getBoardName;
      if (func) {
        var BoardName = func.call(blocks[x]);
        if (BoardName != this.getBoardName()) {
          otherBoardPresent = true;
        }
      }
    }
    
    if (otherBoardPresent) {
      // Set a warning to select a valid stepper config
      this.setWarningText(Blockly.Msg.ARD_BOARD_WARN.replace('%1', Blockly.Msg.ARD_COMPONENT_BOARD), 'board');
    } else {
      Blockly.Arduino.Boards.changeBoard(this.workspace, this.getBoardName());
      this.setWarningText(null, 'board');
    }
  },
  /**
   * Create XML to represent the number of pins.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    if (!this.digCount_ && !this.anaCount_ && !this.pwmCount_) {
      return null;
    }
    var container = document.createElement('mutation');
    if (this.digCount_) {
      container.setAttribute('dig', this.digCount_);
    }
    if (this.anaCount_) {
      container.setAttribute('ana', this.anaCount_);
    }
    if (this.pwmCount_) {
      container.setAttribute('pwm', this.pwmCount_);
    }
    if (this.digdigCount_) {
      container.setAttribute('digdig', this.digdigCount_);
    }
    return container;
  },
  /**
   * Parse XML to restore the pin inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.digCount_ = parseInt(xmlElement.getAttribute('dig'), 10) || 0;
    this.anaCount_ = parseInt(xmlElement.getAttribute('ana'), 10) || 0;
    this.pwmCount_ = parseInt(xmlElement.getAttribute('pwm'), 10) || 0;
    this.digdigCount_ = parseInt(xmlElement.getAttribute('digdig'), 10) || 0;
    for (var i = 1; i <= this.digCount_; i++) {
      this.appendValueInput('DIG' + i)
          .setCheck(["HUB_DIG", "HUB_DIGOUT"])
          .appendField(Blockly.Msg.ARD_PIN_DIG)
          .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "PIND"+i)
          .setAlign(Blockly.ALIGN_RIGHT);
    }
    for (var i = 1; i <= this.anaCount_; i++) {
      this.appendValueInput('ANA' + i)
          .setCheck(["HUB_DIG", "HUB_ANA"])
          .appendField(Blockly.Msg.ARD_PIN_AN)
          .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.analogPins), "PINA"+i)
          .setAlign(Blockly.ALIGN_RIGHT);
    }
    for (var i = 1; i <= this.pwmCount_; i++) {
      this.appendValueInput('PWM' + i)
          .setCheck(["HUB_PWM"])
          .appendField(Blockly.Msg.ARD_PIN_PWM)
          .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.pwmPins), "PINP"+i)
          .setAlign(Blockly.ALIGN_RIGHT);
    }
    for (var i = 1; i <= this.digdigCount_; i++) {
      this.appendValueInput('DIGDIG' + i)
          .setCheck(["HUB_DIGDIG"])
          .appendField(Blockly.Msg.ARD_PIN_DIGDIG1)
          .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "PINDD1_"+i)
          .appendField(Blockly.Msg.ARD_PIN_DIGDIG2)
          .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "PINDD2_"+i)
          .setAlign(Blockly.ALIGN_RIGHT);
    }
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('core_hub_hub');
    containerBlock.initSvg();
    var connection = containerBlock.nextConnection;
    for (var i = 1; i <= this.digCount_; i++) {
      var digpinBlock = workspace.newBlock('core_hub_digpin');
      digpinBlock.initSvg();
      connection.connect(digpinBlock.previousConnection);
      connection = digpinBlock.nextConnection;
    }
    for (var i = 1; i <= this.anaCount_; i++) {
      var anapinBlock = workspace.newBlock('core_hub_anapin');
      anapinBlock.initSvg();
      connection.connect(anapinBlock.previousConnection);
      connection = anapinBlock.nextConnection;
    }
    for (var i = 1; i <= this.pwmCount_; i++) {
      var pwmpinBlock = workspace.newBlock('core_hub_pwmpin');
      pwmpinBlock.initSvg();
      connection.connect(pwmpinBlock.previousConnection);
      connection = pwmpinBlock.nextConnection;
    }
    for (var i = 1; i <= this.digdigCount_; i++) {
      var digpinBlock = workspace.newBlock('core_hub_digdigpin');
      digpinBlock.initSvg();
      connection.connect(digpinBlock.previousConnection);
      connection = digpinBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    // Disconnect all the digpin input blocks and remove the inputs.
    var oldInputs = {}
    for (var i = this.digCount_; i > 0; i--) {
      oldInputs['DIG' + i] = this.getFieldValue('PIND' + i);
      this.removeInput('DIG' + i);
    }
    this.digCount_ = 0;
    // Disconnect all the anapin input blocks and remove the inputs.
    for (var i = this.anaCount_; i > 0; i--) {
      oldInputs['ANA' + i] = this.getFieldValue('PINA' + i);
      this.removeInput('ANA' + i);
    }
    this.anaCount_ = 0;
    // Disconnect all the pwmpin input blocks and remove the inputs.
    for (var i = this.pwmCount_; i > 0; i--) {
      oldInputs['PWM' + i] = this.getFieldValue('PINP' + i);
      this.removeInput('PWM' + i);
    }
    this.pwmCount_ = 0;
    // Disconnect all the double digpin input blocks and remove the inputs.
    for (var i = this.digdigCount_; i > 0; i--) {
      oldInputs['DIGDIG' + i] = [this.getFieldValue('PINDD1_' + i),
                              this.getFieldValue('PINDD2_' + i)];
      this.removeInput('DIGDIG' + i);
    }
    this.digdigCount_ = 0;
    // Rebuild the block's optional inputs.
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    console.log('inputs', oldInputs);
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'core_hub_digpin':
          this.digCount_++;
          var digInput = this.appendValueInput('DIG' + this.digCount_)
              .setCheck(["HUB_DIG", "HUB_DIGOUT"])
              .appendField(Blockly.Msg.ARD_PIN_DIG)
              .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "PIND" + this.digCount_)
              .setAlign(Blockly.ALIGN_RIGHT);
          if (! (oldInputs['DIG' + this.digCount_] == undefined)) {
            this.setFieldValue(oldInputs['DIG' + this.digCount_], "PIND" + this.digCount_);
          }
          if (clauseBlock.valueDConnection_) {
            digInput.connection.connect(clauseBlock.valueDConnection_);
          }
          break;
        case 'core_hub_anapin':
          this.anaCount_++;
          var anaInput = this.appendValueInput('ANA' + this.anaCount_)
              .setCheck(["HUB_DIG", "HUB_ANA"])
              .appendField(Blockly.Msg.ARD_PIN_AN)
              .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.analogPins), "PINA" + this.anaCount_)
              .setAlign(Blockly.ALIGN_RIGHT);
          if (! (oldInputs['ANA' + this.anaCount_] == undefined)) {
            this.setFieldValue(oldInputs['ANA' + this.anaCount_], "PINA" + this.anaCount_);
          }
          if (clauseBlock.valueAConnection_) {
            anaInput.connection.connect(clauseBlock.valueAConnection_);
          }
          break;
        case 'core_hub_pwmpin':
          this.pwmCount_++;
          var pwmInput = this.appendValueInput('PWM' + this.pwmCount_)
              .setCheck(["HUB_PWM"])
              .appendField(Blockly.Msg.ARD_PIN_PWM)
              .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.pwmPins), "PINP" + this.pwmCount_)
              .setAlign(Blockly.ALIGN_RIGHT);
          if (! (oldInputs['PWM' + this.pwmCount_] == undefined)) {
            this.setFieldValue(oldInputs['PWM' + this.pwmCount_], "PINP" + this.pwmCount_);
          }
          if (clauseBlock.valuePConnection_) {
            pwmInput.connection.connect(clauseBlock.valuePConnection_);
          }
          break;
        case 'core_hub_digdigpin':
          this.digdigCount_++;
          var digInput = this.appendValueInput('DIGDIG' + this.digdigCount_)
              .setCheck(["HUB_DIGDIG"])
              .appendField(Blockly.Msg.ARD_PIN_DIGDIG1)
              .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "PINDD1_" + this.digdigCount_)
              .appendField(Blockly.Msg.ARD_PIN_DIGDIG2)
              .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "PINDD2_" + this.digdigCount_)
              .setAlign(Blockly.ALIGN_RIGHT);
          if (! (oldInputs['DIGDIG' + this.digdigCount_] == undefined)) {
            this.setFieldValue(oldInputs['DIGDIG' + this.digdigCount_][0], "PINDD1_" + this.digdigCount_);
            this.setFieldValue(oldInputs['DIGDIG' + this.digdigCount_][1], "PINDD2_" + this.digdigCount_);
          }
          if (clauseBlock.valueDDConnection_) {
            digInput.connection.connect(clauseBlock.valueDDConnection_);
          }
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    var i = 1, j=1, k=1, ii=1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'core_hub_digpin':
          var inputDig = this.getInput('DIG' + i);
          clauseBlock.valueDConnection_ =
              inputDig && inputDig.connection.targetConnection;
          i++;
          break;
        case 'core_hub_anapin':
          var inputAna = this.getInput('ANA' + j);
          clauseBlock.valueAConnection_ =
              inputAna && inputAna.connection.targetConnection;
          j++;
          break;
        case 'core_hub_pwmpin':
          var inputPwm = this.getInput('PWM' + k);
          clauseBlock.valuePConnection_ =
              inputPwm && inputPwm.connection.targetConnection;
          k++;
          break;
        case 'core_hub_digdigpin':
          var inputDigDig = this.getInput('DIGDIG' + ii);
          clauseBlock.valueDDConnection_ =
              inputDigDig && inputDigDig.connection.targetConnection;
          ii++;
          break;
        default:
          throw 'Unknown block type ' + clauseBlock.type ;
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    for (var i = 1; i <= this.digCount_; i++) {
      Blockly.Arduino.Boards.refreshBlockFieldDropdown(
          this, 'PIND'+i, 'digitalPins');
    }
    for (var i = 1; i <= this.anaCount_; i++) {
      Blockly.Arduino.Boards.refreshBlockFieldDropdown(
          this, 'PINA'+i, 'analogPins');
    }
    for (var i = 1; i <= this.pwmCount_; i++) {
      Blockly.Arduino.Boards.refreshBlockFieldDropdown(
          this, 'PINP'+i, 'pwmPins');
    }
    for (var i = 1; i <= this.digdigCount_; i++) {
      Blockly.Arduino.Boards.refreshBlockFieldDropdown(
          this, 'PINDD1_'+i, 'digitalPins');
      Blockly.Arduino.Boards.refreshBlockFieldDropdown(
          this, 'PINDD2_'+i, 'digitalPins');
    }
  }
};

Blockly.Blocks['core_hub_hub'] = {
  /**
   * Mutator block for if container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.components.HUE);
    this.appendDummyInput()
        .appendField('Arduino Hub');
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.ARD_COMPONENT_BOARD_HUB_TIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['core_hub_digpin'] = {
  /**
   * Mutator block for single digital pin connection.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.components.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_PIN_DIG)
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.ARD_PIN_DIG_TIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['core_hub_anapin'] = {
  /**
   * Mutator block for single analog pin connection.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.components.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_PIN_AN);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.ARD_PIN_AN_TIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['core_hub_pwmpin'] = {
  /**
   * Mutator block for else condition.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.components.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_PIN_PWM);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.ARD_PIN_PWM_TIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['core_hub_digdigpin'] = {
  /**
   * Mutator block for single digital pin connection.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.components.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_PIN_DIGDIG)
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.ARD_PIN_DIGDIG_TIP);
    this.contextMenu = false;
  }
};

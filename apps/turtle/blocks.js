/**
 * Blockly Demo: Turtle Graphics
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
 * @fileoverview Demonstration of Blockly: Turtle Graphics.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

// Extensions to Blockly's language and JavaScript generator.

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

// Restricted blocks for tutorial.

Blockly.Language.draw_move_forward_100 = {
  // Block for moving forward 100 pixels.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(MSG.move)
        .appendTitle(MSG.forward)
        .appendTitle(MSG.moveBy)
        .appendTitle('100');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(MSG.moveForward100Tooltip);
  }
};

Blockly.JavaScript.draw_move_forward_100 = function() {
  // Generate JavaScript for moving forward 100 pixels.
  return 'Turtle.moveForward(100, \'' + this.id + '\');\n';
};

Blockly.Language.draw_turn_right_90 = {
  // Block for turning right 90 degrees.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(MSG.turn)
        .appendTitle(MSG.right)
        .appendTitle(MSG.turnBy)
        .appendTitle('90');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(MSG.turnRight90Tooltip);
  }
};

Blockly.JavaScript.draw_turn_right_90 = function() {
  // Generate JavaScript for turning right 90 degrees.
  return 'Turtle.turnRight(90, \'' + this.id + '\');\n';
};

// General blocks.

Blockly.Language.draw_move = {
  // Block for moving forward or backwards.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendValueInput('VALUE')
        .setCheck(Number)
        .appendTitle(MSG.move)
        .appendTitle(new Blockly.FieldDropdown(
            Blockly.Language.draw_move.DIRECTIONS), 'DIR')
        .appendTitle(MSG.moveBy);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(MSG.moveTooltip);
  }
};

Blockly.Language.draw_move.DIRECTIONS =
    [[MSG.forward, 'moveForward'], [MSG.backward, 'moveBackward']];

Blockly.JavaScript.draw_move = function() {
  // Generate JavaScript for moving forward or backwards.
  var value = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'Turtle.' + this.getTitleValue('DIR') +
      '(' + value + ', \'' + this.id + '\');\n';
};


Blockly.Language.draw_turn = {
  // Block for turning left or right.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendValueInput('VALUE')
        .setCheck(Number)
        .appendTitle(MSG.turn)
        .appendTitle(new Blockly.FieldDropdown(
            Blockly.Language.draw_turn.DIRECTIONS), 'DIR')
        .appendTitle(MSG.turnBy);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(MSG.turnTooltip);
  }
};

Blockly.Language.draw_turn.DIRECTIONS =
    [[MSG.right, 'turnRight'], [MSG.left, 'turnLeft']];

Blockly.JavaScript.draw_turn = function() {
  // Generate JavaScript for turning left or right.
  var value = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'Turtle.' + this.getTitleValue('DIR') +
      '(' + value + ', \'' + this.id + '\');\n';
};

Blockly.Language.draw_width = {
  // Block for setting the width.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendValueInput('WIDTH')
        .setCheck(Number)
        .appendTitle(MSG.setWidth);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(MSG.widthTooltip);
  }
};

Blockly.JavaScript.draw_width = function() {
  // Generate JavaScript for setting the width.
  var width = Blockly.JavaScript.valueToCode(this, 'WIDTH',
      Blockly.JavaScript.ORDER_NONE) || '1';
  return 'Turtle.penWidth(' + width + ', \'' + this.id + '\');\n';
};

Blockly.Language.draw_pen = {
  // Block for pen up/down.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(MSG.pen)
        .appendTitle(new Blockly.FieldDropdown(this.STATE), 'PEN');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(MSG.penTooltip);
  }
};

Blockly.Language.draw_pen.STATE = [[MSG.up, 'penUp'], [MSG.down, 'penDown']];

Blockly.JavaScript.draw_pen = function() {
  // Generate JavaScript for pen up/down.
  return 'Turtle.' + this.getTitleValue('PEN') + '(\'' + this.id + '\');\n';
};

Blockly.Language.draw_colour = {
  // Block for setting the colour.
  helpUrl: '',
  init: function() {
    this.setColour(20);
    this.appendValueInput('COLOUR')
        .setCheck('Colour')
        .appendTitle(MSG.setColour);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(MSG.colourTooltip);
  }
};

Blockly.JavaScript.draw_colour = function() {
  // Generate JavaScript for setting the colour.
  var colour = Blockly.JavaScript.valueToCode(this, 'COLOUR',
      Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return 'Turtle.penColour(' + colour + ', \'' +
      this.id + '\');\n';
};

Blockly.Language.turtle_visibility = {
  // Block for changing turtle visiblity.
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(this.STATE), 'VISIBILITY')
        .appendTitle(MSG.turtle);
    this.setTooltip(MSG.turtleVisibilityTooltip);
  }
};

Blockly.Language.turtle_visibility.STATE =
    [[MSG.hide, 'hideTurtle'], [MSG.show, 'showTurtle']];

Blockly.JavaScript.turtle_visibility = function() {
  // Generate JavaScript for changing turtle visibility.
  return 'Turtle.' + this.getTitleValue('VISIBILITY') +
      '(\'' + this.id + '\');\n';
};

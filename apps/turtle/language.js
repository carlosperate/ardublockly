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

Blockly.Language.draw_move_int = {
  // Block for moving forward or backwards.
  // Internal input.
  category: 'Draw',
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle('move')
        .appendTitle(new Blockly.FieldDropdown(this.DIRECTIONS), 'DIR')
        .appendTitle('by')
        .appendTitle(new Blockly.FieldTextInput('10',
            Blockly.Language.math_number.validator), 'VALUE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Moves the turtle forward or backward\n' +
                    'by the specified amount.');
  }
};

Blockly.Language.draw_move_int.DIRECTIONS =
    [['forward', 'moveForward'], ['backward', 'moveBackward']];

Blockly.JavaScript.draw_move_int = function() {
  // Generate JavaScript for moving forward or backwards.
  // Internal input.
  var value = window.parseFloat(this.getTitleValue('VALUE'));
  return 'Turtle.' + this.getTitleValue('DIR') +
      '(' + value + ', \'' + this.id + '\');\n';
};

Blockly.Language.draw_move_ext = {
  // Block for moving forward or backwards.
  // External input.
  category: 'Draw',
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendValueInput('VALUE')
        .setCheck(Number)
        .appendTitle('move')
        .appendTitle(new Blockly.FieldDropdown(
            Blockly.Language.draw_move_int.DIRECTIONS), 'DIR')
        .appendTitle('by');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Moves the turtle forward or backward\n' +
                    'by the specified amount.');
  }
};

Blockly.JavaScript.draw_move_ext = function() {
  // Generate JavaScript for moving forward or backwards.
  // External input.
  var value = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'Turtle.' + this.getTitleValue('DIR') +
      '(' + value + ', \'' + this.id + '\');\n';
};


Blockly.Language.draw_turn_int = {
  // Block for turning left or right.
  // Internal input.
  category: 'Draw',
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle('turn')
        .appendTitle(new Blockly.FieldDropdown(this.DIRECTIONS), 'DIR')
        .appendTitle('by')
        .appendTitle(new Blockly.FieldTextInput('90',
            Blockly.Language.math_number.validator), 'VALUE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Turns the turtle left or right\n' +
                    'by the specified number of degrees.');
  }
};

Blockly.Language.draw_turn_int.DIRECTIONS =
    [['right', 'turnRight'], ['left', 'turnLeft']];

Blockly.JavaScript.draw_turn_int = function() {
  // Generate JavaScript for turning left or right.
  // Internal input.
  var value = window.parseFloat(this.getTitleValue('VALUE'));
  return 'Turtle.' + this.getTitleValue('DIR') +
      '(' + value + ', \'' + this.id + '\');\n';
};

Blockly.Language.draw_turn_ext = {
  // Block for turning left or right.
  // External input.
  category: 'Draw',
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendValueInput('VALUE')
        .setCheck(Number)
        .appendTitle('turn')
        .appendTitle(new Blockly.FieldDropdown(
            Blockly.Language.draw_turn_int.DIRECTIONS), 'DIR')
        .appendTitle('by');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Turns the turtle left or right\n' +
                    'by the specified number of degrees.');
  }
};

Blockly.JavaScript.draw_turn_ext = function() {
  // Generate JavaScript for turning left or right.
  // External input.
  var value = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'Turtle.' + this.getTitleValue('DIR') +
      '(' + value + ', \'' + this.id + '\');\n';
};

Blockly.Language.draw_width_int = {
  // Block for setting the width.
  // Internal input.
  category: 'Draw',
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle('set width')
        .appendTitle(new Blockly.FieldTextInput('1',
            Blockly.Language.math_number.validator), 'WIDTH');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript.draw_width_int = function() {
  // Generate JavaScript for setting the width.
  // Internal input.
  var width = window.parseFloat(this.getTitleValue('WIDTH'));
  return 'Turtle.penWidth(' + width + ', \'' + this.id + '\');\n';
};

Blockly.Language.draw_width_ext = {
  // Block for setting the width.
  // External input.
  category: 'Draw',
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendValueInput('WIDTH')
        .setCheck(Number)
        .appendTitle('set width')
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript.draw_width_ext = function() {
  // Generate JavaScript for setting the width.
  // External input.
  var width = Blockly.JavaScript.valueToCode(this, 'WIDTH',
      Blockly.JavaScript.ORDER_NONE) || '1';
  return 'Turtle.penWidth(' + width + ', \'' + this.id + '\');\n';
};

Blockly.Language.draw_pen_int = {
  // Block for pen up/down.
  // Internal input.
  category: 'Draw',
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle('pen')
        .appendTitle(new Blockly.FieldDropdown(this.STATE), 'PEN');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Language.draw_pen_int.STATE = [['up', 'penUp'], ['down', 'penDown']];

Blockly.JavaScript.draw_pen_int = function() {
  // Generate JavaScript for pen up/down.
  // Internal input.
  return 'Turtle.' + this.getTitleValue('PEN') + '(\'' + this.id + '\');\n';
};

Blockly.Language.draw_colour_int = {
  // Block for setting the colour.
  // Internal input.
  category: 'Colour',
  helpUrl: '',
  init: function() {
    this.setColour(20);
    this.appendDummyInput()
        .appendTitle('set colour')
        .appendTitle(new Blockly.FieldColour('#ffcc33'), 'COLOUR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript.draw_colour_int = function() {
  // Generate JavaScript for setting the colour.
  // Internal input.
  return 'Turtle.penColour(\'' + this.getTitleValue('COLOUR') + '\', \'' +
      this.id + '\');\n';
};

Blockly.Language.draw_colour_ext = {
  // Block for setting the colour.
  // External input.
  category: 'Colour',
  helpUrl: '',
  init: function() {
    this.setColour(20);
    this.appendValueInput('COLOUR')
        .setCheck('Colour')
        .appendTitle('set colour');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript.draw_colour_ext = function() {
  // Generate JavaScript for setting the colour.
  // External input.
  var colour = Blockly.JavaScript.valueToCode(this, 'COLOUR',
      Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return 'Turtle.penColour(' + colour + ', \'' +
      this.id + '\');\n';
};


function init() {
  Blockly.inject(document.body, {path: '../../'});

  if (window.parent.Turtle) {
    // Let the top-level application know that Blockly is ready.
    window.parent.Turtle.init(Blockly);
  } else {
    // Attempt to diagnose the problem.
    var msg = 'Error: Unable to communicate between frames.\n\n';
    if (window.parent == window) {
      msg += 'Try loading index.html instead of frame.html';
    } else if (window.location.protocol == 'file:') {
      msg += 'This may be due to a security restriction preventing\n' +
          'access when using the file:// protocol.\n' +
          'http://code.google.com/p/chromium/issues/detail?id=47416';
    }
    alert(msg);
  }
}

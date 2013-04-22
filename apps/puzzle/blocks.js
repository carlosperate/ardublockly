/**
 * Blockly Demo: Puzzle
 *
 * Copyright 2013 Google Inc.
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


Blockly.Language.country = {
  helpUrl: '',
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle('', 'NAME');
    this.appendValueInput('FLAG')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(MSG.flag);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(MSG.language)
        .appendTitle(new Blockly.FieldDropdown(Puzzle.languages), 'LANG');
    this.appendStatementInput('CITIES')
        .appendTitle(MSG.cities);
  },
  country: 0,
  isCorrect: function() {
    return this.getTitleValue('LANG') == this.country;
  }
};

Blockly.Language.flag = {
  helpUrl: '',
  init: function() {
    this.setColour(30);
    this.appendDummyInput('IMG');
    this.setOutput(true);
    this.setTooltip('');
  },
  country: 0,
  isCorrect: function() {
    var parent = this.getParent();
    return parent && (parent.country == this.country);
  }
};

Blockly.Language.city = {
  helpUrl: '',
  init: function() {
    this.setColour(290);
    this.appendDummyInput().appendTitle('', 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },
  country: 0,
  isCorrect: function() {
    var parent = this.getSurroundParent();
    return parent && (parent.country == this.country);
  }
};

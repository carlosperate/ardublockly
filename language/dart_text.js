/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
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
 * @fileoverview Generating Dart for text blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

Blockly.Dart = Blockly.Generator.get('Dart');

Blockly.Dart.text = function() {
  // Text value.
  return Blockly.Dart.scrub_(this,
      Blockly.Dart.quote_(this.getTitleText(1)));
};

Blockly.Dart.text_length = function() {
  // String length.
  var argument0 = Blockly.Dart.valueToCode_(this, 0) || '\'\'';
  var code = argument0 + '.length';
  return Blockly.Dart.scrub_(this, code);
};

Blockly.Dart.text_changecase = function() {
  // Change capitalization.
  var operator = Blockly.Dart.text_changecase.MAP_[this.getValueLabel(0)];
  var code;
  if (operator) {
    // Upper and lower case are functions built into Dart.
    var argument0 = Blockly.Dart.valueToCode_(this, 0) || '\'\'';
    code = argument0 + '.' + operator + '()';
  } else {
    if (!Blockly.Dart.definitions_['toTitleCase']) {
      // Title case is not a native Dart function.  Define one.
      var func = [];
      func.push('Blockly_toTitleCase(str) {');
      func.push('  RegExp exp = const RegExp(@"(\\w\\S*)");');
      func.push('  List<String> list = str.split(exp);');
      func.push('  String title = \'\';');
      func.push('  for (String part in list) {');
      func.push('    if (part.length > 0) {');
      func.push('      title += part[0].toUpperCase();');
      func.push('      if (part.length > 0) {');
      func.push('        title += part.substring(1).toLowerCase();');
      func.push('      }');
      func.push('    }');
      func.push('  }');
      func.push('  return title;');
      func.push('}');
      Blockly.Dart.definitions_['toTitleCase'] = func.join('\n');
    }
    var argument0 = Blockly.Dart.valueToCode_(this, 0, true) || '\'\'';
    code = 'Blockly_toTitleCase(' + argument0 + ')';
  }
  return Blockly.Dart.scrub_(this, code);
};

Blockly.Dart.text_changecase.MAP_ = {};
Blockly.Dart.text_changecase.MAP_[Blockly.Language.text_changecase.MSG_UPPERCASE] = 'toUpperCase';
Blockly.Dart.text_changecase.MAP_[Blockly.Language.text_changecase.MSG_LOWERCASE] = 'toLowerCase';
Blockly.Dart.text_changecase.MAP_[Blockly.Language.text_changecase.MSG_UPPERCASE] = null;

Blockly.Dart.text_print = function() {
  // Print statement.
  var argument0 = Blockly.Dart.valueToCode_(this, 0, true) || '\'\'';
  var code = 'print(' + argument0 + ');\n';
  return Blockly.Dart.scrub_(this, code);
};

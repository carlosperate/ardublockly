/**
 * Visual Blocks Language
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
 * @fileoverview Generating JavaScript for unit test blocks.
 * @author fraser@google.com (Neil Fraser)
 */

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.JavaScript.unittest_main = function() {
  // Container for unit tests.
  if (!Blockly.JavaScript.definitions_['unittest_report']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
        'testReport', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.unittest_main.report = functionName;
    var func = [];
    func.push('function ' + functionName + '() {');
    func.push('  // Create test report.');
    func.push('  var report = [];');
    func.push('  var summary = [];');
    func.push('  var fails = 0;');
    func.push('  for (var x = 0; x < unittestResults.length; x++) {');
    func.push('    if (unittestResults[x][0]) {');
    func.push('      summary.push(".");');
    func.push('    } else {');
    func.push('      summary.push("F");');
    func.push('      fails++;');
    func.push('      report.push("");');
    func.push('      report.push("FAIL: " + unittestResults[x][2]);');
    func.push('      report.push(unittestResults[x][1]);');
    func.push('    }');
    func.push('  }');
    func.push('  report.unshift(summary.join(""));');
    func.push('  report.push("");');
    func.push('  report.push("Ran " + unittestResults.length + " test.");');
    func.push('  report.push("");');
    func.push('  if (fails) {');
    func.push('    report.push("FAILED (failures=" + fails + ")");');
    func.push('  } else {');
    func.push('    report.push("OK");');
    func.push('  }');
    func.push('  return report.join("\\n");');
    func.push('}');
    func.push('');
    Blockly.JavaScript.definitions_['unittest_report'] = func.join('\n');
  }
  // Setup global to hold test results.
  var code = 'unittestResults = [];\n';
  // Run tests (unindented).
  code += Blockly.JavaScript.statementToCode(this, 'DO')
      .replace(/^  /, '').replace(/\n  /g, '\n');
  var reportVar = Blockly.JavaScript.variableDB_.getDistinctName(
      'report', Blockly.Variables.NAME_TYPE);
  code += 'var ' + reportVar + ' = ' +
      Blockly.JavaScript.unittest_main.report + '();\n';
  // Destroy results.
  code += 'delete unittestResults;\n';
  // Send the report to the console (that's where errors will go anyway).
  code += 'console.log(' + reportVar + ');\n';
  return code;
};

Blockly.JavaScript.unittest_assertequals = function() {
  // Asserts that a value equals another value.
  var message = Blockly.JavaScript.quote_(this.getTitleText('MESSAGE'));
  if (!Blockly.JavaScript.definitions_['unittest_assertequals']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
        'assertEquals', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.unittest_assertequals.assert = functionName;
    var func = [];
    func.push('function ' + functionName + '(actual, expected, message) {');
    func.push('  // Asserts that a value equals another value.');
    func.push('  if (!unittestResults) {');
    func.push('    throw "Orphaned assert equals: ' + message + '";');
    func.push('  }');
    func.push('  if (actual == expected) {');
    func.push('    unittestResults.push([true, "OK", message]);');
    func.push('  } else {');
    func.push('    unittestResults.push([false, ' +
        '"Expected: " + expected + "\\nActual: " + actual, message]);');
    func.push('  }');
    func.push('}');
    func.push('');
    Blockly.JavaScript.definitions_['unittest_assertequals'] = func.join('\n');
  }
  var actual = Blockly.JavaScript.valueToCode(this, 'ACTUAL',
      Blockly.JavaScript.ORDER_COMMA) || 'null';
  var expected = Blockly.JavaScript.valueToCode(this, 'EXPECTED',
      Blockly.JavaScript.ORDER_COMMA) || 'null';
  return Blockly.JavaScript.unittest_assertequals.assert + '(' +
      actual + ', ' + expected + ', ' + message + ');\n';
};

Blockly.JavaScript.unittest_asserttrue = function() {
  // Asserts that a value is true.
  var message = Blockly.JavaScript.quote_(this.getTitleText('MESSAGE'));
  if (!Blockly.JavaScript.definitions_['unittest_asserttrue']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
        'assertTrue', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.unittest_asserttrue.assert = functionName;
    var func = [];
    func.push('function ' + functionName + '(actual, message) {');
    func.push('  // Asserts that a value is true.');
    func.push('  if (!unittestResults) {');
    func.push('    throw "Orphaned assert true: ' + message + '";');
    func.push('  }');
    func.push('  if (actual == true) {');
    func.push('    unittestResults.push([true, "OK", message]);');
    func.push('  } else {');
    func.push('    unittestResults.push([false, ' +
              '"Expected: true\\nActual: " + actual, message]);');
    func.push('  }');
    func.push('}');
    func.push('');
    Blockly.JavaScript.definitions_['unittest_asserttrue'] = func.join('\n');
  }
  var actual = Blockly.JavaScript.valueToCode(this, 'ACTUAL',
      Blockly.JavaScript.ORDER_COMMA) || 'true';
  return Blockly.JavaScript.unittest_asserttrue.assert +
      '(' + actual + ', ' + message + ');\n';
};

Blockly.JavaScript.unittest_assertfalse = function() {
  // Asserts that a value is false.
  var message = Blockly.JavaScript.quote_(this.getTitleText('MESSAGE'));
  if (!Blockly.JavaScript.definitions_['unittest_assertfalse']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
        'assertFalse', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.unittest_assertfalse.assert = functionName;
    var func = [];
    func.push('function ' + functionName + '(actual, message) {');
    func.push('  // Asserts that a value is false.');
    func.push('  if (!unittestResults) {');
    func.push('    throw "Orphaned assert false: ' + message + '";');
    func.push('  }');
    func.push('  if (actual == false) {');
    func.push('    unittestResults.push([true, "OK", message]);');
    func.push('  } else {');
    func.push('    unittestResults.push([false, ' +
              '"Expected: false\\nActual: " + actual, message]);');
    func.push('  }');
    func.push('}');
    func.push('');
    Blockly.JavaScript.definitions_['unittest_assertfalse'] = func.join('\n');
  }
  var actual = Blockly.JavaScript.valueToCode(this, 'ACTUAL',
      Blockly.JavaScript.ORDER_COMMA) || 'false';
  return Blockly.JavaScript.unittest_assertfalse.assert +
      '(' + actual + ', ' + message + ');\n';
};

Blockly.JavaScript.unittest_fail = function() {
  // Always assert an error.
  var message = Blockly.JavaScript.quote_(this.getTitleText('MESSAGE'));
  if (!Blockly.JavaScript.definitions_['unittest_fail']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
        'fail', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.unittest_fail.assert = functionName;
    var func = [];
    func.push('function ' + functionName + '(message) {');
    func.push('  // Always assert an error.');
    func.push('  if (!unittestResults) {');
    func.push('    throw "Orphaned assert fail: ' + message + '";');
    func.push('  }');
    func.push('  unittestResults.push([false, "Fail.", message]);');
    func.push('}');
    func.push('');
    Blockly.JavaScript.definitions_['unittest_fail'] = func.join('\n');
  }
  return Blockly.JavaScript.unittest_fail.assert + '(' + message + ');\n';
};

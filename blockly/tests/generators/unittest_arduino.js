/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Generating Arduino code for unit test blocks.
 *               Based on the Dart unite test code.
 *
 * TODO: Everything. For now it at least parses the code into (invalid) code
 *       text.
 */
'use strict';

Blockly.Arduino['unittest_main'] = function(block) {
  // Container for unit tests.
  var resultsVar = Blockly.Arduino.variableDB_.getName('unittestResults',
      Blockly.Variables.NAME_TYPE);
  var functionName = Blockly.Arduino.provideFunction_(
      'unittest_report',
      [ 'String ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ + '() {',
        '  // Create test report.',
        '  List report = [];',
        '  String summary = new String();',
        '  int fails = 0;',
        '  for (int x = 0; x < ' + resultsVar + '.length; x++) {',
        '    if (' + resultsVar + '[x][0]) {',
        '      summary += ".";',
        '    } else {',
        '      summary += "F";',
        '      fails++;',
        '      report.add("");',
        '      report.add("FAIL: ${' + resultsVar + '[x][2]}");',
        '      report.add(' + resultsVar + '[x][1]);',
        '    }',
        '  }',
        '  report.insert(0, summary);',
        '  report.add("");',
        '  report.add("Ran ${' + resultsVar + '.length} tests.");',
        '  report.add("");',
        '  if (fails != 0) {',
        '    report.add("FAILED (failures=$fails)");',
        '  } else {',
        '    report.add("OK");',
        '  }',
        '  return report.join("\\n");',
        '}']);
  // Setup global to hold test results.
  var code = resultsVar + ' = [];\n';
  // Run tests (unindented).
  code += Blockly.Arduino.statementToCode(block, 'DO')
      .replace(/^  /, '').replace(/\n  /g, '\n');
  var reportVar = Blockly.Arduino.variableDB_.getDistinctName(
      'report', Blockly.Variables.NAME_TYPE);
  code += 'String ' + reportVar + ' = ' + functionName + '();\n';
  // Destroy results.
  code += resultsVar + ' = null;\n';
  // Print the report to the console (that's where errors will go anyway).
  code += 'print(' + reportVar + ');\n';
  return code;
};

Blockly.Arduino['unittest_main'].defineAssert_ = function() {
  var resultsVar = Blockly.Arduino.variableDB_.getName('unittestResults',
      Blockly.Variables.NAME_TYPE);
  var functionName = Blockly.Arduino.provideFunction_(
      'unittest_assertequals',
      [ 'void ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
          '(dynamic actual, dynamic expected, String message) {',
        '  // Asserts that a value equals another value.',
        '  if (' + resultsVar + ' == null) {',
        '    throw "Orphaned assert: ${message}";',
        '  }',
        '  bool equals(a, b) {',
        '    if (a == b) {',
        '      return true;',
        '    } else if (a is List && b is List) {',
        '      if (a.length != b.length) {',
        '        return false;',
        '      }',
        '      for (num i = 0; i < a.length; i++) {',
        '        if (!equals(a[i], b[i])) {',
        '          return false;',
        '        }',
        '      }',
        '      return true;',
        '    }',
        '    return false;',
        '  }',
        '  if (equals(actual, expected)) {',
        '    ' + resultsVar + '.add([true, "OK", message]);',
        '  } else {',
        '    ' + resultsVar + '.add([false, ' +
          '"Expected: $expected\\nActual: $actual", message]);',
        '  }',
        '}\n']);
  return functionName;
};

Blockly.Arduino['unittest_assertequals'] = function(block) {
  // Asserts that a value equals another value.
  var message = Blockly.Arduino.quote_(block.getFieldValue('MESSAGE'));
  var actual = Blockly.Arduino.valueToCode(block, 'ACTUAL',
      Blockly.Arduino.ORDER_NONE) || 'null';
  var expected = Blockly.Arduino.valueToCode(block, 'EXPECTED',
      Blockly.Arduino.ORDER_NONE) || 'null';
  return Blockly.Arduino['unittest_main'].defineAssert_() +
      '(' + actual + ', ' + expected + ', ' + message + ');\n';
};

Blockly.Arduino['unittest_assertvalue'] = function(block) {
  // Asserts that a value is true, false, or null.
  var message = Blockly.Arduino.quote_(block.getFieldValue('MESSAGE'));
  var actual = Blockly.Arduino.valueToCode(block, 'ACTUAL',
      Blockly.Arduino.ORDER_NONE) || 'null';
  var expected = block.getFieldValue('EXPECTED');
  if (expected == 'TRUE') {
    expected = 'true';
  } else if (expected == 'FALSE') {
    expected = 'false';
  } else if (expected == 'NULL') {
    expected = 'null';
  }
  return Blockly.Arduino['unittest_main'].defineAssert_() +
      '(' + actual + ', ' + expected + ', ' + message + ');\n';
};

Blockly.Arduino['unittest_fail'] = function(block) {
  // Always assert an error.
  var resultsVar = Blockly.Arduino.variableDB_.getName('unittestResults',
      Blockly.Variables.NAME_TYPE);
  var message = Blockly.Arduino.quote_(block.getFieldValue('MESSAGE'));
  var functionName = Blockly.Arduino.provideFunction_(
      'unittest_fail',
      [ 'void ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
          '(String message) {',
        '  // Always assert an error.',
        '  if (' + resultsVar + ' == null) {',
        '    throw "Orphaned assert fail: ${message}";',
        '  }',
        '  ' + resultsVar + '.add([false, "Fail.", message]);',
        '}\n']);
  return functionName + '(' + message + ');\n';
};

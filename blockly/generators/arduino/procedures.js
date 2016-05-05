/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Arduino code for procedure (function) blocks.
 *
 * TODO: For now all variables will stay at "int". Once type is implemented
 *       it needs to be captured on the functions with return.
 */
'use strict';

goog.provide('Blockly.Arduino.procedures');

goog.require('Blockly.Arduino');


/**
 * Code generator to create a function with a return value (X).
 * Arduino code: void functionname { return X }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {null} There is no code added to loop.
 */
Blockly.Arduino['procedures_defreturn'] = function(block) {
  var funcName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Arduino.statementToCode(block, 'STACK');
  if (Blockly.Arduino.STATEMENT_PREFIX) {
    branch = Blockly.Arduino.prefixLines(
        Blockly.Arduino.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + block.id + '\''), Blockly.Arduino.INDENT) + branch;
  }
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var returnValue = Blockly.Arduino.valueToCode(block, 'RETURN',
      Blockly.Arduino.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';\n';
  }

  // Get arguments with type
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] =
        Blockly.Arduino.getArduinoType_(block.getArgType(block.arguments_[x])) +
        ' ' +
        Blockly.Arduino.variableDB_.getName(block.arguments_[x],
            Blockly.Variables.NAME_TYPE);
  }

  // Get return type
  var returnType = Blockly.Types.NULL;
  if (block.getReturnType) {
    returnType = block.getReturnType();
  }
  returnType = Blockly.Arduino.getArduinoType_(returnType);

  // Construct code
  var code = returnType + ' ' + funcName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}';
  code = Blockly.Arduino.scrub_(block, code);
  Blockly.Arduino.userFunctions_[funcName] = code;
  return null;
};

/**
 * Code generator to create a function without a return value.
 * It uses the same code as with return value, as it will maintain the void
 * type.
 * Arduino code: void functionname { }
 */
Blockly.Arduino['procedures_defnoreturn'] =
    Blockly.Arduino['procedures_defreturn'];

/**
 * Code generator to create a function call with a return value.
 * Arduino code: loop { functionname() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['procedures_callreturn'] = function(block) {
  var funcName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.Arduino.valueToCode(block, 'ARG' + x,
        Blockly.Arduino.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

/**
 * Code generator to create a function call without a return value.
 * Arduino code: loop { functionname() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['procedures_callnoreturn'] = function(block) {
  var funcName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.Arduino.valueToCode(block, 'ARG' + x,
        Blockly.Arduino.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ');\n';
  return code;
};

/**
 * Code generator to create a conditional (X) return value (Y) for a function.
 * Arduino code: if (X) { return Y; }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['procedures_ifreturn'] = function(block) {
  var condition = Blockly.Arduino.valueToCode(block, 'CONDITION',
      Blockly.Arduino.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n';
  if (block.hasReturnValue_) {
    var value = Blockly.Arduino.valueToCode(block, 'VALUE',
        Blockly.Arduino.ORDER_NONE) || 'null';
    code += '  return ' + value + ';\n';
  } else {
    code += '  return;\n';
  }
  code += '}\n';
  return code;
};

/**
 * Code generator to add code into the setup() and loop() functions.
 * Its use is not mandatory, but necessary to add manual code to setup().
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['arduino_functions'] = function(block) {
  // Edited version of Blockly.Generator.prototype.statementToCode
  function statementToCodeNoTab(block, name) {
    var targetBlock = block.getInputTargetBlock(name);
    var code = Blockly.Arduino.blockToCode(targetBlock);
    if (!goog.isString(code)) {
      throw 'Expecting code from statement block "' + targetBlock.type + '".';
    }
    return code;
  }

  var setupBranch = Blockly.Arduino.statementToCode(block, 'SETUP_FUNC');
  //var setupCode = Blockly.Arduino.scrub_(block, setupBranch); No comment block
  if (setupBranch) {
    Blockly.Arduino.addSetup('userSetupCode', setupBranch, true);
  }

  var loopBranch = statementToCodeNoTab(block, 'LOOP_FUNC');
  //var loopcode = Blockly.Arduino.scrub_(block, loopBranch); No comment block
  return loopBranch;
};

/**
 * Code generator to create effect statement.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['controls_effect'] = function(block) {
  
  var funcName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  
  var duration = Blockly.Arduino.valueToCode(
      block, 'EFFECTDURATION', Blockly.Arduino.ORDER_ATOMIC) || '1000';
  var effectnr = 0;
  while (Blockly.Arduino.hasDeclaration('ard_effect' + effectnr.toString())) {
    effectnr += 1;
  }
  var seffectnr = effectnr.toString();
  
  var declare_effect_branch = '' +
'int ard_effect' + seffectnr + '_status = -1;\n' +
'unsigned long ard_effect' + seffectnr + '_start, ard_effect' + seffectnr + '_time;\n' +
'#define EFFECT' + seffectnr + '_PERIOD ' + duration + '\n';
  var declare_effect_function = '\n' + 
'void ' + funcName + '() {\n' +
'  //Variables of this effect are reffered to with ard_effect' + seffectnr + '\n' +
'  boolean restart = false;\n' +
'  ard_effect' + seffectnr + '_time = millis() - ard_effect' + seffectnr + '_start;\n';

  declare_effect_function +=
'  if (ard_effect' + seffectnr + '_time > EFFECT' + seffectnr + '_PERIOD) {\n' +
'    //end effect, make sure it restarts\n' +
'    if (ard_effect' + seffectnr + '_status > -1) {\n';
  
  if (block.elseCount_) {
    branch = Blockly.Arduino.statementToCode(block, 'ELSE');
    declare_effect_function += '' +
'    //END STATEMENTS\n' +
'    ' + branch;
  }
  
  declare_effect_function += 
'    }\n' +
'    restart = true;\n' +
'    ard_effect' + seffectnr + '_status = -1;\n' +
'    ard_effect' + seffectnr + '_start = ard_effect' + seffectnr + '_start + ard_effect' + seffectnr + '_time;\n' +
'    ard_effect' + seffectnr + '_time = 0;\n' +
'  }\n' + 
'  if (not restart && ard_effect' + seffectnr + '_status == -1) {\n' +
'    ard_effect' + seffectnr + '_status = 0;\n' +
'    ard_effect' + seffectnr + '_start = ard_effect' + seffectnr + '_start + ard_effect' + seffectnr + '_time;\n' +
'    ard_effect' + seffectnr + '_time = 0;\n';


  var setupCode = 'ard_effect' + seffectnr + '_status = -1;\n' +
                '  ard_effect' + seffectnr + '_start = millis();\n'
  Blockly.Arduino.addSetup('ard_effect' + seffectnr, setupCode, false);
    
  var n = 0;
  var branch = Blockly.Arduino.statementToCode(block, 'DO' + n);
  declare_effect_function += branch + '  }\n';
  var extra = '  '
  for (n = 1; n <= block.elseifCount_; n++) {
    duration = Blockly.Arduino.valueToCode(block, 'IF' + n,
        Blockly.Arduino.ORDER_NONE) || duration;
    branch = Blockly.Arduino.statementToCode(block, 'DO' + n);
    declare_effect_branch += '#define EFFECT' + seffectnr + '_' + n + '_DURATION ' + duration + '\n';
    if (n != 1) {
      extra = '  } else ';
    }
    declare_effect_function += extra + 
'if (ard_effect' + seffectnr + '_time > EFFECT' + seffectnr + '_' + n + '_DURATION && ard_effect' + seffectnr + '_status < ' + n + ') {\n' +
'   ard_effect' + seffectnr + '_status = ' + n + ';\n' + branch;
  }
  
  //end reached of effect statements, finish up
  if (n != 1) {
    declare_effect_function += '  }\n'
  }
  declare_effect_function += '}\n';
    
  var code = Blockly.Arduino.scrub_(block, declare_effect_branch + declare_effect_function);
  Blockly.Arduino.userFunctions_[funcName] = code;
  return '';
};

/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
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
 * @fileoverview Helper functions for generating Arduino for blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

goog.provide('Blockly.Arduino');

goog.require('Blockly.Generator');

Blockly.Arduino = new Blockly.Generator('Arduino');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * Arduino specific keywords defined in: http://arduino.cc/en/Reference/HomePage
 * @private
 */
Blockly.Arduino.addReservedWords(
    'Blockly,' +  // In case JS is evaled in the current window.
    'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,interger, constants,floating,point,void,bookean,char,unsigned,byte,int,word,long,float,double,string,String,array,static, volatile,const,sizeof,pinMode,digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts');


/**
 * Order of operation ENUMs.
 * 
 */
Blockly.Arduino.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.Arduino.ORDER_UNARY_POSTFIX = 1;  // expr++ expr-- () [] .
Blockly.Arduino.ORDER_UNARY_PREFIX = 2;   // -expr !expr ~expr ++expr --expr
Blockly.Arduino.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.Arduino.ORDER_ADDITIVE = 4;       // + -
Blockly.Arduino.ORDER_SHIFT = 5;          // << >>
Blockly.Arduino.ORDER_RELATIONAL = 6;     // is is! >= > <= <
Blockly.Arduino.ORDER_EQUALITY = 7;       // == != === !==
Blockly.Arduino.ORDER_BITWISE_AND = 8;    // &
Blockly.Arduino.ORDER_BITWISE_XOR = 9;    // ^
Blockly.Arduino.ORDER_BITWISE_OR = 10;    // |
Blockly.Arduino.ORDER_LOGICAL_AND = 11;   // &&
Blockly.Arduino.ORDER_LOGICAL_OR = 12;    // ||
Blockly.Arduino.ORDER_CONDITIONAL = 13;   // expr ? expr : expr
Blockly.Arduino.ORDER_ASSIGNMENT = 14;    // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.Arduino.ORDER_NONE = 99;          // (...)

/**
 * Arduino Board profiles
 */
var profile = {
  arduino: {
    description: "Arduino Uno standard-compatible board",
    digital : [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
    analog : [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
    pwm : [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
    interrupt: [["Int_1", "1"], ["Int_2", "2"], ["Int_3", "3"], ["Int_4", "4"], ["Int_5", "5"]],
    serial : [["300", "300"], ["600", "600"], ["1200", "1200"], ["2400", "2400"], ["4800", "4800"], ["9600", "9600"], ["14400", "14400"], ["19200", "19200"], ["28800", "28800"], ["31250", "31250"], ["38400", "38400"],["57600", "57600"], ["115200", "115200"]],
    builtin_led: [["BUILTIN_1", "13"]],
    pin_types: { INPUT: "INPUT", OUTPUT: "OUTPUT", PWM: "PWM" },
    types : [["void", "void"], ["Boolean", "boolean"], ["Character", "char"], ["Unsigned Character", "unsigned char"], ["Byte", "byte"], ["Integer", "int"], ["Unsigned Integer", "unsigned int"], ["Word", "word"], ["Long", "long"], ["Unsigned Long", "unsigned long"], ["Short", "short"], ["Float", "float"], ["Double", "double"], ["String", "String"], ["Char Array", "string"], ["Array", "array"]]
  },
  arduino_mega:{
    description: "Arduino Mega-compatible board"
    //53 digital
    //15 analog
    //6 interrupts
    //same serial
    //same types
  },
  arduino_leonardo:{
    description: "Arduino Leonardo-compatible board"
    //18 digital
    //6 analog
    //5 interrupts
    //same serial
    //same types
  }
}

// Set default profile to arduino standard-compatible board
profile["default"] = profile["arduino"];

/**
 * Initialise the database of variable names.
 */
Blockly.Arduino.init = function() {
  // Create a dictionary of definitions to be printed before setups.
  Blockly.Arduino.definitions_ = Object.create(null);
  // Create a dictionary of setups to be printed before the code.
  Blockly.Arduino.setups_ = Object.create(null);
  // Create a dictionary of pins to check if their use conflict
  Blockly.Arduino.pins_ = Object.create(null);

  if (Blockly.Variables) {
    if (!Blockly.Arduino.variableDB_) {
      Blockly.Arduino.variableDB_ = new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_);
    } else {
      Blockly.Arduino.variableDB_.reset();
    }

    // Iterate through the blocks to capture variables with first value
    var variableWithType = Object.create(null);
    var blocks = Blockly.mainWorkspace.getAllBlocks();
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getVars;
      if (func) {
        var blockVariables = func.call(blocks[x]);
        for (var y = 0; y < blockVariables.length; y++) {
          // Check if it's the first instance of the new variable name
          var unique = true;
          for (var name in variableWithType) {
            if (name == blockVariables[y]) {
              unique = false;
              break;
            }
          }
          // If it is the first instance log the variable type
          if (unique == true) {
            variableWithType[blockVariables[y]] = Blockly.Arduino.evaluateType(
            Blockly.Arduino.valueToCode(blocks[x], 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT));
          }
        }
      }
    }

    // Set variable declarations
    var variableDeclarations = [];  
    for (var name in variableWithType) {
      variableDeclarations.push(variableWithType[name] + ' ' + name + ';');
    }
    Blockly.Arduino.definitions_['variables'] = variableDeclarations.join('\n') + '\n';
  }
};

/**
 * Evaluates the type of the data contained in the input string and returns
 * a string containing the C++ type.
 * @param {string} inputString string containing the input value to evaluate
 * @return {string} A String containing the C++ type
 */
Blockly.Arduino.regExpInt = new RegExp(/^\d+$/);
Blockly.Arduino.regExpFloat = new RegExp(/^[0-9]*[.][0-9]+$/);
Blockly.Arduino.evaluateType = function(inputString) {
  var firstCharacter = inputString.charAt(0);
  if (firstCharacter == '"') {
    return 'String';
  }
  else if (firstCharacter == "'") {
    return 'char';
  }
  else if (!inputString || !inputString.length) {
    return 'defineme';
  }
  else if (Blockly.Arduino.regExpInt.test(firstCharacter)) {
    if( Blockly.Arduino.regExpInt.test(inputString)) {
      return 'int';
    } else if ( Blockly.Arduino.regExpFloat.test(inputString)) {
      return 'float';
    }
    return 'dontknowInt';
  }

  // For now the default is integer, will have to figure out how to 
  // evaluate other blocks as inputs
  return 'integer';
}

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Arduino.finish = function(code) {
  // Indent every line.
  code = '  ' + code.replace(/\n/g, '\n  ');
  code = code.replace(/\n\s+$/, '\n');
  code = 'void loop() {\n' + code + '\n}';

  // Convert the definitions dictionary into a list.
  var imports = [];
  var definitions = [];
  for (var name in Blockly.Arduino.definitions_) {
    var def = Blockly.Arduino.definitions_[name];
    if (def.match(/^#include/)) {
      imports.push(def);
    } else {
      definitions.push(def);
    }
  }

  // Convert the setups dictionary into a list.
  var setups = [];
  for (var name in Blockly.Arduino.setups_) {
    setups.push(Blockly.Arduino.setups_[name]);
  }

  var allDefs = imports.join('\n') + definitions.join('\n') +
      '\nvoid setup() {\n  '+ setups.join('\n  ') + '\n}';
  return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n') + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Arduino.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped Arduino string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Arduino string.
 * @private
 */
Blockly.Arduino.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/\$/g, '\\$')
                 .replace(/'/g, '\\\'');
  return '\"' + string + '\"';
};

/**
 * Common tasks for generating Arduino from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Arduino code created for this block.
 * @return {string} Arduino code with comments and subsequent blocks added.
 * @this {Blockly.CodeGenerator}
 * @private
 */
Blockly.Arduino.scrub_ = function(block, code) {
  if (code === null) {
    // Block has handled code generation itself.
    return '';
  }
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += this.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = this.allNestedComments(childBlock);
          if (comment) {
            commentCode += this.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = this.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

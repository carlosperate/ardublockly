/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for Arduino Digital and Analogue input/output.
 *     Arduino built in function docs: http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Arduino.IO');

goog.require('Blockly.Arduino');


/**
 * Function for 'set pin' (X) to a state (Y).
 * Arduino code: setup { pinMode(X, OUTPUT); }
 *               loop  { digitalWrite(X, Y); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['io_digitalwrite'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var stateOutput = Blockly.Arduino.valueToCode(
      block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) || 'LOW';

  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');

  var pinSetupCode = 'pinMode(' + pin + ', OUTPUT);';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'digitalWrite(' + pin + ', ' + stateOutput + ');\n';
  return code;
};

/**
 * Function for reading a digital pin (X).
 * Arduino code: setup { pinMode(X, INPUT); }
 *               loop  { digitalRead(X)     }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['io_digitalread'] = function(block) {
  var pin = block.getFieldValue('PIN');
  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.INPUT, 'Digital Read');

  var pinSetupCode = 'pinMode(' + pin + ', INPUT);';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'digitalRead(' + pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Function for reading a digital pin (X) using built-in resistor.
 * Arduino code: setup { pinMode(X, INPUT_PULLUP); }
 *               loop  { digitalRead(X)     }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['io_digitalread_pullup'] = function(block) {
  var pin = block.getFieldValue('PIN');
  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.INPUT, 'Digital Read');

  var pinSetupCode = 'pinMode(' + pin + ', INPUT_PULLUP);';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'digitalRead(' + pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Function for setting the state (Y) of a built-in LED (X).
 * Arduino code: setup { pinMode(X, OUTPUT); }
 *               loop  { digitalWrite(X, Y); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['io_builtin_led'] = function(block) {
  var pin = block.getFieldValue('BUILT_IN_LED');
  var stateOutput = Blockly.Arduino.valueToCode(
      block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) || 'LOW';

  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Set LED');

  var pinSetupCode = 'pinMode(' + pin + ', OUTPUT);';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'digitalWrite(' + pin + ', ' + stateOutput + ');\n';
  return code;
};

/**
 * Function for setting the state (Y) of an analogue output (X).
 * Arduino code: setup { pinMode(X, OUTPUT); }
 *               loop  { analogWrite(X, Y);  }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['io_analogwrite'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var stateOutput = Blockly.Arduino.valueToCode(
      block, 'NUM', Blockly.Arduino.ORDER_ATOMIC) || '0';

  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Analogue Write');

  var pinSetupCode = 'pinMode(' + pin + ', OUTPUT);';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  // Warn if the input value is out of range
  if ((stateOutput < 0) || (stateOutput > 255)) {
    block.setWarningText('The analogue value set must be between 0 and 255',
                         'pwm_value');
  } else {
    block.setWarningText(null, 'pwm_value');
  }

  var code = 'analogWrite(' + pin + ', ' + stateOutput + ');\n';
  return code;
};

/**
 * Function for reading an analogue pin value (X).
 * Arduino code: setup { pinMode(X, INPUT); }
 *               loop  { analogRead(X)      }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['io_analogread'] = function(block) {
  var pin = block.getFieldValue('PIN');
  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.INPUT, 'Analogue Read');

  var pinSetupCode = 'pinMode(' + pin + ', INPUT);';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'analogRead(' + pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Value for defining a digital pin state.
 * Arduino code: loop { HIGH / LOW }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['io_highlow'] = function(block) {
  var code = block.getFieldValue('STATE');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['io_pulsein'] = function(block) {
  var pin = block.getFieldValue("PULSEPIN");
  var type = Blockly.Arduino.valueToCode(block, "PULSETYPE", Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.INPUT, 'Pulse Pin');

  var pinSetupCode = 'pinMode(' + pin + ', INPUT);\n';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'pulseIn(' + pin + ', ' + type + ')';

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['io_pulsetimeout'] = function(block) {
  var pin = block.getFieldValue("PULSEPIN");
  var type = Blockly.Arduino.valueToCode(block, "PULSETYPE", Blockly.Arduino.ORDER_ATOMIC);
  var timeout = Blockly.Arduino.valueToCode(block, "TIMEOUT", Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.INPUT, 'Pulse Pin');

  var pinSetupCode = 'pinMode(' + pin + ', INPUT);\n';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'pulseIn(' + pin + ', ' + type + ', ' + timeout + ')';

  return [code, Blockly.Arduino.ORDER_ATOMIC];
}; 

/**
 * Code generator to setup 4 x 4 Membrane Key Pad with 4 Row pins (A,B,C,D) and 4 Column pins (W,X,Y,Z)
 * Arduino code: 
 * #include <Keypad.h>
 * const byte ROWS = 4; //four rows
 * const byte COLS = 4; //four columns
 * char hexaKeys[ROWS][COLS] = {{'1','2','3','A'},{'4','5','6','B'},{'7','8','9','C'},{'*','0','#','D'}};
 * byte rowPins[ROWS] = {D, C, B, A};
 * byte colPins[COLS] = {Z, Y, X, W};
 * Keypad mkpad_A = Keypad( makeKeymap(hexaKeys), rowPins, colPins, ROWS, COLS); 
 * 
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mkpad_setup'] = function(block) {
  var a = block.getFieldValue('ROW1');
  var b = block.getFieldValue('ROW2');
  var c = block.getFieldValue('ROW3');
  var d = block.getFieldValue('ROW4');
  var w = block.getFieldValue('COL1');
  var x = block.getFieldValue('COL2');
  var y = block.getFieldValue('COL3');
  var z = block.getFieldValue('COL4');
  var mkpadName = 'mkpad_' + a;

  Blockly.Arduino.addInclude('mkpad', '#include <Keypad.h>');
  Blockly.Arduino.addDeclaration('mkpad_', 'const byte ROWS = 4;\nconst byte COLS = 4;\nchar hexaKeys[ROWS][COLS] = {{\'1\',\'2\',\'3\',\'A\'},{\'4\',\'5\',\'6\',\'B\'},{\'7\',\'8\',\'9\',\'C\'},{\'*\',\'0\',\'#\',\'D\'}};\nbyte rowPins[ROWS] = {' + d + ', ' + c + ', ' + b + ', ' + a + '};\nbyte colPins[COLS] = {' + z + ', ' + y + ', ' + x + ', ' + w + '};\n' + 'Keypad ' + mkpadName + ' = Keypad(makeKeymap(hexaKeys),rowPins,ColPins,ROWS,COLS);\n');
  return '';
};


/**
 * Code generator to setup 4 x 4 Membrane Key Pad with 4 Row pins (A,B,C,D) and 4 Column pins (W,X,Y,Z)
 * Arduino code: 
 * #include <Keypad.h>
 * const byte ROWS = 4; //four rows
 * const byte COLS = 4; //four columns
 * char hexaKeys[ROWS][COLS] = {{'1','2','3','A'},{'4','5','6','B'},{'7','8','9','C'},{'*','0','#','D'}};
 * byte rowPins[ROWS] = {D, C, B, A};
 * byte colPins[COLS] = {Z, Y, X, W};
 * Keypad mkpad_A = Keypad( makeKeymap(hexaKeys), rowPins, colPins, ROWS, COLS); 
 * 
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mkpad_getkey'] = function(block) {
  var b = block.getFieldValue('ROW1');
  var mkpadName = 'mkpad_' + b;

  var code = mkpadName + '.getKey()';
  return code;
};

/**
 * Code generator to setup IR receiver module KY-022 with pin (X).
 * Arduino code: #include <IRremote.h>
 *               int receiver = X;
 *               IRrecv irrecv_X(X)
 *		 decode_results results;
 *		 void translateIR(){....}
 *		 void setup{irrecv_X.enableIRIn();}
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['irrecv_setup'] = function(block) {
  var pinKey = block.getFieldValue('PIN');
  var irrecvName = 'irrecv_' + pinKey;

  Blockly.Arduino.addInclude('irrecv_i', '#include <IRremote.h>');
  Blockly.Arduino.addDeclaration('irrecv_d1', 'IRrecv '+irrecvName+'('+pinKey+');\n');
  Blockly.Arduino.addDeclaration('irrecv_d2', 'decode_results results;\nint btn;\n');
  Blockly.Arduino.addDeclaration('irrecv_d3', 'void translateIR() {\n  switch(results.value)\n  {\n  case 0xFF6897: btn=0; break;\n  case 0xFF30CF: btn=1; break;\n  case 0xFF18E7: btn=2; break;\n  case 0xFF7A85: btn=3; break;\n  case 0xFF10EF: btn=4; break;\n  case 0xFF38C7: btn=5; break;\n  case 0xFF5AA5: btn=6; break;\n  case 0xFF42BD: btn=7; break;\n  case 0xFF4AB5: btn=8; break;\n  case 0xFF52AD: btn=9; break;\n  case 0xFFA25D: btn=10; break;\n  case 0xFF629D: btn=11; break;\n  case 0xFFE21D: btn=12; break;\n  case 0xFF22DD: btn=13; break;\n  case 0xFF02FD: btn=14; break;\n  case 0xFFC23D: btn=15; break;\n  case 0xFFE01F: btn=16; break;\n  case 0xFFA857: btn=17; break;\n  case 0xFF906F: btn=18; break;\n  case 0xFF9867: btn=19; break;\n  case 0xFFB04F: btn=20; break;\n  case 0xFFFFFFFF: btn=21; break;\n  default: btn=22;\n  }\n  delay(200);\n}\n');
  Blockly.Arduino.addSetup('irrecv_s', irrecvName+'.enableIRIn();\n');
  return '';
};

/**
 * Code generator to read IR receiver module KY-022 from pin (X) to value item.
 *	
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['irrecv_read'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var irrecvName = 'irrecv_' + pin;

  Blockly.Arduino.addDeclaration('irrecv_d4', 'int btnVal() {\n    if ('+irrecvName+'.decode(&results)) {\n      translateIR();\n      '+irrecvName+'.resume();\n      return btn;\n    }\n}\n');

  var code = 'btnVal()';
  return code;
};

/**
 * Code generator to setup RFID RC522 with RST Pin and SS Pin
 *	
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['rc522_setup'] = function(block) {
  var rst = block.getFieldValue('RST');
  var ss = block.getFieldValue('SS');
  Blockly.Arduino.addInclude('rc522_i', '#include <SPI.h>\n#include <MFRC522.h>');
  Blockly.Arduino.addDeclaration('rc522_d', '#define RST_PIN '+rst+'\n#define SS_PIN '+ss+'\nMFRC522 mfrc522(SS_PIN, RST_PIN);');
  Blockly.Arduino.addSetup('rc522_s', 'SPI.begin();\nmfrc522.PCD_Init();\nmfrc522.PCD_SetAntennaGain(mfrc522.RxGain_max);'); 
  var code = '';
  return code;
};

/**
 * Code generator to read UID from a card or dongle using RFID RC522 scanner
 *	
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['rc522_getuid'] = function(block) {
  var uidin = Blockly.Arduino.valueToCode(block, 'VAR', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.addVariable('rc522_v', 'String '+uidin+';\n');
  var code = 'if ( ! mfrc522.PICC_IsNewCardPresent())\n{\n  return;\n}\nif ( ! mfrc522.PICC_ReadCardSerial())\n{\n  return;\n}\nString content= \"\";\n  byte letter;\n  for (byte i = 0; i < mfrc522.uid.size; i++)\n{\n  content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? \" 0\" : \" \"));\n  content.concat(String(mfrc522.uid.uidByte[i], HEX));\n}\ncontent.toUpperCase();\n'+uidin+' = content.substring(1);\n';
  return code;
};

/**
 * Code generator to setup RFID RC522 with RST Pin and SS Pin
 *	
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['rc522_adduid'] = function(block) {
  var uidout = Blockly.Arduino.valueToCode(block, 'VAR', Blockly.Arduino.ORDER_ATOMIC);
  var nuid = Blockly.Arduino.valueToCode(block, 'NUID', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.addVariable('rc522_v2', 'String '+uidout+';\n');
  var code = uidout+' = '+nuid+';\n';
  return code;
};

Blockly.Arduino['io_shiftout'] = function(block) {
  var data = block.getFieldValue("DATA");
  var clk = block.getFieldValue("CLK");
  var order = block.getFieldValue("BO");
  var type = Blockly.Arduino.valueToCode(block, "BVAL", Blockly.Arduino.ORDER_ATOMIC);
  var code = 'shiftOut('+data+', '+clk+', '+order+', '+type+');\n';
  return code;
}; 

Blockly.Arduino['io_bitset'] = function(block) {
  var x = Blockly.Arduino.valueToCode(block, "XVAL", Blockly.Arduino.ORDER_ATOMIC);
  var n = Blockly.Arduino.valueToCode(block, "NVAL", Blockly.Arduino.ORDER_ATOMIC);
  var code = 'bitSet('+x+', '+n+');\n';
  return code;
};

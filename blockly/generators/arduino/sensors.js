/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Arduino code for the Sensor blocks.
 *
 * 
 *      
 */
'use strict';

goog.provide('Blockly.Arduino.sensors');

goog.require('Blockly.Arduino');

/**
 * Code generator to set an trigger pin (Y) and an echo pin (X).
 * Arduino code: #include <SR04.h>
 *               SR04 mySR04X;
 *               setup { mySR04X(X,Y); }
 *               loop  { mySR04X.Distance();  }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['sr04_setup'] = function(block) {
  var epinKey = block.getFieldValue('ECHO_PIN');
  var tpinKey = block.getFieldValue('TRIG_PIN');
  var sr04Name = 'sr04_' + epinKey;

  Blockly.Arduino.addInclude('sr04', '#include <SR04.h>');
  Blockly.Arduino.addDeclaration('sr04_', 'SR04 ' + sr04Name+'('+epinKey+','+tpinKey+');\n');
  return '';
};

/**
 * Code generator to read an angle value from a servo pin (X).
 * Arduino code: #include <SR04.h>
 *               SR04 sr04_X;
 *               loop  { sr04_X.Distance();    }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['sr04_read'] = function(block) {
  var epinKey = block.getFieldValue('ECHO_PIN');
  var sr04Name = 'sr04_' + epinKey;

  Blockly.Arduino.reservePin(block, pinKey, Blockly.Arduino.PinTypes.SENSOR, 'HC-SR04 Read');

  var code = sr04Name + '.Distance()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator to setup temperature from DHT11 Temp & Humidity Sensor on Pin X
 * Arduino code: #include <dht_nonblocking.h>
 *               #define DHT_SENSOR_TYPE DHT_TYPE_11
 *               static const int DHT_SENSOR_PIN = X
 *		 DHT_nonblocking dht_sensor_X( DHT_SENSOR_PIN, DHT_SENSOR_TYPE );
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['dht11_setup'] = function(block) {
  var pinKey = block.getFieldValue('PIN');
  var dht11Name = 'dht11_' + pinKey;

  Blockly.Arduino.addInclude('dht11_i', '#include <DHT.h>');
  Blockly.Arduino.addDeclaration('dht11_d', '#define DHTPIN '+pinKey + '\n#define DHTTYPE DHT11\n'+'DHT '+dht11Name+'(DHTPIN,DHTTYPE);\n');
  Blockly.Arduino.addSetup('dht11_s', dht11Name+'.begin();\n');
  return '';
};

/**
 * Code generator to read temperature from DHT11 Temp & Humidity Sensor
 *	
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['dht11_readt'] = function(block) {
  var din = block.getFieldValue('DIN');
  var lcName = 'dht11_' + din;

  var code = lcName +'.readTemperature();\n';
  return code;
};

/**
 * Code generator to read humidity from DHT11 Temp & Humidity Sensor
 *	
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['dht11_readh'] = function(block) {
  var din = block.getFieldValue('DIN');
  var lcName = 'dht11_' + din;

  var code = lcName +'.readHumidity();\n';
  return code;
};

/**
 * Code generator to setup gyroscope sensor GY-521 on A4 and A5
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['gy521_setup'] = function(block) {
  Blockly.Arduino.addInclude('gy521_i', '#include<Wire.h>\n#include<MPU6050_light.h>');
  Blockly.Arduino.addDeclaration('gy521_d', 'MPU6050 mpu(Wire);\nfloat rx, ry, rz, t;\n');
  Blockly.Arduino.addSetup('gy521_s', 'Wire.begin();\n  byte status = mpu.begin();\n  mpu.calcOffsets();\n');

  var code = '';
  return code;
};

/**
 * Code generator to setup gyroscope sensor GY-521 on A4 and A5
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['gy521_rot'] = function(block) {
  var rotX = Blockly.Arduino.valueToCode(block, 'ROTX', Blockly.Arduino.ORDER_ATOMIC);
  var rotY = Blockly.Arduino.valueToCode(block, 'ROTY', Blockly.Arduino.ORDER_ATOMIC);
  var rotZ = Blockly.Arduino.valueToCode(block, 'ROTZ', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.addVariable('rot_d', 'float '+rotX+';\nfloat '+rotY+';\nfloat '+rotZ+';\n');
  var code = 'mpu.update();\nrx = mpu.getAngleX();\nry = mpu.getAngleY();\nrz = mpu.getAngleZ();\n'+rotX+' = rx;\n'+rotY+' = ry;\n'+rotZ+' = rz;\ndelay(10);\n';
  return code;
};

/**
 * Code generator to setup gyroscope sensor GY-521 on A4 and A5
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['gy521_t'] = function(block) {
  var tmp = Blockly.Arduino.valueToCode(block, 'T', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.addVariable('t_d', 'float '+tmp+';\n');
  var code = 'mpu.update();\nt = mpu.getTemp();\ndelay(10);\n'+tmp+' = t;\n';
  return code;
};


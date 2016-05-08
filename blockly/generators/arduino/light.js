/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Microduino code for procedure (function) blocks.
 *
 */
'use strict';

goog.provide('Blockly.Arduino.light');

goog.require('Blockly.Arduino');


function hexToRgb(hex) {
  if (hex.lastIndexOf('rgb', 0) === 0) {
    var rgb = hex.substring(4, hex.length-1)
         .replace(/ /g, '')
         .split(',');
    return {r: parseInt(rgb[0], 10),
            g: parseInt(rgb[1], 10),
            b: parseInt(rgb[2], 10),
           }
  } else {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {
        r: 0,
        g: 0,
        b: 0
    };
  }
}


/**
 * The button setup block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['led_config_hub'] = function(block) {
  var LEDName = block.getFieldValue('LEDNAME');
  var polarity = block.getFieldValue('POLARITY');
  var LEDon = 'HIGH';
  if (polarity == 'neg') {
    LEDon = 'LOW';
  }
  //the hub saved the connector in the attached block
  var hubconnector = block['connector'] || ['0', '1']
  //compute the pins, normally only possible to attach at valid pins
  var pintop = hubconnector[0];

  Blockly.Arduino.reservePin(
      block, pintop, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');

  //LEDName is a variable containing the used pins
  Blockly.Arduino.addVariable(LEDName,
      'int ' + LEDName + ' = ' + pintop + 
      ';\nboolean ' + LEDName + '_ON = ' + LEDon + ';', true);
  
  var pinSetupCode = 'pinMode(' + LEDName + ', OUTPUT);';
  Blockly.Arduino.addSetup('io_' + pintop, pinSetupCode, false);

  return '';
};

/**
 * Function for writing a LED.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['led_digitalwrite'] = function(block) {
  var LEDName = block.getFieldValue('LEDNAME');
  var stateOutput = Blockly.Arduino.valueToCode(
      block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) || 'LOW';
  
  var code = 'digitalWrite(' + LEDName + ', ' + stateOutput + ');\n';
  return code;
};


/**
 * Function for writing a LED.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['led_digitalwrite_onoff'] = function(block) {
  var LEDName = block.getFieldValue('LEDNAME');
  var stateOutput = block.getFieldValue('STATE');
  var stateval = LEDName + '_ON';
  if (stateOutput == 'off') {
    stateval = '! (' + stateval + ')';
  }
  
  var code = 'digitalWrite(' + LEDName + ', ' + stateval + ');\n';
  return code;
};

/**
 * The neopixel setup block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['neopixel_config_hub'] = function(block) {
  var NeoPixelName = block.getFieldValue('LEDNAME');
  var number = Blockly.Arduino.valueToCode(
      block, 'NUMBER', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var KHz = block.getFieldValue('KHZ');
  var NeoType = block.getFieldValue('NEOPIXEL_TYPE');
  
  //the hub saved the connector in the attached block
  var hubconnector = block['connector'] || ['0', '1']
  //compute the pins, normally only possible to attach at valid pins
  var pintop = hubconnector[0];

  Blockly.Arduino.reservePin(
      block, pintop, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');

  //NeoPixelName is a variable containing the used pins
  Blockly.Arduino.addVariable(NeoPixelName,
      'int ' + NeoPixelName + ' = ' + pintop + ';', true);
  
  var NeoName = 'myNeo_' + NeoPixelName;
  
  var decl_code = '#include <Adafruit_NeoPixel.h>\n' +
        'Adafruit_NeoPixel ' + NeoName + ' = Adafruit_NeoPixel(' + number +
        ', ' +pintop + ', ' + NeoType + ' + ' + KHz + ');';
        
  Blockly.Arduino.addDeclaration(NeoName, decl_code);
  
  var setupCode = NeoName + '.begin();\n' +
                  '  ' + NeoName + '.show();';
  Blockly.Arduino.addSetup('io_' + pintop, setupCode, false);
  
  return '';

};

/**
 * Function for writing to a neopixel strip.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['neopixel_write'] = function(block) {
  var LEDName = block.getFieldValue('NEONAME');
  var LEDPixel = Blockly.Arduino.valueToCode(
      block, 'LEDPIXEL', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var Red = Blockly.Arduino.valueToCode(
      block, 'RED', Blockly.Arduino.ORDER_ATOMIC) || '255';
  var Green = Blockly.Arduino.valueToCode(
      block, 'GREEN', Blockly.Arduino.ORDER_ATOMIC) || '255';
  var Blue = Blockly.Arduino.valueToCode(
      block, 'BLUE', Blockly.Arduino.ORDER_ATOMIC) || '255';

  var code = 'myNeo_' + LEDName + '.setPixelColor(' + LEDPixel + '-1, myNeo_' + LEDName + '.Color(' + Red + ',' + Green + ',' + Blue + '));\n';
  code += 'myNeo_' + LEDName + '.show();\n';

  return code;
};

/**
 * Function for writing to a neopixel strip.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['neopixel_colourpick_write'] = function(block) {
  var LEDName = block.getFieldValue('NEONAME');
  var LEDPixel = Blockly.Arduino.valueToCode(
      block, 'LEDPIXEL', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var Colour = block.getFieldValue('COLOUR');
  //Colour = Colour.substring(4, Colour.length-1)
  //               .replace(/ /g, '')
  //               .split(',');
  Colour = hexToRgb(Colour);
  var Red = Colour.r;
  var Green = Colour.g;
  var Blue = Colour.b;

  var code = 'myNeo_' + LEDName + '.setPixelColor(' + LEDPixel + '-1, myNeo_' + LEDName + '.Color(' + Red + ',' + Green + ',' + Blue + '));\n';
  code += 'myNeo_' + LEDName + '.show();\n';

  return code;
};

/**
 * Function for writing to a neopixel strip.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['neopixel_colourpick_dim_write'] = function(block) {
  var LEDName = block.getFieldValue('NEONAME');
  var LEDPixel = Blockly.Arduino.valueToCode(
      block, 'LEDPIXEL', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var Brightness = Blockly.Arduino.valueToCode(
      block, 'BRIGHTNESS', Blockly.Arduino.ORDER_ATOMIC) || '100';
  
  var Colour = block.getFieldValue('COLOUR');
  //Colour = Colour.substring(4, Colour.length-1)
  //               .replace(/ /g, '')
  //               .split(',');
  Colour = hexToRgb(Colour);
  var Red = Colour.r;
  var Green = Colour.g;
  var Blue = Colour.b;

  var code = 'myNeo_' + LEDName + '.setPixelColor(' + LEDPixel + '-1, myNeo_' + LEDName + '.Color(constrain(int(' + Red   + '*'+Brightness+'/100.0),0,255), ' + 
                   'constrain(int(' + Green + '*'+Brightness+'/100.0),0,255), ' + 
                   'constrain(int(' + Blue  + '*'+Brightness+'/100.0),0,255) ));\n';
  code += 'myNeo_' + LEDName + '.show();\n';

  return code;
};

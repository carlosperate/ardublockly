/*
@metadata
		author": senseBox
		lastupdated": 2018
		for more information: www.sensebox.de
*/

'use strict';

goog.provide('Blockly.Arduino.sensebox');

goog.require('Blockly.Arduino');

var filename;

/*
----------------------------------Sensoren--------------------------------------------------
*/
Blockly.Arduino.sensebox_sensor_pressure = function() {
Blockly.Arduino.definitions_['define_senseBox'] = '#include "SenseBoxMCU.h"\n';
Blockly.Arduino.definitions_['define_pressure'] = 'BMP280 bmp_sensor;';
Blockly.Arduino.setups_['sensebox_bmp_sensor'] = 'bmp_sensor.begin();';
  var code ='bmp_sensor.getPressure()';
  return [code ,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_temp_hum = function(){
  var dropdown_name = this.getFieldValue('NAME');
  Blockly.Arduino.definitions_['define_senseBox'] = '#include "SenseBoxMCU.h"\n';
  Blockly.Arduino.definitions_['define_hdc'] = 'HDC1080 hdc;';
  Blockly.Arduino.setups_['sensebox_sensor_temp_hum'] = 'hdc.begin();\n';
  var code = 'hdc.get'+dropdown_name+'()';
  return [code ,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_uv_light = function(){
  var dropdown_name = this.getFieldValue('NAME');
  Blockly.Arduino.definitions_['define_senseBox'] = '#include "SenseBoxMCU.h"\n';
  if (dropdown_name == 'UvIntensity'){
    Blockly.Arduino.definitions_['define_veml'] = 'VEML6070 veml;'
    Blockly.Arduino.setups_['sensebox_sensor_uv_light'] = 'veml.begin();\n'
    var code = 'veml.get'+dropdown_name+'()';
  }
  if (dropdown_name == 'Illuminance'){  
    Blockly.Arduino.definitions_['define_tsl'] = 'TSL45315 tsl;'
    Blockly.Arduino.setups_['sensebox_sensor_illuminance'] = 'tsl.begin();\n'
    var code = 'tsl.get'+dropdown_name+'()';
  }
  return [code ,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_bmx055 = function(){
  var dropdown_name = this.getFieldValue('NAME');
  Blockly.Arduino.definitions_['define_senseBox'] = '#include "SenseBoxMCU.h"\n';
  Blockly.Arduino.definitions_['define_hdc'] = 'HDC100X hdc;';
  Blockly.Arduino.setups_['sensebox_sensor_bmx055'] = 'hdc.begin();\n';
  var code = 'hdc.get'+dropdown_name+'()';
  return [code ,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_sds011 = function(){
  var dropdown_name = this.getFieldValue('NAME');
  var serial_name = this.getFieldValue('SERIAL');
  Blockly.Arduino.definitions_['define_senseBox'] = '#include "SenseBoxMCU.h"\n';
  Blockly.Arduino.definitions_['define_sds011'] = 'SDS011 my_sds('+serial_name+');\n float p10,p25;\n int error;';
  Blockly.Arduino.setups_['sensebox_sensor_sds011'] = serial_name+'.begin();\n';
  var code = serial_name+'.get'+dropdown_name+'()';
  return [code ,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_ultrasonic_ranger = function() {
  var dropdown_pin_RX = this.getFieldValue('PIN_RX');
  var dropdown_pin_TX = this.getFieldValue('PIN_TX')
  Blockly.Arduino.definitions_['define_senseBox'] = '#include "SenseBoxMCU.h"\n';
  Blockly.Arduino.definitions_['var_ultrasonic'+dropdown_pin_RX] = 'HCSR04 HCSR04 ('+dropdown_pin_RX+','+dropdown_pin_TX+')';
  var code;
  code = 'HCSR04.getDistance()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_sound = function() {

  var dropdown_pin = this.getFieldValue('PIN');
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


/*
----------------------------------Bees--------------------------------------------------
*/

/* Wifi connection and openSenseMap Blocks*/
Blockly.Arduino.sensebox_wifi = function(block) {
  var pw = this.getFieldValue('Password');
  var ssid = this.getFieldValue('SSID');
  Blockly.Arduino.definitions_['define_senseBox'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.definitions_['define_network'] = 'Bee* b = new Bee();';
  Blockly.Arduino.setups_['sensebox_network'] = 'b->connectToWifi("'+ ssid +'","'+ pw +'");\ndelay(1000);';
  var code = '';
  return code;
};

Blockly.Arduino.sensebox_osem_connection = function(block) {
  var box_id = this.getFieldValue('BoxID');
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  Blockly.Arduino.definitions_['define_senseBox'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.definitions_['define_osem'] = 'OpenSenseMap osem("'+box_id+'",b);';
  Blockly.Arduino.setups_['sensebox_osem'] = '';
  var code = '';
      code += branch; 
  return code;
};

Blockly.Arduino.sensebox_send_to_osem = function(block) {
  var box_id = this.getFieldValue('BoxID');
  var sensor_id = this.getFieldValue('SensorID');
  var code = '';
      Blockly.Arduino.valueToCode(this, 'Value', Blockly.Arduino.ORDER_ATOMIC)
      var sensor_id = this.getFieldValue('SensorID') || '90909';
      var sensor_value = Blockly.Arduino.valueToCode(this, 'Value', Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
      code += ' osem.uploadMeasurement(' + sensor_value + ',"' + sensor_id +'");\n';
  return code;
};

Blockly.Arduino.sensebox_shield_ethernet = function(block) {
  Blockly.Arduino.definitions_['define_senseBox'] = '#include "SenseBox.h"';
  Blockly.Arduino.definitions_['define_network'] = 'OpenSenseMap wifi("'+box_id+'");';
  Blockly.Arduino.setups_['sensebox_network'] = 'wifi.beginEthernet();';
  var box_id = this.getFieldValue('box_id');
  var code = '';
  //extra blöcke sensor
  for (var n = 1; n <= 5 ; n++) {
      if(Blockly.Arduino.valueToCode(this, 'TEXT'+n, Blockly.Arduino.ORDER_ATOMIC)){
      var sensor_id = this.getFieldValue('ID'+n) || '90909';
      var sensor_value = Blockly.Arduino.valueToCode(this, 'TEXT'+n, Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
      code += ' shield.uploadValue(' + sensor_value + ',"' + sensor_id +'");\n';
    }else{
      code += '//kein Sensor an Port '+ n +'\n';
    }
  }
  return code;
};



/*
----------------------------------Basics--------------------------------------------------
*/
Blockly.Arduino.sensebox_led = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_green_led_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n'
  return code;
};

Blockly.Arduino.sensebox_button = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_button_'+ dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
  var code = 'digitalRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_piezo = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_piezo_buzzer_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n'
  return code;
};

Blockly.Arduino.sensebox_poti = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_button_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_foto = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_button_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'analogRead('+dropdown_pin+')';
  return [code ,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_rgb_led = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var red = Blockly.Arduino.valueToCode(this, 'RED', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var green = Blockly.Arduino.valueToCode(this, 'GREEN', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var blue = Blockly.Arduino.valueToCode(this, 'BLUE', Blockly.Arduino.ORDER_ATOMIC) || '0'
  Blockly.Arduino.definitions_['define_rgb_led'+dropdown_pin] = '#include <Adafruit_NeoPixel.h>\n Adafruit_NeoPixel rgb_led_'+ dropdown_pin +' = Adafruit_NeoPixel(1,'+ dropdown_pin +',NEO_GRB + NEO_KHZ800);\n';
  Blockly.Arduino.setups_['setup_rgb_led'+dropdown_pin] = 'rgb_led_'+ dropdown_pin+ '.begin();';

    var code = 'rgb_led_'+ dropdown_pin +'.setPixelColor(0,rgb_led_'+ dropdown_pin +'.Color('+ green +',' + red +',' + blue +'));\n';
  code += 'rgb_led_'+ dropdown_pin +'.show();';
  return code;
};
/*
----------------------------------Ausgabe--------------------------------------------------
*/
Blockly.Arduino.sensebox_serial_print = function() {
Blockly.Arduino.setups_['sensebox_serial_print'] = '//Setup Serial Print\n  Serial.begin(9600);\n';
var linebreak =  this.getFieldValue('LINEBREAK');
if(linebreak =="TRUE"){
  linebreak = "ln";
}else{
  linebreak = "";
}
var text = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
var code ='Serial.print'+ linebreak +'(' + text + ');\n';
return code;
};

/* SD-Card Blocks using the Standard SD Library*/

Blockly.Arduino.sensebox_sd_create_file = function() {
  filename = this.getFieldValue('Filename');
  Blockly.Arduino.definitions_['define_sd_start'] = '#include <SPI.h> // wichtige Libraries für das Speichern von Daten auf SD-Karte\n #include <SD.h>\n';
  Blockly.Arduino.definitions_['define_sd'] = 'File dataFile'+filename+';'
  Blockly.Arduino.setups_['sensebox_sd'] = 'SD.begin(28);\ndataFile'+filename+' = SD.open("'+filename+'.txt", FILE_WRITE);\ndataFile'+filename+'.close();\n';
  var code = '';
  return code;
  };
  

Blockly.Arduino.sensebox_sd_open_file = function(block) {
var text = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
var branch = Blockly.Arduino.statementToCode(block, 'SD');
var code ='dataFile'+filename+' = SD.open("'+filename+'.txt", FILE_WRITE);\n'
code += branch;
code +='dataFile'+filename+'.close();\n'
return code;
};

Blockly.Arduino.sensebox_sd_write_file = function() {
  var text = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
  var linebreak =  this.getFieldValue('linebreak');
    if(linebreak =="TRUE"){
      linebreak = "ln";
      }else{
        linebreak = "";
      }
  var code ='dataFile'+filename+'.print'+linebreak+'('+ text +');\n'
  return code;
  };

  /*Display Blocks*/
  Blockly.Arduino.sensebox_display_beginDisplay = function() {
    Blockly.Arduino.definitions_['define_display_libraries'] = '#include <SPI.h>\n#include <Wire.h>\n#include <Adafruit_GFX.h>\n#include <Adafruit_SSD1306.h>\n#include <senseBoxIO.h>\n';
    Blockly.Arduino.definitions_['define_display'] = '#define OLED_RESET 4\nAdafruit_SSD1306 display(OLED_RESET);';
    Blockly.Arduino.setups_['sensebox_display_begin'] = 'senseBoxIO.powerI2C(true);\ndisplay.begin(SSD1306_SWITCHCAPVCC, 0x3D);\ndisplay.clearDisplay();';
    var code = '';
    return code;
    };


  Blockly.Arduino.sensebox_display_clearDisplay = function() {
      var code = 'display.clearDisplay();\n';
      return code;
      };

  Blockly.Arduino.sensebox_display_printDisplay = function() {
        var x = Blockly.Arduino.valueToCode(this, 'X', Blockly.Arduino.ORDER_ATOMIC) || '0'
        var y = Blockly.Arduino.valueToCode(this, 'Y', Blockly.Arduino.ORDER_ATOMIC) || '0'
        var printDisplay = Blockly.Arduino.valueToCode(this, 'printDisplay', Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
        var code = 'display.setCursor('+x+','+y+');\n';
        code += 'display.print('+printDisplay+');';
        return code;
      };

      Blockly.Arduino.sensebox_display_setSize = function() {
        var size = Blockly.Arduino.valueToCode(this, 'size', Blockly.Arduino.ORDER_ATOMIC) || '1'
        var code = 'display.setTextSize('+size+');\n';
        return code;
      };
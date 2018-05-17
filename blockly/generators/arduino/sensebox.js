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
  if (dropdown_name == 'UvIntensity'){
    Blockly.Arduino.definitions_['define_senseBox'] = '#include "SenseBoxMCU.h"\n';
    Blockly.Arduino.definitions_['define_veml'] = 'VEML6070 veml;'
    Blockly.Arduino.setups_['sensebox_sensor_uv_light'] = 'veml.begin();\n'
    var code = 'veml.get'+dropdown_name+'()';
  }
  if (dropdown_name == 'Illuminance'){
    Blockly.Arduino.definitions_['define_senseBox'] = '#include "SenseBoxMCU.h"\n';
    Blockly.Arduino.definitions_['define_veml'] = 'TSL45315 tsl';
    Blockly.Arduino.setups_['sensebox_sensor_uv_light'] = 'tsl.begin();\n'
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

Blockly.Arduino.sensebox_sensor_ir_dist = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var code = '4800/(analogRead('+dropdown_pin+')-20)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/*
----------------------------------Shields--------------------------------------------------
*/
Blockly.Arduino.sensebox_time = function() {
  var dropdown_format = this.getFieldValue('FORMAT');
  Blockly.Arduino.definitions_['define_senseBox'] = '#include <SenseBox.h>';
  Blockly.Arduino.definitions_['define_rtc'] = 'RV8523 rtc;';
  Blockly.Arduino.setups_['sensebox_rtc'] = ' rtc.begin();\n  rtc.setTime(__DATE__,__TIME__);'; //old rtc.set(10, 24, 8, 20, 4, 2016); // 08:24:10 20.04.2016\n
  var code = '';
  if(dropdown_format == "jjjj.mm.tt hh:mm:ss"){
      code += '"" + (String) rtc.getYear() + "." + (String) rtc.getMonth() + "." + (String) rtc.getDay() + "  " + (String) rtc.getHour() + ":" + (String) rtc.getMin()+ ":" + (String) rtc.getSec()';
  }else if(dropdown_format == "jjjj.mm.tt"){
      code += '"" + (String) rtc.getYear() + "." + (String) rtc.getMonth(); + "." + (String) rtc.getDay()';
  }else if(dropdown_format == "hh:mm:ss"){
      code += '"" + (String) rtc.getHour() + ":" + (String) rtc.getMin() + ":" + (String) rtc.getSec()';
  }else if(dropdown_format == "hh:mm"){
      code += '"" + (String) rtc.getHour() + ":" + (String) rtc.getMin()';
  }
  return [code ,Blockly.Arduino.ORDER_ATOMIC];
};
/* funktioniert noch nicht
Blockly.Arduino.sensebox_shield_wifi = function(block) {
  var pw = this.getFieldValue('pw');
  var net_id = this.getFieldValue('net_id');
  var box_id = this.getFieldValue('box_id');
  Blockly.Arduino.definitions_['define_senseBox'] = '#include <SenseBox.h>';
  Blockly.Arduino.definitions_['define_network'] = 'Ehernet shield;';
  Blockly.Arduino.setups_['sensebox_network'] = 'shield.begin('+ net_id +',"'+ pw +'"");';
  var code = '';
  //extra blöcke sensor
  for (var n = 1; n <= block.osm_sensorCount_ ; n++) {
    var sensor_id = Blockly.Arduino.valueToCode(block, 'ID' + n, Blockly.Arduino.ORDER_NONE) || '0000';
    var sensor_value = Blockly.Arduino.statementToCode(block, 'TEXT' + n)|| '0000';
    code += ' postFloatValue(' + sensor_value + ',"' + sensor_id +'","'+box_id+');\n';
  }
  return code;
};
*/

Blockly.Arduino.sensebox_shield_wifi = function(block) {
  var pw = this.getFieldValue('pw');
  var net_id = this.getFieldValue('net_id');
  var box_id = this.getFieldValue('box_id');
  Blockly.Arduino.definitions_['define_senseBox'] = '#include "SenseBox.h"';
  Blockly.Arduino.definitions_['define_network'] = 'OpenSenseMap shield("'+box_id+'");';
  Blockly.Arduino.setups_['sensebox_network'] = 'shield.beginWiFi("'+ net_id +'","'+ pw +'");';
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

Blockly.Arduino.sensebox_wifi = function(block) {
  var pw = this.getFieldValue('Password');
  var ssid = this.getFieldValue('SSID');
  Blockly.Arduino.definitions_['define_senseBox'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.definitions_['define_network'] = 'Bee* b = new Bee();';
  Blockly.Arduino.setups_['sensebox_network'] = 'b->connectToWiFi("'+ ssid +'","'+ pw +'");\ndelay(1000);';
  var code = '';
  return code;
};

Blockly.Arduino.sensebox_osem_connection = function(block) {
  var box_id = this.getFieldValue('BoxID');
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  Blockly.Arduino.definitions_['define_senseBox'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.definitions_['define_osem'] = 'OpenSenseMap osem('+box_id+',b);';
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

Blockly.Arduino.sensebox_print_osm = function() {
var id = this.getFieldValue('id');
var text = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
var code = 'postFloatValue((float)'+text+', 4, '+id+');';
return code;
};

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
  var code ='dataFile'+filename+'.println('+ text +');\n'
  return code;
  };

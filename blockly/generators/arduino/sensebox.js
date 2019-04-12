/*
@metadata
		author": senseBox
		lastupdated": 2018
		for more information: www.sensebox.de
*/

'use strict';

goog.provide('Blockly.Arduino.sensebox');

goog.require('Blockly.Arduino');


/*
----------------------------------Sensoren--------------------------------------------------
*/
Blockly.Arduino.sensebox_sensor_pressure = function() {
var dropdown_name = this.getFieldValue('NAME');
var referencePressure = this.getFieldValue('referencePressure');
Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
Blockly.Arduino.userFunctions_['define_pressure'] = 'BMP280 bmp_sensor;';
Blockly.Arduino.setups_['sensebox_bmp_sensor'] = 'bmp_sensor.begin();';
  if (dropdown_name == 'Pressure' || dropdown_name == 'Temperature'){
  var code ='bmp_sensor.get' + dropdown_name + '()';
}
else if (dropdown_name == 'Altitude'){
  var code = 'bmp_sensor.getAltitude(' + referencePressure + ')';
}
  return [code ,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_temp_hum = function(){
  var dropdown_name = this.getFieldValue('NAME');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.userFunctions_['define_hdc'] = 'HDC1080 hdc;';
  Blockly.Arduino.setups_['sensebox_sensor_temp_hum'] = 'hdc.begin();';
  var code = 'hdc.get'+dropdown_name+'()';
  return [code ,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_uv_light = function(){
  var dropdown_name = this.getFieldValue('NAME');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  if (dropdown_name == 'UvIntensity'){
    Blockly.Arduino.userFunctions_['define_veml'] = 'VEML6070 veml;'
    Blockly.Arduino.setups_['sensebox_sensor_uv_light'] = 'veml.begin();'
    var code = 'veml.get'+dropdown_name+'()';
  }
  if (dropdown_name == 'Illuminance'){  
    Blockly.Arduino.userFunctions_['define_tsl'] = 'TSL45315 tsl;'
    Blockly.Arduino.setups_['sensebox_sensor_illuminance'] = 'tsl.begin();'
    var code = 'tsl.get'+dropdown_name+'()';
  }
  return [code ,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_bmx055_accelerometer = function(){
  var dropdown_value = this.getFieldValue('VALUE');
  var range = this.getFieldValue('RANGE');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.userFunctions_['define_bmx'] = 'BMX055 bmx;';
  Blockly.Arduino.setups_['sensebox_sensor_bmx055'] = 'bmx.beginAcc('+range+');';
  var code = 'bmx.getAcceleration'+dropdown_value+'()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_sds011 = function(){
  var dropdown_name = this.getFieldValue('NAME');
  var serial_name = this.getFieldValue('SERIAL');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.codeFunctions_['define_sds011'] = 'SDS011 my_sds('+serial_name+');';
  Blockly.Arduino.variables_['variables_sds011'] = 'float p10,p25;\n';
  Blockly.Arduino.setups_['sensebox_sensor_sds011'] = serial_name+'.begin(9600);';
  var code = 'my_sds.get'+dropdown_name+'()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_ultrasonic_ranger = function() {
  var dropdown_pin_RX = this.getFieldValue('ultrasonic_trigger');
  var dropdown_pin_TX = this.getFieldValue('ultrasonic_echo');
  var port = this.getFieldValue('port');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.userFunctions_['var_ultrasonic'+port] = 'Ultrasonic Ultrasonic'+port+'('+dropdown_pin_RX+','+dropdown_pin_TX+');';
  var code;
  code = 'Ultrasonic'+port+'.getDistance()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_sound = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.userFunctions_['define_microphone'] = 'Microphone microphone('+dropdown_pin+');'
  var code = 'microphone.getValue()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.sensebox_sensor_soil = function() {

  var dropdown_port = this.getFieldValue('Port');
  var dropdown_pin = 1;
  if (dropdown_port == 'A'){
    dropdown_pin = 1;
  }
  if (dropdown_port == 'B'){
    dropdown_pin = 3;
  }
  if (dropdown_port == 'C'){
    dropdown_pin = 5;
  }
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_sensor_watertemperature = function() {

  var dropdown_port = this.getFieldValue('Port');
  var dropdown_pin = 1;
  if (dropdown_port == 'A'){
    dropdown_pin = 1;
  }
  if (dropdown_port == 'B'){
    dropdown_pin = 3;
  }
  if (dropdown_port == 'C'){
    dropdown_pin = 5;
  }
  Blockly.Arduino.includes_['library_oneWire'] = '#include "OneWire.h"';
  Blockly.Arduino.includes_['library_oneDallasTemperature'] = '#include "DallasTemperature.h"';
  Blockly.Arduino.definitions_['define_OneWire'] = '#define ONE_WIRE_BUS ' + dropdown_pin + '\nOneWire oneWire(ONE_WIRE_BUS);\nDallasTemperature sensors(&oneWire);';
  Blockly.Arduino.setups_['sensebox_oneWireSetup'] = 'sensors.begin();';
  Blockly.Arduino.userFunctions_['sensebox_requestTemp'] = 'float getWaterTemp(){\nsensors.requestTemperatures();\nsensors.getTempCByIndex(0);\n}';
  var code = 'getWaterTemp()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/*
----------------------------------Bees--------------------------------------------------
*/

/* Wifi connection and openSenseMap Blocks*/
Blockly.Arduino.sensebox_wifi = function(block) {
  var pw = this.getFieldValue('Password');
  var ssid = this.getFieldValue('SSID');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.userFunctions_['define_network'] = 'Bee* b = new Bee();';
  Blockly.Arduino.setups_['sensebox_network'] = 'b->connectToWifi("'+ ssid +'","'+ pw +'");\ndelay(1000);';
  var code = '';
  return code;
};

Blockly.Arduino.sensebox_startap = function(block) {
  var ssid = this.getFieldValue('SSID');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.userFunctions_['define_network'] = 'Bee* b = new Bee();';
  Blockly.Arduino.setups_['sensebox_network'] = 'b->startAP("'+ ssid +'");'
  var code = '';
  return code;
};

Blockly.Arduino.sensebox_osem_connection = function(block) {
  var box_id = this.getFieldValue('BoxID');
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.userFunctions_['define_osem'] = 'OpenSenseMap osem("'+box_id+'",b);';
  Blockly.Arduino.setups_['sensebox_osem'] = '';
  var code = '';
      code += branch; 
  return code;
};
/**
 * Block send Data to the openSenseMap
 */
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

Blockly.Arduino.sensebox_send_mobile_to_osem = function(block) {
  var box_id = this.getFieldValue('BoxID');
  var sensor_id = this.getFieldValue('SensorID') || '90909';
  var sensor_value = Blockly.Arduino.valueToCode(this, 'Value', Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
  var lat = Blockly.Arduino.valueToCode(this, 'lat', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var lng = Blockly.Arduino.valueToCode(this, 'lng', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var code = '';
      code += 'osem.uploadMobileMeasurement(' + sensor_value + ',"' + sensor_id +'",' + lat + ',' + lng + ');\n';
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
  var dropown_function = this.getFieldValue('FUNCTION');
  Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
  Blockly.Arduino.definitions_['define_button'] = 'Button button(' + dropdown_pin + ');';
  Blockly.Arduino.setups_['setup_button'] = 'button.begin();';
  var code = '';
  if (dropown_function == 'isPressed'){
     code += 'button.isPressed()';
  } 
  else if (dropown_function == 'Switch')
  {
    code += 'button.getSwitch()';
  }
  else if (dropown_function == 'wasPressed')
  {
    code += 'button.wasPressed()';
  }
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
  Blockly.Arduino.setups_['setup_poti'] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_foto = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_foto'] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'analogRead('+dropdown_pin+')';
  return [code ,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensebox_rgb_led = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var red = Blockly.Arduino.valueToCode(this, 'RED', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var green = Blockly.Arduino.valueToCode(this, 'GREEN', Blockly.Arduino.ORDER_ATOMIC) || '0'
  var blue = Blockly.Arduino.valueToCode(this, 'BLUE', Blockly.Arduino.ORDER_ATOMIC) || '0'
  Blockly.Arduino.definitions_['define_rgb_led'+dropdown_pin] = '#include <Adafruit_NeoPixel.h>\n Adafruit_NeoPixel rgb_led_'+ dropdown_pin +' = Adafruit_NeoPixel(1,'+ dropdown_pin +',NEO_RGB + NEO_KHZ800);\n';
  Blockly.Arduino.setups_['setup_rgb_led'+dropdown_pin] = 'rgb_led_'+ dropdown_pin+ '.begin();';

    var code = 'rgb_led_'+ dropdown_pin +'.setPixelColor(0,rgb_led_'+ dropdown_pin +'.Color('+ red +',' + green +',' + blue +'));\n';
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
/**
 * Code generator for variable (X) getter.
 * Arduino code: loop { X }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */

Blockly.Arduino.sensebox_sd_create_file = function(block) {
  var filename = this.getFieldValue('Filename');
  Blockly.Arduino.includes_['library_spi'] = '#include <SPI.h>';
  Blockly.Arduino.includes_['library_sd'] = '#include <SD.h>';
  Blockly.Arduino.codeFunctions_['define_sd'] = 'File dataFile' + filename +';';
  Blockly.Arduino.setups_['sensebox_sd'] = 'SD.begin(28);';
  Blockly.Arduino.setups_['sensebox_sd' + filename] = 'dataFile' + filename +' = SD.open("'+filename+'.txt", FILE_WRITE);\ndataFile' + filename +'.close();\n';
  var code = '';
  return code;
  };
  

Blockly.Arduino.sensebox_sd_open_file = function(block) {
var filename = this.getFieldValue('Filename');
var text = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
var branch = Blockly.Arduino.statementToCode(block, 'SD');
var code ='dataFile' + filename +' = SD.open("'+filename+'.txt", FILE_WRITE);\n'
code += branch;
code +='dataFile' + filename +'.close();\n' 
return code;
};

Blockly.Arduino.sensebox_sd_write_file = function(block) {
  if (this.parentBlock_ != null){
    var filename = this.getSurroundParent().getFieldValue('Filename');
  }
  var text = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
  var linebreak =  this.getFieldValue('linebreak');
    if(linebreak =="TRUE"){
      linebreak = "ln";
      }else{
        linebreak = "";
      }
  var code ='dataFile' + filename +'.print'+linebreak+'('+ text +');\n'
  return code;
  };

  /*Display Blocks*/
  Blockly.Arduino.sensebox_display_beginDisplay = function() {
    Blockly.Arduino.includes_['library_spi'] = '#include <SPI.h>';
    Blockly.Arduino.includes_['library_wire'] = '#include <Wire.h>';
    Blockly.Arduino.includes_['library_AdafruitGFX'] = '#include <Adafruit_GFX.h>';
    Blockly.Arduino.includes_['library_AdafruitSSD1306'] = '#include <Adafruit_SSD1306.h>';
    Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
    Blockly.Arduino.userFunctions_['define_display'] = '#define OLED_RESET 4\nAdafruit_SSD1306 display(OLED_RESET);';
    Blockly.Arduino.setups_['sensebox_display_begin'] = 'senseBoxIO.powerI2C(true);\ndelay(2000);\ndisplay.begin(SSD1306_SWITCHCAPVCC, 0x3D);\ndisplay.display();\ndelay(100);\ndisplay.clearDisplay();';
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
        var size = Blockly.Arduino.valueToCode(this, 'SIZE', Blockly.Arduino.ORDER_ATOMIC) || '1'
        var color = this.getFieldValue('COLOR');
        var code = 'display.setCursor('+x+','+y+');\n';
        code += 'display.setTextSize('+size+');\n';
        code += 'display.setTextColor('+color+');\n';
        code += 'display.println('+printDisplay+');\n';
        return code;
      };

  Blockly.Arduino.sensebox_display_show = function(block) {
        var show = Blockly.Arduino.statementToCode(block, 'SHOW');
        var code = '';
            code += show;
            code += 'display.display();\n';
        return code;
      };
    Blockly.Arduino.sensebox_display_plotDisplay = function() {
      var YLabel = Blockly.Arduino.valueToCode(this, 'YLabel', Blockly.Arduino.ORDER_ATOMIC) || 'Y'
      var XLabel = Blockly.Arduino.valueToCode(this, 'XLabel', Blockly.Arduino.ORDER_ATOMIC) || 'X'
      var Title = Blockly.Arduino.valueToCode(this, 'Title', Blockly.Arduino.ORDER_ATOMIC) || 'Title'
        var XRange1 = Blockly.Arduino.valueToCode(this, 'XRange1', Blockly.Arduino.ORDER_ATOMIC) || '0'
        var XRange2 = Blockly.Arduino.valueToCode(this, 'XRange2', Blockly.Arduino.ORDER_ATOMIC) || '0'
        var YRange1 = Blockly.Arduino.valueToCode(this, 'YRange1', Blockly.Arduino.ORDER_ATOMIC) || '0'
        var YRange2 = Blockly.Arduino.valueToCode(this, 'YRange2', Blockly.Arduino.ORDER_ATOMIC) || '0'
        var XTick = Blockly.Arduino.valueToCode(this, 'XTick', Blockly.Arduino.ORDER_ATOMIC) || '0'
        var YTick = Blockly.Arduino.valueToCode(this, 'YTick', Blockly.Arduino.ORDER_ATOMIC) || '0'
        var TimeFrame = Blockly.Arduino.valueToCode(this, 'TimeFrame', Blockly.Arduino.ORDER_ATOMIC) || '0'
        var plotDisplay = Blockly.Arduino.valueToCode(this, 'plotDisplay', Blockly.Arduino.ORDER_ATOMIC) || '"Keine Eingabe"';
        Blockly.Arduino.includes_['library_plot'] = '#include <Plot.h>';
        Blockly.Arduino.userFunctions_['define_plot_class'] = 'Plot DataPlot(&display);\n';
        Blockly.Arduino.variables_['define_plot_class'] = 'const double TIMEFRAME = '+TimeFrame+';\n';
        Blockly.Arduino.setups_['sensebox_plot_setup'] = 'DataPlot.setTitle('+Title+');\nDataPlot.setXLabel('+XLabel+');\nDataPlot.setYLabel('+YLabel+');\nDataPlot.setXRange('+ XRange1+ ',' +XRange2+');\nDataPlot.setYRange('+ YRange1+ ','+YRange2+');\nDataPlot.setXTick('+XTick+');\nDataPlot.setYTick('+YTick+');\nDataPlot.setXPrecision(0);\nDataPlot.setYPrecision(0);\n';
        var code = 'DataPlot.clear();'
        code += 'double starttime = millis();\ndouble t = 0;\nwhile (t <= TIMEFRAME) {\nt = (millis() - starttime) / 1000.0;\nfloat value = '+plotDisplay+';\n';
        code += 'DataPlot.addDataPoint(t,value);\n}\n';
        return code;
      };

      Blockly.Arduino.sensebox_display_fillCircle = function() {
        var x = Blockly.Arduino.valueToCode(this, 'X', Blockly.Arduino.ORDER_ATOMIC) || '0'
        var y = Blockly.Arduino.valueToCode(this, 'Y', Blockly.Arduino.ORDER_ATOMIC) || '0'
        var radius = Blockly.Arduino.valueToCode(this, 'Radius', Blockly.Arduino.ORDER_ATOMIC) || '0'
        var fill = this.getFieldValue('FILL');
        if (fill == 'TRUE'){
        var code = 'display.fillCircle('+x+','+y+','+radius+',1);\n';
        }
        else{
        var code = 'display.drawCircle('+x+','+y+','+radius+',1);\n';
        }
        return code;
      }

      Blockly.Arduino.sensebox_display_drawRectangle = function() {
        var x = Blockly.Arduino.valueToCode(this, 'X', Blockly.Arduino.ORDER_ATOMIC) || '0'
        var y = Blockly.Arduino.valueToCode(this, 'Y', Blockly.Arduino.ORDER_ATOMIC) || '0'
        var width = Blockly.Arduino.valueToCode(this, 'width', Blockly.Arduino.ORDER_ATOMIC) || '0'
        var height = Blockly.Arduino.valueToCode(this, 'height', Blockly.Arduino.ORDER_ATOMIC) || '0'
        var fill = this.getFieldValue('FILL');
        if (fill == 'TRUE'){
          var code = 'display.fillRect('+x+','+y+','+width+','+height+',1);\n';
        }
        else {
          var code = 'display.drawRect('+x+','+y+','+width+','+height+',1);\n';
        }
        return code;
      }

      //--GPS--//

        Blockly.Arduino.sensebox_gps_getValues = function(){
          Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
          Blockly.Arduino.userFunctions_['define_gps'] = 'GPS gps;';
          Blockly.Arduino.setups_['sensebox_gps_begin'] = 'gps.begin();';
          var dropdown_name = this.getFieldValue("Values");
          var code = 'gps.get'+dropdown_name+'()';
          return [code ,Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Arduino.sensebox_interval_timer = function(block) {
          var interval = this.getFieldValue('interval');
          Blockly.Arduino.variables_['define_interval_variables'] = 'const long interval = '+interval+';\nlong time_start = 0;\nlong time_actual = 0;';
          var branch = Blockly.Arduino.statementToCode(block, 'DO');
          var code = 'time_start = millis();\n';
              code += 'if (time_start > time_actual + interval) {\n  time_actual = millis();\n'
              code += branch; 
              code += '}\n'
          return code;
        };

        /**
         * Webserver Blocks by Lucas Steinmann
         * 
         */

        Blockly.Arduino.sensebox_initialize_http_server = function(block) {
          var box_id = this.getFieldValue('Port');
          Blockly.Arduino.includes_['library_senseBoxMCU'] = '#include "SenseBoxMCU.h"';
          Blockly.Arduino.codeFunctions_['define_wifi_server'] = 'WiFiServer server('+box_id+');';
          Blockly.Arduino.setups_['sensebox_wifi_server_beging'] = 'server.begin();';
          return '';
        };
        
         Blockly.Arduino.sensebox_http_on_client_connect = function(block) {
          var onConnect = Blockly.Arduino.statementToCode(block, 'ON_CONNECT');
          var code = '';
          code += 'WiFiClient client = server.available();\n';
          code += 'if (client && client.available()) {\n';
          code += '  String request_string = listenClient(client);\n';
          code += '  Request request;\n';
          code += '  if (parseRequestSafe(request_string, request)) {\n';
          code += onConnect;
          code += '  }\n';
          code += '  delay(1);\n';
          code += '  client.stop();\n';
          code += '  delay(1);\n';
          code += '}\n';
          return code;
        };
        
         Blockly.Arduino.sensebox_http_method = function(block) {
            var code = "request.method";
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };
        
        
         Blockly.Arduino.sensebox_http_uri = function(block) {
            var code = "request.uri";
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };
        
         Blockly.Arduino.sensebox_http_protocol_version = function(block) {
            var code = "request.protocol_version";
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };
        
         Blockly.Arduino.sensebox_http_user_agent = function(block) {
            var code = "request.user_agent";
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };
        
         Blockly.Arduino.sensebox_generate_html_doc = function(block) {
          var header = Blockly.Arduino.valueToCode(block, 'HEADER', Blockly.Arduino.ORDER_NONE) || '""';
          var body = Blockly.Arduino.valueToCode(block, 'BODY', Blockly.Arduino.ORDER_NONE) || '""';
          var code = 'buildHTML(' + header + ', ' + body + ')';
          return [code, Blockly.Arduino.ORDER_ATOMIC];
        };
        
         Blockly.Arduino.sensebox_generate_http_succesful_response = function(block) {
          var content = Blockly.Arduino.valueToCode(block, 'CONTENT', Blockly.Arduino.ORDER_NONE) || '""';
          var code = 'client.println(buildSuccessfulResponse(request, ' + content + '));\n';
          return code;
        };
        
         Blockly.Arduino.sensebox_generate_http_not_found_response = function(block) {
          var code = 'client.println(buildNotFoundResponse(request));\n';
          return code;
        };

        Blockly.Arduino.sensebox_ip_address = function(block) {
          var code = "b->getIpAddress()";
          return [code, Blockly.Arduino.ORDER_ATOMIC];
      };
        
         Blockly.Arduino.sensebox_general_html_tag = function(block) {
          var tag = this.getFieldValue('TAG');
          var code = 'buildTag("' + tag + '",';
          var n = 0;
          var branch = Blockly.Arduino.valueToCode(block, 'DO' + n, Blockly.Arduino.ORDER_NONE);
          if (branch.length > 0) {
              code += '\n ' + branch;
          } else {
              code += '""';
          }
          for (n = 1; n <= block.additionalChildCount_; n++) {
            branch = Blockly.Arduino.valueToCode(block, 'DO' + n, Blockly.Arduino.ORDER_NONE);
            code += ' +' + branch;
          }
          return [code + ')', Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Arduino.sensebox_web_readHTML = function(block) {
          var filename =  this.getFieldValue('FILENAME');
          Blockly.Arduino.includes_['library_spi'] = '#include <SPI.h>';
          Blockly.Arduino.includes_['library_sd'] = '#include <SD.h>';
          Blockly.Arduino.codeFunctions_['define_sd' + filename] = 'File webFile;';
          Blockly.Arduino.setups_['sensebox_sd'] = 'SD.begin(28);';
          var func = [
            'String generateHTML(){',
              ' webFile = SD.open("' + filename + '", FILE_READ);',
              ' String finalString ="";',
              ' while (webFile.available())',
              '   {',
              '   finalString+=(char)webFile.read();',
              '   }',
              ' return finalString;',
            '}'];
        var functionName = Blockly.Arduino.addFunction(
            'generateHTML', func.join('\n'));
        var code = functionName + '()';  
        return [code, Blockly.Arduino.ORDER_ATOMIC];
        };
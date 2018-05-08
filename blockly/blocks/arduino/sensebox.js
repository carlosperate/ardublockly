/*
@metadata
    author": senseBox Team
    lastupdated": 2018 
    for more information: www.sensebox.de
    add new Blocks for the senseBox MCU
*/  

'use strict';

goog.provide('Blockly.Blocks.sensebox');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category.
 * "senseBox green"
 */
 Blockly.Blocks.sensebox.HUE = 120;



Blockly.Blocks['sensebox_sensor_ir_dist'] = {
  init: function() {
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_sen_ir)
        .appendField("PIN:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.analogPins), "PIN")
    this.setOutput(true, "Number");
    this.setTooltip('Dieser Sensor misst die Entfernung zu Hindernissen mit infrarotem Licht');
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/irsensor.html');
  }
};

Blockly.Blocks['sensebox_sensor_temp_hum'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_sen_temp_hum);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.senseBox_sen_value)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_sen_temp,"Temperature"], [Blockly.Msg.senseBox_sen_hum,"Humidity"]]), "NAME");
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip(Blockly.Msg.senseBox_sen_temp_hum_tip);
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/diy_umweltstation/temp_und_luftfeuchte.html');
  }
};

Blockly.Blocks['sensebox_sensor_uv_light'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_sen_uv_light);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.senseBox_sen_value)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_sen_uv,"UvIntensity"], [Blockly.Msg.senseBox_sen_light,"Illuminance"]]), "NAME");
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip(Blockly.Msg.senseBox_sen_uv_light_tip);
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/diy_umweltstation/temp_und_luftfeuchte.html');
  }
};

/*
BMX055 Three differen Blocks for Accelerometer, Gyroscope, Compass
*/

Blockly.Blocks['sensebox_sensor_bmx055_accelerometer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_sensor_bmx055_accelerometer);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.senseBox_sen_value)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_sensor_bmx055_x,"X"], [Blockly.Msg.senseBox_sensor_bmx055_y,"Y"]]), "NAME");
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip(Blockly.Msg.senseBox_sensor_bmx055_accelerometer_tip);
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/diy_umweltstation/temp_und_luftfeuchte.html');
  }
};

Blockly.Blocks['sensebox_sensor_bmx055_gyroscope'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_sensor_bmx055_gyroscope);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.senseBox_sen_value)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_sensor_bmx055_x,"X"], [Blockly.Msg.senseBox_sensor_bmx055_y,"Y"]]), "NAME");
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip(Blockly.Msg.senseBox_sensor_bmx055_gyroscope_tip);
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/diy_umweltstation/temp_und_luftfeuchte.html');
  }
};

Blockly.Blocks['sensebox_sensor_bmx055_compass'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_sensor_bmx055_compass);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.senseBox_sen_value)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_sensor_bmx055_x,"X"], [Blockly.Msg.senseBox_sensor_bmx055_y,"Y"]]), "NAME");
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip(Blockly.Msg.senseBox_sensor_bmx055_compass_tip);
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/diy_umweltstation/temp_und_luftfeuchte.html');
  }
};

Blockly.Blocks['sensebox_sensor_pressure'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_sen_pressure);
       this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip('Dieser Sensor misst den Luftdruck');
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/diy_umweltstation/luftdruck.html');
  }
};


Blockly.Blocks['sensebox_sensor_ultrasonic_ranger'] = {
  init: function() {
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
	      .appendField(Blockly.Msg.senseBox_sen_ultrasonic)
    this.appendDummyInput()
        .appendField("PIN_RX:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "PIN_RX")
        .appendField("PIN_TX:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "PIN_TX")
    this.setOutput(true, 'Number');
    this.setTooltip('Dieser Sensor mist durch Ultraschall die Entfernung zu einem Objekt.');
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/verkehrszaehler.html');
  }
};
Blockly.Blocks['sensebox_sensor_sound'] = {
  init: function() {
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_sen_sound)
        .appendField("PIN:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.analogPins), "PIN")
    this.setOutput(true, "Number");
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/mikrofon.html');
    this.setTooltip('Dieser Sensor mist den Geräuschpegel.');
  }
};
/*
----------------------------------Shields--------------------------------------------------
*/
Blockly.Blocks['sensebox_time'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_output_timestamp)
        .appendField(Blockly.Msg.senseBox_output_format)
        .appendField(new Blockly.FieldDropdown([["jjjj.mm.tt hh:mm:ss", "jjjj.mm.tt hh:mm:ss"], ["jjjj.mm.tt", "jjjj.mm.tt"], ["hh:mm:ss", "hh:mm:ss"], ["hh:mm", "hh:mm"]]), "FORMAT");
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip('Gibt ein Datum aus');
    this.setHelpUrl('https://edu.books.sensebox.de/de/grundlagen/uhr.html');
  }
};

Blockly.Blocks['sensebox_wifi'] = {
  init: function() {
    this.setTooltip(Blockly.Msg.sensbox_wifi_tooltip);
    this.setHelpUrl('');
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
        .appendField("Wifi");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_LEFT)
        .appendField("SSID")
        .appendField(new Blockly.FieldTextInput("SSID"), "SSID");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_LEFT)
        .appendField("Password")
        .appendField(new Blockly.FieldTextInput("Password"), "Password");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
        }
  };

  Blockly.Blocks['sensebox_osem_connection'] = {
    init: function() {
      this.setTooltip(Blockly.Msg.sensbox_osem_connection_tooltip);
      this.setHelpUrl('');
      this.setColour(Blockly.Blocks.sensebox.HUE);
      this.appendDummyInput()
          .appendField("Verbinde mit oSem");
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_LEFT)
          .appendField("BoxID")
          .appendField(new Blockly.FieldTextInput("BoxID"), "BoxID");
      this.appendStatementInput("Sensors");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
          }
    };
    Blockly.Blocks['sensebox_send_to_osem'] = {
      init: function() {
        this.setTooltip(Blockly.Msg.sensbox_send_to_osem_tooltip);
        this.setHelpUrl('');
        this.setColour(Blockly.Blocks.sensebox.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.sensebox_send_to_osem);
        this.appendValueInput('Value')
            .setCheck(null)
            .appendField('SensorID')
            .appendField(new Blockly.FieldTextInput('SensorID'), 'SensorID');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
            }
      };



/*
----------------------------------Basics--------------------------------------------------
*/

Blockly.Blocks['sensebox_poti'] = {
  init: function() {
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_sen_poti)
        .appendField("PIN:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.analogPins), "PIN")
    this.setOutput(true, "Number");
    this.setTooltip('Mit einem Potenziometer kann man einen Widerstand beliebig einstellen.');
  }
};

Blockly.Blocks['sensebox_foto'] = {
  init: function() {
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_sen_foto)
        .appendField("PIN:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.analogPins), "PIN")
    this.setOutput(true, "Number");
    this.setTooltip('Dieser Block verändert seinen Widerstand je nach Helligkeit');
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/ldr.html');
  }
};
Blockly.Blocks['sensebox_rgb_led'] = {
  init: function() {
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
        .appendField("RGB Led")
        .appendField("PIN:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "PIN")
        this.appendValueInput("RED", 'Number')
            .appendField(Blockly.Msg.COLOUR_RGB_RED);//Blockly.Msg.senseBox_basic_red
        this.appendValueInput("GREEN", 'Number')
              .appendField(Blockly.Msg.COLOUR_RGB_GREEN);//Blockly.Msg.senseBox_basic_green
        this.appendValueInput("BLUE", 'Number')
              .appendField(Blockly.Msg.COLOUR_RGB_BLUE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Jede Farbe kann einen Wert zwischen 0 und 255 annehmen.');
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/rgb_led.html');
  }
};

Blockly.Blocks['sensebox_led'] = {
    init: function() {
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_led)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "PIN")
        .appendField(Blockly.Msg.senseBox_basic_state)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_on, "HIGH"], [Blockly.Msg.senseBox_off, "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Dieser Block steuert eine LED');
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/ampelButton.html');
  }
};

Blockly.Blocks['sensebox_button'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_sen_buzzer)
        .appendField("PIN:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "PIN");
    this.setOutput(true, 'Boolean');
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip('Ein Schalter, der genutzt werden kann um LED einzuschalten');
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/ampelButton.html');
  }
};
Blockly.Blocks['sensebox_piezo_buzzer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_basic_piezo)
        .appendField("PIN:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "PIN")
        .appendField(Blockly.Msg.senseBox_basic_state)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_on, "HIGH"], [Blockly.Msg.senseBox_off, "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip('Gibt einen Ton aus');
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/summer.html');
  }
};
/*
----------------------------------Ausgabe--------------------------------------------------
*/
Blockly.Blocks['sensebox_serial_print'] = {
  init: function() {
    this.appendValueInput("TEXT")
       .setCheck(null)
       .appendField(Blockly.Msg.senseBox_output_serialprint);
    this.appendDummyInput("CheckboxText")
      .appendField(Blockly.Msg.senseBox_output_linebreak)
       .appendField(new Blockly.FieldCheckbox("TRUE"), "LINEBREAK");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip('Dieser Block gibt Text über den seriellen Monitor aus');
    this.setHelpUrl('https://edu.books.sensebox.de/de/grundlagen/der_serielle_monitor.html');
  }
};
Blockly.Blocks['sensebox_safe_to_sd'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck(null)
        .appendField(Blockly.Msg.senseBox_output_safetosd);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_LEFT)
        .appendField(Blockly.Msg.senseBox_output_filename)
        .appendField(new Blockly.FieldTextInput("TXT"), "txt");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip('Dieser Block speichert Daten auf einer SD Karte.');
    this.setHelpUrl('https://edu.books.sensebox.de/de/grundlagen/datenlogger.html');
  }
};

//ersatzstein
Blockly.Blocks['sensebox_shield_wifi'] = {
init: function() {
  this.setTooltip('Dieser Block läd über ein WLAN Daten ins Internet');
  this.setHelpUrl('https://edu.books.sensebox.de/de/grundlagen/osem_upload.html');
  this.setColour(Blockly.Blocks.sensebox.HUE);
  this.appendDummyInput()
      .appendField("WLAN Shield");
  this.appendDummyInput()
      .setAlign(Blockly.ALIGN_LEFT)
      .appendField(Blockly.Msg.senseBox_output_password)
      .appendField(new Blockly.FieldTextInput("PW"), "pw");
  this.appendDummyInput()
      .setAlign(Blockly.ALIGN_LEFT)
      .appendField(Blockly.Msg.senseBox_output_networkid)
      .appendField(new Blockly.FieldTextInput("NET_ID"), "net_id");
  this.appendDummyInput()
      .setAlign(Blockly.ALIGN_LEFT)
      .appendField("BoxID")
      .appendField(new Blockly.FieldTextInput("BoxID"), "box_id");
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.appendValueInput('TEXT1')
     .setCheck(null)
     .appendField('ID_1')
     .appendField(new Blockly.FieldTextInput('ID1'), 'ID1');
 this.appendValueInput('TEXT2')
      .setCheck(null)
      .appendField('ID_2')
      .appendField(new Blockly.FieldTextInput('ID2'), 'ID2');
this.appendValueInput('TEXT3')
      .setCheck(null)
      .appendField('ID_3')
      .appendField(new Blockly.FieldTextInput('ID3'), 'ID3');
this.appendValueInput('TEXT4')
      .setCheck(null)
      .appendField('ID_4')
      .appendField(new Blockly.FieldTextInput('ID4'), 'ID4');
this.appendValueInput('TEXT5')
       .setCheck(null)
       .appendField('ID_5')
       .appendField(new Blockly.FieldTextInput('ID5'), 'ID5');
      }
};

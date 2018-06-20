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


Blockly.Blocks['sensebox_sensor_temp_hum'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_temp_hum);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.senseBox_value)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_temp,"Temperature"], [Blockly.Msg.senseBox_hum,"Humidity"]]), "NAME");
    this.setOutput(true, Blockly.Types.DECIMAL.output);
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip(Blockly.Msg.senseBox_temp_hum_tip);
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/diy_umweltstation/temp_und_luftfeuchte.html');
  },
  getBlockType: function() {
    return Blockly.Types.DECIMAL;
  },
};

Blockly.Blocks['sensebox_sensor_uv_light'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_uv_light);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.senseBox_value)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_uv,"UvIntensity"], [Blockly.Msg.senseBox_light,"Illuminance"]]), "NAME");
    this.setOutput(true, Blockly.Types.DECIMAL.output);
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip(Blockly.Msg.senseBox_uv_light_tip);
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/diy_umweltstation/temp_und_luftfeuchte.html');
  },
  getBlockType: function() {
    return Blockly.Types.DECIMAL;
  },
};

/*
BMX055 Three differen Blocks for Accelerometer, Gyroscope, Compass
*/

Blockly.Blocks['sensebox_sensor_bmx055_accelerometer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_bmx055_accelerometer);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.senseBox_value)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_bmx055_x,"X"], [Blockly.Msg.senseBox_bmx055_y,"Y"]]), "NAME");
    this.setOutput(true, Blockly.Types.DECIMAL.output);
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip(Blockly.Msg.senseBox_bmx055_accelerometer_tip);
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/diy_umweltstation/temp_und_luftfeuchte.html');
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};

Blockly.Blocks['sensebox_sensor_bmx055_gyroscope'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_bmx055_gyroscope);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.senseBox_value)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_bmx055_x,"X"], [Blockly.Msg.senseBox_bmx055_y,"Y"]]), "NAME");
    this.setOutput(true, Blockly.Types.DECIMAL.output);
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip(Blockly.Msg.senseBox_bmx055_gyroscope_tip);
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/diy_umweltstation/temp_und_luftfeuchte.html');
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};

Blockly.Blocks['sensebox_sensor_bmx055_compass'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_bmx055_compass);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.senseBox_value)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_bmx055_x,"X"], [Blockly.Msg.senseBox_bmx055_y,"Y"]]), "NAME");
    this.setOutput(true, Blockly.Types.DECIMAL.output);    
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip(Blockly.Msg.senseBox_bmx055_compass_tip);
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/diy_umweltstation/temp_und_luftfeuchte.html');
  },
  getBlockType: function() {
    return Blockly.Types.DECIMAL;
  },
};

Blockly.Blocks['sensebox_sensor_sds011'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_sds011);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.senseBox_value)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_sds011_pm25,"Pm25"], [Blockly.Msg.senseBox_sds011_pm10,"Pm10"]]), "NAME")
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_sds011_serial1,"Serial1"], [Blockly.Msg.senseBox_sds011_serial2,"Serial2"]]), "SERIAL");
    this.setOutput(true, Blockly.Types.DECIMAL.output);
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip(Blockly.Msg.senseBox_sds011_tip);
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/diy_umweltstation/temp_und_luftfeuchte.html');
  },
  getBlockType: function() {
    return Blockly.Types.DECIMAL;
  },
};

Blockly.Blocks['sensebox_sensor_pressure'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_pressure);
       this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setOutput(true, Blockly.Types.DECIMAL.output);
    this.setTooltip(Blockly.Msg.senseBox_pressure_tip);
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/diy_umweltstation/luftdruck.html');
  },
  getBlockType: function() {
    return Blockly.Types.DECIMAL;
  },
};


Blockly.Blocks['sensebox_sensor_ultrasonic_ranger'] = {
  init: function() {
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
	      .appendField(Blockly.Msg.senseBox_ultrasonic)
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_ultrasonic_trigger)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "PIN_RX")
        .appendField(Blockly.Msg.senseBox_ultrasonic_echo)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "PIN_TX")
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.senseBox_ultrasonic_tip);
    this.setHelpUrl('https://sensebox.de/books');
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['sensebox_sensor_sound'] = {
  init: function() {
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_sound)
        .appendField("PIN:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.analogPins), "PIN")
        this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setHelpUrl(Blockly.Msg.senseBox_sound_tip);
    this.setTooltip('Dieser Sensor mist den Geräuschpegel.');
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
/*
----------------------------------Bees--------------------------------------------------
*/
/*
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
*/

Blockly.Blocks['sensebox_wifi'] = {
  init: function() {
    this.setTooltip(Blockly.Msg.senseBox_wifi_tip);
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
        .appendField(Blockly.Msg.senseBox_output_password)
        .appendField(new Blockly.FieldTextInput("Password"), "Password");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
        }
  };

  Blockly.Blocks['sensebox_osem_connection'] = {
    init: function() {
      this.setTooltip(Blockly.Msg.senseBox_osem_connection_tip);
      this.setHelpUrl('');
      this.setColour(Blockly.Blocks.sensebox.HUE);
      this.appendDummyInput()
          .appendField(Blockly.Msg.senseBox_osem_connection);
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_LEFT)
          .appendField("BoxID")
          .appendField(new Blockly.FieldTextInput("BoxID"), "BoxID");
      this.appendStatementInput('DO')
          .appendField(Blockly.Msg.senseBox_sensor)
          .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
          }
    };
    Blockly.Blocks['sensebox_send_to_osem'] = {
      init: function() {
        this.setTooltip(Blockly.Msg.senseBox_send_to_osem_tip);
        this.setHelpUrl('');
        this.setColour(Blockly.Blocks.sensebox.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.senseBox_send_to_osem);
        this.appendValueInput('Value')
            .setCheck(null)
            .appendField('SensorID')
            .appendField(new Blockly.FieldTextInput('SensorID'), 'SensorID');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
            }
      };

      Blockly.Blocks['sensebox_send_mobile_to_osem'] = {
        init: function() {
          this.setTooltip(Blockly.Msg.senseBox_send_mobile_to_osem_tip);
          this.setHelpUrl('');
          this.setColour(Blockly.Blocks.sensebox.HUE);
          this.appendDummyInput()
              .appendField(Blockly.Msg.senseBox_send_mobile_to_osem);
          this.appendValueInput('lat', 'Number')
              .appendField(Blockly.Msg.senseBox_gps_lat);
          this.appendValueInput('lng', 'Number')
              .appendField(Blockly.Msg.senseBox_gps_lng);
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
        .appendField(Blockly.Msg.senseBox_poti)
        .appendField("PIN:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.analogPins), "PIN")
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.senseBox_poti_tip);
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};

Blockly.Blocks['sensebox_foto'] = {
  init: function() {
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_foto)
        .appendField("PIN:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.analogPins), "PIN")
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.senseBox_foto_tip);
    this.setHelpUrl('https://sensebox.de/books');
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};
Blockly.Blocks['sensebox_rgb_led'] = {
  init: function() {
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_rgb_led)
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
    this.setTooltip(Blockly.Msg.senseBox_rgb_led_tip);
    this.setHelpUrl('https://sensebox.de/books');
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
    this.setTooltip(Blockly.Msg.senseBox_led_tip);
    this.setHelpUrl('https://sensebox.de/books');
  }
};

Blockly.Blocks['sensebox_button'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_button)
        .appendField("PIN:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "PIN");
    this.setOutput(true, Blockly.Types.BOOLEAN.output);
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip(Blockly.Msg.senseBox_button_tip);
    this.setHelpUrl('https://sensebox.de/books');
  },
  getBlockType: function() {
    return Blockly.Types.BOOLEAN;
  },
};
Blockly.Blocks['sensebox_piezo'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_piezo)
        .appendField("PIN:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "PIN")
        .appendField(Blockly.Msg.senseBox_basic_state)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_on, "HIGH"], [Blockly.Msg.senseBox_off, "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip(Blockly.Msg.senseBox_piezo_tip);
    this.setHelpUrl('https://sensebox.de/books');
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
    this.setTooltip(Blockly.Msg.senseBox_serial_tip);
    this.setHelpUrl('https://sensebox.de/books');
  }
};
Blockly.Blocks['sensebox_sd_open_file'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_sd_open_file)
        .setAlign(Blockly.ALIGN_LEFT)
        .appendField(filename);
    this.appendStatementInput('SD')
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip(Blockly.Msg.senseBox_output_safetosd_tip);
    this.setHelpUrl('https://sensebox.de/books');
  }
};

Blockly.Blocks['sensebox_sd_create_file'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_sd_create_file)
        .setAlign(Blockly.ALIGN_LEFT)
        .appendField(Blockly.Msg.senseBox_output_filename)
        .appendField( new Blockly.FieldTextInput('Filename'), 'Filename');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip(Blockly.Msg.senseBox_output_safetosd_tip);
    this.setHelpUrl('https://sensebox.de/books');
  }
};

Blockly.Blocks['sensebox_sd_write_file'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_sd_write_file)
        .setAlign(Blockly.ALIGN_LEFT);
    this.appendValueInput('DATA')
        .setCheck(null);
    this.appendDummyInput('CheckboxText')
        .appendField(Blockly.Msg.senseBox_output_linebreak)
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'linebreak');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip(Blockly.Msg.senseBox_output_safetosd_tip);
    this.setHelpUrl('https://sensebox.de/books');
  }
};

/*senseBox Display Blocks*/

Blockly.Blocks['sensebox_display_beginDisplay'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_display_beginDisplay)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip(Blockly.Msg.senseBox_display_beginDisplay_tip);
    this.setHelpUrl('https://sensebox.de/books');
  }
};

Blockly.Blocks['sensebox_display_clearDisplay'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_display_clearDisplay)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip(Blockly.Msg.senseBox_display_clearDisplay_tip);
    this.setHelpUrl('https://sensebox.de/books');
  }
};

Blockly.Blocks['sensebox_display_printDisplay'] = {
  init: function() {
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_display_printDisplay)
        .appendField(Blockly.Msg.senseBox_display_color)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_display_white, "WHITE,BLACK"], [Blockly.Msg.senseBox_display_black, "BLACK,WHITE"]]), "COLOR");
    this.appendValueInput("SIZE", 'Number')
        .appendField(Blockly.Msg.senseBox_display_setSize);
    this.appendValueInput("X", 'Number')
            .appendField(Blockly.Msg.senseBox_display_printDisplay_x);
    this.appendValueInput("Y", 'Number')
            .appendField(Blockly.Msg.senseBox_display_printDisplay_y);   
    this.appendValueInput('printDisplay')
        .appendField(Blockly.Msg.senseBox_display_printDisplay_value)
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.senseBox_display_printDisplay_tip);
    this.setHelpUrl('https://sensebox.de/books');
  }
};

Blockly.Blocks['sensebox_display_plotDisplay'] = {
  init: function() {
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_display_plotDisplay)
    this.appendValueInput("YLabel", 'Text')
        .appendField(Blockly.Msg.senseBox_display_plotYLabel);
    this.appendValueInput("XLabel", 'Text')
        .appendField(Blockly.Msg.senseBox_display_plotXLabel);
    this.appendValueInput("XRange", 'Number')
            .appendField(Blockly.Msg.senseBox_display_plotXRange);
    this.appendValueInput("YRange", 'Number')
            .appendField(Blockly.Msg.senseBox_display_plotYRange);
    this.appendValueInput("XTick", 'Number')
            .appendField(Blockly.Msg.senseBox_display_plotXTick);
    this.appendValueInput("YTick", 'Number')
            .appendField(Blockly.Msg.senseBox_display_plotYTick);
    this.appendValueInput("TimeFrame", 'Number')
            .appendField(Blockly.Msg.senseBox_display_plotTimeFrame);     
    this.appendValueInput('plotDisplay')
        .appendField(Blockly.Msg.senseBox_display_printDisplay_value)
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.senseBox_display_printDisplay_tip);
    this.setHelpUrl('https://sensebox.de/books');
  }
};

Blockly.Blocks['sensebox_display_show'] = {
  init: function() {
    
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.sensebox_display_show);
    this.appendStatementInput('SHOW');
    this.setTooltip(Blockly.Msg.sensebox_display_show_tip);
    this.setHelpUrl('');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
        }
  };

  //---GPS---//

  Blockly.Blocks['sensebox_gps_begin'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.senseBox_gps_begin)
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.sensebox.HUE);
      this.setTooltip(Blockly.Msg.senseBox_gps_begin_tip);
      this.setHelpUrl('https://sensebox.de/books');
    }
  };

  Blockly.Blocks['sensebox_gps_getValues'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.senseBox_gps_getValues);
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_gps_lat,"Latitude"], [Blockly.Msg.senseBox_gps_lng,"Longitude"], [Blockly.Msg.senseBox_gps_alt,"Altitude"], [Blockly.Msg.senseBox_gps_speed, "Speed"]]), "Values");
      this.setOutput(true, Blockly.Types.DECIMAL.output);
      this.setColour(Blockly.Blocks.sensebox.HUE);
      this.setTooltip(Blockly.Msg.senseBox_gps_getValues_tip);
      this.setHelpUrl('https://edu.books.sensebox.de/de/');
    },
    getBlockType: function() {
        return Blockly.Types.DECIMAL;
      },
  };

  Blockly.Blocks['sensebox_interval_timer'] = {
    init: function() {
      this.setTooltip(Blockly.Msg.senseBox_interval_timer_tip);
      this.setHelpUrl('');
      this.setColour(Blockly.Blocks.sensebox.HUE);
      this.appendDummyInput()
          .appendField(Blockly.Msg.senseBox_interval_timer);
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_LEFT)
          .appendField(Blockly.Msg.senseBox_interval)
          .appendField(new Blockly.FieldTextInput("time"), "interval");
      this.appendStatementInput('DO')
          .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
          }
    };
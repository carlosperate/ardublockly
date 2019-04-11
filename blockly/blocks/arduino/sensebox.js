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

var wifiDepend = null;
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
    this.setOutput(true, Blockly.Types.NUMBER.output);
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
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_light,"Illuminance"], [Blockly.Msg.senseBox_uv,"UvIntensity"]]), "NAME");
    this.setOutput(true, Blockly.Types.NUMBER.output);
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
        .setAlign(Blockly.ALIGN_LEFT)
        .appendField(Blockly.Msg.senseBox_bmx055_accelerometer_direction)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_bmx055_accelerometer_direction_x,"X"], [Blockly.Msg.senseBox_bmx055_accelerometer_direction_y,"Y"], [Blockly.Msg.senseBox_bmx055_accelerometer_direction_z,"Z"], [Blockly.Msg.senseBox_bmx055_accelerometer_direction_total,"Total"]]), "VALUE");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_LEFT)
        .appendField(Blockly.Msg.senseBox_bmx055_accelerometer_range)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_bmx055_accelerometer_range_2g,"0x3"], [Blockly.Msg.senseBox_bmx055_accelerometer_range_4g,"0x5"], [Blockly.Msg.senseBox_bmx055_accelerometer_range_8g,"0x8"], [Blockly.Msg.senseBox_bmx055_accelerometer_range_16g,"0x0C"]]), "RANGE");
    this.setOutput(true, Blockly.Types.NUMBER.output);
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
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_bmx055_x,"X"], [Blockly.Msg.senseBox_bmx055_y,"Y"]]), "VALUE");
    this.setOutput(true, Blockly.Types.NUMBER.output);
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
        .appendField(Blockly.Msg.senseBox_sds011_dimension)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_sds011_serial1,"Serial1"], [Blockly.Msg.senseBox_sds011_serial2,"Serial2"]]), "SERIAL");
    this.setOutput(true, Blockly.Types.NUMBER.output);
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
    var dropdownOptions = [[Blockly.Msg.senseBox_pressure,"Pressure"], [Blockly.Msg.senseBox_temp,"Temperature"], [Blockly.Msg.senseBox_gps_alt,"Altitude"]];
    var dropdown = new Blockly.FieldDropdown(dropdownOptions, function(option) {
      var input = (option == 'Pressure') || (option ==  'Temperature') || (option == 'Altitude');
      this.sourceBlock_.updateShape_(input);
      });
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_pressure_sensor);
       this.setOutput(true, "Number");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.senseBox_value)
        .appendField(dropdown, "NAME");
        /*.appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_pressure,"Pressure"], [Blockly.Msg.senseBox_temp,"Temperature"], [Blockly.Msg.senseBox_gps_alt,"Altitude"]]), function(option) {
          var input = (option == 'Pressure') || (option ==  'Temperature') || (option == 'Altitude');
          this.sourceBlock_.updateShape_(input);
          }, "NAME");*/
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.senseBox_pressure_tip);
    this.setHelpUrl('https://edu.books.sensebox.de/de/projekte/diy_umweltstation/luftdruck.html');
  },
  /**
   * Parse XML to restore the number of pins available.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   
  domToMutation: function(xmlElement) {
    var input = (xmlElement.getAttribute('port'));
    
  },*
  /**
   * Create XML to represent number of pins selection.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var input = this.getFieldValue('NAME');
    this.updateShape_(input);
    container.setAttribute('NAME', input);
    return container;
  },
  /**
   * Modify this block to have the correct number of pins available.
   * @param {boolean}
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    var extraFieldExist = this.getFieldValue('referencePressure');
    console.log(extraFieldExist);
    var input = this.getFieldValue('NAME');
    if (input == 'Altitude' && extraFieldExist == null){
      console.log('update shape');
      this.appendDummyInput('extraField')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.senseBox_pressure_referencePressure)
        .appendField(new Blockly.FieldTextInput("1013"), "referencePressure")
        .appendField(Blockly.Msg.senseBox_pressure_referencePressure_dim);
    }
  
    if ((input == 'Pressure' || input == 'Temperature') && extraFieldExist != null){
        this.removeInput('extraField');
    }  
   },
  getBlockType: function() {
    return Blockly.Types.LARGE_NUMBER;
  },
};


Blockly.Blocks['sensebox_sensor_ultrasonic_ranger'] = {
  init: function() {

    var dropdownOptions = [[Blockly.Msg.senseBox_ultrasonic_port_A, 'A'],
    [Blockly.Msg.senseBox_ultrasonic_port_B, 'B'],[Blockly.Msg.senseBox_ultrasonic_port_C, 'C']];
    var dropdown = new Blockly.FieldDropdown(dropdownOptions, function(option) {
    var input = (option == 'A') || (option ==  'B') || (option == 'C');
    this.sourceBlock_.updateShape_(input);
    });

    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_ultrasonic)
        .appendField(dropdown, "port");
    this.appendDummyInput('TrigEcho')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.senseBox_ultrasonic_trigger)
        .appendField(new Blockly.FieldDropdown(
        Blockly.Arduino.Boards.selected.digitalPins), 'ultrasonic_trigger')
        .appendField(Blockly.Msg.senseBox_ultrasonic_echo)
        .appendField(new Blockly.FieldDropdown(
          Blockly.Arduino.Boards.selected.digitalPins), 'ultrasonic_echo');
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.senseBox_ultrasonic_tip);
    this.setHelpUrl('https://sensebox.de/books');
  },
  /**
   * Parse XML to restore the number of pins available.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   
  domToMutation: function(xmlElement) {
    var input = (xmlElement.getAttribute('port'));
    
  },*
  /**
   * Create XML to represent number of pins selection.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var input = this.getFieldValue('port');
    this.updateShape_(input);
    container.setAttribute("port", input);
    return container;
  },
  /**
   * Modify this block to have the correct number of pins available.
   * @param {boolean}
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    var input = this.getFieldValue('port');
    switch (input){
      case 'A':
      this.setFieldValue('1','ultrasonic_trigger');  
      this.setFieldValue('2','ultrasonic_echo');
      break;
      case 'B':
      this.setFieldValue('3','ultrasonic_trigger');  
      this.setFieldValue('4','ultrasonic_echo');
      break;
      case 'C':
      this.setFieldValue('5','ultrasonic_trigger');  
      this.setFieldValue('6','ultrasonic_echo');
      break;
    }
   },

  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
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
        .appendField(Blockly.Msg.senseBox_wifi_connect);
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
        },
        onchange: function(e) {
          var legal = false;
          // Is the block nested in a loop?
          var block = this;
          do {
            if (this.LOOP_TYPES.indexOf(block.type) != -1) {
              legal = true;
              break;
            }
            block = block.getSurroundParent();
          } while (block);
          if (legal) {
            this.setWarningText(null);
            wifiDepend = true;
          } else {
            this.setWarningText(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING);
            wifiDepend = null;
          }
        },
        LOOP_TYPES: ['arduino_functions'],
  };

  Blockly.Blocks['sensebox_startap'] = {
    init: function() {
      this.setTooltip(Blockly.Msg.senseBox_wifi_tip);
      this.setHelpUrl('');
      this.setColour(Blockly.Blocks.sensebox.HUE);
      this.appendDummyInput()
          .appendField(Blockly.Msg.senseBox_wifi_startap);
      this.appendDummyInput()
          .setAlign(Blockly.ALIGN_LEFT)
          .appendField("SSID")
          .appendField(new Blockly.FieldTextInput("SSID"), "SSID");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    }
  };

  Blockly.Blocks['sensebox_ip_address'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.senseBox_ip_address);
      this.setTooltip(Blockly.Msg.senseBox_ip_address_tip);
      this.setHelpUrl('');
      this.setOutput(true, Blockly.Types.TEXT.output);
      this.setColour(Blockly.Blocks.sensebox.HUE);
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
            },
             /**
   * Called whenever anything on the workspace changes.
   * Add warning if block is not nested inside a the correct loop.
   * @param {!Blockly.Events.Abstract} e Change event.
   * @this Blockly.Block
   */
  onchange: function(e) {
    var legal = false;
    // Is the block nested in a loop?
    var block = this;
    do {
      if (this.LOOP_TYPES.indexOf(block.type) != -1) {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);
    if (legal) {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING);
    }
  },
  LOOP_TYPES: ['sensebox_osem_connection'],
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
              },
               /**
   * Called whenever anything on the workspace changes.
   * Add warning if block is not nested inside a the correct loop.
   * @param {!Blockly.Events.Abstract} e Change event.
   * @this Blockly.Block
   */
  onchange: function(e) {
    var legal = false;
    // Is the block nested in a loop?
    var block = this;
    do {
      if (this.LOOP_TYPES.indexOf(block.type) != -1 && wifiDepend != null) {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);
    if (legal) {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING);
    }
  },
  LOOP_TYPES: ['sensebox_osem_connection'],
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
        .appendField("PIN:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPinsLED), "PIN")
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
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_button_isPressed, "isPressed"], [Blockly.Msg.senseBox_button_wasPressed, "wasPressed"], [Blockly.Msg.senseBox_button_switch, "Switch"]]), "FUNCTION")
        .appendField("PIN:")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPinsButton), "PIN");
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

/**
 * Block for Sparkfun Soil Moisture Sensor 
 * 
 * 
 */
Blockly.Blocks['sensebox_sensor_soil'] = {
  init: function() {
    var dropdownOptions = [[Blockly.Msg.senseBox_ultrasonic_port_A, 'A'],
    [Blockly.Msg.senseBox_ultrasonic_port_B, 'B'],[Blockly.Msg.senseBox_ultrasonic_port_C, 'C']];
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_soil)
        .appendField("Port:")
        .appendField(new Blockly.FieldDropdown(dropdownOptions), "Port")
        this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.senseBox_soil_tip);
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};

/**
 * Block for DS1820B Watertemperature Sensor
 * 
 * 
 */
Blockly.Blocks['sensebox_sensor_watertemperature'] = {
  init: function() {
    var dropdownOptions = [[Blockly.Msg.senseBox_ultrasonic_port_A, 'A'],
    [Blockly.Msg.senseBox_ultrasonic_port_B, 'B'],[Blockly.Msg.senseBox_ultrasonic_port_C, 'C']];
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_watertemperature)
        .appendField("Port:")
        .appendField(new Blockly.FieldDropdown(dropdownOptions), "Port")
        this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.senseBox_watertemperature_tip);
  },
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
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
        .appendField(
         new Blockly.FieldInstance('file',Blockly.Msg.sensebox_sd_filename,false, true, false),'Filename');
    this.appendStatementInput('SD')
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.setTooltip(Blockly.Msg.senseBox_output_safetosd_tip);
    this.setHelpUrl('https://sensebox.de/books');
  },
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    var instanceName = this.getFieldValue('Filename')
    if (Blockly.Instances.isInstancePresent(instanceName, 'file', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid stepper config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.senseBox_SD_COMPONENT).replace(
                '%2', Blockly.Msg.sensebox_sd_filename));
    }
  }
};

Blockly.Blocks['sensebox_sd_create_file'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_sd_create_file)
        .setAlign(Blockly.ALIGN_LEFT)
        .appendField(Blockly.Msg.senseBox_output_filename)
        .appendField( new Blockly.FieldInstance('file',Blockly.Msg.sensebox_sd_filename,true, true, false),'Filename');
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
  },
  /**
   * Called whenever anything on the workspace changes.
   * Add warning if block is not nested inside a the correct loop.
   * @param {!Blockly.Events.Abstract} e Change event.
   * @this Blockly.Block
   */
  onchange: function(e) {
    var legal = false;
    // Is the block nested in a loop?
    var block = this;
    do {
      if (this.LOOP_TYPES.indexOf(block.type) != -1) {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);
    if (legal) {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING);
    }
  },
  LOOP_TYPES: ['sensebox_sd_open_file'],
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
  init: function(block) {
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_display_printDisplay);
    this.appendDummyInput()
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
  },
  /**
   * Called whenever anything on the workspace changes.
   * Add warning if block is not nested inside a the correct loop.
   * @param {!Blockly.Events.Abstract} e Change event.
   * @this Blockly.Block
   */
  onchange: function(e) {
    var legal = false;
    // Is the block nested in a loop?
    var block = this;
    do {
      if (this.LOOP_TYPES.indexOf(block.type) != -1) {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);
    if (legal) {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING);
    }
  },
  LOOP_TYPES: ['sensebox_display_show'],
};


Blockly.Blocks['sensebox_display_plotDisplay'] = {
  init: function() {
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.senseBox_display_plotDisplay)
    this.appendValueInput("Title", 'Text')
        .appendField(Blockly.Msg.senseBox_display_plotTitle);
    this.appendValueInput("YLabel", 'Text')
        .appendField(Blockly.Msg.senseBox_display_plotYLabel);
    this.appendValueInput("XLabel", 'Text')
        .appendField(Blockly.Msg.senseBox_display_plotXLabel);
    this.appendValueInput("XRange1", 'Number')
            .appendField(Blockly.Msg.senseBox_display_plotXRange1);
    this.appendValueInput("XRange2", 'Number')
            .appendField(Blockly.Msg.senseBox_display_plotXRange2)
    this.appendValueInput("YRange1", 'Number')
            .appendField(Blockly.Msg.senseBox_display_plotYRange1);
    this.appendValueInput("YRange2", 'Number')
            .appendField(Blockly.Msg.senseBox_display_plotYRange2);
    this.setInputsInline(false);
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
  },
  /**
   * Called whenever anything on the workspace changes.
   * Add warning if block is not nested inside a the correct loop.
   * @param {!Blockly.Events.Abstract} e Change event.
   * @this Blockly.Block
   */
  onchange: function(e) {
    var legal = false;
    // Is the block nested in a loop?
    var block = this;
    do {
      if (this.LOOP_TYPES.indexOf(block.type) != -1) {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);
    if (legal) {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING);
    }
  },
  LOOP_TYPES: ['sensebox_display_show'],
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

Blockly.Blocks['sensebox_display_fillCircle'] = {
  init: function () {
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.sensebox_display_fillCircle);
    this.appendValueInput('X')
        .appendField(Blockly.Msg.senseBox_display_printDisplay_x)
        .setCheck(Blockly.Types.NUMBER.checkList); 
    this.appendValueInput('Y')
        .appendField(Blockly.Msg.senseBox_display_printDisplay_y)
        .setCheck(Blockly.Types.NUMBER.checkList);     
    this.appendValueInput('Radius')
        .appendField(Blockly.Msg.sensebox_display_fillCircle_radius)
        .setCheck(Blockly.Types.NUMBER.checkList);
    this.appendDummyInput('fill')
        .appendField(Blockly.Msg.senseBox_display_filled)
        .appendField(new Blockly.FieldCheckbox("TRUE"), "FILL");
    this.setInputsInline(false);       
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);   
    },
    /**
   * Called whenever anything on the workspace changes.
   * Add warning if block is not nested inside a the correct loop.
   * @param {!Blockly.Events.Abstract} e Change event.
   * @this Blockly.Block
   */
  onchange: function(e) {
    var legal = false;
    // Is the block nested in a loop?
    var block = this;
    do {
      if (this.LOOP_TYPES.indexOf(block.type) != -1) {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);
    if (legal) {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING);
    }
  },
  LOOP_TYPES: ['sensebox_display_show'],
};

Blockly.Blocks['sensebox_display_drawRectangle'] = {
  init: function () {
    this.setColour(Blockly.Blocks.sensebox.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.sensebox_display_drawRectangle);
    this.appendValueInput('X')
        .appendField(Blockly.Msg.senseBox_display_printDisplay_x)
        .setCheck(Blockly.Types.NUMBER.checkList); 
    this.appendValueInput('Y')
        .appendField(Blockly.Msg.senseBox_display_printDisplay_y)
        .setCheck(Blockly.Types.NUMBER.checkList);     
    this.appendValueInput('width')
        .appendField(Blockly.Msg.sensebox_display_drawRectangle_width)
        .setCheck(Blockly.Types.NUMBER.checkList);
    this.appendValueInput('height')
        .appendField(Blockly.Msg.sensebox_display_drawRectangle_height)
        .setCheck(Blockly.Types.NUMBER.checkList);  
    this.appendDummyInput('fill')
        .appendField(Blockly.Msg.senseBox_display_filled)
        .appendField(new Blockly.FieldCheckbox("TRUE"), "FILL"); 
    this.setInputsInline(false);           
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);   
    },
    /**
   * Called whenever anything on the workspace changes.
   * Add warning if block is not nested inside a the correct loop.
   * @param {!Blockly.Events.Abstract} e Change event.
   * @this Blockly.Block
   */
  onchange: function(e) {
    var legal = false;
    // Is the block nested in a loop?
    var block = this;
    do {
      if (this.LOOP_TYPES.indexOf(block.type) != -1) {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);
    if (legal) {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING);
    }
  },
  LOOP_TYPES: ['sensebox_display_show'],
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
          .appendField(Blockly.Msg.senseBox_value)
          .appendField(new Blockly.FieldDropdown([[Blockly.Msg.senseBox_gps_lat,"Latitude"], [Blockly.Msg.senseBox_gps_lng,"Longitude"], [Blockly.Msg.senseBox_gps_alt,"Altitude"], [Blockly.Msg.senseBox_gps_speed, "Speed"], [Blockly.Msg.senseBox_gps_date, "Date"], [Blockly.Msg.senseBox_gps_time, "Time"]]), "Values");
      this.setOutput(true, Blockly.Types.NUMBER.output);
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
          .appendField(new Blockly.FieldTextInput("1000"), "interval")
          .appendField(Blockly.Msg.senseBox_interval);
      this.appendStatementInput('DO')
          .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
          }
    };

    /** 
     * Webserver Blocks By Lucas Steinmann
     *  */ 

    Blockly.Blocks['sensebox_initialize_http_server'] = {
      init: function() {
        this.setTooltip(Blockly.Msg.senseBox_init_http_server_tip);
        this.setHelpUrl('https://sensebox.de/books');
        this.setColour(Blockly.Blocks.sensebox.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.senseBox_init_http_server);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_LEFT)
            .appendField("Port")
            .appendField(new Blockly.FieldNumber(80), "Port");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
      },
      onchange: function(e) {
        var legal = false;
        // Is the block nested in a loop?
        var block = this;
        do {
          if (this.LOOP_TYPES.indexOf(block.type) != -1) {
            legal = true;
            break;
          }
          block = block.getSurroundParent();
        } while (block);
        if (legal) {
          this.setWarningText(null);
          wifiDepend = true;
        } else {
          this.setWarningText(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING);
          wifiDepend = null;
        }
      },
      LOOP_TYPES: ['arduino_functions'],
    };
    
    
     Blockly.Blocks['sensebox_http_on_client_connect'] = {
      init: function() {
        this.setTooltip(Blockly.Msg.senseBox_http_on_client_connect_tip);
        this.setColour(Blockly.Blocks.sensebox.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.senseBox_http_on_client_connect);
        this.appendStatementInput('ON_CONNECT');
        this.setHelpUrl('https://sensebox.de/books');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
      }
    };
    
    
     Blockly.Blocks['sensebox_http_method'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(Blockly.Msg.senseBox_http_method)
        this.setOutput(true, Blockly.Types.TEXT.output);
        this.setColour(Blockly.Blocks.sensebox.HUE);
        this.setTooltip(Blockly.Msg.senseBox_http_method_tip);
        this.setHelpUrl('https://sensebox.de/books');
      },
      getBlockType: function() {
        return Blockly.Types.TEXT;
      },
    };
    
    
     Blockly.Blocks['sensebox_http_uri'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(Blockly.Msg.senseBox_http_uri)
        this.setOutput(true, Blockly.Types.TEXT.output);
        this.setColour(Blockly.Blocks.sensebox.HUE);
        this.setTooltip(Blockly.Msg.senseBox_http_uri_tip);
        this.setHelpUrl('https://sensebox.de/books');
      },
      getBlockType: function() {
        return Blockly.Types.TEXT;
      },
    };
    
    
     Blockly.Blocks['sensebox_http_protocol_version'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(Blockly.Msg.senseBox_http_protocol_version)
        this.setOutput(true, Blockly.Types.TEXT.output);
        this.setColour(Blockly.Blocks.sensebox.HUE);
        this.setTooltip(Blockly.Msg.senseBox_http_protocol_version_tip);
        this.setHelpUrl('https://sensebox.de/books');
      },
      getBlockType: function() {
        return Blockly.Types.TEXT;
      },
    };
    
    
     Blockly.Blocks['sensebox_http_user_agent'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(Blockly.Msg.senseBox_http_user_agent)
        this.setOutput(true, Blockly.Types.TEXT.output);
        this.setColour(Blockly.Blocks.sensebox.HUE);
        this.setTooltip(Blockly.Msg.senseBox_http_user_agent_tip);
        this.setHelpUrl('https://sensebox.de/books');
      },
      getBlockType: function() {
        return Blockly.Types.TEXT;
      },
    };
    
     Blockly.Blocks['sensebox_generate_html_doc'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(Blockly.Msg.senseBox_html_document);
        this.appendValueInput('HEADER')
            .setAlign(Blockly.ALIGN_LEFT)
            .setCheck(Blockly.Types.TEXT.checkList)
            .appendField(Blockly.Msg.senseBox_html_header);
        this.appendValueInput('BODY')
            .setAlign(Blockly.ALIGN_LEFT)
            .setCheck(Blockly.Types.TEXT.checkList)
            .appendField(Blockly.Msg.senseBox_html_body);
        this.setInputsInline(false);
        this.setOutput(true, Blockly.Types.TEXT.output);
        this.setColour(Blockly.Blocks.sensebox.HUE);
        this.setTooltip(Blockly.Msg.senseBox_html_document_tip);
        this.setHelpUrl('https://sensebox.de/books');
      },
    };
    
     Blockly.Blocks['sensebox_generate_http_succesful_response'] = {
      init: function() {
        this.setColour(Blockly.Blocks.sensebox.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.senseBox_http_success);
        this.appendDummyInput()
            .appendField(Blockly.Msg.senseBox_http_success_l2);
        this.appendValueInput('CONTENT')
            .appendField(Blockly.Msg.senseBox_http_success_buildhtml)
            .setCheck(Blockly.Types.TEXT.checkList);
        this.setTooltip(Blockly.Msg.senseBox_http_success_tip);
        this.setInputsInline(false);
        this.setHelpUrl('https://sensebox.de/books');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
      }
    };
    
     Blockly.Blocks['sensebox_generate_http_not_found_response'] = {
      init: function() {
        this.setTooltip(Blockly.Msg.senseBox);
        this.setColour(Blockly.Blocks.sensebox.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.senseBox_http_not_found);
        this.setTooltip(Blockly.Msg.senseBox_http_not_found_tip);
        this.setHelpUrl('https://sensebox.de/books');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
      }
    };
    
    
     Blockly.Blocks['sensebox_general_html_tag'] = {
      init: function() {
        this.setTooltip(Blockly.Msg.senseBox_html_general_tag_tip);
        this.setColour(Blockly.Blocks.sensebox.HUE);
        this.appendDummyInput()
              .appendField("<")
              .appendField(new Blockly.FieldTextInput("Tag"), "TAG")
              .appendField(">");
        this.appendValueInput('DO0')
            .setCheck(Blockly.Types.TEXT.checkList);
        this.setInputsInline(false);
        this.setOutput(true, Blockly.Types.TEXT.output);
        this.setHelpUrl('https://sensebox.de/books');
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setMutator(new Blockly.Mutator(['additional_child']));
        var thisBlock = this;
        this.additionalChildCount_ = 0;
      },
      /**
       * Create XML to represent the number of else-if and else inputs.
       * @return {Element} XML storage element.
       * @this Blockly.Block
       */
      mutationToDom: function() {
        if (!this.additionalChildCount_) {
          return null;
        }
        var container = document.createElement('mutation');
        if (this.additionalChildCount_) {
          container.setAttribute('add_child', this.additionalChildCount_);
        }
        return container;
      },
      /**
       * Parse XML to restore the else-if and else inputs.
       * @param {!Element} xmlElement XML storage element.
       * @this Blockly.Block
       */
      domToMutation: function(xmlElement) {
        this.additionalChildCount_ = parseInt(xmlElement.getAttribute('add_child'), 10) || 0;
        this.updateShape_();
      },
      /**
       * Populate the mutator's dialog with this block's components.
       * @param {!Blockly.Workspace} workspace Mutator's workspace.
       * @return {!Blockly.Block} Root block in mutator.
       * @this Blockly.Block
       */
      decompose: function(workspace) {
        var containerBlock = workspace.newBlock('first_child');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;
        for (var i = 1; i <= this.additionalChildCount_; i++) {
          var elseifBlock = workspace.newBlock('additional_child');
          elseifBlock.initSvg();
          connection.connect(elseifBlock.previousConnection);
          connection = elseifBlock.nextConnection;
        }
        return containerBlock;
      },
      /**
       * Reconfigure this block based on the mutator dialog's components.
       * @param {!Blockly.Block} containerBlock Root block in mutator.
       * @this Blockly.Block
       */
      compose: function(containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        // Count number of inputs.
        this.additionalChildCount_ = 0;
        var statementConnections = [null];
        var elseStatementConnection = null;
        while (clauseBlock) {
          switch (clauseBlock.type) {
            case 'additional_child':
              this.additionalChildCount_++;
              statementConnections.push(clauseBlock.statementConnection_);
              break;
            default:
              throw 'Unknown block type.';
          }
          clauseBlock = clauseBlock.nextConnection &&
              clauseBlock.nextConnection.targetBlock();
        }
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 1; i <= this.additionalChildCount_; i++) {
          Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
        }
      },
      /**
       * Store pointers to any connected child blocks.
       * @param {!Blockly.Block} containerBlock Root block in mutator.
       * @this Blockly.Block
       */
      saveConnections: function(containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        var i = 1;
        while (clauseBlock) {
          switch (clauseBlock.type) {
            case 'additional_child':
              var inputDo = this.getInput('DO' + i);
              clauseBlock.statementConnection_ =
                  inputDo && inputDo.connection.targetConnection;
              i++;
              break;
            default:
              throw 'Unknown block type.';
          }
          clauseBlock = clauseBlock.nextConnection &&
              clauseBlock.nextConnection.targetBlock();
        }
      },
      /**
       * Modify this block to have the correct number of inputs.
       * @private
       * @this Blockly.Block
       */
      updateShape_: function() {
        // Delete everything.
        var i = 1;
        while (this.getInput('DO' + i)) {
          this.removeInput('DO' + i);
          i++;
        }
        // Rebuild block.
        for (var i = 1; i <= this.additionalChildCount_; i++) {
          this.appendValueInput('DO' + i, Blockly.Arduino.ORDER_NONE);
        }
      }
    };
    
     Blockly.Blocks['first_child'] = {
      init: function() {
        this.setColour(Blockly.Blocks.logic.HUE);
        this.appendDummyInput()
            .appendField("<Tag>");
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.senseBox_tag_first_mutator_tip);
        this.contextMenu = false;
      }
    };
    
    
     Blockly.Blocks['additional_child'] = {
      init: function() {
        this.setColour(Blockly.Blocks.logic.HUE);
        this.appendDummyInput()
            .appendField("<Tag>");
        this.setPreviousStatement(true);
        this.setInputsInline(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.senseBox_tag_optional_mutator_tip);
        this.contextMenu = false;
      }
    };

    // Additional Webserver Blocks

    Blockly.Blocks['sensebox_web_readHTML'] = {
      init: function() {
        this.appendDummyInput()
            .appendField(Blockly.Msg.senseBox_sd_web_readHTML)
            .setAlign(Blockly.ALIGN_LEFT);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_LEFT)
            .appendField(Blockly.Msg.sensebox_web_readHTML_filename)
            .appendField(new Blockly.FieldTextInput("index.txt"), "FILENAME");
        this.setOutput(true, Blockly.Types.TEXT.output);
        this.setColour(Blockly.Blocks.sensebox.HUE);
        this.setTooltip(Blockly.Msg.senseBox_output_safetosd_tip);
        this.setHelpUrl('https://sensebox.de/books');
      }
    };

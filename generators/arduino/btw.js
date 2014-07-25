/**
 * @fileoverview Behind The Wire Landing Gear Servo Blocks
 * @author danse@jarofdoom.co.uk Richard Fontaine
 */
'use strict';

//define blocks
if (!Blockly.Language) Blockly.Language = {};

/////////////////////////////
//      Landing Gear       //
/////////////////////////////

//Define Landing Gear UP block
Blockly.Language.landing_gear_up = {
	category:'Landing Gear',
	helpUrl:'',
	init: function(){
		this.setColour(0);
		this.appendDummyInput("")
			.appendTitle("Move landing gear up");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
	}
};

//Define Landing Gear UP code
Blockly.Arduino.landing_gear_up = function() {
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
	Blockly.Arduino.setups_['prepare_servo_lg'] = 'functions.landingGearPrepare();\n';
	var code = 'functions.landingGearUp();\n';
	return code;
}

//Define Landing Gear down block
Blockly.Language.landing_gear_down = {
	category:'Landing Gear',
	helpUrl:'',
	init: function(){
		this.setColour(0);
		this.appendDummyInput("")
			.appendTitle("Move landing gear down");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
	}
};

//Define Landing Gear down code
Blockly.Arduino.landing_gear_down = function() {
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
	Blockly.Arduino.setups_['prepare_servo_lg'] = 'functions.landingGearPrepare();\n';
	var code = 'functions.landingGearDown();\n';
	return code;
}

/////////////////////////////
//         Rudder          //
/////////////////////////////
//Define Rudder Left block
Blockly.Language.rudder_left = {
	category:'Rudder',
	helpUrl:'',
	init: function(){
		this.setColour(0);
		this.appendDummyInput("")
			.appendTitle("Move rudder Left");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
	}
};

//Define Rudder Left code
Blockly.Arduino.rudder_left = function() {
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
	Blockly.Arduino.definitions_['define_btw_global'] = 'BehindTheWire functions;\n';
	Blockly.Arduino.setups_['prepare_servo_r'] = 'functions.rudderPrepare();\n';
	var code = 'functions.rudderLeft();\n';
	return code;
}

//Define Rudder Right block
Blockly.Language.rudder_right = {
	category:'Rudder',
	helpUrl:'',
	init: function(){
		this.setColour(0);
		this.appendDummyInput("")
			.appendTitle("Move rudder Right");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
	}
};

//Define Rudder Right code
Blockly.Arduino.rudder_right = function() {
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
	Blockly.Arduino.definitions_['define_btw_global'] = 'BehindTheWire functions;\n';
	Blockly.Arduino.setups_['prepare_servo_r'] = 'functions.rudderPrepare();\n';
	var code = 'functions.rudderRight();\n';
	return code;
}

//Define Rudder Set Position block
Blockly.Language.rudder_set_position = {
	category:'Rudder',
	helpUrl:'',
	init: function(){
		this.setColour(0);
		this.appendDummyInput("")
			.appendTitle("Move Rudder to a")
			.appendTitle(new Blockly.FieldDropdown(profile.arduino_btw.rudder_angle), "ANGLE")
			.appendTitle("degrees angle");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Set the rudder position to 0-180');
	}
};

//Define Rudder Set Position code
Blockly.Arduino.rudder_set_position = function() {
	var servo_position = this.getTitleValue('ANGLE');
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
	Blockly.Arduino.definitions_['define_btw_global'] = 'BehindTheWire functions;\n';
	Blockly.Arduino.setups_['prepare_servo_r'] = 'functions.rudderPrepare();\n';
	//var servo_position =
	//	Blockly.Arduino.valueToCode(this, 'RUDDER_POSITION', Blockly.Arduino.ORDER_ATOMIC) ||
	//	'90';
	var code = 'functions.rudderSetPosition(' + servo_position + ');\n';
	return code;
}

/////////////////////////////
//          LEDs           //
/////////////////////////////
Blockly.Language.navigation_lights = {
	category: 'Navigation Lights',
	helpUrl: '',
	init: function() {
		this.setColour(230);
		this.appendDummyInput("")
			.appendTitle("Set  ")
			.appendTitle(new Blockly.FieldDropdown(profile.arduino_btw.nav_lights), "LED")
			.appendTitle("Light ")
			.appendTitle(new Blockly.FieldDropdown([["ON", "ON"], ["OFF", "OFF"]]), "STATE");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
  }
};

Blockly.Arduino.navigation_lights = function() {
  var dropdown_light = this.getTitleValue('LED');
  var dropdown_state = this.getTitleValue('STATE');
  Blockly.Arduino.setups_['setup_output_'+dropdown_light] = 'pinMode('+dropdown_light+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_light+','+dropdown_state+');\n'
  return code;
}

/////////////////////////////
//         Buttons         //
/////////////////////////////
Blockly.Language.read_button = {
	category: 'Buttons',
	helpUrl: '',
	init: function() {
		this.setColour(230);
		this.appendDummyInput("")
			.appendTitle(new Blockly.FieldDropdown(profile.arduino_btw.buttons), "Button")
			.appendTitle(" button is ON?");
		this.setOutput(true, Boolean);
		this.setTooltip('');
	}
};

Blockly.Arduino.read_button = function() {
	var dropdown_button = this.getTitleValue('Button');
	Blockly.Arduino.setups_['setup_input_'+dropdown_button] = 'pinMode('+dropdown_button+', INPUT);';
	var code = 'digitalRead('+dropdown_button+')';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Language.pot = {
	category: 'Buttons',
	helpUrl: '',
	init: function() {
		this.setColour(230);
		this.appendDummyInput("")
			.appendTitle("Read Knob")
		this.setOutput(true, Number);
		this.setTooltip('Return value between 0 and 1024');
	}
};

Blockly.Arduino.pot = function() {
	//var dropdown_analogue = this.getTitleValue('THROTTLE');
	//Blockly.Arduino.setups_['setup_input_'+dropdown_analogue] = 'pinMode('+dropdown_analogue+', INPUT);';
	//var code = 'analogRead('+dropdown_analogue+')';
	var code = 'analogRead(Throttle)';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/////////////////////////////
//         ENGINES         //
/////////////////////////////
Blockly.Language.set_engine_speed = {
	category: 'Engines',
	helpUrl: '',
	init: function() {
		this.setColour(190);
		this.appendValueInput("ENGINE_SPEED", Number)
			.appendTitle("Set  ")
			.appendTitle(new Blockly.FieldDropdown(profile.arduino_btw.engines), "ENGINE")
			.appendTitle("speed to")
			.setCheck(Number);
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
  }
};

Blockly.Arduino.set_engine_speed = function() {
	var dropdown_engine = this.getTitleValue('ENGINE');
	var engine_speed = Blockly.Arduino.valueToCode(this, 'ENGINE_SPEED', Blockly.Arduino.ORDER_ATOMIC) || '90';
	Blockly.Arduino.setups_['setup_output_'+dropdown_engine] = 'pinMode('+dropdown_engine+', OUTPUT);';
	var code = 'analogWrite('+dropdown_engine+', '+engine_speed+');\n'
	return code;
}

Blockly.Language.throttle = {
	category: 'Engines',
	helpUrl: '',
	init: function() {
		this.setColour(230);
		this.appendDummyInput("")
			.appendTitle("Throttle Value")
		this.setOutput(true, Number);
		this.setTooltip('Return value between 0 and 1024');
	}
};

Blockly.Arduino.throttle = function() {
	var code = 'map(analogRead(Throttle),0,1024,0,255)';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/////////////////////////////
//           WAIT          //
/////////////////////////////
Blockly.Language.wait = {
	category : 'Wait',
	helpUrl: '',
	init: function() {
		this.setColour(120);
		this.appendDummyInput("")
			.appendTitle("Wait ")
			.appendTitle(new Blockly.FieldDropdown([["1","1000"],["0.1","100"],["0.5","500"],["1.5","1500"],["2","2000"],["5","5000"],["10","10000"]]),"WAIT")
			.appendTitle(" seconds");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
	}
}

Blockly.Arduino.wait = function(){
	var dropdown_wait = this.getTitleValue("WAIT");
	var code = "delay("+dropdown_wait+");\n";
	return code;
}

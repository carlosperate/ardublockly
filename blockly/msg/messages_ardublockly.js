/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview  Ardublockly specific English strings.
 *
 * After modifying this file, either run "build.py" from the blockly directory,
 * or run (from this directory):
 * ../i18n/js_to_json.py
 * to regenerate json/{en,qqq,synonyms}.json.
 *
 * To convert all of the json files to .js files, run:
 * ../i18n/create_messages.py json/*.json
 */
'use strict';

goog.provide('Blockly.Msg.en');

goog.require('Blockly.Msg');


/**
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to message files.
 */

/**
 * Each message is preceded with a triple-slash comment that becomes the
 * message descriptor.  The build process extracts these descriptors, adds
 * them to msg/json/qqq_ardublockly.json, and they show up in the translation
 * console.
 * Note the strings have to be surrounded by single quotation marks: ''
 */

/**
 * Ardublockly Types
 */
/// Arduino Types - Character C type char
Blockly.Msg.ARD_TYPE_CHAR = 'Character';
/// Arduino Types - Text C type String
Blockly.Msg.ARD_TYPE_TEXT = 'Text';
/// Arduino Types - Boolean type
Blockly.Msg.ARD_TYPE_BOOL = 'Boolean';
/// Arduino Types - Short number C type char
Blockly.Msg.ARD_TYPE_SHORT = 'Short Number';
/// Arduino Types - Number C type integer
Blockly.Msg.ARD_TYPE_NUMBER = 'Number';
/// Arduino Types - Large number C type long integer
Blockly.Msg.ARD_TYPE_LONG = 'Large Number';
/// Arduino Types - Decimal number C type floating point
Blockly.Msg.ARD_TYPE_DECIMAL = 'Decimal';
/// Arduino Types - Double
Blockly.Msg.ARD_TYPE_DOUBLE = 'Double';
/// Arduino Types - Array
Blockly.Msg.ARD_TYPE_ARRAY = 'Array';
/// Arduino Types - Byte
Blockly.Msg.ARD_TYPE_BYTE = 'Byte';
/// Arduino Types - Null C type void
Blockly.Msg.ARD_TYPE_NULL = 'Null';
/// Arduino Types - Undefined type
Blockly.Msg.ARD_TYPE_UNDEF = 'Undefined';
/// Arduino Types - Place holder value, indicates block with type not connected
Blockly.Msg.ARD_TYPE_CHILDBLOCKMISSING = 'ChildBlockMissing';

/// Arduino Blocks
Blockly.Msg.ARD_HIGH = 'HIGH';
Blockly.Msg.ARD_LOW = 'LOW';
Blockly.Msg.ARD_ANALOGREAD = 'Read analog pin#';
Blockly.Msg.ARD_ANALOGREAD_TIP = 'Return value between 0 and 1024';
Blockly.Msg.ARD_ANALOGWRITE = 'Set analog pin#';
Blockly.Msg.ARD_ANALOGWRITE_TIP = 'Write analog value between 0 and 255 to a specific PWM Port';
Blockly.Msg.ARD_HIGHLOW_TIP = 'Set a pin state logic High or Low.';
Blockly.Msg.ARD_DIGITALREAD = 'Read digital Pin#';
Blockly.Msg.ARD_DIGITALREAD_PULLUP = 'Read digital in PULL_UP mode pin#';
Blockly.Msg.ARD_DIGITALREAD_TIP = 'Read digital value on a pin: HIGH or LOW';
Blockly.Msg.ARD_DIGITALWRITE = 'Set digital Pin#';
Blockly.Msg.ARD_WRITE_TO = 'to';
Blockly.Msg.ARD_DIGITALWRITE_TIP = 'Write digital value HIGH or LOW to a specific Port';
Blockly.Msg.ARD_BUILTIN_LED = 'Set built-in LED';
Blockly.Msg.ARD_BUILTIN_LED_TIP = 'Light on or off for the built-in LED of the Arduino';
Blockly.Msg.ARD_MKPAD_SETUP = 'Setup 4x4 Membrane Keypad (mkpad4x4) with';
Blockly.Msg.ARD_MKPAD_ROW1 = 'row 1 pin#';
Blockly.Msg.ARD_MKPAD_ROW2 = 'row 2 pin#';
Blockly.Msg.ARD_MKPAD_ROW3 = 'row 3 pin#';
Blockly.Msg.ARD_MKPAD_ROW4 = 'row 4 pin#';
Blockly.Msg.ARD_MKPAD_COL1 = 'col 1 pin#';
Blockly.Msg.ARD_MKPAD_COL2 = 'col 2 pin#';
Blockly.Msg.ARD_MKPAD_COL3 = 'col 3 pin#';
Blockly.Msg.ARD_MKPAD_COL4 = 'col 4 pin#';
Blockly.Msg.ARD_MKPAD_SETUP_TIP = 'Setup 4x4 Membrane Keypad with selected pins for 4x4 Matrix';
Blockly.Msg.ARD_MKPAD_GETKEY = 'Receive key from mkpad4x4 on row 1 pin#';
Blockly.Msg.ARD_MKPAD_GETKEY_TIP = 'Receives key pressed on a 4x4 Membrane Keypad';
Blockly.Msg.ARD_IRRECV_SETUP = 'Setup IR Remote Control with Pin#';
Blockly.Msg.ARD_IRRECV_SETUP_TIP = 'Setup of Infrared Receiver Module KY-022';
Blockly.Msg.ARD_IRRECV_READ = 'Read Value from IR Remote Control on Pin#';
Blockly.Msg.ARD_IRRECV_READ_AS = ' as variable ';
Blockly.Msg.ARD_IRRECV_READ_TIP = 'Receives Value of KY-022 Infrared Receiver Module as string';
Blockly.Msg.ARD_IRRECV_DEFAULT_NAME = 'Button#';
Blockly.Msg.ARD_RC522_SETUP = 'Setup RFID with RST Pin#';
Blockly.Msg.ARD_RC522_SETUP_SS = 'and SS Pin#';
Blockly.Msg.ARD_RC522_SETUP_TIP = 'Setup of RFID RC522 Identity Scanner Module';
Blockly.Msg.ARD_RC522_GETUID = 'RFID RC522 >> Get UID';
Blockly.Msg.ARD_RC522_GETUID_TIP = 'Reads Identification # of card or dongle with RFID RC522 Identity Scanner Module';
Blockly.Msg.ARD_RC522_ADDUID = 'RFID RC522 >> Add new UID';
Blockly.Msg.ARD_RC522_ADDUID_AS = ' as ';
Blockly.Msg.ARD_RC522_ADDUID_TIP = 'Add UID to as string e.g. A1 B2 C3 D4';
Blockly.Msg.ARD_DEFINE = 'Define';
Blockly.Msg.ARD_TONE_PIN = 'Tone PIN#';
Blockly.Msg.ARD_TONE_FREQ = 'frequency';
Blockly.Msg.ARD_TONE_PIN_TIP = 'Generate audio tones on a pin';
Blockly.Msg.ARD_NOTONE_PIN = 'No tone PIN#';
Blockly.Msg.ARD_NOTONE_PIN_TIP = 'Stop generating a tone on a pin';
Blockly.Msg.ARD_MAP = 'Map %1 fromLow %2 fromHigh %3 toLow %4 toHigh %5';
Blockly.Msg.ARD_MAP_TIP = 'Re-maps a number from one range to another.';
Blockly.Msg.ARD_FUN_RUN_SETUP = 'Arduino run first:';
Blockly.Msg.ARD_FUN_RUN_LOOP = 'Arduino loop forever:';
Blockly.Msg.ARD_FUN_RUN_TIP = 'Defines the Arduino setup() and loop() functions.';
Blockly.Msg.ARD_PIN_WARN1 = 'Pin %1 is needed for %2 as pin %3. Already used as %4.';
Blockly.Msg.ARD_SERIAL_SETUP = 'Setup';
Blockly.Msg.ARD_SERIAL_SPEED = ':  speed to';
Blockly.Msg.ARD_SERIAL_BPS = 'bps';
Blockly.Msg.ARD_SERIAL_SETUP_TIP = 'Selects the speed for a specific Serial peripheral';
Blockly.Msg.ARD_SERIAL_PRINT = 'print';
Blockly.Msg.ARD_SERIAL_PRINT_NEWLINE = 'Add new line';
Blockly.Msg.ARD_SERIAL_PRINT_TIP = 'Prints data to the console/serial port as human-readable ASCII text.';
Blockly.Msg.ARD_SERIAL_PRINT_WARN = 'A setup block for %1 must be added to the workspace to use this block!';
Blockly.Msg.ARD_SERVO_WRITE = 'Set SERVO from Pin';
Blockly.Msg.ARD_SERVO_WRITE_TO = 'to';
Blockly.Msg.ARD_SERVO_WRITE_DEG_180 = 'Degrees (0~180)';
Blockly.Msg.ARD_SERVO_WRITE_TIP = 'Set a Servo to an specified angle';
Blockly.Msg.ARD_SERVO_READ = 'Read SERVO from PIN#';
Blockly.Msg.ARD_SERVO_READ_TIP = 'Read a Servo angle';
Blockly.Msg.ARD_SR04_SETUP = 'Setup HC-SR04 with Echo Pin#';
Blockly.Msg.ARD_SR04_SETUP_AND = 'and Trigger Pin#';
Blockly.Msg.ARD_SR04_SETUP_TIP = 'Setup HC-SR04 Sensor';
Blockly.Msg.ARD_SR04_READ = 'Read HC-SR04 from Echo PIN#';
Blockly.Msg.ARD_SR04_READ_TIP = 'Read Distance using HC-SR04 module';
Blockly.Msg.ARD_DHT11_SETUP = 'Setup DHT11 Sensor with Pin#';
Blockly.Msg.ARD_DHT11_SETUP_TIP = 'Setup of DHT11 Temperatur and Humidity Sensor';
Blockly.Msg.ARD_DHT11_READT = 'Read Temperature with DHT11 from PIN#';
Blockly.Msg.ARD_DHT11_READT_TIP = 'Measures Temperatur using DHT11 Sensor';
Blockly.Msg.ARD_DHT11_READH = 'Read Humidity with DHT11 from PIN#';
Blockly.Msg.ARD_DHT11_READH_TIP = 'Measures Humidity using DHT11 Sensor';
Blockly.Msg.ARD_GY521_SETUP = 'Setup GY-521 Gyroscope with A4(SDA) | A5(SCL) pins';
Blockly.Msg.ARD_GY521_ROT = 'GY-521 >> Measure angles on ';
Blockly.Msg.ARD_GY521_ROT_TIP = 'Measures angles of x, y and z axis in degrees with GY-512 Sensor';
Blockly.Msg.ARD_GY521_T = 'GY-521 >> Read Temperatur: ';
Blockly.Msg.ARD_GY521_T_TIP = 'Reads temperatur with GY-512 Sensor';
Blockly.Msg.ARD_GY521_X = 'X: ';
Blockly.Msg.ARD_GY521_Y = 'Y: ';
Blockly.Msg.ARD_GY521_Z = 'and Z: ';
Blockly.Msg.ARD_SPI_SETUP = 'Setup';
Blockly.Msg.ARD_SPI_SETUP_CONF = 'configuration:';
Blockly.Msg.ARD_SPI_SETUP_SHIFT = 'data shift';
Blockly.Msg.ARD_SPI_SETUP_MSBFIRST = 'MSBFIRST';
Blockly.Msg.ARD_SPI_SETUP_LSBFIRST = 'LSBFIRST';
Blockly.Msg.ARD_SPI_SETUP_DIVIDE = 'clock divide';
Blockly.Msg.ARD_SPI_SETUP_MODE = 'SPI mode (idle - edge)';
Blockly.Msg.ARD_SPI_SETUP_MODE0 = '0 (Low - Falling)';
Blockly.Msg.ARD_SPI_SETUP_MODE1 = '1 (Low - Rising)';
Blockly.Msg.ARD_SPI_SETUP_MODE2 = '2 (High - Falling)';
Blockly.Msg.ARD_SPI_SETUP_MODE3 = '3 (High - Rising)';
Blockly.Msg.ARD_SPI_SETUP_TIP = 'Configures the SPI peripheral.';
Blockly.Msg.ARD_SPI_TRANS_NONE = 'none';
Blockly.Msg.ARD_SPI_TRANS_VAL = 'transfer';
Blockly.Msg.ARD_SPI_TRANS_SLAVE = 'to slave pin';
Blockly.Msg.ARD_SPI_TRANS_TIP = 'Send a SPI message to an specified slave device.';
Blockly.Msg.ARD_SPI_TRANS_WARN1 = 'A setup block for %1 must be added to the workspace to use this block!';
Blockly.Msg.ARD_SPI_TRANS_WARN2 = 'Old pin value %1 is no longer available.';
Blockly.Msg.ARD_SPI_TRANSRETURN_TIP = 'Send a SPI message to an specified slave device and get data back.';
Blockly.Msg.ARD_STEPPER_SETUP = 'Setup stepper motor';
Blockly.Msg.ARD_STEPPER_MOTOR = 'stepper motor:';
Blockly.Msg.ARD_STEPPER_DEFAULT_NAME = 'MyStepper';
Blockly.Msg.ARD_STEPPER_NUMBER_OF_PINS = 'Number of pins';
Blockly.Msg.ARD_STEPPER_TWO_PINS = '2';
Blockly.Msg.ARD_STEPPER_FOUR_PINS = '4';
Blockly.Msg.ARD_STEPPER_PIN1 = 'pin1#';
Blockly.Msg.ARD_STEPPER_PIN2 = 'pin2#';
Blockly.Msg.ARD_STEPPER_PIN3 = 'pin3#';
Blockly.Msg.ARD_STEPPER_PIN4 = 'pin4#';
Blockly.Msg.ARD_STEPPER_REVOLVS = 'how many steps per revolution';
Blockly.Msg.ARD_STEPPER_SPEED = 'set speed (rpm) to';
Blockly.Msg.ARD_STEPPER_SETUP_TIP = 'Configures a stepper motor pinout and other settings.';
Blockly.Msg.ARD_STEPPER_STEP = 'move stepper';
Blockly.Msg.ARD_STEPPER_STEPS = 'steps';
Blockly.Msg.ARD_STEPPER_STEP_TIP = 'Turns the stepper motor a specific number of steps.';
Blockly.Msg.ARD_STEPPER_COMPONENT = 'stepper';
Blockly.Msg.ARD_COMPONENT_WARN1 = 'A %1 configuration block with the same %2 name must be added to use this block!';
Blockly.Msg.ARD_TIME_DELAY = 'wait';
Blockly.Msg.ARD_TIME_MS = 'milliseconds';
Blockly.Msg.ARD_TIME_DELAY_TIP = 'Wait specific time in milliseconds';
Blockly.Msg.ARD_TIME_DELAY_MICROS = 'microseconds';
Blockly.Msg.ARD_TIME_DELAY_MICRO_TIP = 'Wait specific time in microseconds';
Blockly.Msg.ARD_TIME_MILLIS = 'current elapsed Time (milliseconds)';
Blockly.Msg.ARD_TIME_MILLIS_TIP = 'Returns the number of milliseconds since the Arduino board began running the current program. Has to be stored in a positive long integer';
Blockly.Msg.ARD_TIME_MICROS = 'current elapsed Time (microseconds)';
Blockly.Msg.ARD_TIME_MICROS_TIP = 'Returns the number of microseconds since the Arduino board began running the current program. Has to be stored in a positive long integer';
Blockly.Msg.ARD_TIME_INF = 'wait forever (end program)';
Blockly.Msg.ARD_TIME_INF_TIP = 'Wait indefinitely, stopping the program.';
Blockly.Msg.ARD_DS3231_SETUP = 'Setup Real-Time Clock on pin# A4(SDA) and A5(SCL)';
Blockly.Msg.ARD_DS3231_SETUP_TIP = 'Setting up RTC Module (DS3231) on pin# A4(SDA) and A5(SCL)';
Blockly.Msg.ARD_DS3231_SETCLOCK = 'Set Clock of RTC (DS3231) manually';
Blockly.Msg.ARD_DS3231_SETDATE = 'with Date: ';
Blockly.Msg.ARD_DS3231_SETTIME = 'and Time: ';
Blockly.Msg.ARD_DS3231_SETCLOCK_TIP = 'ONLY CHECK IT, IF YOU WANT TO MANUALLY SET DATE AND TIME ON RESTART';
Blockly.Msg.ARD_DS3231_READ = 'Read Date and Time from RTC Module';
Blockly.Msg.ARD_DS3231_READYEAR = 'Year: ';
Blockly.Msg.ARD_DS3231_READMONTH = 'Month: ';
Blockly.Msg.ARD_DS3231_READDAY = 'Day: ';
Blockly.Msg.ARD_DS3231_READHOUR = 'Hour: ';
Blockly.Msg.ARD_DS3231_READMINUTE = 'Minute: ';
Blockly.Msg.ARD_DS3231_READSECOND = 'Second: ';
Blockly.Msg.ARD_DS3231_READ_TIP = 'Receives Date and Time as variable for each entity';
Blockly.Msg.ARD_VAR_AS = 'as';
Blockly.Msg.ARD_VAR_AS_TIP = 'Sets a value to a specific type';
/// IO blocks - pulseIn - Block for function pulseIn(), it measure a pulse duration in a given pin.
Blockly.Msg.ARD_PULSE_READ = 'measure %1 pulse on pin #%2';
/// IO blocks - pulseIn - Block similar to ARD_PULSE_READ, but it adds a time-out in microseconds.
Blockly.Msg.ARD_PULSE_READ_TIMEOUT = 'measure %1 pulse on pin #%2 (timeout after %3 μs)';
/// IO blocks - pulseIn - Tooltip for pulseIn() block.
Blockly.Msg.ARD_PULSE_TIP = 'Measures the duration of a pulse on the selected pin.';
/// IO blocks - pulseIn - Tooltip for pulseIn() block when it uses the optional argument for time-out.
Blockly.Msg.ARD_PULSETIMEOUT_TIP = 'Measures the duration of a pulse on the selected pin, if it is within the time-out in microseconds.';
Blockly.Msg.ARD_SETTONE = 'Set tone on pin #';
Blockly.Msg.ARD_TONEFREQ = 'at frequency';
Blockly.Msg.ARD_TONE_TIP = 'Sets tone on pin to specified frequency within range 31 - 65535';
Blockly.Msg.ARD_TONE_WARNING = 'Frequency must be in range 31 - 65535';
Blockly.Msg.ARD_NOTONE = 'Turn off tone on pin #';
Blockly.Msg.ARD_NOTONE_TIP = 'Turns the tone off on the selected pin';
Blockly.Msg.ARD_MAX7219_SETUP_DIN = 'Setup MAX7219 on DIN Pin#';
Blockly.Msg.ARD_MAX7219_SETUP_CS = ', CS Pin#';
Blockly.Msg.ARD_MAX7219_SETUP_CLK = ' and CLK Pin#';
Blockly.Msg.ARD_MAX7219_SETUP_TIP = 'Setup MAX7219 8x8 LED Matrix module';
Blockly.Msg.ARD_MAX7219_SETCHAR = 'Set Character MAX7219 DIN Pin#';
Blockly.Msg.ARD_MAX7219_SETCHAR_TIP = 'Create Character for MAX7219 on DIN Pin';
Blockly.Msg.ARD_MAX7219_CLR = 'Clear Display MAX7219 DIN Pin#';
Blockly.Msg.ARD_MAX7219_CLR_TIP = 'Clears Display of MAX7219 on DIN Pin';
Blockly.Msg.ARD_LCD1602_SETUP = 'Setup LCD 16x2 on digital pins';
Blockly.Msg.ARD_LCD1602_SETUP_PINS = '>>RS:7 >>E:8 >>DB4:';
Blockly.Msg.ARD_LCD1602_SETUP_DB5 = '>>DB5:';
Blockly.Msg.ARD_LCD1602_SETUP_DB6 = '>>DB6:';
Blockly.Msg.ARD_LCD1602_SETUP_DB7 = '>>DB7:';
Blockly.Msg.ARD_LCD1602_SETUP_TIP = 'Setup LCD 16x2 on digital pins\n RS(7), E(8), DB4, DB5, DB6, and DB7';
Blockly.Msg.ARD_LCD1602_WRITE = 'LCD 16x2 >> Write to display ';
Blockly.Msg.ARD_LCD1602_LINE1 = '1st Line: ';
Blockly.Msg.ARD_LCD1602_LINE2 = '2nd Line: ';
Blockly.Msg.ARD_LCD1602_WRITE_TIP = 'Write lines of text to display';
Blockly.Msg.ARD_LCD1602_CLR = 'Clear LCD 16x2 Display';
Blockly.Msg.ARD_LCD1602_CLR_TIP = 'Clears Display of LCD 16x2';
Blockly.Msg.ARD_SEVSEG = 'Setup 7 Segment Display via 74HC595';
Blockly.Msg.ARD_SEVSEG_TIP = 'Sets table of 10 digits for 7 Segment Display that is connected via shiftregister 74HC595';
Blockly.Msg.ARD_SEVSEG_WRITE = '7 Segment Display >> Write Digit ';
Blockly.Msg.ARD_SEVSEG_WRITE_TIP = 'Writes digit 0...9 to 7 Segment Display that is connected via shiftregister 74HC595';
Blockly.Msg.ARD_FOURSEVSEG = 'Setup 4 x 7 Segment Display to pin# ';
Blockly.Msg.ARD_FOURSEVSEG_SEGA = 'A:';
Blockly.Msg.ARD_FOURSEVSEG_SEGB = 'B:';
Blockly.Msg.ARD_FOURSEVSEG_SEGC = 'C:';
Blockly.Msg.ARD_FOURSEVSEG_SEGD = 'D:';
Blockly.Msg.ARD_FOURSEVSEG_SEGE = 'E:';
Blockly.Msg.ARD_FOURSEVSEG_SEGF = 'F:';
Blockly.Msg.ARD_FOURSEVSEG_SEGG = 'G:';
Blockly.Msg.ARD_FOURSEVSEG_SEGDP = 'DP:';
Blockly.Msg.ARD_FOURSEVSEG_DIG1 = 'D1:';
Blockly.Msg.ARD_FOURSEVSEG_DIG2 = 'D2:';
Blockly.Msg.ARD_FOURSEVSEG_DIG3 = 'D3:';
Blockly.Msg.ARD_FOURSEVSEG_DIG4 = 'D4:';
Blockly.Msg.ARD_FOURSEVSEG_TIP = 'Sets table of 10 digits for 4 Digit 7 Segment Display directly via pins to each segment and digit';
Blockly.Msg.ARD_FOURSEVSEG_WRITE = '4 x 7 Segment Display >> Write Digit / Char ';
Blockly.Msg.ARD_FOURSEVSEG_WRITE_TIP = 'Writes digit 0...9 or dot to 4 digit 7 Segment Display';
Blockly.Msg.ARD_FOURSEVSEG_SETCHAR = '4 x 7 Segment Display >> Create Char ';
Blockly.Msg.ARD_FOURSEVSEG_SETCHAR_TIP = 'Creates a character for 4 x 7 Segment Display and that can be used via "Write Digit / Char';
Blockly.Msg.ARD_FOURSEVSEG_CLR = '4 x 7 Segment Display >> Clear Display';
Blockly.Msg.ARD_FOURSEVSEG_CLR_TIP = 'Clears and switches off 4 Digit 7 Segment Display';
Blockly.Msg.ARD_SHIFTOUT = 'shiftOut >> Data#';
Blockly.Msg.ARD_SHIFTOUT_C = 'Clk#';
Blockly.Msg.ARD_SHIFTOUT_O = 'Order';
Blockly.Msg.ARD_SHIFTOUT_B = 'byteVal';
Blockly.Msg.ARD_SHIFTOUT_TIP = 'Shifts out a byte of data one bit at a time shiftOut(). Order Left to Right, or Right to Left';
Blockly.Msg.ARD_BITSET_1 = 'Sets variable of';
Blockly.Msg.ARD_BITSET_2 = 'to bit';
Blockly.Msg.ARD_BITSET_TIP = 'bitSet() >> Sets (writes a 1 to) a bit of a numeric value)';
Blockly.Msg.ARD_ATTACHINTERRUPT = 'Attach on Interrupt Pin#';
Blockly.Msg.ARD_ATTACHINTERRUPT_FUNC = 'Function';
Blockly.Msg.ARD_ATTACHINTERRUPT_MODE = 'in Mode';
Blockly.Msg.ARD_ATTACHINTERRUPT_TIP = 'Useful for making things happen automatically in microcontroller programs, e.g. reading a rotary encoder, or monitoring user input';

/**
 * Ardublockly instances
 */
/// Instances - Menu item to indicate that it will create a new instance
Blockly.Msg.NEW_INSTANCE = 'New instance...';
/// Instances - Menu item to rename an instance name
Blockly.Msg.RENAME_INSTANCE = 'Rename instance...';
/// Instances - Menu item to create a new instance name and apply it to that block
Blockly.Msg.NEW_INSTANCE_TITLE = 'New instance name:';
/// Instances - Confirmation message that a number of instances will be renamed to a new name
Blockly.Msg.RENAME_INSTANCE_TITLE = 'Rename all "%1" instances to:';

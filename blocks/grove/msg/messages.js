/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview English strings for Grove module blocks. All names have the
 *     postfix BLOCKS_GROVE.
 */
'use strict';

goog.require('Blockly.Msg.en');

/**
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to message files.
 */

/// Toolbox category name
Blockly.Msg.BLOCKS_GROVE_CATEGORY = 'Grove';

/// LED block
Blockly.Msg.BLOCKS_GROVE_LED = 'set Grove LED on connector';
Blockly.Msg.BLOCKS_GROVE_LED_TIP = 'Turns the LED On (HIGH) or Off (LOW).';

/// Button block
Blockly.Msg.BLOCKS_GROVE_BUTTON = 'read Grove Button on connector';
Blockly.Msg.BLOCKS_GROVE_BUTTON_TIP = 'Set to HIGH when the button is pressed, otherwise LOW.';

/// PIR block
Blockly.Msg.BLOCKS_GROVE_PIR = 'read Grove PIR on connector';
Blockly.Msg.BLOCKS_GROVE_PIR_TIP = 'On motion sense it outputs HIGH, otherwise LOW.';

/// LCD RGB block
Blockly.Msg.BLOCKS_GROVE_LCD_RGB = 'set LCD RGB text to';
Blockly.Msg.BLOCKS_GROVE_LCD_RGB_TIP = 'Sets the text on the LCD display.';

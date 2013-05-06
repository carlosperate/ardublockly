/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Messages common to multiple apps.
 * @author ellen.spertus@gmail.com (Ellen Spertus)
 */
'use strict';

if (typeof Blockly == 'undefined') {
   var Blockly = {};
}

// Messages related to loading and storing Blockly programs.
if (typeof Blockly.Storage == 'undefined') {
   Blockly.Storage = {};
}

/** @desc error - the URL to retrieve a stored program is invalid or a server error occurred; %1 is further information about the error. */
Blockly.Storage.HTTPREQUEST_ERROR = goog.getMsg("There was a problem with the request. %1");

/** @desc alert - This is shown after the user has pressed a button to save his/her program; %1 is the URL to retrieve the program." */
Blockly.Storage.LINK_ALERT = goog.getMsg("Share your blocks with this link: %1");

/** @desc error - a request to retrieve a stored program does not have a valid URL. %1 is the invalid portion of the URL.  Note: [https://translatewiki.net/wiki/Translating:Blockly#Special_terms how to translate 'Blockly']. */
Blockly.Storage.HASH_ERROR = goog.getMsg("Sorry, '%1' doesn't correspond with any saved Blockly file.");

/** @desc error - there was a problem loading a file previously saved by the user.  The most likely reason for the problem is that it was created with an earlier, incompatible version of Blockly.  Note: [https://translatewiki.net/wiki/Translating:Blockly#Special_terms how to translate 'Blockly'].  Debugging information follows. */
Blockly.Storage.XML_ERROR = goog.getMsg("Could not load your saved file.  Perhaps it was created with a different version of Blockly?");

// Messages related to loading and storing Blockly programs.
if (typeof Blockly.Apps == 'undefined') {
   Blockly.Apps = {};
}

/** @desc fixed text (noun) - this is displayed above a row of numbers indicating which level the user has reached. */
Blockly.Apps.LEVEL = 'Level';

/** @desc button - pressing this button runs the computer program the user has written. */
Blockly.Apps.RUN_PROGRAM = goog.getMsg("Run program");

/** @desc button - pressing this button causes the character to return to the start of the maze but does not delete the user's program. */
Blockly.Apps.RESET_PROGRAM = goog.getMsg("Reset");

/** @desc alert - congratulates the user on solving the current level and invites [https://translatewiki.net/wiki/Translating:Blockly#Tense him/her] to attempt the next level (%1), a number greater than or equal to 2. */
Blockly.Apps.NEXT_LEVEL = goog.getMsg("Congratulations!\nAre you ready to proceed to level %1?");

/** @desc alert - congratulates the user on solving the final level.  */
Blockly.Apps.FINAL_LEVEL = goog.getMsg("Congratulations!\nYou have solved the final level.");

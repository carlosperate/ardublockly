/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
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
 * @fileoverview Variable blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */

if (!Blockly.Language) Blockly.Language = {};

Blockly.Language.variables_get = {
  // Variable getter.
  category: null,  // Variables are handled specially.
  helpUrl: Blockly.LANG_VARIABLES_GET_HELPURL,
  init: function() {
    this.setColour(330);
    this.appendTitle(Blockly.LANG_VARIABLES_GET_TITLE_1);
    this.appendTitle(new Blockly.FieldDropdown(
        Blockly.Variables.dropdownCreate, Blockly.Variables.dropdownChange),
        'VAR').setText(Blockly.LANG_VARIABLES_GET_ITEM);
    this.setOutput(true, null);
    this.setTooltip(Blockly.LANG_VARIABLES_GET_TOOLTIP_1);
  },
  getVars: function() {
    return [this.getTitleText('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleText('VAR'))) {
      this.setTitleText(newName, 'VAR');
    }
  }
};

Blockly.Language.variables_set = {
  // Variable setter.
  category: null,  // Variables are handled specially.
  helpUrl: Blockly.LANG_VARIABLES_SET_HELPURL,
  init: function() {
    this.setColour(330);
    this.appendTitle(Blockly.LANG_VARIABLES_SET_TITLE_1);
    this.appendTitle(new Blockly.FieldDropdown(
        Blockly.Variables.dropdownCreate, Blockly.Variables.dropdownChange),
        'VAR').setText(Blockly.LANG_VARIABLES_SET_ITEM);
    this.appendInput('', Blockly.INPUT_VALUE, 'VALUE', null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_VARIABLES_SET_TOOLTIP_1);
  },
  getVars: function() {
    return [this.getTitleText('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleText('VAR'))) {
      this.setTitleText(newName, 'VAR');
    }
  }
};

/**
* Return a new variable name that is not yet being used. This will try and
* generate single letter variable names in the range 'i' to 'z' to start with.
* If no unique name is located it will then try 'i1' to 'z1', then 'i2' to 'z2' etc.
*
* @return {string} New variable name
*/
Blockly.Variables.generateUniqueName = function() {
        var variableList = Blockly.Variables.allVariables();
        var newName = "";
        if ( variableList.length > 0 ) {
                variableList.sort(Blockly.caseInsensitiveComparator);
                var nameSuffix=0, potName = "i", i = 0, inUse = false;;
                while ( newName === "" ) {
                        i = 0;
                        inUse = false;
                        while ( (i < variableList.length) && (!inUse) ) {
                                if ( variableList[i].toLowerCase() === potName ) {
                                        // This potential name is already used
                                        inUse = true;
                                }
                                i++;
                        }
                        if ( inUse ) {
                                // Try the next potential name
                                if ( potName.charAt(0) === 'z' ) {
                                        // Reached the end of the character sequence so back to "i" but with a new suffix
                                        nameSuffix += 1;
                                        potName = "i";
                                } else {
                                        potName = String.fromCharCode(potName.charCodeAt(0)+1);
                                        if(potName.charAt(0) === 'l'){
                                            potName = String.fromCharCode(potName.charCodeAt(0)+1);
                                        }
                                }
                                if ( nameSuffix > 0 ) {
                                        potName = potName + nameSuffix;
                                }
                        } else {
                                // We can use the current potential name
                                newName = potName;
                        }
                }
        } else {
                newName = "i";
        }
        return newName;
};
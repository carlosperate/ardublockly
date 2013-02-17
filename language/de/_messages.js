/**
 * Visual Blocks Language
 *
 * Copyright 2013 Google Inc.
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
 * @fileoverview German strings.
 * @author henning@mst.ch (Heiko Henning)
 */
'use strict';

goog.provide('Blockly.messages.de');

/**
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to message files.
 */

// Context menus.
Blockly.MSG_DUPLICATE_BLOCK = 'Kopieren';
Blockly.MSG_REMOVE_COMMENT = 'Kommentar entfernen';
Blockly.MSG_ADD_COMMENT = 'Kommentar hinzufügen';
Blockly.MSG_EXTERNAL_INPUTS = 'externe Eingänge';
Blockly.MSG_INLINE_INPUTS = 'interne Eingänge';
Blockly.MSG_DELETE_BLOCK = 'Block löschen';
Blockly.MSG_DELETE_X_BLOCKS = 'Block %1 löschen';
Blockly.MSG_COLLAPSE_BLOCK = 'Block zusammenfalten';
Blockly.MSG_EXPAND_BLOCK = 'Block entfalten';
Blockly.MSG_DISABLE_BLOCK = 'Block deaktivieren';
Blockly.MSG_ENABLE_BLOCK = 'Block aktivieren';
Blockly.MSG_HELP = 'Hilfe';

// Variable renaming.
Blockly.MSG_CHANGE_VALUE_TITLE = 'Wert ändern:';
Blockly.MSG_NEW_VARIABLE = 'Neue Variable...';
Blockly.MSG_NEW_VARIABLE_TITLE = 'Name der neuen Variable:';
Blockly.MSG_RENAME_VARIABLE = 'Variable umbennen...';
Blockly.MSG_RENAME_VARIABLE_TITLE = 'Alle "%1" Variablen umbennen in:';

// Colour Blocks.
Blockly.LANG_COLOUR_PICKER_HELPURL = 'http://de.wikipedia.org/wiki/Farbe';
Blockly.LANG_COLOUR_PICKER_TOOLTIP = 'Wählen eine Farbe von der Palette.';

Blockly.LANG_COLOUR_RGB_HELPURL = 'http://de.wikipedia.org/wiki/RGB-Farbraum';
Blockly.LANG_COLOUR_RGB_TITLE = 'Farbe mit';
Blockly.LANG_COLOUR_RGB_RED = 'rot';
Blockly.LANG_COLOUR_RGB_GREEN = 'grün';
Blockly.LANG_COLOUR_RGB_BLUE = 'blau';
Blockly.LANG_COLOUR_RGB_TOOLTIP = 'Kreiere eine Farbe mit selbst definierten rot, grün\n' +
    'und blau Werten. Alle Werte müssen zwischen 0.0. und 1.0 liegen.';

Blockly.LANG_COLOUR_BLEND_HELPURL = 'http://meyerweb.com/eric/tools/color-blend/';
Blockly.LANG_COLOUR_BLEND_TITLE = 'mischen';
Blockly.LANG_COLOUR_BLEND_COLOUR1 = 'Farbe 1';
Blockly.LANG_COLOUR_BLEND_COLOUR2 = 'Farbe 2';
Blockly.LANG_COLOUR_BLEND_RATIO = 'Verhältniss';
Blockly.LANG_COLOUR_BLEND_TOOLTIP = 'Vermische 2 Farbe mit konfigurierbaren Farbverhältniss (0.0 - 1.0).';

// Control Blocks.
Blockly.LANG_CONTROLS_IF_HELPURL = 'http://code.google.com/p/blockly/wiki/If_Then';
Blockly.LANG_CONTROLS_IF_TOOLTIP_1 = 'Wenn eine Bedingung wahr (true) ist, dann führe eine Anweisung aus.';
Blockly.LANG_CONTROLS_IF_TOOLTIP_2 = 'Wenn eine Bedingung wahr (true) ist, dann führe die erste Anweisung aus.\n' +
    'Ansonsten führe die zweite Anweisung aus.';
Blockly.LANG_CONTROLS_IF_TOOLTIP_3 = 'Wenn der erste Bedingung wahr (true) ist, dann führe die erste Anweisung aus.\n' +
    'Oder wenn die zweite Bedingung wahr (true) ist, dann führe die zweite Anweisung aus.';
Blockly.LANG_CONTROLS_IF_TOOLTIP_4 = 'Wenn der erste Bedingung wahr (true) ist, dann führe die erste Anweisung aus.\n' +
    'Oder wenn die zweite Bedingung wahr (true) ist, dann führe die zweite Anweisung aus.\n' +
    'Falls keine der beiden Bedingungen wahr (true) ist, dann führe die dritte Anweisung aus.';
Blockly.LANG_CONTROLS_IF_MSG_IF = 'wenn';
Blockly.LANG_CONTROLS_IF_MSG_ELSEIF = 'oder wenn';
Blockly.LANG_CONTROLS_IF_MSG_ELSE = 'oder';
Blockly.LANG_CONTROLS_IF_MSG_THEN = 'mache';

Blockly.LANG_CONTROLS_IF_IF_TITLE_IF = 'wenn';
Blockly.LANG_CONTROLS_IF_IF_TOOLTIP = 'Hinzufügen, entfernen oder sortieren von Sektionen';

Blockly.LANG_CONTROLS_IF_ELSEIF_TITLE_ELSEIF = 'oder wenn';
Blockly.LANG_CONTROLS_IF_ELSEIF_TOOLTIP = 'Eine weitere Bedingung hinzufügen.';

Blockly.LANG_CONTROLS_IF_ELSE_TITLE_ELSE = 'oder';
Blockly.LANG_CONTROLS_IF_ELSE_TOOLTIP = 'Eine oder Bedingung hinzufügen, führt eine Anweisung aus falls keine Bedingung zutrifft.';

Blockly.LANG_CONTROLS_REPEAT_HELPURL = 'http://de.wikipedia.org/wiki/For-Schleife';
Blockly.LANG_CONTROLS_REPEAT_TITLE_REPEAT = 'wiederhole';
Blockly.LANG_CONTROLS_REPEAT_TITLE_TIMES = 'mal';
Blockly.LANG_CONTROLS_REPEAT_INPUT_DO = 'mache';
Blockly.LANG_CONTROLS_REPEAT_TOOLTIP = 'Eine Anweisung mehrfach ausführen.';

Blockly.LANG_CONTROLS_WHILEUNTIL_HELPURL = 'http://de.wikipedia.org/wiki/Schleife_%28Programmierung%29';
Blockly.LANG_CONTROLS_WHILEUNTIL_TITLE_REPEAT = 'Wiederhole';
Blockly.LANG_CONTROLS_WHILEUNTIL_INPUT_DO = 'mache';
Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE = 'solange';
Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL = 'bis';
Blockly.LANG_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE = 'Führe die Anweisung solange aus wie die Bedingung wahr (true) ist.';
Blockly.LANG_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL = 'Führe die Anweisung solange aus wie die Bedingung falsch (false) ist.';

Blockly.LANG_CONTROLS_FOR_HELPURL = 'http://de.wikipedia.org/wiki/For-Schleif';
Blockly.LANG_CONTROLS_FOR_INPUT_WITH = 'Zähle';
Blockly.LANG_CONTROLS_FOR_INPUT_VAR = 'x';
Blockly.LANG_CONTROLS_FOR_INPUT_FROM = 'von';
Blockly.LANG_CONTROLS_FOR_INPUT_TO = 'bis';
Blockly.LANG_CONTROLS_FOR_INPUT_DO = 'mache';
Blockly.LANG_CONTROLS_FOR_TOOLTIP = 'Zähle die Variable "%1" von einem Startwert\n' +
    'bis zu einem Zielwert und führe für jeden Wert\n' +
    'eine Anweisung aus.';

Blockly.LANG_CONTROLS_FOREACH_HELPURL = 'http://de.wikipedia.org/wiki/For-Schleif';
Blockly.LANG_CONTROLS_FOREACH_INPUT_ITEM = 'Für Wert';
Blockly.LANG_CONTROLS_FOREACH_INPUT_VAR = 'x';
Blockly.LANG_CONTROLS_FOREACH_INPUT_INLIST = 'aus der Liste';
Blockly.LANG_CONTROLS_FOREACH_INPUT_DO = 'mache';
Blockly.LANG_CONTROLS_FOREACH_TOOLTIP = 'Führe eine Anweisung für jeden Wert in der Liste aus\n' +
    'und setzte dabei die Variable "%1" \n' +
    'auf den aktuellen Listen Wert.';

Blockly.LANG_CONTROLS_FLOW_STATEMENTS_HELPURL = 'http://de.wikipedia.org/wiki/Kontrollstruktur';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP = 'aus der Schleife';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK = 'ausbrechen';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE = 'mit der nächsten Iteration fortfahren';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK = 'Die umgebnene Schleife beenden.';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE = 'Diese Anweisung abbrechen\n' +
    'und mit der nächsten Schleifeniteration fortfahren.';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_WARNING = 'Warnung:\n' +
    'Diese block sollte\n' +
    'nur in einer Schleife\n'+
    'verwendet werden.';

// Logic Blocks.
Blockly.LANG_LOGIC_COMPARE_HELPURL = 'http://de.wikipedia.org/wiki/Vergleich_%28Zahlen%29';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_EQ = 'Ist wahr (true) wenn beide Werte identisch sind.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_NEQ = 'Ist wahr (true) wenn beide Werte unterschiedlich sind.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LT = 'Ist wahr (true) wenn der erste Wert kleiner als\n' +
    'der zweite Wert ist.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LTE = 'Ist wahr (true) wenn der erste Wert kleiner als\n' +
    'oder gleich gross wie zweite Wert ist.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GT = 'Ist wahr (true) wenn der erste Wert grösser als\n' +
    'der zweite Wert ist.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GTE = 'Ist wahr (true) wenn der erste Wert grösser als\n' +
    'oder gleich gross wie zweite Wert ist.';

Blockly.LANG_LOGIC_OPERATION_HELPURL = 'http://code.google.com/p/blockly/wiki/And_Or';
Blockly.LANG_LOGIC_OPERATION_AND = 'und';
Blockly.LANG_LOGIC_OPERATION_OR = 'oder';
Blockly.LANG_LOGIC_OPERATION_TOOLTIP_AND = 'Ist wahr (true) wenn beide Werte wahr (true) sind.';
Blockly.LANG_LOGIC_OPERATION_TOOLTIP_OR = 'Ist wahr (true) wenn einer der beiden Werte wahr (true) ist.';

Blockly.LANG_LOGIC_NEGATE_HELPURL = 'http://code.google.com/p/blockly/wiki/Not';
Blockly.LANG_LOGIC_NEGATE_INPUT_NOT = 'nicht';
Blockly.LANG_LOGIC_NEGATE_TOOLTIP = 'Ist wahr (true) wenn der Eingabewert falsch (false) ist.\n' +
    'Ist falsch (false) wenn der Eingabewert wahr (true) ist.';

Blockly.LANG_LOGIC_BOOLEAN_HELPURL = 'http://code.google.com/p/blockly/wiki/True_False';
Blockly.LANG_LOGIC_BOOLEAN_TRUE = 'wahr';
Blockly.LANG_LOGIC_BOOLEAN_FALSE = 'falsch';
Blockly.LANG_LOGIC_BOOLEAN_TOOLTIP = 'Ist entweder wahr (true) oder falsch (false)';

Blockly.LANG_LOGIC_NULL_HELPURL = 'http://de.wikipedia.org/wiki/Nullwert';
Blockly.LANG_LOGIC_NULL = 'null';
Blockly.LANG_LOGIC_NULL_TOOLTIP = 'Ist NULL.';

Blockly.LANG_LOGIC_TERNARY_HELPURL = 'http://de.wikipedia.org/wiki/%3F:#Auswahloperator';
Blockly.LANG_LOGIC_TERNARY_CONDITION = 'test';
Blockly.LANG_LOGIC_TERNARY_IF_TRUE = 'wenn wahr';
Blockly.LANG_LOGIC_TERNARY_IF_FALSE = 'wenn falsch';
Blockly.LANG_LOGIC_TERNARY_TOOLTIP = 'Überprüft eine Bedingung "test". Wenn die Bedingugn wahr ist\n' +
    'wird der "wenn wahr" Wert zurückgegeben, andernfals der "wenn falsch" Wert';

// Math Blocks.
Blockly.LANG_MATH_NUMBER_HELPURL = 'http://de.wikipedia.org/wiki/Zahl';
Blockly.LANG_MATH_NUMBER_TOOLTIP = 'Eine Zahl.';

Blockly.LANG_MATH_ARITHMETIC_HELPURL = 'http://de.wikipedia.org/wiki/Grundrechenart';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_ADD = 'Ist die Summe zweier Werte.';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_MINUS = 'Ist die Differenz zweier Werte.';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_MULTIPLY = 'Ist das Produkt zweier Werte.';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_DIVIDE = 'Ist der Quotient zweier Werte.';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_POWER = 'Ist der erste Wert potenziert mit\n' +
    'dem zweiten Wert.';

Blockly.LANG_MATH_SINGLE_HELPURL = 'http://de.wikipedia.org/wiki/Quadratwurzel';
Blockly.LANG_MATH_SINGLE_OP_ROOT = 'Quadratwurzel';
Blockly.LANG_MATH_SINGLE_OP_ABSOLUTE = 'Absolutwert';
Blockly.LANG_MATH_SINGLE_TOOLTIP_ROOT = 'Ist die Qudratwurzel eines Wertes.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_ABS = 'Ist der absolutwert eines Wertes.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_NEG = 'Negiert einen Wert.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_LN = 'Ist der natürliche Logarithmus eines Wertes.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_LOG10 = 'Ist der dekadische Logarithmus eines Wertes.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_EXP = 'Ist Wert der Exponentialfunktion eines Wertes.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_POW10 = 'Rechnet 10 hoch Eingabewert.';

Blockly.LANG_MATH_TRIG_HELPURL = 'http://de.wikipedia.org/wiki/Trigonometrie';
Blockly.LANG_MATH_TRIG_TOOLTIP_SIN = 'Ist der Sinus eins Winkels.';
Blockly.LANG_MATH_TRIG_TOOLTIP_COS = 'Ist der Cosinus eins Winkels.';
Blockly.LANG_MATH_TRIG_TOOLTIP_TAN = 'Ist der Tangens eins Winkels.';
Blockly.LANG_MATH_TRIG_TOOLTIP_ASIN = 'Ist der Arcussinus des Eingabewertes.';
Blockly.LANG_MATH_TRIG_TOOLTIP_ACOS = 'Ist der Arcuscosinus des Eingabewertes.';
Blockly.LANG_MATH_TRIG_TOOLTIP_ATAN = 'Ist der Arcustangens des Eingabewertes.';

Blockly.LANG_MATH_CONSTANT_HELPURL = 'http://de.wikipedia.org/wiki/Mathematische_Konstante';
Blockly.LANG_MATH_CONSTANT_TOOLTIP = 'Mathematische Konstanten wie: \u03c0 (3.141\u2026), e (2.718\u2026), \u03c6 (1.618\u2026),\n' +
    'sqrt(2) (1.414\u2026), sqrt(\u00bd) (0.707\u2026) oder \u221e (unendlich).';

Blockly.LANG_MATH_IS_EVEN = 'ist gerade';
Blockly.LANG_MATH_IS_ODD = 'ist ungerade';
Blockly.LANG_MATH_IS_PRIME = 'ist eine Primenzahl';
Blockly.LANG_MATH_IS_WHOLE = 'ganze Zahl';
Blockly.LANG_MATH_IS_POSITIVE = 'ist positiv';
Blockly.LANG_MATH_IS_NEGATIVE = 'ist negativ';
Blockly.LANG_MATH_IS_DIVISIBLE_BY = 'ist teilbar durch';
Blockly.LANG_MATH_IS_TOOLTIP = 'Überprüft ob eine Zahl gerade, ungerade, eine Primenzahl, ganzzahlig,\n' +
    'positiv, negativ oder durch eine zweite Zahl teilbar ist.\n' +
    'Gibt wahr (true) oder falsch (false) zurück.';

Blockly.LANG_MATH_CHANGE_HELPURL = 'http://de.wikipedia.org/wiki/Inkrement_und_Dekrement';
Blockly.LANG_MATH_CHANGE_TITLE_CHANGE = 'erhöhe';
Blockly.LANG_MATH_CHANGE_TITLE_ITEM = 'Variable';
Blockly.LANG_MATH_CHANGE_INPUT_BY = 'um';
Blockly.LANG_MATH_CHANGE_TOOLTIP = 'Addiert einen Wert zur Variable "%1" hinzu.';

Blockly.LANG_MATH_ROUND_HELPURL = 'http://de.wikipedia.org/wiki/Runden';
Blockly.LANG_MATH_ROUND_TOOLTIP = 'Eine Zahl auf oder ab runden.';
Blockly.LANG_MATH_ROUND_OPERATOR_ROUND = 'runden';
Blockly.LANG_MATH_ROUND_OPERATOR_ROUNDUP = 'auf runden';
Blockly.LANG_MATH_ROUND_OPERATOR_ROUNDDOWN = 'ab runden';

Blockly.LANG_MATH_ONLIST_HELPURL = 'http://www.sysplus.ch/einstieg.php?links=menu&seite=4125&grad=Crash&prog=Excel';
Blockly.LANG_MATH_ONLIST_INPUT_OFLIST = 'einer Liste';
Blockly.LANG_MATH_ONLIST_OPERATOR_SUM = 'Summme';
Blockly.LANG_MATH_ONLIST_OPERATOR_MIN = 'Minimalwert';
Blockly.LANG_MATH_ONLIST_OPERATOR_MAX = 'Maximalwert';
Blockly.LANG_MATH_ONLIST_OPERATOR_AVERAGE = 'Mittelwert';
Blockly.LANG_MATH_ONLIST_OPERATOR_MEDIAN = 'Median';
Blockly.LANG_MATH_ONLIST_OPERATOR_MODE = 'Modulo / Restwert';
Blockly.LANG_MATH_ONLIST_OPERATOR_STD_DEV = 'Standart Abweichung';
Blockly.LANG_MATH_ONLIST_OPERATOR_RANDOM = 'Zufallswert';
Blockly.LANG_MATH_ONLIST_TOOLTIP_SUM = 'Ist die Summe aller Werte in einer Liste.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MIN = 'Ist der kleinste Wert in einer Liste.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MAX = 'Ist der grösste Wert in einer Liste.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_AVERAGE = 'Ist der Durchschnittswert aller Werte in einer Liste.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MEDIAN = 'Ist der Zentralwert aller Werte in einer Liste.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MODE = 'Findet den am haüfigsten vorkommenden Wert in einer Liste.\n' +
    'Falls kein Wert öfter vorkomme als alle anderen,\n' +
    'wird die original Liste zurückgegen';
Blockly.LANG_MATH_ONLIST_TOOLTIP_STD_DEV = 'Ist die standartiesierte Standartabweichung aller Werte in der Liste';
Blockly.LANG_MATH_ONLIST_TOOLTIP_RANDOM = 'Gebe einen Zufallswert aus der Liste zurück.';

Blockly.LANG_MATH_MODULO_HELPURL = 'http://de.wikipedia.org/wiki/Modulo';
Blockly.LANG_MATH_MODULO_INPUT_DIVIDEND = 'Rest von';
Blockly.LANG_MATH_MODULO_TOOLTIP = 'Der Rest nach einer Division.';

Blockly.LANG_MATH_CONSTRAIN_HELPURL = 'http://en.wikipedia.org/wiki/Clamping_%28graphics%29';
Blockly.LANG_MATH_CONSTRAIN_INPUT_CONSTRAIN = 'begrenzen';
Blockly.LANG_MATH_CONSTRAIN_INPUT_LOW = 'von';
Blockly.LANG_MATH_CONSTRAIN_INPUT_HIGH = 'bis';
Blockly.LANG_MATH_CONSTRAIN_TOOLTIP = 'Begrenzt den Wertebereich mittels von / bis Werte. (inklusiv)';

Blockly.LANG_MATH_RANDOM_INT_HELPURL = 'http://de.wikipedia.org/wiki/Zufallszahlen';
Blockly.LANG_MATH_RANDOM_INT_INPUT_FROM = 'ganzahlige Zufallswerte von';
Blockly.LANG_MATH_RANDOM_INT_INPUT_TO = 'bis';
Blockly.LANG_MATH_RANDOM_INT_TOOLTIP = 'Erzeug eine ganzahligen Zufallswert zwischen\n' +
    'zwei Werten (inklusiv).';

Blockly.LANG_MATH_RANDOM_FLOAT_HELPURL = 'http://de.wikipedia.org/wiki/Zufallszahlen';
Blockly.LANG_MATH_RANDOM_FLOAT_TITLE_RANDOM = 'Zufallszahl (0.0 -1.0)';
Blockly.LANG_MATH_RANDOM_FLOAT_TOOLTIP = 'Erzeug eine Zufallszahl\n' +
    'zwischen 0.0 (inklusiv) und 1.0 (exklusiv).';

// Text Blocks.
Blockly.LANG_TEXT_TEXT_HELPURL = 'http://de.wikipedia.org/wiki/Zeichenkette';
Blockly.LANG_TEXT_TEXT_TOOLTIP = 'Ein Buchstabe, Text oder Satz.';

Blockly.LANG_TEXT_JOIN_HELPURL = '';
Blockly.LANG_TEXT_JOIN_TITLE_CREATEWITH = 'Erstelle Text aus';
Blockly.LANG_TEXT_JOIN_TOOLTIP = 'Erstellt einen Text durch das verbinden\n' +
    'von mehreren Textelementen.';

Blockly.LANG_TEXT_CREATE_JOIN_TITLE_JOIN = 'verbinden';
Blockly.LANG_TEXT_CREATE_JOIN_TOOLTIP = 'Hinzufügen, entfernen und sortieren von Elementen.';

Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM = 'Element';
Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP = 'Ein Element zum Text hinzufügen.';

Blockly.LANG_TEXT_APPEND_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_APPEND_TO = 'An';
Blockly.LANG_TEXT_APPEND_APPENDTEXT = 'Text anhängen';
Blockly.LANG_TEXT_APPEND_VARIABLE = 'Variable';
Blockly.LANG_TEXT_APPEND_TOOLTIP = 'Text an die Variable "%1" anhängen.';

Blockly.LANG_TEXT_LENGTH_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_LENGTH_INPUT_LENGTH = 'länge';
Blockly.LANG_TEXT_LENGTH_TOOLTIP = 'Die Anzahl von Zeichen in einem Textes. (inkl. Leerzeichen)';

Blockly.LANG_TEXT_ISEMPTY_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_ISEMPTY_INPUT_ISEMPTY = 'ist leer?';
Blockly.LANG_TEXT_ISEMPTY_TOOLTIP = 'Ist wahr (true), wenn der Text leer ist.';

Blockly.LANG_TEXT_ENDSTRING_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_TEXT_ENDSTRING_INPUT = 'Buchstaben von';
Blockly.LANG_TEXT_ENDSTRING_TOOLTIP = 'Extrahiert die erste / letzten X Buchstaben von einem Text.';
Blockly.LANG_TEXT_ENDSTRING_OPERATOR_FIRST = 'ersten';
Blockly.LANG_TEXT_ENDSTRING_OPERATOR_LAST = 'letzten';

Blockly.LANG_TEXT_INDEXOF_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_TEXT_INDEXOF_TITLE_FIND = 'Suche';
Blockly.LANG_TEXT_INDEXOF_INPUT_OCCURRENCE = 'Vorkommniss des Begriff';
Blockly.LANG_TEXT_INDEXOF_INPUT_INTEXT = 'im Text';
Blockly.LANG_TEXT_INDEXOF_TOOLTIP = 'Findest das erste / letzte Vorkommniss\n' +
    'eines cuchbegriffes in einem Text.\n' +
    'Gibt die Position des Begriffes oder 0 zurück.';
Blockly.LANG_TEXT_INDEXOF_OPERATOR_FIRST = 'erstes';
Blockly.LANG_TEXT_INDEXOF_OPERATOR_LAST = 'letztes';

Blockly.LANG_TEXT_CHARAT_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_TEXT_CHARAT_GET = 'Nehme';
Blockly.LANG_TEXT_CHARAT_FROM_START = 'Buchstabe #ten';
Blockly.LANG_TEXT_CHARAT_FROM_END = '#te Buchstabe von hinten';
Blockly.LANG_TEXT_CHARAT_FIRST = 'ersten Buchstabe';
Blockly.LANG_TEXT_CHARAT_LAST = 'letzten Buchstabe';
Blockly.LANG_TEXT_CHARAT_RANDOM = 'zufälligen Buchstabe';
Blockly.LANG_TEXT_CHARAT_INPUT_INTEXT = 'vom Text';
Blockly.LANG_TEXT_CHARAT_TOOLTIP = 'Extrahiere einen Buchstaben von einer spezifizierten Position.';

Blockly.LANG_TEXT_CHANGECASE_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_CHANGECASE_TITLE_TO = 'umwandeln in';
Blockly.LANG_TEXT_CHANGECASE_TOOLTIP = 'Wandelt schreibweise von Texten um,\n' +
    'in Grossbuchstaben, Kleinbuchstaben oder\n' +
    'den ersten Buchstaben jedes Wortes gross und die anderen klein.';
Blockly.LANG_TEXT_CHANGECASE_OPERATOR_UPPERCASE = 'GROSSBUCHSTABEN';
Blockly.LANG_TEXT_CHANGECASE_OPERATOR_LOWERCASE = 'kleinbuchstbane';
Blockly.LANG_TEXT_CHANGECASE_OPERATOR_TITLECASE = 'Wörter';

Blockly.LANG_TEXT_TRIM_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_TRIM_TITLE_SPACE = 'entferne Leerzeichen von';
Blockly.LANG_TEXT_TRIM_TITLE_SIDES = '';
Blockly.LANG_TEXT_TRIM_TOOLTIP = 'Enfernt Leerzeichen vom Anfang und / oder Ende\n' +
    'eines Textes.';
Blockly.LANG_TEXT_TRIM_TITLE_SIDES = 'Seiten';
Blockly.LANG_TEXT_TRIM_TITLE_SIDE = 'Seite';
Blockly.LANG_TEXT_TRIM_OPERATOR_BOTH = 'Anfang und Ende';
Blockly.LANG_TEXT_TRIM_OPERATOR_LEFT = 'Anfang';
Blockly.LANG_TEXT_TRIM_OPERATOR_RIGHT = 'Ende';

Blockly.LANG_TEXT_PRINT_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_PRINT_TITLE_PRINT = 'Ausgabe';
Blockly.LANG_TEXT_PRINT_TOOLTIP = 'Gib den Inhalt einer Variable aus.';

Blockly.LANG_TEXT_PROMPT_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode92.html';
Blockly.LANG_TEXT_PROMPT_TITLE_PROMPT_FOR = 'Fragt nach';
Blockly.LANG_TEXT_PROMPT_TITILE_WITH_MESSAGE = 'mit Hinweis';
Blockly.LANG_TEXT_PROMPT_TOOLTIP_NUMBER = 'Fragt den Benutzer nach ein Zahl.';
Blockly.LANG_TEXT_PROMPT_TOOLTIP_TEXT = 'Fragt den Benutzer nach einem Text.';
Blockly.LANG_TEXT_PROMPT_TYPE_TEXT = 'Text';
Blockly.LANG_TEXT_PROMPT_TYPE_NUMBER = 'Zahl';

// Lists Blocks.
Blockly.LANG_LISTS_CREATE_EMPTY_HELPURL = 'http://en.wikipedia.org/wiki/Linked_list#Empty_lists';
Blockly.LANG_LISTS_CREATE_EMPTY_TITLE = 'Erzeuge eine leere Liste';
Blockly.LANG_LISTS_CREATE_EMPTY_TOOLTIP = 'Erzeugt eine leere Liste ohne Inhalt.';

Blockly.LANG_LISTS_CREATE_WITH_INPUT_WITH = 'Erzeuge Liste mit';
Blockly.LANG_LISTS_CREATE_WITH_TOOLTIP = 'Erzeugt eine List mit konfigurierten Elementen.';

Blockly.LANG_LISTS_CREATE_WITH_CONTAINER_TITLE_ADD = 'Liste';
Blockly.LANG_LISTS_CREATE_WITH_CONTAINER_TOOLTIP = 'Hinzufügen, entfernen und sortieren von Elmenten.';

Blockly.LANG_LISTS_CREATE_WITH_ITEM_TITLE = 'Element';
Blockly.LANG_LISTS_CREATE_WITH_ITEM_TOOLTIP = 'Ein Element zur Liste hinzufügen.';

Blockly.LANG_LISTS_REPEAT_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_REPEAT_INPUT_WITH = 'Erzeuge Liste mit';
Blockly.LANG_LISTS_REPEAT_INPUT_REPEATED = 'repeated';
Blockly.LANG_LISTS_REPEAT_INPUT_TIMES = 'times';
Blockly.LANG_LISTS_REPEAT_TOOLTIP = 'Erzeugt eine Liste mit einer variablen\n' +
    'Anzahl von Elementen';

Blockly.LANG_LISTS_LENGTH_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_LISTS_LENGTH_INPUT_LENGTH = 'länge';
Blockly.LANG_LISTS_LENGTH_TOOLTIP = 'Die Anzahl von Elementen in der Liste.';

Blockly.LANG_LISTS_IS_EMPTY_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_LISTS_INPUT_IS_EMPTY = 'ist leer?';
Blockly.LANG_LISTS_TOOLTIP = 'Ist wahr (true), wenn die Liste leer ist.';

Blockly.LANG_LISTS_INDEX_OF_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_INDEX_OF_TITLE_FIND = 'Suche';
Blockly.LANG_LISTS_INDEX_OF_INPUT_OCCURRENCE = 'Vorkommniss';
Blockly.LANG_LISTS_INDEX_OF_INPUT_IN_LIST = 'in der Liste';
Blockly.LANG_LISTS_INDEX_OF_TOOLTIP = 'Sucht die Position (index) eines Elementes in der Liste\n' +
    'Gibt 0 zurück wenn nichts gefunden wurde.';
Blockly.LANG_LISTS_INDEX_OF_FIRST = 'erstes';
Blockly.LANG_LISTS_INDEX_OF_LAST = 'letztes';

Blockly.LANG_LISTS_GET_INDEX_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_GET_INDEX_GET = 'Nehme';
Blockly.LANG_LISTS_GET_INDEX_GET_REMOVE = 'Nehme und entferne';
Blockly.LANG_LISTS_GET_INDEX_REMOVE = 'Entferne';
Blockly.LANG_LISTS_GET_INDEX_FROM_START = '#te';
Blockly.LANG_LISTS_GET_INDEX_FROM_END = '#te von hinten';
Blockly.LANG_LISTS_GET_INDEX_FIRST = 'erste';
Blockly.LANG_LISTS_GET_INDEX_LAST = 'letzte';
Blockly.LANG_LISTS_GET_INDEX_RANDOM = 'zufälliges';
Blockly.LANG_LISTS_GET_INDEX_INPUT_IN_LIST = 'Element von der Liste';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_FROM_START = 'Extrahiere das #1te Element von der Liste.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_FROM_END = 'Extrahiere das #1te Element vom Ende der Liste.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_FIRST = 'Extrahiere das erste Element von der Liste.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_LAST = 'Extrahiere das letzte Element von der Liste.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_RANDOM = 'Extrahiere ein zufälliges Element von der Liste.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM_START = 'Extrahiere und entfernt das #1te Element von der Liste.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM_END = 'Extrahiere und entfernt das #1te Element vom Ende der Liste.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FIRST = 'Extrahiere und entfernt das erste Element von der Liste.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_LAST = 'Extrahiere und entfernt das letzte Element von der Liste.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM = 'Extrahiere und entfernt ein zufälliges Element von der Liste.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM_START = 'Entfernt das #1te Element von der Liste.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM_END = 'Entfernt das #1te Element vom Ende der Liste.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_REMOVE_FIRST = 'Entfernt das erste Element von der Liste.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_REMOVE_LAST = 'Entfernt das letzte Element von der Liste.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_REMOVE_RANDOM = 'Entfernt ein zufälliges Element von der Liste.';

Blockly.LANG_LISTS_SET_INDEX_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_SET_INDEX_INPUT_AT = 'Setze Element an';
Blockly.LANG_LISTS_SET_INDEX_INPUT_IN_LIST = 'ter Stellen in Liste';
Blockly.LANG_LISTS_SET_INDEX_INPUT_TO = 'auf';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP = 'Setzt den Wert an einer spezifizierten Postion der Liste.';

// Variables Blocks.
Blockly.LANG_VARIABLES_GET_HELPURL = 'http://de.wikipedia.org/wiki/Variable_%28Programmierung%29';
Blockly.LANG_VARIABLES_GET_TITLE = 'Lese';
Blockly.LANG_VARIABLES_GET_ITEM = 'Variable';
Blockly.LANG_VARIABLES_GET_TOOLTIP = 'Gibt den Wert der Variable zurück.';
Blockly.LANG_VARIABLES_GET_CREATE_SET = 'Erzeuge "Schreibe %1"';

Blockly.LANG_VARIABLES_SET_HELPURL = 'http://de.wikipedia.org/wiki/Variable_%28Programmierung%29';
Blockly.LANG_VARIABLES_SET_TITLE = 'Schreibe';
Blockly.LANG_VARIABLES_SET_ITEM = 'Variable';
Blockly.LANG_VARIABLES_SET_TOOLTIP = 'Setzt den Wert einer Variable.';
Blockly.LANG_VARIABLES_SET_CREATE_GET = 'Erzeuge "Lese %1"';

// Procedures Blocks.
Blockly.LANG_PROCEDURES_DEFNORETURN_HELPURL = 'http://de.wikipedia.org/wiki/Prozedur_%28Programmierung%29';
Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE = 'Funktionsblock';
Blockly.LANG_PROCEDURES_DEFNORETURN_DO = 'mache';
Blockly.LANG_PROCEDURES_DEFNORETURN_TOOLTIP = 'Ein Funktionsblock ohne Rückgabewert.';

Blockly.LANG_PROCEDURES_DEFRETURN_HELPURL = 'http://de.wikipedia.org/wiki/Prozedur_%28Programmierung%29';
Blockly.LANG_PROCEDURES_DEFRETURN_PROCEDURE = Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE;
Blockly.LANG_PROCEDURES_DEFRETURN_DO = Blockly.LANG_PROCEDURES_DEFNORETURN_DO;
Blockly.LANG_PROCEDURES_DEFRETURN_RETURN = 'Gibt zurück';
Blockly.LANG_PROCEDURES_DEFRETURN_TOOLTIP = 'Ein Funktionsblock mit Rückgabewert.';

Blockly.LANG_PROCEDURES_DEF_DUPLICATE_WARNING = 'Warnung:\n' +
    'dieser Funktionsblock\n' +
    'hat doppelte Parameter.';

Blockly.LANG_PROCEDURES_CALLNORETURN_HELPURL = 'http://de.wikipedia.org/wiki/Prozedur_%28Programmierung%29';
Blockly.LANG_PROCEDURES_CALLNORETURN_CALL = 'Aufruf';
Blockly.LANG_PROCEDURES_CALLNORETURN_PROCEDURE = 'Funktionsblock';
Blockly.LANG_PROCEDURES_CALLNORETURN_TOOLTIP = 'Rufe einen Funktionsblock ohne Rückgabewert auf.';

Blockly.LANG_PROCEDURES_CALLRETURN_HELPURL = 'http://de.wikipedia.org/wiki/Prozedur_%28Programmierung%29';
Blockly.LANG_PROCEDURES_CALLRETURN_CALL = Blockly.LANG_PROCEDURES_CALLNORETURN_CALL;
Blockly.LANG_PROCEDURES_CALLRETURN_PROCEDURE = Blockly.LANG_PROCEDURES_CALLNORETURN_PROCEDURE;
Blockly.LANG_PROCEDURES_CALLRETURN_TOOLTIP = 'Rufe einen Funktionsblock mit Rückgabewert auf.';

Blockly.LANG_PROCEDURES_MUTATORCONTAINER_TITLE = 'Parameter';
Blockly.LANG_PROCEDURES_MUTATORARG_TITLE = 'Variable:';

Blockly.LANG_PROCEDURES_HIGHLIGHT_DEF = 'Markiere Funktionsblock';
Blockly.LANG_PROCEDURES_CREATE_DO = 'Erzeuge "Aufruf %1"';

Blockly.LANG_PROCEDURES_IFRETURN_TOOLTIP = 'Wenn der erste Wert wahr (true) ist,\n' +
    'Gebe den zweiten Wert zurück.';
Blockly.LANG_PROCEDURES_IFRETURN_WARNING = 'Warnung:\n' +
    'Dieser Block darf nur\n' +
    'innerhalb eines Funktionsblock\n' +
    'genutzt werden.';

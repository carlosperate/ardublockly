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
 * @fileoverview Portuguese strings.
 * @author adriano.machado@gmail.com (Adriano Machado)
 */
'use strict';

/**
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to message files.
 */

// Context menus.
Blockly.MSG_DUPLICATE_BLOCK = 'Duplicado';
Blockly.MSG_REMOVE_COMMENT = 'Remover Comentário';
Blockly.MSG_ADD_COMMENT = 'Criar Comentário';
Blockly.MSG_EXTERNAL_INPUTS = 'Entradas Externas';
Blockly.MSG_INLINE_INPUTS = 'Entradas Internas';
Blockly.MSG_DELETE_BLOCK = 'Excluir Bloco';
Blockly.MSG_DELETE_X_BLOCKS = 'Excluir %1 Blocos';
Blockly.MSG_COLLAPSE_BLOCK = 'Recolher Bloco';
Blockly.MSG_EXPAND_BLOCK = 'Expandir Bloco';
Blockly.MSG_DISABLE_BLOCK = 'Desabilitar Bloco';
Blockly.MSG_ENABLE_BLOCK = 'Habilitar Bloco';
Blockly.MSG_HELP = 'Ajuda';
Blockly.MSG_COLLAPSE_ALL = 'Recolher Blocos';
Blockly.MSG_EXPAND_ALL = 'Expandir Blocos';

// Variable renaming.
Blockly.MSG_CHANGE_VALUE_TITLE = 'Alterar valor:';
Blockly.MSG_NEW_VARIABLE = 'Nova variável...';
Blockly.MSG_NEW_VARIABLE_TITLE = 'Novo nome de variável:';
Blockly.MSG_RENAME_VARIABLE = 'Renomear variável...';
Blockly.MSG_RENAME_VARIABLE_TITLE = 'Renomear todas as "%1" variáveis para:';

// Colour Blocks.
Blockly.LANG_COLOUR_PICKER_HELPURL = 'http://pt.wikipedia.org/wiki/Cor';
Blockly.LANG_COLOUR_PICKER_TOOLTIP = 'Escolha uma cor da palheta de cores.';

Blockly.LANG_COLOUR_RANDOM_HELPURL = 'http://randomcolour.com';
Blockly.LANG_COLOUR_RANDOM_TITLE = 'cor aleatória';
Blockly.LANG_COLOUR_RANDOM_TOOLTIP = 'Escolher uma cor aleatoriamente.';

Blockly.LANG_COLOUR_RGB_HELPURL = 'http://www.december.com/html/spec/colorper.html';
Blockly.LANG_COLOUR_RGB_TITLE = 'cor com';
Blockly.LANG_COLOUR_RGB_RED = 'vermelho';
Blockly.LANG_COLOUR_RGB_GREEN = 'verde';
Blockly.LANG_COLOUR_RGB_BLUE = 'azul';
Blockly.LANG_COLOUR_RGB_TOOLTIP = 'Crie uma cor com os valores especificados de vermelho,\n' +
    'verde e azul.  Todos os valores devem estar entre 0 e 100.';

Blockly.LANG_COLOUR_BLEND_HELPURL = 'http://meyerweb.com/eric/tools/color-blend/';
Blockly.LANG_COLOUR_BLEND_TITLE = 'misturar';
Blockly.LANG_COLOUR_BLEND_COLOUR1 = 'cor 1';
Blockly.LANG_COLOUR_BLEND_COLOUR2 = 'cor 2';
Blockly.LANG_COLOUR_BLEND_RATIO = 'razão';
Blockly.LANG_COLOUR_BLEND_TOOLTIP = 'Mistura duas cores usando uma razão dada (0.0 - 1.0).';

// Loop Blocks.
Blockly.LANG_CONTROLS_REPEAT_HELPURL = 'http://en.wikipedia.org/wiki/For_loop';
Blockly.LANG_CONTROLS_REPEAT_TITLE_REPEAT = 'repetir';
Blockly.LANG_CONTROLS_REPEAT_TITLE_TIMES = 'vezes';
Blockly.LANG_CONTROLS_REPEAT_INPUT_DO = 'faça';
Blockly.LANG_CONTROLS_REPEAT_TOOLTIP = 'Realiza os passos várias vezes.';

Blockly.LANG_CONTROLS_WHILEUNTIL_HELPURL = 'http://code.google.com/p/blockly/wiki/Repeat';
Blockly.LANG_CONTROLS_WHILEUNTIL_INPUT_DO = 'faça';
Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE = 'repita enquanto';
Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL = 'repita até';
Blockly.LANG_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE = 'Enquanto um valor é verdadeiro, então realize alguns passos.';
Blockly.LANG_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL = 'Enquanto um valor é falso, então realize alguns passos.';

Blockly.LANG_CONTROLS_FOR_HELPURL = 'http://en.wikipedia.org/wiki/For_loop';
Blockly.LANG_CONTROLS_FOR_INPUT_WITH = 'contar com';
Blockly.LANG_CONTROLS_FOR_INPUT_VAR = 'x';
Blockly.LANG_CONTROLS_FOR_INPUT_FROM = 'de';
Blockly.LANG_CONTROLS_FOR_INPUT_TO = 'ate';
Blockly.LANG_CONTROLS_FOR_INPUT_BY = 'por';
Blockly.LANG_CONTROLS_FOR_INPUT_DO = 'faça';
Blockly.LANG_CONTROLS_FOR_TAIL = '';
Blockly.LANG_CONTROLS_FOR_TOOLTIP = 'Conta de um número inicial até um número final pelo intervalo especificado.\n' +
    'Para cada contagem, define o contador atual para\n' +
    'a variável "%1", e então realiza alguns passos.';

Blockly.LANG_CONTROLS_FOREACH_HELPURL = 'http://en.wikipedia.org/wiki/For_loop';
Blockly.LANG_CONTROLS_FOREACH_INPUT_ITEM = 'para cada item';
Blockly.LANG_CONTROLS_FOREACH_INPUT_VAR = 'x';
Blockly.LANG_CONTROLS_FOREACH_INPUT_INLIST = 'na lista';
Blockly.LANG_CONTROLS_FOREACH_INPUT_INLIST_TAIL = '';
Blockly.LANG_CONTROLS_FOREACH_INPUT_DO = 'faça';
Blockly.LANG_CONTROLS_FOREACH_TOOLTIP = 'Para cada item em uma lista, define o item\n' +
    'para a variável "%1", e então realiza alguns passos.';

Blockly.LANG_CONTROLS_FLOW_STATEMENTS_HELPURL = 'http://en.wikipedia.org/wiki/Control_flow';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK = 'encerra o laço';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE = 'continua com a próxima iteração do laço';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK = 'Encerra o laço.';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE = 'Ignora o resto deste laço, e\n' +
    'continua com a próxima iteração.';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_WARNING = 'Atenção:\n' +
    'Este bloco só pode ser\n' +
    'usado dentro de um laço.';

// Logic Blocks.
Blockly.LANG_CONTROLS_IF_HELPURL = 'http://code.google.com/p/blockly/wiki/If_Then';
Blockly.LANG_CONTROLS_IF_TOOLTIP_1 = 'Se um valor é verdadeiro, então realize alguns passos.';
Blockly.LANG_CONTROLS_IF_TOOLTIP_2 = 'Se um valor é verdadeiro, então realize o primeiro bloco de passos.\n' +
    'Senão, realize o segundo bloco de passos.';
Blockly.LANG_CONTROLS_IF_TOOLTIP_3 = 'Se o primeiro valor é verdadeiro, então realize o primeiro bloco de passos.\n' +
    'Senão, se o segundo valor é verdadeiro, realize o segundo bloco de passos.';
Blockly.LANG_CONTROLS_IF_TOOLTIP_4 = 'Se o primeiro valor é verdadeiro, então realize o primeiro bloco de passos.\n' +
    'Senão, se o segundo valor é verdadeiro, realize o segundo bloco de passos.\n' +
    'Se nenhum dos blocos for verdadeiro, realize o último bloco de passos.';
Blockly.LANG_CONTROLS_IF_MSG_IF = 'se';
Blockly.LANG_CONTROLS_IF_MSG_ELSEIF = 'senão se';
Blockly.LANG_CONTROLS_IF_MSG_ELSE = 'senão';
Blockly.LANG_CONTROLS_IF_MSG_THEN = 'faça';
Blockly.LANG_CONTROLS_IF_IF_TITLE_IF = 'se';
Blockly.LANG_CONTROLS_IF_IF_TOOLTIP = 'Acrescente, remova ou reordene seções\n' +
    'para reconfigurar este bloco.';
Blockly.LANG_CONTROLS_IF_ELSEIF_TITLE_ELSEIF = 'senão se';
Blockly.LANG_CONTROLS_IF_ELSEIF_TOOLTIP = 'Acrescente uma condição para o bloco se.';
Blockly.LANG_CONTROLS_IF_ELSE_TITLE_ELSE = 'senão';
Blockly.LANG_CONTROLS_IF_ELSE_TOOLTIP = 'Acrescente uma condição final para o bloco se.';

Blockly.LANG_LOGIC_COMPARE_HELPURL = 'http://en.wikipedia.org/wiki/Inequality_(mathematics)';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_EQ = 'Retorna verdadeiro se ambas as entradas forem iguais.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_NEQ = 'Retorna verdadeiro se ambas as entradas forem diferentes.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LT = 'Retorna verdadeiro se a primeira entrada for menor\n' +
    'que a segunda entrada.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LTE = 'Retorna verdadeiro se a primeira entrada for menor\n' +
    'ou igual à segunda entrada.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GT = 'Retorna verdadeiro se a primeira entrada for maior\n' +
    'que a segunda entrada.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GTE = 'Retorna verdadeiro se a primeira entrada for maior\n' +
    'ou igual à segunda entrada.';

Blockly.LANG_LOGIC_OPERATION_HELPURL = 'http://code.google.com/p/blockly/wiki/And_Or';
Blockly.LANG_LOGIC_OPERATION_AND = 'e';
Blockly.LANG_LOGIC_OPERATION_OR = 'ou';
Blockly.LANG_LOGIC_OPERATION_TOOLTIP_AND = 'Retorna verdadeiro se ambas as entradas forem verdadeiras.';
Blockly.LANG_LOGIC_OPERATION_TOOLTIP_OR = 'Retorna verdadeiro se uma das estradas for verdadeira.';

Blockly.LANG_LOGIC_NEGATE_HELPURL = 'http://code.google.com/p/blockly/wiki/Not';
Blockly.LANG_LOGIC_NEGATE_INPUT_NOT = 'não';
Blockly.LANG_LOGIC_NEGATE_TOOLTIP = 'Retorna verdadeiro se a entrada for falsa.\n' +
    'Retorna false se a entrada for verdadeira.';

Blockly.LANG_LOGIC_BOOLEAN_HELPURL = 'http://code.google.com/p/blockly/wiki/True_False';
Blockly.LANG_LOGIC_BOOLEAN_TRUE = 'verdadeiro';
Blockly.LANG_LOGIC_BOOLEAN_FALSE = 'falso';
Blockly.LANG_LOGIC_BOOLEAN_TOOLTIP = 'Retorna verdadeiro ou falso.';

Blockly.LANG_LOGIC_NULL_HELPURL = 'http://en.wikipedia.org/wiki/Nullable_type';
Blockly.LANG_LOGIC_NULL = 'nulo';
Blockly.LANG_LOGIC_NULL_TOOLTIP = 'Retorna nulo.';

Blockly.LANG_LOGIC_TERNARY_HELPURL = 'http://en.wikipedia.org/wiki/%3F:';
Blockly.LANG_LOGIC_TERNARY_CONDITION = 'teste';
Blockly.LANG_LOGIC_TERNARY_IF_TRUE = 'se verdadeiro';
Blockly.LANG_LOGIC_TERNARY_IF_FALSE = 'se falso';
Blockly.LANG_LOGIC_TERNARY_TOOLTIP = 'Avalia a condição em "teste". Se a condição for verdadeira\n' +
    'retorna o valor "se verdadeiro", senão retorna o valor "se falso".';

// Math Blocks.
Blockly.LANG_MATH_NUMBER_HELPURL = 'http://en.wikipedia.org/wiki/Number';
Blockly.LANG_MATH_NUMBER_TOOLTIP = 'Um número.';

Blockly.LANG_MATH_ARITHMETIC_HELPURL = 'http://en.wikipedia.org/wiki/Arithmetic';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_ADD = 'Retorna a soma de dois números.';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_MINUS = 'Retorna a diferença de dois números.';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_MULTIPLY = 'Retorna o produto de dois números.';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_DIVIDE = 'Retorna o quociente da divisão de dois números.';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_POWER = 'Retorna o primeiro número elevado\n' +
    'à potência do segundo número.';

Blockly.LANG_MATH_SINGLE_HELPURL = 'http://en.wikipedia.org/wiki/Square_root';
Blockly.LANG_MATH_SINGLE_OP_ROOT = 'raíz quadrada';
Blockly.LANG_MATH_SINGLE_OP_ABSOLUTE = 'absoluto';
Blockly.LANG_MATH_SINGLE_TOOLTIP_ROOT = 'Retorna a raiz quadrada de um número.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_ABS = 'Retorna o valor absoluto de um número.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_NEG = 'Retorna o oposto de um número.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_LN = 'Retorna o logarítmo natural de um número.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_LOG10 = 'Retorna o logarítmo em base 10 de um número.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_EXP = 'Retorna o número e elevado à potência de um número.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_POW10 = 'Retorna 10 elevado à potência de um número.';

Blockly.LANG_MATH_TRIG_HELPURL = 'http://en.wikipedia.org/wiki/Trigonometric_functions';
Blockly.LANG_MATH_TRIG_TOOLTIP_SIN = 'Retorna o seno de um grau (não radiano).';
Blockly.LANG_MATH_TRIG_TOOLTIP_COS = 'Retorna o cosseno de um grau (não radiano).';
Blockly.LANG_MATH_TRIG_TOOLTIP_TAN = 'Retorna a tangente de um grau (não radiano).';
Blockly.LANG_MATH_TRIG_TOOLTIP_ASIN = 'Retorna o arco seno de um número.';
Blockly.LANG_MATH_TRIG_TOOLTIP_ACOS = 'Retorna o arco cosseno de um número.';
Blockly.LANG_MATH_TRIG_TOOLTIP_ATAN = 'Retorna o arco tangente de um número.';

Blockly.LANG_MATH_CONSTANT_HELPURL = 'http://en.wikipedia.org/wiki/Mathematical_constant';
Blockly.LANG_MATH_CONSTANT_TOOLTIP = 'Retorna uma das constantes comuns: \u03c0 (3.141\u2026), e (2.718\u2026), \u03c6 (1.618\u2026),\n' +
    'sqrt(2) (1.414\u2026), sqrt(\u00bd) (0.707\u2026), ou \u221e (infinito).';

Blockly.LANG_MATH_IS_EVEN = 'é par';
Blockly.LANG_MATH_IS_ODD = 'é impar';
Blockly.LANG_MATH_IS_PRIME = 'é primo';
Blockly.LANG_MATH_IS_WHOLE = 'é inteiro';
Blockly.LANG_MATH_IS_POSITIVE = 'é positivo';
Blockly.LANG_MATH_IS_NEGATIVE = 'é negativo';
Blockly.LANG_MATH_IS_DIVISIBLE_BY = 'é divisível por';
Blockly.LANG_MATH_IS_TOOLTIP = 'Verifica se um número é par, impar, inteiro, positivo, negativo,\n' +
    'ou se é divisível por outro número.  Retorna verdadeiro ou falso.';

Blockly.LANG_MATH_CHANGE_HELPURL = 'http://en.wikipedia.org/wiki/Programming_idiom#Incrementing_a_counter';
Blockly.LANG_MATH_CHANGE_TITLE_CHANGE = 'alterar';
Blockly.LANG_MATH_CHANGE_TITLE_ITEM = 'item';
Blockly.LANG_MATH_CHANGE_INPUT_BY = 'por';
Blockly.LANG_MATH_CHANGE_TOOLTIP = 'Soma um número à variável "%1".';

Blockly.LANG_MATH_ROUND_HELPURL = 'http://en.wikipedia.org/wiki/Rounding';
Blockly.LANG_MATH_ROUND_TOOLTIP = 'Arredonda um número para cima ou para baixo.';
Blockly.LANG_MATH_ROUND_OPERATOR_ROUND = 'arredonda';
Blockly.LANG_MATH_ROUND_OPERATOR_ROUNDUP = 'arredonda para cima';
Blockly.LANG_MATH_ROUND_OPERATOR_ROUNDDOWN = 'arredonda para baixo';

Blockly.LANG_MATH_ONLIST_HELPURL = '';
Blockly.LANG_MATH_ONLIST_OPERATOR_SUM = 'soma de uma lista';
Blockly.LANG_MATH_ONLIST_OPERATOR_MIN = 'menor de uma lista';
Blockly.LANG_MATH_ONLIST_OPERATOR_MAX = 'maior de uma lista';
Blockly.LANG_MATH_ONLIST_OPERATOR_AVERAGE = 'média de uma lista';
Blockly.LANG_MATH_ONLIST_OPERATOR_MEDIAN = 'mediana de uma lista';
Blockly.LANG_MATH_ONLIST_OPERATOR_MODE = 'modo de uma lista';
Blockly.LANG_MATH_ONLIST_OPERATOR_STD_DEV = 'desvio padrão de uma lista';
Blockly.LANG_MATH_ONLIST_OPERATOR_RANDOM = 'item aleatório de uma lista';
Blockly.LANG_MATH_ONLIST_TOOLTIP_SUM = 'Retorna a soma de todos os números em uma lista.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MIN = 'Retorna o menor número de uma lista.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MAX = 'Retorna o maior número de uma lista.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_AVERAGE = 'Retorna a média aritmética de os números de uma lista.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MEDIAN = 'Retorna a mediana de os números em uma lista.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MODE = 'Retorna a lista de item(ns) mais comum(ns) de uma lista.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_STD_DEV = 'Retorna o desvio padrão de os números de uma lista.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_RANDOM = 'Retorna um elemento aleatório de uma lista.';

Blockly.LANG_MATH_MODULO_HELPURL = 'http://en.wikipedia.org/wiki/Modulo_operation';
Blockly.LANG_MATH_MODULO_INPUT_DIVIDEND = 'resto da divisão de';
Blockly.LANG_MATH_MODULO_TOOLTIP = 'Retorna o resto da divisão de dois números.';

Blockly.LANG_MATH_CONSTRAIN_HELPURL = 'http://en.wikipedia.org/wiki/Clamping_%28graphics%29';
Blockly.LANG_MATH_CONSTRAIN_INPUT_CONSTRAIN = 'restringe';
Blockly.LANG_MATH_CONSTRAIN_INPUT_LOW = 'inferior';
Blockly.LANG_MATH_CONSTRAIN_INPUT_HIGH = 'superior';
Blockly.LANG_MATH_CONSTRAIN_TOOLTIP = 'Restringe um número entre os limites especificados (inclusive).';

Blockly.LANG_MATH_RANDOM_INT_HELPURL = 'http://en.wikipedia.org/wiki/Random_number_generation';
Blockly.LANG_MATH_RANDOM_INT_INPUT_FROM = 'inteiro aleatório entre';
Blockly.LANG_MATH_RANDOM_INT_INPUT_TO = 'e';
Blockly.LANG_MATH_RANDOM_INT_TOOLTIP = 'Retorna um número inteiro entre os dois limites\n' +
    'informados, inclusive.';

Blockly.LANG_MATH_RANDOM_FLOAT_HELPURL = 'http://en.wikipedia.org/wiki/Random_number_generation';
Blockly.LANG_MATH_RANDOM_FLOAT_TITLE_RANDOM = 'random fraction';
Blockly.LANG_MATH_RANDOM_FLOAT_TOOLTIP = 'Return a random fraction between\n' +
    '0.0 (inclusive) and 1.0 (exclusive).';

// Text Blocks.
Blockly.LANG_TEXT_TEXT_HELPURL = 'http://en.wikipedia.org/wiki/String_(computer_science)';
Blockly.LANG_TEXT_TEXT_TOOLTIP = 'Uma letra, palavra ou linha de texto.';

Blockly.LANG_TEXT_JOIN_HELPURL = '';
Blockly.LANG_TEXT_JOIN_TITLE_CREATEWITH = 'criar texto com';
Blockly.LANG_TEXT_JOIN_TOOLTIP = 'Criar um pedaço de texto juntando\n' +
    'qualquer número de itens.';

Blockly.LANG_TEXT_CREATE_JOIN_TITLE_JOIN = 'unir';
Blockly.LANG_TEXT_CREATE_JOIN_TOOLTIP = 'Acrescenta, remove ou reordena seções para reconfigurar este bloco de texto.';

Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM = 'item';
Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP = 'Acrescentar um item ao texto.';

Blockly.LANG_TEXT_APPEND_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_APPEND_TO = 'para';
Blockly.LANG_TEXT_APPEND_APPENDTEXT = 'acrescentar texto';
Blockly.LANG_TEXT_APPEND_VARIABLE = 'item';
Blockly.LANG_TEXT_APPEND_TOOLTIP = 'Acrescentar um pedaço de texto à variável "%1".';

Blockly.LANG_TEXT_LENGTH_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_LENGTH_INPUT_LENGTH = 'tamanho de';
Blockly.LANG_TEXT_LENGTH_TOOLTIP = 'Conta o número de letras (incluindo espaços)\n' +
    'no texto fornecido.';

Blockly.LANG_TEXT_ISEMPTY_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_ISEMPTY_INPUT_ISEMPTY = 'é vazio';
Blockly.LANG_TEXT_ISEMPTY_TOOLTIP = 'Retorna verdadeiro se o texto fornecido for vazio.';

Blockly.LANG_TEXT_INDEXOF_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_TEXT_INDEXOF_INPUT_INTEXT = 'no texto';
Blockly.LANG_TEXT_INDEXOF_OPERATOR_FIRST = 'primeira ocorrência do texto';
Blockly.LANG_TEXT_INDEXOF_OPERATOR_LAST = 'última ocorrência do texto';
Blockly.LANG_TEXT_INDEXOF_TOOLTIP = 'Retorna a posição da primeira/última ocorrência\n' +
    'do primeiro texto no segundo texto.\n' +
    'Retorna 0 se o texto não for encontrado.';

Blockly.LANG_TEXT_CHARAT_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_TEXT_CHARAT_INPUT_INTEXT = 'no texto';
Blockly.LANG_TEXT_CHARAT_FROM_START = 'obter letra nº';
Blockly.LANG_TEXT_CHARAT_FROM_END = 'obter letra nº a partir do final';
Blockly.LANG_TEXT_CHARAT_FIRST = 'obter primeira letra';
Blockly.LANG_TEXT_CHARAT_LAST = 'obter última letra';
Blockly.LANG_TEXT_CHARAT_RANDOM = 'obter letra aleatória';
Blockly.LANG_TEXT_CHARAT_TOOLTIP = 'Retorna a letra na posição especificada.';

Blockly.LANG_TEXT_SUBSTRING_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_TEXT_SUBSTRING_INPUT_IN_TEXT = 'no texto';
Blockly.LANG_TEXT_SUBSTRING_INPUT_AT1 = 'obter trecho de';
Blockly.LANG_TEXT_SUBSTRING_INPUT_AT2 = 'até';
Blockly.LANG_TEXT_SUBSTRING_FROM_START = 'letra nº';
Blockly.LANG_TEXT_SUBSTRING_FROM_END = 'letra nº a partir do final';
Blockly.LANG_TEXT_SUBSTRING_FIRST = 'primeira letra';
Blockly.LANG_TEXT_SUBSTRING_LAST = 'última letra';
Blockly.LANG_TEXT_SUBSTRING_TOOLTIP = 'Retorna o trecho de texto especificado.';

Blockly.LANG_TEXT_CHANGECASE_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_CHANGECASE_OPERATOR_UPPERCASE = 'para MAIÚSCULAS';
Blockly.LANG_TEXT_CHANGECASE_OPERATOR_LOWERCASE = 'para minúsculas';
Blockly.LANG_TEXT_CHANGECASE_OPERATOR_TITLECASE = 'para Nomes Próprios';
Blockly.LANG_TEXT_CHANGECASE_TOOLTIP = 'Retorna uma cópia do texto em um formato diferente.';

Blockly.LANG_TEXT_TRIM_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_TRIM_OPERATOR_BOTH = 'remover espaços de ambos os lados';
Blockly.LANG_TEXT_TRIM_OPERATOR_LEFT = 'remover espaços à esquerda';
Blockly.LANG_TEXT_TRIM_OPERATOR_RIGHT = 'remover espaços à direita';
Blockly.LANG_TEXT_TRIM_TOOLTIP = 'Retorna uma cópia do texto com os espaços\n' +
    'removidos de uma ou ambas extremidades.';

Blockly.LANG_TEXT_PRINT_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_PRINT_TITLE_PRINT = 'imprime';
Blockly.LANG_TEXT_PRINT_TOOLTIP = 'Imprime o texto, número ou valor especificado.';

Blockly.LANG_TEXT_PROMPT_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode92.html';
Blockly.LANG_TEXT_PROMPT_TYPE_TEXT = 'Pede um texto com uma mensagem';
Blockly.LANG_TEXT_PROMPT_TYPE_NUMBER = 'Pede um número com uma mensagem';
Blockly.LANG_TEXT_PROMPT_TOOLTIP_NUMBER = 'Pede ao usuário um número.';
Blockly.LANG_TEXT_PROMPT_TOOLTIP_TEXT = 'Pede ao usuário um texto.';

// Lists Blocks.
Blockly.LANG_LISTS_CREATE_EMPTY_HELPURL = 'http://en.wikipedia.org/wiki/Linked_list#Empty_lists';
Blockly.LANG_LISTS_CREATE_EMPTY_TITLE = 'criar lista vazia';
Blockly.LANG_LISTS_CREATE_EMPTY_TOOLTIP = 'Retorna uma lista, de tamanho 0, contendo nenhum registro';

Blockly.LANG_LISTS_CREATE_WITH_INPUT_WITH = 'criar lista com';
Blockly.LANG_LISTS_CREATE_WITH_TOOLTIP = 'Cria uma lista com a quantidade de itens informada.';

Blockly.LANG_LISTS_CREATE_WITH_CONTAINER_TITLE_ADD = 'lista';
Blockly.LANG_LISTS_CREATE_WITH_CONTAINER_TOOLTIP = 'Acrescente, remova ou reordene as seções para reconfigurar este bloco.';

Blockly.LANG_LISTS_CREATE_WITH_ITEM_TITLE = 'item';
Blockly.LANG_LISTS_CREATE_WITH_ITEM_TOOLTIP = 'Acrescenta um item à lista.';

Blockly.LANG_LISTS_REPEAT_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_REPEAT_INPUT_WITH = 'criar lista com item';
Blockly.LANG_LISTS_REPEAT_INPUT_REPEATED = 'repetido';
Blockly.LANG_LISTS_REPEAT_INPUT_TIMES = 'vezes';
Blockly.LANG_LISTS_REPEAT_TOOLTIP = 'Cria uma lista consistida pelo valor informado\n' +
    'repetido o número de vezes especificado.';

Blockly.LANG_LISTS_LENGTH_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_LISTS_LENGTH_INPUT_LENGTH = 'tamanho de';
Blockly.LANG_LISTS_LENGTH_TOOLTIP = 'Retorna o tamanho de uma lista.';

Blockly.LANG_LISTS_IS_EMPTY_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_LISTS_INPUT_IS_EMPTY = 'é vazia';
Blockly.LANG_LISTS_TOOLTIP = 'Retona verdadeiro se a lista estiver vazia.';

Blockly.LANG_LISTS_INDEX_OF_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_INDEX_OF_INPUT_IN_LIST = 'na lista';
Blockly.LANG_LISTS_INDEX_OF_FIRST = 'encontre a primeira ocorrência do item';
Blockly.LANG_LISTS_INDEX_OF_LAST = 'encontre a última ocorrência do item';
Blockly.LANG_LISTS_INDEX_OF_TOOLTIP = 'Retorna a posição da primeira/última ocorrência\n' +
    'do item na lista.\n' +
    'Retorna 0 se o texto não for encontrado.';

Blockly.LANG_LISTS_GET_INDEX_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_GET_INDEX_GET = 'obter';
Blockly.LANG_LISTS_GET_INDEX_GET_REMOVE = 'obter e remover';
Blockly.LANG_LISTS_GET_INDEX_REMOVE = 'remover';
Blockly.LANG_LISTS_GET_INDEX_FROM_START = 'nº';
Blockly.LANG_LISTS_GET_INDEX_FROM_END = 'nº a partir do final';
Blockly.LANG_LISTS_GET_INDEX_FIRST = 'primeiro';
Blockly.LANG_LISTS_GET_INDEX_LAST = 'último';
Blockly.LANG_LISTS_GET_INDEX_RANDOM = 'aleatório';
Blockly.LANG_LISTS_GET_INDEX_INPUT_IN_LIST = 'na lista';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_FROM_START = 'Retorna o item da lista na posição especificada.\n' +
    '#1 é o primeiro item.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_FROM_END = 'Retorna o item da lista na posição especificada.\n' +
    '#1 é o último item.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_FIRST = 'Retorna o primeiro item em uma lista.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_LAST = 'Retorna o último item em uma lista.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_RANDOM = 'Retorna um item aleatório de uma lista.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM_START = 'Remove and retorna o item na posição especificada\n' +
    ' em uma lista.  #1 é o primeiro item.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM_END = 'Remove and retorna o item na posição especificada\n' +
    ' em uma lista.  #1 é o último item.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FIRST = 'Remove e retorna o primeiro item de uma lista.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_LAST = 'Remove e retorna o último item de uma lista.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM = 'Remove e retorna um item aleatório de uma lista.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM_START = 'Remove e retorna o item na posição especificada\n' +
    ' em uma lista.  #1 é o primeiro item.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM_END = 'Removes the item at the specified position\n' +
    ' em uma lista.  #1 é o último item.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_REMOVE_FIRST = 'Remove o primeiro item de uma lista.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_REMOVE_LAST = 'Remove o último item de uma lista.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_REMOVE_RANDOM = 'Remove um item aleatório de uma lista.';

Blockly.LANG_LISTS_SET_INDEX_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_SET_INDEX_INPUT_IN_LIST = 'na lista';
Blockly.LANG_LISTS_SET_INDEX_SET = 'definir';
Blockly.LANG_LISTS_SET_INDEX_INSERT = 'inserir em';
Blockly.LANG_LISTS_SET_INDEX_INPUT_TO = 'como';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_SET_FROM_START = 'Define o item da posição especificada de uma lista.\n' +
    '#1 é o primeiro item.';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_SET_FROM_END = 'Define o item da posição especificada de uma lista.\n' +
    '#1 é o último item.';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_SET_FIRST = 'Define o primeiro item de uma lista.';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_SET_LAST = 'Define o último item de uma lista.';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_SET_RANDOM = 'Define um item aleatório de uma lista.';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_INSERT_FROM_START = 'Insere o item na posição especificada em uma lista.\n' +
    '#1 é o primeiro item.';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_INSERT_FROM_END = 'Insere o item na posição especificada em uma lista.\n' +
    '#1 é o último item.';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_INSERT_FIRST = 'Insere o item no início da lista.';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_INSERT_LAST = 'Insere o item no final da lista.';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_INSERT_RANDOM = 'Insere o item em uma posição qualquer da lista.';

Blockly.LANG_LISTS_GET_SUBLIST_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_GET_SUBLIST_INPUT_IN_LIST = 'na lista';
Blockly.LANG_LISTS_GET_SUBLIST_INPUT_AT1 = 'obtem sublista de';
Blockly.LANG_LISTS_GET_SUBLIST_INPUT_AT2 = 'até';
Blockly.LANG_LISTS_GET_SUBLIST_TOOLTIP = 'Cria uma cópia da porção especificada de uma lista.';

// Variables Blocks.
Blockly.LANG_VARIABLES_GET_HELPURL = 'http://en.wikipedia.org/wiki/Variable_(computer_science)';
Blockly.LANG_VARIABLES_GET_TITLE = null;
Blockly.LANG_VARIABLES_GET_ITEM = 'item';
Blockly.LANG_VARIABLES_GET_TAIL = null;
Blockly.LANG_VARIABLES_GET_TOOLTIP = 'Retorna o valor desta variável.';
Blockly.LANG_VARIABLES_GET_CREATE_SET = 'Criar "definir %1"';

Blockly.LANG_VARIABLES_SET_HELPURL = 'http://en.wikipedia.org/wiki/Variable_(computer_science)';
Blockly.LANG_VARIABLES_SET_TITLE = 'definir';
Blockly.LANG_VARIABLES_SET_ITEM = 'item';
Blockly.LANG_VARIABLES_SET_TAIL = 'para';
Blockly.LANG_VARIABLES_SET_TOOLTIP = 'Define esta variável para o valor informado.';
Blockly.LANG_VARIABLES_SET_CREATE_GET = 'Criar "obter %1"';

// Procedures Blocks.
Blockly.LANG_PROCEDURES_DEFNORETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_DEFNORETURN_TITLE = 'para';
Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE = 'faça algo';
Blockly.LANG_PROCEDURES_BEFORE_PARAMS = 'com:';
Blockly.LANG_PROCEDURES_DEFNORETURN_DO = '';
Blockly.LANG_PROCEDURES_DEFNORETURN_TOOLTIP = 'Cria uma função que não tem retorno.';

Blockly.LANG_PROCEDURES_DEFRETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_DEFRETURN_TITLE = Blockly.LANG_PROCEDURES_DEFNORETURN_TITLE;
Blockly.LANG_PROCEDURES_DEFRETURN_PROCEDURE = Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE;
Blockly.LANG_PROCEDURES_DEFRETURN_DO = Blockly.LANG_PROCEDURES_DEFNORETURN_DO;
Blockly.LANG_PROCEDURES_DEFRETURN_RETURN = 'retorna';
Blockly.LANG_PROCEDURES_DEFRETURN_TOOLTIP = 'Cria uma função que possui um valor de retorno.';

Blockly.LANG_PROCEDURES_DEF_DUPLICATE_WARNING = 'Atenção:\n' +
    'Esta função tem\n' +
    'parâmetros duplicados.';

Blockly.LANG_PROCEDURES_CALLNORETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_CALLNORETURN_CALL = '';
Blockly.LANG_PROCEDURES_CALLNORETURN_TOOLTIP = 'Executa a função "%1".';

Blockly.LANG_PROCEDURES_CALLRETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_CALLRETURN_CALL = Blockly.LANG_PROCEDURES_CALLNORETURN_CALL;
Blockly.LANG_PROCEDURES_CALLRETURN_TOOLTIP = 'Executa a função "%1" e usa seu retorno.';

Blockly.LANG_PROCEDURES_MUTATORCONTAINER_TITLE = 'entradas';
Blockly.LANG_PROCEDURES_MUTATORARG_TITLE = 'nome da entrada:';

Blockly.LANG_PROCEDURES_HIGHLIGHT_DEF = 'Destacar definição de procedimento';
Blockly.LANG_PROCEDURES_CREATE_DO = 'Criar "%1"';

Blockly.LANG_PROCEDURES_IFRETURN_TOOLTIP = 'Se o valor é verdadeiro, então retorna um valor.';
Blockly.LANG_PROCEDURES_IFRETURN_WARNING = 'Atenção:\n' +
    'Este bloco só pode ser\n' +
    'utilizado dentro da definição de uma função.';

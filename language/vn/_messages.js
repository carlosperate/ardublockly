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
 * @fileoverview Vietnamese strings.
 * @author fraser@google.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.messages.vn');

/**
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to message files.
 */

// Context menus.
Blockly.MSG_DUPLICATE_BLOCK = 'Tạo Bản Sao';
Blockly.MSG_REMOVE_COMMENT = 'Xóa Chú Giải';
Blockly.MSG_ADD_COMMENT = 'Thêm Chú Giải';
Blockly.MSG_EXTERNAL_INPUTS = 'Chỗ Gắn Bên Ngoài';
Blockly.MSG_INLINE_INPUTS = 'Chỗ Gắn Cùng Dòng';
Blockly.MSG_DELETE_BLOCK = 'Xóa Mảnh Này';
Blockly.MSG_DELETE_X_BLOCKS = 'Xóa %1 Mảnh';
Blockly.MSG_COLLAPSE_BLOCK = 'Thu Gọn';
Blockly.MSG_EXPAND_BLOCK = 'Mở Lớn';
Blockly.MSG_DISABLE_BLOCK = 'Ngưng Tác Dụng';
Blockly.MSG_ENABLE_BLOCK = 'Phục Hồi Tác Dụng';
Blockly.MSG_HELP = 'Trợ Giúp';

// Variable renaming.
Blockly.MSG_CHANGE_VALUE_TITLE = 'Thay giá trị thành:';
Blockly.MSG_NEW_VARIABLE = 'Biến mới...';
Blockly.MSG_NEW_VARIABLE_TITLE = 'Tên của biến mới:';
Blockly.MSG_RENAME_VARIABLE = 'Thay tên biến...';
Blockly.MSG_RENAME_VARIABLE_TITLE = 'Thay tên tất cả "%1" biến này thành:';

// Colour Blocks.
Blockly.LANG_COLOUR_PICKER_HELPURL = 'http://en.wikipedia.org/wiki/Color';
Blockly.LANG_COLOUR_PICKER_TOOLTIP = 'Chọn một màu từ bảng màu.';

Blockly.LANG_COLOUR_RGB_HELPURL = 'http://www.december.com/html/spec/colorper.html;
Blockly.LANG_COLOUR_RGB_TITLE = 'Tạo màu từ';
Blockly.LANG_COLOUR_RGB_RED = 'màu đỏ';
Blockly.LANG_COLOUR_RGB_GREEN = 'màu xanh lá cây';
Blockly.LANG_COLOUR_RGB_BLUE = 'màu xanh dương';
Blockly.LANG_COLOUR_RGB_TOOLTIP = 'Tạo màu từ ba màu: đỏ, xanh lá cây,\n' +
    'xanh dương với số lượng cụ thể.\n' +
    'Mỗi số phải có giá trị từ 0 đến 100.';

Blockly.LANG_COLOUR_BLEND_HELPURL = 'http://meyerweb.com/eric/tools/color-blend/';
Blockly.LANG_COLOUR_BLEND_TITLE = 'pha';
Blockly.LANG_COLOUR_BLEND_COLOUR1 = 'màu 1';
Blockly.LANG_COLOUR_BLEND_COLOUR2 = 'màu 2';
Blockly.LANG_COLOUR_BLEND_RATIO = 'tỉ lệ';
Blockly.LANG_COLOUR_BLEND_TOOLTIP = 'Pha hai màu với nhau theo tỉ lệ (0 - 100).';

// Control Blocks.
Blockly.LANG_CONTROLS_IF_HELPURL = 'http://code.google.com/p/blockly/wiki/If_Then';
Blockly.LANG_CONTROLS_IF_TOOLTIP_1 = 'Nếu điều kiện đúng, thực hiện các lệnh.';
Blockly.LANG_CONTROLS_IF_TOOLTIP_2 = 'Nếu điều kiện đúng, thực hiện các lệnh đầu.\n' +
    'Nếu sai, thực hiện các lệnh sau.';
Blockly.LANG_CONTROLS_IF_TOOLTIP_3 = 'Nếu điều kiện đúng, thực hiện các lệnh đầu.\n' +
    'Nếu không, nếu điều kiện thứ hai đúng, thực hiện các lệnh thứ hai.';
Blockly.LANG_CONTROLS_IF_TOOLTIP_4 = 'Nếu điều kiện đúng, thực hiện các lệnh đầu.\n' +
    'Nếu không, nếu điều kiện thứ hai đúng, thực hiện các lệnh thứ hai.\n' +
    'Nếu không điều kiện nào đúng, thực hiện các lệnh cuối cùng.';
Blockly.LANG_CONTROLS_IF_MSG_IF = 'nếu';
Blockly.LANG_CONTROLS_IF_MSG_ELSEIF = 'nếu không nếu';
Blockly.LANG_CONTROLS_IF_MSG_ELSE = 'nếu không';
Blockly.LANG_CONTROLS_IF_MSG_THEN = 'thực hiện';

Blockly.LANG_CONTROLS_IF_IF_TITLE_IF = 'nếu';
Blockly.LANG_CONTROLS_IF_IF_TOOLTIP = 'Thêm, bỏ, hoặc đổi thứ tự các mảnh con\n' +
    'để tạo cấu trúc mới cho mảnh nếu.';

Blockly.LANG_CONTROLS_IF_ELSEIF_TITLE_ELSEIF = 'nếu không nếu';
Blockly.LANG_CONTROLS_IF_ELSEIF_TOOLTIP = 'Thêm một điều kiện vào mảnh nếu.';

Blockly.LANG_CONTROLS_IF_ELSE_TITLE_ELSE = 'nếu không';
Blockly.LANG_CONTROLS_IF_ELSE_TOOLTIP = 'Cuối cùng, khi không điều kiện nào đúng.';

Blockly.LANG_CONTROLS_REPEAT_HELPURL = 'http://en.wikipedia.org/wiki/For_loop';
Blockly.LANG_CONTROLS_REPEAT_TITLE_REPEAT = 'lặp lại';
Blockly.LANG_CONTROLS_REPEAT_TITLE_TIMES = 'lần';
Blockly.LANG_CONTROLS_REPEAT_INPUT_DO = 'thực hiện';
Blockly.LANG_CONTROLS_REPEAT_TOOLTIP = 'Thực hiện các lệnh vài lần.';

Blockly.LANG_CONTROLS_WHILEUNTIL_HELPURL = 'http://code.google.com/p/blockly/wiki/Repeat';
Blockly.LANG_CONTROLS_WHILEUNTIL_TITLE_REPEAT = 'lặp lại';
Blockly.LANG_CONTROLS_WHILEUNTIL_INPUT_DO = 'thực hiện';
Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE = 'trong khi';
Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL = 'cho đến khi';
Blockly.LANG_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE = 'Miễn là điều kiện còn đúng, thì thực hiện các lệnh.';
Blockly.LANG_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL = 'Miễn là điều kiện còn sai, thì thực hiện các lệnh\n' +
    'Khi điều kiện đúng thì ngưng.';

Blockly.LANG_CONTROLS_FOR_HELPURL = 'http://en.wikipedia.org/wiki/For_loop';
Blockly.LANG_CONTROLS_FOR_INPUT_WITH = 'đếm theo';
Blockly.LANG_CONTROLS_FOR_INPUT_VAR = 'x';
Blockly.LANG_CONTROLS_FOR_INPUT_FROM = 'từ';
Blockly.LANG_CONTROLS_FOR_INPUT_TO = 'đến';
Blockly.LANG_CONTROLS_FOR_INPUT_DO = 'thực hiện';
Blockly.LANG_CONTROLS_FOR_TOOLTIP = 'Đếm từ số đầu đến số cuối.\n' +
    'Khi đến mỗi số, gán số vào biến "%1"\n' +
    'rồi thực hiện các lệnh.';

Blockly.LANG_CONTROLS_FOREACH_HELPURL = 'http://en.wikipedia.org/wiki/For_loop';
Blockly.LANG_CONTROLS_FOREACH_INPUT_ITEM = 'với mỗi thành phần';
Blockly.LANG_CONTROLS_FOREACH_INPUT_VAR = 'x';
Blockly.LANG_CONTROLS_FOREACH_INPUT_INLIST = 'trong danh sách';
Blockly.LANG_CONTROLS_FOREACH_INPUT_DO = 'thực hiện';
Blockly.LANG_CONTROLS_FOREACH_TOOLTIP = 'Trong một danh sách, lấy từng thành phần, gán vào\n' +
    'biến "%1", rồi thực hiện một số lệnh.';

Blockly.LANG_CONTROLS_FLOW_STATEMENTS_HELPURL = 'http://en.wikipedia.org/wiki/Control_flow';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP = 'vòng lặp';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK = 'thoát';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE = 'sang lần lặp tiếp theo';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK = 'Thoát khỏi vòng lặp hiện tại.';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE = 'Bỏ qua phần còn lại trong vòng lặp này,\n' +
    'và sang lần lặp tiếp theo.';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_WARNING ='Cẩn thận:\n' +
    'Mảnh này chỉ có thế dùng\n' +
    'trong các vòng lặp.';

// Logic Blocks.
Blockly.LANG_LOGIC_COMPARE_HELPURL = 'http://en.wikipedia.org/wiki/Inequality_(mathematics)';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_EQ = 'Hoàn trả giá trị "đúng" (true) nếu giá trị hai đầu vào bằng nhau.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_NEQ = 'Hoàn trả giá trị "đúng" (true) nếu giá trị hai đầu vào không bằng nhau.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LT = 'Hoàn trả giá trị "đúng" (true)\n' +
    'nếu đầu vào thứ nhất nhỏ hơn đầu vào thứ hai.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LTE = 'Hoàn trả giá trị "đúng" (true)\n' +
    'nếu đầu vào thứ nhất nhỏ hơn hoặc bằng đầu vào thứ hai.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GT = 'Hoàn trả giá trị "đúng" (true)\n' +
    'nếu đầu vào thứ nhất lớn hơn đầu vào thứ hai.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GTE = 'Hoàn trả giá trị "đúng" (true)\n' +
    'nếu đầu vào thứ nhất lớn hơn hoặc bằng đầu vào thứ hai.';

Blockly.LANG_LOGIC_OPERATION_HELPURL = 'http://code.google.com/p/blockly/wiki/And_Or';
Blockly.LANG_LOGIC_OPERATION_AND = 'và';
Blockly.LANG_LOGIC_OPERATION_OR = 'hoặc';
Blockly.LANG_LOGIC_OPERATION_TOOLTIP_AND = 'Hoàn trả "đúng" (true) nếu cả hai đầu vào đều đúng.';
Blockly.LANG_LOGIC_OPERATION_TOOLTIP_OR = 'Hoàn trả "đúng" (true) nếu ít nhất một trong hai đầu vào đúng.';

Blockly.LANG_LOGIC_NEGATE_HELPURL = 'http://code.google.com/p/blockly/wiki/Not';
Blockly.LANG_LOGIC_NEGATE_INPUT_NOT = 'không';
Blockly.LANG_LOGIC_NEGATE_TOOLTIP = 'Hoàn trả "đúng" (true) nếu đầu vào sai.\n' +
    'Hoàn trả "sai" (false) nếu đầu vào đúng.';

Blockly.LANG_LOGIC_BOOLEAN_HELPURL = 'http://code.google.com/p/blockly/wiki/True_False';
Blockly.LANG_LOGIC_BOOLEAN_TRUE = 'đúng';
Blockly.LANG_LOGIC_BOOLEAN_FALSE = 'sai';
Blockly.LANG_LOGIC_BOOLEAN_TOOLTIP = 'Hoàn trả "đúng" hoặc "sai".';

Blockly.LANG_LOGIC_NULL_HELPURL = 'http://en.wikipedia.org/wiki/Nullable_type';
Blockly.LANG_LOGIC_NULL = 'null';
Blockly.LANG_LOGIC_NULL_TOOLTIP = 'Returns null.';

Blockly.LANG_LOGIC_TERNARY_HELPURL = 'http://en.wikipedia.org/wiki/%3F:';
Blockly.LANG_LOGIC_TERNARY_CONDITION = 'kiểm tra';
Blockly.LANG_LOGIC_TERNARY_IF_TRUE = 'nếu đúng';
Blockly.LANG_LOGIC_TERNARY_IF_FALSE = 'nếu sai';
Blockly.LANG_LOGIC_TERNARY_TOOLTIP = 'Kiểm tra điều kiện. Nếu điều kiện đúng, hoàn trả giá trị từ mệnh đề "nếu đúng"\n' +
    'nếu không đúng, hoàn trả giá trị từ mệnh đề "nếu sai".';

// Math Blocks.
Blockly.LANG_MATH_NUMBER_HELPURL = 'http://en.wikipedia.org/wiki/Number';
Blockly.LANG_MATH_NUMBER_TOOLTIP = 'Một con số.';

Blockly.LANG_MATH_ARITHMETIC_HELPURL = 'http://en.wikipedia.org/wiki/Arithmetic';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_ADD = 'Hoàn trả tổng của hai con số.';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_MINUS = 'Hoàn trả hiệu của hai con số.';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_MULTIPLY = 'Hoàn trả tích của hai con số.';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_DIVIDE = 'Hoàn trả thương của hai con số.';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_POWER = 'Hoàn trả số lũy thừa với số thứ nhất là cơ số\n' +
    'và số thứ hai là số mũ.';

Blockly.LANG_MATH_SINGLE_HELPURL = 'http://en.wikipedia.org/wiki/Square_root';
Blockly.LANG_MATH_SINGLE_OP_ROOT = 'căn bật hai';
Blockly.LANG_MATH_SINGLE_OP_ABSOLUTE = 'giá trị tuyệt đối';
Blockly.LANG_MATH_SINGLE_TOOLTIP_ROOT = 'Hoàn trả căn bật hai của số đầu vào.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_ABS = 'Hoàn trả giá trị tuyệt đối của số đầu vào.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_NEG = 'Đổi dấu của số đầu vào: âm thành dương và dương thành âm, và hoàn trả số mới.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_LN = 'Hoàn trả lôgarit tự nhiên của số đầu vào.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_LOG10 = 'Hoàn trả lôgarit cơ số 10 của số đầu vào.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_EXP = 'Hoàn trả lũy thừa của số e với số mũ đầu vào.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_POW10 = 'Hoàn trả lũy thừa của số 10 với số mũ đầu vào.';


Blockly.LANG_MATH_TRIG_HELPURL = 'http://en.wikipedia.org/wiki/Trigonometric_functions';
Blockly.LANG_MATH_TRIG_TOOLTIP_SIN = 'Hoàn trả Sin của một góc (theo độ).';
Blockly.LANG_MATH_TRIG_TOOLTIP_COS = 'Hoàn trả Cos của một góc (theo độ).';
Blockly.LANG_MATH_TRIG_TOOLTIP_TAN = 'Hoàn trả Tang của một góc (theo độ).';
Blockly.LANG_MATH_TRIG_TOOLTIP_ASIN = 'Hoàn trả Arcsin của một góc (theo độ).';
Blockly.LANG_MATH_TRIG_TOOLTIP_ACOS = 'Hoàn trả Arccos của một góc (theo độ).';
Blockly.LANG_MATH_TRIG_TOOLTIP_ATAN = 'Hoàn trả Arctang của một góc (theo độ).';

Blockly.LANG_MATH_CONSTANT_HELPURL = 'http://en.wikipedia.org/wiki/Mathematical_constant';
Blockly.LANG_MATH_CONSTANT_TOOLTIP = 'Hoàn trả các đẳng số thường gặp: \u03c0 (3.141\u2026), e (2.718\u2026), \u03c6 (1.618\u2026),\n' +
    'sqrt(2) (1.414\u2026), sqrt(\u00bd) (0.707\u2026), or \u221e (infinity).';

Blockly.LANG_MATH_IS_EVEN = 'chẵn';
Blockly.LANG_MATH_IS_ODD = 'lẻ';
Blockly.LANG_MATH_IS_PRIME = 'là số nguyên tố';
Blockly.LANG_MATH_IS_WHOLE = 'là số nguyên';
Blockly.LANG_MATH_IS_POSITIVE = 'là số dương';
Blockly.LANG_MATH_IS_NEGATIVE = 'là số âm';
Blockly.LANG_MATH_IS_DIVISIBLE_BY = 'chia hết cho';
Blockly.LANG_MATH_IS_TOOLTIP = 'Kiểm tra con số xem nó có phải là số chẵn, lẻ, nguyên tố, nguyên, dương, âm, \n' +
    'hay xem nó có chia hết cho số đầu vào hay không.  Hoàn trả đúng hay sai.';

Blockly.LANG_MATH_CHANGE_HELPURL = 'http://en.wikipedia.org/wiki/Programming_idiom#Incrementing_a_counter';
Blockly.LANG_MATH_CHANGE_TITLE_CHANGE = 'cộng vào';
Blockly.LANG_MATH_CHANGE_TITLE_ITEM = 'vật';
Blockly.LANG_MATH_CHANGE_INPUT_BY = 'giá trị';
Blockly.LANG_MATH_CHANGE_TOOLTIP = 'Cộng số đầu vào vào biến "%1".';

Blockly.LANG_MATH_ROUND_HELPURL = 'http://en.wikipedia.org/wiki/Rounding';
Blockly.LANG_MATH_ROUND_TOOLTIP = 'Làm tròn lên hoặc tròn xuống số đầu vào.';
Blockly.LANG_MATH_ROUND_OPERATOR_ROUND = 'làm tròn';
Blockly.LANG_MATH_ROUND_OPERATOR_ROUNDUP = 'làm tròn lên';
Blockly.LANG_MATH_ROUND_OPERATOR_ROUNDDOWN = 'làm tròn xuống';

Blockly.LANG_MATH_ONLIST_HELPURL = '';
Blockly.LANG_MATH_ONLIST_INPUT_OFLIST = 'của một danh sách';
Blockly.LANG_MATH_ONLIST_OPERATOR_SUM = 'tổng';
Blockly.LANG_MATH_ONLIST_OPERATOR_MIN = 'số nhỏ nhất';
Blockly.LANG_MATH_ONLIST_OPERATOR_MAX = 'số lớn nhât';
Blockly.LANG_MATH_ONLIST_OPERATOR_AVERAGE = 'giá trị trung bình';
Blockly.LANG_MATH_ONLIST_OPERATOR_MEDIAN = 'số trung vị';
Blockly.LANG_MATH_ONLIST_OPERATOR_MODE = 'các mode';
Blockly.LANG_MATH_ONLIST_OPERATOR_STD_DEV = 'độ lệch chuẩn';
Blockly.LANG_MATH_ONLIST_OPERATOR_RANDOM = 'một số bất kỳ';
Blockly.LANG_MATH_ONLIST_TOOLTIP_SUM = 'Hoàn trả tổng số của tất cả các số trong danh sách.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MIN = 'Hoàn trả số nhỏ nhất trong tất cả các số trong danh sách.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MAX = 'Hoàn trả số lớn nhất trong tất cả các số trong danh sách.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_AVERAGE = 'Hoàn trả giá trị trung bình từ của danh sách số.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MEDIAN = 'Hoàn trả số trung vị của danh sách số.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MODE = 'Hoàn trả các số có mặt nhiều nhất trong danh sách.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_STD_DEV = 'Hoàn trả độ lệch chuẩn của danh sách số.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_RANDOM = 'Hoàn trả một số bất kỳ từ các số trong danh sách.';

Blockly.LANG_MATH_MODULO_HELPURL = 'http://en.wikipedia.org/wiki/Modulo_operation';
Blockly.LANG_MATH_MODULO_INPUT_DIVIDEND = 'số dư của';
Blockly.LANG_MATH_MODULO_TOOLTIP = 'Chia số thứ nhất cho số thứ hai rồi hoàn trả số dư từ.';

Blockly.LANG_MATH_CONSTRAIN_HELPURL = 'http://en.wikipedia.org/wiki/Clamping_%28graphics%29';
Blockly.LANG_MATH_CONSTRAIN_INPUT_CONSTRAIN = 'giới hạn';
Blockly.LANG_MATH_CONSTRAIN_INPUT_LOW = 'không dưới';
Blockly.LANG_MATH_CONSTRAIN_INPUT_HIGH = 'không hơn';
Blockly.LANG_MATH_CONSTRAIN_TOOLTIP = 'Giới hạn số đầu vào để không dưới số thứ nhất và không hơn số thứ hai.';

Blockly.LANG_MATH_RANDOM_INT_HELPURL = 'http://en.wikipedia.org/wiki/Random_number_generation';
Blockly.LANG_MATH_RANDOM_INT_INPUT_FROM = 'Một số nguyên bất kỳ từ';
Blockly.LANG_MATH_RANDOM_INT_INPUT_TO = 'đến';
Blockly.LANG_MATH_RANDOM_INT_TOOLTIP = 'Hoàn trả một số nguyên bất kỳ\n' +
    'lớn hơn hoặc bằng số đầu và nhỏ hơn hoặc bằng số sau.';

Blockly.LANG_MATH_RANDOM_FLOAT_HELPURL = 'http://en.wikipedia.org/wiki/Random_number_generation';
Blockly.LANG_MATH_RANDOM_FLOAT_TITLE_RANDOM = 'phân số bất kỳ';
Blockly.LANG_MATH_RANDOM_FLOAT_TOOLTIP = 'Hoàn trả một phân số bất kỳ\n' +
    'không nhỏ hơn 0.0 và không lớn hơn 1.0.';

// Text Blocks.
Blockly.LANG_TEXT_TEXT_HELPURL = 'http://en.wikipedia.org/wiki/String_(computer_science)';
Blockly.LANG_TEXT_TEXT_TOOLTIP = 'Một ký tự, một từ, hay một dòng.';

Blockly.LANG_TEXT_JOIN_HELPURL = '';
Blockly.LANG_TEXT_JOIN_TITLE_CREATEWITH = 'tạo văn bản từ';
Blockly.LANG_TEXT_JOIN_TOOLTIP = 'Tạo một văn bản từ các thành phần.';

Blockly.LANG_TEXT_CREATE_JOIN_TITLE_JOIN = 'kết nối';
Blockly.LANG_TEXT_CREATE_JOIN_TOOLTIP = 'Thêm, bỏ, hoặc sắp xếp lại các thành phần để tạo dựng mảnh văn bản này.';

Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM = 'vật';
Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP = 'thêm vật mới vào văn bản.';

Blockly.LANG_TEXT_APPEND_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_APPEND_TO = 'ở ';
Blockly.LANG_TEXT_APPEND_APPENDTEXT = 'thêm văn bản';
Blockly.LANG_TEXT_APPEND_VARIABLE = 'vật';
Blockly.LANG_TEXT_APPEND_TOOLTIP = 'Thêm một mảng văn bản vào biến "%1".';

Blockly.LANG_TEXT_LENGTH_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_LENGTH_INPUT_LENGTH = 'độ dài của';
Blockly.LANG_TEXT_LENGTH_TOOLTIP = 'Hoàn trả số lượng ký tự (kể cả khoảng trắng)\n' +
    'trong văn bản đầu vào.';

Blockly.LANG_TEXT_ISEMPTY_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_ISEMPTY_INPUT_ISEMPTY = 'trống không';
Blockly.LANG_TEXT_ISEMPTY_TOOLTIP = 'Hoàn trả “đúng nếu văn bản không có ký tự nào.';

Blockly.LANG_TEXT_INDEXOF_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_TEXT_INDEXOF_TITLE_FIND = 'tìm sự có mặt';
Blockly.LANG_TEXT_INDEXOF_INPUT_OCCURRENCE = 'của';
Blockly.LANG_TEXT_INDEXOF_INPUT_INTEXT = 'trong văn bản';
Blockly.LANG_TEXT_INDEXOF_TOOLTIP = 'Hoàn trả vị trí xuất hiện đầu/cuối\n' +
    'của văn bản thứ nhất trong văn bản thứ hai.\n' +
    'Nếu không tìm thấy thì hoàn trả số 0.';
Blockly.LANG_TEXT_INDEXOF_OPERATOR_FIRST = 'đầu tiên';
Blockly.LANG_TEXT_INDEXOF_OPERATOR_LAST = 'cuối cùng';

Blockly.LANG_TEXT_CHARAT_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_TEXT_CHARAT_GET = 'lấy';
Blockly.LANG_TEXT_CHARAT_FROM_START = 'ký tự thứ';
Blockly.LANG_TEXT_CHARAT_FROM_END = 'từ phía cuối, ký tự thứ ';
Blockly.LANG_TEXT_CHARAT_FIRST = 'ký tự đầu tiên';
Blockly.LANG_TEXT_CHARAT_LAST = 'ký tự cuối cùng';
Blockly.LANG_TEXT_CHARAT_RANDOM = 'ký tự bất kỳ';
Blockly.LANG_TEXT_CHARAT_INPUT_INTEXT = 'trong văn bản';
Blockly.LANG_TEXT_CHARAT_TOOLTIP = 'Hoàn trả ký tự ở vị trí đặt ra.';

Blockly.LANG_TEXT_SUBSTRING_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_TEXT_SUBSTRING_INPUT_IN_TEXT = 'in text';
Blockly.LANG_TEXT_SUBSTRING_INPUT_AT1 = 'get substring from';
Blockly.LANG_TEXT_SUBSTRING_INPUT_AT2 = 'to';
Blockly.LANG_TEXT_SUBSTRING_TOOLTIP = 'Returns a specified portion of the text.';

Blockly.LANG_TEXT_CHANGECASE_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_CHANGECASE_TITLE_TO = 'thành';
Blockly.LANG_TEXT_CHANGECASE_TOOLTIP = 'Hoàn trả văn bản sau khi chuyển đổi chữ in hoa hay thường.';
Blockly.LANG_TEXT_CHANGECASE_OPERATOR_UPPERCASE = 'CHỮ IN HOA';
Blockly.LANG_TEXT_CHANGECASE_OPERATOR_LOWERCASE = 'chữ thường';
Blockly.LANG_TEXT_CHANGECASE_OPERATOR_TITLECASE = 'Chữ In Đầu Mỗi Từ';

Blockly.LANG_TEXT_TRIM_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_TRIM_TITLE_SPACE = 'xóa khoảng trắng từ bên';
Blockly.LANG_TEXT_TRIM_TITLE_SIDES = 'hai bên';
Blockly.LANG_TEXT_TRIM_TOOLTIP = 'Hoàn trả bản sao của văn bản sau khi\n' +
    'xóa khoảng trắng từ một hoặc hai bên.';
Blockly.LANG_TEXT_TRIM_TITLE_SIDES = '';
Blockly.LANG_TEXT_TRIM_TITLE_SIDE = '';
Blockly.LANG_TEXT_TRIM_OPERATOR_BOTH = 'trái và phải';
Blockly.LANG_TEXT_TRIM_OPERATOR_LEFT = 'trái';
Blockly.LANG_TEXT_TRIM_OPERATOR_RIGHT = 'phải';

Blockly.LANG_TEXT_PRINT_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_PRINT_TITLE_PRINT = 'in lên màng hình';
Blockly.LANG_TEXT_PRINT_TOOLTIP = 'In ra màng hình một văn bản, con số, hay một giá trị đầu vào khác.';

Blockly.LANG_TEXT_PROMPT_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode92.html';
Blockly.LANG_TEXT_PROMPT_TITLE_PROMPT_FOR = 'Xin người dùng nhập vào';
Blockly.LANG_TEXT_PROMPT_TITILE_WITH_MESSAGE = 'với dòng hướng dẫn';
Blockly.LANG_TEXT_PROMPT_TOOLTIP_NUMBER = 'Xin người dùng nhập vào một con số.\n';
Blockly.LANG_TEXT_PROMPT_TOOLTIP_TEXT = 'Xin người dùng nhập vào một văn bản.\n';
Blockly.LANG_TEXT_PROMPT_TYPE_TEXT = 'văn bản';
Blockly.LANG_TEXT_PROMPT_TYPE_NUMBER = 'con số';

// Lists Blocks.
Blockly.LANG_LISTS_CREATE_EMPTY_HELPURL = 'http://en.wikipedia.org/wiki/Linked_list#Empty_lists';
Blockly.LANG_LISTS_CREATE_EMPTY_TITLE = 'tạo danh sách trống';
Blockly.LANG_LISTS_CREATE_EMPTY_TOOLTIP = 'Hoàn trả một danh sách, với độ dài 0, không có thành tố nào cả';

Blockly.LANG_LISTS_CREATE_WITH_INPUT_WITH = 'tạo danh sách gồm';
Blockly.LANG_LISTS_CREATE_WITH_TOOLTIP = 'Tạo một danh sách bao gồm nhiều vậts, với một số lượng bất kỳ.';

Blockly.LANG_LISTS_CREATE_WITH_CONTAINER_TITLE_ADD = 'danh sách';
Blockly.LANG_LISTS_CREATE_WITH_CONTAINER_TOOLTIP = 'Thêm, bỏ, hoặc sắp xếp lại các thành phần để tạo dựng mảnh danh sách này.';

Blockly.LANG_LISTS_CREATE_WITH_ITEM_TITLE = 'vật';
Blockly.LANG_LISTS_CREATE_WITH_ITEM_TOOLTIP = 'Thêm vật vào danh sách.';

Blockly.LANG_LISTS_REPEAT_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_REPEAT_INPUT_WITH = 'tạo danh sách gồm một vật';
Blockly.LANG_LISTS_REPEAT_INPUT_REPEATED = 'lặp lại';
Blockly.LANG_LISTS_REPEAT_INPUT_TIMES = 'lần';
Blockly.LANG_LISTS_REPEAT_TOOLTIP = 'Tạo danh sách gồm một số lượng vật nhất định\n' +
    'với mỗi vật đều giống nhau.';

Blockly.LANG_LISTS_LENGTH_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_LISTS_LENGTH_INPUT_LENGTH = 'độ dài của';
Blockly.LANG_LISTS_LENGTH_TOOLTIP = 'Hoàn trả độ dài của một danh sách.';

Blockly.LANG_LISTS_IS_EMPTY_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_LISTS_INPUT_IS_EMPTY = 'trống rỗng';
Blockly.LANG_LISTS_TOOLTIP = 'Hoàn trả “đúng" nếu danh sách không có thành tử nào.';

Blockly.LANG_LISTS_INDEX_OF_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_INDEX_OF_TITLE_FIND = 'tìm sự có mặt';
Blockly.LANG_LISTS_INDEX_OF_INPUT_OCCURRENCE = 'của vật';
Blockly.LANG_LISTS_INDEX_OF_INPUT_IN_LIST = 'trong danh sách';
Blockly.LANG_LISTS_INDEX_OF_TOOLTIP = 'Hoàn trả vị trí xuất hiện đầu/cuối\n' +
    'của vật trong danh sách.\n' +
    'Nếu không tìm thấy thì hoàn trả số 0.';
Blockly.LANG_LISTS_INDEX_OF_FIRST = 'đầu tiên';
Blockly.LANG_LISTS_INDEX_OF_LAST = 'cuối cùng';

Blockly.LANG_LISTS_GET_INDEX_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_GET_INDEX_GET = 'lấy thành tố';
Blockly.LANG_LISTS_GET_INDEX_GET_REMOVE = 'lấy và xóa thành tố';
Blockly.LANG_LISTS_GET_INDEX_REMOVE = 'xóa thành tố';
Blockly.LANG_LISTS_GET_INDEX_FROM_START = 'thứ';
Blockly.LANG_LISTS_GET_INDEX_FROM_END = '(đếm từ cuối) thứ';
Blockly.LANG_LISTS_GET_INDEX_FIRST = 'đầu tiên';
Blockly.LANG_LISTS_GET_INDEX_LAST = 'cuối cùng';
Blockly.LANG_LISTS_GET_INDEX_RANDOM = 'bất kỳ';
Blockly.LANG_LISTS_GET_INDEX_INPUT_IN_LIST = 'trong danh sách';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_FROM_START = 'Hoàn trả thành tố trong danh sách ở vị trí ấn định.\n' +
    'Số 1 là thành tố đầu tiên.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_FROM_END = 'Hoàn trả thành tố trong danh sách ở vị trí ấn định.\n' +
    'Số 1 là thành tố cuối cùng.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_FIRST = 'Hoàn trả thành tố đầu tiên trong danh sách.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_LAST = 'Hoàn trả thành tố cuối cùng trong danh sách.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_RANDOM = 'Hoàn trả một thành tố bất kỳ trong danh sách.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM_START = 'Hoàn trả và xóa thành tố trong danh sách ở vị trí ấn định.\n' +
    'Số 1 là thành tố đầu tiên.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM_END = 'Hoàn trả và xóa thành tố trong danh sách ở vị trí ấn định.\n' +
    'Số 1 là thành tố cuối cùng.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FIRST = 'Hoàn trả và xóa thành tố đầu tiên trong danh sách.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_LAST = 'Hoàn trả và xóa thành tố cuối cùng trong danh sách.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM = 'Hoàn trả và xóa mộtthành tố bất kỳ trong danh sách.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM_START = 'Xóa thành tố trong danh sách ở vị trí ấn định.\n' +
    'Số 1 là thành tố đầu tiên.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM_END = 'Xóa thành tố trong danh sách ở vị trí ấn định.\n' +
    'Số 1 là thành tố cuối cùng.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_REMOVE_FIRST = 'Xóa thành tố đầu tiên trong danh sách.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_REMOVE_LAST = 'Xóa thành tố cuối cùng trong danh sách.';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_REMOVE_RANDOM = 'Xóa thành tố bất kỳ trong danh sách..';

Blockly.LANG_LISTS_SET_INDEX_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_SET_INDEX_INPUT_IN_LIST = 'in list';
Blockly.LANG_LISTS_SET_INDEX_SET = 'set';
Blockly.LANG_LISTS_SET_INDEX_INSERT = 'insert';
Blockly.LANG_LISTS_SET_INDEX_INPUT_TO = 'thành';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_SET_FROM_START = 'Sets the item at the specified position in a list.\n' +
    '#1 is the first item.';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_SET_FROM_END = 'Sets the item at the specified position in a list.\n' +
    '#1 is the last item.';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_SET_FIRST = 'Sets the first item in a list.';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_SET_LAST = 'Sets the last item in a list.';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_SET_RANDOM = 'Sets a random item in a list.';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_INSERT_FROM_START = 'Inserts the item at the specified position in a list.\n' +
    '#1 is the first item.';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_INSERT_FROM_END = 'Inserts the item at the specified position in a list.\n' +
    '#1 is the last item.';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_INSERT_FIRST = 'Inserts the item at the start of a list.';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_INSERT_LAST = 'Append the item to theend of a list.';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_INSERT_RANDOM = 'Inserts the item randomly in a list.';

Blockly.LANG_LISTS_GET_SUBLIST_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_GET_SUBLIST_INPUT_IN_LIST = 'in list';
Blockly.LANG_LISTS_GET_SUBLIST_INPUT_AT1 = 'get sub-list from';
Blockly.LANG_LISTS_GET_SUBLIST_INPUT_AT2 = 'to';
Blockly.LANG_LISTS_GET_SUBLIST_TOOLTIP = 'Creates a copy of the specified portion of a list.';

// Variables Blocks.
Blockly.LANG_VARIABLES_GET_HELPURL = 'http://en.wikipedia.org/wiki/Variable_(computer_science)';
Blockly.LANG_VARIABLES_GET_TITLE = 'lấy';
Blockly.LANG_VARIABLES_GET_ITEM = 'vật';
Blockly.LANG_VARIABLES_GET_TOOLTIP = 'Hoàn trả giá trị của.';
Blockly.LANG_VARIABLES_GET_CREATE_SET = 'Tạo mảnh "gán vào %1"';

Blockly.LANG_VARIABLES_SET_HELPURL = 'http://en.wikipedia.org/wiki/Variable_(computer_science)';
Blockly.LANG_VARIABLES_SET_TITLE = 'gán vào';
Blockly.LANG_VARIABLES_SET_ITEM = 'vật';
Blockly.LANG_VARIABLES_SET_TOOLTIP = 'Gán vào biến này giá trị của đầu vào.';
Blockly.LANG_VARIABLES_SET_CREATE_GET = 'Tạo mảnh "lấy %1"';

// Procedures Blocks.
Blockly.LANG_PROCEDURES_DEFNORETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE = 'thủ tục';
Blockly.LANG_PROCEDURES_DEFNORETURN_DO = 'thực hiện';
Blockly.LANG_PROCEDURES_DEFNORETURN_TOOLTIP = 'Một thủ tục không có giá trị hoàn trả.';

Blockly.LANG_PROCEDURES_DEFRETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_DEFRETURN_PROCEDURE = Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE;
Blockly.LANG_PROCEDURES_DEFRETURN_DO = Blockly.LANG_PROCEDURES_DEFNORETURN_DO;
Blockly.LANG_PROCEDURES_DEFRETURN_RETURN = 'hoàn trả';
Blockly.LANG_PROCEDURES_DEFRETURN_TOOLTIP = 'Một thủ tục có giá trị hoàn trả.';

Blockly.LANG_PROCEDURES_DEF_DUPLICATE_WARNING = 'Cẩn thận:\n' +
    'Thủ tục này có lặp lại\n' +
    'tên các tham số.';

Blockly.LANG_PROCEDURES_CALLNORETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_CALLNORETURN_CALL = 'thực hiện';
Blockly.LANG_PROCEDURES_CALLNORETURN_PROCEDURE = 'thủ tục';
Blockly.LANG_PROCEDURES_CALLNORETURN_TOOLTIP = 'Chạy một thủ tục không có giá trị hoàn trả.';

Blockly.LANG_PROCEDURES_CALLRETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_CALLRETURN_CALL = Blockly.LANG_PROCEDURES_CALLNORETURN_CALL;
Blockly.LANG_PROCEDURES_CALLRETURN_PROCEDURE = Blockly.LANG_PROCEDURES_CALLNORETURN_PROCEDURE;
Blockly.LANG_PROCEDURES_CALLRETURN_TOOLTIP = 'Chạy một thủ tục có giá trị hoàn trả.';

Blockly.LANG_PROCEDURES_MUTATORCONTAINER_TITLE = 'các tham số';
Blockly.LANG_PROCEDURES_MUTATORARG_TITLE = 'biến:';

Blockly.LANG_PROCEDURES_HIGHLIGHT_DEF = 'Làm nổi bật thủ tục';
Blockly.LANG_PROCEDURES_CREATE_DO = 'Tạo mảnh "thực hiện %1"';

Blockly.LANG_PROCEDURES_IFRETURN_TOOLTIP = 'Khi điều kiện đúng thì hoàn trả một giá trị.';
Blockly.LANG_PROCEDURES_IFRETURN_WARNING = 'Warning:\n' +
    'Mảnh này chỉ có thể dùng\n' +
    'trong một thủ tục.';

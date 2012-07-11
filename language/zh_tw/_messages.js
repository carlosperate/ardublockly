// Text strings (factored out to make multi-language easier).

// Context menus.
Blockly.MSG_DUPLICATE_BLOCK = 'Duplicate';
Blockly.MSG_REMOVE_COMMENT = 'Remove Comment';
Blockly.MSG_ADD_COMMENT = 'Add Comment';
Blockly.MSG_EXTERNAL_INPUTS = 'External Inputs';
Blockly.MSG_INLINE_INPUTS = 'Inline Inputs';
Blockly.MSG_DELETE_BLOCK = 'Delete Block';
Blockly.MSG_DELETE_X_BLOCKS = 'Delete %1 Blocks';
Blockly.MSG_COLLAPSE_BLOCK = 'Collapse Block';
Blockly.MSG_EXPAND_BLOCK = 'Expand Block';
Blockly.MSG_HELP = '說明';

// Variable renaming.
Blockly.MSG_CHANGE_VALUE_TITLE = '修改值:';
Blockly.MSG_NEW_VARIABLE = '新變量...';
Blockly.MSG_NEW_VARIABLE_TITLE = '新變量名稱:';
Blockly.MSG_RENAME_VARIABLE = '重新命名變量...';
Blockly.MSG_RENAME_VARIABLE_TITLE = 'Rename all "%1" variables to:';

// Toolbox.
Blockly.MSG_VARIABLE_CATEGORY = '變量';
Blockly.MSG_PROCEDURE_CATEGORY = '流程';

// Mutator dialog.
Blockly.MSG_MUTATOR_TOOLTIP = '編輯這個積木';
Blockly.MSG_MUTATOR_HEADER = '積木編輯器';
Blockly.MSG_MUTATOR_CHANGE = '修改';
Blockly.MSG_MUTATOR_CANCEL = '取消';

// Logic Blocks.
Blockly.LANG_CATEGORY_LOGIC = '邏輯';
Blockly.LANG_LOGIC_COMPARE_HELPURL = 'http://en.wikipedia.org/wiki/Inequality_(mathematics)';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_EQ = 'Return true if both inputs equal each other.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_NEQ = 'Return true if both inputs are not equal to each other.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LT = 'Return true if the first input is smaller\n' +
      'than the second input.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LTE = 'Return true if the first input is smaller\n' +
       'than or equal to the second input.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GT = 'Return true if the first input is greater\n' +
      'than the second input.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GTE = 'Return true if the first input is greater\n' +
       'than or equal to the second input.';

Blockly.LANG_LOGIC_OPERATION_HELPURL = 'http://code.google.com/p/blockly/wiki/And_Or';
Blockly.LANG_LOGIC_OPERATION_AND = '且';
Blockly.LANG_LOGIC_OPERATION_OR = '或';
Blockly.LANG_LOGIC_OPERATION_TOOLTIP_AND = 'Return true if both inputs are true.';
Blockly.LANG_LOGIC_OPERATION_TOOLTIP_OR = 'Return true if either inputs are true.';

Blockly.LANG_LOGIC_NEGATE_HELPURL = 'http://code.google.com/p/blockly/wiki/Not';
Blockly.LANG_LOGIC_NEGATE_INPUT_NOT = '非';
Blockly.LANG_LOGIC_NEGATE_TOOLTIP_1 = 'Returns true if the input is false.\n' +
                    'Returns false if the input is true.';

Blockly.LANG_LOGIC_BOOLEAN_HELPURL = 'http://code.google.com/p/blockly/wiki/True_False';
Blockly.LANG_LOGIC_BOOLEAN_TRUE = '是';
Blockly.LANG_LOGIC_BOOLEAN_FALSE = '否';
Blockly.LANG_LOGIC_BOOLEAN_TOOLTIP_1 = 'Returns either true or false.';

// Lists Blocks.
Blockly.LANG_CATEGORY_LISTS = '列表';
Blockly.LANG_LISTS_CREATE_EMPTY_HELPURL = 'http://en.wikipedia.org/wiki/Linked_list#Empty_lists';
Blockly.LANG_LISTS_CREATE_EMPTY_TITLE_1 = '建立空列表';
Blockly.LANG_LISTS_CREATE_EMPTY_TOOLTIP_1 = 'Returns a list, of length 0, containing no data records';

Blockly.LANG_LISTS_CREATE_WITH_INPUT_WITH = '使用這些值建立列表';
Blockly.LANG_LISTS_CREATE_WITH_TOOLTIP_1 = 'Create a list with any number of items.';

Blockly.LANG_LISTS_CREATE_WITH_CONTAINER_TITLE_ADD = '加入';
Blockly.LANG_LISTS_CREATE_WITH_CONTAINER_TOOLTIP_1 = 'Add, remove, or reorder sections to reconfigure this list block.';

Blockly.LANG_LISTS_CREATE_WITH_ITEM_TITLE = '項目';
Blockly.LANG_LISTS_CREATE_WITH_ITEM_TOOLTIP_1 = 'Add an item to the list.';

Blockly.LANG_LISTS_REPEAT_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_REPEAT_TITLE_CREATELIST = '建立列表';
Blockly.LANG_LISTS_REPEAT_INPUT_WITH = '使用項目';
Blockly.LANG_LISTS_REPEAT_INPIT_REPEATED = '重複';
Blockly.LANG_LISTS_REPEAT_INPIT_TIMES = '次數';
Blockly.LANG_LISTS_REPEAT_TOOLTIP_1 = 'Creates a list consisting of the given value\n' +
                    'repeated the specified number of times.';

Blockly.LANG_LISTS_LENGTH_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_LISTS_LENGTH_INPUT_LENGTH = '長度';
Blockly.LANG_LISTS_LENGTH_TOOLTIP_1 = 'Returns the length of a list.';

Blockly.LANG_LISTS_IS_EMPTY_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_LISTS_INPUT_IS_EMPTY = '值為空';
Blockly.LANG_LISTS_TOOLTIP_1 = 'Returns true if the list is empty.';

Blockly.LANG_LISTS_INDEX_OF_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_INDEX_OF_TITLE_FIND = '找出';
Blockly.LANG_LISTS_INDEX_OF_INPUT_OCCURRENCE = '項目出現';
Blockly.LANG_LISTS_INDEX_OF_INPUT_IN_LIST = '在列表';
Blockly.LANG_LISTS_INDEX_OF_TOOLTIP_1 = 'Returns the index of the first/last occurrence\n' +
                    'of the item in the list.\n' +
                    'Returns 0 if text is not found.';
Blockly.LANG_LISTS_INDEX_OF_FIRST = '第一個';
Blockly.LANG_LISTS_INDEX_OF_LAST = '最後一個';

Blockly.LANG_LISTS_GET_INDEX_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_GET_INDEX_TITLE = '取得項目';
Blockly.LANG_LISTS_GET_INDEX_INPUT_AT = '取得項目自';
Blockly.LANG_LISTS_GET_INDEX_INPUT_IN_LIST = '從列表';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_1 = 'Returns the value at the specified position in a list.';

Blockly.LANG_LISTS_SET_INDEX_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_SET_INDEX_TITLE = '設定項目';
Blockly.LANG_LISTS_SET_INDEX_INPUT_AT = '設定項目';
Blockly.LANG_LISTS_SET_INDEX_INPUT_IN_LIST = '從列表';
Blockly.LANG_LISTS_SET_INDEX_INPUT_TO = '為';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_1 = 'Sets the value at the specified position in a list.';

// Variables Blocks.
Blockly.LANG_VARIABLES_GET_HELPURL = 'http://en.wikipedia.org/wiki/Variable_(computer_science)';
Blockly.LANG_VARIABLES_GET_TITLE_1 = '取值';
Blockly.LANG_VARIABLES_GET_ITEM = '變量';
Blockly.LANG_VARIABLES_GET_TOOLTIP_1 = 'Returns the value of this variable.';

Blockly.LANG_VARIABLES_SET_HELPURL = 'http://en.wikipedia.org/wiki/Variable_(computer_science)';
Blockly.LANG_VARIABLES_SET_TITLE_1 = '賦值';
Blockly.LANG_VARIABLES_SET_ITEM = '變量';
Blockly.LANG_VARIABLES_SET_TOOLTIP_1 = 'Sets this variable to be equal to the input.';

// Procedures Blocks.
Blockly.LANG_PROCEDURES_DEFNORETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE = '流程';
Blockly.LANG_PROCEDURES_DEFNORETURN_DO = '執行';
Blockly.LANG_PROCEDURES_DEFNORETURN_TOOLTIP_1 = 'A procedure with no return value.';

Blockly.LANG_PROCEDURES_DEFRETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_DEFRETURN_PROCEDURE = '流程';
Blockly.LANG_PROCEDURES_DEFRETURN_DO = '執行';
Blockly.LANG_PROCEDURES_DEFRETURN_RETURN = '回傳';
Blockly.LANG_PROCEDURES_DEFRETURN_TOOLTIP_1 = 'A procedure with a return value.';

Blockly.LANG_PROCEDURES_CALLNORETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_CALLNORETURN_CALL = '呼叫';
Blockly.LANG_PROCEDURES_CALLNORETURN_PROCEDURE = '流程';
Blockly.LANG_PROCEDURES_CALLNORETURN_TOOLTIP_1 = 'Call a procedure with no return value.';

Blockly.LANG_PROCEDURES_CALLRETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_CALLRETURN_CALL = '呼叫';
Blockly.LANG_PROCEDURES_CALLRETURN_PROCEDURE = '流程';
Blockly.LANG_PROCEDURES_CALLRETURN_TOOLTIP_1 = 'Call a procedure with a return value.';

/**
 * 
 */


if (!Blockly.Language) {
  Blockly.Language = {};
}


Blockly.Language.compare = {
  // Comparison operator.
  category: 'Logic',
  helpUrl: function() {
    var map = {
      '=': 'http://en.wikipedia.org/wiki/Equality_(mathematics)',
      '\u2260': 'http://en.wikipedia.org/wiki/Inequality_(mathematics)',
      '<': 'http://en.wikipedia.org/wiki/Inequality_(mathematics)',
      '\u2264': 'http://en.wikipedia.org/wiki/Inequality_(mathematics)',
      '>': 'http://en.wikipedia.org/wiki/Inequality_(mathematics)',
      '\u2265': 'http://en.wikipedia.org/wiki/Inequality_(mathematics)'
    };
    return map[this.getValueLabel(1)];
  },
  init: function() {
    this.setColour('green');
    this.setOutput(true);
    this.addInput('', '', Blockly.INPUT_VALUE);
    var dropdown = new Blockly.FieldDropdown('=', function() {
      return ['=', '\u2260', '<', '\u2264', '>', '\u2265'];
    });
    this.addInput(dropdown, '', Blockly.INPUT_VALUE);
    this.setInputsInline(true);
  }
};


Blockly.Language.Boolean = {
  // Boolean data type: true and false.
  category: 'Logic',
  helpUrl: 'http://en.wikipedia.org/wiki/Boolean_data_type',
  init: function() {
    this.setColour('green');
    this.setOutput(true);
    var dropdown = new Blockly.FieldDropdown('true', function() {
      return ['true', 'false'];
    });
    this.addTitle(dropdown);
  }
};

Blockly.Language.disjunction = {
  // logical disjuntive: 'and', 'or'.
  category: 'Logic',
  helpUrl: 'http://en.wikipedia.org/wiki/Logical_disjunction',
  init: function() {
    this.setColour('green');
    this.setOutput(true);
    this.addInput('', '', Blockly.INPUT_VALUE);
    var dropdown = new Blockly.FieldDropdown('and', function() {
      return ['and', 'or'];
    });
    this.addInput(dropdown, '', Blockly.INPUT_VALUE);
    this.setInputsInline(true);
  }
};


Blockly.Language.not = {
		  //negation.
		  category: 'Logic',
		  helpUrl: 'http://en.wikipedia.org/wiki/Logical_disjunction',
		  init: function() {
		    this.setColour('green');
		    this.setOutput(true);
		    this.addInput('not', '', Blockly.INPUT_VALUE);
		    this.setInputsInline(true);
		  }
		};
/**
 * 
 */


if (!Blockly.Language) {
  Blockly.Language = {};
}


Blockly.Language.compare = {
  // Comparison operator.
  category: 'Math',
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
/**
 * Tests that if the compressed parameter is passed that the correct
 * version of blockly is used.
 */
function testBlocklyChosenCorrectly() {
  var uri = new goog.Uri(window.location);
  var qd = uri.getQueryData();
  var compressed = !!qd.get('compressed');
  var scripts = document.getElementsByTagName('script');
  var re = new RegExp('/blockly_((un)?compressed)\.js$');
  var scriptIsCompressed = Array.prototype.reduce.call(
      scripts,
      function(prev,current) {
        var match = re.exec(current.src);
        return match ? !match[2] : prev;
      },
      null);
  assertNotNull(scriptIsCompressed);
  assertEquals(compressed, scriptIsCompressed);
}

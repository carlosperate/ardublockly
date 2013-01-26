(function() {
   var uri = new goog.Uri(window.location);
   var qd = uri.getQueryData();
   if (qd.get('compressed'))
     document.write(
         '<' + 'script type="text/javascript" src="../blockly_compressed.js"><' +
         '/script>');
   else
     document.write(
         '<' + 'script type="text/javascript" src="../blockly_uncompressed.js"><' +
         '/script>');
 })(this);

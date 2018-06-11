'use strict';

/** Create a namespace for the application. */
var SenseboxExtension = SenseboxExtension || {};

/** Initialize function for senseBox extensions, to be called on page load. */
SenseboxExtension.init = function() {
  var location = window.location;
  var urlParams = new URLSearchParams(location.search);

  if (location.hostname !== 'localhost') {
    //TODO hide all features of running ardublockly locally
  }

  if (urlParams.has('board')) {
    window.BOARD = urlParams.get('board');
  } else {
    window.BOARD = 'sensebox';
  }

  //TODO hide old and new blocks depending on selected senseBox version
  switch (window.BOARD) {
    case 'sensebox':
      // ArdublocklyServer.setArduinoBoard('Uno', function(jsonObj) {
      //   var newEl = ArdublocklyServer.jsonToHtmlDropdown(jsonObj);
      //   Ardublockly.setArduinoBoardsHtml(newEl);
      // });
      window.EXTENSION = 'hex';
      break;
    case 'sensebox-mcu':
      window.EXTENSION = 'bin';
      break;
  }
  var clipboard = new ClipboardJS('.copy-btn');
  clipboard.on('success', function(e) {
    console.log(e);
    Ardublockly.MaterialToast(Ardublockly.getLocalStr('code_copied'));
  });
  clipboard.on('error', function(e) {
    console.log(e);
  });

  document.getElementById("button_copy_clipboard").setAttribute("data-tooltip", Ardublockly.getLocalStr('save_to_clipboard'));
  document.getElementById("button_compile_sketch").setAttribute("data-tooltip", Ardublockly.getLocalStr('compile_sketch'));

  var compile = document.getElementById('button_compile_sketch');
  compile.addEventListener('click', function () {
    var sketch = Ardublockly.generateArduino();
    var data = {
      "board": window.BOARD,
      "sketch": sketch
    };
    var request = ArdublocklyServer.createRequest();
    // The data received is JSON, so it needs to be converted into the right
    // format to be displayed in the page.
    var onReady = function() {
      if (request.readyState == 4) {
        if (request.status == 200) {
          var response = null;
          try {
            response = JSON.parse(request.response);
            window.open('https://compiler.sensebox.de/download?id='+response.data.id+'&board='+window.BOARD);
            Ardublockly.MaterialToast(Ardublockly.getLocalStr('sketch_compiled'));
          } catch(e) {
            throw e;
          }
        } else {
          return null;
        }
      }
    };
    try {
      request.open('POST', 'https://compiler.sensebox.de/compile', true);
      request.setRequestHeader('Content-Type', 'application/json');
      request.onreadystatechange = onReady;
      request.send(JSON.stringify(data));
    } catch (e) {
      console.log('Error: ', e);
      throw e;
    }
  });
};
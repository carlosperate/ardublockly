# Ardublockly
"Ardublockly" is a fork of [Blockly](https://developers.google.com/blockly/), a web-based graphical programming editor, that has been updated to generate [Arduino](http://www.arduino.cc/) code.

The "ArduBlocklyServerCompiler" component initialises a local server with Python to be able to compile and load the Arduino code using the [Arduino IDE](http://arduino.cc/en/main/software).

This project has been influenced by BlocklyDuino (based on an outdated version of Blockly).

## Features

Ardublockly is still under development and a few of the main features are not yet implemented.

![WebApp screenshot with material design](http://carlosperate.github.io/ardublockly/images/screenshot_material_all_small.jpg "Ardublockly with material design")

![WebApp screenshot](http://carlosperate.github.io/ardublockly/images/screenshot_1.png "Ardublockly")


## Demo

A demo of the current state of Ardublockly can be found in the following two links:
* [Ardublockly](http://carlosperate.github.io/ardublockly/ardublockly/apps/arduino/index.html)
* [Ardublockly with material design](http://carlosperate.github.io/ardublockly/ardublockly/apps/arduino_material/index.html)

To load the code into an Arduino requires Ardublockly to be executed locally.

### Documentation
The documentation, including installation instructions, can be found in [this Github repository Wiki](https://github.com/carlosperate/ardublockly/wiki).

To download the documentation you can git clone the wiki data:
```
git clone https://github.com/carlosperate/ardublockly.wiki.git
```

## Original Authors

Blockly original source is Copyright of Google Inc. [https://developers.google.com/blockly/](https://developers.google.com/blockly/)

#### Significant changes
Added Arduino code generator, Arduino app, and Python server to utilise the Arduino IDE.

All changes to the original source code can be reviewed [here](https://github.com/carlosperate/ardublockly/compare/blockly-original...master).

## License

Licensed under the Apache License, Version 2.0 (the "License"). The full document can be found in the [COPYING](https://github.com/carlosperate/ardublockly/blob/master/COPYING) file.


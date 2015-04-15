# Ardublockly
Ardublockly is a visual programming editor for Arduino. It is based on Google's [Blockly][1], which has been forked to generate [Arduino](http://www.arduino.cc/) code.

The "ArdublocklyServer" Python package initialises a local server to be able to compile and load the Arduino code using the [Arduino IDE][2].

This is all packaged in a self contained executable:

![Ardublockly desktop program screenshot][desktop_screeshot]

## Features
* Generate Arduino code with visual drag-and-drop blocks
* Load the code to an Arduino Board
* Useful "code block warnings"
* Compatible with a wide range of official Arduino Boards
* Runs on Windows / Linux / Mac OS X

Ardublockly is still under development and a few features are not yet implemented. A to-do list can be found in the [TODO.md][3] file.

Currently tested under Windows with Python 2.7 and 3.4 and in Linux and MacOS X with Python 2.7.


## Online Demos
A demo of the current state of Ardublockly can be found in the following two links (to load the code into an Arduino requires Ardublockly to be executed locally):

#### [Ardublockly][10] (with responsive design)
![WebApp screenshot responsive design][web_screenshot_responsive]

#### [Ardublockly classic][11]
![WebApp screenshot][web_screenshot_classic]



## Installing
There is a packaged version for Windows that runs as a stand-alone executable and can be downloaded from the [Ardublockly repository releases page][4].

Installation instructions for developers can be found in [this Github repository Wiki][5]. This will work on Windows, Linux and MacOS X.

It also needs the [Arduino IDE version 1.6 or higher](http://arduino.cc/en/main/software).


## Running
1. [Install Ardublockly][5].
2. Install the [Arduino IDE][2] version 1.6 or higher.
3. Run Ardublockly as defined in your installation method.
3. Configure Ardublockly to locate the Arduino IDE [following these instructions][6].


## Documentation
The documentation, including installation instructions, configuration instructions, and developer information can be found in the [Ardublockly GitHub repository Wiki][7].

To download the documentation you can git clone the wiki data:
```
git clone https://github.com/carlosperate/ardublockly.wiki.git
```


## Credit
This project has been influenced by BlocklyDuino.

Blockly original source is Copyright of Google Inc. [https://developers.google.com/blockly/][1]

##### Significant changes to Blockly
Added Arduino code generator, static typing and additional code warnings.

All changes to the original source code can be reviewed [here][8].


## License
Licensed under the Apache License, Version 2.0 (the "License").

The full document can be found in the [LICENSE][9] file.


[1]: https://developers.google.com/blockly/
[2]: http://arduino.cc/en/main/software/
[3]: TODO.md
[4]: https://github.com/carlosperate/ardublockly/releases/
[5]: https://github.com/carlosperate/ardublockly/wiki/Installing-Ardublockly
[6]: https://github.com/carlosperate/ardublockly/wiki/Configure-Ardublockly
[7]: https://github.com/carlosperate/ardublockly/wiki
[8]: https://github.com/carlosperate/ardublockly/compare/blockly-original...master
[9]: https://github.com/carlosperate/ardublockly/blob/master/LICENSE
[10]: http://carlosperate.github.io/ardublockly/ardublockly/index.html
[11]: http://carlosperate.github.io/ardublockly/ardublockly/classic/index.html


[desktop_screeshot]: http://carlosperate.github.io/ardublockly/images/screenshot_desktop_1.png
[web_screenshot_responsive]: http://carlosperate.github.io/ardublockly/images/screenshot_material_all_small.jpg
[web_screenshot_classic]: http://carlosperate.github.io/ardublockly/images/screenshot_1.png

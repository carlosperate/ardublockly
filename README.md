<<<<<<< HEAD
# Ardublockly Github Page

This is the GitHub project page for the Ardublockly project.

The contents of the branch are hosted on the http://carlosperate.github.io/ardublockly address, and allow to demostrante an online partial demo of Ardublockly.
=======
# Ardublockly
Ardublockly is a visual programming editor for Arduino. It is based on Google's [Blockly][1], which has been forked to generate [Arduino][15] code.

The `ArdublocklyServer` Python package initialises a local server to be able to compile and load the Arduino code using the [Arduino IDE][2].

This is all packaged in a self contained executable desktop application for Windows, Mac OS X, and Linux:
>>>>>>> origin

The index page is created from pelican project (a static site generator), designed to be hosted in http://www.embeddedlog.com, so it pulls all of its resources from that domain and only the `index.html` page is required here.

<<<<<<< HEAD
This demos is not capable to load software into an Arduino even if the ArdublocklyServer is running locally, it merely allows you to try the visual programming language. The two versions of the demo can be found in the following links:
=======
## Features
* Generates Arduino code with visual drag-and-drop blocks
* Uploads the code to an Arduino Board
* Useful "code block warnings"
* Compatible with a wide range of official Arduino Boards
* Works on Windows / Linux / Mac OS X
>>>>>>> origin

* http://carlosperate.github.io/ardublockly/ardublockly/index.html
* http://carlosperate.github.io/ardublockly/ardublockly/classic/index.html


## To update Ardublockly

<<<<<<< HEAD
For the project maintainers, the way to synchronise this branch is to simply merge the latest `master` into gh-pages, preferably squashing all the commits.

So from master:

=======
## Installing
The desktop application is available for Windows/Mac/Linux and runs as a stand-alone executable that can be downloaded from the [Ardublockly repository releases page][4] (once it is stable enough for a first alpha release).

You will also need the [Arduino IDE version 1.6 or higher][2].

In the meantime, you can test __UNSTABLE__ development builds automatically generated on these build servers:

| Linux build         | Windows build       | Mac OS X build       |
|:-------------------:|:-------------------:|:--------------------:|
| [![Linux Build Status](https://circleci.com/gh/carlosperate/ardublockly/tree/master.svg?style=svg)](https://circleci.com/gh/carlosperate/ardublockly/tree/master) | [![Windows Build status](https://ci.appveyor.com/api/projects/status/t877g920hdiifc2i?svg=true)](https://ci.appveyor.com/project/carlosperate/ardublockly) | [![Mac Build Status](https://travis-ci.org/carlosperate/ardublockly.svg?branch=master)](https://travis-ci.org/carlosperate/ardublockly) |
| [Download Link][12] | [Download Link][13] | [Download Link][14]  |

If you prefer, the main software can be run with Python and a web browser only. Installation instructions for this "developer version" can be found in [this Github repository Wiki][5]. This will work on Windows, Linux and MacOS X, with Python >2.6 and >3.2.


## Running
1. [Install Ardublockly][5].
2. Install the [Arduino IDE][2] version 1.6 or higher.
3. Run Ardublockly as defined in your installation method.
3. Configure Ardublockly to locate the Arduino IDE [following these instructions][6].


## Online Demos
A demo of the current state of Ardublockly main interface can be found in the following two links (to load the code into an Arduino it requires the full Ardublockly application to be downloaded and run on your computer):

#### [Ardublockly][10]
![WebApp screenshot responsive design][web_screenshot_responsive]

#### [Ardublockly classic][11]
![WebApp screenshot][web_screenshot_classic]


## Documentation
The documentation, including installation instructions, configuration instructions, and developer information can be found in the [Ardublockly GitHub repository Wiki][7].

To download the documentation you can git clone the wiki data:
>>>>>>> origin
```
git checkout gh-pages
git merge --squash master
git commit
```
<<<<<<< HEAD
=======


## Credit
This project has been inspired by BlocklyDuino.

Blockly original source is Copyright of Google Inc. [https://developers.google.com/blockly/][1]


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
[12]: http://ardublockly-builds.s3-website-us-west-2.amazonaws.com/index.html?prefix=linux/
[13]: http://ardublockly-builds.s3-website-us-west-2.amazonaws.com/index.html?prefix=windows/
[14]: http://ardublockly-builds.s3-website-us-west-2.amazonaws.com/index.html?prefix=mac/
[15]: http://arduino.cc


[desktop_screeshot]: http://carlosperate.github.io/ardublockly/images/screenshot_desktop_1.png
[web_screenshot_responsive]: http://carlosperate.github.io/ardublockly/images/screenshot_material_all_small.jpg
[web_screenshot_classic]: http://carlosperate.github.io/ardublockly/images/screenshot_1.png
>>>>>>> origin

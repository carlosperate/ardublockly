# Ardublockly package
This package folder contains three components required to build and package the Ardublockly desktop application:

* The [Electron][1] project to use Ardublockly as a desktop application
* Python scripts required to build and package Ardublockly into a standalone executable.
* Git submodule that contains the documentation (stored in the Ardublockly GitHub Wiki)
 
The full build instruction can be found in the Ardublockly GitHub Wiki article [Building-Ardublockly][2].

The build output can be distributed without any dependencies other than having the Arduino IDE.

## Download the packaged Ardublockly
The stable binaries for Windows, Linux, and Mac OS X are hosted in GitHub as part of the [repository releases][1].

Development builds are triggered in the CI build servers on each git commit and are hosted in the following links:

| Linux build         | Windows build       | Mac OS X build       |
|:-------------------:|:-------------------:|:--------------------:|
| [![Linux Build Status](https://circleci.com/gh/carlosperate/ardublockly/tree/master.svg?style=svg)](https://circleci.com/gh/carlosperate/ardublockly/tree/master) | [![Windows Build status](https://ci.appveyor.com/api/projects/status/t877g920hdiifc2i?svg=true)](https://ci.appveyor.com/project/carlosperate/ardublockly) | [![Mac Build Status](https://travis-ci.org/carlosperate/ardublockly.svg?branch=master)](https://travis-ci.org/carlosperate/ardublockly) |
| [Download Link][11] | [Download Link][12] | [Download Link][13]  |


[1]: https://electron.atom.io
[2]: https://github.com/carlosperate/ardublockly/wiki/Building-Ardublockly
[11]: http://ardublockly-builds.s3-website-us-west-2.amazonaws.com/index.html?prefix=linux/
[12]: http://ardublockly-builds.s3-website-us-west-2.amazonaws.com/index.html?prefix=windows/
[13]: http://ardublockly-builds.s3-website-us-west-2.amazonaws.com/index.html?prefix=mac/

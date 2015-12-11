# Ardublockly package
The package folder contains the Python scripts required to package Ardublockly into a standalone executable. This way it can be distributed without any dependencies other than having the Arduino IDE.

The application can be categorised in three main components: Python server, HTML/Javascript front end, and desktop wrapper.

Currently the Python server is packaged using py2exe for Windows, and PyInstaller for Linux and Mac OS X. In the future PyInstaller might be updated to also create the Windows builds, for now the original py2exe script is pretty stable.

The desktop wrapper is based on Electron, which uses node.js. The node.js component is only used where required for the application to integrate well with the individual desktop platforms. Originally the Chromium Embedded Framework Python bindings were used, but cross-platform maintenance proved to be problematic and Electron has provided a much smother alternative.


## Download the packaged Ardublockly
The stable binaries for Windows, Linux, and Mac OS X are hosted in GitHub as part of the [repository releases][1].

Development builds are triggered in the CI build servers on each repository commit and are hosted in the following links:

| Linux build         | Windows build       | Mac OS X build       |
|:-------------------:|:-------------------:|:--------------------:|
| [![Linux Build Status](https://circleci.com/gh/carlosperate/ardublockly/tree/master.svg?style=svg)](https://circleci.com/gh/carlosperate/ardublockly/tree/master) | [![Windows Build status](https://ci.appveyor.com/api/projects/status/t877g920hdiifc2i?svg=true)](https://ci.appveyor.com/project/carlosperate/ardublockly) | [![Mac Build Status](https://travis-ci.org/carlosperate/ardublockly.svg?branch=master)](https://travis-ci.org/carlosperate/ardublockly) |
| [Download Link][11] | [Download Link][12] | [Download Link][13]  |


## Ardublockly executable build dependencies

### Git
Git needs to be installed on the system and accessible through the command line interface.


### Python
These build scripts only work on Python 2.7.

While the non-GUI version of Ardublockly (command line server + pre-installed browser) is compatible with other Python versions (tested on Python 2.7 and 3.4), due to the individual perks of the python libraries used here and unavailability of some Python 3 bindings, a single build environment based on Python 2.7 has been be targeted.

If you are using Python virtual environments on Windows this [collection of Python extensions binaries][2] is highly recommended.

The specific versions of the Python dependencies can be found in the [requirements.txt][3] file.

##### py2exe
py2exe is a Distutils extension to build Python scripts into Windows executable programs.

This package is only required for the Windows build. The Linux and Mac OS X builds use the PyInstaller scripts included in this folder.

You can download py2exe from their [official website][6].

##### PyInstaller
Converts (packages) Python programs into stand-alone executables, used for the Linux and Mac OS X builds.

This package does not need to be installed, as it is already included in this folder.

This version of PyInstaller is from the official [repository wiki][9]. As the version stored in Pypi, at the time of writting, is quite old, pip would install an outdated version that won't work with the current specs file.

##### MkDocs
MkDocs is a static page generator specifically designed for documentation using Markdown.

The project documentation is written and hosted in the [Ardublockly repository GitHub Wiki][7]. The build script for the documentation pulls its markdown files and converts them into an HTML static site for offline access.

More information about this procedure can be found in [this article][8].

MkDocs can be easily installed using pip:

```
pip install MkDocs
```

### Node.js
Node.js is required to run Electron. It can be downloaded from the [offical website][14].

The `npm` package manager should be included with node, which is used to deal with all the desktop wrapper dependencies.


## Build Instructions
Download and initialise this project repository:

```
git clone https://github.com/carlosperate/ardublockly.git
cd ardublockly
git submodule update --init --recursive
```

If you have already downloaded the Ardublockly source code, make sure the submodules are initialised, in this case the 'closure-library' in the project root directory,  'pyinstaller' in the package folder, and 'ardublockly.wiki' in the 'package/ardublocklydocs/' folder. You can run the git command above in the project root directory to ensure this is the case, otherwise the submodule directories will be empty.

### First step: Python server (platform dependent)

The build steps for the Ardublockly Server are slightly different depending on the platform.

### Windows Build
To build Ardublockly under Windows all you have to do is execute the `build_windows.py` file from the project root directory:

```
python package\build_windows.py
```

This will remove any previous build directory, rebuild, and create the `ardublockly_run.bat` file into the project root.

### Linux Build
To build Ardublockly under Linux all you have to do is execute the `build_pyinstaller.py` file from the project root directory:

```
python package/build_pyinstaller.py
```

The optional flag `linux` can be provided, but the operating systems should be automatically detected.

This will remove any previous build directory, rebuild, and create the `ardublockly_run.sh` file into the project root.

### Mac OS X Build
To build Ardublockly under Mac OS X all you have to do is execute the `build_pyinstaller.py` file from the project root directory:

```
python package/build_pyinstaller.py
```

The optional flag `mac` can be provided, but the operating systems should be automatically detected.

This will remove any previous build directory, and rebuild it.


## Second step: Electron (platform independent)
Execute the following commands from the project root directory:

```
cd package\electron
npm install
npm run release
```

The npm scripts will automatically detect and deal with the operating system different build requirements.

At this point, if continuing with the next steps, is recommended to go back to the project root directory:

```
cd ../../
```

## Third step: Documentation (platform independent)

Build the offline documentation by running the `build_docs.py` script from within the package folder. This will add a folder named `documentation` into the project root directory:

```
cd package
python build_docs.py
```

At this point, if continuing with the next steps, is recommended to go back to the project root directory:

```
cd ../
```

## Final Step: Packing all Ardublockly (platform independent)
Once the project is build there are a few unnecessary files that can be removed to save space.

You can pack ardublockly running the following command from the project root directory:

```
python package/pack_ardublockly.py
```

The pack script was designed for the build servers to zip the required contents into a single file to be uploaded to cloud storage, so it still leaves quite a few things behind. This script creates a new folder on the same level a the project root, and then zips it and saves it into the folder 'upload' within the project root.


## Individual script files descriptions
This part of the documentation is still under work.

[1]: https://github.com/carlosperate/ardublockly/releases/
[2]: http://www.lfd.uci.edu/~gohlke/pythonlibs/
[3]: requirements.txt
[4]: http://www.wxpython.org/download.php
[5]: https://code.google.com/p/cefpython/
[6]: http://www.py2exe.org/
[7]: https://github.com/carlosperate/ardublockly/wiki
[8]: http://www.embeddedlog.com/static-docs-from-github-wiki.html
[9]: https://github.com/pyinstaller/pyinstaller/wiki
[10]: http://ardublockly-builds.s3-website-us-west-2.amazonaws.com/index.html
[11]: http://ardublockly-builds.s3-website-us-west-2.amazonaws.com/index.html?prefix=linux/
[12]: http://ardublockly-builds.s3-website-us-west-2.amazonaws.com/index.html?prefix=windows/
[13]: http://ardublockly-builds.s3-website-us-west-2.amazonaws.com/index.html?prefix=mac/
[14]: https://nodejs.org

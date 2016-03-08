# Ardublockly package
The package folder contains the Python scripts required to package Ardublockly into a standalone executable. This way it can be distributed without any dependencies other than having the Arduino IDE.

The application can be categorised in three main components: Python server, HTML/Javascript front end, and a desktop application wrapper.

Currently the Python server is packaged using py2exe for Windows, and PyInstaller for Linux and Mac OS X. In the future PyInstaller might be updated to also create the Windows builds, for now the original py2exe script is pretty stable.

The desktop wrapper is based on Electron, which uses node.js. The node.js component is only used where required for the application to integrate well with the individual desktop platforms. Originally the Chromium Embedded Framework Python bindings were used, but cross-platform maintenance proved to be problematic and Electron has provided a much smother alternative.


## Download the packaged Ardublockly
The stable binaries for Windows, Linux, and Mac OS X are hosted in GitHub as part of the [repository releases][1].

Development builds are triggered in the CI build servers on each git commit and are hosted in the following links:

| Linux build         | Windows build       | Mac OS X build       |
|:-------------------:|:-------------------:|:--------------------:|
| [![Linux Build Status](https://circleci.com/gh/carlosperate/ardublockly/tree/master.svg?style=svg)](https://circleci.com/gh/carlosperate/ardublockly/tree/master) | [![Windows Build status](https://ci.appveyor.com/api/projects/status/t877g920hdiifc2i?svg=true)](https://ci.appveyor.com/project/carlosperate/ardublockly) | [![Mac Build Status](https://travis-ci.org/carlosperate/ardublockly.svg?branch=master)](https://travis-ci.org/carlosperate/ardublockly) |
| [Download Link][11] | [Download Link][12] | [Download Link][13]  |


## Ardublockly executable build dependencies

### Git
Git needs to be installed on the system and accessible through the command line interface.


### Python
These build scripts have been developed and tested only on Python 2.7.

While the non-GUI version of Ardublockly (command line server + browser-based GUI) is compatible with other Python versions (tested on Python 2.7 and 3.4), due to the individual perks of the python libraries used here and initial unavailability of some Python 3 bindings, a single build environment based on Python 2.7 has been be targeted.

If you are using Python virtual environments on Windows this [collection of Python extensions binaries][2] is highly recommended.

The specific versions of the Python dependencies can be found in the [requirements.txt][3] file.

##### py2exe
py2exe is a Distutils extension to build Python scripts into Windows executable programs.

This package is only required for the Windows build. The Linux and Mac OS X builds use the PyInstaller scripts included in this folder.

You can download py2exe from their [official website][4].

##### PyInstaller
Converts (packages) Python programs into stand-alone executables, used for the Linux and Mac OS X builds.

[PyInstaller][5] can be easily installed using pip:

```
 pip install pyinstaller
```

##### MkDocs
[MkDocs][6] is a static page generator specifically designed for documentation using Markdown.

The project documentation is written and hosted in the [Ardublockly GitHub Wiki][7]. The build script for the documentation pulls its markdown files and converts them into an HTML static site for offline access.

More information about this procedure can be found on [this article][8].

MkDocs can be easily installed using pip:

```
pip install MkDocs
```

### Node.js
Node.js is required to run [Electron][9]. It can be downloaded from the [official website][10].

The `npm` package manager should be included with node, which is used to deal with all the Electron application dependencies.


## Build Instructions
Download and initialise this project repository:

```
git clone https://github.com/carlosperate/ardublockly.git
cd ardublockly
git submodule update --init --recursive
```

If you have already downloaded the Ardublockly source code, make sure the submodules are initialised, in this case the 'closure-library' in the project root directory, and 'ardublockly.wiki' in the 'package/ardublocklydocs/' folder. You can run the last git command above in the project root directory to ensure this is the case, otherwise the submodules directories will be empty.

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

Build the offline documentation by running the `build_docs.py` script from the project root directory:

```
python package\build_docs.py
```

This will remove any previous build directory, rebuild it, and remove any temporary files.

## Final Step: Packing all Ardublockly (platform independent)
This step is only meant if you wish to pack the Ardublockly application into a distributable form. You can pack ardublockly running the following command from the project root directory:

```
python package/pack_ardublockly.py
```

The pack script is designed for the build servers to zip the required contents into a single file to be uploaded to cloud storage, so it still leaves quite a few things behind. This script creates a new folder on the same level a the project root, and then zips it and saves it into the folder 'upload' within the project root.


[1]: https://github.com/carlosperate/ardublockly/releases/
[2]: http://www.lfd.uci.edu/~gohlke/pythonlibs/
[3]: requirements.txt
[4]: http://www.py2exe.org/
[5]: http://www.pyinstaller.org/
[6]: http://www.mkdocs.org/
[7]: https://github.com/carlosperate/ardublockly/wiki
[8]: http://www.embeddedlog.com/static-docs-from-github-wiki.html
[9]: http://electron.atom.io/
[10]: https://nodejs.org
[11]: http://ardublockly-builds.s3-website-us-west-2.amazonaws.com/index.html?prefix=linux/
[12]: http://ardublockly-builds.s3-website-us-west-2.amazonaws.com/index.html?prefix=windows/
[13]: http://ardublockly-builds.s3-website-us-west-2.amazonaws.com/index.html?prefix=mac/

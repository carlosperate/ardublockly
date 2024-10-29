# Ardublockly Python GUI
The source files contained in this folder form part of a deprecated GUI version of Ardublockly. These files are moved from their original location and will not work if executed from within this folder. These were the original locations:

```
/package/wxcef_build/start_cef.py               -> /start_cef.py
/package/wxcef_build/build_windows_wxcef.py     -> /package/build_windows_wxcef.py
/package/wxcef_build/build_pyinstaller_wxcef.py -> /package/build_pyinstaller_wxcef.py
/package/wxcef_build/pack_ardublockly_wxcef.py  -> /package/pack_ardublockly_wxcef.py
```

The Python build and pack scripts contained here were used to package Ardublockly into a standalone executable. The Windows build was created using py2exe and the Linux and Mac OS X builds using PyInstaller. It was meant to be distributed without any dependencies other than having the Arduino IDE, however there was multiple issues trying to get it to work in all platforms.

The CI build scripts (`.appveyor_wxcef.yml`, `.travis_wxcef.yml`, and `circle_wxcef.yml`) show the build steps for the different platforms.

## Ardublockly Python GUI dependencies
These build scripts only work on Python 2.7.

While the non-GUI version of Ardublockly (command line server + pre-installed browser) is compatible with other Python versions (tested on Python 2.7 and 3.4), due to the individual perks of the python libraries used here and unavailability of CEF Python 3 bindings, a single build environment based on Python 2.7 will be targeted.

If you are using Python virtual environments on Windows this [collection of Python extensions binaries][2] is highly recommended.

The specific versions of the Python dependencies can be found in the [requirements.txt][3] file.

#### cefpython3
CEF Python provides Python bindings for the Chromium Embedded Framework. This is used in Ardublockly to create a webview of the Ardublockly web app without requiring any specific browser installation. This is specially useful for the project because the frameworks used work best on the Chrome engine.

[Install cefpython following their project installation instructions][5]. On Windows and Mac OS X cefpython can be easily installed using pip:

```
pip install cefpython3
```

#### wxPython
wxPython provides python bindings for the wxWidgets, the cross-platform GUI toolkit.

You can download wxPython from their [official website][4].

(I have recently found some odd issues in Ubuntu 15.04 when cefpython is running with wxPython version 3.0.2.0, reverting back to the 2.8.12.1 version seemed to fix them.)

#### py2exe
py2exe is a Distutils extension to build Python scripts into Windows executable programs. 

This package is only required for the Windows build. The Linux and Mac OS X builds use the PyInstaller scripts included in this folder.

You can download py2exe from their [official website][6].

#### PyInstaller
Converts (packages) Python programs into stand-alone executables, used for the Linux and Mac OS X builds.

This package does not need to be installed, as it is already included in this folder.

This version of PyInstaller is from the official [repository wiki][9]. As the version stored in Pypi is quite old, pip would install an outdated version that won't work with the current specs file.

#### MkDocs 
MkDocs is a static page generator specifically designed for documentation using Markdown.

The project documentation is written and hosted in the [Ardublockly repository GitHub Wiki][7]. The build script for the documentation pulls its markdown files and converts them into an HTML static site for offline access.

The MkDocs build procedure is the same as the new build environment. The script and steps are contained in the `package` folder.

## Build steps
These build steps assumes the script files are located in their original locations as indicated at the top of this document.

Download and initialise this project repository:

```
git clone https://github.com/carlosperate/ardublockly.git
cd ardublockly
git submodule update --init --recursive
```

If you have already downloaded the Ardublockly source code, make sure the submodules are initialise, in this case the 'closure-library' in the project root directory and 'pyinstaller' in the package folder. You can run `git submodule update --init --recursive` in the project root to ensure this is the case, otherwise the submodule directories will be empty.

First build the offline documentation by running the `build_docs.py` script from within the package folder. This will add a folder named `documentation` into the project root directory:

```
cd package
python build_docs.py
```

The build steps for Ardublockly are slightly different depending on the platform.


### Windows Build
To build Ardublockly for Windows all you have to do is execute the `build_windows.py` file from the project root directory in a Windows OS:

```
python package\build_windows.py
```

This will remove any previous build directory, rebuild, and create the `ardublockly_run.bat` file into the project root.

To run Ardublockly on Windows execute the `ardublockly_run.bat` file.


### Linux Build
To build Ardublockly for Linux all you have to do is execute the `build_pyinstaller.py` file from the project root directory using a Linux distribution:

```
python package/build_pyinstaller.py
```

This will remove any previous build directory, rebuild, and create the `ardublockly_run.sh` file into the project root.

To run Ardublockly on Linux execute the `ardublockly_run.sh` bash file. Don't forget to set the file as executable to be able to run it from your desktop environment.


### Mac OS X Build
To build Ardublockly for Mac OS X all you have to do is execute the `build_pyinstaller.py` file on Mac OS X from the project root directory:

```
python package/build_pyinstaller.py
```

This will remove any previous build directory, rebuild, and create the `ardublockly_run.sh` file into the project root.

To run Ardublockly on Mac OS execute the `ardublockly_run.sh` bash file. Don't forget to set the file as executable to be able to run it from your desktop environment.


## Packing Ardublockly
Once the project is build there are a few unnecessary files that can be removed to save space.

You can pack ardublockly running the following command from the project root directory:

```
python package/pack_ardublockly.py
```

The pack script was designed for the build servers to zip the required contents into a single file to be uploaded to cloud storage, so it still leaves quite a few things behind. This script creates a new folder on the same level a the project root, and then zips it and saves it into the folder 'upload' within the project root.


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

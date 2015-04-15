# Ardublockly package
This folder contains the Python scripts required to package Ardublockly into a standalone executable. This way it can be distributed without any dependencies other than having the Arduino IDE.

Currently it is only built for Windows, but it could be updated to be built for Linux and Mac OS X (a move from py2exe to Pyinstaller is planned).

__Downloading the packaged Ardublockly__: The binaries will be hosted in GitHub as part of the [repository releases][1].


## Building Ardublockly from source
These scripts are currently built and tested using Python 2.7.

While it is possible to maintain compatibility with other Python versions (the ArdublocklyServer Python package used in the developer installation has been tested on Python 2.7 and 3.4), due to the multiple individual perks of the python libraries used here, it has been decided to target a single build environment.

If you are using Python virtual environments on Windows this [collection of Python extensions binaries][2] is highly recommended.

### Python dependencies
The specific version of the Python dependencies can be found in the [requirements.txt][3] file.

#### wxPython
wxPython provides python bindings for the wxWidgets, the cross-platform GUI toolkit.

You can download wxPython from their [official website][4].

#### cefpython3
CEF Python provides python bindings for the Chromium Embedded Framework. This is used in Ardublockly to create a webview of the Ardublockly web app without requiring any specific browser installation. This is specially useful for the project because the frameworks used work best on the Chrome engine.

[Install cefpython following their project installation instructions][5]

#### py2exe
py2exe is a Distutils extension to build Python scripts into Windows executable programs.
There is a plan to migrate from py2exe to Pyinstaller, but for now this is the main library used to create the Windows build.

You can download py2exe from their [official website][6].

## Build steps
Download and initialise this project repository:
```
git clone https://github.com/carlosperate/ardublockly.git
git submodule init
git submodule update
cd closure-library
git pull origin master
```

Now navigate to the `package` folder in the project directory:
```
cd ../package
```

To build Ardublockly all you have to do is execute the `build_windows.py` file:
```
python build_windows.py
```

This will remove any previous build directory (`/win` directory in project root), rebuild, and create the `ardublockly_run.bat` file into the project root.

To run Ardublockly then just execute the `ardublockly_run.bat` file.


[1]: https://github.com/carlosperate/ardublockly/releases/
[2]: http://www.lfd.uci.edu/~gohlke/pythonlibs/
[3]: requirements.txt
[4]: http://www.wxpython.org/download.php
[5]: https://code.google.com/p/cefpython/
[6]: http://www.py2exe.org/

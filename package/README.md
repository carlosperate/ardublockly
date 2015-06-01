# Ardublockly package
This folder contains the Python scripts required to package Ardublockly into a standalone executable. This way it can be distributed without any dependencies other than having the Arduino IDE.

Currently the Windows build is created using py2exe and the Linux and Mac OS X builds are created using PyInstaller (in the future PyInstaller might be updated to also create the Windows builds, for now the original py2exe script is pretty stable). 

__Downloading the packaged Ardublockly__: The binaries will be hosted in GitHub as part of the [repository releases][1].


## Building Ardublockly from source
These build scripts only work on Python 2.7.

Git also needs to be installed on the system.

While the non-GUI version of Ardublockly (command line server + system browser) is compatible with other Python versions (tested on Python 2.7 and 3.4), due to the individual perks of the python libraries used here and unavailability of CEF Python 3 bindings, a single build environment based on Python 2.7 will be targeted.

If you are using Python virtual environments on Windows this [collection of Python extensions binaries][2] is highly recommended.


### Python dependencies
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

This package is only required for the Windows build. The Linux and Mac OS X builds use PyInstaller.

You can download py2exe from their [official website][6].

#### PyInstaller
Converts (packages) Python programs into stand-alone executables, used for the Linux and Mac OS X builds.

You can download PyInstaller from the official [repository wiki][9]. As the version stored in Pypi is quite old, pip would install an outdated version that won't work with  the current specs file. 

#### MkDocs 
MkDocs is a static page generator specifically designed for documentation using Markdown.

The project documentation is written and hosted in the [Ardublockly repository GitHub Wiki][7]. The build script for the documentation pulls its markdown files and converts them into an HTML static site for offline access.

More information about this procedure can be found in [this article][8].

MkDocs can be easily installed using pip:

```
pip install MkDocs
```


## Build steps
Download and initialise this project repository:

```
git clone https://github.com/carlosperate/ardublockly.git
cd ardublockly
git submodule init
git submodule update
```

Now navigate to the `package` folder in the project directory:

```
cd package
```

To first build the offline documentation execute the `build_docs.py` file. This will add a folder named `documentation` into the project root directory:

```
python build_docs.py
```

The build steps for Ardublockly are slightly different depending on the platform.


### Windows Build
To build Ardublockly under windows all you have to do is execute the `build_windows.py` file from the `package` directory :

```
python build_windows.py
```

This will remove any previous build directory (`/win` directory in project root), rebuild, and create the `ardublockly_run.bat` file into the project root.

To run Ardublockly on Windows execute the `ardublockly_run.bat` file.


### Linux Build
This part of the documentation is still under work.


### Mac OS X Build
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

# Ardublockly to-do list

## Ardublockly build system
- [ ] Update the documentation build script to work on the project root directory like the other build scripts.
- [ ] Update the py2exe Windows Build to place the executable on the projetct root directory.
- [ ] Should the Windows build be moved to PyInstaller and keep a single build script for all platforms??
- [ ] Add documentation build steps to the CI build servers


## Ardublockly desktop wrapper
- [ ] Wait for resolution and implement appData directory move fixes https://github.com/atom/electron/issues/2721
- [ ] Move Electron front end changes script from ardublockly html injection into preload script executed from Electron
- [ ] Add menu to directly select a between the different Arduino boards supported
- [ ] Executable app signing
- [ ] Check for "built python server executable", if not found check if python is installed, if it is then run the server in a python subprocess.


## Python server
- [ ] Complete `compilerserttings` module unit test
- [ ] Complete `actions` module unit test module
- [ ] Check for more possible issues with unicode in Python 2
- [ ] Experiment with the `--preserve-temp-files` flag to maintain temporary files and speed up CLI compilation
- [ ] Remove tkinker file selection and implement an html version
- [ ] The server should provide fully "headless" execution

#### Linux specific
- [ ] Test load to board in Linux with Arduino 1.6 (current test in raspberry pi and ubuntu to load sketches in the IDE) with python 2
- [ ] Comprehensive test of server with python 3
- [ ] Current port list shows all dev/tty, as all Arduinos should be connected by USB this list can be filtered to only show ttyUSBx ports

#### Mac OS X specific
- [ ] Comprehensive test of server with python 2
- [ ] Comprehensive test of server with python 3

#### Windows specific
- [ ] Comprehensive test of server with python 3

#### Python 3 specific


## Ardublockly front end
- [x] ~~Remove old IDE output text while waiting for a new verify/open/upload~~
- [ ] Change delete all icon with "new"
- [ ] Similar to Arduino IDE, select area to display button action text, and change the text with button mouse over
- [ ] Ensure that basic empty sketch code shows on page load
- [ ] On low resolutions ensure the blockly vertical height is lower than the viewport
- [ ] Add tooltips to the action buttons and floating round buttons
- [ ] Add internationalisation, initially only English and Spanish


## Blockly
- [ ] Merge changes from upstream to add zoom functionality
- [ ] Modify zoom icons to be smaller and placed in top right corner
- [ ] Modify zoom to be available without using the scroll
- [x] ~~Add setup and loop functions to the custom toolbox flyout and ensure only one instance can be included in workspace~~
- [ ] Arduino setup and loop block can be copy/pasted using keyboard shorcuts, stop this from happening

#### Blockly changes to feed upstream
- [ ] Any useful changes to the zoom functionality

#### Static typing
- [ ] logic_ternary block getType to defines type as that of its inputs
- [ ] logic_null block right now does not return a type, this might change
- [ ] math_number block 'errornumber' type used for debugging, remove
- [ ] math_arithmetic getType to check types of given inputs to decide between int or float . Right now first block within sets the type.
- [ ] math_constrain getType to check types of given inputs to decide between int or float . Right now first block within sets the type.
- [ ] math_number getType to use regular expressions more efficiently
- [ ] math_on_list to add static type if lists get implemented
- [ ] controls_for getVarType function
- [ ] controls_forEach block uses lists, these are not implemented in the Arduino generator (possible arrays), when implemented this block needs a getVarType, varType, and getType functions
- [ ] add getVarType to the procedures blocks
- [ ] the loops count type is set to int, user could input a decimal, so add input checking to determine type
- [ ] Number blocks automatically trim unnecessary decimal digits "x.0 => x", change this behavior so that "x.0" can be set as a decimal

#### Arduino generator
- [ ] Text trim does not currently generate Arduino valid code
- [ ] Second part of the generator refactory

#### Arduino blocks
- [ ] Code generator for lists into arrays
- [ ] A lot of blocks go through the entire block tree, which end ups being  inefficient. Maybe create a general pass through in the arduino.js file to check everything that needs to be checked in one pass.
- [ ] SPI pin reservation log needs to be refactored for the new board settings
- [ ] Create I2C communication blocks with hue 190
- [ ] Update the serial print block to specify explicit type (hex, str, int, etc)
- [ ] Look into all the serial functions and decide what else might fit in
- [ ] Allow to add return statement to the Arduino setup()/loop() functions


## Future features
- [ ] Block creator app that also used blockly to create the generator code
- [ ] Server component of the block creator to add files into project directory folder and have client side to read them and include them into the toolbox
- [ ] Serial console for comms with Arduino
- [ ] Serial data graphing
- [ ] SVG image creation to displayed used pins with given function
- [ ] Auto updating from server for the desktop app

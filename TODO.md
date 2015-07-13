# Ardublockly to-do list

## Linux specific
- [ ] Test load to board in Linux with Arduino 1.6 (current test in raspberry pi and ubuntu to load sketches in the IDE) with python 2
- [ ] Test server components in Linux with python 3
- [ ] Current port list shows all dev/tty, as all Arduinos should be connected by USB this list can be filtered to only show ttyUSBx ports


## Mac OS X specific
- [ ] Test server components in Mac OS X with python 2
- [ ] Test server components in Mac OS X with python 3

## Windows specific


## Python 3 specific
- [x] ~~When a sketch is send to the IDE using python 3 the following error is shown (tested on linux):~~
```
Can't convert 'bytes' object to str implicitly
There was an error manipulating the sketch data!!
```


## Server
- [ ] Complete `compilerserttings` module unite test
- [ ] Complete `actions` module unit test module
- [x] ~~Complete `SketchCreator` module unit test~~
- [x] ~~Combine Arduino boards from code generator with Arduino boards offered for compilation~~

## Blockly general
- [ ] Expand `setWarning` to be able to buffer and manage several warnings per block (add an ID to a block of text)
- [ ] Implement the zoom feature from @carloslfu once matured

## Static typing
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


## Arduino generator related code
- [x] ~~Add information for other Arduino boards~~


## Arduino blocks
- [x] ~~Add a way to select different Arduino boards (settings menu should trigger arduino generator board change)~~
- [ ] Code generator for lists into arrays
- [ ] A lot of blocks go through the entire block tree, which end ups being  inefficient. Maybe create a general pass through in the arduino.js file to check everything that needs to be checked in one pass.
- [ ] SPI pin reservation log needs to be refactored for the new board settings
- [ ] Create I2C communication blocks
- [ ] Update the serial print block to specify explicit type (hex, str, int, etc)
- [ ] 


## Arduino front end
- [ ] ~~Edit toolbox fade out + visibility button fade in with a CSS animated change in height with overflow hidden~~
- [ ] Remove old IDE output text while waiting for a new verify/open/upload 


# Future features
- [ ] Serial console for comms with Arduino
- [ ] Serial data graphing
- [ ] Auto updating for the desktop app

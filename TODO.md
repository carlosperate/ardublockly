# Ardublockly to-do list

## Linux specific
- [ ] Test load to board in Linux with Arduino 1.6 (current test in raspberry pi and ubuntu to load sketches in the IDE) with python 2
- [ ] Test server components in Linux with python 3
- [ ] Current port list shows all dev/tty, as all Arduinos should be connected by USB this list can be filtered to only show ttyUSBx ports

## Mac OS X specific
- [ ] Test server components in Mac OS X with python 2
- [ ] Test server components in Mac OS X with python 3

## Python 3 specific
- [ ] When a sketch is send to the IDE using python 3 the following error is shown (tested on linux):
```
Can't convert 'bytes' object to str implicitly
There was an error manipulating the sketch data!!
```


## Server
- [ ] Serial port test code
- [ ] ServerCompilerSettings test module
- [ ] BlocklyRequestHandler test module
- [ ] SketchCreator test module
- [ ] Combine Arduino boards from code generator with Arduino boards offered for compilation

## Static typing
- [x] Warnings for setting variables to a different type than first instance
- [x] Type finding for the get variable block
- [ ] math_number block 'errornumber' type
- [ ] remove getVarType types that are use for debugging 
- [ ] math_arithmetic getType to check types of given inputs to decide between int or float
- [ ] math_number getType to use regular expressions more efficiently
- [ ] logic_ternary block getType to defines type as that of its inputs
- [ ] controls_for getVarType function
- [ ] controls_forEach block uses lists, these are not implemented in the Arduino generator (possible arrays), when implemented this block needs a getVarType, varType, and getType functions.
- [ ] add getVarType to the procedures blocks

## Arduino related code
- [ ] Add information for other Arduino boards

## Arduino blocks
- [ ] Add a way to select different Arduino boards (settings menu should trigger arduino generator board change)
- [ ] Code generator for lists into arrays.
- [ ] A lot of blocks go through the entire block tree, which end ups being terribly inefficient. Maybe create a general pass through in the arduino.js file to check everything that needs to be checked in one pass.

## Arduino web-app
- [ ] Edit toolbox fade out + visibility button fade in with a CSS animated change in height with overflow hidden.
- [x] Add examples
- [ ] Change js variables naming convention from current 'snake_case' to 'lower camel case' to comply with Google's js coding style.

# Future features
- [ ] Serial console in web app for comms with Arduino

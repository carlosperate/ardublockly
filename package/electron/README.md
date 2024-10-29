# Ardublockly Electron project
This is the Ardublockly Electron project for generating a cross-platform executable chromium window.

Electron is a framework that allows cross-platform desktop applications
using JavaScript, HTML and CSS. It is based on [io.js](http://iojs.org) and
[Chromium](http://www.chromium.org) and is used in the [Atom
editor](https://github.com/atom/atom).

This project is based on the excellent [electron-boilerplate](https://github.com/szwacz/electron-boilerplate) by [Jakub Szwacz](https://github.com/szwacz).


## Quick start
The only software installation required for this project is [Node.js](https://nodejs.org).

To run, execute these commands from the Ardublockly project root directory:

```
cd package/electron
npm install
npm start
```

This will download the Electron runtime, and install all other dependencies from the two `package.json` files (one in the the `package/electron` folder and the other in the `package/electron/app` folder).


## Building
To build a ready for distribution application use the command from the Ardublockly project root directory:

```
cd package/electron
npm run release
```

It will start the packaging process for operating system you are running this command on. Ready for distribution file will be outputted to `releases` directory.

You can create Windows installer only when running on Windows, the same is true for Linux and OSX. So to generate all three installers you need all three operating systems.


## License

The original boilerplate by Jakub Szwacz is release under the following license. All modifications to the boilerplate code adhere to this license and are copyright of carlosperate.

The MIT License (MIT)

Copyright (c) 2015 Jakub Szwacz

Copyright (c) 2015 carlosperate https://github.com/carlosperate/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
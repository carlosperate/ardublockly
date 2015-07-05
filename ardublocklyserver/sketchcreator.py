# -*- coding: utf-8 -*-
#
# SketchCreator class creates an Arduino Sketch source code file.
#
# Copyright (c) 2015 carlosperate https://github.com/carlosperate/
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
#
from __future__ import unicode_literals, absolute_import
import os

from ardublocklyserver.py23 import py23
from ardublocklyserver.compilersettings import ServerCompilerSettings


class SketchCreator(object):
    """
    Creates an Arduino Sketch.
    """

    #
    # Metaclass methods
    #
    def __init__(self):
        # Default sketch, blink builtin LED
        self._sketch_default_code = \
            'int led = 13;\n' \
            'void setup() {\n' \
            '  pinMode(led, OUTPUT);\n' \
            '}\n' \
            'void loop() {\n' \
            '  digitalWrite(led, HIGH);\n' \
            '  delay(1000);\n' \
            '  digitalWrite(led, LOW);\n' \
            '  delay(1000);\n' \
            '}\n'

    #
    # Creating files
    #
    def create_sketch(self, sketch_code=None):
        """
        Creates the Arduino sketch with either the default blinky
        code or the code defined in the input parameter.

        :param sketch_code: Unicode string with the code for the sketch.
        :return: Unicode string with full path to the sketch file
                 Return None indicates an error has occurred.
        """
        sketch_path = self.build_sketch_path()
        if isinstance(sketch_code, py23.string_type_compare)\
                and sketch_code:
            code_to_write = sketch_code
        else:
            code_to_write = self._sketch_default_code

        try:
            arduino_sketch = open(sketch_path, 'w')
            arduino_sketch.write(code_to_write)
            arduino_sketch.close()
        except Exception as e:
            sketch_path = None
            print(e)
            print('Arduino sketch could not be created!!!')

        return sketch_path

    #
    # File and directories settings
    #
    def build_sketch_path(self):
        """
        If a valid directory is saved in the settings, it creates the Arduino
        folder (if it does not exists already) and returns a string pointing
        to the sketch path
        :return: unicode string with full path to the sketch file
                 Return None indicates an error has occurred
        """
        sketch_name = ServerCompilerSettings().sketch_name
        sketch_directory = ServerCompilerSettings().sketch_dir
        sketch_path = None
        
        if os.path.isdir(sketch_directory):
            sketch_path = os.path.join(sketch_directory, sketch_name)
            if not os.path.exists(sketch_path):
                os.makedirs(sketch_path)
            sketch_path = os.path.join(sketch_path, sketch_name + '.ino')
        else:
            print('The sketch directory in the settings does not exists!')

        return sketch_path 

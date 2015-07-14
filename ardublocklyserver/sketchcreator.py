# -*- coding: utf-8 -*-
#
# SketchCreator class creates an Arduino Sketch source code file.
#
# Copyright (c) 2015 carlosperate https://github.com/carlosperate/
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
#
from __future__ import unicode_literals, absolute_import
import codecs
import os

from ardublocklyserver.six import six


class SketchCreator(object):
    """
    Creates an Arduino Sketch.
    """

    #
    # Metaclass methods
    #
    def __init__(self, sketch_name=None):
        # Default sketch, blink builtin LED
        self._default_sketch_code = \
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
        # Default sketch name
        self._default_sketch_name = 'ArdublocklySketch'

    #
    # Creating files
    #
    def create_sketch(self, sketch_dir, sketch_name=None, sketch_code=None):
        """
        Creates the Arduino sketch with either the default blinky code or the
        code defined in the input parameter.
        :param sketch_dir: Location for the sketch.
        :param sketch_name: Optional name for the sketch.
        :param sketch_code: Optional unicode string with the code for the
                            sketch.
        :return: Unicode string with full path to the sketch file
                 Return None indicates an error has occurred.
        """
        # Check the code first, to not create sketch file if invalid
        if sketch_code is None:
            code_to_write = self._default_sketch_code
        else:
            if isinstance(sketch_code, six.string_types):
                code_to_write = sketch_code
            else:
                print('The sketch code given is not a valid string !!!')
                return None

        # Check validity and create the sketch path
        if sketch_name is None:
            sketch_name = self._default_sketch_name
        sketch_path = self.build_sketch_path(sketch_dir, sketch_name)
        if sketch_path is None:
            return None

        try:
            arduino_sketch = codecs.open(sketch_path, 'wb+', encoding='utf-8')
            try:
                arduino_sketch.write(code_to_write)
            finally:
                arduino_sketch.close()
        except Exception as e:
            print(e)
            print('Arduino sketch could not be created !!!')
            return None

        return sketch_path

    @staticmethod
    def build_sketch_path(sketch_dir, sketch_name):
        """
        If a valid directory is provided, it creates the Arduino sketch folder
        (if it does not exists already) and returns a string pointing to the
        sketch file path.
        :return: unicode string with full path to the sketch file.
                 Returns None indicates an error has occurred.
        """
        sketch_path = None
        if os.path.isdir(sketch_dir):
            sketch_path = os.path.join(sketch_dir, sketch_name)
            if not os.path.exists(sketch_path):
                os.makedirs(sketch_path)
            sketch_path = os.path.join(sketch_path, sketch_name + '.ino')
        else:
            print('The sketch directory "%s" does not exists !!!' % sketch_dir)
        return sketch_path 

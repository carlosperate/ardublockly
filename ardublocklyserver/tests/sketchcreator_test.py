# -*- coding: utf-8 -*-
#
# Unit test for the sketchcreator module.
#
# Copyright (c) 2015 carlosperate https://github.com/carlosperate/
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
#
from __future__ import unicode_literals, absolute_import
import os
import time
import unittest

from ardublocklyserver.sketchcreator import SketchCreator
from ardublocklyserver.compilersettings import ServerCompilerSettings


class SketchCreatorTestCase(unittest.TestCase):
    """
    Tests for SketchCreator class
    """
    
    #
    # File creation
    #
    def test_create_sketch(self):
        """ Tests to see if an Arduino Sketch is created in a new location """
        test_sketch_name = 'TestTemp_Sketch'
        ServerCompilerSettings().sketch_dir = os.getcwd()
        ServerCompilerSettings().sketch_name = test_sketch_name
        test_path = os.path.join(os.getcwd(), 
                                 test_sketch_name,
                                 test_sketch_name + '.ino')

        # It should be save to create and delete in test folder
        if os.path.exists(test_path):
            os.remove(test_path)
        self.assertFalse(os.path.isfile(test_path))

        sketch_creator = SketchCreator()

        # Checks the file is saved, and saved to the right location
        created_sketch_path = sketch_creator.create_sketch()
        self.assertEqual(test_path, created_sketch_path)
        self.assertTrue(os.path.isfile(test_path))

    #
    # File creation with code
    #
    def test_create_sketch_with_code(self):
        sketch_code_write = 'Test on: %s' % time.strftime("%Y-%m-%d %H:%M:%S")
        sketch_creator = SketchCreator()
        sketch_location = sketch_creator.create_sketch(sketch_code_write)

        arduino_sketch = open(sketch_location, 'r')
        sketch_code_read = arduino_sketch.read()
        arduino_sketch.close()
        self.assertEqual(sketch_code_write, sketch_code_read)


if __name__ == '__main__':
    unittest.main()

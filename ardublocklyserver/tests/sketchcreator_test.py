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
import codecs
import shutil
import unittest

try:
    from ardublocklyserver.sketchcreator import SketchCreator
    from ardublocklyserver.compilersettings import ServerCompilerSettings
except ImportError:
    import sys
    file_dir = os.path.dirname(os.path.realpath(__file__))
    package_dir = os.path.dirname(os.path.dirname(file_dir))
    sys.path.insert(0, package_dir)
    from ardublocklyserver.sketchcreator import SketchCreator
    from ardublocklyserver.compilersettings import ServerCompilerSettings


class SketchCreatorTestCase(unittest.TestCase):
    """
    Tests for SketchCreator class
    """

    #
    # File creation without input code
    #
    def test_create_sketch(self):
        """ Tests to see if an Arduino Sketch is created in a new location. """
        # First test with the default name
        sketch_creator = SketchCreator()
        sketch_dir = os.getcwd()
        final_ino_path = os.path.join(
            sketch_dir,
            sketch_creator._default_sketch_name,
            '%s.ino' % sketch_creator._default_sketch_name)
        # It should be save to create and delete the ino file in the test folder
        if os.path.exists(final_ino_path):
            os.remove(final_ino_path)
        self.assertFalse(os.path.isfile(final_ino_path))
        # Checks the file is saved, and saved to the right location
        created_sketch_path = sketch_creator.create_sketch(sketch_dir)
        self.assertEqual(final_ino_path, created_sketch_path)
        self.assertTrue(os.path.isfile(final_ino_path))

        # Now test with a given sketch name and a unicode path
        sketch_name = 'TestTemp_Sketch'
        sketch_dir_unicode = os.path.join(os.getcwd(), 'TestTemp_ろΓαζςÂé')
        final_ino_path = os.path.join(sketch_dir_unicode,
                                      sketch_name,
                                      sketch_name + '.ino')

        # Test directory should be a safe place to create this unicode folder
        if not os.path.exists(sketch_dir_unicode):
            os.mkdir(sketch_dir_unicode)
        else:
            # We count on this specific folder name to be too unlikely
            # created by a user and not this unit test, so remove contents
            shutil.rmtree(sketch_dir_unicode)
            os.mkdir(sketch_dir_unicode)

        self.assertFalse(os.path.isfile(final_ino_path))

        # Checks the file is saved, and saved to the right location
        created_sketch_path = sketch_creator.create_sketch(
            sketch_dir_unicode, sketch_name=sketch_name)
        self.assertEqual(final_ino_path, created_sketch_path)
        self.assertTrue(os.path.isfile(final_ino_path))

        # Remove created unicode dir
        shutil.rmtree(sketch_dir_unicode)

    def test_create_sketch_invalid(self):
        """
        Test for invalid inputs in the create_sketch method.
        """
        # Test for failure on invalid sketch path
        random_invalid_path = os.path.join(os.getcwd(), 'raNd_dIr')
        self.assertFalse(os.path.isdir(random_invalid_path))
        sketch_creator = SketchCreator()
        created_sketch_path = sketch_creator.create_sketch(random_invalid_path)
        self.assertIsNone(created_sketch_path)
        self.assertFalse(os.path.isdir(random_invalid_path))

        # Test for failure on invalid sketch code
        sketch_path = os.getcwd()
        sketch_folder_path = os.path.join(
            sketch_path, sketch_creator._default_sketch_name)
        if os.path.isdir(sketch_folder_path):
            shutil.rmtree(sketch_folder_path)
        self.assertFalse(os.path.isdir(sketch_folder_path))
        invalid_sketch_code = True
        created_sketch_path = sketch_creator.create_sketch(
            sketch_path, sketch_code=invalid_sketch_code)
        self.assertIsNone(created_sketch_path)
        self.assertFalse(os.path.isdir(sketch_folder_path))

    #
    # File creation with code
    #
    def test_create_sketch_with_code(self):
        sketch_creator = SketchCreator()
        sketch_dir = os.getcwd()
        sketch_ino_location = os.path.join(
            sketch_dir,
            sketch_creator._default_sketch_name,
            '%s.ino' % sketch_creator._default_sketch_name)
        sketch_code_write = 'Unicode test (ろΓαζςÂaé) on: %s' % \
                            time.strftime("%Y-%m-%d %H:%M:%S")

        sketch_return_location = sketch_creator.create_sketch(
            sketch_dir, sketch_code=sketch_code_write)
        self.assertEqual(sketch_return_location, sketch_ino_location)

        arduino_sketch = codecs.open(
            sketch_return_location, 'r', encoding='utf-8')
        sketch_code_read = arduino_sketch.read()
        arduino_sketch.close()
        self.assertEqual(sketch_code_write, sketch_code_read)


if __name__ == '__main__':
    unittest.main()

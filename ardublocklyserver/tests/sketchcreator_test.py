# -*- coding: utf-8 -*-
#
# Unit test for the Sketch Creator module module.
#
# Copyright (c) 2017 carlosperate https://github.com/carlosperate/
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
#
from __future__ import unicode_literals, absolute_import
import os
import gc
import time
import codecs
import shutil
import unittest

try:
    from ardublocklyserver import sketchcreator
except ImportError:
    import sys
    file_dir = os.path.dirname(os.path.realpath(__file__))
    package_dir = os.path.dirname(os.path.dirname(file_dir))
    sys.path.insert(0, package_dir)
    from ardublocklyserver import sketchcreator
from ardublocklyserver.compilersettings import ServerCompilerSettings


class SketchCreatorTestCase(unittest.TestCase):
    """Tests for SketchCreator class.

    Rather than mocking around with os module it creates 'safe' folder inside
    the test directory where it can create and delete files.
    """

    settings = None
    temp_folder = None

    #
    # Test fixtures
    #
    @classmethod
    def setUpClass(cls):
        """Create a temporary folder to play round."""
        cls.temp_folder = os.path.join(
                os.path.abspath(os.path.dirname(__file__)),
                'TestTemp_sketchcreator')
        if os.path.isdir(cls.temp_folder):
            raise Exception('Directory %s already exists.' % cls.temp_folder)
        os.makedirs(cls.temp_folder)
        # Put together the default sketch path
        cls.default_sketch_path = os.path.join(
            cls.temp_folder, sketchcreator.default_sketch_name,
            '%s.ino' % sketchcreator.default_sketch_name)
        # Create settings file and check it's a new instance by looking at path
        cls.settings = ServerCompilerSettings(cls.temp_folder)
        if cls.temp_folder not in cls.settings.get_settings_file_path():
            raise Exception('Settings file not created in temp folder:\n'
                            '\t%s' % cls.settings.get_settings_file_path())

    @classmethod
    def tearDownClass(cls):
        """Deletes the previously created temporary folder."""
        cls.settings._drop()
        del cls.settings
        cls.settings = None
        gc.collect()
        if os.path.isdir(cls.temp_folder):
            shutil.rmtree(cls.temp_folder)

    def setUp(self):
        """Ensure the temp folder exists."""
        if not os.path.isdir(self.__class__.temp_folder):
            os.makedirs(self.__class__.temp_folder)

    def tearDown(self):
        """Delete any files created inside the temp directory"""
        if os.path.isdir(self.__class__.temp_folder):
            shutil.rmtree(self.__class__.temp_folder)

    #
    # Tests for file creation
    #
    def test_create_sketch_name_default(self):
        """Test default sketch has created the file correctly."""
        sketch_path = sketchcreator.create_sketch(self.temp_folder)

        self.assertEqual(sketch_path, self.default_sketch_path)
        self.assertTrue(os.path.isfile(self.default_sketch_path))

    def test_create_sketch_name_non_default(self):
        """Tests to see if an Arduino Sketch is created in a new location."""
        filename_unicode = 'TestTemp_ろΓαζςÂé'
        final_ino_path = os.path.join(
            self.temp_folder, filename_unicode, filename_unicode + '.ino')

        created_sketch_path = sketchcreator.create_sketch(
            self.temp_folder, sketch_name=filename_unicode)

        self.assertEqual(final_ino_path, created_sketch_path)
        self.assertTrue(os.path.isfile(final_ino_path))

    def test_create_sketch_name_invalid(self):
        """Test for invalid inputs in the create_sketch method."""
        self.assertFalse(os.path.isdir(self.default_sketch_path))
        invalid_sketch_name = True

        created_sketch_path = sketchcreator.create_sketch(
            self.temp_folder, sketch_name=invalid_sketch_name)

        self.assertIsNone(created_sketch_path)
        self.assertFalse(os.path.isdir(self.default_sketch_path))

    def test_create_sketch_path_invalid(self):
        """Test for invalid inputs in the create_sketch method."""
        invalid_path = os.path.join(self.temp_folder, 'raNd_dIr')
        self.assertFalse(os.path.isdir(invalid_path))

        created_sketch_path = sketchcreator.create_sketch(invalid_path)

        self.assertIsNone(created_sketch_path)
        self.assertFalse(os.path.isdir(invalid_path))

    #
    # Tests for code content
    #
    def test_create_sketch_code_default(self):
        """Test default sketch has filled the sketch contents correctly."""
        sketch_path = sketchcreator.create_sketch(self.temp_folder)

        with codecs.open(sketch_path, 'r', encoding='utf-8') as sketch:
            sketch_content = sketch.read()
        self.assertEqual(sketch_content, sketchcreator.default_sketch_code)

    def test_create_sketch_code_non_default(self):
        """Test sketch is created correctly with the given code."""
        sketch_code = 'Unicode test (ろΓαζςÂaé) on: %s' % \
                      time.strftime("%Y-%m-%d %H:%M:%S")

        sketch_path = sketchcreator.create_sketch(
                self.temp_folder, sketch_code=sketch_code)

        with codecs.open(sketch_path, 'r', encoding='utf-8') as sketch:
            sketch_code_read = sketch.read()
        self.assertEqual(sketch_code_read, sketch_code)

    def test_create_sketch_code_invalid(self):
        """Test for invalid inputs in the create_sketch method."""
        self.assertFalse(os.path.isdir(self.default_sketch_path))
        invalid_sketch_code = True

        created_sketch_path = sketchcreator.create_sketch(
            self.temp_folder, sketch_code=invalid_sketch_code)

        self.assertIsNone(created_sketch_path)
        self.assertFalse(os.path.isdir(self.default_sketch_path))

    #
    # Test for building sketch path
    #
    def test_build_sketch_path_sketch_name_invalid(self):
        """Test for invalid sketch_name Type."""
        returned_sketch_path = sketchcreator.build_sketch_path(
            sketch_dir=self.temp_folder, sketch_name=True)

        self.assertIsNone(returned_sketch_path)

    def test_build_sketch_path_do_not_make_dir(self):
        """Test when the sketch directory exists already."""
        os.makedirs(os.path.join(self.temp_folder, 'sketch_name'))

        returned_sketch_path = sketchcreator.build_sketch_path(
            sketch_dir=self.temp_folder, sketch_name='sketch_name')

        self.assertEqual(returned_sketch_path, os.path.join(
                self.temp_folder, 'sketch_name', 'sketch_name.ino'))


if __name__ == '__main__':
    unittest.main()

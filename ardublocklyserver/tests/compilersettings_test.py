# -*- coding: utf-8 -*-
"""Unit test for the ServerCompilerSettings class.

Copyright (c) 2015 carlosperate https://github.com/carlosperate/
Licensed under the Apache License, Version 2.0 (the "License"):
    http://www.apache.org/licenses/LICENSE-2.0
"""
from __future__ import unicode_literals, absolute_import, print_function
import os
import gc
import sys
import shutil
import unittest
try:
    import mock
    from mock import patch
except ImportError:
    from unittest.mock import MagicMock as mock
    from unittest.mock import patch

try:
    from ardublocklyserver.compilersettings import ServerCompilerSettings
except ImportError:
    file_dir = os.path.dirname(os.path.realpath(__file__))
    package_dir = os.path.dirname(os.path.dirname(file_dir))
    sys.path.insert(0, package_dir)
    from ardublocklyserver.compilersettings import ServerCompilerSettings


class ServerCompilerSettingsTestCase(unittest.TestCase):
    """Tests for ServerCompilerSettings."""

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
            'TestTemp_compilersettings')
        if os.path.isdir(cls.temp_folder):
            raise Exception('Directory %s already exists.' % cls.temp_folder)
        os.makedirs(cls.temp_folder)
        # Create settings file and check it's a new instance by looking at path
        cls.settings = ServerCompilerSettings(cls.temp_folder)
        if cls.temp_folder not in cls.settings.get_settings_file_path():
            raise Exception('Settings file not created in temp folder:\n'
                            '\t%s' % cls.settings.get_settings_file_path())

    @classmethod
    def tearDownClass(cls):
        """Deletes the previously created temporary folder and settings."""
        cls.settings._drop()
        del cls.settings
        cls.settings = None
        gc.collect()
        if os.path.isdir(cls.temp_folder):
            shutil.rmtree(cls.temp_folder)

    #
    # Helper functions
    #
    def get_default_settings_file_dir(self):
        return os.path.normpath(
            self.settings._ServerCompilerSettings__settings_path)
        # The default location from the ServerCompilerSettings class is the
        # following, so if that changes in the class it needs to change here !!!
        #default_dir = os.path.dirname(os.path.realpath(sys.argv[0]))
        # Accessing the class static variable does not initialise the singleton
        #return os.path.normpath(os.path.join(
        #    default_dir,
        #    ServerCompilerSettings._ServerCompilerSettings__settings_filename))

    def delete_default_settings_file(self):
        """
        Checks if there is a settings file in the default location and deletes
        it if it finds it.
        This will DELETE a file from the directory this script is called !!!
        """
        print('Removing settings file from %s' % os.path.normpath(
                self.settings._ServerCompilerSettings__settings_filename))
        self.settings.delete_settings_file()

    def new_ServerCompilerSettings_instance(self):
        """
        Drops the current ServerCompilerSettings instance and creates a new one.
        """
        ServerCompilerSettings()._drop()
        return ServerCompilerSettings(self.temp_folder)

    #
    # Testing the class singleton property
    #
    def test_singleton(self):
        # Testing if singleton is working
        instance_1 = ServerCompilerSettings()
        instance_2 = ServerCompilerSettings()
        self.assertEqual(id(instance_1), id(instance_2))

    def test_destructor(self):
        ServerCompilerSettings()
        instance_1 = ServerCompilerSettings()
        instance_1._drop()
        self.assertIsNone(
            instance_1._ServerCompilerSettings__singleton_instance)

    #
    # Testing the compiler_dir accessors
    #
    @patch('ardublocklyserver.compilersettings.os.path.isfile')
    def test_compiler_dir_valid_accesor(self, mock_os_path_isfile):
        self.delete_default_settings_file()
        # Creating the instance will create the settings file
        instance = self.new_ServerCompilerSettings_instance()
        self.assertIsNone(instance.compiler_dir)
        self.assertIsNone(instance._ServerCompilerSettings__compiler_dir)

        # Testing setter with valid input
        mock_os_path_isfile.return_value = True
        old_compiler_dir = instance.compiler_dir
        self.assertIsNone(old_compiler_dir)
        new_compiler_dir = os.path.join(os.getcwd(), 'ろΓαζςÂaé', 'random.exe')
        instance.compiler_dir = new_compiler_dir
        self.assertEqual(
            instance.compiler_dir,
            instance._ServerCompilerSettings__compiler_dir)
        # For now we depend on having CI builds on each platform
        if sys.platform == 'darwin':
            # Mac has to search for the executable inside the app bundle, so it
            # will end up being: new_dir/Contents/MacOS/JavaApplicationStub
            self.assertTrue(new_compiler_dir in instance.compiler_dir)
            self.assertIsNotNone(instance.compiler_dir)
        else:
            self.assertEqual(new_compiler_dir, instance.compiler_dir)
            self.assertNotEqual(old_compiler_dir, instance.compiler_dir)

    @patch('ardublocklyserver.compilersettings.os.path.isfile')
    def test_compiler_dir_invalid_accesor(self, mock_os_path_isfile):
        """
        Tests path doesn't get saved if:
             A file that does not exists
             Just a folder
        """
        self.delete_default_settings_file()

        # Test for failure, mock that the file does not exists
        mock_os_path_isfile.return_value = False
        original_dir = self.new_ServerCompilerSettings_instance().compiler_dir
        self.assertIsNone(original_dir)
        new_dir = os.path.join(os.getcwd(), 'random.exe')
        ServerCompilerSettings().compiler_dir = new_dir
        # For now we depend on having CI builds on each platform
        if sys.platform == 'darwin':
            # Mac has to search for the executable inside the app bundle, so it
            # will end up being: new_dir/Contents/MacOS/JavaApplicationStub
            self.assertIsNone(ServerCompilerSettings().compiler_dir)
        else:
            self.assertNotEqual(new_dir, ServerCompilerSettings().compiler_dir)
            self.assertEqual(original_dir,
                             ServerCompilerSettings().compiler_dir)

        # Test for directory not accepted as a valid compiler file
        mock_os_path_isfile.return_value = True
        new_dir = os.getcwd()
        ServerCompilerSettings().compiler_dir = new_dir
        self.assertTrue(new_dir in ServerCompilerSettings().compiler_dir)
        self.assertNotEqual(original_dir, ServerCompilerSettings().compiler_dir)

    @patch('ardublocklyserver.compilersettings.os.path.isfile')
    @patch('ardublocklyserver.compilersettings.sys.platform')
    def test_compiler_dir_platform_specific(
            self, mock_os_path_isfile, mock_sys_platform):
        """
        Depending on the platform that the server is running, the Arduino
        software has some specific quirks about which file has to be used.
        :param mock_os_path_isfile: Mock for the isfile function.
        :param mock_sys_platform: Mock for the sys.platform variable.
        """
        # Set the system as MacOS to check for app bundle check
        #mock_sys_platform.value = 'darwin'
        #print(sys.platform)
        # For now I'm unable to fake sys.platform without mocking entire sys, so
        # we'll depend on the CI servers to do platform testing here

        # Check that the final compiler dir is within the app bundle
        if sys.platform == 'darwin':
            mock_os_path_isfile.return_value = True
            new_dir = os.path.join(os.getcwd(), 'arduino.app')
            ServerCompilerSettings().compiler_dir = new_dir
            self.assertNotEqual(new_dir, ServerCompilerSettings().compiler_dir)
            self.assertTrue(new_dir in ServerCompilerSettings().compiler_dir)
            final_dir = os.path.join(new_dir, 'Contents', 'MacOS',
                                     'JavaApplicationStub')
            self.assertEqual(final_dir, ServerCompilerSettings().compiler_dir)

    #
    # Test the sketch name accessors
    #
    @patch('ardublocklyserver.compilersettings.os.path.isdir')
    def test_sketch_name_valid_accesor(self, mock_isdir):
        self.delete_default_settings_file()
        old_sketch_dir = ServerCompilerSettings().sketch_dir
        mock_isdir.return_value = True
        test_sketch_dir = os.path.join(os.getcwd(), 'unicode_いろΓαζέεςÂaéquo')
        ServerCompilerSettings().sketch_dir = test_sketch_dir
        self.assertEqual(test_sketch_dir, ServerCompilerSettings().sketch_dir)
        self.assertNotEqual(old_sketch_dir, ServerCompilerSettings().sketch_dir)

    def test_sketch_name_invalid_accesor(self):
        """
        Tests path doesn't get saved the input is not a valid directory.
        """
        self.delete_default_settings_file()
        old_sketch_dir = ServerCompilerSettings().sketch_dir
        test_sketch_dir = os.path.join(os.getcwd(), 'random_faKe_dir_ろ')
        ServerCompilerSettings().sketch_dir = test_sketch_dir
        self.assertNotEqual(test_sketch_dir,
                            ServerCompilerSettings().sketch_dir)
        self.assertEqual(old_sketch_dir, ServerCompilerSettings().sketch_dir)

    #
    # Test the sketch directory accessors
    #
    def test_sketch_dir_valid_accesor(self):
        #TODO: This test
        pass

    def test_sketch_dir_invalid_accesor(self):
        #TODO: This test
        pass

    #
    # Test the Arduino boards accessors
    #
    def test_arduino_board_valid_accesor(self):
        #TODO: This test
        pass

    def test_arduino_board_invalid_accesor(self):
        #TODO: This test
        pass

    def test_get_arduino_board_flag(self):
        #TODO: This test
        pass

    def test_get_arduino_board_types(self):
        #TODO: This test
        pass

    #
    # Test the serial port accessors
    #
    def test_serial_port_valid_accesor(self):
        #TODO: This test
        pass

    def test_serial_port_invalid_accesor(self):
        #TODO: This test
        pass

    def test_get_serial_port_flag(self):
        #TODO: This test
        pass

    def test_get_serial_ports(self):
        #TODO: This test
        pass

    #
    # Testing the launch_IDE_option accessors
    #
    def test_ide_valid_accesor(self):
        self.delete_default_settings_file()
        # Creating the instance will create the settings file
        instance = self.new_ServerCompilerSettings_instance()
        self.assertEqual(
            instance.load_ide_option,
            instance._ServerCompilerSettings__load_ide_option)

        # Testing setter with valid inputs
        for key in instance.get_load_ide_options():
            old_load_ide_option = instance.load_ide_option
            new_load_ide_option = key
            instance.load_ide_option = new_load_ide_option
            self.assertEqual(
                instance.load_ide_option,
                instance._ServerCompilerSettings__load_ide_option)
            self.assertEqual(instance.load_ide_option, new_load_ide_option)

    def test_ide_invalid_accesor(self):
        # Creating the instance will create the settings file with defaults
        self.delete_default_settings_file()
        instance = self.new_ServerCompilerSettings_instance()

        # Testing setter with value instead of key inputs
        ide_dict = instance.get_load_ide_options()
        for key in ide_dict:
            old_load_ide_option = instance.load_ide_option
            new_load_ide_option = ide_dict[key]
            instance.load_ide_option = new_load_ide_option
            self.assertEqual(
                instance.load_ide_option,
                instance._ServerCompilerSettings__load_ide_option)
            self.assertNotEqual(instance.load_ide_option, new_load_ide_option)
            self.assertEqual(instance.load_ide_option, old_load_ide_option)

    #
    # Test the default values function
    #
    def test_set_default_settings(self):
        #TODO: This test
        pass

    def test_new_settings_file_defaults(self):
        """
        Tests that a newly created instance without an already existing settings
        file contains the default settings.
        :return:
        """
        #TODO: This test
        pass

    #
    # Testing the save and read settings file functionality
    #
    def test_settings_file_creation(self):
        """
        Tests if the settings file is created.
        """
        self.delete_default_settings_file()
        settings_file = self.get_default_settings_file_dir()
        self.assertFalse(os.path.exists(settings_file))
        ServerCompilerSettings().save_settings()
        self.assertTrue(os.path.exists(settings_file))

    def test_settings_file_deletion(self):
        self.delete_default_settings_file()
        settings_file = self.get_default_settings_file_dir()
        self.assertFalse(os.path.exists(settings_file))
        ServerCompilerSettings().save_settings()
        self.assertTrue(os.path.exists(settings_file))
        ServerCompilerSettings().delete_settings_file()
        self.assertFalse(os.path.exists(settings_file))

    def test_settings_file_simple_read(self):
        """
        Simple test that checks for no exceptions happening while creating
        and loading the created file.
        """
        ServerCompilerSettings()
        ServerCompilerSettings().set_default_settings()
        ServerCompilerSettings().get_settings_file_data()
        ServerCompilerSettings().save_settings()

    def test_settings_file_read(self):
        """
        Tests that the settings are saved into a file and read correctly.
        Checks that all saved settings are retrieved.
        """
        #TODO: This test
        pass

    def test_save_file_unicode(self):
        #TODO: This test
        pass

    def test_read_file_unicode(self):
        #TODO: This test
        pass


if __name__ == '__main__':
    unittest.main()

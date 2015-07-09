# -*- coding: utf-8 -*-
#
# Unit test for the compilersettings module.
#
# Copyright (c) 2015 carlosperate https://github.com/carlosperate/
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
#
from __future__ import unicode_literals, absolute_import
import os
import sys
import mock
import unittest

try:
    from ardublocklyserver.compilersettings import ServerCompilerSettings
except ImportError:
    import sys
    file_dir = os.path.dirname(os.path.realpath(__file__))
    package_dir = os.path.dirname(os.path.dirname(file_dir))
    sys.path.insert(0, package_dir)
    from ardublocklyserver.compilersettings import ServerCompilerSettings


class ServerCompilerSettingsTestCase(unittest.TestCase):
    """
    Tests for ServerCompilerSettings
    """

    #
    # Helper functions
    #
    def get_default_settings_file_dir(self):
        # The default location from the ServerCompilerSettings class is the
        # following, so if that changes in the class it needs to change here !!!
        default_dir = os.path.dirname(os.path.realpath(sys.argv[0]))
        # Accessing the class static variable does not initialise the singleton
        return os.path.normpath(os.path.join(
            default_dir,
            ServerCompilerSettings._ServerCompilerSettings__settings_filename))

    def delete_default_settings_file(self):
        """
        Checks if there is a settings file in the default location and deletes
        it if it finds it.
        This will DELETE a file from the directory this script is called !!!
        """
        settings_file = self.get_default_settings_file_dir()
        if os.path.exists(settings_file):
            print('Removing settings file from %s' % settings_file)
            os.remove(settings_file)

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
    @mock.patch('ardublocklyserver.compilersettings.os.path.isfile')
    def test_compiler_dir_valid_accesor(self, mock_os_path_isfile):
        self.delete_default_settings_file()
        # Creating the instance will create the settings file
        instance = ServerCompilerSettings()
        self.assertEqual(
            instance.compiler_dir,
            instance._ServerCompilerSettings__compiler_dir)

        # Testing setter with valid input
        mock_os_path_isfile.return_value = True
        old_compiler_dir = instance.compiler_dir
        new_compiler_dir = os.path.join(os.getcwd(), 'random.exe')
        instance.compiler_dir = new_compiler_dir
        self.assertEqual(
            instance.compiler_dir,
            instance._ServerCompilerSettings__compiler_dir)
        self.assertEqual(instance.compiler_dir, new_compiler_dir)
        self.assertNotEqual(instance.compiler_dir, old_compiler_dir)

    @mock.patch('ardublocklyserver.compilersettings.os.path.isfile')
    def test_compiler_dir_invalid_accesor(self, mock_os_path_isfile):
        """
        Tests path doesn't get saved if:
             A file that does not exists
             Just a folder
        """
        # Test for failure, mock that the file does not exists
        mock_os_path_isfile.return_value = False
        original_dir = ServerCompilerSettings().compiler_dir
        new_dir = os.path.join(os.getcwd(), 'random.exe')
        ServerCompilerSettings().compiler_dir = new_dir
        self.assertNotEqual(new_dir, ServerCompilerSettings().compiler_dir)
        self.assertEqual(original_dir, ServerCompilerSettings().compiler_dir)

        # Test for directory not accepted as a valid compiler file
        mock_os_path_isfile.return_value = True
        new_dir = os.getcwd()
        ServerCompilerSettings().compiler_dir = new_dir
        self.assertTrue(new_dir in ServerCompilerSettings().compiler_dir)
        self.assertNotEqual(original_dir, ServerCompilerSettings().compiler_dir)

    @mock.patch('ardublocklyserver.compilersettings.os.path.isfile')
    @mock.patch('ardublocklyserver.compilersettings.sys.platform')
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
    # Testing the launch_IDE_option accessors
    #
    def test_ide_valid_accesor(self):
        self.delete_default_settings_file()
        # Creating the instance will create the settings file
        instance = ServerCompilerSettings()
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
            self.assertNotEqual(instance.load_ide_option, old_load_ide_option)

    def test_ide_invalid_accesor(self):
        # Creating the instance will create the settings file with defaults
        self.delete_default_settings_file()
        instance = ServerCompilerSettings()

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
    # Testing the settings file
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

    def test_settings_file_read(self):
        """
        Simple test that checks for no exceptions happening while creating
        and loading the created file.
        """
        ServerCompilerSettings()
        ServerCompilerSettings().set_default_settings()
        ServerCompilerSettings().get_settings_file_data()
        ServerCompilerSettings().save_settings()


if __name__ == '__main__':
    unittest.main()

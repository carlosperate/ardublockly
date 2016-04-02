# -*- coding: utf-8 -*-
#
# Unit test for the actions module.
#
# Copyright (c) 2015 carlosperate https://github.com/carlosperate/
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
#
from __future__ import unicode_literals, absolute_import, print_function
import os
import sys
import codecs
import unittest
try:
    import mock
    from mock import patch
except ImportError:
    from unittest.mock import MagicMock as mock
    from unittest.mock import patch

try:
    import ardublocklyserver.actions as actions
    from ardublocklyserver.compilersettings import ServerCompilerSettings
except ImportError:
    import sys
    file_dir = os.path.dirname(os.path.realpath(__file__))
    package_dir = os.path.dirname(os.path.dirname(file_dir))
    sys.path.insert(0, package_dir)
    import ardublocklyserver.actions as actions
    from ardublocklyserver.compilersettings import ServerCompilerSettings


class ActionsTestCase(unittest.TestCase):
    """
    Tests for actions module
    """

    #
    # Helper functions
    #
    def delete_default_settings_file(self):
        """
        Checks if there is a settings file in the default location and deletes
        it if it finds it.
        This will DELETE a file from the directory this script is called !!!
        """
        default_dir = os.path.dirname(os.path.realpath(sys.argv[0]))
        # Accessing the class static variable does not initialise the singleton
        settings_file = os.path.normpath(os.path.join(
            default_dir,
            ServerCompilerSettings._ServerCompilerSettings__settings_filename))
        if os.path.exists(settings_file):
            print('Removing settings file from %s' % settings_file)
            os.remove(settings_file)

    #
    # Command line tests
    #
    @patch('ardublocklyserver.actions.subprocess.Popen', autospec=True)
    #@patch.object(
    #    actions.ServerCompilerSettings, 'get_compiler_dir', autospec=True)
    def test_load_arduino_cli_valid(self, mock_popen):
        """
        Tests that a compiler path and arduino sketch path can be set
        and that a command line can be launched to open the sketch in the
        Arduino IDE.
        """
        sketch_path = actions.create_sketch_default()

        ServerCompilerSettings().load_ide_option = 'open'
        with patch(
                'ardublocklyserver.actions.ServerCompilerSettings.compiler_dir',
                new_callable=mock.PropertyMock) as mock_compiler_dir:
            mock_compiler_dir.return_value = 'true'  # do nothing command
            expected_command = ['true', sketch_path]
            success, conclusion, out, error, exit_code = \
                actions.load_arduino_cli(sketch_path)
            mock_popen.assert_called_with(expected_command, shell=False)
            self.assertTrue(success)

        ServerCompilerSettings().load_ide_option = 'verify'
        with patch(
                'ardublocklyserver.actions.ServerCompilerSettings.compiler_dir',
                new_callable=mock.PropertyMock) as mock_compiler_dir:
            mock_compiler_dir.return_value = 'true'  # do nothing command
            mock_popen.return_value.communicate.return_value = ('test', 'test')
            mock_popen.return_value.returncode = 0
            expected_command = ['true', '--verify', sketch_path]
            success, conclusion, out, error, exit_code = \
                actions.load_arduino_cli(sketch_path)
            mock_popen.assert_called_with(expected_command, shell=False,
                                          stderr=-1, stdout=-1)
            self.assertTrue(success)

        ServerCompilerSettings().load_ide_option = 'upload'
        with patch(
                'ardublocklyserver.actions.ServerCompilerSettings.compiler_dir',
                new_callable=mock.PropertyMock) as mock_compiler_dir:
            mock_compiler_dir.return_value = 'true'  # do nothing command
            mock_popen.return_value.communicate.return_value = ('test', 'test')
            mock_popen.return_value.returncode = 0
            expected_command = [
                'true', '--upload', '--port',
                ServerCompilerSettings().get_serial_port_flag(), '--board',
                ServerCompilerSettings().get_arduino_board_flag(), sketch_path]
            success, conclusion, out, error, exit_code = \
                actions.load_arduino_cli(sketch_path)
            mock_popen.assert_called_with(expected_command, shell=False,
                                          stderr=-1, stdout=-1)
            self.assertTrue(success)

        # Test for unicode strings as Py2 can be susceptible to fail there
        ServerCompilerSettings().load_ide_option = 'upload'
        with patch(
                'ardublocklyserver.actions.ServerCompilerSettings.compiler_dir',
                new_callable=mock.PropertyMock) as mock_compiler_dir:
            mock_compiler_dir.return_value = 'いろはにほへとちり'  # unicode
            mock_popen.return_value.communicate.return_value = (
                'Γαζέες καὶ μυρτιὲς', 'Âne ex aéquo au whist')
            mock_popen.return_value.returncode = 0
            expected_command = [
                mock_compiler_dir.return_value, '--upload', '--port',
                ServerCompilerSettings().get_serial_port_flag(), '--board',
                ServerCompilerSettings().get_arduino_board_flag(), sketch_path]
            success, conclusion, out, error, exit_code = \
                actions.load_arduino_cli(sketch_path)
            mock_popen.assert_called_with(expected_command, shell=False,
                                          stderr=-1, stdout=-1)
            self.assertTrue(success)

    def test_load_arduino_cli_invalid(self):
        # Test that an path that is not a file returns error
        success, conclusion, out, error, exit_code =\
            actions.load_arduino_cli(os.getcwd())
        self.assertFalse(success)
        self.assertTrue('Provided sketch path is not a valid' in conclusion)

        # Test for error if compiler dir is not set, default is None
        self.delete_default_settings_file()
        success, conclusion, out, error, exit_code = actions.load_arduino_cli()
        self.assertFalse(success)
        self.assertEqual(conclusion, 'Unable to find Arduino IDE')

        # Test for error if compiler dir is not set
        with patch(
                'ardublocklyserver.actions.ServerCompilerSettings.compiler_dir',
                new_callable=mock.PropertyMock) as mock_compiler_dir:
            with patch(
                    'ardublocklyserver.actions.ServerCompilerSettings.'
                    'load_ide_option', new_callable=mock.PropertyMock) as \
                    mock_load_ide_option:
                mock_compiler_dir.return_value = 'true'  # do nothing command
                mock_load_ide_option.return_value = None
                success, conclusion, out, error, exit_code = \
                    actions.load_arduino_cli()
                self.assertFalse(success)
                self.assertEqual(conclusion,
                                 'What should we do with the Sketch?')

        # Test for error if serial port unset, only required when set to upload
        ServerCompilerSettings().load_ide_option = 'upload'
        with patch(
                'ardublocklyserver.actions.ServerCompilerSettings.compiler_dir',
                new_callable=mock.PropertyMock) as mock_compiler_dir:
            with patch(
                    'ardublocklyserver.actions.ServerCompilerSettings.'
                    'get_serial_port_flag') as mock_get_serial_port_flag:
                mock_compiler_dir.return_value = 'true'  # do nothing command
                mock_get_serial_port_flag.return_value = None
                success, conclusion, out, error, exit_code = \
                    actions.load_arduino_cli()
                self.assertFalse(success)
                self.assertEqual(conclusion, 'Serial Port unavailable')

        # Test for error if board type unset, only required when set to upload
        ServerCompilerSettings().load_ide_option = 'upload'
        with patch(
                'ardublocklyserver.actions.ServerCompilerSettings.compiler_dir',
                new_callable=mock.PropertyMock) as mock_compiler_dir:
            with patch(
                    'ardublocklyserver.actions.ServerCompilerSettings.'
                    'get_arduino_board_flag') as mock_get_arduino_board_flag:
                mock_compiler_dir.return_value = 'true'  # do nothing command
                mock_get_arduino_board_flag.return_value = None
                success, conclusion, out, error, exit_code = \
                    actions.load_arduino_cli()
                self.assertFalse(success)
                self.assertEqual(conclusion, 'Unknown Arduino Board')

    #
    # Tests sketch creation
    #
    def test_create_sketch_default(self):
        sketch_dir = actions.create_sketch_default()
        self.assertTrue(os.path.isfile(sketch_dir))

    def test_create_sketch_from_string(self):
        sketch_content = 'test string sketch'
        sketch_dir = actions.create_sketch_from_string(sketch_content)
        self.assertTrue(os.path.isfile(sketch_dir))
        f = codecs.open(sketch_dir, "r", "utf-8")
        self.assertEqual(f.read(), sketch_content)

        # Test for unicode file
        sketch_content = 'いろはにほへとちり Γαζέες καὶ μυρτς Âne aéquo au whist'
        sketch_dir = actions.create_sketch_from_string(sketch_content)
        self.assertTrue(os.path.isfile(sketch_dir))
        f = codecs.open(sketch_dir, "r", "utf-8")
        self.assertEqual(f.read(), sketch_content)

    #
    # Tests sketch creation
    #
    @patch('ardublocklyserver.gui.browse_file_dialog')
    @patch('ardublocklyserver.compilersettings.os.path.isfile')
    def test_load_arduino_cli_valid(self, mock_isfile, mock_file_dialog):
        """
        Tests that the set_compiler_path method edits the settings based on the
        output from the gui.browse_file_dialog() function only if it has not
        been cancelled.
        The return value is not tested as it is a direct call to the
        actions.get_compiler_path() function and will be tested individually.
        """
        self.delete_default_settings_file()
        settings = ServerCompilerSettings()
        new_compiler_dir = os.path.join(os.getcwd(), 'arduino_debug.exe')
        mock_file_dialog.return_value = new_compiler_dir
        # The settings.compiler_dir checks for file validity
        mock_isfile.return_value = True
        old_compiler_dir = settings.compiler_dir
        actions.set_compiler_path()
        self.assertNotEqual(old_compiler_dir, settings.compiler_dir)
        # Using in as each OSs will dealt with compiler path differently
        self.assertTrue(new_compiler_dir in settings.compiler_dir)

        # If the dialog is cancelled, the ServerCompilerSettings class should
        # not be invoked at all
        with patch(
                'ardublocklyserver.actions.ServerCompilerSettings.__new__') \
                as mock_settings:
            # Avoid call to ServerCompilerSettings() in get_compiler_path
            with patch('ardublocklyserver.actions.get_compiler_path') \
                    as mock_get_compiler_path:
                mock_file_dialog.return_value = ''  # Dialog cancel return value
                mock_get_compiler_path.return_vale = None  # Don't care
                old_compiler_dir = settings.compiler_dir
                actions.set_compiler_path()
                self.assertEqual(old_compiler_dir, settings.compiler_dir)
                self.assertFalse(mock_settings.called)

    def test_get_compiler_path(self):
        #TODO: This test method
        pass

    #
    # Test sketch setting functions
    #
    def test_set_sketch_path(self):
        #TODO: This test method
        pass

    def test_get_sketch_path(self):
        #TODO: This test method
        pass

    #
    # Test arduino Board setting functions
    #
    def test_set_arduino_board(self):
        #TODO: This test method
        pass

    def test_get_arduino_boards(self):
        #TODO: This test method
        pass

    #
    # Test serial Port setting functions
    #
    def test_set_serial_port(self):
        #TODO: This test method
        pass

    def test_get_serial_ports(self):
        #TODO: This test method
        pass

    #
    # Test load IDE setting functions
    #
    def test_set_load_ide_only(self):
        #TODO: This test method
        pass

    def test_get_load_ide_only(self):
        #TODO: This test method
        pass


if __name__ == '__main__':
    unittest.main()

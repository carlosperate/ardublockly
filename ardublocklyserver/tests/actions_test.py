# -*- coding: utf-8 -*-
"""Unit test for the actions module.

Copyright (c) 2017 carlosperate https://github.com/carlosperate/
Licensed under the Apache License, Version 2.0 (the "License"):
    http://www.apache.org/licenses/LICENSE-2.0
"""
from __future__ import unicode_literals, absolute_import, print_function
import os
import gc
import sys
import shutil
import codecs
import unittest
# Python 2 and 3 compatibility imports
try:
    from mock import patch, MagicMock
except ImportError:
    from unittest.mock import patch, MagicMock
# This package modules
try:
    import ardublocklyserver.actions as actions
except ImportError:
    file_dir = os.path.dirname(os.path.realpath(__file__))
    package_dir = os.path.dirname(os.path.dirname(file_dir))
    sys.path.insert(0, package_dir)
    import ardublocklyserver.actions as actions
from ardublocklyserver.compilersettings import ServerCompilerSettings


class ActionsTestCase(unittest.TestCase):
    """Tests for actions module."""

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
                'TestTemp_actions')
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
        """Deletes the previously created temporary folder."""
        cls.settings._drop()
        del cls.settings
        cls.settings = None
        gc.collect()
        if os.path.isdir(cls.temp_folder):
            shutil.rmtree(cls.temp_folder)

    def setUp(self):
        """Ensure the temp folder and settings file exists."""
        if not os.path.isdir(self.__class__.temp_folder):
            os.makedirs(self.__class__.temp_folder)
        # Create settings file in the TestTemp_actions folder
        self.settings.set_default_settings()

    def tearDown(self):
        """Delete the temp folder and any files created inside."""
        if os.path.isdir(self.__class__.temp_folder):
            shutil.rmtree(self.__class__.temp_folder)

    #
    # Command line tests
    #
    @patch('ardublocklyserver.compilersettings.os.path.isfile')
    @patch('ardublocklyserver.actions.subprocess.Popen', autospec=True)
    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_load_arduino_cli_open(
            self, mock_settings, mock_popen, mock_isfile):
        """
        Tests that a compiler path and arduino sketch path can be set
        and that a command line can be launched to open the sketch in the
        Arduino IDE.
        """
        sketch_path = os.path.join(self.temp_folder, 'sketch.ino')
        compiler_dir = 'whatever/arduino'
        mock_settings.return_value.compiler_dir = compiler_dir
        mock_popen.return_value.communicate.return_value = ('out1', 'out2')
        mock_isfile.return_value = True
        mock_settings.return_value.load_ide_option = 'open'

        success, ide_mode, std_out, err_out, exit_code = \
            actions.load_arduino_cli(sketch_path)

        mock_popen.assert_called_with([compiler_dir, sketch_path], shell=False)
        self.assertTrue(success)
        self.assertEqual(ide_mode, 'open')
        self.assertNotEqual(std_out, 'out1')
        self.assertNotEqual(err_out, 'out2')
        self.assertEqual(exit_code, 0)

    @patch('ardublocklyserver.compilersettings.os.path.isfile')
    @patch('ardublocklyserver.actions.subprocess.Popen', autospec=True)
    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_load_arduino_cli_verify(
            self, mock_settings, mock_popen, mock_isfile):
        """
        Tests that a compiler path and arduino sketch path can be set
        and that a command line can be launched to open the sketch in the
        Arduino IDE.
        """
        sketch_path = os.path.join(self.temp_folder, 'sketch.ino')
        compiler_dir = 'whatever/arduino'
        board_flag = 'whatever:flag'
        mock_settings.return_value.compiler_dir = compiler_dir
        mock_settings.return_value.get_arduino_board_flag = MagicMock()
        mock_settings.return_value.get_arduino_board_flag.return_value =\
            board_flag
        mock_popen.return_value.communicate.return_value =\
            ('out1'.encode('latin-1'), 'out2'.encode('latin-1'))
        mock_popen.return_value.returncode = 0
        mock_isfile.return_value = True
        mock_settings.return_value.load_ide_option = 'verify'

        success, ide_mode, std_out, err_out, exit_code = \
            actions.load_arduino_cli(sketch_path)

        mock_popen.assert_called_with(
                [compiler_dir, sketch_path, '--board', board_flag, '--verify'],
                shell=False, stderr=-1, stdout=-1)
        self.assertTrue(success)
        self.assertEqual(ide_mode, 'verify')
        self.assertEqual(std_out, 'out1')
        self.assertEqual(err_out, 'out2')
        self.assertEqual(exit_code, 0)

    @patch('ardublocklyserver.compilersettings.os.path.isfile')
    @patch('ardublocklyserver.actions.subprocess.Popen', autospec=True)
    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_load_arduino_cli_upload(
            self, mock_settings, mock_popen, mock_isfile):
        """
        Tests that a compiler path and arduino sketch path can be set
        and that a command line can be launched to open the sketch in the
        Arduino IDE.
        """
        sketch_path = os.path.join(self.temp_folder, 'sketch.ino')
        compiler_dir = 'whatever/arduino'
        board_flag = 'whatever:flag'
        port = 'whatever_port'
        mock_settings.return_value.compiler_dir = compiler_dir
        mock_settings.return_value.get_arduino_board_flag = MagicMock()
        mock_settings.return_value.get_arduino_board_flag.return_value = \
            board_flag
        mock_settings.return_value.get_serial_port_flag = MagicMock()
        mock_settings.return_value.get_serial_port_flag.return_value = port
        mock_popen.return_value.communicate.return_value = \
            ('out1'.encode('latin-1'), 'out2'.encode('latin-1'))
        mock_popen.return_value.returncode = 0
        mock_isfile.return_value = True
        mock_settings.return_value.load_ide_option = 'upload'

        success, ide_mode, std_out, err_out, exit_code = \
            actions.load_arduino_cli(sketch_path)

        mock_popen.assert_called_with(
            [compiler_dir, sketch_path, '--upload', '--port', port, '--board',
             board_flag], shell=False, stderr=-1, stdout=-1)
        self.assertTrue(success)
        self.assertEqual(ide_mode, 'upload')
        self.assertEqual(std_out, 'out1')
        self.assertEqual(err_out, 'out2')
        self.assertEqual(exit_code, 0)

    @unittest.skip('Need to solve multiple locale std out issue first')
    @patch('ardublocklyserver.compilersettings.os.path.isfile')
    @patch('ardublocklyserver.actions.subprocess.Popen', autospec=True)
    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_load_arduino_cli_upload_unicode(
            self, mock_settings, mock_popen, mock_isfile):
        sketch_path = os.path.join(self.temp_folder, 'sketch.ino')
        compiler_dir = 'いろはにほへとちり'
        board_flag = 'whatever:flag'
        port = 'whatever_port'
        mock_settings.return_value.compiler_dir = compiler_dir
        mock_settings.return_value.get_arduino_board_flag = MagicMock()
        mock_settings.return_value.get_arduino_board_flag.return_value = \
            board_flag
        mock_settings.return_value.get_serial_port_flag = MagicMock()
        mock_settings.return_value.get_serial_port_flag.return_value = port
        mock_popen.return_value.communicate.return_value = \
            ('Γαζέες καὶ μυρτιὲς', 'Âne ex aéquo au whist')
        mock_popen.return_value.returncode = 0
        mock_isfile.return_value = True
        mock_settings.return_value.load_ide_option = 'upload'

        success, ide_mode, std_out, err_out, exit_code = \
            actions.load_arduino_cli(sketch_path)

        mock_popen.assert_called_with(
            [compiler_dir, sketch_path, '--upload', '--port', port, '--board',
             board_flag], shell=False, stderr=-1, stdout=-1)
        self.assertTrue(success)
        self.assertEqual(ide_mode, 'upload')
        self.assertEqual(std_out, 'out1')
        self.assertEqual(err_out, 'out2')
        self.assertEqual(exit_code, 0)

    def test_load_arduino_cli_sketch_path_invalid(self):
        invalid_sketch_path = os.path.join(self.temp_folder, 'bad.ino')

        success, ide_mode, std_out, err_out, exit_code = \
            actions.load_arduino_cli(invalid_sketch_path)

        self.assertFalse(success)
        self.assertEqual(ide_mode, 'unknown')
        self.assertEqual(std_out, '')
        self.assertTrue(invalid_sketch_path in err_out)
        self.assertEqual(exit_code, 52)

    @patch('ardublocklyserver.compilersettings.os.path.isfile')
    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_load_arduino_cli_compiler_dir_invalid(
            self, mock_settings, mock_isfile):
        mock_settings.return_value.compiler_dir = None
        mock_isfile.return_value = True

        success, ide_mode, std_out, err_out, exit_code = \
            actions.load_arduino_cli(os.path.join(self.temp_folder, 's.ino'))

        self.assertFalse(success)
        self.assertEqual(ide_mode, 'unknown')
        self.assertEqual(std_out, '')
        self.assertEqual(exit_code, 53)

    @patch('ardublocklyserver.compilersettings.os.path.isfile')
    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_load_arduino_cli_load_ide_invalid(
            self, mock_settings, mock_isfile):
        mock_settings.return_value.compiler_dir = 'compiler_dir'
        mock_settings.return_value.load_ide_option = None
        mock_isfile.return_value = True

        success, ide_mode, std_out, err_out, exit_code = \
            actions.load_arduino_cli(os.path.join(self.temp_folder, 's.ino'))

        self.assertFalse(success)
        self.assertEqual(ide_mode, 'unknown')
        self.assertEqual(std_out, '')
        self.assertEqual(exit_code, 54)

    @patch('ardublocklyserver.compilersettings.os.path.isfile')
    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_load_arduino_cli_board_flag_invalid(
            self, mock_settings, mock_isfile):
        mock_isfile.return_value = True
        mock_settings.return_value.compiler_dir = 'compiler_dir'
        mock_settings.return_value.load_ide_option = 'upload'
        mock_settings.return_value.get_arduino_board_flag = MagicMock()
        mock_settings.return_value.get_arduino_board_flag.return_value = None

        success, ide_mode, std_out, err_out, exit_code = \
            actions.load_arduino_cli(os.path.join(self.temp_folder, 's.ino'))

        self.assertFalse(success)
        self.assertEqual(ide_mode, 'unknown')
        self.assertEqual(std_out, '')
        self.assertEqual(exit_code, 56)

    @patch('ardublocklyserver.compilersettings.os.path.isfile')
    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_load_arduino_cli_port_flag_invalid(
            self, mock_settings, mock_isfile):
        mock_isfile.return_value = True
        mock_settings.return_value.compiler_dir = 'compiler_dir'
        mock_settings.return_value.load_ide_option = 'upload'
        mock_settings.return_value.get_arduino_board_flag = MagicMock()
        mock_settings.return_value.get_arduino_board_flag.return_value = 'avr'
        mock_settings.return_value.get_serial_port_flag = MagicMock()
        mock_settings.return_value.get_serial_port_flag.return_value = None

        success, ide_mode, std_out, err_out, exit_code = \
            actions.load_arduino_cli(os.path.join(self.temp_folder, 's.ino'))

        self.assertFalse(success)
        self.assertEqual(ide_mode, 'unknown')
        self.assertEqual(std_out, '')
        self.assertEqual(exit_code, 55)

    @patch('ardublocklyserver.compilersettings.os.path.isfile')
    @patch('ardublocklyserver.actions.subprocess.Popen', autospec=True)
    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_load_arduino_cli_exit_code_error(
            self, mock_settings, mock_popen, mock_isfile):
        sketch_path = os.path.join(self.temp_folder, 'sketch.ino')
        compiler_dir = 'whatever/arduino'
        board_flag = 'whatever:flag'
        mock_settings.return_value.compiler_dir = compiler_dir
        mock_settings.return_value.get_arduino_board_flag = MagicMock()
        mock_settings.return_value.get_arduino_board_flag.return_value =\
            board_flag
        mock_popen.return_value.communicate.return_value =\
            ('out1'.encode('latin-1'), 'out2'.encode('latin-1'))
        mock_popen.return_value.returncode = 2
        mock_isfile.return_value = True
        mock_settings.return_value.load_ide_option = 'verify'

        success, ide_mode, std_out, err_out, exit_code = \
            actions.load_arduino_cli(sketch_path)

        self.assertFalse(success)
        self.assertEqual(ide_mode, 'verify')
        self.assertEqual(std_out, 'out1')
        self.assertTrue(err_out, 'out2')
        self.assertEqual(exit_code, 2)

    @patch('ardublocklyserver.compilersettings.os.path.isfile')
    @patch('ardublocklyserver.actions.subprocess.Popen', autospec=True)
    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_load_arduino_cli_exit_code_50(
            self, mock_settings, mock_popen, mock_isfile):
        sketch_path = os.path.join(self.temp_folder, 'sketch.ino')
        compiler_dir = 'whatever/arduino'
        board_flag = 'whatever:flag'
        mock_settings.return_value.compiler_dir = compiler_dir
        mock_settings.return_value.get_arduino_board_flag = MagicMock()
        mock_settings.return_value.get_arduino_board_flag.return_value =\
            board_flag
        mock_popen.return_value.communicate.return_value =\
            ('out1'.encode('latin-1'), 'out2'.encode('latin-1'))
        mock_popen.return_value.returncode = 51  # Will be replaced to 50
        mock_isfile.return_value = True
        mock_settings.return_value.load_ide_option = 'verify'

        success, ide_mode, std_out, err_out, exit_code = \
            actions.load_arduino_cli(sketch_path)

        self.assertFalse(success)
        self.assertEqual(ide_mode, 'verify')
        self.assertEqual(std_out, 'out1')
        self.assertTrue('51' in err_out)
        self.assertEqual(exit_code, 50)

    def test_load_arduino_cli_invalid(self):
        pass

    #
    # Tests sketch creation
    #
    @patch('ardublocklyserver.actions.create_sketch_from_string')
    @patch('ardublocklyserver.actions.load_arduino_cli')
    def test_arduino_ide_send_code_valid(
            self, mock_load_arduino_cli, mock_create_sketch_from_string):
        """Test a valid input to arduino_ide_send_code function.

        Because this function basically bridges two functions also tested here
        we only need to test they've been called correctly.

        :param mock_load_arduino_cli: Mock for load_arduino_cli()
        :param mock_create_sketch_from_string: Mock for
                create_sketch_from_string()
        :return: None.
        """
        actions.arduino_ide_send_code('dummy sketch content here')

        self.assertTrue(mock_create_sketch_from_string.called)
        self.assertTrue(mock_load_arduino_cli.called)

    @patch('ardublocklyserver.actions.create_sketch_from_string')
    @patch('ardublocklyserver.actions.load_arduino_cli')
    def test_arduino_ide_send_code_invalid(
            self, mock_load_arduino_cli, mock_create_sketch_from_string):
        """Test an error occurring inside arduino_ide_send_code function call.

        Because this function basically bridges two functions also tested here
        we only need to test the error condiction caused if the
        create_sketch_from_string() function fails.

        :param mock_load_arduino_cli: Mock for load_arduino_cli()
        :param mock_create_sketch_from_string: Mock for
                create_sketch_from_string()
        :return: None.
        """
        mock_create_sketch_from_string.return_value = None

        success, ide_mode, std_out, err_out, exit_code = \
            actions.arduino_ide_send_code('dummy sketch content here')

        self.assertTrue(mock_create_sketch_from_string.called)
        self.assertFalse(mock_load_arduino_cli.called)
        self.assertFalse(success)
        self.assertEqual(ide_mode, 'unknown')
        self.assertIsNone(std_out)
        self.assertIsNone(err_out)
        self.assertEqual(exit_code, 51)

    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_create_sketch_from_string_file(self, mock_settings):
        """Test the create_sketch_from_string creates the file correctly.

        :param mock_settings: Mock for ServerCompilerSettings class.
        :return: None.
        """
        sketch_name = 'test_sketch'
        mock_settings.return_value.sketch_dir = self.temp_folder
        mock_settings.return_value.sketch_name = sketch_name
        sketch_path = os.path.join(
                self.temp_folder, sketch_name, sketch_name + '.ino')
        self.assertFalse(os.path.exists(sketch_path))

        returned_path = actions.create_sketch_from_string('')

        self.assertEqual(returned_path, sketch_path)
        self.assertTrue(os.path.exists(returned_path))

    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_create_sketch_from_string_content(self, mock_settings):
        """Test the create_sketch_from_string creates the file correctly.

        :param mock_settings: Mock for ServerCompilerSettings class.
        :return: None.
        """
        sketch_code = 'いろはにほへとちり Γαζέες καὶ μυρτς Âne aéquo au whist'
        mock_settings.return_value.sketch_dir = self.temp_folder
        mock_settings.return_value.sketch_name = 'test_sketch'

        returned_path = actions.create_sketch_from_string(sketch_code)

        with codecs.open(returned_path, 'r', encoding='utf-8') as sketch:
            self.assertEqual(sketch.read(), sketch_code)

    #
    # Tests for getting and setting compiler directory
    #
    @patch('ardublocklyserver.compilersettings.os.path.isfile')
    def test_set_compiler_path_valid(self, mock_isfile):
        """Test set_compiler_path function changes the compiler Setting.

        :param mock_isfile: Mock for os.path.isfile() inside accessor.
        :return: None.
        """
        old_compiler_dir = self.settings.compiler_dir
        new_compiler_dir = os.path.join(self.temp_folder, 'arduino_debug.exe')
        self.assertNotEqual(old_compiler_dir, new_compiler_dir)
        mock_isfile.return_value = True

        returned_path = actions.set_compiler_path(new_compiler_dir)

        self.assertEqual(returned_path, self.settings.compiler_dir)
        self.assertNotEqual(returned_path, old_compiler_dir)
        self.assertNotEqual(self.settings.compiler_dir, old_compiler_dir)
        # Using in as each OSs will dealt with compiler path differently
        self.assertTrue(new_compiler_dir in returned_path)
        self.assertTrue(new_compiler_dir in self.settings.compiler_dir)

    @patch('ardublocklyserver.compilersettings.os.path.isfile')
    def test_set_compiler_path_invalid(self, mock_isfile):
        """Test invalid file path send to set_compiler_path function.

        Tests that the set_compiler_path() function does not edit the settings
        based on a entered directory that is not valid.

        :param mock_isfile: Mock for os.path.isfile().
        :return: None.
        """
        old_compiler_dir = self.settings.compiler_dir
        new_compiler_dir = os.path.join(self.temp_folder, 'arduino_debug.exe')
        self.assertNotEqual(old_compiler_dir, new_compiler_dir)
        mock_isfile.return_value = False

        returned_path = actions.set_compiler_path(new_compiler_dir)

        self.assertEqual(returned_path, old_compiler_dir)
        self.assertEqual(returned_path, self.settings.compiler_dir)
        self.assertNotEqual(returned_path, new_compiler_dir)
        self.assertEqual(self.settings.compiler_dir, old_compiler_dir)
        self.assertNotEqual(self.settings.compiler_dir, new_compiler_dir)

    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_get_compiler_path_valid(self, mock_settings):
        """Test getting a valid compiler path in get_compiler_path.

        :param mock_settings: Mock for ServerCompilerSettings constructor.
        :return: None.
        """
        mock_settings.return_value.compiler_dir = 'Easy to identify str'

        returned_path = actions.get_compiler_path()

        self.assertEqual(returned_path, 'Easy to identify str')

    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_get_compiler_path_invalid(self, mock_settings):
        """Test getting an invalid compiler path in get_compiler_path.

        :param mock_settings: Mock for ServerCompilerSettings constructor.
        :return: None.
        """
        mock_settings.return_value.compiler_dir = ''

        returned_path = actions.get_compiler_path()

        self.assertIsNone(returned_path)

    #
    # Test sketch setting functions
    #
    @patch('ardublocklyserver.compilersettings.os.path.isdir')
    def test_set_sketch_path_valid(self, mock_isdir):
        """Test set_sketch_path function changes the compiler Setting.

        :param mock_isdir: Mock for os.path.isdir().
        :return: None.
        """
        old_sketch_dir = self.settings.sketch_dir
        new_sketch_dir = os.path.join(self.temp_folder, 'folder')
        self.assertNotEqual(old_sketch_dir, new_sketch_dir)
        mock_isdir.return_value = True

        returned_path = actions.set_sketch_path(new_sketch_dir)

        self.assertEqual(returned_path, new_sketch_dir)
        self.assertEqual(returned_path, self.settings.sketch_dir)
        self.assertNotEqual(returned_path, old_sketch_dir)
        self.assertEqual(self.settings.sketch_dir, new_sketch_dir)
        self.assertNotEqual(self.settings.sketch_dir, old_sketch_dir)

    @patch('ardublocklyserver.compilersettings.os.path.isdir')
    def test_set_sketch_path_invalid(self, mock_isdir):
        """Test invalid directory sent in set_sketch_path function.

        Tests that the set_sketch_path function does not edit the settings if
        the sent path is not valid.

        :param mock_isdir: Mock for os.path.isdir().
        :return: None.
        """
        old_sketch_dir = self.settings.sketch_dir
        new_sketch_dir = os.path.join(self.temp_folder, 'folder')
        self.assertNotEqual(old_sketch_dir, new_sketch_dir)
        mock_isdir.return_value = False

        returned_path = actions.set_sketch_path(new_sketch_dir)

        self.assertEqual(returned_path, old_sketch_dir)
        self.assertEqual(returned_path, self.settings.sketch_dir)
        self.assertNotEqual(returned_path, new_sketch_dir)
        self.assertEqual(self.settings.sketch_dir, old_sketch_dir)
        self.assertNotEqual(self.settings.sketch_dir, new_sketch_dir)

    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_get_sketch_path_valid(self, mock_settings):
        """Test getting a valid sketch path in get_sketch_path.

        :param mock_settings: Mock for ServerCompilerSettings constructor.
        :return: None.
        """
        mock_settings.return_value.sketch_dir = 'Random easy to identify str'

        returned_path = actions.get_sketch_path()

        self.assertEqual(returned_path, 'Random easy to identify str')

    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_get_sketch_path_invalid(self, mock_settings):
        """Test getting an invalid sketch path in get_sketch_path.

        :param mock_settings:  Mock for ServerCompilerSettings constructor.
        :return: None.
        """
        mock_settings.return_value.sketch_dir = ''

        returned_path = actions.get_sketch_path()

        self.assertIsNone(returned_path)

    #
    # Test arduino Board setting functions
    #
    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_set_arduino_board(self, mock_settings):
        mock_settings.return_value.arduino_board = None
        self.assertIsNone(ServerCompilerSettings().arduino_board)

        returned_board = actions.set_arduino_board('Uno')

        self.assertEqual(returned_board, 'Uno')

    def test_set_arduino_board_invalid(self):
        old_board = self.settings.arduino_board
        invalid_board = 'this is not a valid value'
        self.assertNotEqual(old_board, invalid_board)

        returned_board = actions.set_arduino_board(invalid_board)

        self.assertEqual(returned_board, old_board)
        self.assertNotEqual(returned_board, invalid_board)
        self.assertEqual(ServerCompilerSettings().arduino_board, old_board)

    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_get_arduino_board_selected(self, mock_settings):
        fake_board = 'not really a board'
        mock_settings.return_value.arduino_board = fake_board

        returned_board = actions.get_arduino_board_selected()

        self.assertEqual(returned_board, fake_board)

    @patch.object(actions.ServerCompilerSettings, 'get_arduino_board_types')
    def test_get_arduino_boards(self, mock_settings):
        mock_settings.return_value = 'random string to test board return'

        received_boards = actions.get_arduino_boards()

        self.assertTrue(mock_settings.called)
        self.assertEqual(received_boards, 'random string to test board return')

    #
    # Test serial Port setting functions
    #
    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_set_serial_port(self, mock_settings):
        mock_settings.return_value.serial_port = None
        self.assertIsNone(ServerCompilerSettings().serial_port)

        returned_port = actions.set_serial_port('MyPort')

        self.assertEqual(returned_port, 'MyPort')

    def test_set_serial_port_invalid(self):
        old_port = self.settings.serial_port
        invalid_port = 'this is not a valid value'
        self.assertNotEqual(old_port, invalid_port)

        returned_port = actions.set_serial_port(invalid_port)

        self.assertEqual(returned_port, old_port)
        self.assertNotEqual(returned_port, invalid_port)
        self.assertEqual(ServerCompilerSettings().serial_port, returned_port)

    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_get_serial_port_selected(self, mock_settings):
        fake_port = 'not really a board'
        mock_settings.return_value.serial_port = fake_port

        returned_port = actions.get_serial_port_selected()

        self.assertEqual(returned_port, fake_port)

    @patch.object(actions.ServerCompilerSettings, 'get_serial_ports')
    def test_get_serial_ports(self, mock_settings):
        mock_settings.return_value = 'random string to test port return'

        received_ports = actions.get_serial_ports()

        self.assertTrue(mock_settings.called)
        self.assertEqual(received_ports, 'random string to test port return')

    #
    # Test load IDE setting functions
    #
    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_set_load_ide_only(self, mock_settings):
        mock_settings.return_value.load_ide_option = None
        self.assertIsNone(ServerCompilerSettings().load_ide_option)

        returned_load_ide = actions.set_load_ide_only('MyNewIdeLoadOption')

        self.assertEqual(returned_load_ide, 'MyNewIdeLoadOption')

    def test_set_load_ide_only_invalid(self):
        old_ide_load = self.settings.load_ide_option
        invalid_ide_load = 'this is not a valid value'
        self.assertNotEqual(old_ide_load, invalid_ide_load)

        returned_load_ide = actions.set_load_ide_only(invalid_ide_load)

        self.assertEqual(returned_load_ide, old_ide_load)
        self.assertNotEqual(returned_load_ide, invalid_ide_load)
        self.assertEqual(
                ServerCompilerSettings().load_ide_option, returned_load_ide)

    @patch.object(actions.ServerCompilerSettings, '__new__')
    def test_get_load_ide_selected(self, mock_settings):
        fake_ide_load = 'not really an IDE load option'
        mock_settings.return_value.load_ide_option = fake_ide_load

        returned_load_ide = actions.get_load_ide_selected()

        self.assertEqual(returned_load_ide, fake_ide_load)

    @patch.object(actions.ServerCompilerSettings, 'get_load_ide_options')
    def test_get_load_ide_options(self, mock_settings):
        mock_settings.return_value = 'random str to test load IDE'

        returned_load_ide = actions.get_load_ide_options()

        self.assertTrue(mock_settings.called)
        self.assertEqual(returned_load_ide, 'random str to test load IDE')


if __name__ == '__main__':
    unittest.main()

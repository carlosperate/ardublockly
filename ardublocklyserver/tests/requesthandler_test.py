# -*- coding: utf-8 -*-
#
# Unit test for the requesthandler module.
#
# Copyright (c) 2015 carlosperate https://github.com/carlosperate/
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
#
from __future__ import unicode_literals, absolute_import
import os
import unittest
import mock

from ardublocklyserver import requesthandler


class BlocklyRequestHandlerTestCase(unittest.TestCase):
    """
    Tests for BlocklyRequestHandler module
    """

    #
    # Command line tests
    #
    @mock.patch('ardublocklyserver.requesthandler.subprocess.Popen')
    @mock.patch('ardublocklyserver.requesthandler.create_sketch_default')
    @mock.patch.object(
        requesthandler.ServerCompilerSettings, 'get_compiler_dir',
        autospec=True)
    def test_command_line_launch(self, mock_settings, mock_sketch, mock_popen):
        """
        Tests that a compiler path and arduino sketch path can be set
        and that a command line can be launched to open the sketch in the
        Arduino IDE.
        """
        #TODO: This test is outdated and needs to be rewritten
        # Set the compiler settings
        test_sketch_path = os.path.join(os.getcwd(), 'sketch.ino')
        mock_sketch.return_value = test_sketch_path

        test_compiler_dir = os.path.join(os.getcwd(), 'arduino.exe')
        mock_settings = requesthandler.ServerCompilerSettings()
        mock_settings.__compiler_dir__ = test_compiler_dir
        requesthandler.ServerCompilerSettings().launch_IDE_only = True

        # Build expected string and run test
        expected_command = test_compiler_dir + ' "' + test_sketch_path + '"'
        requesthandler.load_arduino_cli()
        #mock_popen.system.assert_called_with(expected_command)

    #
    # Tests for checking browsing for paths and files
    #
    @mock.patch('ardublocklyserver.requesthandler.tkFileDialog')
    def test_browse_file(self, mock_file_select):
        test_file = 'test_file'
        mock_file_select.askopenfilename.return_value = test_file
        new_file = requesthandler.browse_file()
        self.assertEqual(new_file, test_file)

    def test_browse_file_cancel(self):
        canceled_file = ''
        print('A file browser window will open, to successfully run this test '
              'press cancel or close the window!!!\n')
        #raw_input('Press "Enter" to continue...')
        function_file = requesthandler.browse_file()
        self.assertEqual(canceled_file, function_file)

    @mock.patch('ardublocklyserver.requesthandler.tkFileDialog')
    def test_browse_path(self, mock_path_select):
        test_path = 'test_path'
        mock_path_select.askopenfilename.return_value = test_path
        new_path = requesthandler.browse_file()
        self.assertEqual(new_path, test_path)

    def test_browse_path_cancel(self):
        canceled_path = ''
        print('A path browser window will open, to successfully run this test '
              'press cancel or close the window!!!\n')
        #raw_input('Press "Enter" to continue...')
        function_path = requesthandler.browse_dir()
        self.assertEqual(canceled_path, function_path)


if __name__ == '__main__':
    unittest.main()

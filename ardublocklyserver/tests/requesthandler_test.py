from __future__ import unicode_literals, absolute_import
import os
import unittest
import mock
try:
    from ArdublocklyServer import BlocklyRequestHandler
except ImportError:
    import sys
    file_dir = os.path.dirname(os.path.realpath(__file__))
    package_dir = os.path.dirname(os.path.dirname(file_dir))
    sys.path.insert(0, package_dir)
    from ArdublocklyServer import BlocklyRequestHandler


class BlocklyRequestHandlerTestCase(unittest.TestCase):
    """
    Tests for BlocklyRequestHandler module
    """

    #
    # Command line tests
    #
    @mock.patch('ArdublocklyServer.BlocklyRequestHandler.os')
    @mock.patch('ArdublocklyServer.BlocklyRequestHandler.create_sketch_default')
    @mock.patch.object(
        BlocklyRequestHandler.ServerCompilerSettings, 'get_compiler_dir',
        autospec=True)
    def test_command_line_launch(self, mock_settings, mock_sketch, mock_os):
        """
        Tests that a compiler path and arduino sketch path can be set
        and that a command line can be launched to open the sketch in the
        Arduino IDE
        """
        # Set the compiler settings
        test_sketch_path = os.path.join(os.getcwd(), 'sketch.ino')
        mock_sketch.return_value = test_sketch_path

        test_compiler_dir = os.path.join(os.getcwd(), 'arduino.exe')
        mock_settings = BlocklyRequestHandler.ServerCompilerSettings()
        mock_settings.__compiler_dir__ = test_compiler_dir
        BlocklyRequestHandler.ServerCompilerSettings().launch_IDE_only = True

        # Build expected string and run test
        expected_command = test_compiler_dir + ' "' + test_sketch_path + '"'
        BlocklyRequestHandler.load_sketch()
        mock_os.system.assert_called_with(expected_command)

    #
    # Tests for checking browsing for paths and files
    #
    @mock.patch('ArdublocklyServer.BlocklyRequestHandler.tkFileDialog')
    def test_browse_file(self, mock_file_select):
        test_file = 'test_file'
        mock_file_select.askopenfilename.return_value = test_file
        new_file = BlocklyRequestHandler.browse_file()
        self.assertEqual(new_file, test_file)

    def test_browse_file_cancel(self):
        canceled_file = ''
        print('A file browser window will open, to successfully run this test '
              'press cancel or close the window!!!\n')
        #raw_input('Press "Enter" to continue...')
        function_file = BlocklyRequestHandler.browse_file()
        self.assertEqual(canceled_file, function_file)

    @mock.patch('ArdublocklyServer.BlocklyRequestHandler.tkFileDialog')
    def test_browse_path(self, mock_path_select):
        test_path = 'test_path'
        mock_path_select.askopenfilename.return_value = test_path
        new_path = BlocklyRequestHandler.browse_file()
        self.assertEqual(new_path, test_path)

    def test_browse_path_cancel(self):
        canceled_path = ''
        print('A path browser window will open, to successfully run this test '
              'press cancel or close the window!!!\n')
        #raw_input('Press "Enter" to continue...')
        function_path = BlocklyRequestHandler.browse_dir()
        self.assertEqual(canceled_path, function_path)


if __name__ == '__main__':
    unittest.main()

# -*- coding: utf-8 -*-
#
# Unit test for the gui module.
#
# Copyright (c) 2015 carlosperate https://github.com/carlosperate/
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
#
from __future__ import unicode_literals, absolute_import, print_function
import os
import unittest
try:
    import mock
    from mock import patch
except ImportError:
    from unittest.mock import MagicMock as mock
    from unittest.mock import patch

try:
    import ardublocklyserver.gui as gui
except ImportError:
    import sys
    file_dir = os.path.dirname(os.path.realpath(__file__))
    package_dir = os.path.dirname(os.path.dirname(file_dir))
    sys.path.insert(0, package_dir)
    import ardublocklyserver.gui as gui


class GuiTestCase(unittest.TestCase):
    """
    Tests for gui module
    """

    #
    # Tests for checking browsing for paths and files
    #
    @patch('ardublocklyserver.gui.tkFileDialog.askopenfilename')
    def test_browse_file(self, mock_file_select):
        test_file = os.path.join(os.getcwd(), 'test_file')
        mock_file_select.return_value = test_file
        new_file = gui.browse_file_dialog()
        self.assertEqual(new_file, test_file)

    def test_browse_file_cancel(self):
        canceled_file = ''
        print('A file browser window will open, to successfully run this test '
              'press cancel or close the window!!!\n')
        #raw_input('Press "Enter" to continue...')
        function_file = gui.browse_file_dialog()
        self.assertEqual(canceled_file, function_file)

    @patch('ardublocklyserver.gui.tkFileDialog.askdirectory')
    def test_browse_path(self, mock_path_select):
        test_path = os.path.join(os.getcwd(), 'test_path')
        mock_path_select.return_value = test_path
        new_path = gui.browse_dir_dialog()
        self.assertEqual(new_path, test_path)

    def test_browse_path_cancel(self):
        canceled_path = ''
        print('A path browser window will open, to successfully run this test '
              'press cancel or close the window!!!\n')
        #raw_input('Press "Enter" to continue...')
        function_path = gui.browse_dir_dialog()
        self.assertEqual(canceled_path, function_path)


if __name__ == '__main__':
    unittest.main()

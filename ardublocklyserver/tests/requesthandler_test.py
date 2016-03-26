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
try:
    import mock
except ImportError:
    from unittest.mock import MagicMock as mock

try:
    from ardublocklyserver import requesthandler
except ImportError:
    import sys
    file_dir = os.path.dirname(os.path.realpath(__file__))
    package_dir = os.path.dirname(os.path.dirname(file_dir))
    sys.path.insert(0, package_dir)
    from ardublocklyserver import requesthandler


class BlocklyRequestHandlerTestCase(unittest.TestCase):
    """
    Tests for BlocklyRequestHandler module
    """

    def test_todo(self):
        pass


if __name__ == '__main__':
    unittest.main()

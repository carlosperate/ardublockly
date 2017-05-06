#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Runs all the unit tests from this directory.

This file manually adds the tests to be run.

Copyright (c) 2017 carlosperate https://github.com/carlosperate/
Licensed under the Apache License, Version 2.0 (the "License"):
    http://www.apache.org/licenses/LICENSE-2.0
"""
import os
import sys
import unittest

# Adding the ardublockly server package to the sys path
file_dir = os.path.dirname(os.path.realpath(__file__))
package_dir = os.path.dirname(os.path.dirname(file_dir))
sys.path.insert(0, package_dir)
# Adding local-packages to the sys path
from ardublocklyserver import local_packages_path
sys.path.insert(0, local_packages_path)

# Import test cases to run
from sketchcreator_test import SketchCreatorTestCase
from compilersettings_test import ServerCompilerSettingsTestCase
from actions_test import ActionsTestCase
from server_test import ServerTestCase


def run_tests():
    unittest.main()


if __name__ == '__main__':
    run_tests()

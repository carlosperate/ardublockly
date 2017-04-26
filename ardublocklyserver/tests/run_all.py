# -*- coding: utf-8 -*-
#
# Runs all the unit tests from this directory.
#
# This file manually adds the tests to be run.
#
# Copyright (c) 2017 carlosperate https://github.com/carlosperate/
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
#
import unittest

from sketchcreator_test import SketchCreatorTestCase
from compilersettings_test import ServerCompilerSettingsTestCase
from actions_test import ActionsTestCase


if __name__ == '__main__':
    unittest.main()

# -*- coding: utf-8 -*-
"""ardublocklyserver package.

Copyright (c) 2017 carlosperate https://github.com/carlosperate/
Licensed under the Apache License, Version 2.0 (the "License"):
    http://www.apache.org/licenses/LICENSE-2.0

There is a specific requirements for this Python project to not need external
module dependencies, so all third-party modules have been carefully chosen with
this purpose in mind and included in a folder named 'local-packages'.
The sys.path has to be expanded to be able to import these.
"""
import os
import sys

# Adding the local-packages to the sys path
local_packages_path = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                   'local-packages')
sys.path.insert(0, local_packages_path)

# Follows Semantic Versioning 2.0.0 http://semver.org/spec/v2.0.0.html
__version__ = '0.1.3-a'

__author__ = 'carlosperate'
__copyright__ = 'Copyright 2017, carlosperate https://github.com/carlosperate/'
__license__ = 'Apache License, Version 2.0'

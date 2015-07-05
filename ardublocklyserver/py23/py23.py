"""
This module contains some utilities to maintain compatibility between python 2.5+ and 3
"""
from __future__ import unicode_literals, absolute_import
import sys
import types

# Define different types for comparison
if sys.version_info[0] == 3:
    string_type_compare = str
    integer_type_compare = int
    class_type_compare = type
else:
    string_type_compare = basestring
    integer_type_compare = (int, long)
    class_type_compare = (type, types.ClassType)

# Ensure unicode string from byte array
if sys.version_info[0] == 3:
    def b_unicode(x):
        return x.decode('utf-8')
else:
    def b_unicode(x):
        return str(x).encode('utf-8')

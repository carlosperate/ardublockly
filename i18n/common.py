#!/usr/bin/python

# Code shared by translation conversion scripts.
#
# Copyright 2013 Google Inc.
# http://blockly.googlecode.com/
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


class InputError(Exception):
    """Exception raised for errors in the input.

    Attributes:
        location -- where error occurred
        msg -- explanation of the error

    """

    def __init__(self, location, msg):
        Exception.__init__(self, '{0}: {1}'.format(location, msg))
        self.location = location
        self.msg = msg


def parse_trans_unit(trans_unit):
    """Converts a trans-unit XML node into a more convenient format.

    The returned dictionary is guaranteed to have an entry for 'key' and
    may have entries for 'source', 'target', 'description', and 'meaning'
    if present in the argument.

    Args:
        trans_unit: An XML representation of a .xlf translation unit.

    Returns:
        A dictionary with useful information about the translation unit.

    Raises:
        InputError: A required field was not present.
    """

    def get_value(tag_name):
        elts = trans_unit.getElementsByTagName(tag_name)
        if not elts:
            return None
        elif len(elts) == 1:
            return ''.join([child.toxml() for child in elts[0].childNodes])
        else:
            raise InputError('', 'Unable to extract ' + tag_name)

    result = {}
    key = trans_unit.getAttribute('id')
    if not key:
        raise InputError('', 'id attribute not found')
    result['key'] = key

    # Get source and target, if present.
    try:
        result['source'] = get_value('source')
        result['target'] = get_value('target')
    except InputError, e:
        raise InputError(key, e.msg)

    # Get notes, using the from value as key and the data as value.
    notes = trans_unit.getElementsByTagName('note')
    for note in notes:
        from_value = note.getAttribute('from')
        if from_value and len(note.childNodes) == 1:
            result[from_value] = note.childNodes[0].data
        else:
            raise InputError(key, 'Unable to extract ' + from_value)

    return result

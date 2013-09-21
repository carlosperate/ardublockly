#!/usr/bin/python

# Generate .js files defining Blockly core and language messages.
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

import argparse
import codecs
import os
from common import InputError
from common import read_json_file


def main():
  """Generate .js files defining Blockly core and language messages."""

  # Process command-line arguments.
  parser = argparse.ArgumentParser(description='Convert JSON files to JS.')
  parser.add_argument('--source_lang', default='en',
                      help='ISO 639-1 source language code')
  parser.add_argument('--source_lang_file',
                      default=os.path.join('json', 'en.json'),
                      help='Path to .json file for source language')
  parser.add_argument('--source_synonym_file',
                      default=os.path.join('json', 'synonyms.json'),
                      help='Path to .json file with synonym definitions')
  parser.add_argument('--output_dir', default='js/',
                      help='relative directory for output files')
  parser.add_argument('--key_file', default='keys.json',
                      help='relative path to input keys file')
  parser.add_argument('--min_length', default=30,
                      help='minimum line length (not counting last line)')
  parser.add_argument('--max_length', default=50,
                      help='maximum line length (not guaranteed)')
  parser.add_argument('files', nargs='+', help='input files')
  args = parser.parse_args()
  if not args.output_dir.endswith(os.path.sep):
    args.output_dir += os.path.sep

  # Read in source language .json file, which provides any values missing
  # in target languages' .json files.
  source_defs = read_json_file(os.path.join(os.curdir, args.source_lang_file))

  # Read in synonyms file, which must be output in every language.
  synonym_defs = read_json_file(os.path.join(
      os.curdir, args.source_synonym_file))
  synonym_text = '\n'.join(['Blockly.Msg.{0} = Blockly.Msg.{1};'.format(
      key, synonym_defs[key]) for key in synonym_defs])

  for arg_file in args.files:
    (_, filename) = os.path.split(arg_file)
    target_lang = filename[:filename.index('.')]
    if target_lang not in ('qqq', 'keys'):
      target_defs = read_json_file(os.path.join(os.curdir, arg_file))

      # Combine definitions.  Start with source languages' definitions,
      # then provide the new values for any keys present in the target language.
      defs = source_defs.copy()
      for key in target_defs:
        if key not in defs:
          raise InputError('Unexpected key "{0}" in {1}.'.format(key, arg_file))
        defs[key] = target_defs

      # Output file.
      outname = os.path.join(os.curdir, args.output_dir, target_lang + '.js')
      with codecs.open(outname, 'w', 'utf-8') as outfile:
        outfile.write(
            """// This file was automatically generated.  Do not modify.
// Translated definitions: {0}
// Untranslated definitions: {1}

'use strict';

goog.provide('Blockly.Msg.{2}');

goog.require('Blockly.Msg');

""".format(len(target_defs), len(source_defs) - len(target_defs), target_lang))
        for key in target_defs:
          if key != '@metadata':
            value = target_defs[key].replace('"', '\\"')
            outfile.write(u'Blockly.Msg.{0} = "{1}";\n'.format(key, value))
        outfile.write(synonym_text)
      print('Created {0}.'.format(outname))


if __name__ == '__main__':
  main()

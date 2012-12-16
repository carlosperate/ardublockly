"""Blockly Demo: Web Worker Reflector

Copyright 2012 Google Inc.
http://blockly.googlecode.com/

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""

"""Store JavaScript code temporarily and reserve it as web workers.
"""

__author__ = "fraser@google.com (Neil Fraser)"

import cgi
from random import randint
from google.appengine.api import memcache

forms = cgi.FieldStorage()
if "js" in forms:
  # Store JavaScript and return a generated key.
  js = forms["js"].value
  key = "JS_%d" % randint(0, 1000000000)
  print "Content-Type: text/plain\n"
  if not memcache.add(key, js, 60):
    logging.error("Memcache set failed.")
  else:
    print key

if "key" in forms:
  # Retrieve stored JavaScript based on the provided key.
  key = forms["key"].value
  js = memcache.get(key)
  print "Content-Type: application/javascript\n"
  if js is None:
    logging.error("Memcache get failed.")
    print "// No script found."
  else:
    print """
// This script may only be executed in the context of a web worker.
// Instantly redirect hackers to somewhere harmless.
self.location = 'http://blockly.googlecode.com/';
// Nest user code in message handler.
self.onmessage = function(event) {
%s
};
""" % js.encode("utf-8")

"""Blockly Demo: Storage

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

"""Store and retrieve XML with App Engine.
"""

__author__ = "q.neutron@gmail.com (Quynh Neutron)"

import cgi
import re
from random import randint
from google.appengine.ext import db
from google.appengine.api import memcache
import logging

print "Content-Type: text/plain\n"

def keyGen():
  # Generate a random string of len KEY_LEN.
  KEY_LEN = 6
  CHARS = "abcdefghijkmnopqrstuvwxyz23456789" # Exclude l, 0, 1.
  max_index = len(CHARS) - 1
  return "".join([CHARS[randint(0, max_index)] for x in range(KEY_LEN)])

class Xml(db.Model):
  # A row in the database.
  xml_key = db.StringProperty()
  xml_hash = db.IntegerProperty()
  xml_content = db.TextProperty()

forms = cgi.FieldStorage()
if "xml" in forms:
  # Store XML and return a generated key.
  xml_content = forms["xml"].value
  xml_hash = hash(xml_content)
  lookup_query = db.GqlQuery("SELECT * FROM Xml WHERE xml_hash = %d" % xml_hash)
  lookup_result = lookup_query.get()
  if lookup_result: xml_key = lookup_result.xml_key
  else:
    trials = 0
    result = True
    while result:
      trials += 1
      if trials == 100:
        raise Exception("Sorry, the generator failed to get a key for you.")
      xml_key = keyGen()
      query = db.GqlQuery("SELECT * FROM Xml WHERE xml_key = '%s'" % xml_key)
      result = query.get()
    xml = db.Text(xml_content, encoding="utf_8")
    row = Xml(xml_key = xml_key, xml_hash = xml_hash, xml_content = xml)
    row.put()
  print xml_key

if "key" in forms:
  # Retrieve stored XML based on the provided key.
  key_provided = forms["key"].value
  xml = memcache.get(key_provided)
  if not xml:
    if not re.match('^\w+$', key_provided):
      xml = ""
    else:
      query = db.GqlQuery("SELECT * FROM Xml WHERE xml_key = '%s'" %
                                 key_provided)
      result = query.get()
      if not result:
        xml = ""
      else:
        xml = result.xml_content
        if not memcache.add(key_provided, xml, 3600):
          logging.error("Memcache set failed.")
  print xml.encode("utf-8")
  stats = memcache.get_stats()
  logging.info("Memcache Statistics: " + str(stats))
  
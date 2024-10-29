# -*- coding: utf-8 -*-
"""Unit test for the Sketch Creator module module.

Copyright (c) 2017 carlosperate https://github.com/carlosperate/
Licensed under the Apache License, Version 2.0 (the "License"):
    http://www.apache.org/licenses/LICENSE-2.0
"""
from __future__ import unicode_literals, absolute_import, print_function
import os
import gc
import sys
import shutil
import unittest
import requests
from time import sleep
# local-packages imports Python 2 and 3 compatibility imports
from six.moves import _thread as thread
from six import iteritems
# This package modules
try:
    from ardublocklyserver import server
except ImportError:
    file_dir = os.path.dirname(os.path.realpath(__file__))
    package_dir = os.path.dirname(os.path.dirname(file_dir))
    sys.path.insert(0, package_dir)
    from ardublocklyserver import server
from ardublocklyserver.compilersettings import ServerCompilerSettings


settings = None
document_root = None
IP = 'localhost'
PORT = 8000


def server_thread():
    global settings
    settings = ServerCompilerSettings(document_root)
    server.launch_server(ip=IP, port=PORT, document_root_=document_root)


def reset_settings():
    global settings
    settings.delete_settings_file()
    settings.set_default_settings()


class ServerTestCase(unittest.TestCase):
    """Test the server RESTish API."""

    temp_folder = None
    SERVER_URL = 'http://%s:%s' % (IP, PORT)

    #
    # Test fixtures
    #
    @classmethod
    def setUpClass(cls):
        """Create a temporary folder to play round and launches the server."""
        cls.temp_folder = os.path.join(
                os.path.abspath(os.path.dirname(__file__)), 'TestTemp_server')
        if os.path.isdir(cls.temp_folder):
            raise Exception('Directory %s already exists.' % cls.temp_folder)
        os.makedirs(cls.temp_folder)
        # Launch the server with the settings stored in temp folder
        global document_root, settings
        document_root = cls.temp_folder
        cls.thread_id = thread.start_new_thread(server_thread, ())
        while settings is None:
            sleep(0.01)
        # Check the settings is a new instance by looking at file path
        if cls.temp_folder not in settings.get_settings_file_path()\
                or not os.path.isfile(settings.get_settings_file_path()):
            raise Exception('Settings file not created in temp folder:\n'
                            '\t%s' % settings.get_settings_file_path())

    @classmethod
    def tearDownClass(cls):
        """Delete the previously created temporary folder."""
        global settings
        settings._drop()
        del settings
        settings = None
        gc.collect()
        if os.path.isdir(cls.temp_folder):
            shutil.rmtree(cls.temp_folder)

    def setUp(self):
        """Ensure the temp folder exists and settings are reset."""
        if not os.path.isdir(self.__class__.temp_folder):
            os.makedirs(self.__class__.temp_folder)
        reset_settings()
        # The configurations in the Travis and Circle CI servers refuses HTTP
        # localhost connections if done too quickly.
        if os.environ.get('CIRCLECI') or os.environ.get('TRAVIS'):
            print("Travis or CircleCI detected, waiting 1 second...")
            sleep(1)

    def tearDown(self):
        """Delete the previously created temporary folder."""
        if os.path.isdir(self.__class__.temp_folder):
            shutil.rmtree(self.__class__.temp_folder)

    #
    # Helper functions
    #
    def helper_test_static_file(self, folder, file):
        """Test static files access (Helper method)."""
        folder_dir = os.path.join(self.temp_folder, folder)
        os.makedirs(folder_dir)
        open(os.path.join(folder_dir, file), 'w').close()

        response = requests.get('%s/%s/%s' % (self.SERVER_URL, folder, file))

        self.assertTrue(response.ok)
        self.assertEqual(response.status_code, 200)

    def helper_test_valid_json_response(self, response):
        """Check if the response is valid and json (Helper method)."""
        self.assertTrue(response.ok)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers['Cache-Control'], 'no-cache')
        self.assertEqual(response.headers['content-type'], 'application/json')

    def helper_test_not_allowed(self, method, path):
        """Check the given request method & path are not allowed (Helper)."""
        response = requests.request(method, self.SERVER_URL + path)

        self.assertFalse(response.ok)
        self.assertEqual(response.status_code, 405)

    #
    # Test for static files
    #
    def test_static_ardublockly(self):
        """Test the files in /ardublockly can be accessed."""
        self.helper_test_static_file('ardublockly', 'index.html')

    def test_static_blockly(self):
        """Test the files in /blockly can be accessed."""
        self.helper_test_static_file('blockly', 'index.js')

    def test_static_blocks(self):
        """Test the files in /blocks can be accessed."""
        self.helper_test_static_file('blocks', 'index.json')

    def test_static_examples(self):
        """Test the files in /examples can be accessed."""
        self.helper_test_static_file('examples', 'example.xml')

    def test_static_closure(self):
        """Test the files in /closure-library can be accessed."""
        self.helper_test_static_file('closure-library', 'index.js')

    def test_static_docs(self):
        """Test the files in /docs can be accessed."""
        self.helper_test_static_file('docs', 'index.html')

    #
    # Test for entry point redirect
    #
    def test_index_redirect(self):
        """Test the root of the server redirects to ardublockly/index.html."""
        # Create ardublockly/index.html
        ardublockly_folder = os.path.join(self.temp_folder, 'ardublockly')
        os.makedirs(ardublockly_folder)
        open(os.path.join(ardublockly_folder, 'index.html'), 'w').close()

        response = requests.get(self.SERVER_URL)

        self.assertTrue(response.ok)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.url,
                         '%s/ardublockly/index.html' % self.SERVER_URL)
        self.assertTrue(response.history[0].is_redirect)
        self.assertEqual(response.history[0].status_code, 303)
        self.assertEqual(response.history[0].url.rstrip('/'), self.SERVER_URL)
        self.assertEqual(response.headers['content-type'],
                         'text/html; charset=UTF-8')

    def test_ardublockly_redirect(self):
        """Test the /ardublockly path redirects to ardublockly/index.html."""
        # Create ardublockly/index.html
        ardublockly_folder = os.path.join(self.temp_folder, 'ardublockly')
        os.makedirs(ardublockly_folder)
        open(os.path.join(ardublockly_folder, 'index.html'), 'w').close()

        response = requests.get(self.SERVER_URL + '/ardublockly')

        self.assertTrue(response.ok)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.url,
                         '%s/ardublockly/index.html' % self.SERVER_URL)
        self.assertTrue(response.history[0].is_redirect)
        self.assertEqual(response.history[0].status_code, 303)
        self.assertEqual(response.history[0].url.rstrip('/'),
                         self.SERVER_URL + '/ardublockly')
        self.assertEqual(response.headers['content-type'],
                         'text/html; charset=UTF-8')

    def test_static_docs_redirect(self):
        """Test docs access to folders redirects to its index.html page."""
        docs_dir = os.path.join(self.temp_folder, 'docs')
        inner_docs_dir = os.path.join(docs_dir, 'folder')
        os.makedirs(docs_dir)
        os.makedirs(inner_docs_dir)
        open(os.path.join(inner_docs_dir, 'index.html'), 'w').close()

        response = requests.get('%s/docs/folder/' % self.SERVER_URL)

        self.assertTrue(response.ok)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.url,
                         '%s/docs/folder/index.html' % self.SERVER_URL)
        self.assertTrue(response.history[0].is_redirect)
        self.assertEqual(response.history[0].status_code, 303)
        self.assertEqual(response.history[0].url.rstrip('/'),
                         self.SERVER_URL + '/docs/folder')
        self.assertEqual(response.headers['content-type'],
                         'text/html; charset=UTF-8')

    #
    # Tests for unauthorised access methods
    #
    def test_unauthorised_settings_post(self):
        self.helper_test_not_allowed('POST', '/settings')
        self.helper_test_not_allowed('POST', '/settings/')
        self.helper_test_not_allowed('POST', '/settings/compiler')
        self.helper_test_not_allowed('POST', '/settings/compiler/')
        self.helper_test_not_allowed('POST', '/settings/sketch')
        self.helper_test_not_allowed('POST', '/settings/sketch/')
        self.helper_test_not_allowed('POST', '/settings/board')
        self.helper_test_not_allowed('POST', '/settings/board/')
        self.helper_test_not_allowed('POST', '/settings/serial')
        self.helper_test_not_allowed('POST', '/settings/serial/')
        self.helper_test_not_allowed('POST', '/settings/ide')
        self.helper_test_not_allowed('POST', '/settings/ide/')
        self.helper_test_not_allowed('POST', '/settings/invalid')
        self.helper_test_not_allowed('POST', '/settings/invalid/')

    def test_unauthorised_settings_patch(self):
        self.helper_test_not_allowed('PATCH', '/settings')
        self.helper_test_not_allowed('PATCH', '/settings/')
        self.helper_test_not_allowed('PATCH', '/settings/compiler')
        self.helper_test_not_allowed('PATCH', '/settings/compiler/')
        self.helper_test_not_allowed('PATCH', '/settings/sketch')
        self.helper_test_not_allowed('PATCH', '/settings/sketch/')
        self.helper_test_not_allowed('PATCH', '/settings/board')
        self.helper_test_not_allowed('PATCH', '/settings/board/')
        self.helper_test_not_allowed('PATCH', '/settings/serial')
        self.helper_test_not_allowed('PATCH', '/settings/serial/')
        self.helper_test_not_allowed('PATCH', '/settings/ide')
        self.helper_test_not_allowed('PATCH', '/settings/ide/')
        self.helper_test_not_allowed('PATCH', '/settings/invalid')
        self.helper_test_not_allowed('PATCH', '/settings/invalid/')

    def test_unauthorised_settings_delete(self):
        self.helper_test_not_allowed('DELETE', '/settings')
        self.helper_test_not_allowed('DELETE', '/settings/')
        self.helper_test_not_allowed('DELETE', '/settings/compiler')
        self.helper_test_not_allowed('DELETE', '/settings/compiler/')
        self.helper_test_not_allowed('DELETE', '/settings/sketch')
        self.helper_test_not_allowed('DELETE', '/settings/sketch/')
        self.helper_test_not_allowed('DELETE', '/settings/board')
        self.helper_test_not_allowed('DELETE', '/settings/board/')
        self.helper_test_not_allowed('DELETE', '/settings/serial')
        self.helper_test_not_allowed('DELETE', '/settings/serial/')
        self.helper_test_not_allowed('DELETE', '/settings/ide')
        self.helper_test_not_allowed('DELETE', '/settings/ide/')
        self.helper_test_not_allowed('DELETE', '/settings/invalid')
        self.helper_test_not_allowed('DELETE', '/settings/invalid/')

    def test_unauthorised_code_methods(self):
        self.helper_test_not_allowed('GET', '/code')
        self.helper_test_not_allowed('PUT', '/code')
        self.helper_test_not_allowed('PATCH', '/code')
        self.helper_test_not_allowed('DELETE', '/code')

    def test_settings_put_all(self):
        """Cannot update all settings at once."""
        url = self.SERVER_URL + '/settings'

        response = requests.put(url, {})
        response_json = response.json()

        self.assertTrue(response.ok)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers['content-type'], 'application/json')
        self.assertFalse(response_json['success'])
        self.assertEqual(response_json['response_type'], 'settings')
        self.assertEqual(response_json['response_state'], 'full_response')
        self.assertEqual(response_json['settings_type'], 'all')
        self.assertFalse('selected' in response_json)
        self.assertFalse('options' in response_json)
        self.assertEqual(response_json['errors'][0]['id'], 62)
        self.assertEqual(response_json['errors'][0]['description'],
                         'Settings have to be individually updated.')

    #
    # Tests for getting settings with default values
    #
    def test_get_settings_all(self):
        """Test GET for '/settings' (retrieve all settings).

        Does not test the values returned for the individual settings.
        """
        url = self.SERVER_URL + '/settings'

        response = requests.get(url)
        response_json = response.json()

        self.helper_test_valid_json_response(response)
        self.assertTrue(response_json['success'])
        self.assertFalse('errors' in response_json)
        self.assertEqual(response_json['response_type'], 'settings')
        self.assertEqual(response_json['response_state'], 'full_response')
        self.assertEqual(response_json['settings_type'], 'all')

    def test_get_settings_compiler_default(self):
        """Test GET for '/settings/compiler' (Arduino IDE location).

        Does not test the values returned for the individual settings.
        """
        url = self.SERVER_URL + '/settings/compiler'

        response = requests.get(url)
        response_json = response.json()

        self.helper_test_valid_json_response(response)
        self.assertTrue(response_json['success'])
        self.assertFalse('errors' in response_json)
        self.assertEqual(response_json['response_type'], 'settings')
        self.assertEqual(response_json['response_state'], 'full_response')
        self.assertEqual(response_json['settings_type'], 'compiler')
        self.assertIsNone(response_json['selected'])
        self.assertFalse('options' in response_json)

    def test_get_settings_sketch_default(self):
        """Test GET for '/settings/sketch' (Arduino Sketch path).

        Does not test the values returned for the individual settings.
        """
        url = self.SERVER_URL + '/settings/sketch'

        response = requests.get(url)
        response_json = response.json()

        self.helper_test_valid_json_response(response)
        self.assertTrue(response_json['success'])
        self.assertFalse('errors' in response_json)
        self.assertEqual(response_json['response_type'], 'settings')
        self.assertEqual(response_json['response_state'], 'full_response')
        self.assertEqual(response_json['settings_type'], 'sketch')
        global settings
        print(settings._ServerCompilerSettings__settings_path)
        self.assertTrue(self.temp_folder in response_json['selected'])
        self.assertFalse('options' in response_json)

    def test_get_settings_board_default(self):
        """Test GET for '/settings/board' (target Arduino board).

        Does not test the values returned for the individual settings.
        """
        url = self.SERVER_URL + '/settings/board'

        response = requests.get(url)
        response_json = response.json()

        self.helper_test_valid_json_response(response)
        self.assertTrue(response_json['success'])
        self.assertFalse('errors' in response_json)
        self.assertEqual(response_json['response_type'], 'settings')
        self.assertEqual(response_json['response_state'], 'full_response')
        self.assertEqual(response_json['settings_type'], 'board')
        self.assertIsNotNone(response_json['selected'])
        self.assertIsNotNone(response_json['options'])
        for board_dict in response_json['options']:
            self.assertEqual(board_dict['value'], board_dict['display_text'])
        for k in settings._ServerCompilerSettings__arduino_types:
            self.assertTrue(
                {'value': k, 'display_text': k} in response_json['options'])

    def test_get_settings_serial_default(self):
        """Test GET for '/settings/serial' (Serial Ports available in server).

        Does not test the values returned for the individual settings.
        """
        url = self.SERVER_URL + '/settings/serial'

        response = requests.get(url)
        response_json = response.json()

        self.helper_test_valid_json_response(response)
        self.assertTrue(response_json['success'])
        self.assertFalse('errors' in response_json)
        self.assertEqual(response_json['response_type'], 'settings')
        self.assertEqual(response_json['response_state'], 'full_response')
        self.assertEqual(response_json['settings_type'], 'serial')
        self.assertTrue('selected' in response_json)
        self.assertTrue('options' in response_json)

    def test_get_settings_ide_default(self):
        """Test GET for '/settings/ide' (Arduino IDE load options).

        Does not test the values returned for the individual settings.
        """
        url = self.SERVER_URL + '/settings/ide'

        response = requests.get(url)
        response_json = response.json()

        self.helper_test_valid_json_response(response)
        self.assertTrue(response_json['success'])
        self.assertFalse('errors' in response_json)
        self.assertEqual(response_json['response_type'], 'settings')
        self.assertEqual(response_json['response_state'], 'full_response')
        self.assertEqual(response_json['settings_type'], 'ide')
        self.assertIsNotNone(response_json['selected'])
        self.assertIsNotNone(response_json['options'])
        for k, v in \
                iteritems(settings._ServerCompilerSettings__ide_load_options):
            self.assertTrue(
                {'value': k, 'display_text': v} in response_json['options'])

    def test_get_settings_invalid(self):
        """Test GET for invalid '/settings/<name>'."""
        url = self.SERVER_URL + '/settings/invalid__'

        response = requests.get(url)
        response_json = response.json()

        self.helper_test_valid_json_response(response)
        self.assertFalse(response_json['success'])
        self.assertEqual(response_json['response_type'], 'settings')
        self.assertEqual(response_json['response_state'], 'full_response')
        self.assertEqual(response_json['settings_type'], 'invalid')
        self.assertFalse('selected' in response_json)
        self.assertFalse('options' in response_json)
        self.assertEqual(response_json['errors'][0]['id'], 61)
        self.assertEqual(response_json['errors'][0]['description'],
                         'Unexpected setting type requested.')

    #
    # Tests for Putting valid data in the settings and retrieving it
    # TODO: Test valid serial value, needs mocking serial module
    #
    def helper_test_put_settings_ide(self, new_value):
        """Set a new IDE load option and verify (get) it back (Helper method).

        :param new_value: New value for the IDE load option.
        :return: None.
        """
        url = self.SERVER_URL + '/settings/ide'

        # First set the new value with a PUT request
        put_response = requests.put(url, json={'new_value': new_value})
        put_response_json = put_response.json()

        self.helper_test_valid_json_response(put_response)
        self.assertTrue(put_response_json['success'])
        self.assertFalse('errors' in put_response_json)
        self.assertEqual(put_response_json['response_type'], 'settings')
        self.assertEqual(put_response_json['response_state'], 'full_response')
        self.assertEqual(put_response_json['settings_type'], 'ide')
        self.assertEqual(put_response_json['selected'], new_value)
        self.assertIsNotNone(put_response_json['options'])
        for k, v in \
                iteritems(settings._ServerCompilerSettings__ide_load_options):
            self.assertTrue({'value': k, 'display_text': v}
                            in put_response_json['options'])

        # Now get it back with a GET request and verify it
        get_response = requests.get(url, json={'new_value': new_value})
        get_response_json = get_response.json()

        self.helper_test_valid_json_response(get_response)
        self.assertTrue(get_response_json['success'])
        self.assertFalse('errors' in get_response_json)
        self.assertEqual(get_response_json['response_type'], 'settings')
        self.assertEqual(get_response_json['response_state'], 'full_response')
        self.assertEqual(get_response_json['settings_type'], 'ide')
        self.assertEqual(get_response_json['selected'], new_value)
        self.assertIsNotNone(get_response_json['options'])
        for k, v in \
                iteritems(settings._ServerCompilerSettings__ide_load_options):
            self.assertTrue({'value': k, 'display_text': v}
                            in get_response_json['options'])

    def test_put_settings_ide_all_options(self):
        self.helper_test_put_settings_ide('open')
        self.helper_test_put_settings_ide('verify')
        self.helper_test_put_settings_ide('upload')

    def helper_test_put_settings_board(self, new_value):
        """Set a new board value and verify (get) it back (Helper method).

        :param new_value: New value for the Arduino Board option.
        :return: None.
        """
        url = self.SERVER_URL + '/settings/board'

        # First set the new value with a PUT request
        put_response = requests.put(url, json={'new_value': new_value})
        put_response_json = put_response.json()

        self.helper_test_valid_json_response(put_response)
        self.assertTrue(put_response_json['success'])
        self.assertFalse('errors' in put_response_json)
        self.assertEqual(put_response_json['response_type'], 'settings')
        self.assertEqual(put_response_json['response_state'], 'full_response')
        self.assertEqual(put_response_json['settings_type'], 'board')
        self.assertEqual(put_response_json['selected'], new_value)
        self.assertIsNotNone(put_response_json['options'])
        for k in settings._ServerCompilerSettings__arduino_types:
            self.assertTrue({'value': k, 'display_text': k}
                            in put_response_json['options'])

        # Now get it back with a GET request and verify it
        get_response = requests.get(url, json={'new_value': new_value})
        get_response_json = get_response.json()

        self.helper_test_valid_json_response(get_response)
        self.assertTrue(get_response_json['success'])
        self.assertFalse('errors' in get_response_json)
        self.assertEqual(get_response_json['response_type'], 'settings')
        self.assertEqual(get_response_json['response_state'], 'full_response')
        self.assertEqual(get_response_json['settings_type'], 'board')
        self.assertEqual(get_response_json['selected'], new_value)
        self.assertIsNotNone(get_response_json['options'])
        for k in settings._ServerCompilerSettings__arduino_types:
            self.assertTrue({'value': k, 'display_text': k}
                            in put_response_json['options'])

    def test_put_settings_board_all_options(self):
        self.helper_test_put_settings_board('Uno')
        self.helper_test_put_settings_board('Nano 328')
        self.helper_test_put_settings_board('Nano 168')
        self.helper_test_put_settings_board('Leonardo')
        self.helper_test_put_settings_board('Yun')
        self.helper_test_put_settings_board('Mega')
        self.helper_test_put_settings_board('Duemilanove 328p')
        self.helper_test_put_settings_board('Duemilanove 168p')
        self.helper_test_put_settings_board('Atmel atmega328p Xplained mini')
        self.helper_test_put_settings_board('Atmel atmega168pb Xplained mini')
        self.helper_test_put_settings_board('Atmel atmega328pb Xplained mini')
        self.helper_test_put_settings_board('ESP8266 Huzzah')
        self.helper_test_put_settings_board('ESP8266 WeMos D1')

    def test_put_settings_sketch(self):
        """Set the location for the Arduino Sketch and read it back."""
        url = self.SERVER_URL + '/settings/sketch'
        new_sketch_path = os.path.abspath(
            os.path.join(self.temp_folder, 'new_sketch_folder'))
        os.makedirs(new_sketch_path)

        # First set the new value with a PUT request
        first_response = requests.put(url, json={'new_value': new_sketch_path})
        firs_response_json = first_response.json()

        self.helper_test_valid_json_response(first_response)
        self.assertTrue(firs_response_json['success'])
        self.assertEqual(firs_response_json['response_type'], 'settings')
        self.assertEqual(firs_response_json['response_state'], 'full_response')
        self.assertEqual(firs_response_json['settings_type'], 'sketch')
        self.assertEqual(firs_response_json['selected'], new_sketch_path)
        self.assertFalse('options' in firs_response_json)
        self.assertFalse('errors' in firs_response_json)

        # Now get it back with a GET request and verify it
        get_response = requests.get(url, json={'new_value': new_sketch_path})
        get_response_json = get_response.json()

        self.helper_test_valid_json_response(get_response)
        self.assertTrue(get_response_json['success'])
        self.assertFalse('errors' in get_response_json)
        self.assertEqual(get_response_json['response_type'], 'settings')
        self.assertEqual(get_response_json['response_state'], 'full_response')
        self.assertEqual(get_response_json['settings_type'], 'sketch')
        self.assertEqual(get_response_json['selected'], new_sketch_path)
        self.assertFalse('options' in firs_response_json)
        self.assertFalse('errors' in firs_response_json)

    def test_put_settings_compiler(self):
        """Set the Arduino IDE path and read it back."""
        url = self.SERVER_URL + '/settings/compiler'
        compiler_folder = self.temp_folder
        if sys.platform == 'darwin':
            # macOS needs executable file 'Arduino' to be in Contents/MacOS/
            compiler_folder = os.path.join(compiler_folder, 'Contents')
            os.makedirs(compiler_folder)
            compiler_folder = os.path.join(compiler_folder, 'MacOS')
            os.makedirs(compiler_folder)
        c_path = os.path.abspath(os.path.join(compiler_folder, 'Arduino'))
        open(c_path, 'w').close()

        # First set the new value with a PUT request
        first_response = requests.put(url, json={'new_value': c_path})
        firs_response_json = first_response.json()

        self.helper_test_valid_json_response(first_response)
        self.assertTrue(firs_response_json['success'])
        self.assertEqual(firs_response_json['response_type'], 'settings')
        self.assertEqual(firs_response_json['response_state'], 'full_response')
        self.assertEqual(firs_response_json['settings_type'], 'compiler')
        self.assertEqual(firs_response_json['selected'], c_path)
        self.assertFalse('options' in firs_response_json)
        self.assertFalse('errors' in firs_response_json)

        # Now get it back with a GET request and verify it
        get_response = requests.get(url, json={'new_value': c_path})
        get_response_json = get_response.json()

        self.helper_test_valid_json_response(get_response)
        self.assertTrue(get_response_json['success'])
        self.assertFalse('errors' in get_response_json)
        self.assertEqual(get_response_json['response_type'], 'settings')
        self.assertEqual(get_response_json['response_state'], 'full_response')
        self.assertEqual(get_response_json['settings_type'], 'compiler')
        self.assertEqual(get_response_json['selected'], c_path)
        self.assertFalse('options' in firs_response_json)
        self.assertFalse('errors' in firs_response_json)

    #
    # Tests for putting invalid settings
    # TODO: Test invalid compiler value
    # TODO: Test invalid sketch value
    # TODO: Test invalid board value
    # TODO: Test invalid serial value
    # TODO: Test invalid ide value
    #
    def test_put_settings_invalid_json(self):
        url = self.SERVER_URL + '/settings/whatever'

        response = requests.put(url, 'not json data')
        response_json = response.json()

        self.helper_test_valid_json_response(response)
        self.assertFalse(response_json['success'])
        self.assertEqual(response_json['response_type'], 'settings')
        self.assertEqual(response_json['response_state'], 'full_response')
        self.assertFalse('selected' in response_json)
        self.assertFalse('options' in response_json)
        self.assertEqual(response_json['errors'][0]['id'], 64)
        self.assertEqual(response_json['errors'][0]['description'],
                         'Unable to parse sent JSON.')

    def test_put_settings_invalid_data(self):
        url = self.SERVER_URL + '/settings/whatever'

        response = requests.put(url, json={'invalid': 'data'})
        response_json = response.json()

        self.helper_test_valid_json_response(response)
        self.assertFalse(response_json['success'])
        self.assertEqual(response_json['response_type'], 'settings')
        self.assertEqual(response_json['response_state'], 'full_response')
        self.assertFalse('selected' in response_json)
        self.assertFalse('options' in response_json)
        self.assertEqual(response_json['errors'][0]['id'], 65)
        self.assertEqual(response_json['errors'][0]['description'],
                         'JSON received does not have \'new_value\' key.')

    def test_put_settings_empty_new_value(self):
        url = self.SERVER_URL + '/settings/whatever'

        response = requests.put(url, json={'new_value': ''})
        response_json = response.json()

        self.helper_test_valid_json_response(response)
        self.assertFalse(response_json['success'])
        self.assertEqual(response_json['response_type'], 'settings')
        self.assertEqual(response_json['response_state'], 'full_response')
        self.assertFalse('selected' in response_json)
        self.assertFalse('options' in response_json)
        self.assertEqual(response_json['errors'][0]['id'], 66)
        self.assertEqual(response_json['errors'][0]['description'],
                         'Invalid value.')

    #
    # Test code put request
    # TODO: Test where compiler is completely mocked and request is successful
    #
    def test_post_data_not_json(self):
        """Test sending code to the server with invalid content type."""
        url = self.SERVER_URL + '/code'

        response = requests.post(url, 'This is not json')
        response_json = response.json()

        self.helper_test_valid_json_response(response)
        self.assertFalse(response_json['success'])
        self.assertEqual(response_json['response_state'], 'full_response')
        self.assertEqual(response_json['response_type'], 'ide_output')
        self.assertEqual(response_json['ide_data']['exit_code'], 64)
        self.assertEqual(response_json['ide_data']['err_output'],
                         'Unable to parse sent JSON.')
        self.assertEqual(response_json['errors'][0]['id'], 64)
        self.assertEqual(response_json['errors'][0]['description'],
                         'More info available in the \'ide_data\' value.')

    def test_post_data_invalid_json(self):
        """Test sending code to the server with invalid JSON."""
        url = self.SERVER_URL + '/code'

        response = requests.post(url, json={'value': 'incorrect'})
        response_json = response.json()

        self.helper_test_valid_json_response(response)
        self.assertFalse(response_json['success'])
        self.assertEqual(response_json['response_state'], 'full_response')
        self.assertEqual(response_json['response_type'], 'ide_output')
        self.assertEqual(response_json['ide_data']['exit_code'], 64)
        self.assertEqual(response_json['ide_data']['err_output'],
                         'Unable to parse sent JSON.')
        self.assertEqual(response_json['errors'][0]['id'], 64)
        self.assertEqual(response_json['errors'][0]['description'],
                         'More info available in the \'ide_data\' value.')

    def test_post_code_no_compiler_53(self):
        """Test sending code to the server with invalid compiler (default)."""
        url = self.SERVER_URL + '/code'

        response = requests.post(url, json={'sketch_code': 'some code here'})
        response_json = response.json()

        self.helper_test_valid_json_response(response)
        self.assertFalse(response_json['success'])
        self.assertEqual(response_json['response_state'], 'full_response')
        self.assertEqual(response_json['response_type'], 'ide_output')
        self.assertEqual(response_json['ide_data']['exit_code'], 53)
        self.assertEqual(response_json['ide_data']['err_output'],
                         'Compiler directory not configured in the Settings.')
        self.assertEqual(response_json['errors'][0]['id'], 53)
        self.assertEqual(response_json['errors'][0]['description'],
                         'More info available in the \'ide_data\' value.')

    def test_post_code_fake_compiler(self):
        """Create empty file as a compiler, send code, catch exception."""
        url_compiler = self.SERVER_URL + '/settings/compiler'
        url_code = self.SERVER_URL + '/code'
        # First create an empty file and set it as a compiler path
        compiler_folder = self.temp_folder
        if sys.platform == 'darwin':
            # macOS needs executable file 'Arduino' to be in Contents/MacOS/
            compiler_folder = os.path.join(compiler_folder, 'Contents')
            os.makedirs(compiler_folder)
            compiler_folder = os.path.join(compiler_folder, 'MacOS')
            os.makedirs(compiler_folder)
        c_path = os.path.abspath(os.path.join(compiler_folder, 'Arduino'))
        open(c_path, 'w').close()
        prep_response = requests.put(url_compiler,
                                     json={'new_value': c_path}).json()
        self.assertTrue(prep_response['success'])

        # Now run the request under test
        response = requests.post(url_code,
                                 json={'sketch_code': 'some code here'})
        response_json = response.json()

        self.helper_test_valid_json_response(response)
        self.assertFalse(response_json['success'])
        self.assertEqual(response_json['response_state'], 'full_response')
        self.assertEqual(response_json['response_type'], 'ide_output')
        self.assertEqual(response_json['ide_data']['exit_code'], 52)
        self.assertTrue('Unexpected server error' in
                        response_json['ide_data']['err_output'])
        self.assertEqual(response_json['errors'][0]['id'], 52)
        self.assertEqual(response_json['errors'][0]['description'],
                         'More info available in the \'ide_data\' value.')


if __name__ == '__main__':
    unittest.main()

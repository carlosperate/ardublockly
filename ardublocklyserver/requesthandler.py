# -*- coding: utf-8 -*-
#
# Receives and responds to the HTTP request from the Python server.
#
# Copyright (c) 2015 carlosperate https://github.com/carlosperate/
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
#
from __future__ import unicode_literals, absolute_import
import json
import cgi
import sys
import re
try:
    # 2.x name
    import Tkinter
    import urlparse
    import tkFileDialog
    import SimpleHTTPServer
except ImportError:
    # 3.x name
    import tkinter as Tkinter
    import urllib.parse as urlparse
    import tkinter.filedialog as tkFileDialog
    import http.server as SimpleHTTPServer

import ardublocklyserver.actions as actions


class BlocklyRequestHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    """
    Simple Python HTTP request handler to pass over the AJAX requests.
    """

    def do_POST(self):
        """
        Serves the POST request, using form-like data
        """
        message_back = None
        content_type, parameters_dict = cgi.parse_header(
            self.headers.get("Content-type"))
        content_length = int(self.headers.get('content-length'))

        if content_type == 'application/x-www-form-urlencoded':
            parameters = urlparse.parse_qs(
                parse_qs_encoder(self.rfile.read(content_length)),
                keep_blank_values=False)
            message_back = handle_settings(parameters)
        elif content_type == 'text/plain':
            data_string = self.rfile.read(content_length)
            try:
                # At this point message back should contain a normal string
                # with the sketch code
                #TODO: unicode testing over here
                message_back =\
                    '// Ardublockly generated sketch\n' + \
                    data_string.decode('utf-8')
            except Exception as e:
                print(e)
                print('\nThere was an error manipulating the sketch data!!!')
            # Returning data is a JSON string with the Arduino CLI output
            message_back = handle_sketch(message_back)
        else:
            print('\nError, content type not recognised: ' + str(content_type))
            self.send_response(404, "Ups, not found!")
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write('Error: invalid content type')
            return

        # Responding
        if message_back:
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(message_back.encode("utf-8"))

    def log_request(self, code='-', size='-'):
        """
        Log an accepted request.
        This is called by send_response(), and printed to the stderr by
        log_message. No need to fill the command line with successful responses,
        so only print any non 200.
        :param code:
        :param size:
        :return:
        """
        if code != 200:
            self.log_message('"%s" %s %s',
                             self.requestline, str(code), str(size))


#
# Request functions helpers
#
def parse_qs_encoder(url_to_encode):
    """
    The urlparse.parse_qs function requires an ASCII input in python 3 and a
    unicode array in Python 2, so this helper function is used to return the
    right data.
    :return: Input string encoded in the format required by urlparse.parse_qs.
    """
    if sys.version_info[0] == 3:
        return url_to_encode.decode('utf-8')
    else:
        return str(url_to_encode).encode('utf-8')


def handle_settings(parameters):

    def _get_value(parameters2):
        """ Searches for a 'value' parameter in the dictionary. """
        value2 = None
        for key2 in parameters2:
            if str(key2) == 'value':
                value2 = str(parameters2[key2])
        return value2

    message_back = None
    for key in parameters:
        # Compiler
        if str(key) == 'compiler':
            if str(parameters[key]) == "['get']":
                message_back = actions.get_compiler_path()
            elif str(parameters[key]) == "['set']":
                message_back = actions.set_compiler_path()
        # Sketch
        elif str(key) == 'sketch':
            if str(parameters[key]) == "['get']":
                message_back = actions.get_sketch_path()
            elif str(parameters[key]) == "['set']":
                message_back = actions.set_sketch_path()
        # Arduino Board
        elif str(key) == 'board':
            if str(parameters[key]) == "['get']":
                message_back = actions.get_arduino_boards()
            elif str(parameters[key]) == "['set']":
                value = _get_value(parameters)
                value = re.sub(r'^\[\'', '', value)
                value = re.sub(r'\'\]', '', value)
                message_back = actions.set_arduino_board(value)
        # Serial port
        elif str(key) == 'serial':
            if str(parameters[key]) == "['get']":
                message_back = actions.get_serial_ports()
            elif str(parameters[key]) == "['set']":
                value = _get_value(parameters)
                value = re.sub(r'^\[\'', '', value)
                value = re.sub(r'\'\]', '', value)
                message_back = actions.set_serial_port(value)
        # Launch Only Options
        elif str(key) == 'ide':
            if str(parameters[key]) == "['get']":
                message_back = actions.get_load_ide_only()
            elif str(parameters[key]) == "['set']":
                value = _get_value(parameters)
                value = re.sub(r'^\[\'', '', value)
                value = re.sub(r'\'\]', '', value)
                message_back = actions.set_load_ide_only(value)
        # The Value parameter is only used in some cases
        elif str(key) == 'value':
            pass
        # Parameter not recognised
        else:
            print('The "' + str(key) + '" = ' + str(parameters[key]) +
                  ' parameter is not recognised!')
    return message_back


def handle_sketch(sketch_code):
    """
    Creates an Arduino Sketch and invokes the Arduino CLI.
    Creates a JSON string to return to the page with the following format:
    {"response_type": "ide_output",
     "element" : "div_ide_output",
     "success" : "true",
     "conclusion" : Short text as main conclusion,
     "output" : Output string,
     "error_output" : Output string,
     "exit_code": Exit code}
    """
    sketch_path = actions.create_sketch_from_string(sketch_code)
    success, conclusion, out, error, exit_code =\
        actions.load_arduino_cli(sketch_path)
    json_data = \
        {'response_type': 'ide_output',
         'element': 'div_ide_output',
         'success': success,
         'conclusion': conclusion,
         'output': out,
         'error_output': error,
         'exit_code': exit_code}
    return json.dumps(json_data)




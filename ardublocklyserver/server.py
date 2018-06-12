# -*- coding: utf-8 -*-
"""Launch the Ardublockly Server and handle all requests.

Copyright (c) 2017 carlosperate https://github.com/carlosperate/
Licensed under the Apache License, Version 2.0 (the "License"):
    http://www.apache.org/licenses/LICENSE-2.0
"""
from __future__ import unicode_literals, absolute_import, print_function
import os
import sys
# local-packages imports
from bottle import request, response
from bottle import static_file, run, default_app, redirect, abort
# Python 2 and 3 compatibility imports
from six import iteritems
# This package modules
from ardublocklyserver import actions


#
# Configure server
#
app = application = default_app()
document_root = ''


def launch_server(ip='localhost', port=8000, document_root_=''):
    """Launch the Waitress server and Bottle framework with given settings.

    :param ip: IP address to serve. Default to localhost, set to '0.0.0.0' to
            be able to access the server from your local network.
    :param port: Port to serve, default 8000.
    :param document_root_: Path to be the server document root, defualt cwd.
    :return: This function DOES NOT return.
    """
    global document_root
    print('Setting HTTP Server Document Root to:\n\t%s' % document_root_)
    document_root = document_root_
    print('Launch Server:')
    sys.stdout.flush()
    run(app, server='waitress', host=ip, port=port, debug=True)


@app.hook('before_request')
def strip_path():
    """Bottle hook to strip trailing forward slashes from requests."""
    request.environ['PATH_INFO'] = request.environ['PATH_INFO'].rstrip('/')


def set_header_no_cache():
    """Set the HTTP response to no cache the data.

    Implementation depends on Python version.
    """
    if sys.version_info[0] < 3:
        response.headers[
            'Cache-Control'.encode('ascii', 'ignore')] = 'no-cache'
    else:
        response.headers['Cache-Control'] = 'no-cache'


#
# Serving static files.
#
@app.route('/')
@app.route('/ardublockly')
def index_redirect():
    """Redirect the server entry point to the Ardublockly front end."""
    redirect('/ardublockly/index.html')


@app.route('/ardublockly/<file_path:path>')
def static_ardublockly(file_path):
    """Serve the 'ardublockly' folder static files.

    :param file_path: File path inside the 'ardublockly' folder.
    :return: Full HTTPResponse for the static file.
    """
    return static_file(file_path,
                       root=os.path.join(document_root, 'ardublockly'))


@app.route('/blockly/<file_path:path>')
def static_blockly(file_path):
    """Serve the 'blockly' folder static files.

    :param file_path: File path inside the 'blockly' folder.
    :return: Full HTTPResponse for the static file.
    """
    return static_file(file_path, root=os.path.join(document_root, 'blockly'))


@app.route('/blocks/<file_path:path>')
def static_blocks(file_path):
    """Serve the 'blocks' folder static files.

    :param file_path: File path inside the 'blocks' folder.
    :return: Full HTTPResponse for the static file.
    """
    return static_file(file_path, root=os.path.join(document_root, 'blocks'))


@app.route('/examples/<file_path:path>')
def static_examples(file_path):
    """Serve the 'examples' folder static files.

    :param file_path: File path inside the 'examples' folder.
    :return: Full HTTPResponse for the static file.
    """
    return static_file(file_path, root=os.path.join(document_root, 'examples'))


@app.route('/closure-library/<file_path:path>')
def static_closure(file_path):
    """Serve the 'closure-library' folder static files.

    :param file_path: File path inside the 'closure-library' folder.
    :return: Full HTTPResponse for the static file.
    """
    return static_file(file_path,
                       root=os.path.join(document_root, 'closure-library'))


@app.route('/docs')
def static_docs_index():
    """Set a /docs/Home/index.html redirect from /docs/"""
    redirect('/docs/Home/index.html')


@app.route('/docs/<file_path:path>')
def static_docs(file_path):
    """Serve the 'docs' folder static files and redirect folders to index.html.

    :param file_path: File path inside the 'docs' folder.
    :return: Full HTTPResponse for the static file.
    """
    if os.path.isdir(os.path.join(document_root, 'docs', file_path)):
        return redirect('/docs/%s/index.html' % file_path)
    return static_file(file_path, root=os.path.join(document_root, 'docs'))


#
# Retrieve or update Settings request handlers. Only GET and PUT available.
#
@app.route('/settings', method=['POST', 'PATCH', 'DELETE'])
@app.route('/settings/<name>', method=['POST', 'PATCH', 'DELETE'])
def handler_settings_not_allowed(name=None):
    """Return 405 response for unauthorised '/settings' method types.

    :param name:  Setting value.
    :return: HTTPError 405.
    """
    abort(405, 'Not Allowed (%s)' % name if name else 'Not Allowed')


@app.get('/settings')
def handler_settings_get_all():
    """Handle the GET all settings requests.

    :return: JSON string with the formed response.
    """
    response_dict = {
            'response_type': 'settings',
            'response_state': 'full_response',
            'success': True,
            'settings_type': 'all',
            'settings': [{
                'settings_type': 'compiler',
                'selected': actions.get_compiler_path()
            }, {
                'settings_type': 'sketch',
                'selected': actions.get_sketch_path()
            }, {
                'settings_type': 'board',
                'options': [{'value': board, 'display_text': board}
                            for board in actions.get_arduino_boards()],
                'selected': actions.get_arduino_board_selected()
            }, {
                'settings_type': 'serial',
                'options': [{'value': k, 'display_text': v}
                            for k, v in iteritems(actions.get_serial_ports())],
                'selected': actions.get_serial_port_selected()
            }, {
                'settings_type': 'ide',
                'options': [{'value': k, 'display_text': v} for k, v in
                            iteritems(actions.get_load_ide_options())],
                'selected': actions.get_load_ide_selected()
            }]
        }
    set_header_no_cache()
    return response_dict


@app.get('/settings/<name>')
def handler_settings_get_individual(name):
    """Handle the GET setting requests.

    Error codes:
    60 - Unexpected setting type requested.

    :param name: Setting value to retrieve.
    :return: JSON string with the formed response.
    """
    success = True
    response_dict = {'response_type': 'settings',
                     'response_state': 'full_response',
                     'settings_type': name}
    if name == 'compiler':
        response_dict.update({
            'selected': actions.get_compiler_path()})
    elif name == 'sketch':
        response_dict.update({
            'selected': actions.get_sketch_path()})
    elif name == 'board':
        response_dict.update({
            'options': [{'value': board, 'display_text': board}
                        for board in actions.get_arduino_boards()],
            'selected': actions.get_arduino_board_selected()})
    elif name == 'serial':
        response_dict.update({
            'options': [{'value': k, 'display_text': v}
                        for k, v in iteritems(actions.get_serial_ports())],
            'selected': actions.get_serial_port_selected()})
    elif name == 'ide':
        response_dict.update({
            'options': [{'value': k, 'display_text': v}
                        for k, v in iteritems(actions.get_load_ide_options())],
            'selected': actions.get_load_ide_selected()})
    else:
        success = False
        response_dict.update({
            'settings_type': 'invalid',
            'errors': [{
                'id': 61,
                'description': 'Unexpected setting type requested.'
            }]})
    response_dict.update({'success': success})
    set_header_no_cache()
    return response_dict


@app.put('/settings')
def handler_settings_update_all():
    """Handle the invalid PUT all settings requests.

    There is no specific reason for this, is just not used by the client, and
    so there is no need to implement it at the moment.

    Error codes:
    62 - Settings have to be individually updated.

    :return: JSON string with the formed response.
    """
    return {
        'response_type': 'settings',
        'response_state': 'full_response',
        'success': False,
        'settings_type': 'all',
        'errors': [{
            'id': 62,
            'description': 'Settings have to be individually updated.'
        }]
    }


@app.put('/settings/<name>')
def handler_settings_update_individual(name):
    """Handle the POST setting requests.

    Error codes:
    63 - Unexpected setting type to update.
    64 - Unable to parse sent JSON.
    65 - JSON received does not have 'new_value' key.
    66 - Invalid value.
    67 - New value could not be set.

    :param name: Setting value to retrieve.
    :return: JSON string with the formed response.
    """
    response_dict = {'response_type': 'settings',
                     'response_state': 'full_response',
                     'settings_type': name}
    try:
        new_value = request.json['new_value']
    except (TypeError, ValueError):
        response_dict.update({
            'success': False,
            'errors': [{
                'id': 64,
                'description': 'Unable to parse sent JSON.'
            }]
        })
    except KeyError:
        response_dict.update({
            'success': False,
            'errors': [{
                'id': 65,
                'description': 'JSON received does not have \'new_value\' key.'
            }]
        })
    else:
        if not new_value:
            response_dict.update({
                'success': False,
                'errors': [{
                    'id': 66,
                    'description': 'Invalid value.'
                }]
            })
        else:
            options = None
            set_value = None
            if name == 'compiler':
                set_value = actions.set_compiler_path(new_value)
            elif name == 'sketch':
                set_value = actions.set_sketch_path(new_value)
            elif name == 'board':
                set_value = actions.set_arduino_board(new_value)
                options = [{'value': board, 'display_text': board}
                           for board in actions.get_arduino_boards()]
            elif name == 'serial':
                set_value = actions.set_serial_port(new_value)
                options = [{'value': k, 'display_text': v}
                           for k, v in iteritems(actions.get_serial_ports())]
            elif name == 'ide':
                set_value = actions.set_load_ide_only(new_value)
                options = [{'value': k, 'display_text': v} for k, v in
                           iteritems(actions.get_load_ide_options())]
            else:
                response_dict.update({'success': False,
                                      'settings_type': 'invalid'})
                response_dict.setdefault('errors', []).append({
                    'id': 63,
                    'description': 'Unexpected setting type to update.'
                })
            # Check if sent value was set, might have been expanded in Settings
            if set_value in new_value:
                response_dict.update({
                    'success': True,
                    'selected': set_value
                })
                if options:
                    response_dict.update({'options': options})
            else:
                response_dict.update({'success': False})
                response_dict.setdefault('errors', []).append({
                    'id': 67,
                    'description': 'New value could not be set.'
                })
    set_header_no_cache()
    return response_dict


#
# Create and compile Arduino Sketch request handler. Only POST available.
#
@app.route('/code', method=['GET', 'PUT', 'PATCH', 'DELETE'])
def handler_code_not_allowed():
    """Return 405 response for unauthorised '/code' method types.

    :return: HTTPError 405.
    """
    abort(405, 'Not Allowed, code can only be sent by POST.')


@app.post('/code')
def handler_code_post():
    """Handle sent Arduino Sketch code.

    Error codes:
    0  - No error
    1  - Build or Upload failed.
    2  - Sketch not found.
    3  - Invalid command line argument
    4  - Preference passed to 'get-pref' flag does not exist
    5  - Not Clear, but Arduino IDE sometimes errors with this.
    50 - Unexpected error code from Arduino IDE
    51 - Could not create sketch file
    52 - Invalid path to internally created sketch file
    53 - Compiler directory not configured in the Settings
    54 - Launch IDE option not configured in the Settings
    55 - Serial Port configured in Settings not accessible.
    56 - Arduino Board not configured in the Settings.
    52 - Unexpected server error.
    64 - Unable to parse sent JSON.
    """
    success = False
    ide_mode = 'unknown'
    std_out, err_out = '', ''
    exit_code = 52
    response_dict = {'response_type': 'ide_output',
                     'response_state': 'full_response'}
    try:
        sketch_code = request.json['sketch_code']
    except (TypeError, ValueError, KeyError) as e:
        exit_code = 64
        err_out = 'Unable to parse sent JSON.'
        print('Error: Unable to parse sent JSON:\n%s' % str(e))
    else:
        try:
            success, ide_mode, std_out, err_out, exit_code = \
                actions.arduino_ide_send_code(sketch_code)
        except Exception as e:
            exit_code = 52
            err_out += 'Unexpected server error.'
            print('Error: Exception in arduino_ide_send_code:\n%s' % str(e))

    response_dict.update({'success': success,
                          'ide_mode': ide_mode,
                          'ide_data': {
                              'std_output': std_out,
                              'err_output': err_out,
                              'exit_code': exit_code}})
    if not success:
        response_dict.update({
            'errors': [{
                'id': exit_code,
                'description': 'More info available in the \'ide_data\' value.'
            }]
        })
    set_header_no_cache()
    return response_dict

#!/usr/bin/env python2
# -*- coding: utf-8 -*-
#
# Entry point for the ArdublocklyServer application.
#
# Copyright (c) 2015 carlosperate https://github.com/carlosperate/
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
#
from __future__ import unicode_literals, absolute_import
import os
import re
import sys
import getopt
import platform
import threading
import webbrowser

import ardublocklyserver.server
import ardublocklyserver.compilersettings


def open_browser(open_file):
    """
    Start a browser in a separate thread after waiting for half a second.
    """
    def _open_browser():
        webbrowser.open('http://localhost:%s/%s' %
                        (ardublocklyserver.server.PORT, open_file))

    thread = threading.Timer(0.5, _open_browser)
    thread.start()


def parsing_args(argv):
    """
    Processes the command line arguments. Arguments supported:
    -h / --help
    -s / --serverroot <working directory>
    :return: dictionary with available options(keys) and value(value)
    """
    option_dict = {}
    try:
        opts, args = getopt.getopt(argv, "hs:", ["help", "serverroot="])
    except getopt.GetoptError as e:
        print('There was a problem parsing the command line arguments:')
        print('\t%s' % e)
        sys.exit(1)

    for opt, arg in opts:
        if opt in ("-h", "--help"):
            print('Include a server working directory using the flag:')
            print('\t -s <folder>')
            sys.exit(0)
        if opt in ("-s", "--serverroot"):
            # Windows only issue: In BlocklyRequestHandler, if chdir is fed
            # an 'incorrect' path like 'C:' instead of 'C:\' or C:/' it
            # fails silently maintaining the current working directory.
            # Use regular expressions to catch this corner case.
            if re.match("^[a-zA-Z]:$", arg):
                print('The windows drive letter needs to end in a slash, ' +
                      'eg. %s\\' % arg)
                sys.exit(1)
            # Check if the value is a valid directory
            if os.path.isdir(arg):
                option_dict['serverroot'] = arg
                print ('Parsed "' + opt + '" flag with "' + arg + '" value.')
            else:
                print('Invalid directory "' + arg + '".')
                sys.exit(1)
        else:
            print('Flag ' + opt + ' not recognised.')
    return option_dict


def main(argv):
    """
    Initialises the Settings singleton and starts the HTTP Server
    """
    print('Running Python version %s' % platform.python_version())

    # Checking command line arguments
    if len(argv) > 0:
        print("\n======= Parsing Command line arguments =======")
        arguments = parsing_args(argv)
        if 'serverroot' in arguments:
            # Overwrite server working directory if valid
            server_root = arguments['serverroot']

    # Loading the settings
    print("\n======= Loading Settings =======")
    ardublocklyserver.compilersettings.ServerCompilerSettings()

    # Loading the server with the argument working root directory, or by default
    # with the parent folder of where this script is executed, done to be able
    # to find the closure lib directory on the same level as the project folder
    print("\n======= Starting Server =======")
    this_file_parent_dir =\
        os.path.dirname(os.path.realpath(sys.argv[0]))
    try:
        server_root
    except NameError:
        server_root = this_file_parent_dir
    # Opening the browser to the web-app
    paths = [server_root, this_file_parent_dir]
    common_path = os.path.commonprefix(paths)
    if not common_path:
        print('The server working directory and Ardublockly project need to ' +
              'be in the same root directory.!' +
              'The server root also needs to be at least one directory up ' +
              'from the Ardublockly folder!')
        sys.exit(1)
    relative_path = [os.path.relpath(this_file_parent_dir, common_path)]
    app_index = os.path.normpath(os.path.join(
        relative_path[0], 'ardublockly'))
    #print('Root & script parent: %s\nCommon & relative path: %s; %s\nIndex: %s'
    #      % (paths, common_path, relative_path, app_index))
    open_browser(app_index)
    ardublocklyserver.server.start_server(server_root)


if __name__ == "__main__":
    main(sys.argv[1:])

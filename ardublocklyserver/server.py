# -*- coding: utf-8 -*-
#
# Starts an HTTP server.
#
# Copyright (c) 2016 carlosperate https://github.com/carlosperate/
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
#
from __future__ import unicode_literals, absolute_import, print_function
import os
try:
    # 2.x name
    import thread
    import BaseHTTPServer
except ImportError:
    # 3.x name
    import _thread as thread
    import http.server as BaseHTTPServer

from ardublocklyserver.requesthandler import ArdublocklyRequestHandler
from ardublocklyserver.serverwebsocket import ArdublocklyWebSocket
from ardublocklyserver.SimpleWebSocketServer.SimpleWebSocketServer \
    import SimpleWebSocketServer

ADDRESS = '0.0.0.0'
PORT = 8000
WB_PORT = PORT + 10


def start_ardublockly_ws():
    """ Starts the WebSocket server with at the given address and port. """
    server = SimpleWebSocketServer(ADDRESS, WB_PORT, ArdublocklyWebSocket)
    server.serveforever()
    print('The WebSocket server closed unexpectedly!!')


def start_ardublockly_http():
    """ Starts the HTTP server with at the given address and port. """
    server = BaseHTTPServer.HTTPServer(
            (ADDRESS, PORT), ArdublocklyRequestHandler)
    server.serve_forever()
    print('The HTTP server closed unexpectedly!!')


def start_servers(document_root):
    """
    Start the WebSocket and HTTP servers with the document root indicated by
    the argument.
    :param document_root: Directory to set as the server document root.
    """
    print('Setting HTTP Server Document Root to:\n\t%s' % document_root)
    os.chdir(document_root)
    print('Starting WebSockets service on wb://%s:%s ...' % (ADDRESS, WB_PORT))
    thread.start_new_thread(start_ardublockly_ws, ())
    print('Starting HTTP service on http://%s:%s ...' % (ADDRESS, PORT))
    start_ardublockly_http()


if __name__ == "__main__":
    start_servers(os.getcwd())

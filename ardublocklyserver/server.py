# -*- coding: utf-8 -*-
#
# Starts an HTTP server.
#
# Copyright (c) 2015 carlosperate https://github.com/carlosperate/
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
#
from __future__ import unicode_literals, absolute_import
import os
try:
    # 2.x name
    import BaseHTTPServer
except ImportError:
    # 3.x name
    import http.server as BaseHTTPServer

<<<<<<< HEAD:ardublocklyserver/server.py
import ardublocklyserver.requesthandler
=======
from ardublocklyserver.requesthandler import BlocklyRequestHandler
>>>>>>> origin:ardublocklyserver/server.py

ADDRESS = '0.0.0.0'
PORT = 8000


def start_server(document_root):
    """ Start the server with the document root indicated by argument """
    print('Setting HTTP Server Document Root to: \n\t' + document_root + "\n")
    os.chdir(document_root)
    server_address = (ADDRESS, PORT)
<<<<<<< HEAD:ardublocklyserver/server.py
    server = BaseHTTPServer.HTTPServer(
        server_address,
        ardublocklyserver.requesthandler.BlocklyRequestHandler)
=======
    server = BaseHTTPServer.HTTPServer(server_address, BlocklyRequestHandler)
>>>>>>> origin:ardublocklyserver/server.py
    print('Launching the HTTP service...')
    server.serve_forever()
    print('The Server closed unexpectedly!!')


if __name__ == "__main__":
    start_server(os.getcwd())

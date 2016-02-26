# -*- coding: utf-8 -*-
#
# Sends, receives and responds the WebSocket messages.
#
# Copyright (c) 2016 carlosperate https://github.com/carlosperate/
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
#
from __future__ import unicode_literals, absolute_import, print_function

from ardublocklyserver.SimpleWebSocketServer import SimpleWebSocketServer


clients = []


class ArdublocklyWebSocket(SimpleWebSocketServer.WebSocket):
    """ Description. """

    def handleMessage(self):
        for client in clients:
            if client != self:
                client.sendMessage(self.address[0] + u' - ' + self.data)

    def handleConnected(self):
        print(self.address, 'connected')
        for client in clients:
            client.sendMessage(self.address[0] + u' - connected')
        clients.append(self)

    def handleClose(self):
        clients.remove(self)
        print(self.address, 'closed')
        for client in clients:
            client.sendMessage(self.address[0] + u' - disconnected')


def decode_json(json_str):
    """
    Decodes the JSON messages.
    :param json_str: JSON incoming data in String format.
    :return:
    """
    pass

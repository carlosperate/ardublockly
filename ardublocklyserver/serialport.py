# -*- coding: utf-8 -*-
"""Functions to retrieve the computer Serial Port list.

Copyright (c) 2017 carlosperate https://github.com/carlosperate/
Licensed under the Apache License, Version 2.0 (the "License"):
    http://www.apache.org/licenses/LICENSE-2.0
"""
from __future__ import unicode_literals, absolute_import, print_function
# local-packages imports
from serial.tools import list_ports


def get_port_list():
    """Return a list with available Serial Ports.

    :return: A list with the available serial ports only.
    """
    return [port for port, descriptor, hw_id in sorted(list_ports.comports())]


def print_ports():
    """Print the available Serial Ports with their info into the console.

    This includes the ports descriptor and hardware ID.
    """
    iterator = sorted(list_ports.comports())
    print('Found %s ports:' % len(iterator))
    for port, descriptor, hw_id in iterator:
        print('Port: %s\n\tDescriptor: %s\n\tHardware ID: %s' %
              (port, descriptor, hw_id))

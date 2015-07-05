# -*- coding: utf-8 -*-
#
# Functions to retrieve the computer Serial Port list.
#
# Copyright (c) 2015 carlosperate https://github.com/carlosperate/
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
#
from __future__ import unicode_literals, absolute_import
import ardublocklyserver.pyserialports.list_ports


def get_port_complete_list():
    """
    Creates a list of the available Serial Ports, including their descriptor
    and hardware ID.
    :return: List with the Port information. Each list item contains a tuple
             three elements in this order: (port name, descriptor, hw id)
    """
    port_list = ardublocklyserver.pyserialports.list_ports.comports()
    return sorted(port_list)


def get_port_list():
    """
    :return: A list with the available serial ports only
    """
    iterator = get_port_complete_list()
    port_list = []
    for port, descriptor, hw_id in iterator:
        port_list.append(port)
    return port_list


def print_ports():
    """
    Prints the available Serial Ports with their info into the console.
    """
    iterator = get_port_complete_list()
    print('Found %s ports:' % len(iterator))
    for port, descriptor, hw_id in iterator:
        print('Port: %s\n\tDescriptor: %s\n\tHardware ID: %s' %
              (port, descriptor, hw_id))

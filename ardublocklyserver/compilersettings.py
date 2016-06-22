# -*- coding: utf-8 -*-
#
# Save and retrieve the compiler settings into a text file.
#
# Copyright (c) 2015 carlosperate https://github.com/carlosperate/
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
#
# The ServerCompilerSettings is a singleton class maintains in memory, and
# writes the Arduino IDE settings into a file.
# On first invocation of the singleton it reads the settings from the file.
#
from __future__ import unicode_literals, absolute_import
import os
import re
import sys
import codecs

#try:
#    # 2.x name
#    import ConfigParser
#except ImportError:
#    # 3.x name
#    import configparser as ConfigParser

from ardublocklyserver import configparser
import ardublocklyserver.serialport


class ServerCompilerSettings(object):
    """
    Singleton class that retrieves and saves the settings for the server side
    compilation.
    The class on first invocation tries to read the settings from the file, it
    keeps them in memory, and every time they are modified the changes are also
    written into the file.
    No compiler is part of the Python code, instead settings that 
    point to the local Arduino IDE and sketch are stored here.
    The public settings to set and get are:
        compiler_dir
        sketch_name
        sketch_dir
        arduino_board
        serial_port
        load_ide_option
    """

    # Class variables that after initialisation will not change
    __singleton_instance = None
    __settings_path = None

    # Class variable to indicate the settings filename, static content
    __settings_filename = 'ServerCompilerSettings.ini'

    # Class dictionary to define Arduino board types, static content
    # TODO: This content will be moved from here and integrated completely
    #       into 'blockly\generators\arduino\boards.js', which should then
    #       send the selected flag to be saved as a single value
    __arduino_types = {'Uno': 'arduino:avr:uno',
                       'Nano': 'arduino:avr:nano',
                       'Leonardo': 'arduino:avr:leonardo',
                       'Yun': 'arduino:avr:leonardo',
                       'Mega': 'arduino:avr:mega',
                       'Duemilanove 328p': 'arduino:avr:diecimila',
                       'Duemilanove 168p':
                               'arduino:avr:diecimila:cpu=atmega168',
                       'Atmel atmega328p Xplained mini':
                               'atmel:avr:atmega328p_xplained_mini',
                       'Atmel atmega168pb Xplained mini':
                               'atmel:avr:atmega168pb_xplained_mini',
                       'Atmel atmega328pb Xplained mini':
                               'atmel:avr:atmega328pb_xplained_mini',
                       'ESP8266 Huzzah': 'esp8266:esp8266:generic',
                       'ESP8266 WeMos D1': 'esp8266:esp8266:generic'}

    # Class dictionary to contain the computer COM ports, dynamic content
    __serial_ports = {'port0': 'COM1'}

    # Class dictionary to define IDE load options, static content
    __ide_load_options = {'open': 'Open sketch in IDE',
                          'verify': 'Verify sketch',
                          'upload': 'Compile and Upload sketch'}

    #
    # Singleton creator and destructor
    #
    def __new__(cls, settings_dir=None, *args, **kwargs):
        """
        Creating or returning the singleton instance.
        The argument settings_file_dir is only processed on first
        initialisation, and any future calls to the constructor will returned
        the already initialised instance with a set settings_file_dir.
        """
        if not cls.__singleton_instance:
            # Create the singleton instance
            cls.__singleton_instance =\
                super(ServerCompilerSettings, cls).__new__(cls, *args, **kwargs)
            # Initialise the instance, defaults if file not found
            cls.__singleton_instance.__initialise(settings_dir)
        return cls.__singleton_instance

    def __initialise(self, settings_dir=None):
        # Create variables to be used with accessors
        self.__load_ide_option = None
        self.__compiler_dir = None
        self.__sketch_dir = None
        self.__sketch_name = None
        self.__arduino_board_key = None
        self.__arduino_board_value = None
        self.__serial_port_key = None
        self.__serial_port_value = None
        if settings_dir:
            self.__settings_path = os.path.join(
                settings_dir, self.__settings_filename)
        else:
            # If not set, the file path will be same location as the executed
            # python code that calls this class
            called_script_dir = os.path.dirname(os.path.realpath(sys.argv[0]))
            self.__settings_path = os.path.normpath(
                os.path.join(called_script_dir, self.__settings_filename))
        # Load settings from file
        self.read_settings()

    @classmethod
    def _drop(cls):
        """ Drop the instance. """
        cls.__singleton_instance = None

    #
    # Compiler Directory accessors
    #
    def get_compiler_dir(self):
        return self.__compiler_dir

    def set_compiler_dir(self, new_compiler_dir):
        """ The compiler dir must a valid file or directory """
        # Mac only check, as apps are packaged directories
        if sys.platform == 'darwin':
            # Arduino version >1.6.0 has changed the binary name, so check both
            if os.path.isfile(os.path.join(
                    new_compiler_dir, 'Contents', 'MacOS',
                    'JavaApplicationStub')):
                new_compiler_dir = os.path.join(new_compiler_dir, 'Contents',
                                                'MacOS', 'JavaApplicationStub')
                print('\nCompiler file in OS X located within the app bundle.')
            elif os.path.isfile(os.path.join(
                    new_compiler_dir, 'Contents', 'MacOS', 'Arduino')):
                new_compiler_dir = os.path.join(
                    new_compiler_dir, 'Contents', 'MacOS', 'Arduino')
                print('\nCompiler file in OS X located within the app bundle.')
            else:
                print('Could not locate the Arduino executable within the OS X '
                      'app bundle. These are the available files:')
                try:
                    print('%s' % os.listdir(
                        '%s/Contents/MacOS/' % new_compiler_dir))
                except OSError as e:
                    print(e)

        # Check directory
        if os.path.isfile(new_compiler_dir):
            self.__compiler_dir = new_compiler_dir
            print('\nCompiler directory set to:\n\t%s' % self.__compiler_dir)
            self.save_settings()
        else:
            print('\nThe provided compiler path is not valid !!!')
            print('\t' + new_compiler_dir)
            if self.__compiler_dir:
                print('Previous compiler path maintained:\n\t%s' %
                      self.__compiler_dir)
            else:
                self.set_compiler_dir_default()
                print('Default compiler path set:\n\t%s' %
                      self.__compiler_dir)
                self.save_settings()

    compiler_dir = property(get_compiler_dir, set_compiler_dir)

    def set_compiler_dir_default(self):
        self.__compiler_dir = None

    def set_compiler_dir_from_file(self, new_compiler_dir):
        """ The compiler dir must be full path to an existing file. """
        if os.path.exists(new_compiler_dir):
            self.__compiler_dir = new_compiler_dir
        else:
            print('\nThe provided compiler path in the settings file is not ' +
                  'valid:')
            print('\t%s' % new_compiler_dir)
            self.set_compiler_dir_default()
            print('Default compiler path set:\n\t%s' % self.__compiler_dir)

    #
    # Sketch name accessors
    #
    def get_sketch_name(self):
        return self.__sketch_name

    def set_sketch_name(self, new_sketch_name):
        """ Only accept letters, numbers, underscores and dashes. """
        if re.match("^[\w\d_-]*$", new_sketch_name):
            self.__sketch_name = new_sketch_name
            print('\nSketch name set to:\n\t%s' % self.__sketch_name)
            self.save_settings()
        else:
            print('\nProvided Sketch name contains invalid characters: !!!')
            print('\t%s' % new_sketch_name)
            if self.__sketch_name:
                print('Previous Sketch name maintained:\n\t%s' %
                      self.__sketch_name)
            else:
                self.set_sketch_name_default()
                print('Default Sketch name set:\n\t%s' %
                      self.__sketch_name)
                self.save_settings()

    sketch_name = property(get_sketch_name, set_sketch_name)

    def set_sketch_name_default(self):
         self.__sketch_name = 'ArdublocklySketch'

    def set_sketch_name_from_file(self, new_sketch_name):
        """ Only accept letters, numbers, underscores and dashes. """
        if re.match("^[\w\d_-]*$", new_sketch_name):
            self.__sketch_name = new_sketch_name
        else:
            print('\nSettings file Sketch name contains invalid characters:')
            print('\t%s' % new_sketch_name.decode("utf8"))
            self.set_sketch_name_default()
            print('Default Sketch name set:\n\t%s' % self.__sketch_name)

    #
    #  Sketch Directory accessors
    #
    def get_sketch_dir(self):
        return self.__sketch_dir

    def set_sketch_dir(self, new_sketch_dir):
        """ The sketch directory must be a folder """
        if os.path.isdir(new_sketch_dir):
            self.__sketch_dir = new_sketch_dir
            print('\nSketch directory set to:\n\t%s' % self.__sketch_dir)
            self.save_settings()
        else:
            print('\nThe provided sketch directory is not valid !!!')
            print('\t%s' % new_sketch_dir)
            if self.__sketch_dir:
                print('Previous Sketch directory maintained:\n\t%s' %
                      self.__sketch_dir)
            else:
                self.set_sketch_dir_default()
                print('Default Sketch directory set:\n\t%s' %
                      self.__sketch_dir)
                self.save_settings()

    sketch_dir = property(get_sketch_dir, set_sketch_dir)

    def set_sketch_dir_default(self):
        """ Sketch default location the same as the settings file location. """
        self.__sketch_dir = os.path.dirname(self.__settings_path)

    def set_sketch_dir_from_file(self, new_sketch_dir):
        """ The sketch directory must be a folder """
        if os.path.isdir(new_sketch_dir):
            self.__sketch_dir = new_sketch_dir
        else:
            print('\nSettings file sketch directory is not valid:')
            print('\t%s' % new_sketch_dir)
            self.set_sketch_dir_default()
            print('Default Sketch directory set:\n\t%s' % self.__sketch_dir)

    #
    # Arduino Board and board lists accessors
    #
    def get_arduino_board(self):
        return self.__arduino_board_key

    def set_arduino_board(self, new_board):
        if new_board in self.__arduino_types:
            self.__arduino_board_value = self.__arduino_types[new_board]
            self.__arduino_board_key = new_board
            print('\nArduino Board set to:\n\t%s' % self.__arduino_board_key)
            self.save_settings()
        else:
            print('\nProvided Arduino Board does not exist: !!!')
            print('\t%s' % new_board)
            if self.__arduino_board_key and self.__arduino_board_value:
                print('Previous Arduino board type maintained:\n\t%s' %
                      self.__arduino_board_key)
            else:
                self.set_arduino_board_default()
                print('Default Arduino board type set:\n\t%s' %
                      self.__arduino_board_key)
                self.save_settings()

    arduino_board = property(get_arduino_board, set_arduino_board)

    def set_arduino_board_default(self):
        self.__arduino_board_key = sorted(self.__arduino_types.keys())[0]
        self.__arduino_board_value = \
            self.__arduino_types[self.__arduino_board_key]

    def set_arduino_board_from_file(self, new_board):
        if new_board in self.__arduino_types:
            self.__arduino_board_value = self.__arduino_types[new_board]
            self.__arduino_board_key = new_board
        else:
            print('\nSettings file Arduino Board does not exist:')
            print('\t%s' % new_board)
            self.set_arduino_board_default()
            print('Default Arduino board type set:\n\t%s' %
                  self.__arduino_board_key)

    def get_arduino_board_flag(self):
        return self.__arduino_board_value

    def get_arduino_board_types(self):
        board_list = []
        for key in self.__arduino_types:
            board_list.append(key)
        return board_list

    #
    # Serial Port and lists accessors
    # Extra checks of the available Ports are required as states can change
    #
    def get_serial_port(self):
        """
        Checks available Serial Ports and populates the serial port dictionary.
        Returns currently selected Serial Port key if available.
        Returns None if selected Serial Port is not available anymore.
        :return: Serial Port dictionary key
        """
        self.populate_serial_port_list()
        if not self.__serial_ports:
            print('\nThere are no available Serial Ports !!!')
            self.__serial_port_key = None
            self.__serial_port_value = None
            self.save_settings()
        elif self.__serial_port_value not in self.__serial_ports.values():
            print('\nThe selected Serial Port is no longer available !!!')
            self.__serial_port_key = None
            self.__serial_port_value = None
            self.save_settings()
        elif self.__serial_ports[self.__serial_port_key] != \
                self.__serial_port_value:
            # At this point the dictionary is not empty and the value is
            # present, but not with the right key. So correct the key.
            for key, value in self.__serial_ports.items():
                if self.__serial_port_value == value:
                    self.__serial_port_key = key
            # No need to save settings as only value saved and stays the same
        return self.__serial_port_key

    def set_serial_port(self, new_port):
        """
        Checks available Serial Ports and populates the serial port dictionary.
        If the new serial port is not in the dictionary or the dictionary is
        empty it prints an error in the console.
        :param new_port: the new port to set
        """
        if new_port in self.__serial_ports:
            self.__serial_port_value = self.__serial_ports[new_port]
            self.__serial_port_key = new_port
            # Now we check if the Port is still available
            self.populate_serial_port_list()
            if not self.__serial_ports:
                print('\nThere are no available Serial Ports !!!')
                self.__serial_port_key = None
                self.__serial_port_value = None
            elif self.__serial_port_value not in self.__serial_ports.values():
                print('\nThe selected Serial Port is no longer available !!!')
                self.__serial_port_key = None
                self.__serial_port_value = None
            print('\nSerial Port set to:\n\t%s' % self.__serial_port_value)
            self.save_settings()
        else:
            print('\nProvided Serial Port is not valid: !!!')
            print('\t%s' % new_port)
            if self.__serial_port_key and self.__serial_port_value:
                print('Previous Serial Port maintained:\n\t%s' %
                      self.__serial_port_value)
            else:
                self.set_serial_port_default()
                print('Default Serial Port set:\n\t%s' %
                      self.__serial_port_value)
                self.save_settings()

    serial_port = property(get_serial_port, set_serial_port)

    def set_serial_port_default(self):
        """
        Checks available Serial Ports and populates the serial port dictionary.
        If there are no available serial ports is resets the variables.
        """
        self.populate_serial_port_list()
        if not self.__serial_ports:
            self.__serial_port_key = None
            self.__serial_port_value = None
        else:
            self.__serial_port_key = sorted(self.__serial_ports.keys())[0]
            self.__serial_port_value = \
                self.__serial_ports[self.__serial_port_key]

    def set_serial_port_from_file(self, new_port_value):
        """
        Checks available Serial Ports and populates the serial port dictionary.
        If the new serial port is not in the dictionary or the dictionary is
        empty it prints an error in the console.
        :param new_port_value: the new port to set
        """
        # Check if the settings file value is present in available ports list
        set_default = True
        self.populate_serial_port_list()
        if self.__serial_ports:
            for key, value in self.__serial_ports.items():
                if new_port_value == value:
                    self.__serial_port_key = key
                    self.__serial_port_value = value
                    set_default = False
        if set_default:
            print('\nSettings file Serial Port is not currently available:')
            print('\t%s' % new_port_value)
            self.set_serial_port_default()
            print('Default Serial Port set:\n\t%s' % self.__serial_port_value)

    def get_serial_port_flag(self):
        """
        Checks available Serial Ports and populates the serial port dictionary.
        Returns currently selected Serial Port value if available.
        Returns None if selected Serial Port is not available anymore.
        :return: Serial Port dictionary value
        """
        self.populate_serial_port_list()
        if not self.__serial_ports:
            print('\nThere are no available Serial Ports !!!')
            self.__serial_port_key = None
            self.__serial_port_value = None
            self.save_settings()
        elif self.__serial_port_value not in self.__serial_ports.values():
            print('\nThe selected Serial Port is no longer available !!!')
            self.__serial_port_key = None
            self.__serial_port_value = None
            self.save_settings()
        elif self.__serial_ports[self.__serial_port_key] != \
                self.__serial_port_value:
            # At this point the dictionary is not empty and the flag
            # (dictionary value) is present, but not with the right key.
            # So correct the key.
            for key, value in self.__serial_ports.items():
                if self.__serial_port_value == value:
                    self.__serial_port_key = key
            # No need to save settings as only value saved and stays the same
        return self.__serial_port_value

    def get_serial_ports(self):
        self.populate_serial_port_list()
        return self.__serial_ports

    def populate_serial_port_list(self):
        """
        Populates the __serial_ports__ dictionary with the Serial Ports
        available.
        """
        port_list = ardublocklyserver.serialport.get_port_list()
        self.__serial_ports = {}
        if port_list:
            port_id = 0
            for item in port_list:
                id_string = 'port' + str(port_id)
                self.__serial_ports.update({id_string: item})
                port_id += 1

    #
    # Load the IDE accessors
    #
    def get_load_ide(self):
        return self.__load_ide_option

    def set_load_ide(self, new_load_option):
        if new_load_option in self.__ide_load_options:
            self.__load_ide_option = new_load_option
            print('\nIDE options set to:\n\t%s' %
                  self.__ide_load_options[self.__load_ide_option])
            self.save_settings()
        else:
            print('\nThe provided "Load IDE option" is not valid !!!')
            print('\t%s' % new_load_option)
            if self.__load_ide_option:
                print('Previous "Load IDE option" maintained:\n\t%s' %
                      self.__ide_load_options[self.__load_ide_option])
            else:
                self.set_load_ide_default()
                print('Default "Load IDE option" set:\n\t%s' %
                      self.__ide_load_options[self.__load_ide_option])
                self.save_settings()

    load_ide_option = property(get_load_ide, set_load_ide)

    def set_load_ide_default(self):
        self.__load_ide_option = \
            sorted(self.__ide_load_options.keys())[0]

    def set_load_ide_from_file(self, new_load_option):
        if new_load_option in self.__ide_load_options:
            self.__load_ide_option = new_load_option
        else:
            print('\nSettings file "Load IDE option" is not valid:')
            print('\t%s' % new_load_option)
            self.set_load_ide_default()
            print('Default "Load IDE option" set:\n\t%s' %
                  self.__load_ide_option)

    def get_load_ide_options(self):
        return self.__ide_load_options

    #
    # Sets all the settings to default values
    #
    def set_default_settings(self):
        self.set_load_ide_default()
        self.set_compiler_dir_default()
        self.set_sketch_dir_default()
        self.set_sketch_name_default()
        self.set_serial_port_default()
        self.set_arduino_board_default()

    #
    # Settings file
    #
    def save_settings(self):
        """ Saves all the settings into a configuration file """
        settings_parser = configparser.ConfigParser()
        # IDE Section
        settings_parser.add_section('Arduino_IDE')
        settings_parser.set(
            'Arduino_IDE', 'arduino_exec_path', '%s' % self.compiler_dir)
        settings_parser.set(
            'Arduino_IDE', 'arduino_board', '%s' % self.arduino_board)
        settings_parser.set(
            'Arduino_IDE',
            'arduino_serial_port',
            '%s' % self.__serial_port_value)
        # Sketch section
        settings_parser.add_section('Arduino_Sketch')
        settings_parser.set(
            'Arduino_Sketch', 'sketch_name', '%s' % self.sketch_name)
        settings_parser.set(
            'Arduino_Sketch', 'sketch_directory', '%s' % self.sketch_dir)
        # Ardublockly section
        settings_parser.add_section('Ardublockly')
        settings_parser.set(
            'Ardublockly', 'ide_load', '%s' % self.load_ide_option)

        # Set the path and create/overwrite the file
        try:
            settings_file = codecs.open(
                self.__settings_path, 'wb+', encoding='utf-8')
            try:
                settings_parser.write(settings_file)
                print('Settings file saved to:\n\t%s' % self.__settings_path)
                sys.stdout.flush()
            finally:
                settings_file.close()
        except Exception as e:
            print(e)
            print('Unable to write the settings file to:\n\t%s' %
                  self.__settings_path)

    def read_settings(self):
        """
        Attempts to read the settings from a file and saves them to the
        member variables. If it cannot read the file it sets the variables
        to the default value.
        """
        settings_dict = self.get_settings_file_data()
        if settings_dict:
            self.set_compiler_dir_from_file(settings_dict['arduino_exec_path'])
            self.set_arduino_board_from_file(settings_dict['arduino_board'])
            self.set_serial_port_from_file(settings_dict['arduino_serial_port'])
            self.set_sketch_name_from_file(settings_dict['sketch_name'])
            self.set_sketch_dir_from_file(settings_dict['sketch_directory'])
            self.set_load_ide_from_file(settings_dict['ide_load'])
        else:
            print('\nSettings will be set to the default values.')
            self.set_default_settings()

        # Printing the settings to be able to easily spot issues at load
        print('\nFinal settings loaded:')
        print('\tCompiler directory: %s' % self.__compiler_dir)
        print('\tArduino Board Key: %s' % self.__arduino_board_key)
        print('\tArduino Board Value: %s' % self.__arduino_board_value)
        print('\tSerial Port Value: %s' % self.__serial_port_value)
        print('\tSketch Name: %s' % self.__sketch_name)
        print('\tSketch Directory: %s' % self.__sketch_dir)
        print('\tLoad IDE option: %s\n' % self.__load_ide_option)

        # The read X_from_file() functions do not save new settings and neither
        # does the set_default_settings() function, so save them either way.
        self.save_settings()

    def get_settings_file_data(self):
        """
        Creates a dictionary from the settings stored in a file.
        :return: A dictionary with all the options and values from the settings
                 file (sections are ignored during parsing).
        """
        settings_dict = {}
        settings_parser = configparser.ConfigParser()
        try:
            settings_parser.readfp(
                codecs.open(self.__settings_path, 'r', 'utf8'))
            settings_dict['arduino_exec_path'] =\
                settings_parser.get('Arduino_IDE', 'arduino_exec_path')
            settings_dict['arduino_board'] =\
                settings_parser.get('Arduino_IDE', 'arduino_board')
            settings_dict['arduino_serial_port'] =\
                settings_parser.get('Arduino_IDE', 'arduino_serial_port')
            settings_dict['sketch_name'] =\
                settings_parser.get('Arduino_Sketch', 'sketch_name')
            settings_dict['sketch_directory'] =\
                settings_parser.get('Arduino_Sketch', 'sketch_directory')
            settings_dict['ide_load'] =\
                settings_parser.get('Ardublockly', 'ide_load')
            print('\nSettings loaded from:')
        except Exception as e:
            print('\nSettings file corrupted or not found in:')
            settings_dict = None
        print('\t %s' % self.__settings_path)
        return settings_dict

    def delete_settings_file(self):
        if os.path.exists(self.__settings_path):
            os.remove(self.__settings_path)

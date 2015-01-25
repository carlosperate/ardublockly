from __future__ import unicode_literals, absolute_import
import os
import re

try:
    # 2.x name
    import ConfigParser
except ImportError:
    # 3.x name
    import configparser as ConfigParser

import ArduinoServerCompiler.SerialPort


class ServerCompilerSettings(object):
    """
    Retrieves and saves the settings for the server side compilation.
    No compiler is part of the Python code, instead settings that 
    point to the local Arduino IDE and sketch are stored here.
    The public settings to set and get are:
        compiler_dir
        sketch_name
        sketch_dir
        arduino_board
        serial_port
        launch_IDE_option
    """

    # Designed to be class static variables
    __singleton_instance__ = None
    __settings_filename__ = 'ServerCompilerSettings.ini'
    __settings_path__ = None

    # This is a static dictionary to define Arduino board types
    __arduino_types__ = {'Uno': 'arduino:avr:uno',
                         'Leonardo': 'arduino:avr:leonardo',
                         'Mega': 'arduino:avr:mega',
                         'Duemilanove_328p': 'arduino:avr:diecimila',
                         'Duemilanove_168p':
                                 'arduino:avr:diecimila:cpu=atmega168'}

    # This is a dynamic dictionary containing the PC COM ports
    __serial_ports__ = {'port1': 'COM1',
                        'port2': 'COM2',
                        'port3': 'COM3'}

    # This is a static dictionary to define IDE launch options
    __IDE_launch_options__ = {'open': 'Open sketch in IDE ',
                              'verify': 'Verify sketch',
                              'upload': 'Compile and Upload sketch'}

    #
    # Singleton creator and destructor
    #
    def __new__(cls, *args, **kwargs):
        """ Creating or returning the singleton instance. """
        if not cls.__singleton_instance__:
            # Create the singleton instance
            cls.__singleton_instance__ =\
                super(ServerCompilerSettings, cls).__new__(cls, *args, **kwargs)
            # Initialise the instance, defaults if file not found
            cls.__singleton_instance__.__initialise()
        return cls.__singleton_instance__

    def __initialise(self):
        # Create variables to be used with accessors
        self.__launch_IDE_option__ = False
        self.__compiler_dir__ = None
        self.__sketch_dir__ = None
        self.__sketch_name__ = None
        self.__arduino_board_key__ = None
        self.__arduino_board_value__ = None
        self.__serial_port_key__ = None
        self.__serial_port_value__ = None
        # Load settings from file
        self.read_settings()

    def _drop(self):
        """ Drop the instance. """
        self.__singleton_instance__ = None

    #
    # Compiler Directory accessors
    #
    def get_compiler_dir(self):
        return self.__compiler_dir__

    def set_compiler_dir(self, new_compiler_dir):
        """ The compiler dir must be full path to an .exe file. """
        # FIXME: this is a windows only check (.exe), needs to be
        #        updated to be compatible with linux and MacOS
        if os.path.exists(new_compiler_dir) and\
                new_compiler_dir.endswith('.exe'):
            self.__compiler_dir__ = new_compiler_dir
            print('\nCompiler directory set to: %s' % self.__compiler_dir__)
            self.save_settings()
        else:
            print('\nThe provided compiler path is not valid !!!')
            print('\t' + new_compiler_dir)
            if self.__compiler_dir__:
                print('Previous compiler path maintained:')
            else:
                print('Default compiler path set:')
                self.set_compiler_dir_default()
            print('\t' + self.__compiler_dir__)

    compiler_dir = property(get_compiler_dir, set_compiler_dir)

    def set_compiler_dir_default(self):
        self.__compiler_dir__ = 'C:\\IDEs\\arduino-1.6\\arduino.exe'

    #
    # Sketch name accessors
    #
    def get_sketch_name(self):
        return self.__sketch_name__

    def set_sketch_name(self, new_sketch_name):
        """ Only accept letters, numbers, underscores and dashes. """
        if re.match("^[\w\d_-]*$", new_sketch_name):
            self.__sketch_name__ = new_sketch_name
            print('\nSketch name set to: %s' % self.__sketch_name__)
            self.save_settings()
        else:
            print('\nProvided Sketch name is not valid: !!!')
            print('\t' + new_sketch_name)
            if self.__sketch_name__:
                print('Previous Sketch name maintained:')
            else:
                print('Default Sketch name set:')
                self.set_sketch_name_default()
            print('\t' + self.__sketch_name__)

    sketch_name = property(get_sketch_name, set_sketch_name)

    def set_sketch_name_default(self):
         self.__sketch_name__ = 'ArdublocklySketch'

    #
    #  Sketch Directory accessors
    #
    def get_sketch_dir(self):
        return self.__sketch_dir__

    def set_sketch_dir(self, new_sketch_dir):
        """ The sketch directory must be a folder """
        if os.path.isdir(new_sketch_dir):
            self.__sketch_dir__ = new_sketch_dir
            print('\nSketch directory set to: %s' % self.__sketch_dir__)
            self.save_settings()
        else:
            print('\nThe provided sketch directory is not valid !!!')
            print('\t' + new_sketch_dir)
            if self.__sketch_dir__:
                print('Previous Sketch directory maintained:')
            else:
                print('Default Sketch directory set:')
                self.set_sketch_dir_default()
            print('\t' + self.__sketch_dir__)

    sketch_dir = property(get_sketch_dir, set_sketch_dir)

    def set_sketch_dir_default(self):
        """ Sketch default location is the current working directory. """
        self.__sketch_dir__ = os.getcwd()

    #
    # Arduino Board and board lists accessors
    #
    def get_arduino_board(self):
        return self.__arduino_board_key__

    def set_arduino_board(self, new_board):
        if new_board in self.__arduino_types__:
            self.__arduino_board_value__ = self.__arduino_types__[new_board]
            self.__arduino_board_key__ = new_board
            print('\nArduino Board set to: %s' % self.__arduino_board_key__)
            self.save_settings()
        else:
            print('\nProvided Arduino Board does not exist: !!!')
            print('\t' + new_board)
            if self.__arduino_board_key__ and self.__arduino_board_value__:
                print('Previous Arduino board type maintained:')
            else:
                print('Default Arduino board type set:')
                self.set_arduino_board_default()
            print('\t' + self.__arduino_board_key__)

    arduino_board = property(get_arduino_board, set_arduino_board)

    def set_arduino_board_default(self):
        self.__arduino_board_key__ = sorted(self.__arduino_types__.keys())[0]
        self.__arduino_board_value__ = \
            self.__arduino_types__[self.__arduino_board_key__]

    def get_arduino_board_flag(self):
        return self.__arduino_board_value__

    def get_arduino_board_types(self):
        board_list = []
        for key in self.__arduino_types__:
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
        if not self.__serial_ports__:
            print('\nThere are no available Serial Ports !!!')
            self.__serial_port_key__ = None
            self.__serial_port_value__ = None
            self.save_settings()
        elif self.__serial_port_value__ not in self.__serial_ports__.values():
            print('\nThe selected Serial Port is no longer available !!!')
            self.__serial_port_key__ = None
            self.__serial_port_value__ = None
            self.save_settings()
        elif self.__serial_ports__[self.__serial_port_key__] != \
                self.__serial_port_value__:
            # At this point the dictionary is not empty and the value is
            # present, but not with the right key. So correct the key.
            for key, value in self.__serial_ports__.items():
                if self.__serial_port_value__ == value:
                    self.__serial_port_key__ = key
            # No need to save settings as only value saved and stays the same
        return self.__serial_port_key__

    def set_serial_port(self, new_port):
        """
        Checks available Serial Ports and populates the serial port dictionary.
        If the new serial port is not in the dictionary or the dictionary is
        empty it prints an error.
        :param new_port: the new port to set
        """
        # In this case first we'll check if the new value was present in the
        # dictionary, before we populate it again
        if new_port in self.__serial_ports__:
            self.__serial_port_value__ = self.__serial_ports__[new_port]
            self.__serial_port_key__ = new_port
            # Now we check if the Port is still available
            self.populate_serial_port_list()
            if not self.__serial_ports__:
                print('\nThere are no available Serial Ports !!!')
                self.__serial_port_key__ = None
                self.__serial_port_value__ = None
            elif self.__serial_port_value__ not in self.__serial_ports__.values():
                print('\nThe selected Serial Port is no longer available !!!')
                self.__serial_port_key__ = None
                self.__serial_port_value__ = None
            else:
                print('\nSerial Port set to: %s' % self.__serial_port_value__)
        else:
            print('\nProvided Serial Port is not valid: !!!')
            print('\t' + new_port)
            if self.__serial_port_key__ and self.__serial_port_value__:
                print('Previous Serial Port maintained:')
            else:
                print('Default Serial Port set:')
                self.set_serial_port_default()
            print('\t%s' % self.__serial_port_value__)
        # Whatever the result, save to the settings file
        self.save_settings()

    serial_port = property(get_serial_port, set_serial_port)

    def set_serial_port_default(self):
        """
        Checks available Serial Ports and populates the serial port dictionary.
        If there are no available serial ports is resets the variables.
        """
        self.populate_serial_port_list()
        if not self.__serial_ports__:
            self.__serial_port_key__ = None
            self.__serial_port_value__ = None
        else:
            self.__serial_port_key__ = sorted(self.__serial_ports__.keys())[0]
            self.__serial_port_value__ = \
                self.__serial_ports__[self.__serial_port_key__]

    def get_serial_port_flag(self):
        """
        Checks available Serial Ports and populates the serial port dictionary.
        Returns currently selected Serial Port value if available.
        Returns None if selected Serial Port is not available anymore.
        :return: Serial Port dictionary value
        """
        self.populate_serial_port_list()
        if not self.__serial_ports__:
            print('\nThere are no available Serial Ports !!!')
            self.__serial_port_key__ = None
            self.__serial_port_value__ = None
            self.save_settings()
        elif self.__serial_port_value__ not in self.__serial_ports__.values():
            print('\nThe selected Serial Port is no longer available !!!')
            self.__serial_port_key__ = None
            self.__serial_port_value__ = None
            self.save_settings()
        elif self.__serial_ports__[self.__serial_port_key__] != \
                self.__serial_port_value__:
            # At this point the dictionary is not empty and the flag
            # (dictionary value) is present, but not with the right key.
            # So correct the key.
            for key, value in self.__serial_ports__.items():
                if self.__serial_port_value__ == value:
                    self.__serial_port_key__ = key
            # No need to save settings as only value saved and stays the same
        return self.__serial_port_value__

    def get_serial_ports(self):
        self.populate_serial_port_list()
        return self.__serial_ports__

    def populate_serial_port_list(self):
        """
        Populates the __serial_ports__ dictionary with the Serial Ports
        available.
        """
        port_list = ArduinoServerCompiler.SerialPort.get_port_list()
        self.__serial_ports__ = {}
        if port_list:
            port_id = 0
            for item in port_list:
                id_string = 'port' + str(port_id)
                self.__serial_ports__.update({id_string: item})
                port_id += 1

    #
    # Launch the IDE only  accessors
    #
    def get_launch_ide(self):
        return self.__launch_IDE_option__

    def set_launch_ide(self, new_launch_option):
        if new_launch_option in self.__IDE_launch_options__:
            self.__launch_IDE_option__ = new_launch_option
            print('\nIDE options set to: %s' % self.__launch_IDE_option__)
            self.save_settings()
        else:
            print('\nThe provided "Launch IDE option" is not valid !!!')
            print('\t' + new_launch_option)
            if self.__launch_IDE_option__:
                print('Previous "Launch IDE option" maintained:')
            else:
                print('Default "Launch IDE option" set:')
                self.set_launch_ide_default()
            print('\t' + self.__launch_IDE_option__)

    launch_IDE_option = property(get_launch_ide, set_launch_ide)

    def set_launch_ide_default(self):
        self.__launch_IDE_option__ = \
            sorted(self.__IDE_launch_options__.keys())[0]

    def get_launch_ide_options(self):
        return self.__IDE_launch_options__

    #
    # Sets all the settings to default values
    #
    def set_default_settings(self):
        self.set_launch_ide_default()
        self.set_compiler_dir_default()
        self.set_sketch_dir_default()
        self.set_sketch_name_default()
        self.set_serial_port_default()
        self.set_arduino_board_default()

    #
    # Settings file
    #
    def save_settings(self):
        """ Saves the settings in a configuration file """
        settings_parser = ConfigParser.ConfigParser()
        # IDE Section
        settings_parser.add_section('Arduino_IDE')
        settings_parser.set(
            'Arduino_IDE', 'arduino_exec_path', self.compiler_dir)
        settings_parser.set(
            'Arduino_IDE', 'arduino_board', self.arduino_board)
        settings_parser.set(
            'Arduino_IDE', 'arduino_serial_port', self.__serial_port_value__)
        # Sketch section
        settings_parser.add_section('Arduino_Sketch')
        settings_parser.set(
            'Arduino_Sketch', 'sketch_name', self.sketch_name)
        settings_parser.set(
            'Arduino_Sketch', 'sketch_directory', self.sketch_dir)

        # Set the path and create/overwrite the file
        try:
            settings_file = open(self.get_settings_file_path(), 'w')
            settings_parser.write(settings_file)
            settings_file.close()
            print('\nSettings file saved to:')
        except Exception as e:
            print(e)
            print('\nUnable to write the settings file to:')
        print('\t' + self.get_settings_file_path())

    def read_settings(self):
        """
        Attempts to read the settings from a file and saves them to the
        member variables. If it cannot read the file it sets the variables
        to the default value.
        """
        settings_dict = self.read_settings_file()
        if settings_dict:
            #try:
            self.compiler_dir = settings_dict['arduino_exec_path']
            self.arduino_board = settings_dict['arduino_board']
            self.serial_port = settings_dict['arduino_serial_port']
            self.sketch_name = settings_dict['sketch_name']
            self.sketch_dir = settings_dict['sketch_directory']
        else:
            print('\nSettings will be set to the default values.')
            self.set_default_settings()
            self.save_settings()

        # Printing the settings to be able to easily spot issues at load
        print('\nFinal settings loaded:')
        print('\tCompiler directory: %s' % self.__compiler_dir__)
        print('\tArduino Board Key: %s' % self.__arduino_board_key__)
        print('\tArduino Board Value: %s' % self.__arduino_board_value__)
        print('\tSerial Port Value: %s' % self.__serial_port_value__)
        print('\tSketch Name: %s' % self.__sketch_name__)
        print('\tSketch Directory: %s' % self.__sketch_dir__)
        print('\tLaunch IDE option: %s' % self.__launch_IDE_option__)

    def read_settings_file(self):
        """
        Creates a dictionary from the settings stored in a file.
        :return: A dictionary with all the options and values from the settings
                 file (sections are ignored during parsing).
        """
        settings_dict = {}
        settings_parser = ConfigParser.ConfigParser()
        try:
            settings_parser.read(self.get_settings_file_path())
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
            print('\nSettings loaded from:')
        except Exception as e:
            print('\nSettings file corrupted or not found in:')
            settings_dict = None
        print('\t' + self.get_settings_file_path())
        return settings_dict

    def delete_settings_file(self):
        if os.path.exists(self.get_settings_file_path()):
            os.remove(self.get_settings_file_path())

    def get_settings_file_path(self):
        """
        Returns the settings file path or creates the path if not invoked before.
        The file is saved in the same directory as this python source code file.
        :return: path to the settings file
        """
        if not self.__settings_path__:
            self.__settings_path__ = os.path.join(
                os.path.dirname(__file__), self.__settings_filename__)
        return self.__settings_path__

    def get_board_value_from_key(self, string_key):
        """
        As the board types are stored in a dictionary, the key and value for
        the selected board are stored independently in 2 strings. This method
        gets the dictionary value from a given key.
        :param string_key: String representing the board_types dictionary key
        :return: A string representation of board_types dictionary value from
                 the key.
        """
        string_value = None
        for key in self.__arduino_types__:
            if string_key is key:
                string_value = self.__arduino_types__[key]
        return string_value

    def get_board_key_from_value(self, string_value):
        """
        As the board types are stored in a dictionary, the key and value for
        the selected board are stored independently in 2 strings. This method
        gets the dictionary key from a given value.
        :param string_value: String representing the board_types dictionary
                             value to be found.
        :return: A string representation of board_types dictionary key for
                 the given value.
        """
        string_key = None
        for key in self.__arduino_types__:
            if string_value is self.__arduino_types__[key]:
                string_key = key
        return string_key


def main():
    """ This should never be executed """
    print("This is the ServerCompilerSettings main")


if __name__ == '__main__':
    main()

from __future__ import unicode_literals, absolute_import
import subprocess
import json
import cgi
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

from ArduinoServerCompiler.Py23Compatibility import Py23Compatibility
from ArduinoServerCompiler.ServerCompilerSettings import ServerCompilerSettings
from ArduinoServerCompiler.SketchCreator import SketchCreator


class BlocklyRequestHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    """
    Simple Python HTTP request handler to pass over the AJAX requests.
    """

    def do_POST(self):
        """
        Serves the POST request, using form-like data
        """
        message_back = ''
        parameters = None
        content_type, parameters_dict = cgi.parse_header(
            self.headers.getheader('content-type'))
        content_length = int(self.headers.getheader('content-length'))

        if content_type == 'application/x-www-form-urlencoded':
            parameters = urlparse.parse_qs(
                self.rfile.read(content_length), keep_blank_values=False)
        elif content_type == 'text/plain':
            data_string = self.rfile.read(content_length)
            try:
                message_back = '//Python test\n\r' + data_string
            except Exception as e:
                print(e)
                print('\nThere was an error manipulating the plain text data!!!')
        else:
            print('\nError, content type not recognised: ' + str(content_type))
            self.send_response(404, "Ups, not found!")
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write('Error: invalid content type')
            return

        if message_back != '':
            handle_sketch(message_back)

        if parameters:
            message_back = handle_settings(parameters)

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(message_back)


#################
# Main Handlers #
#################
def handle_sketch(sketch_code):
    sketch_path = create_sketch_from_string(sketch_code)
    load_sketch(sketch_path)


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
                message_back = get_compiler_path()
            elif str(parameters[key]) == "['set']":
                message_back = set_compiler_path()
        # Sketch
        elif str(key) == 'sketch':
            if str(parameters[key]) == "['get']":
                message_back = get_sketch_path()
            elif str(parameters[key]) == "['set']":
                message_back = set_sketch_path()
        # Arduino Board
        elif str(key) == 'board':
            if str(parameters[key]) == "['get']":
                message_back = get_arduino_boards()
            elif str(parameters[key]) == "['set']":
                value = _get_value(parameters)
                value = re.sub(r'^\[\'', '', value)
                value = re.sub(r'\'\]', '', value)
                message_back = set_arduino_board(value)
        # Serial port
        elif str(key) == 'serial':
            if str(parameters[key]) == "['get']":
                message_back = get_serial_ports()
            elif str(parameters[key]) == "['set']":
                value = _get_value(parameters)
                value = re.sub(r'^\[\'', '', value)
                value = re.sub(r'\'\]', '', value)
                message_back = set_serial_port(value)
        # Launch Only Options
        elif str(key) == 'ide':
            if str(parameters[key]) == "['get']":
                message_back = get_load_ide_only()
            elif str(parameters[key]) == "['set']":
                value = _get_value(parameters)
                value = re.sub(r'^\[\'', '', value)
                value = re.sub(r'\'\]', '', value)
                message_back = set_load_ide_only(value)
        # The Value parameter is only used in some cases
        elif str(key) == 'value':
            pass
        # Parameter not recognised
        else:
            print('The "' + str(key) + '" = ' + str(parameters[key]) +
                  ' parameter is not recognised!')
    return message_back


#######################################
# Sketch loading to Arduino functions #
#######################################
def load_sketch(sketch_path=None):
    """
    Launches a command line that invokes the Arduino IDE to open and/or
    load an sketch, which address is indicated in the input parameter
    """
    # Input sanitation
    if not isinstance(sketch_path, Py23Compatibility.string_type_compare) \
            or not sketch_path:
        sketch_path = create_sketch_default()

    # Concatenates the command string
    cli_command = [ServerCompilerSettings().compiler_dir]
    if ServerCompilerSettings().launch_IDE_option == 'upload':
        cli_command.append('--upload')
        cli_command.append('--port')
        cli_command.append(ServerCompilerSettings().get_serial_port_flag())
        cli_command.append('--board')
        cli_command.append(ServerCompilerSettings().get_arduino_board_flag())
    elif ServerCompilerSettings().launch_IDE_option == 'verify':
        cli_command.append('--verify')
    cli_command.append(sketch_path)
    #cli_command = ' '.join(cli_command)
    print('CLI command:')
    print(cli_command)
    #TODO: catch errors
    process = subprocess.Popen(
        cli_command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        shell=False)
    (out, error) = process.communicate()
    print('program output:\n' + out)
    print('Error output:\n' + error)
    print('Exit code: ' + str(process.returncode))


def create_sketch_default():
    return SketchCreator().create_sketch()


def create_sketch_from_string(sketch_code):
    return SketchCreator().create_sketch(sketch_code)


######################################
# Dealing with Directories and files #
######################################
def browse_file():
    """
    Opens a file browser and selects executable files
    :return: Full path to selected file
    """
    #TODO: Manually set to filder .exe files, need to make it compatible
    #      with other OSes
    root = Tkinter.Tk()
    # Make window almost invisible to focus it and ensure directory browser
    # doesn't end up loading in the background behind main window.
    root.withdraw()
    root.overrideredirect(True)
    root.geometry('0x0+0+0')
    root.deiconify()
    root.lift()
    root.focus_force()
    types = [('Executable', '.exe'), ('All Files', '*')]
    file_path = tkFileDialog.askopenfilename(filetypes=types)
    root.destroy()
    return file_path


def browse_dir():
    """
    Opens a directory browser to select a folder.
    :return: Full path to the selected folder
    """
    root = Tkinter.Tk()
    # Make window almost invisible to focus it and ensure directory browser
    # doesn't end up loading in the background behind main window.
    root.withdraw()
    root.overrideredirect(True)
    root.geometry('0x0+0+0')
    root.deiconify()
    root.lift()
    root.focus_force()
    file_path = tkFileDialog.askdirectory(
        parent=root, initialdir="/", title='Please select a directory')
    root.destroy()
    return file_path


#####################
# Compiler Settings #
#####################
def set_compiler_path():
    """
    Open the file browser to select a file. Saves this filepath into
    ServerCompilerSettings and if the filepath is different to that stored
    already it triggers the new data to be saved into the settings file.
    """
    old_path = get_compiler_path()
    new_path = browse_file()

    if new_path != '':
        ServerCompilerSettings().compiler_dir = new_path
        new_path = get_compiler_path()
        if old_path != new_path:
            ServerCompilerSettings().save_settings()

    return get_compiler_path()


def get_compiler_path():
    """
    Create a JSON string to return to the page with the following format:
    {"setting_type" : "compiler",
     "element" : "text_input",
     "display_text" : "Compiler Directory"}
    """
    json_data = {'setting_type': 'compiler',
                 'element': 'text_input',
                 'display_text': ServerCompilerSettings().compiler_dir}
    return json.dumps(json_data)


###################
# Sketch settings #
###################
def set_sketch_path():
    """
    Open the directory browser to select a file. Saves this directory into
    ServerCompilerSettings and if the directory is different to that stored
    already it triggers the new data to be saved into the settings file.
    """
    old_directory = get_sketch_path()
    new_directory = browse_dir()
    if new_directory != '':
        ServerCompilerSettings().sketch_dir = new_directory
        new_directory = get_sketch_path()
        if old_directory != new_directory:
            ServerCompilerSettings().save_settings()

    return new_directory


def get_sketch_path():
    """
    Create a JSON string to return to the page with the following format:
    {"setting_type" : "sketch",
     "element" : "text_input",
     "display_text" : "Sketch Directory"}
    """
    json_data = {'setting_type': 'compiler',
                 'element': 'text_input',
                 'display_text': ServerCompilerSettings().sketch_dir}
    return json.dumps(json_data)


##########################
# Arduino Board settings #
##########################
def set_arduino_board(new_value):
    ServerCompilerSettings().arduino_board = new_value
    return get_arduino_boards()


def get_arduino_boards():
    """
    Create a JSON string to return to the page with the following format:
    {"setting_type" : "board",
     "element" : "dropdown",
     "options" : [
         {"value" : "XXX", "text" : "XXX"},
         ...]
     "selected": "selected key"}
    """
    json_data = \
        {'setting_type': 'ide',
         'element': 'dropdown',
         'options': []}
    boards = ServerCompilerSettings().get_arduino_board_types()
    for item in boards:
        json_data['options'].append(
            {'value': item, 'display_text': item})
    json_data.update({'selected': ServerCompilerSettings().arduino_board})
    return json.dumps(json_data)


########################
# Serial Port settings #
########################
def set_serial_port(new_value):
    ServerCompilerSettings().serial_port = new_value
    return get_serial_ports()


def get_serial_ports():
    """
    Create a JSON string to return to the page with the following format:
    {"setting_type" : "serial",
     "element" : "dropdown",
     "options" : [
         {"value" : "XXX", "text" : "XXX"},
         ...]
     "selected": "selected key"}
    """
    json_data = \
        {'setting_type': 'ide',
         'element': 'dropdown',
         'options': []}
    ports = ServerCompilerSettings().get_serial_ports()
    if not ports:
        json_data['options'].append({
            'value': 'no_ports',
            'display_text': 'There are no available Serial Ports'})
        json_data.update({'selected': 'no_ports'})
    else:
        for key in ports:
            json_data['options'].append(
                {'value': key, 'display_text': ports[key]})
        json_data.update({'selected': ServerCompilerSettings().serial_port})
    return json.dumps(json_data)


#######################
# Launch IDE settings #
#######################
def set_load_ide_only(new_value):
    ServerCompilerSettings().launch_IDE_option = new_value
    return get_load_ide_only()


def get_load_ide_only():
    """
    Create a JSON string to return to the page with the following format:
    {"setting_type" : "ide",
     "element" : "dropdown",
     "options" : [
         {"value" : "XXX", "text" : "XXX"},
         ...]
     "selected": "selected key"}
    """
    json_data = \
        {'setting_type': 'ide',
         'element': 'dropdown',
         'options': []}
    ide_options = ServerCompilerSettings().get_launch_ide_options()
    for key in ide_options:
        json_data['options'].append(
            {'value': key, 'display_text': ide_options[key]})
    json_data.update({'selected': ServerCompilerSettings().launch_IDE_option})
    return json.dumps(json_data)


########
# Main #
########
def main():
    print("This is the BlocklyRequestHandler main.")


if __name__ == "__main__":
    main()

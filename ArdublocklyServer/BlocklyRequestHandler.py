from __future__ import unicode_literals, absolute_import
import subprocess
import time
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
        message_back = None
        content_type, parameters_dict = cgi.parse_header(
            self.headers.get("Content-type"))
        content_length = int(self.headers.get('content-length'))

        if content_type == 'application/x-www-form-urlencoded':
            parameters = urlparse.parse_qs(
                Py23Compatibility.b_unicode(self.rfile.read(content_length)),
                keep_blank_values=False)
            message_back = handle_settings(parameters)
        elif content_type == 'text/plain':
            data_string = self.rfile.read(content_length)
            try:
                # At this point message back should contain a normal string
                # with the sketch code
                message_back =\
                    '// Ardublockly generated sketch\n\r' + data_string
            except Exception as e:
                print(e)
                print('\nThere was an error manipulating the sketch data!!!')
            # Returning data is a JSON string with the Arduino CLI output
            message_back = handle_sketch(message_back)
        else:
            print('\nError, content type not recognised: ' + str(content_type))
            self.send_response(404, "Ups, not found!")
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write('Error: invalid content type')
            return

        # Responding
        if message_back:
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(message_back.encode("utf-8"))

    def log_request(self, code='-', size='-'):
        """
        Log an accepted request.
        This is called by send_response(), and printed to the stderr by
        log_message. No need to fill the command line with successful responses,
        so only print any non 200.
        :param code:
        :param size:
        :return:
        """
        if code != 200:
            self.log_message('"%s" %s %s',
                             self.requestline, str(code), str(size))


#################
# Main Handlers #
#################
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


def handle_sketch(sketch_code):
    """
    Creates an Arduino Sketch and invokes the Arduino CLI.
    Creates a JSON string to return to the page with the following format:
    {"response_type": "ide_output",
     "element" : "div_ide_output",
     "success" : "true",
     "conclusion" : Short text as main conclusion,
     "output" : Output string,
     "error_output" : Output string,
     "exit_code": Exit code}
    """
    sketch_path = create_sketch_from_string(sketch_code)
    success, conclusion, out, error, exit_code = load_arduino_cli(sketch_path)
    json_data = \
        {'response_type': 'ide_output',
         'element': 'div_ide_output',
         'success': success,
         'conclusion': conclusion,
         'output': out,
         'error_output': error,
         'exit_code': exit_code}
    return json.dumps(json_data)


#######################################
# Sketch loading to Arduino functions #
#######################################
def load_arduino_cli(sketch_path=None):
    """
    Launches a command line that invokes the Arduino IDE to open, verify or
    upload an sketch, which address is indicated in the input parameter
    :return: A tuple with the following data (output, error output, exit code)
    """
    # Input sanitation and output defaults
    if not isinstance(sketch_path, Py23Compatibility.string_type_compare) \
            or not sketch_path:
        sketch_path = create_sketch_default()
    success = True
    conclusion = ''
    error = ''
    out = ''
    exit_code = ''

    # Check if CLI flags have been set
    if not ServerCompilerSettings().compiler_dir:
        success = False
        conclusion = 'Unable to find Arduino IDE'
        error = 'The compiler directory has not been set.\n\r' + \
                'Please set it in the Settings.'
    else:
        if not ServerCompilerSettings().launch_IDE_option:
            success = False
            conclusion = 'What should we do with the Sketch?'
            error = 'The launch IDE option has not been set.n\r' + \
                    'Please select an IDE option in the Settings.'
        elif ServerCompilerSettings().launch_IDE_option == 'upload':
            if not ServerCompilerSettings().get_serial_port_flag():
                success = False
                conclusion = 'Serial Port unavailable'
                error = 'The Serial Port does not exist.\n\r' + \
                        'Please check if the Arduino is correctly ' + \
                        'connected to the PC and select the Serial Port in ' +\
                        'the Settings.'
            if not ServerCompilerSettings().get_arduino_board_flag():
                success = False
                conclusion = 'Unknown Arduino Board'
                error = 'The Arduino Board has not been set.\n\r' + \
                        'Please select the appropriate Arduino Board from ' + \
                        'the settings.'

    if success:
        # Concatenates the CLI command and execute if the flags are valid
        cli_command = [ServerCompilerSettings().compiler_dir]
        if ServerCompilerSettings().launch_IDE_option == 'upload':
            conclusion = 'Successfully Uploaded Sketch'
            cli_command.append('--upload')
            cli_command.append('--port')
            cli_command.append(ServerCompilerSettings().get_serial_port_flag())
            cli_command.append('--board')
            cli_command.append(
                ServerCompilerSettings().get_arduino_board_flag())
        elif ServerCompilerSettings().launch_IDE_option == 'verify':
            conclusion = 'Successfully Verified Sketch'
            cli_command.append('--verify')
        cli_command.append(sketch_path)
        #cli_command = ' '.join(cli_command)
        print('\n\rCLI command:')
        print(cli_command)

        if ServerCompilerSettings().launch_IDE_option == 'open':
            # Launch Arduino IDE in a subprocess without blocking server
            subprocess.Popen(cli_command, shell=False)
            conclusion = 'Sketch opened in IDE'
            out = 'The sketch should be loaded in the Arduino IDE.'
            # Wait a few seconds to allow IDE to launch before sending back data
            time.sleep(2)
        else:
            # Launch the Arduino CLI in a subprocess and capture output data
            process = subprocess.Popen(
                cli_command,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                shell=False)
            (out, error) = process.communicate()
            exit_code = str(process.returncode)
            print('Arduino output:\n' + out)
            print('Arduino Error output:\n' + error)
            print('Arduino Exit code: ' + exit_code)
            # For some reason Arduino CLI can return 256 on success
            if (process.returncode != 0) and (process.returncode != 256):
                success = False
                if exit_code == str(1):
                    conclusion = 'Build or Upload failed'
                if exit_code == str(2):
                    conclusion = 'Sketch not found'
                if exit_code == str(3):
                    conclusion = 'Invalid command line argument'
                if exit_code == str(4):
                    conclusion =\
                        'Preference passed to "get-pref" flag does not exist'

    return success, conclusion, out, error, exit_code


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
    root = Tkinter.Tk()
    # Make window almost invisible to focus it and ensure directory browser
    # doesn't end up loading in the background behind main window.
    root.withdraw()
    root.overrideredirect(True)
    root.geometry('0x0+0+0')
    root.deiconify()
    root.lift()
    root.focus_force()
    root.update()
    file_path = tkFileDialog.askopenfilename()
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
    Opens the file browser to select a file. Saves this filepath into
    ServerCompilerSettings and if the filepath is different to that stored
    already it triggers the new data to be saved into the settings file.
    """
    new_path = browse_file()
    if new_path != '':
        ServerCompilerSettings().compiler_dir = new_path
    return get_compiler_path()


def get_compiler_path():
    """
    Creates a JSON string to return to the page with the following format:
    {"response_type" : "settings_compiler",
     "element" : "text_input",
     "display_text" : "Compiler Directory"}
    """
    compiler_directory = ServerCompilerSettings().compiler_dir
    if not compiler_directory:
        compiler_directory = 'Please select a valid Arduino compiler directory'
    json_data = {'setting_type': 'compiler',
                 'element': 'text_input',
                 'display_text': compiler_directory}
    return json.dumps(json_data)


###################
# Sketch settings #
###################
def set_sketch_path():
    """
    Opens the directory browser to select a file. Saves this directory into
    ServerCompilerSettings and if the directory is different to that stored
    already it triggers the new data to be saved into the settings file.
    """
    new_directory = browse_dir()
    if new_directory != '':
        ServerCompilerSettings().sketch_dir = new_directory
    return get_sketch_path()


def get_sketch_path():
    """
    Creates a JSON string to return to the page with the following format:
    {"response_type" : "settings_sketch",
     "element" : "text_input",
     "display_text" : "Sketch Directory"}
    """
    sketch_directory = ServerCompilerSettings().sketch_dir
    if not sketch_directory:
        sketch_directory = 'Please select a valid Sketch directory.'
    json_data = {'setting_type': 'compiler',
                 'element': 'text_input',
                 'display_text': sketch_directory}
    return json.dumps(json_data)


##########################
# Arduino Board settings #
##########################
def set_arduino_board(new_value):
    ServerCompilerSettings().arduino_board = new_value
    return get_arduino_boards()


def get_arduino_boards():
    """
    Creates a JSON string to return to the page with the following format:
    {"response_type" : "settings_board",
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
    #TODO: Check for None, however won't happen because static dict in settings
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
    Creates a JSON string to return to the page with the following format:
    {"response_type" : "settings_serial",
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
    Creates a JSON string to return to the page with the following format:
    {"response_type" : "settings_ide",
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
    #TODO: Check for None, however won't happen because static dict in settings
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

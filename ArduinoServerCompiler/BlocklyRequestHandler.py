from __future__ import unicode_literals, absolute_import
import os
import cgi

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
            #print(parameters)
            #for key in parameters:
            #    print(str(key) + ": " + str(parameters[key]))
            #parameters = cgi.FieldStorage(
            #    fp=self.rfile,
            #    headers=self.headers,
            #    environ={'REQUEST_METHOD':'POST',
            #             'CONTENT_TYPE':self.headers['Content-Type'], })
            #for item in parameters.list:
            #    print(item)
        elif content_type == 'text/plain':
            data_string = self.rfile.read(content_length)
            try:
                message_back = '//Python test\n\r' + data_string
            except Exception as e:
                print(e)
                print('\nThere was an error manipulating the plain text data!!!')
        else:
            print('\nError, content type not recognised: ' + str(content_type))
            self.send_response(404, "Upps, not found!")
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write('Error: invalid content type')
            return

        if message_back != '':
            handle_sketch(message_back)

        if parameters:
            message_back = handle_settings(parameters)

        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
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
        # TODO: Arduino Board
        # TODO: COM Port
        # Load Only IDE
        elif str(key) == 'ideOnly':
            if str(parameters[key]) == "['get']":
                message_back = get_load_ide_only()
                print('ideO: ' + message_back)
            elif str(parameters[key]) == "['set']":
                value = _get_value(parameters)
                if value == "['True']":
                    message_back = set_load_ide_only(True)
                else:
                    message_back = set_load_ide_only(False)
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
    command_line_command = ServerCompilerSettings().compiler_dir + ' '
    if not ServerCompilerSettings().launch_IDE_only:
        command_line_command += '--upload '
        command_line_command += '--port ' + \
            ServerCompilerSettings().com_port + ' '
        command_line_command += '--board ' + \
            ServerCompilerSettings().get_arduino_board_flag() + ' '
    command_line_command += '"' + sketch_path + '"'
    print('Command line command:\n\t' + command_line_command)
    os.system(command_line_command)


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

    return new_path


def get_compiler_path():
    return ServerCompilerSettings().compiler_dir


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
    return ServerCompilerSettings().sketch_dir


############################
# Launch IDE only settings #
############################
def set_load_ide_only(new_value):
    ServerCompilerSettings().launch_IDE_only = new_value
    return get_load_ide_only()


def get_load_ide_only():
    return str(ServerCompilerSettings().launch_IDE_only)


########
# Main #
########
def main():
    print("This is the BlocklyRequestHandler main.")


if __name__ == "__main__":
    main()

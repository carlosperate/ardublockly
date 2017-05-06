#!/usr/bin/env python
# -*- coding: utf-8 -*- #
#
# Builds the Ardublockly Python portion of the app for Linux or OS X.
#
# Copyright (c) 2017 carlosperate https://github.com/carlosperate/
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
#
# IMPORTANT: This script is designed to be located one directory level under
#            the project root folder.
#
# This script file uses PyInstaller to create a self contained executable
# build of the Ardublockly application.
# It will remove the build folders left from PyInstaller and move the folder
# with the executable application into the project root folder.
#
# Due to all the debugging steps required to get a CI serve running properly
# this script ended up being quite verbose. In might be updated in the future
# to include a -v flag to select a verbose mode.
from __future__ import unicode_literals, absolute_import, print_function
import os
import sys
import shutil
import platform
import subprocess

# The project_root_dir depends on the location of this file, so it cannot be
# moved without updating this line
project_root_dir = \
    os.path.dirname(                                  # going up 1 level
        os.path.dirname(os.path.realpath(__file__)))  # folder dir of this
sys.path.append(project_root_dir)


spec_coll_name = "server"
exec_folder_name = "arduexec"
py_exec_folder = os.path.join(exec_folder_name, spec_coll_name)
script_tag = "[Ardublockly build] "
script_tab = "                    "


def remove_directory(dir_to_remove):
    """ :param dir_to_remove: Directory to remove. """
    if os.path.exists(dir_to_remove):
        print(script_tab + "Removing directory %s" % dir_to_remove)
        shutil.rmtree(dir_to_remove)
    else:
        print(script_tab + "Directory %s was not found." % dir_to_remove)


def get_os():
    """
    Gets the OS to based on the command line argument of the platform info.
    Only possibilities are: "windows", "mac", "linux"
    """
    valid_os = ["windows", "linux", "mac"]

    print(script_tab + "Checking for command line argument indicated OS.")
    if len(sys.argv) > 1:
        if sys.argv[1] in valid_os:
            # Take the first argument and use it as the os
            print(script_tab + "Valid command line argument found: %s" %
                  sys.argv[1])
            return "%s" % sys.argv[1]
        else:
            print(script_tab + "Invalid command line argument found: %s" %
                  sys.argv[1])
            print(script_tab + "Options available: %s" % valid_os)

    print(script_tab + "Valid command line arg not found, checking system.")

    os_found = platform.system()
    if os_found == "Windows":
        os_found = valid_os[0]
    elif os_found == "Linux":
        os_found = valid_os[1]
    elif os_found == "Darwin":
        os_found = valid_os[2]
    else:
        raise SystemExit("Exit: OS data found is invalid '%s'" % os_found)
    print(script_tab + "OS found is: %s" % os_found)
    return os_found


def remove_pyinstaller_temps():
    """
    Removes the temporary folders created by PyInstaller (dist and build).
    """
    remove_directory(os.path.join(os.getcwd(), "dist"))
    remove_directory(os.path.join(os.getcwd(), "build"))


def pyinstaller_build():
    """
    Launches a subprocess running Python PyInstaller with the spec file from
    the package folder. Captures the output streams and checks for errors.
    :return: Boolean indicating the success state of the operation.
    """
    process_args = ["pyinstaller",
                    "%s" % os.path.join("package", "pyinstaller.spec")]
    print(script_tab + "Command: %s" % process_args)

    pyinstaller_process = subprocess.Popen(process_args)
    _, _ = pyinstaller_process.communicate()

    if pyinstaller_process.returncode != 0:
        print(script_tab + "ERROR: PyInstaller returned with exit code: %s" %
              pyinstaller_process.returncode)
        return False

    return True


def move_executable_folder():
    """
    Moves the PyInstaller executable folder from dist to project root.
    :return: Boolean indicating the success state of the operation.
    """
    original_exec_dir = os.path.join(project_root_dir, "dist", spec_coll_name)
    final_exec_dir = os.path.join(project_root_dir, py_exec_folder)
    if os.path.exists(original_exec_dir):
        print(script_tab + "Moving exec files from %s" % original_exec_dir)
        print(script_tab + "to %s" % final_exec_dir)
        shutil.move(original_exec_dir, final_exec_dir)
    else:
        print(script_tab + "ERROR: PyInstaller executable output folder "
              "'%s' not found!" % original_exec_dir)
        return False
    return True


def copy_data_files(os_type):
    """ At the moment there are no additional data files required to copy """
    pass


def create_shell_file(os_type):
    """
    Creates a shell or batch script file into the project root to be able to
    easily launch the Ardublockly application.
    The Mac OS X build runs directly from clicking the .app folder, so it no
    longer needs a shell script.
    """
    # The script depends on platform
    if os_type == "linux":
        shell_text = '#!/bin/bash\n' \
                     'DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )\n' \
                     'echo "[Shell Launch Script] Executing from: $DIR"\n' \
                     './%s' % os.path.join(exec_folder_name, "ardublockly")
        shell_location = os.path.join(project_root_dir, "ardublockly_run.sh")
    elif os_type == "windows":
        shell_text = "@echo off\n" + \
                     "start %s" % os.path.join(exec_folder_name,
                                               "ardublockly.exe")
        shell_location = os.path.join(project_root_dir, "ardublockly_run.bat")
    else:
        # macOS doesn't need a shell file, any other OS type is unexpected
        print(script_tab + "No shell file created.")
        return

    print(script_tab + "Creating shell file into %s" % shell_location)
    try:
        with open(shell_location, "w") as bash_file:
            bash_file.write(shell_text)
    except Exception as e:
        print(script_tab + "%s" % e)
        print(script_tab + "ERROR: Shell file to launch the Ardublockly "
                           "application could not be created.")
        return

    if os_type == "linux":
        # Make shell script executable by launching a subprocess
        process_args = ["chmod", "+x", "%s" % shell_location]
        print(script_tab + "Command to make executable: %s" % process_args)
        try:
            _, _ = subprocess.Popen(process_args).communicate()
        except Exception as e:
            print(script_tab + "%s" % e)
            print(script_tab + "ERROR: Could not make Shell file executable.")


def build_ardublockly():
    print(script_tag + "Build procedure started.")
    print(script_tag + "Checking for OS.")
    os_type = get_os()
    print(script_tag + "Building Ardublockly for %s." % os_type)

    print(script_tag + "Project directory is:     %s" % project_root_dir)
    print(script_tag + "Script working directory: %s" % os.getcwd())

    print(script_tag + "Removing PyInstaller old temp directories.")
    remove_pyinstaller_temps()

    print(script_tag + "Running PyInstaller process.")
    success = pyinstaller_build()
    if not success:
        print(script_tab + "Removing PyInstaller recent temp directories.")
        remove_pyinstaller_temps()
        raise SystemExit(script_tab + "Exiting as there was an error in the "
                                      "PyInstaller execution.")

    print(script_tag + "Removing old ardublockly executable directory.")
    remove_directory(os.path.join(project_root_dir, py_exec_folder))

    print(script_tag + "Moving executable folder to project root.")
    success = move_executable_folder()
    if not success:
        print(script_tab + "Removing PyInstaller recent temp directories.")
        remove_pyinstaller_temps()
        raise SystemExit(script_tab + "Exiting now as there was an error in "
                                      "the PyInstaller execution.")

    print(script_tag + "Coping data files into executable directory.")
    copy_data_files(os_type)

    print(script_tag + "Removing PyInstaller recent temp directories.")
    remove_pyinstaller_temps()

    print(script_tag + "Creating shell file to easily execute Ardublockly.")
    create_shell_file(os_type)


if __name__ == "__main__":
    build_ardublockly()

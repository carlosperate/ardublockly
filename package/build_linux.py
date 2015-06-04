#!/usr/bin/env python2
# -*- coding: utf-8 -*- #
#
# Builds the Ardublockly application for Linux.
#
# Copyright (c) 2015 carlosperate https://github.com/carlosperate/
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# IMPORTANT: This script is designed to be located one directory level under the
#            project root folder.
#
# This script file uses PyInstaller to create a self contained executable
# build of the Ardublockly application.
# It will remove the build folders left from PyInstaller and move the folder
# with the executable application into the project root folder.
#
# Due to all the debugging required to get a CI serve running properly this
# script ended up being quite verbose. In might be updated in the future to
# include a -v flag to select a verbose mode.
from __future__ import unicode_literals, print_function
import os
import shutil
import subprocess
import cefpython3
from glob import glob

# The project_root_dir depends on the location of this file, so it cannot be
# moved without updating this line
project_root_dir = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
exec_folder_name = "arduexec"
script_tag = "[Ardublockly build] "
script_tab = "                    "


#verboseprint = print if verbose else lambda *a, **k: None


def remove_pyinstaller_temps():
    """ Removes the temporary folders created by PyInstaller. """
    dist_dir = os.path.join(os.getcwd(), "dist")
    if os.path.exists(dist_dir):
        print(script_tab + "Removing %s folder." % dist_dir)
        shutil.rmtree(dist_dir)
    else:
        print(script_tab + "No dist %s found." % dist_dir)

    build_dir = os.path.join(os.getcwd(), "build")
    if os.path.exists(build_dir):
        print(script_tab + "Removing %s folder." % build_dir)
        shutil.rmtree(build_dir)
    else:
        print(script_tab + "No %s folder found." % build_dir)


def pyinstaller_build():
    """
    Launches a subprocess running Python PyInstaller with the spec file from the
    package folder. Captures the output streams and checks for errors.
    :return: Boolean indicating the success state of the operation.
    """
    process_args = ["python",
                    "package/pyinstaller/pyinstaller.py",
                    "package/pyinstaller.spec"]
    print(script_tab + "Command: %s" % process_args)

    pipe = subprocess.PIPE
    pyinstaller_process = subprocess.Popen(
        process_args)  # stdout=pipe, stderr=pipe
    std_op, std_err_op = pyinstaller_process.communicate()

    if pyinstaller_process.returncode != 0:
        print(script_tab + "ERROR: PyInstaller returned with exit code: %s" %
              pyinstaller_process.returncode)
        return False

    return True


def remove_executable_folder():
    """ Removes the current ardublockly PyInstaller executable folder. """
    exec_dir = os.path.join(project_root_dir, exec_folder_name)
    if os.path.exists(exec_dir):
        print(script_tab + "Removing the %s folder." % exec_folder_name)
        shutil.rmtree(exec_dir)
    else:
        print(script_tab + "No %s folder found." % exec_folder_name)


def move_executable_folder():
    """
    Moves the PyInstaller executable folder from dist to project root.
    :return: Boolean indicating the success state of the operation.
    """
    original_exec_dir = os.path.join(project_root_dir, "dist", exec_folder_name)
    if os.path.exists(original_exec_dir):
        print(script_tab + "Moving folder %s \n" % original_exec_dir +
              script_tab + "to %s" % project_root_dir)
        shutil.move(original_exec_dir, project_root_dir)
    else:
        print(script_tab + "ERROR: PyInstaller executable output folder not "
                           "found!")
        return False
    return True


def copy_cefpython_data_files():
    """ Copies into the executable folder required cefpython files. """
    cef_path = os.path.dirname(cefpython3.__file__)
    cef_exec_folder = os.path.join(
        project_root_dir, exec_folder_name, "cefpython3")
    cef_exec_locales = os.path.join(cef_exec_folder, "locales")

    data_files = [
        "%s/libcef.so" % cef_path,
        "%s/libffmpegsumo.so" % cef_path,
        "%s/subprocess" % cef_path]

    locales = glob(r"%s/locales/*.*" % cef_path)

    # Ensure the cefpython3 folders are created
    if not os.path.exists(cef_exec_folder):
        os.makedirs(cef_exec_folder)
    if not os.path.exists(cef_exec_locales):
        os.makedirs(cef_exec_locales)

    # Copy all the files
    print(script_tab + "Copying CEF files from %s\n" % cef_path +
          script_tab + "into %s" % cef_exec_folder)
    for f in data_files:
        shutil.copy(f, cef_exec_folder)
    for f in locales:
        shutil.copy(f, cef_exec_locales)


def create_bash_file():
    """
    Creates a bash file into the project root to be able to easily launch the
    Ardublockly application.
    """
    bash_text = '#!/bin/bash\n' \
                'DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )\n' \
                'echo "[Bash File] Running Ardublockly from: " $DIR\n' \
                './' + exec_folder_name + '/ardublockly $DIR\n'
    bash_location = os.path.join(project_root_dir, "ardublockly_run.sh")
    try:
        print(script_tab + "Creating bash file into %s" % bash_location)
        bash_file = open(bash_location, 'w')
        bash_file.write(bash_text)
        bash_file.close()
    except Exception as e:
        print(script_tab + "%s" % e)
        print(script_tab + "ERROR: Bash file to launch the Ardublockly "
                           "application could not be created.")


def build_ardublockly():
    print(script_tag + "Building Ardublockly for Linux.")
    print(script_tag + "Project directory is:     %s" % project_root_dir)
    print(script_tag + "Script working directory: %s" % os.getcwd())

    print(script_tag + "Removing PyInstaller old temp directories.")
    remove_pyinstaller_temps()

    print(script_tag + "Running PyInstaller process:")
    success = pyinstaller_build()
    if not success:
        print(script_tab + "Removing PyInstaller recent temp directories.")
        remove_pyinstaller_temps()
        raise SystemExit(script_tab + "Exiting as there was an error in the "
                                      "PyInstaller execution.")

    print(script_tag + "Removing old ardublockly executable directory.")
    remove_executable_folder()

    print(script_tag + "Moving executable folder to project root.")
    success = move_executable_folder()
    if not success:
        print(script_tab + "Removing PyInstaller recent temp directories.")
        remove_pyinstaller_temps()
        raise SystemExit(script_tab + "Exiting now as there was an error in "
                                      "the PyInstaller execution.")

    print(script_tag + "Coping cefpython data files into executable directory.")
    copy_cefpython_data_files()

    print(script_tag + "Removing PyInstaller recent temp directories.")
    remove_pyinstaller_temps()

    print(script_tag + "Creating bash file to easily execute Ardublockly.")
    create_bash_file()


if __name__ == "__main__":
    build_ardublockly()

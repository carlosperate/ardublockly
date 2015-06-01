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


def remove_pyinstaller_temps():
    """ Removes the temporary folders created by PyInstaller. """
    dist_dir = os.path.join(os.getcwd(), "dist")
    build_dir = os.path.join(os.getcwd(), "build")
    if os.path.exists(dist_dir):
        shutil.rmtree(dist_dir)
    if os.path.exists(build_dir):
        shutil.rmtree(build_dir)


def remove_executable_folder():
    """ Removes the current ardublockly PyInstaller executable folder. """
    exec_dir = os.path.join(project_root_dir, "dist", exec_folder_name)
    if os.path.exists(exec_dir):
        shutil.rmtree(exec_dir)


def pyinstaller_build():
    """ . """
    process = ["python",
               "package/pyinstaller/pyinstaller.py",
               "package/pyinstaller.spec"]
    print(script_tab + "Command: %s" % process)
    subprocess.call(process)


def move_executable_folder():
    """ Moves the PyInstaller executable folder from dist to project root. """
    original_exec_dir = os.path.join(project_root_dir, "dist", exec_folder_name)
    if os.path.exists(original_exec_dir):
        shutil.move(original_exec_dir, project_root_dir)


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
    for f in data_files:
        shutil.copy(f, cef_exec_folder)
    for f in locales:
        shutil.copy(f, cef_exec_locales)


def main():
    print(script_tag + "Building Ardublockly for Linux.")
    print(script_tag + "Project directory is:     %s" % project_root_dir)
    print(script_tag + "Script working directory: %s" % os.getcwd())
    print(script_tag + "Removing PyInstaller old temp directories.")
    remove_pyinstaller_temps()
    print(script_tag + "Running PyInstaller process:")
    pyinstaller_build()
    print(script_tag + "Moving executable folder to project root.")
    move_executable_folder()
    print(script_tag + "Coping cefpython data files into executable directory.")
    copy_cefpython_data_files()
    print(script_tag + "Removing PyInstaller recent temp directories.")
    remove_pyinstaller_temps()


if __name__ == "__main__":
    main()

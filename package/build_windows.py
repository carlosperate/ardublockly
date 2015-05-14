#!/usr/bin/env python2
# -*- coding: utf-8 -*- #
#
# Builds the Ardublockly application for the Windows operating system.
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
import sys
import shutil
import fnmatch
from distutils.core import setup
from glob import glob
try:
    from cefpython3 import cefpython
    import py2exe
except ImportError:
    print("You need to have cefpython3, and py2exe installed!")
    sys.exit(1)

# set up directories
this_file_dir = os.path.dirname(os.path.realpath(sys.argv[0]))
this_file_parent = os.path.dirname(this_file_dir)

# Enable the ArdublocklyServer package access the sys path for py2exe to find
sys.path.append(this_file_parent)


def get_install_folder():
    """ Install directory will be folder 'win' on root directory. """
    return os.path.join(this_file_parent, "win")


def remove_install_dir():
    """ Removes the installation folder. """
    install_folder = get_install_folder()
    if os.path.exists(install_folder):
        shutil.rmtree(install_folder)


def remove_build_dir():
    """ Removes the build folder. """
    build_folder = os.path.join(this_file_dir, "build")
    if os.path.exists(build_folder):
        shutil.rmtree(build_folder)


def get_data_files():
    """ Collects the required redistributable dlls. """
    cef_path = os.path.dirname(cefpython.__file__)
    data_files = [
        ("", ["%s/icudt.dll" % cef_path,
              "%s/d3dcompiler_43.dll" % cef_path,
              "%s/devtools_resources.pak" % cef_path,
              "%s/ffmpegsumo.dll" % cef_path,
              "%s/libEGL.dll" % cef_path,
              "%s/libGLESv2.dll" % cef_path,
              "%s/subprocess.exe" % cef_path]),
        ("locales", glob(r"%s/locales/*.*" % cef_path)),
        ("Microsoft.VC90.CRT", glob(r"msvcm90\*.*"))]
    return data_files


def get_options():
    """ Prepares and returns the py2exe options dictionary. """
    # We don't really need a few of the pywin32 includes
    excludes = ["pywin", "pywin.debugger", "pywin.debugger.dbgcon",
                "pywin.dialogs", "pywin.dialogs.list", "win32com.server"]

    # We don't need this packages either
    excludes.extend(["unittest", "_ssl", "doctest", "pdb", "difflib", "email"])

    # Py2exe options: http://www.py2exe.org/index.cgi/ListOfOptions
    py2exe_options = {
        "py2exe": {"dist_dir": get_install_folder(),
                   "compressed": False,
                   "bundle_files": 3,
                   "skip_archive": True,
                   "optimize": 0,
                   "packages": ["ArdublocklyServer"],
                   "dll_excludes": ["msvcp90.dll", "msvcm90.dll"],
                   "excludes": excludes}}
    return py2exe_options


def get_py_files():
    """ Returns the scripts to package, only needs the CEF entry point. """
    start_file = os.path.join(this_file_parent, "start_cef.py")
    return [start_file]


def build_exe(args):
    """ Sets up the disutils for py2exe and runs it to build project. """
    setup(data_files=get_data_files(),
          #windows=get_py_files(),
          console=get_py_files(),
          options=get_options(),
          script_args=args)


def create_run_batch_file():
    """
    Creates a batch file into the project root to be able to easily launch the
    Ardublockly software.
    """
    root_dir = os.path.realpath(this_file_parent + os.sep + os.sep + os.sep)
    batch_text = "@echo off\n" + \
                 ("start %s\win\start_cef.exe %s" % (root_dir, root_dir))
    try:
        batch_file = open(("%s/ardublockly_run.bat" % root_dir), 'w')
        batch_file.write(batch_text)
        batch_file.close()
    except Exception as e:
        print('%s\nArduino sketch could not be created!!!' % e)


if __name__ == "__main__":
    remove_build_dir()
    remove_install_dir()
    if len(sys.argv) <= 1:
        build_exe(['py2exe'])
    else:
        build_exe()
    remove_build_dir()
    create_run_batch_file()

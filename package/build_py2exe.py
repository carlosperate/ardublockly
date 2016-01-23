#!/usr/bin/env python2
# -*- coding: utf-8 -*- #
#
# Builds the Ardublockly Python portion of the app for Windows.
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
import os
import sys
import shutil
from distutils.core import setup
from glob import glob
try:
    import py2exe
except ImportError:
    raise SystemExit("You need to have py2exe installed!")


exec_folder_name = "arduexec"
server_exec_folder_name = "server"
script_tag = "[Ardublockly build] "
script_tab = "                    "

# Set up directories, assumes this file is one level below project root:
# (from project root) level1/build_windows.py
project_root_dir = \
    os.path.dirname(                                  # going up 1 level
        os.path.dirname(os.path.realpath(__file__)))  # folder dir of this
server_exec_dir = os.path.join(project_root_dir, exec_folder_name,
                              server_exec_folder_name)

# Enable the ardublocklyserver package access the sys path for py2exe to find
sys.path.append(project_root_dir)


def remove_directory(dir_to_remove):
    """ Removes the a given directory. """
    if os.path.exists(dir_to_remove):
        print(script_tab + "Removing directory %s" % dir_to_remove)
        shutil.rmtree(dir_to_remove)
    else:
        print(script_tab + "Directory %s was not found." % dir_to_remove)


def get_py2exe_extra_data_files():
    """ Collects the required redistributable dlls and other files. """
    # Microsoft compiler redistributable dlls
    data_files = [("Microsoft.VC90.CRT", glob(r"msvcm90\*.*"))]
    return data_files


def get_py2exe_options():
    """ Prepares and returns the py2exe options dictionary. """
    # We don't really need a few of the pywin32 includes
    excludes = ["pywin", "pywin.debugger", "pywin.debugger.dbgcon",
                "pywin.dialogs", "pywin.dialogs.list", "win32com.server",
                "curses", "email"]

    # We don't need these two dlls from the msvcm90
    dll_excludes = ["msvcp90.dll", "msvcm90.dll"]

    # We can't include these microsoft dlls, which get pulled with build
    dll_excludes += ["api-ms-win-core-atoms-l1-1-0.dll",
                     "api-ms-win-core-crt-l1-1-0.dll",
                     "api-ms-win-core-crt-l2-1-0.dll",
                     "api-ms-win-core-delayload-l1-1-1.dll",
                     "api-ms-win-core-errorhandling-l1-1-1.dll",
                     "api-ms-win-core-file-l1-2-1.dll",
                     "api-ms-win-core-handle-l1-1-0.dll",
                     "api-ms-win-core-heap-l1-2-0.dll",
                     "api-ms-win-core-heap-obsolete-l1-1-0.dll",
                     "api-ms-win-core-io-l1-1-1.dll",
                     "api-ms-win-core-kernel32-legacy-l1-1-1.dll",
                     "api-ms-win-core-libraryloader-l1-2-0.dll",
                     "api-ms-win-core-localization-l1-2-1.dll",
                     "api-ms-win-core-memory-l1-1-2.dll",
                     "api-ms-win-core-processthreads-l1-1-2.dll",
                     "api-ms-win-core-profile-l1-1-0.dll",
                     "api-ms-win-core-psapi-obsolete-l1-1-0.dll",
                     "api-ms-win-core-registry-l1-1-0.dll",
                     "api-ms-win-core-string-l1-1-0.dll",
                     "api-ms-win-core-string-l2-1-0.dll",
                     "api-ms-win-core-string-obsolete-l1-1-0.dll",
                     "api-ms-win-core-synch-l1-2-0.dll",
                     "api-ms-win-core-sysinfo-l1-2-1.dll",
                     "api-ms-win-core-util-l1-1-0.dll",
                     "api-ms-win-downlevel-advapi32-l1-1-0.dll",
                     "api-ms-win-downlevel-normaliz-l1-1-0.dll",
                     "api-ms-win-downlevel-ole32-l1-1-0.dll",
                     "api-ms-win-downlevel-shlwapi-l1-1-0.dll",
                     "api-ms-win-downlevel-user32-l1-1-0.dll",
                     "api-ms-win-downlevel-version-l1-1-0.dll",
                     "api-ms-win-security-activedirectoryclient-l1-1-0.dll",
                     "api-ms-win-security-base-l1-2-0.dll",
                     "api-ms-win-service-management-l1-1-0.dll",
                     "combase.dll", "CRYPT32.dll", "dhcpcsvc.DLL",
                     "iertutil.dll", "IPHLPAPI.DLL", "NSI.dll", "OLEACC.dll",
                     "PSAPI.DLL", "Secur32.dll", "SETUPAPI.dll", "urlmon.dll",
                     "USERENV.dll", "USP10.dll", "WININET.dll", "WTSAPI32.dll"]

    # We don't need these python packages either
    excludes.extend(["unittest", "_ssl", "doctest", "pdb", "difflib", "email"])

    # Py2exe options: http://www.py2exe.org/index.cgi/ListOfOptions
    py2exe_options = {
        "py2exe": {"dist_dir": server_exec_dir,
                   "compressed": False,
                   "bundle_files": 3,
                   "skip_archive": True,
                   "optimize": 0,
                   "packages": ["ardublocklyserver"],
                   "dll_excludes": dll_excludes,
                   "excludes": excludes}}
    return py2exe_options


def get_python_files_to_compile():
    """
    Returns the scripts to package, Ardublockly only needs the entry point to
    work, everything else is imported.
    """
    start_file = os.path.join(project_root_dir, "start.py")
    return [start_file]


def build_exe(args):
    """ Sets up the disutils for py2exe and runs it to build project. """
    setup(data_files=get_py2exe_extra_data_files(),
          console=get_python_files_to_compile(),
          options=get_py2exe_options(),
          script_args=args)


def create_run_batch_file():
    """
    Creates a batch file into the project root to be able to easily launch the
    Ardublockly application.
    This batch file launches the entire Ardublockly application, having its
    entry point built by Electron.
    """
    batch_text = "@echo off\n" + \
                 "start %s" % os.path.join(exec_folder_name, "ardublockly.exe")
    batch_location = os.path.join(project_root_dir, "ardublockly_run.bat")
    try:
        batch_file = open(batch_location, "w")
        batch_file.write(batch_text)
        batch_file.close()
        print(script_tab + "Batch file created in  %s" % batch_location)
    except Exception as e:
        print("%s\n" % e + script_tab +
              "Batch file to run Ardublockly could not be created !")


def main():
    print(script_tag + "Building Ardublockly for Windows.")

    print(script_tag + "Project directory is:     %s" % project_root_dir)
    print(script_tag + "Script working directory: %s" % os.getcwd())

    print(script_tag + "Removing old build directory.")
    remove_directory(os.path.join(os.getcwd(), "build"))

    print(script_tag + "Removing old executable directory.")
    remove_directory(server_exec_dir)

    print(script_tag + "Building Ardublockly using py2exe.")
    if len(sys.argv) <= 1:
        build_exe(["py2exe"])
    else:
        build_exe()

    print(script_tag + "Removing recent build directory.")
    remove_directory(os.path.join(os.getcwd(), "build"))

    print(script_tag + "Creating a batch file to launch Ardublockly.")
    create_run_batch_file()


if __name__ == "__main__":
    main()

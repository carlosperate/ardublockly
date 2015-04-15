#!/usr/bin/env python2
import os
import sys
import shutil
import fnmatch
from glob import glob
try:
    from cefpython3 import cefpython
    from distutils.core import setup
    import py2exe
except ImportError:
    print("You need to have cefpython3, distutils, and py2exe installed!")
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
        ('', ['%s/icudt.dll' % cef_path,
              '%s/d3dcompiler_43.dll' % cef_path,
              '%s/devtools_resources.pak' % cef_path,
              '%s/ffmpegsumo.dll' % cef_path,
              '%s/libEGL.dll' % cef_path,
              '%s/libGLESv2.dll' % cef_path,
              '%s/subprocess.exe' % cef_path]),
        ('locales', glob(r'%s/locales/*.*' % cef_path)),
        ("Microsoft.VC90.CRT", glob(r'msvcm90\*.*'))]
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
    setup(data_files=get_data_files(),
          #windows=get_py_files(),
          console=get_py_files(),
          options=get_options(),
          script_args=args)


if __name__ == "__main__":
    remove_build_dir()
    remove_install_dir()

    if len(sys.argv) <= 1:
        build_exe(['py2exe'])
    else:
        build_exe()

    remove_build_dir()

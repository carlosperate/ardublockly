# -*- coding: utf-8 -*-
#
# Receives and responds to the HTTP request from the Python server.
#
# Copyright (c) 2015 carlosperate https://github.com/carlosperate/
# Licensed under the Apache License, Version 2.0 (the "License"):
#   http://www.apache.org/licenses/LICENSE-2.0
#
from __future__ import unicode_literals, absolute_import
import os
try:
    # 2.x name
    import Tkinter
    import tkFileDialog
except ImportError:
    # 3.x name
    import tkinter as Tkinter
    import tkinter.filedialog as tkFileDialog


#
# Dealing with Directories and files
#
def browse_file_dialog():
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
    if file_path:
        return os.path.normpath(file_path)
    else:
        return file_path


def browse_dir_dialog():
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
    dir_path = tkFileDialog.askdirectory(
        parent=root, initialdir="/", title='Please select a directory')
    root.destroy()
    if dir_path:
        return os.path.normpath(dir_path)
    else:
        return dir_path

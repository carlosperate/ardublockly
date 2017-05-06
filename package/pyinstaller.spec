# -*- mode: python -*-

# This spec file counts on the PyInstaller script being executed from the
# project root directory, otherwise the start.py file path will have to
# be updated.

# We have a 'local-packages' folder with modules, need to expand sys.path
import os
import sys
project_root = os.path.realpath('')
print('PyInstaller defined project root: %s' % project_root)
local_packages = os.path.join(
        project_root, 'ardublocklyserver', 'local-packages')
sys.path.insert(0, project_root)
sys.path.insert(0, local_packages)

# Import required modules, ensures PyInstaller fails if it cannot find them
import ardublockly
import six, configparser, serial, waitress, bottle


block_cipher = None

a = Analysis(['../start.py'],
             pathex=None,
             hiddenimports=['ardublocklyserver', 'waitress'],
             hookspath=None,
             runtime_hooks=None,
             excludes=None)
             #cipher=block_cipher)

pyz = PYZ(a.pure)
          #cipher=block_cipher)

exe = EXE(pyz,
          a.scripts,
          exclude_binaries=True,
          name='start',
          debug=False,
          strip=None,
          upx=True,
          console=True)

coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=None,
               upx=True,
               name='server')

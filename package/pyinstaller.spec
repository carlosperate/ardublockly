# -*- mode: python -*-

# set up directories
#this_file_dir = os.path.dirname(os.path.realpath(sys.argv[0]))
#this_file_parent = os.path.dirname(this_file_dir)

#def get_cefpython_path():
#    from cefpython3 import cefpython
#    return "%s%s" % (os.path.dirname(cefpython.__file__), os.sep)

#cef_path = get_cefpython_path()

# Enable the ArdublocklyServer package access the sys path for pyinstaller to find
#sys.path.append(this_file_parent)

block_cipher = None


a = Analysis(['start_cef.py'],
             pathex=None,
             hiddenimports=["ArdublocklyServer", "cefpython3", "wx"],
             hookspath=None,
             runtime_hooks=None,
             excludes=None,
             cipher=block_cipher)
pyz = PYZ(a.pure,
          cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          exclude_binaries=False,
          name='ardublockly',
          debug=False,
          strip=None,
          upx=True,
          console=False)
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=None,
               upx=True,
               name='arduexec')

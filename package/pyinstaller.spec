# -*- mode: python -*-

# This spec file counts on the PyInstaller script being executed from the
# project root directory, otherwise the start_cef.py file path will have to
# be updated.

block_cipher = None

a = Analysis(['start_cef.py'],
             pathex=None,
             hiddenimports=["ArdublocklyServer", "cefpython3", "wx"],
             hookspath=None,
             runtime_hooks=None,
             excludes=None)
             #cipher=block_cipher)

pyz = PYZ(a.pure)
          #cipher=block_cipher)

exe = EXE(pyz,
          a.scripts,
          exclude_binaries=True,
          name='start_cef',
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

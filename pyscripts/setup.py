import sys
import os
import pathlib
from cx_Freeze import setup, Executable

scripts_path = "scripts"

build_exe_options = {
    "build_exe": {
        "includes": ["mmt"],
        "path": sys.path + [os.path.join(os.getcwd(), scripts_path)],
        "excludes": ["tkinter", "asyncio", "html", "http", "multiprocessing", "concurrent", "email", "unittest", "xml", "setuptools", "pydoc_data", "lib2to3"]
    }
}

print(build_exe_options)

setup(
    name= 'mmt2csv',
    version= '0.1',
    description= 'mm2csv toolchain',
    options = build_exe_options,
    executables=[
        Executable(f"./{scripts_path}/retrieve_mmt_info.py", base='Console'), 
        Executable(f"./{scripts_path}/single_mmt.py", base='Console')
    ]
)



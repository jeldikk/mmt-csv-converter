import argparse
import os
import sys
import json
import time

from mmt.filewrapper import mmtwrapper

SEPERATOR = os.sep

parser = argparse.ArgumentParser(description="converts single mmt file")

parser.add_argument("-f", action="store", dest="ipath",
                    type=str, help="mtt input path")
parser.add_argument('-o', action="store", dest="ofolder",
                    help="output folder path")
parser.add_argument("--csv", action="store_true", default=True,
                    dest="csv", help="store in csv format")
parser.add_argument(
    "--mat", action="store_true", default=True, dest="mat", help="store in mat format"
)
results = parser.parse_args()

start_time = time.time()

if not os.path.isfile(results.ipath):
    sys.stdout.write(json.dumps({
        "status": "error",
        "filename": results.ipath,
        "message": "File Not Found"
    }))
    sys.exit(0)

try:
    if not os.path.isdir(results.ofolder):
        os.mkdir(results.ofolder)
except:
    sys.stdout.write(json.dumps({
        "status": "error",
        "filename": results.ofolder,
        "message": "Invalid Output Folder"
    }))
    sys.exit(0)

mmtbucket = mmtwrapper(results.ipath, "rb")

for scanno in range(mmtbucket.totscans):
    s = mmtbucket.getScanCycle(scanno + 1)
    s = s.calcSNR().calcUVW().calcDir(method="met")

    if results.csv:
        s.toCSVfile(results.ofolder)

stop_time = time.time()

sys.stdout.write(json.dumps({
    "status": "success",
    "message": f"created {mmtbucket.totscans} files and took {round(stop_time - start_time, 3)} secs"
}))

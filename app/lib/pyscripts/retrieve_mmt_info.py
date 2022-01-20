import argparse
import os
import sys
import json

from mmt.filewrapper import mmtwrapper

parser = argparse.ArgumentParser(
    description="validates and retrieves consolidated info about mmt file")

parser.add_argument("-f", action="store", dest="ipath",
                    type=str, help="input mmt file path")

results = parser.parse_args()

if not os.path.isfile(results.ipath):
    sys.stdout.write(json.dumps({
        "status": "error",
        "filename": results.ipath,
        "message": "File Not Found"
    }))
    # sys.exit(1001)


mmtbucket = mmtwrapper(results.ipath, "rb")
sys.stdout.write(json.dumps({
    "status": "success",
    "filename": results.ipath,
    "scan_count": mmtbucket.totscans,
    "beam_count": mmtbucket.nbeams,
    "timestamps": {
        "start": str(mmtbucket.getScanCycle(1).timestamp),
        "end": str(mmtbucket.getScanCycle(mmtbucket.totscans).timestamp)
    }
}))

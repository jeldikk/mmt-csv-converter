import { spawn } from "child_process";
import * as path from "path";
import { logError, logInfo } from "../logger";

const validateExe = path.resolve(__dirname, "./bin/retrieve_mmt_info.exe");
const convertExe = path.resolve(__dirname, "./bin/single_mmt.exe");

export async function validateMmtFile(filename: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const validateExec = spawn(validateExe, ["-f", filename]);

    validateExec.stdout.on("data", (data) => {
      logInfo(`validate-exe > ${data}`);
      resolve(data);
    });

    validateExec.stderr.on("data", (data) => {
      reject(data);
    });

    validateExec.on("close", () => {
      logInfo("validation exe is signing off");
    });
  });
}

export async function convertMmtFile(ifilename, ofolder) {
  return new Promise((resolve, reject) => {
    const convertProcess = spawn(convertExe, ["-f", ifilename, "-o", ofolder]);

    convertProcess.stdout.on("data", (data) => {
      logInfo(`convert-pylib > message: ${data}`);
      resolve(data);
    });

    convertProcess.stderr.on("data", (err) => {
      logInfo(`convert-pylib > error: ${err}`);
      reject(err);
    });

    convertProcess.on("close", () => {
      logInfo("convert-pylib is finished");
    });
  });
}

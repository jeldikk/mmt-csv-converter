import { PythonShell, Options } from "python-shell";
import * as path from "path";
import { logError, logInfo } from "../logger";

const PYTHON_OPTIONS = {
  pythonPath: path.resolve(__dirname, "./venv/Scripts/python"),
  pythonOptions: ["-u"],
  scriptPath: path.resolve(__dirname, "./pyscripts"),
};

export async function validateMmtFile(filename: string): Promise<any> {
  const options: Options = {
    mode: "json",
    ...PYTHON_OPTIONS,
    args: ["-f", filename],
  };
  return new Promise((resolve, reject) => {
    let pythonShell = PythonShell.run(
      "retrieve_mmt_info.py",
      options,
      (err) => {
        logError(`validate-pylib > error message: ${err}`);
        if (err) reject(err);
      }
    );

    logInfo(`validate-pylib > shell command: ${pythonShell.command}`);

    pythonShell.on("message", (chunk) => {
      logInfo(`validate-pylib > ${chunk}`);
      resolve(chunk);
    });

    pythonShell.on("close", () => {
      logInfo("validation pythonShell is signing off");
    });
  });
}

export async function convertMmtFile(ifilename, ofolder) {
  const options: Options = {
    mode: "json",
    ...PYTHON_OPTIONS,
    args: ["-f", ifilename, "-o", ofolder],
  };

  return new Promise((resolve, reject) => {
    let pythonShell = PythonShell.run("single_mmt.py", options, (err) => {
      if (err) {
        logError(`convert-pylib > error message: ${err.message}`);
        reject(err.message);
      }
    });

    logInfo(`convert-pylib > shell command: ${pythonShell.command}`);

    pythonShell.on("message", (chunk) => {
      logInfo(`convert-pylib > message: ${chunk}`);
      resolve(chunk);
    });

    pythonShell.on("close", () => {
      logInfo(`convert-pylib > convert pythonShell finished`);
    });
  });
}

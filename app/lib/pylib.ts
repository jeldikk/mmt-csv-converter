import { PythonShell, Options } from "python-shell";
import * as path from "path";

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
        if (err) reject(err);
      }
    );

    pythonShell.on("message", (chunk) => {
      resolve(chunk);
    });

    pythonShell.on("close", () => {
      console.log("validation pythonShell is signing off");
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
        reject(err);
      }
    });

    pythonShell.on("message", (chunk) => {
      resolve(chunk);
    });

    pythonShell.on("close", () => {
      console.log("convert pythonShell finished");
    });
  });
}

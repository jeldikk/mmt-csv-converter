import { app, BrowserWindow, dialog, ipcMain, screen } from "electron";
import * as path from "path";
import * as fs from "fs";
import * as url from "url";
import { convertMmtFile, validateMmtFile } from "./lib/pylib";
import { mainMenu } from "./menu";

let mainWindow: BrowserWindow = null;

const args = process.argv.slice(1),
  serve = args.some((val) => val === "--serve");

function createWindow(): BrowserWindow {
  // const electronScreen = screen;
  // const size = electronScreen.getPrimaryDisplay().workAreaSize;
  let appWidth = 600; //size.width;
  let appHeight = 530; //size.height;
  // Create the browser window.
  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: appWidth,
    height: appHeight,
    maxWidth: 800,
    maxHeight: 600,
    // resizable: false,
    webPreferences: {
      minimumFontSize: 10,
      defaultFontSize: 12,
      defaultMonospaceFontSize: 14,
      nodeIntegration: true,
      allowRunningInsecureContent: serve ? true : false,
      contextIsolation: false, // false if you want to run e2e test with Spectron
    },
  });

  mainWindow.setMenu(mainMenu);

  if (serve) {
    mainWindow.webContents.openDevTools();
    require("electron-reload")(__dirname, {
      electron: require(path.join(__dirname, "/../node_modules/electron")),
    });
    mainWindow.loadURL("http://localhost:4200");
  } else {
    // Path when running electron executable
    let pathIndex = "./index.html";

    if (fs.existsSync(path.join(__dirname, "../dist/index.html"))) {
      // Path when running electron in local folder
      pathIndex = "../dist/index.html";
    }

    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, pathIndex),
        protocol: "file",
        slashes: true,
      })
    );
  }

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  return mainWindow;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on("ready", () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}

//open a dialog to select a file on open-dialog channel
ipcMain.handle("open-dialog", async (event, { dialogType, dialogTitle }) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: dialogTitle,
    filters: [
      { name: "Moments", extensions: ["mmt"] },
      { name: "All Files", extensions: ["*"] },
    ],
    properties: [dialogType],
  });
  // console.log(result);
  return result;
});

//validate and retrieve file information from python
ipcMain.handle("validate-file", async (event, { filename }) => {
  const pythonOutput = await validateMmtFile(filename);
  return pythonOutput;
});

//convert .mmt file to csv files
ipcMain.handle("convert-file", async (event, { ifilename, ofolder }) => {
  const pythonOutput = await convertMmtFile(ifilename, ofolder);
  return pythonOutput;
});

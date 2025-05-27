import { ipcMain, dialog, app, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "fs";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.APP_ROOT, "src/assets/logo.ico"),
    // Use your app icon
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // Use .js for built preload
      contextIsolation: true,
      // Security: isolate context
      nodeIntegration: false,
      // Security: disable Node.js in renderer
      sandbox: true
      // Extra security
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
ipcMain.handle("save-schedule", async (_event, data) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: "Spara schema",
    filters: [
      { name: "Operationsschema", extensions: ["ops", "json"] }
    ],
    defaultPath: "schema.ops"
  });
  if (canceled || !filePath) return { success: false };
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return { success: true, filePath };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, error: errorMsg };
  }
});
ipcMain.handle("load-schedule", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: "Öppna schema",
    filters: [
      { name: "Operationsschema", extensions: ["ops", "json"] }
    ],
    properties: ["openFile"]
  });
  if (canceled || !filePaths[0]) return { success: false };
  try {
    const content = fs.readFileSync(filePaths[0], "utf-8");
    return { success: true, data: JSON.parse(content), filePath: filePaths[0] };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, error: errorMsg };
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};

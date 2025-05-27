"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  send: (channel, data) => {
    electron.ipcRenderer.send(channel, data);
  },
  on: (channel, listener) => {
    electron.ipcRenderer.on(channel, listener);
  },
  once: (channel, listener) => {
    electron.ipcRenderer.once(channel, listener);
  }
  // Add more methods as needed, but never expose Node.js or Electron internals directly
});

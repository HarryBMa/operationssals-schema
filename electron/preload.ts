import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('electron', {
  send: (channel: string, data?: any) => {
    ipcRenderer.send(channel, data)
  },
  on: (channel: string, listener: (event: any, ...args: any[]) => void) => {
    ipcRenderer.on(channel, listener)
  },
  once: (channel: string, listener: (event: any, ...args: any[]) => void) => {
    ipcRenderer.once(channel, listener)
  },
  // Add more methods as needed, but never expose Node.js or Electron internals directly
})

// Example: In renderer, you can use window.electron.send('channel', data)
// and window.electron.on('channel', (event, ...args) => { ... })

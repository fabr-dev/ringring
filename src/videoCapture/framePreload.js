const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('framesAPI', {
  handleFrame: (callback) => ipcRenderer.on('frame-receive', callback),
});

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('videoAPI', {
  handleFrame: (frame) => ipcRenderer.on('frame-receive', frame),
  setConfig: (config) => ipcRenderer.send('video-screen-config', config),
});


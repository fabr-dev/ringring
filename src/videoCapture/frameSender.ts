import { BrowserWindow } from 'electron';
import path from 'path';

export default class FrameSender {
  static frameSender: FrameSender | null = null;

  private browserWindow: BrowserWindow | null = null;

  private constructor() {}

  static getInstance(): FrameSender {
    if (this.frameSender === null) {
      this.frameSender = new FrameSender();
    }
    return this.frameSender;
  }

  getPreloadPath(): string {
    return path.join(__dirname, 'framePreload.js');
  }

  setBrowserWindow(browserWindow: BrowserWindow) {
    this.browserWindow = browserWindow;
  }

  sendFrame(frame: any) {
    // TODO: send frame through IPC
    if (this.browserWindow === null) return;
    this.browserWindow.webContents.send('frame-receive', frame);
    console.log('send frame', frame);
  }
}

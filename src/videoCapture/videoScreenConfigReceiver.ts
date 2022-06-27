import { ipcMain } from "electron";

export interface VideoScreenConfigListener {
  onConfig: (config: any) => void;
}

export class VideoScreenConfigReceiver {
  static videoScreenConfigReceiver: VideoScreenConfigReceiver | null = null;
  
  private listeners: Array<VideoScreenConfigListener> = [];

  static getInstance(): VideoScreenConfigReceiver {
    if (this.videoScreenConfigReceiver === null) {
      this.videoScreenConfigReceiver = new VideoScreenConfigReceiver();
    }
    return this.videoScreenConfigReceiver;
  }

  private constructor() {
    ipcMain.on('video-screen-config', (event, config) => {
      for (const listener of this.listeners) {
        listener.onConfig(config);
      }
    });
  }

  addVideoScreenConfigListener(listener: VideoScreenConfigListener) {
    this.listeners.push(listener);
    console.log('listener added', listener);
  }

  removeVideoScreenConfigListener(listener: VideoScreenConfigListener) {
    this.listeners = this.listeners.filter((l) => !Object.is(l, listener));
    console.log('listener removed', listener);
  }
}


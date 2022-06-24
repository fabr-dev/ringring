export interface FrameListener {
  onFrame: (frame: any) => void;
}

export class FrameReceiver {
  static frameReceiver: FrameReceiver | null = null;
  
  private listeners: Array<FrameListener> = [];

  static getInstance(): FrameReceiver {
    if (this.frameReceiver === null) {
      this.frameReceiver = new FrameReceiver();
    }
    return this.frameReceiver;
  }

  private constructor() {
    window.framesAPI.handleFrame((event: any, value: any) => {
      const imgData = new ImageData(
        new Uint8ClampedArray(value.buf),
        value.row,
        value.col
      );
      console.log('Frame received!!');
      for (const listener of this.listeners){
        listener.onFrame(imgData);
      }
    });
  }

  addFrameListener(listener: FrameListener) {
    this.listeners.push(listener);
    console.log('listener added', listener);
  }
  removeFrameListener(listener: FrameListener) {
    this.listeners = this.listeners.filter((l) => !Object.is(l, listener));
    console.log('listener removed', listener);
  }
}

export interface FrameListener {
  onFrame: (frame: any) => void;
}

export class FrameReceiver {
  private listeners: Array<FrameListener> = [];

  constructor() {
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

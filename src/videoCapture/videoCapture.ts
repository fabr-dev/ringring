import FrameSender from './frameSender';
import { VideoScreenConfigReceiver, VideoScreenConfigListener } from './videoScreenConfigReceiver';

const cv = require('opencv4nodejs');

export default class VideoCapture {
  private interval: any = null;
  private configListener: VideoScreenConfigListener | null = null;

  getConfigListener() {
    return this.configListener;
  }

  start(frameSender: FrameSender, configReceiver: VideoScreenConfigReceiver) {
    this.configListener = {
      onConfig: (config: any) => {
        console.log(config);
      }
    }
    
    configReceiver.addVideoScreenConfigListener(this.configListener);
    
    const videoCapture = new cv.VideoCapture(0); // 0 id of the video capture device, returns a matrix of the image

    videoCapture.set(cv.CAP_PROP_FRAME_WIDTH, 500);
    videoCapture.set(cv.CAP_PROP_FRAME_HEIGHT, 500);

    this.interval = setInterval(() => {
      let frame = videoCapture.read().flip(1); // reads the image from the video capture every second
      frame = frame.resize(256, 256);
      frame =
        frame.channels === 1
          ? frame.cvtColor(cv.COLOR_GRAY2RGBA)
          : frame.cvtColor(cv.COLOR_BGR2RGBA);
      frameSender.sendFrame({
        buf: frame.getData(),
        row: frame.rows,
        col: frame.cols,
      });
    }, 16);
  }

  clearInterval() {
    if (this.interval === null) return 
    clearInterval(this.interval);
  }

}
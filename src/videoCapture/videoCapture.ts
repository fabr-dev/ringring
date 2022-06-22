import FrameSender from "./frameSender";

const cv = require('opencv4nodejs');

async function wait(timeout: number) {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

export default async function capture(frameSender: FrameSender) {
  const videoCapture = new cv.VideoCapture(0); // 0 id of the video capture device, returns a matrix of the image

  videoCapture.set(cv.CAP_PROP_FRAME_WIDTH, 500);
  videoCapture.set(cv.CAP_PROP_FRAME_HEIGHT, 500);

  const delay = 10;
  let done = false;
  while (!done) {
    await wait(16);
    let frame = videoCapture.read().flip(1); // reads the image from the video capture every second
    frame = frame.resize(256, 256);
    frame =
      frame.channels === 1
        ? frame.cvtColor(cv.COLOR_GRAY2RGBA)
        : frame.cvtColor(cv.COLOR_BGR2RGBA);
    frameSender.sendFrame({ buf: frame.getData(), row: frame.rows, col: frame.cols });
    const key = cv.waitKey(delay);
    done = key !== -1 && key === 32;
  }
}

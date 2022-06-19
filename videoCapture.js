const cv = require('opencv4nodejs')

async function wait(timeout) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, timeout)
    })
}

async function capture() {
    const videoCapture = new cv.VideoCapture(0); // 0 id of the video capture device, returns a matrix of the image
    
    videoCapture.set(cv.CAP_PROP_FRAME_WIDTH, 500);
    videoCapture.set(cv.CAP_PROP_FRAME_HEIGHT, 500);

    const delay = 10;
    let done = false;
    while (!done) {
        let frame = videoCapture.read().flip(1); // reads the image from the video capture every second
        cv.imshow('video', frame);
        const key = cv.waitKey(delay);
        done = key !== -1 && key === 32;
    }   
}

capture();
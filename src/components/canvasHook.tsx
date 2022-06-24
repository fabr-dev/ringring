
import { useRef, useEffect, useState } from 'react';

const useCanvas = (frame: any) => {
  const [height, setHeight] = useState(-1);
  const [width, setWidth] = useState(-1);
  const canvasRef = useRef(null)

  useEffect(() => {
    if (height < 0 || width < 0) return;
    console.log(height, width);
  }, [height, width]);
  
  useEffect(() => {

    if (frame === null) return;

    // console.log(frame)

    const canvas: any = canvasRef.current;
    const context = canvas.getContext('2d');

    if (height !== canvas.offsetHeight) {
      canvas.height = canvas.offsetHeight;
      setHeight(canvas.offsetHeight);
    }

    if (width !== canvas.offsetWidth) {
      canvas.width = canvas.offsetWidth;
      setWidth(canvas.offsetWidth);
    }
    
    // next 2 lines used to develop the resizing function, can be deleted after it is complete
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const framePosX = canvas.width / 2 - frame.width / 2;
    const framePosY = canvas.height / 2 - frame.height / 2;

    context.putImageData(frame, framePosX, framePosY);
    
  }, [frame]);
  
  return canvasRef;
}

export default useCanvas;
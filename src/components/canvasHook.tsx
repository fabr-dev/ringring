
import { useRef, useEffect } from 'react';

const useCanvas = (frame: any) => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {

    if (frame === null) return;

    console.log(frame)
    console.log(frame.rows)

    const canvas: any = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;

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
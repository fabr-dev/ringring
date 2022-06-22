
import { useRef, useEffect } from 'react';


const useCanvas = (frame: any) => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {

    if (frame === null) return;

    console.log(frame)
    console.log(frame.rows)

    const canvas: any = canvasRef.current;
    const context = canvas.getContext('2d');
    
    canvas.height = frame.height;
    canvas.width = frame.width;

    // context.fillStyle = '#000000'
    // context.fillRect(0, 0, context.canvas.width, context.canvas.height)

    context.putImageData(frame, 0, 0);
    
  }, [frame]);
  
  return canvasRef;
}

export default useCanvas;
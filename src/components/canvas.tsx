
import useCanvas from './canvasHook'

const Canvas = (props: any) => {  
  
  const { frame, ...rest } = props;

  const canvasRef = useCanvas(frame);
  
  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas
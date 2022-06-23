
import useCanvas from './canvasHook'

const Canvas = (props: any) => {  
  
  const { frame, ...rest } = props;

  const canvasRef = useCanvas(frame);
  
  return <canvas style={{width: '100%', height: '100%'}} ref={canvasRef} {...rest}/>
}

export default Canvas
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import PhoneIcon from '@mui/icons-material/Phone';
import { CallingDialog, IncomingCallDialog } from '../dialogs';
import { FrameReceiver, FrameListener } from 'videoCapture/frameReceiver';
import Canvas from '../../components/canvas';

enum STATE {
  IDLE,
  CALLING,
  INCOMING_CALL,
}

const frameReceiver = new FrameReceiver();

const styles = {
  callButton: (disabled: boolean) => ({
    backgroundColor: disabled ? 'gray' : 'green',
    color: 'white',
  }),
};

const draw = (ctx: any, frameCount: any) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.fillStyle = '#000000'
  ctx.beginPath()
  ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
  ctx.fill()
}

export default function Home() {
  const navigate = useNavigate();
  const [callState, setCallState] = React.useState(STATE.IDLE);
  const [frame, setFrame] = React.useState(null);

  React.useEffect(()=>{
    const frameListener: FrameListener = {
      onFrame: (frame: any) => {
        setFrame(frame);
      }
    }
    frameReceiver.addFrameListener(frameListener);
  }, [])

  // TODO: Listen for calls
  // if (callState === STATE.IDLE) {
  //   setTimeout(() => {
  //     if (callState === STATE.IDLE) {
  //       setCallState(STATE.INCOMING_CALL);
  //     }
  //   }, 3000);
  // }

  const handleMakeCall = () => {
    // TODO: Initiate the call
    setCallState(STATE.CALLING);
    setTimeout(() => {
      // TODO: move to video chat page
      navigate('/chat');
    }, 3000);
  };

  const handleEndCallAttempt = () => {
    // TODO: End call attempt
    setCallState(STATE.IDLE);
  };

  const handleIncomingCall = (answered: boolean) => () => {
    if (answered) {
      // TODO: Allow incoming call
      navigate('/chat');
      return;
    }
    setCallState(STATE.IDLE);
  };

  const openCallDialog = callState == STATE.CALLING;
  const openIncomingCallDialog = callState === STATE.INCOMING_CALL;

  return (
    <div>
      <div className="Video">
        {/* <Box
          sx={{
            width: 400,
            height: 300,
            backgroundColor: 'black',
          }}
        /> */}
        <Canvas frame={frame}/>
      </div>
      <div className="Hello">
        <IconButton
          aria-label="phone"
          size="large" 
          disabled={openCallDialog}
          style={styles.callButton(openCallDialog)}
          onClick={handleMakeCall}
        >
          <PhoneIcon />
        </IconButton>
      </div>
      <CallingDialog open={openCallDialog} onClose={handleEndCallAttempt} />
      <IncomingCallDialog
        open={openIncomingCallDialog}
        onAnswer={handleIncomingCall(true)}
        onHangup={handleIncomingCall(false)}
      />
    </div>
  );
}

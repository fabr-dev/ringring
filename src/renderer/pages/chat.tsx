import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { FrameListener, FrameReceiver } from 'videoCapture/frameReceiver';
import Canvas from 'renderer/components/canvas';


enum STATE {
  ACTIVE_CALL,
  ENDING_CALL,
}

const frameReceiver = FrameReceiver.getInstance();

const styles: {[key: string]: React.CSSProperties}  = {
  callButton: {
    backgroundColor: 'red',
    color: 'white',
  },
  endCallButton: {
    backgroundColor: 'red',
    color: 'white',
  },
  endCallButtonDiv: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  callingDialogButDiv: {
    display: 'flex',
    justifyContent: 'center',
    padding: '5px',
  },
  canvasDiv: {
    width: '100%', 
    height: '85%'
  },
  fullScreen: {
    // backgroundColor: 'green',
    position: 'absolute', 
    top:'0px', 
    right:'0px', 
    bottom:'0px', 
    left:'0px', 
    flexDirection: 'column'
  }
};

export default function Chat() {
  const navigate = useNavigate();
  const [callState, setCallState] = React.useState(STATE.ACTIVE_CALL);
  const [frame, setFrame] = React.useState(null);

  React.useEffect(() => {
    const frameListener: FrameListener = {
      onFrame: (frame: any) => {
        setFrame(frame);
      }
    }
    frameReceiver.addFrameListener(frameListener);

    return () => {
      frameReceiver.removeFrameListener(frameListener);
    };
  }, []);

  const handleEndCall = () => {
    // TODO: End the call
    setCallState(STATE.ENDING_CALL);
    navigate('/');
  };

  return (
    <div style={styles.fullScreen}>
      <div style={styles.canvasDiv} className="Video">
        <Canvas frame={frame}/>
      </div>
      <div className="Hello" style={styles.endCallButtonDiv}>
        <IconButton
          aria-label="phone"
          size="large"
          style={styles.callButton}
          onClick={handleEndCall}
        >
          <CallEndIcon />
        </IconButton>
      </div>
    </div>
  );
}

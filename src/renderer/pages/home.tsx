import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CallEndIcon from '@mui/icons-material/CallEnd';
import PhoneIcon from '@mui/icons-material/Phone';

enum STATE {
  IDLE,
  CALLING,
  INCOMING_CALL,
}

const styles = {
  callButton: (disabled: boolean) => ({
    backgroundColor: disabled ? 'gray' : 'green',
    color: 'white',
  }),
  endCallButton: {
    backgroundColor: 'red',
    color: 'white',
  },
  callingDialogButDiv: {
    display: 'flex',
    justifyContent: 'center',
    padding: '5px',
  },
};

interface CallDialogProps {
  open: boolean;
  onClose: () => void;
}

function CallingDialog(props: CallDialogProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  // Wait ten seconds or fails call
  setTimeout(() => {
    handleClose();
  }, 10000);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Calling...</DialogTitle>
      <div style={styles.callingDialogButDiv}>
        <IconButton
          aria-label="phone"
          size="small"
          style={styles.endCallButton}
          onClick={handleClose}
        >
          <CallEndIcon />
        </IconButton>
      </div>
    </Dialog>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [callState, setCallState] = React.useState(STATE.IDLE);

  // TODO: Listen for calls

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

  const openCallDialog = callState == STATE.CALLING;

  return (
    <div>
      <div className="Video">
        <Box
          sx={{
            width: 400,
            height: 300,
            backgroundColor: 'black',
          }}
        />
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
    </div>
  );
}

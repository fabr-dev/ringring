import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CallEndIcon from '@mui/icons-material/CallEnd';

enum STATE {
  ACTIVE_CALL,
  ENDING_CALL,
}

const styles = {
  callButton: {
    backgroundColor: 'red',
    color: 'white',
  },
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

export default function Chat() {
  const navigate = useNavigate();
  const [callState, setCallState] = React.useState(STATE.ACTIVE_CALL);

  const handleEndCall = () => {
    // TODO: End the call
    setCallState(STATE.ENDING_CALL);
    navigate('/');
  };

  return (
    <div>
      <div className="Video">
        <Box
          sx={{
            width: 800,
            height: 600,
            backgroundColor: 'black',
          }}
        />
      </div>
      <div className="Hello">
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

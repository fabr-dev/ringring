import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import PhoneIcon from '@mui/icons-material/Phone';
import CallEndIcon from '@mui/icons-material/CallEnd';

const styles = {
  answerCallButton: {
    backgroundColor: 'green',
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

interface CallDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CallingDialog(props: CallDialogProps) {
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

interface IncomingCallDialogProps {
  open: boolean;
  onAnswer: () => void;
  onHangup: () => void;
}

export function IncomingCallDialog(props: IncomingCallDialogProps) {
  const { open, onAnswer, onHangup } = props;

  const handleClose = (answered: boolean) => () => {
    if (answered) {
      onAnswer();
    } else {
      onHangup();
    }
  };

  // Wait ten seconds or fails call
  //   setTimeout(() => {
  //     onHangup();
  //   }, 10000);

  return (
    <Dialog onClose={handleClose(false)} open={open}>
      <DialogTitle>Incoming Call</DialogTitle>
      <div style={styles.callingDialogButDiv}>
        <IconButton
          aria-label="phone"
          size="small"
          style={styles.answerCallButton}
          onClick={handleClose(true)}
        >
          <PhoneIcon />
        </IconButton>
        <IconButton
          aria-label="phone"
          size="small"
          style={styles.endCallButton}
          onClick={handleClose(false)}
        >
          <CallEndIcon />
        </IconButton>
      </div>
    </Dialog>
  );
}

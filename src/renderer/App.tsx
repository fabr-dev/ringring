import * as React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CallEndIcon from '@mui/icons-material/CallEnd';
import PhoneIcon from '@mui/icons-material/Phone';

import './App.css';


const emails = ['username@gmail.com', 'user02@gmail.com'];

const styles = {
  callButton: {
    backgroundColor: "green",
    color: "white"
  },
  endCallButton: {
    backgroundColor: "red",
    color: "white"
  },
  callingDialogButDiv: {
    display: "flex",
    justifyContent: "center",
    padding: "5px",
  },
 }
interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Calling...</DialogTitle>
      <div style={styles.callingDialogButDiv}>
        <IconButton aria-label="phone" size="small" style={styles.endCallButton}>
            <CallEndIcon />
        </IconButton>
      </div>
    </Dialog>
  );
}

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <div className="Video">
        <Box
          sx={{
            width: 900,
            height: 500,
            backgroundColor: 'black'
          }}
        />
      </div>
      <div className="Hello">
        <IconButton aria-label="phone" size="large" style={styles.callButton} onClick={handleClickOpen}>
          <PhoneIcon />
        </IconButton>
      </div>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

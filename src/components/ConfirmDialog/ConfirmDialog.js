import { Dialog,
         DialogTitle,
         DialogContent,
         DialogContentText,
         DialogActions,
         Button } from '@mui/material';
import { useState,useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { useNavigate } from 'react-router-dom';

const ConfirmDialog = () => {
    const [open, setOpen] = useState(false);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const userId = user?.userId;

    const handleClickToOpen = () => {
      setOpen(!open);
    };
    
    const handleToClose = () => {
      setOpen(!open);
    };

    const terminateAccount = () => {
        fetch(`https://localhost:5000/api/deleteUser/${userId}`, {
    method: 'DELETE'
  })
  .then(response => response.json());
  navigate('/Inner')
}
    
    return (
      <div>
        <Button variant="contained" color="error" 
                onClick={handleClickToOpen}>
          Terminate account
        </Button>
        <Dialog open={open} onClose={handleToClose}>
          <DialogTitle>{"Are you sure you want to delete your account?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This action is irreversible.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={terminateAccount} 
                    color="primary" autoFocus>
              Yes
            </Button>
            <Button onClick={handleToClose} 
                    color="error" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

export default ConfirmDialog;
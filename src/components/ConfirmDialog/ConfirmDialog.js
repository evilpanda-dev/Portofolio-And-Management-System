import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import { useState, useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAlert } from '../../hooks/useAlert';
import { deleteProfile } from '../../features/profileFormThunks'

let userId

const ConfirmDialog = (props) => {
  const {
    anotherUserId
  } = props

  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const triggerAlert = useAlert()

  if (anotherUserId === null || anotherUserId === undefined) {
    userId = user.userId
  } else {
    userId = anotherUserId
  }


  const handleClickToOpen = () => {
    setOpen(!open);
  };

  const handleToClose = () => {
    setOpen(!open);
  };

  const terminateAccount = async () => {
    const data = await dispatch(deleteProfile({ userId: userId }))
    triggerAlert(data, "Account successeful terminated!")
    dispatch({ type: "WINDOW_ACTIVATED", payload: true });
    if (anotherUserId === null || anotherUserId === undefined) {
      navigate('/Inner')
    }
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
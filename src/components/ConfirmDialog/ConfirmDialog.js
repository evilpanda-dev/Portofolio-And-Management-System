import { Dialog,
         DialogTitle,
         DialogContent,
         DialogContentText,
         DialogActions,
         Button } from '@mui/material';
import { useState,useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {AlertContext} from '../../providers/AlertProvider';
import AlertWindow from '../AlertWindow/AlertWindow';
const ConfirmDialog = () => {
    const [open, setOpen] = useState(false);
    const { user } = useContext(UserContext);
    const {setAlert} = useContext(AlertContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = user?.userId;

    const handleClickToOpen = () => {
      setOpen(!open);
    };
    
    const handleToClose = () => {
      setOpen(!open);
    };

    const terminateAccount = () => {
       const response = fetch(`https://localhost:5000/api/deleteUser/${userId}`, {
    method: 'DELETE'
  })
  .then(response => {
          if (response.status === 200) {

    setAlert({appAlerts:
            alert = (
              // showAlertWindow("success","Account created successfully",true)
              <AlertWindow message="Account successeful terminated!" alertType="success"/>
            )})
          }
          else {
            //return response.text().then(text => { throw new Error(text) })
            return response.json().then(text => { throw new Error(text.Message) })
          }
        })
        .catch(error => {
    
          // console.log('caught it!',error.message);
          setAlert({appAlerts:
            alert = (
            // showAlertWindow("error",error.message,true)
            <AlertWindow message={error.message} alertType="error" />
          )})
        })
    dispatch({type:"WINDOW_ACTIVATED",payload:true});
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
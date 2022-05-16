import { Alert,Snackbar } from "@mui/material"
import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"

const AlertWindow = props => {
    const{alertType,message} = props
    const dispatch = useDispatch()
    const isVisible = useSelector((state) => state.alertWindowState.isWindowAlert);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch({type:"WINDOW_DEACTIVATED",payload:false})
}
    return(
        <Snackbar open={isVisible}  autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity={alertType} sx={{ width: '100%' }}>
            {message}
        </Alert>
        </Snackbar>
    )}

    export default AlertWindow
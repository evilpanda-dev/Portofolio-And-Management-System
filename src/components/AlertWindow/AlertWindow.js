import { Alert,Snackbar } from "@mui/material"
import { useState } from "react"

// export const showAlertWindow =(alertType,message,state)=>{

//     const handleClose = (event, reason) => {
//         if (reason === 'clickaway') {
//           return;
//         }
//     state = false
//       };

//         return(
//         //     <Alert variant="filled" severity="error" >
//         //     {message}
//         //   </Alert>   
        
//         <Snackbar open={state}  autoHideDuration={6000} onClose={handleClose}>
//   <Alert onClose={handleClose} variant="filled" severity={alertType} sx={{ width: '100%' }}>
//     {message}
//   </Alert>
//   </Snackbar>
//             )
    
//     }

const AlertWindow = (props) => {
    const{alertType,message,state} = props
    const [open, setOpen] = useState(state);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(!state);
}
    return(
        <Snackbar open={open}  autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity={alertType} sx={{ width: '100%' }}>
            {message}
        </Alert>
        </Snackbar>
    )}

    export default AlertWindow
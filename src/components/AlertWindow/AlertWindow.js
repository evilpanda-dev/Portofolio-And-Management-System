import { Alert,Snackbar } from "@mui/material"
import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"

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

const AlertWindow = props => {
    const{alertType,message} = props
    const dispatch = useDispatch()
    const isVisible = useSelector((state) => state.alertWindowState.isWindowAlert);
//     const [open, setOpen] = useState(state);
// console.log("open = "+ open)
// console.log("state = " +state)

    // const handleClick = () => {
    //     setOpen(open);
    //   };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch({type:"WINDOW_DEACTIVATED",payload:false})
        // setOpen(!state);
}

// setTimeout(() => {
//     handleClick()
// },1000)

    return(
        <Snackbar open={isVisible}  autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity={alertType} sx={{ width: '100%' }}>
            {message}
        </Alert>
        </Snackbar>
    )}

    export default AlertWindow
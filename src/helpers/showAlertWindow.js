import { Alert,Snackbar } from "@mui/material"
import { useState } from "react"


export const showAlertWindow =(alertType,message)=>{
        return(
        //     <Alert variant="filled" severity="error" >
        //     {message}
        //   </Alert>   
        <Snackbar open="true"  autoHideDuration={6000} >
  <Alert variant="filled" severity={alertType} sx={{ width: '100%' }}>
    {message}
  </Alert>
  </Snackbar>
            )
    
    }
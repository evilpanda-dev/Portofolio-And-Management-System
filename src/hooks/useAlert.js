import { useContext, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AlertContext } from "../providers/AlertProvider";
import AlertWindow from "../components/AlertWindow/AlertWindow";

export const useAlert = () => {
    const { setAlert } = useContext(AlertContext);
    const dispatch = useDispatch();
    let alert;
    return useCallback((data,message) => {
        try {
            if (data.meta.requestStatus == "fulfilled") {
                setAlert({
                    appAlerts:
                        alert = (
                            <AlertWindow message={message} alertType={"success"} />
                        )
                })
            }
            else {
                throw new Error(data.payload)
            }
        } catch (error) {
            setAlert({
                appAlerts:
                    alert = (
                        <AlertWindow message={error.message} alertType="error" />
                    )
            })
        }
        finally {
            dispatch({ type: "WINDOW_ACTIVATED", payload: true });
        }
    },[dispatch,setAlert])

    // .then((data) => {
    //     if(data.meta.requestStatus == "fulfilled"){
    //       setAlert({appAlerts:
    //         alert = (
    //         <AlertWindow message="Skill added successefully" alertType="success"/>
    //       )})
    //     } 
    //     else {
    //       //return response.text().then(text => { throw new Error(text) })
    //       //return data.json().then(text => { throw new Error(text.Message) })
    //       throw new Error(data.payload)
    //     }
    //     })
    //     .catch(error => {

    //     // console.log('caught it!',error.message);
    //     setAlert({appAlerts:
    //       alert = (
    //       // showAlertWindow("error",error.message,true)
    //       <AlertWindow message={error.message} alertType="error" />
    //     )})
    //     })
    //     dispatch({type:"WINDOW_ACTIVATED",payload:true});
}
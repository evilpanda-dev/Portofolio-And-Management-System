import "../Logout/Logout.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/logoutThunk";
import { AlertContext } from "../../providers/AlertProvider";
import { useContext } from "react";
import AlertWindow from "../AlertWindow/AlertWindow";
import {useAlert} from "../../hooks/useAlert";

const Logout = (props) => {
  const { setUserName, setRole } = props;
  let navigate = useNavigate();
 const dispatch = useDispatch();
const {setAlert} = useContext(AlertContext)
const triggerAlert = useAlert()

  const logout = async () => {
   const data = await dispatch(logoutUser())
   triggerAlert(data,"Logout successeful!")
     if(data.meta.requestStatus == "fulfilled"){
        setUserName("");
    setRole("");
    navigate("/Inner")
     }
    // .then((data) => {
    //   if(data.meta.requestStatus == "fulfilled"){
    //     setUserName("");
    // setRole("");
    // navigate("/Inner")
    //     setAlert({appAlerts:
    //       alert = (
    //       <AlertWindow message="You successefully logged in" alertType="success"/>
    //     )})
    //   } 
    //   else {
    //     throw new Error(data.payload)
    //   }
    //   })
    //   .catch(error => {
      
    //   // console.log('caught it!',error.message);
    //   setAlert({appAlerts:
    //     alert = (
    //     // showAlertWindow("error",error.message,true)
    //     <AlertWindow message={error.message} alertType="error" />
    //   )})
    //   })
    //   dispatch({type:"WINDOW_ACTIVATED",payload:true})
    // await fetch("https://localhost:5000/api/logout", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   credentials: "include",
    // });
    // setUserName("");
    // setRole("");
    // navigate("/Inner")
  };

  return (
    <div className="logoutButton">
      <button id="showLogot" className="showLogoutButton" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;

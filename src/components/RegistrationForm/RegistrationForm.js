import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../FormikControl/FormikControl.js";
import "./RegistrationForm.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect,useContext } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm.js";

import AlertWindow from "../AlertWindow/AlertWindow.js";
import { AlertContext } from "../../providers/AlertProvider.js";
import { registerUser } from "../../features/registrationFormThunk.js";

const RegistrationForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
//const [open,setOpen] = useState(true)
  const isVisible = useSelector((state) => state.registerPopupState.popup);
  const dispatch = useDispatch();
const {setAlert} = useContext(AlertContext)

  const initialValues = {
    userName: "",
    registrationEmail: "",
    registrationPassword: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("Required").min(6, "Too Short!"),
    registrationEmail: Yup.string().email("Invalid email format").required("Required"),
    registrationPassword: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters long"),
  });
//let alert;
  const onSubmit = async () => {
    // const response = await fetch("https://localhost:5000/api/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     UserName,
    //     Email,
    //     Password,
    //   }),
    // })
    dispatch(registerUser({userName : userName,email : email,password : password}))
    .then((data) => {
      if(data.meta.requestStatus == "fulfilled"){
        setRedirect(true);
        setAlert({appAlerts:
          alert = (
          <AlertWindow message="Account created successfully" alertType="success"/>
        )})
      } 
      else {
        throw new Error(data.payload)
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
      dispatch({type:"WINDOW_ACTIVATED",payload:true})
//     setTimeout(() => {
//     setOpen(false)
// },1000)
    // if (response.status === 201) {
    //   setRedirect(true);
    // } else {
    //  // alert(response)
    //  //console.log(response)
    // }
  };

  const activateLogin = () => {
      dispatch({ type: "LOGIN_CLICKED", payload: true });
  };

  const activateSectionVisibility = () => {
    dispatch({ type: "REGISTER_CLICKED", payload: true });
  };

  const deactivateSectionVisibility = () => {
    dispatch({ type: "REGISTER_CLOSED", payload: false });
  };

  const changeButtonState = () => {
    isVisible ? deactivateSectionVisibility() : activateSectionVisibility();
  };

  useEffect(() => {
    if (redirect) {
      deactivateSectionVisibility();
      activateLogin();
    }
  }, [redirect]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <div className="registerButton">
              <button
                id="showRegister"
                className="showRegisterButton"
                type="button"
                onClick={changeButtonState}
              >
                Register
              </button>
            </div>
            <div className={isVisible ? "popup active" : "popup"}>
              <div className="closeBtn" onClick={changeButtonState}>
                &times;
              </div>
              <div className="form">
                <h2>Register</h2>
                <div className="formElement">
                  <FormikControl
                    control="input"
                    type="text"
                    label="UserName"
                    name="userName"
                    placeholder="Enter your username"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      formik.handleChange(e);
                    }}
                  />
                </div>
                <div className="formElement">
                  <FormikControl
                    control="input"
                    type="email"
                    label="Email"
                    name="registrationEmail"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      formik.handleChange(e);
                    }}
                  />
                </div>
                <div className="formElement">
                  <FormikControl
                    control="input"
                    type="password"
                    label="Password"
                    name="registrationPassword"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      formik.handleChange(e);
                    }}
                  />
                </div>
                <div className="formElement">
                  <button type="submit" disabled={!formik.isValid}>
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegistrationForm;

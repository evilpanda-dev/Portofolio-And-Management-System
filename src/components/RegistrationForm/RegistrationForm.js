import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../FormikControl/FormikControl.js";
import "./RegistrationForm.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm.js";
import Alert from "@mui/material/Alert";
import AlertWindow from "../AlertWindow/AlertWindow.js";

const RegistrationForm = () => {
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const isVisible = useSelector((state) => state.registerPopupState.popup);
  const dispatch = useDispatch();

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
let alert;
  const onSubmit = async () => {
    const response = await fetch("https://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        UserName,
        Email,
        Password,
      }),
    })
    .then(response => {
      if (response.status === 201) {
        setRedirect(true);
        alert = (
          // showAlertWindow("success","Account created successfully",true)
          <AlertWindow message="Account created successfully" alertType="success"  state={true}/>
        )
      }
      else {
        //return response.text().then(text => { throw new Error(text) })
        return response.json().then(text => { throw new Error(text.Message) })
      }
    })
    .catch(error => {
      // console.log('caught it!',error.message);
      alert = (
        // showAlertWindow("error",error.message,true)
        <AlertWindow message={error.message} alertType="error" state={true}/>
      )
    })
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
            {alert}
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
                    value={UserName}
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
                    value={Email}
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
                    value={Password}
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

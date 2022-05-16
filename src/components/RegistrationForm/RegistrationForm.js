import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../FormikControl/FormikControl.js";
import "./RegistrationForm.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { registerUser } from "../../features/registrationFormThunk.js";
import { useAlert } from "../../hooks/useAlert.js";

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

const RegistrationForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const isVisible = useSelector((state) => state.registerPopupState.popup);
  const dispatch = useDispatch();
  const triggerAlert = useAlert()

  const onSubmit = async () => {
    const data = await dispatch(registerUser({ userName: userName, email: email, password: password }))
    triggerAlert(data, "Account created successfully")
    if (data.meta.requestStatus == "fulfilled") {
      setRedirect(true);
    }
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

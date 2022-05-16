import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../FormikControl/FormikControl.js";
import "./LoginForm.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../providers/UserProvider.js";
import { loginUser } from "../../features/loginFormThunk.js";
import { useAlert } from "../../hooks/useAlert.js";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Password must be at least 8 characters"),
});

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = (props) => {
  const { setUserName, setRole } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { setUser } = useContext(UserContext)
  const triggerAlert = useAlert()

  const onSubmit = async () => {
    const data = await dispatch(loginUser({ email: email, password: password }))
    triggerAlert(data, "You successefully logged in")
    if (data.meta.requestStatus == "fulfilled") {
      setRedirect(true);
      const userName = data.meta.arg.email;
      const role = data.meta.arg.role;
      setUserName(userName)
      setRole(role)
      setUser({ userName: userName, role: role })
    }
  };

  const isVisible = useSelector((state) => state.popupState.popup);

  const activateSectionVisibility = () => {
    dispatch({ type: "LOGIN_CLICKED", payload: true });
  };

  const deactivateSectionVisibility = () => {
    dispatch({ type: "LOGIN_CLOSED", payload: false });
  };

  const changeButtonState = () => {
    isVisible ? deactivateSectionVisibility() : activateSectionVisibility();
  };

  useEffect(() => {
    if (redirect) {
      deactivateSectionVisibility();
      navigate("/Inner");
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
            <div className="loginButton">
              <button
                id="showLogin"
                className="showLoginButton"
                type="button"
                onClick={changeButtonState}
              >
                Login
              </button>
            </div>
            <div className={isVisible ? "popup active" : "popup"}>
              <div className="closeBtn" onClick={changeButtonState}>
                &times;
              </div>
              <div className="form">
                <h2>Log in</h2>
                <div className="formElement">
                  <FormikControl
                    control="input"
                    type="email"
                    label="Email"
                    name="email"
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
                    name="password"
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
                    Sign in
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

export default LoginForm;

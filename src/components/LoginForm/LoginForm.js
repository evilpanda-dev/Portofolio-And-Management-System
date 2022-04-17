import React from 'react';
import { Formik,Form } from 'formik';
import * as Yup from 'yup'
import FormikControl from '../FormikControl/FormikControl.js'
import './LoginForm.css'
import { useSelector,useDispatch } from 'react-redux';

const LoginForm = () => {
    const initialValues = {
        email: '',
        password: ''
      }
    
      const validationSchema = Yup.object({
        email: Yup.string()
          .email('Invalid email format')
          .required('Required'),
        password: Yup.string().required('Required')
        .min(6,'Password must be at least 8 characters')
      })
    
      const onSubmit = values => {
        console.log('Form data', values)
      }
    
    const isVisible = useSelector(state => state.popupState.popup)
    const dispatch = useDispatch()

    const activateSectionVisibility = () => {
        dispatch({ type: 'LOGIN_CLICKED', payload: true })
    }

    const deactivateSectionVisibility = () => {
        dispatch({ type: 'LOGIN_CLOSED', payload: false })
    }

    const changeButtonState = () => {
        isVisible ? deactivateSectionVisibility() : activateSectionVisibility()
    }
      return (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {formik => {
            return (
              <Form>
                  <div className="loginButton">
                      <button id="showLogin" className="showLoginButton" onClick={changeButtonState}>Login</button>
                  </div>
                  <div className={isVisible ? "popup active" : "popup"}>
                      <div className='closeBtn' onClick={changeButtonState}>&times;</div>
                      <div className="form">
                          <h2>Log in</h2>
                          <div className='formElement'>
                          <FormikControl
                  control='input'
                  type='email'
                  label='Email'
                  name='email'
                  placeholder='Enter your email'
                />
                          </div>
                          <div className='formElement'>
                          <FormikControl
                  control='input'
                  type='password'
                  label='Password'
                  name='password'
                  placeholder='Enter your password'
                />
                          </div>
                          <div className='formElement'>
                          <button type='submit' disabled={!formik.isValid}>Sign in</button>
                          </div>
                      </div>
                  </div>
              </Form>
            )
          }}
        </Formik>
      )
    }
    
    export default LoginForm
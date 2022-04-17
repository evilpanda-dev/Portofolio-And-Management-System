import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../FormikControl/FormikControl.js'
import "./RegistrationForm.css"
import { useSelector,useDispatch } from 'react-redux'
import { useState,useEffect } from 'react'
import {Navigate} from 'react-router-dom'
import LoginForm from '../LoginForm/LoginForm.js'

const RegistrationForm = () => {
const [UserName,setUserName] = useState('')
const [Email,setEmail] = useState('')
const [Password,setPassword] = useState('')
const [redirect,setRedirect] = useState(false)

const isVisible = useSelector(state => state.registerPopupState.popup)
const dispatch = useDispatch()

  const initialValues = {
      userName : '',
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
      userName : Yup.string()
      .required('Required')
      .min(6, 'Too Short!'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
    password: Yup.string().required('Required')
    .min(8,"Password must be at least 8 characters long"),
  })

  const onSubmit = async() => {

  const response =  await fetch('https://localhost:5000/api/register',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
body: JSON.stringify({
    UserName,
    Email,
    Password
})
    });
if(response.status === 201){
    setRedirect(true)
}
  }

  const activateLogin = () => {
    dispatch({ type: 'LOGIN_CLICKED', payload: true })
}

const activateSectionVisibility = () => {
    dispatch({ type: 'REGISTER_CLICKED', payload: true })
}

const deactivateSectionVisibility = () => {
    dispatch({ type: 'REGISTER_CLOSED', payload: false })
}

const changeButtonState = () => {
    isVisible ? deactivateSectionVisibility() : activateSectionVisibility()
}

    useEffect(()=>{
if(redirect){
    deactivateSectionVisibility()
    activateLogin()
}
    },[redirect])

  return (
    <Formik
     initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => {
        return (
            <Form>
            <div className='registerButton'>
                <button id="showRegister" className="showRegisterButton" onClick={changeButtonState}>Register</button>
                </div>
                <div className={isVisible ? "popup active" : "popup"}>
                <div className='closeBtn' onClick={changeButtonState}>&times;</div>
                <div className="form">
                    <h2>Register</h2>
                    <div className='formElement'>
              <FormikControl
              control='input'
              type='text'
              label='UserName'
              name='userName'
              placeholder='Enter your username'
              value={UserName}
              onChange={(e) => {setUserName(e.target.value);formik.handleChange(e)}}
              />
              </div>
                          <div className='formElement'>
            <FormikControl
              control='input'
              type='email'
              label='Email'
              name='email'
                placeholder='Enter your email'
                value={Email}
                onChange={(e) => {setEmail(e.target.value); formik.handleChange(e)}}
            />
             </div>
             <div className='formElement'>
            <FormikControl
              control='input'
              type='password'
              label='Password'
              name='password'
              placeholder='Enter your password'
              value={Password}
              onChange={(e) => {setPassword(e.target.value);formik.handleChange(e)}}
            />
            </div>
            <div className='formElement'>
            <button type='submit' disabled={!formik.isValid}>
              Sign up
            </button>
            </div>
            </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default RegistrationForm
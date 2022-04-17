import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../FormikControl/FormikControl.js'
import "./RegistrationForm.css"
import { useSelector,useDispatch } from 'react-redux'

const RegistrationForm = () => {
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

  const onSubmit = values => {
    console.log('Form data', values)
  }

  const isVisible = useSelector(state => state.registerPopupState.popup)
  const dispatch = useDispatch()

  const activateSectionVisibility = () => {
      dispatch({ type: 'REGISTER_CLICKED', payload: true })
  }

  const deactivateSectionVisibility = () => {
      dispatch({ type: 'REGISTER_CLOSED', payload: false })
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
              />
              </div>
                          <div className='formElement'>
            <FormikControl
              control='input'
              type='email'
              label='Email'
              name='email'
            />
             </div>
             <div className='formElement'>
            <FormikControl
              control='input'
              type='password'
              label='Password'
              name='password'
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
import React from 'react'
import Input from '../Input/Input.js'
import Textarea from '../TextArea/TextArea.js'

const FormikControl= (props)=> {
  const { control, ...rest } = props
  switch (control) {
    case 'input':
      return <Input {...rest} />
    case 'textarea':
      return <Textarea {...rest} />
    default:
      return null
  }
}

export default FormikControl
import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError/TextError.js";

const Textarea = (props) => {
  const { label, name, labelClass, inputClass, inputError, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name} className={labelClass}>{label}</label>
      <Field as="textarea" id={name} name={name} className={inputClass} {...rest} />
      <ErrorMessage component={TextError} name={name} className={inputError} />
    </div>
  );
};

export default Textarea;

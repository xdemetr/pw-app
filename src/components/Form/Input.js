import React from 'react';

const FormControl = ({input, meta, child, element, ...props}) => {
  const hasError = meta.touched && meta.error;

  return (
      <div className={`form-group ${hasError ? 'has-danger' : ''}`}>
        {props.children}
        {hasError && <div className="invalid-feedback">{meta.error}</div> }
      </div>
  )
};

const Input  = (props) => {
  const {input, meta, child, element, ...restProps} = props;

  const hasError = meta.touched && meta.error;

  return(
      <FormControl {...props}>
        <input {...input} {...restProps}
               className={`form-control ${hasError ? 'is-invalid' : ''}` }  />
      </FormControl>
  )
};

export {
  Input
}

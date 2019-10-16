import React from 'react';
import AutoCompleteInput from './AutoCompleteInput';

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

const AutoInput  = (props) => {
  const {input, meta, child, element, value, ...restProps} = props;

  const hasError = meta.touched && meta.error;
  const inputProps = {
    className: `form-control ${hasError ? 'is-invalid' : ''}`,
    value: input.value
  };

  return(
      <FormControl {...props}>
        <AutoCompleteInput
            suggestions={props.suggestions}
            {...input} {...inputProps} {...restProps} />
      </FormControl>
  )
};

export {
  Input,
  AutoInput
}

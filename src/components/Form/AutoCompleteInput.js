import React, {useState} from 'react';
import Autosuggest from 'react-autosuggest';
import './AutoCompleteInput.css';

const AutoCompleteInput =(props) => {
  let [value, setValue] = useState('');

  const renderSuggestion = suggestion => {
    return (
        <div className="result">
          <div>{suggestion.name}</div>
        </div>
    )
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const getSuggestionValue = suggestion => {
    return suggestion.name;
  };

  const inputProps = {
    ...props,
    value,
    onChange
  };

  return (
      <Autosuggest
          suggestions={props.suggestions}
          onSuggestionsFetchRequested={props.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={props.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
      />
  )
};

export default AutoCompleteInput;

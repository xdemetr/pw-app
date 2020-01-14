import React from 'react';

const Error: React.FC<{message?: string}> = ({message}) => {

  if(!message) return null;

  return (
      <div className="alert alert-danger">
        {message}
      </div>
  );
};

export default Error;

import React from "react";

const Input = ({ error, name, label, ...rest }) => {
  return (
    <div>
      <label htmlFor={name}></label>
      <input {...rest} id={name} name={name} />
      {error && <div>{error}</div>}
    </div>
  );
};

export default Input;

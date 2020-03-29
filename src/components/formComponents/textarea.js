import React from "react";

const Textarea = ({ error, name, ...rest }) => {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <textarea name={name} id={name} cols="30" rows="10" {...rest} />
      {error || <p>{error}</p>}
    </div>
  );
};

export default Textarea;

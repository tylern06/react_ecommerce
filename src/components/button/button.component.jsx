import React from 'react';
import './button.styles.scss';
/*
types of button
default 
inverted
google sign in

*/
const BUTTON_TYPE = {
  google: 'google-sign-in',
  inverted: 'inverted',
};
function Button({ children, buttonType, otherProps }) {
  return (
    <button
      className={`button-container ${BUTTON_TYPE[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;

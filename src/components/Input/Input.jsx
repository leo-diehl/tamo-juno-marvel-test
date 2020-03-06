import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// -- Component
function Input({
  value,
  type,
  placeholder,
  onChange,
}) {
  return (
    <StyledInput
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

// -- Styles
const StyledInput = styled.input`
  background: none;
  border-bottom: 2px solid #151515 !important;

  width: 100%;
  max-width: 300px;
  height: 36px;

  border: none;

  padding-left: 24px;

  font-size: 1.2rem;
  text-transform: uppercase;

  ::placeholder {
    opacity: 0.98;
  }
`;

// -- Props
Input.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['number', 'text']),
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
};

// -----
export default Input;

import React from 'react';

import PropTypes from 'prop-types';

import styled from 'styled-components';

function Button({ onClick, children }) {
  return (
    <StyledButton
      type="button"
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

// -- Styles
const StyledButton = styled.button`
  cursor: pointer;

  background: #E62B29;
  padding: 6px 16px;
  margin: 0 4px;

  border: none;
  outline: none;

  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
  font-family: Roboto Black;
  letter-spacing: 1px;

  transition: background .3s;

  &:hover {
    background: #c42323;
  }
`;

// -- Props
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};

Button.defaultProps = {
  children: null,
};

export default Button;

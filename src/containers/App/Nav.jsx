import React from 'react';

import styled from 'styled-components';

import MarvelLogo from '../../assets/images/marvel-logo.png';

function Nav() {
  return (
    <NavContainer>
      <a href="https://www.marvel.com/">
        <img src={MarvelLogo} alt="Marvel Logo" height="50" />
      </a>
    </NavContainer>
  );
}

// -- Styles
const NavContainer = styled.nav`
  width: 100%;
  background-color: #202020;
  display: flex;
  justify-content: center;

  a {
    height: 50px;
  }
`;

// -----
export default Nav;

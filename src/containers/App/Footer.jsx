import React from 'react';

import styled from 'styled-components';

function Footer() {
  return (
    <FooterContainer>
      <a href="http://marvel.com">Data provided by Marvel. © 2014 Marvel</a>
    </FooterContainer>
  );
}

// -- Styles
const FooterContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  background: #151515;
  height: 100px;

  a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.5)
  }
`;

// -----
export default Footer;

// http://marvel.com
//

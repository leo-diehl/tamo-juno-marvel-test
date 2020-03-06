import React from 'react';

import styled from 'styled-components';

import RouteSwitcher from '../../router/RouteSwitcher';

// -- Component
function Body() {
  return (
    <BodyWrapper>
      <BodyContainer>
        <BodyContent>
          <RouteSwitcher />
        </BodyContent>
      </BodyContainer>
    </BodyWrapper>
  );
}

// -- Styles
const BodyWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const BodyContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.lg}px;

  min-height: 80vh;
`;

const BodyContent = styled.div`
  padding: 20px 32px;
`;

// -----
export default Body;

import React from 'react';

import { Provider as StoreProvider } from 'react-redux';
import { Normalize as NormalizeStyles } from 'styled-normalize';
import styled, { ThemeProvider } from 'styled-components';

// Redux
import store from '../../store';

// Styling
import '../../assets/fonts/main.css'; // Font importions
import GlobalStyles from '../../assets/styles/globals';
import theme from '../../assets/styles/theme';

import Body from './Body';
import Nav from './Nav';
import Footer from './Footer';

// -- Component
function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <NormalizeStyles />
        <GlobalStyles />
        <FlexDiv>
          <Nav />
          <Body />
          <Footer />
        </FlexDiv>
      </ThemeProvider>
    </StoreProvider>
  );
}

// -- Styles
const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

// -----
export default App;

import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle  } from 'styled-components';
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter';
import { CurrencyConverterProvider } from './components/CurrencyConverter/CurrencyConverterContex';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0 20%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
`
const StyledContainer = styled.div`
  display: flex;
`
const StyledApp = styled.div`
  margin: 0;
  height: 100vh;
`
function App() {

  return (
      <StyledApp>
        <GlobalStyle/>
        <StyledContainer>
          <CurrencyConverterProvider>
            <CurrencyConverter></CurrencyConverter>
          </CurrencyConverterProvider>
        </StyledContainer>
      </StyledApp>
    
  );
}

export default App;

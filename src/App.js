import React from 'react';
import Header from './header';
import Footer from './footer';
import { Switch, Route } from 'react-router-dom';
import Main from './main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const App = () => (
 <MuiThemeProvider>
  <div>
    <Header />
    <Main />
    <Footer />
  </div>
 </MuiThemeProvider>
)

export default App
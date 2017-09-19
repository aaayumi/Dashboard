import React from 'react';
import Header from './header';
import { Switch, Route } from 'react-router-dom';
import Main from './main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const App = () => (
 <MuiThemeProvider>
  <div>
    <Header />
    <Main />
  </div>
 </MuiThemeProvider>
)

export default App

import React from 'react';
import Header from './header';
import { Switch, Route } from 'react-router-dom';
import Main from './main';


const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

export default App

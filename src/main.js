import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './home'
import Payment from './payment';
import Categories from './categories';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/Payment' component={Payment}/>
      <Route path='/Categories' component={Categories}/>
    </Switch>
  </main>
)

export default Main
import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
  <h1> Ticket Purchase Conversational Mix </h1>
    <nav>
      <ul>
        <li className="navMenu"><Link to='/'>PAYMENT</Link></li>
        <li className="navMenu"><Link to='/categories'>ALL CATEGORIES</Link></li>
        <li className="navMenu"><Link to='/details'>DETAILS</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header
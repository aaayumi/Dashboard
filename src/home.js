import React from 'react'

const Panel = () => (
    <div id="PaymentPanel" > 
    <p >Spent Last 14 days </p>
    <h1>$90,000.43</h1>
    </div>
     )

const List = () => (
    <div>
    <ul>
    <li> List come here </li>
    <li> List come here </li>
    </ul>
    </div>
    )

const Home = () => (
  <div>
    <Panel />
    <List />
  </div>
)

export default Home

import React, { Component } from 'react';

const PiChart =()=> (
  <div className="Pi">Chart come here</div>
  )

const BarChart =()=> (
<div className="Bar">Bar chart come here </div>
)

const QuestionList =()=>(
<div>Question List come hre </div>
)

const Chart =()=> (
<div className="chart">
<PiChart />
<BarChart />
</div>
)

class Categories extends Component {
  render() {
    return (
    <div className="Categories">
    <Chart />
       <p className="clear">Categories page come here</p>
       </div>
    );
  }
}

export default Categories;

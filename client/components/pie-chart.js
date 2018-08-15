import React from 'react'
import {VictoryPie} from 'victory'

const PieChart = props => {
  return (
    <div className="below-nav-bar">
      <VictoryPie
        colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy', 'green']}
        data={props.data}
      />
    </div>
  )
}

export default PieChart

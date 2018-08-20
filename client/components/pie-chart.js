import React from 'react'
import {VictoryPie} from 'victory'

const PieChart = ({data}) => {
  const pieData = data[0] ? data : newUserData
  return (
    <div className="below-nav-bar">
      <VictoryPie
        colorScale={
          !data[0]
            ? null
            : ['tomato', 'orange', 'gold', 'cyan', 'navy', 'green']
        }
        labelRadius={!data[0] ? 50 : null}
        data={pieData}
      />
    </div>
  )
}

const newUserData = [{x: 'Begins\nNow', y: 1}, {x: 'Your\nMeme\nFuture', y: 1}]

export default PieChart

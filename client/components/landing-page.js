import React from 'react'
import {VictoryChart, VictoryLine, VictoryScatter} from 'victory'

const data = [
  {month: 3, earnings: 13000},
  {month: 4, earnings: 16500},
  {month: 5, earnings: 14250},
  {month: 6, earnings: 19000},
  {month: 7, earnings: 19000},
  {month: 8, earnings: 19000}
]

export default class LandingPage extends React.Component {
  state = {}

  render() {
    return (
      <div>
        <VictoryChart height={400}>
          <VictoryLine
            interpolation="linear"
            data={data}
            style={{data: {stroke: '#c43a31'}}}
          />
          <VictoryScatter data={data} style={{data: {fill: 'c43a31'}}} />
        </VictoryChart>
      </div>
    )
  }
}

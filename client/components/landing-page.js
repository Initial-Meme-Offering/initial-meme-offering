import React from 'react'
import {VictoryChart, VictoryLine, VictoryScatter} from 'victory'
import {Container} from 'semantic-ui-react'

const sixMonths = [
  {month: 'March', marketVal: 64000},
  {month: 'April', marketVal: 58000},
  {month: 'May', marketVal: 61000},
  {month: 'June', marketVal: 60000},
  {month: 'July', marketVal: 34000},
  {month: 'August', marketVal: 50000}
]

export default class LandingPage extends React.Component {
  state = {}

  render() {
    return (
      <Container>
        <VictoryChart
          data={sixMonths}
          height={250}
          x="month"
          y="marketVal"
          title="Total Market Value"
        >
          <VictoryLine
            interpolation="linear"
            data={sixMonths}
            x="month"
            y="marketVal"
            style={{
              data: {stroke: '#c43a31', strokeWidth: 1}
            }}
          />
          <VictoryScatter
            data={sixMonths}
            x="month"
            y="marketVal"
            style={{data: {fill: 'c43a31'}}}
          />
        </VictoryChart>
      </Container>
    )
  }
}

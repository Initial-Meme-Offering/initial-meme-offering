import React from 'react'
import {VictoryChart, VictoryLine, VictoryScatter} from 'victory'
import {Container, Header} from 'semantic-ui-react'

const styles = {
  div: {
    marginTop: 40,
    width: 2000
  },
  subtotal: {
    textAlign: 'right',
    marginRight: 20
  }
}

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
      <Container
        className="ui raised very padded text container segment"
        style={styles.div}
      >
        <Header as="h2" textAlign="center">
          <Header.Content>Total Market Value</Header.Content>
        </Header>
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

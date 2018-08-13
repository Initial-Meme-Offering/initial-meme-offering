import React from 'react'
import {VictoryChart, VictoryLine, VictoryScatter} from 'victory'

const MarketChart = props => {
  const {x, y, title} = props

  return (
    <Container
      className="ui raised very padded text container segment"
      style={styles.div}
    >
      <Header as="h2" textAlign="center">
        <Header.Content>{title}</Header.Content>
      </Header>

      <VictoryChart
        data={props.data}
        height={250}
        x={x}
        y={y}
        title="Total Market Value"
      >
        <VictoryLine
          interpolation="linear"
          data={props.data}
          x={x}
          y={y}
          style={{
            data: {stroke: '#c43a31', strokeWidth: 1}
          }}
        />
        {/* <VictoryScatter
          data={props.data}
          x={x}
          y={y}
          style={{data: {fill: 'c43a31'}}}
        /> */}
      </VictoryChart>
    </Container>
  )
}

export default MarketChart

const styles = {
  div: {
    marginTop: 40,
    width: 2000
  },
  subHeader: {
    paddingLeft: 100
  }
}

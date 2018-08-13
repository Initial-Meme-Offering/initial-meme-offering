import React from 'react'
import {VictoryChart, VictoryLine, VictoryScatter, VictoryAxis} from 'victory'
import {Container, Header} from 'semantic-ui-react'

class MarketChart extends React.Component {
  render() {
    const {x, y, title} = this.props
    return (
      <Container
        className="ui raised very padded text container segment"
        style={styles.div}
      >
        <Header as="h2" textAlign="center">
          <Header.Content>{title}</Header.Content>
        </Header>

        <VictoryChart
          scale={{x: 'time'}}
          data={this.props.data}
          height={250}
          // x={x}
          // y={y}
          title="Total Market Value"
        >
          <VictoryLine
            interpolation="linear"
            data={this.props.data}
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
          {/* <VictoryAxis fixLabelOverlap={true} /> */}
        </VictoryChart>
      </Container>
    )
  }
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

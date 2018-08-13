import React from 'react'
import {VictoryChart, VictoryLine, VictoryZoomContainer} from 'victory'
import {Container, Header} from 'semantic-ui-react'

class MarketChart extends React.Component {
  state = {
    zoomDomain: {
      x: [new Date('2018-07-14'), new Date('2017-08-09')]
    }
  }

  handleZoom = domain => {
    this.setState({zoomDomain: domain})
  }

  render() {
    const {x, y, title, data} = this.props
    return (
      <Container
        className="ui raised very padded text container segment"
        style={styles.div}
      >
        <Header as="h2" textAlign="center">
          <Header.Content>{title}</Header.Content>
        </Header>
        <VictoryChart
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom}
            />
          }
          scale={{x: 'time'}}
          data={data}
          height={250}
          // title={title}
        >
          <VictoryLine
            interpolation="linear"
            data={data}
            x={x}
            y={y}
            style={{
              data: {stroke: '#c43a31', strokeWidth: 1}
            }}
          />
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

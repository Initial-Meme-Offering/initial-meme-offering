import React from 'react'
import {VictoryChart, VictoryLine, VictoryZoomContainer} from 'victory'

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
      <div className="container">
        <h1>{title}</h1>
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
      </div>
    )
  }
}

export default MarketChart

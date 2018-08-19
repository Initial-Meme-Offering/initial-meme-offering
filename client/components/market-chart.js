import React from 'react'
import {VictoryChart, VictoryLine, VictoryZoomContainer} from 'victory'

class MarketChart extends React.Component {
  state = {
    zoomDomain: {
      x: [new Date('2016'), new Date('2018')],
      y: [0, 80]
    }
  }

  handleZoom = domain => {
    this.setState({zoomDomain: domain})
  }

  componentDidUpdate(prevProps) {
    const {data} = this.props
    if (data[0] !== prevProps.data[0])
      this.setState({
        zoomDomain: {x: [data[0].x, data[data.length - 1].x]}
      })
  }

  render() {
    const {x, y, title, data} = this.props
    console.log('this.props.data', this.props.data)
    return (
      <div>
        <h5 className="title is-5 has-text-centered">{title}</h5>
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

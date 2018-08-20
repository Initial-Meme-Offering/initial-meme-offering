import React from 'react'
import {VictoryChart, VictoryLine, VictoryZoomContainer} from 'victory'

class MarketChart extends React.Component {
  state = {
    zoomDomain: {
      x: [new Date('2016'), new Date('2018')],
      y: [0, 80]
    },
    allowZoom: false
  }

  handleClick = evt => {
    console.log('clicked', this.state.allowZoom)
    evt.preventDefault()
    this.setState({
      allowZoom: !this.state.allowZoom
    })
  }

  handleZoom = domain => {
    // if (this.state.allowZoom) this.setState({zoomDomain: domain})
  }

  componentDidMount() {
    const {data} = this.props
    if (data[0])
      this.setState({
        zoomDomain: {x: [data[0].x, data[data.length - 1].x]}
      })
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
    return (
      <a href="#" onClick={this.handleClick}>
        <h5 className="title is-5 has-text-centered">{title}</h5>
        <VictoryChart
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={this.allowZoom ? this.state.zoomDomain : null}
              onZoomDomainChange={this.allowZoom ? this.handleZoom : null}
            />
          }
          scale={{x: 'time'}}
          data={data}
          height={250}
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
      </a>
    )
  }
}

export default MarketChart

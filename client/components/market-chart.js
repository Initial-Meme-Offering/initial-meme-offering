import React from 'react'
import {
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
  VictoryLegend
} from 'victory'

class MarketChart extends React.Component {
  state = {
    zoomDomain: {
      x: [new Date('2016'), new Date('2018')],
      y: [0, 80]
    },
    disableZoom: true,
    data: this.props.data.historical
  }

  todaysDomain = () => {
    var midnight = new Date()
    midnight.setHours(0, 0, 0, 0)
    const {data} = this.props
    this.setState({
      zoomDomain: {
        x: [midnight, data[data.length - 1].x],
        y: this.state.zoomDomain.y
      }
    })
  }

  historicalDomain = () => {
    console.log('historic', this.state.zoomDomain)
    const {data} = this.props
    this.setState({
      zoomDomain: {
        x: [data[0].x, data[data.length - 1].x],
        y: this.state.zoomDomain.y
      }
    })
  }

  handleClick = evt => {
    evt.preventDefault()
    this.setState({
      disableZoom: !this.state.disableZoom
    })
  }

  handleZoom = domain => {
    this.setState({zoomDomain: domain})
  }

  componentDidMount() {
    const {data} = this.props
    if (data.historical[0])
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
      <div onClick={this.handleClick}>
        <h5 className="title is-5 has-text-centered">{title}</h5>

        <div className="buttons has-addons is-centered">
          <span onClick={this.todaysDomain} className="button is-small">
            Today
          </span>
          <span onClick={this.historicalDomain} className="button is-small">
            Historical
          </span>
        </div>
        <VictoryChart
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom}
              disable={this.state.disableZoom}
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
      </div>
    )
  }
}

export default MarketChart

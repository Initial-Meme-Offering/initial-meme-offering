import React from 'react'
import {VictoryChart, VictoryLine, VictoryZoomContainer, VictoryAxis} from 'victory'

class MarketChart extends React.Component {
  state = {
    zoomDomain: {
      x: [new Date('2016'), new Date('2018')],
      y: [0, 80]
    },
    disableZoom: true,
    todaysData: false
  }

  handleTodayClick = () => {
    this.setState({
      todaysData: true
    })
  }

  handleHistoricalClick = () => {
    this.setState({
      todaysData: false
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
    if (this.props.data.historical[0] && this.props.data.today[0]) {
      let data = this.state.todaysData
        ? this.props.data.today
        : this.props.data.historical
      this.setState({
        zoomDomain: {
          x: [data[0].x, data[data.length - 1].x],
          y: [Math.min(...data.map(d => d.y)), Math.max(...data.map(d => d.y))]
        }
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.data.historical[0] !== prevProps.data.historical[0] ||
      this.state.todaysData !== prevState.todaysData
    ) {
      let data = this.state.todaysData
        ? this.props.data.today
        : this.props.data.historical
      this.setState({
        zoomDomain: {
          x: [data[0].x, data[data.length - 1].x],
          y: [Math.min(...data.map(d => d.y)), Math.max(...data.map(d => d.y))]
        }
      })
    }
  }

  render() {
    const {x, y, title, data} = this.props
    let chartData = this.state.todaysData ? data.today : data.historical
    return (
      <div onClick={this.handleClick}>
        <h5 className="title is-5 has-text-centered">{title}</h5>

        <div className="buttons has-addons is-centered">
          <span onClick={this.handleTodayClick} className="button is-small">
            Today
          </span>
          <span
            onClick={this.handleHistoricalClick}
            className="button is-small"
          >
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
          data={chartData}
          height={250}
        >
          <VictoryLine
            interpolation="linear"
            data={chartData}
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

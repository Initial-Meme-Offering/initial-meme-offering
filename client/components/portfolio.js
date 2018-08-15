import React from 'react'
import {PieChart, MarketChart} from '../components'
import {
  getMemeStocksByUser,
  getUserPieChart,
  getSingleStockChart
} from '../store'
import {connect} from 'react-redux'

class Portfolio extends React.Component {
  componentDidMount() {
    this.props.getMemeStocksByUser(2)
    //(this.props.user.id)
  }

  render() {
    const {lineChartData, pieChartData} = this.props
    return (
      <section className="section is-medium">
        <div className="container">
          <div className="columns">
            <div className="column">
              <PieChart data={pieChartData} />
            </div>
            <div className="column">
              <MarketChart
                data={lineChartData}
                title={'Total Portfolio'}
                x={lineChartData.x}
                y={lineChartData.y}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    memes: state.memes.byId,
    pieChartData: getUserPieChart(state),
    lineChartData: getSingleStockChart(state, 1)
  }
}

const mapDispatch = dispatch => {
  return {
    getMemeStocksByUser: userId => dispatch(getMemeStocksByUser(userId))
  }
}

export default connect(mapState, mapDispatch)(Portfolio)

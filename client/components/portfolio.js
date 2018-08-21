import React from 'react'
import {
  PieChart,
  MarketChart,
  BuyPortfolio,
  SellPortfolio,
  TotalPortfolio,
  TransPortfolio
} from '../components'
import {
  getMemeStocksByUser,
  getUserPieChart,
  getOffers,
  userAgregateStockChart
} from '../store'
import {Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

class Portfolio extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.match.url !== prevProps.match.url) {
      this.props.getOffers()
      this.props.getMemeStocksByUser(this.props.user.id)
    }
  }

  render() {
    const {lineChartData, pieChartData} = this.props
    return (
      <section className="section is-medium">
        <div className="container">
          <div className="level">
            <div className="level-item">
              <div>
                <h5 className="title is-5 has-text-centered">
                  Percentage of Portfolio
                </h5>
                <PieChart data={pieChartData} />
              </div>
            </div>
            <div className="level-item">
              <MarketChart
                data={lineChartData}
                title={
                  lineChartData[0]
                    ? 'Total Portfolio Value'
                    : 'Eagerly Awaiting Your Memes'
                }
                x={lineChartData.x}
                y={lineChartData.y}
              />
            </div>
          </div>
        </div>
        <Switch>
          <Route exact path="/portfolio/buy" component={BuyPortfolio} />
          <Route exact path="/portfolio/sell" component={SellPortfolio} />
          <Route exact path="/portfolio/trans" component={TransPortfolio} />
          <Route exact path="/portfolio/total" component={TotalPortfolio} />
          <Route exact path="/portfolio" component={BuyPortfolio} />
        </Switch>
      </section>
    )
  }
}

const mapState = state => ({
  user: state.user,
  pieChartData: getUserPieChart(state),
  lineChartData: userAgregateStockChart(state)
})

const mapDispatch = dispatch => ({
  getMemeStocksByUser: userId => dispatch(getMemeStocksByUser(userId)),
  getOffers: () => dispatch(getOffers())
})

export default connect(mapState, mapDispatch)(Portfolio)

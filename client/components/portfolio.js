import React from 'react'
import {PieChart, MarketChart, OfferObject} from '../components'
import {
  getMemeStocksByUser,
  getUserPieChart,
  getSingleStockChart,
  buyOffersByUser,
  sellOffersByUser,
  getOffers,
  getUserMemeStocksListItem,
  completedOffersByUser
} from '../store'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Portfolio extends React.Component {
  componentDidMount() {
    if (this.props.user) {
      this.props.getOffers()
      this.props.getMemeStocksByUser(this.props.user.id)
    }
  }

  render() {
    const {lineChartData, pieChartData, offers} = this.props
    const url = this.props.match.url.split('/')[2]
    console.log('pieChart', pieChartData)
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
        <div className="container tabs">
          <ul>
            <li className={url === 'buy' ? 'is-active' : ''}>
              <Link to="/portfolio/buy">Buy Orders</Link>
            </li>
            <li className={url === 'sell' ? 'is-active' : ''}>
              <Link to="/portfolio/sell">Sell Orders</Link>
            </li>
            <li className={url === 'trans' ? 'is-active' : ''}>
              <Link to="/portfolio/trans">Transaction History</Link>
            </li>
            <li className={url === 'total' ? 'is-active' : ''}>
              <Link to="/portfolio/total">Total Meme Stock</Link>
            </li>
          </ul>
        </div>
        <div className="container">
          {!offers[0] || !offers[0].meme
            ? `No ${url} activity just yet`
            : offers.map(offer => (
                <OfferObject key={offer.id} meme={offer.meme} offer={offer} />
              ))}
        </div>
      </section>
    )
  }
}

const mapBuy = state => {
  return {
    user: state.user,
    pieChartData: getUserPieChart(state),
    lineChartData: getSingleStockChart(state, state.user.id),
    offers: buyOffersByUser(state)
  }
}

const mapSell = state => {
  return {
    user: state.user,
    pieChartData: getUserPieChart(state),
    lineChartData: getSingleStockChart(state, state.user.id),
    offers: sellOffersByUser(state)
  }
}

const mapTrans = state => {
  return {
    user: state.user,
    pieChartData: getUserPieChart(state),
    lineChartData: getSingleStockChart(state, state.user.id),
    offers: completedOffersByUser(state)
  }
}

const mapTotal = state => {
  return {
    user: state.user,
    pieChartData: getUserPieChart(state),
    lineChartData: getSingleStockChart(state, state.user.id),
    offers: getUserMemeStocksListItem(state)
  }
}

const mapDispatch = dispatch => ({
  getMemeStocksByUser: userId => dispatch(getMemeStocksByUser(userId)),
  getOffers: () => dispatch(getOffers())
})

export const BuyPortfolio = connect(mapBuy, mapDispatch)(Portfolio)
export const SellPortfolio = connect(mapSell, mapDispatch)(Portfolio)
export const TotalPortfolio = connect(mapTotal, mapDispatch)(Portfolio)
export const TransPortfolio = connect(mapTrans, mapDispatch)(Portfolio)

import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  buyOffersByUser,
  sellOffersByUser,
  completedOffersByUser,
  getUserMemeStocksListItem,
  getOffers,
  getMemeStocksByUser
} from '../store'
import {OfferObject, TotalStockObject} from '../components'

class PortfolioTabs extends React.Component {
  render() {
    const {offers, total} = this.props
    const url = this.props.match.url.split('/')[2]
    console.log('offers', offers)
    return (
      <div>
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
            : offers.map(
                offer =>
                  total ? (
                    <TotalStockObject key={offer.id} {...offer} />
                  ) : (
                    <OfferObject key={offer.id} {...offer} />
                  )
              )}
        </div>
      </div>
    )
  }
}

const mapBuy = state => {
  console.log('arrived at mapBuy!')
  return {
    offers: buyOffersByUser(state)
  }
}

const mapSell = state => {
  console.log('arrived at mapSell!')
  return {
    offers: sellOffersByUser(state)
  }
}

const mapTrans = state => {
  console.log('state', state)
  return {
    offers: completedOffersByUser(state)
  }
}

const mapTotal = state => {
  console.log('arrived at mapTotal!')
  return {
    offers: getUserMemeStocksListItem(state),
    total: true
  }
}

const mapDispatch = dispatch => ({
  getOffers: () => dispatch(getOffers()),
  getMemeStocksByUser: userId => dispatch(getMemeStocksByUser(userId))
})

export const BuyPortfolio = connect(mapBuy, mapDispatch)(PortfolioTabs)
export const SellPortfolio = connect(mapSell, mapDispatch)(PortfolioTabs)
export const TotalPortfolio = connect(mapTotal, mapDispatch)(PortfolioTabs)
export const TransPortfolio = connect(mapTrans, mapDispatch)(PortfolioTabs)

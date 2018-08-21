import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  buyOffersByUser,
  sellOffersByUser,
  completedOffersByUser,
  getUserMemeStocksListItem
} from '../store'
import {OfferObject, TotalStockObject} from '../components'

const PortfolioTabs = props => {
  const {offers, total, type} = props
  const url = props.match.url.split('/')[2]
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
          ? `No ${type} just yet`
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

const mapBuy = state => ({
  offers: buyOffersByUser(state),
  type: 'buy orders'
})

const mapSell = state => ({
  offers: sellOffersByUser(state),
  type: 'sell orders'
})

const mapTrans = state => ({
  offers: completedOffersByUser(state),
  type: 'completed transactions'
})

const mapTotal = state => ({
  offers: getUserMemeStocksListItem(state),
  total: true,
  type: 'stock in portfolio'
})

export const BuyPortfolio = connect(mapBuy)(PortfolioTabs)
export const SellPortfolio = connect(mapSell)(PortfolioTabs)
export const TotalPortfolio = connect(mapTotal)(PortfolioTabs)
export const TransPortfolio = connect(mapTrans)(PortfolioTabs)

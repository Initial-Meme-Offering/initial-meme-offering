import React from 'react'
import {MarketChart, BackgroundVideo} from '../components'
import {connect} from 'react-redux'
import {
  getSingleStockChart,
  getTrendingStocks,
  getTotalMarketChart
} from '../store'

const LandingPage = props => {
  const {trending, totalMarket} = props
  console.log('totalMarket', totalMarket)
  return (
    <div>
      <BackgroundVideo className="lowest-level" />
      <MarketChart
        data={totalMarket}
        title="Total Market Value"
        x={totalMarket.x}
        y={totalMarket.y}
      />

      <div className="container">
        <h1>Trending Stocks</h1>
      </div>
      {trending.map((trend, i) => (
        <MarketChart
          key={trend.memeId}
          data={trend.chart}
          title={trend.name}
          x={trend.chart.x}
          y={trend.chart.y}
        />
      ))}
    </div>
  )
}

const mapState = state => {
  const memeIds = getTrendingStocks(state)

  return {
    totalMarket: getSingleStockChart(state, 1),
    trending: memeIds.map(memeId => ({
      memeId,
      name: state.memes.byId[memeId].name,
      chart: getSingleStockChart(state, memeId)
    }))
  }
}

export default connect(mapState)(LandingPage)

import React from 'react'
import {Header} from 'semantic-ui-react'
import {MarketChart} from '../components'
import {connect} from 'react-redux'
import {getSingleStockChart, getTrendingStocks} from '../store'

const styles = {
  div: {
    marginTop: 40,
    width: 2000
  },
  subHeader: {
    paddingLeft: 100
  }
}

const LandingPage = props => {
  const {trending, totalMarket} = props
  console.log('totalMarket', totalMarket)
  return (
    <div>
      <MarketChart
        data={totalMarket}
        title="Total Market Value"
        x={totalMarket.x}
        y={totalMarket.y}
      />
      <Header as="h1" style={styles.subHeader}>
        <Header.Content>Trending Stocks</Header.Content>
      </Header>
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

export default connect(mapState, null)(LandingPage)

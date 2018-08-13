import React from 'react'
import {Header} from 'semantic-ui-react'
import {MarketChart, BackgroundVideo} from '../components'
import {connect} from 'react-redux'
import {
  getSingleStockChart,
  getTrendingStocks,
  getTotalMarketChart
} from '../store'

const styles = {
  div: {
    marginTop: 40,
    width: 2000
  },
  subHeader: {
    paddingLeft: 100
  }
}

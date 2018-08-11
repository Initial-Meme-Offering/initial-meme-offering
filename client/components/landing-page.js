import React from 'react'
import {Container, Header} from 'semantic-ui-react'
import {MarketChart} from '../components'
import {connect} from 'react-redux'

const styles = {
  div: {
    marginTop: 40,
    width: 2000
  },
  subHeader: {
    paddingLeft: 100
  }
}

const sixMonths = [
  {month: 'March', marketVal: 64000},
  {month: 'April', marketVal: 58000},
  {month: 'May', marketVal: 61000},
  {month: 'June', marketVal: 60000},
  {month: 'July', marketVal: 34000},
  {month: 'August', marketVal: 50000}
]

const oneWeek = [
  {seedDate: '07-14', price: 65},
  {seedDate: '07-15', price: 45},
  {seedDate: '07-16', price: 5},
  {seedDate: '07-17', price: 10},
  {seedDate: '07-18', price: 115},
  {seedDate: '07-19', price: 70},
  {seedDate: '07-20', price: 56}
]

const fiveStocks = Array(5).fill(oneWeek)

const LandingPage = props => {
  return (
    <div>
      <MarketChart
        data={sixMonths}
        title="Total Market Value"
        x="month"
        y="marketVal"
      />
      <Header as="h1" style={styles.subHeader}>
        <Header.Content>Trending Stocks</Header.Content>
      </Header>
      {fiveStocks.map((trend, i) => (
        <MarketChart
          key={i}
          data={trend}
          title="Stock Name"
          x="seedDate"
          y="price"
        />
      ))}
    </div>
  )
}

const mapState = (state, ownProps) => {
  console.log('TRANSACTIONS', state.transactions.byId)
  return {
    memes: state.memes.byId,
    memeStocks: state.memeStocks.byId
  }
}

const mapDispatch = () => ({})

export default connect(mapState, mapDispatch)(LandingPage)

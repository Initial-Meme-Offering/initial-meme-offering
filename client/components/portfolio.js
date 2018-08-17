import React from 'react'
import {PieChart, MarketChart, OfferObject} from '../components'
import {
  getMemeStocksByUser,
  getUserPieChart,
  getSingleStockChart,
  offersByUser,
  getOffers
} from '../store'
import {connect} from 'react-redux'

class Portfolio extends React.Component {
  componentDidMount() {
    if (this.props.user) {
      this.props.getOffers()
      this.props.getMemeStocksByUser(this.props.user.id)
    }
  }

  render() {
    console.log('user', this.props.user)
    const {lineChartData, pieChartData, offers} = this.props
    console.log('pieChartData', pieChartData)
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
              {console.log('lineChartData', lineChartData)}
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
        <div className="container">
          <h5 className="title is-5">Active Offers</h5>
          {!offers[0] || !offers[0].meme
            ? 'Loading...'
            : offers.map(offer => (
                <OfferObject key={offer.id} meme={offer.meme} offer={offer} />
              ))}
        </div>
      </section>
    )
  }
}

const mapState = state => ({
  user: state.user,
  pieChartData: getUserPieChart(state),
  lineChartData: getSingleStockChart(state, state.user.id),
  offers: offersByUser(state, state.user.id)
})

const mapDispatch = dispatch => ({
  getMemeStocksByUser: userId => dispatch(getMemeStocksByUser(userId)),
  getOffers: () => dispatch(getOffers())
})

export default connect(mapState, mapDispatch)(Portfolio)

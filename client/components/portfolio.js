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
    this.props.getOffers()
    this.props.getMemeStocksByUser(2)
    //(this.props.user.id)
  }

  render() {
    const {lineChartData, pieChartData, offers} = this.props
    return (
      <section className="section is-medium">
        <div className="container">
          <div className="level">
            <div className="level-item">
              <PieChart data={pieChartData} />
            </div>
            <div className="level-item">
              <MarketChart
                data={lineChartData}
                title="Total Portfolio"
                x={lineChartData.x}
                y={lineChartData.y}
              />
            </div>
          </div>
        </div>
        <div className="container">
          <h5 className="title is-5">Past Transactions</h5>
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
  lineChartData: getSingleStockChart(state, 2),
  offers: offersByUser(state, 2)
})

const mapDispatch = dispatch => ({
  getMemeStocksByUser: userId => dispatch(getMemeStocksByUser(userId)),
  getOffers: () => dispatch(getOffers())
})

export default connect(mapState, mapDispatch)(Portfolio)

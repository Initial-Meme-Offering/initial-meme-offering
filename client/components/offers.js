import React from 'react'
import {OfferForm} from '../components'
import {connect} from 'react-redux'
import {postOffer, valueOfLastStockTrade} from '../store'
import moment from 'moment'
import SmallStockCard from './stock-card-small'

class Offers extends React.Component {
  handleSubmit = newOffer => {
    newOffer.userId = this.props.user.id
    newOffer.memeId = this.props.meme.id
    this.props.postOffer(newOffer)
  }

  render() {
    const {meme, lastTrade} = this.props
    // const lastDate = moment(lastTrade.seedDate).format('LLL')
    return !meme ? (
      'Loading...'
    ) : (
      <div className="columns">
        <div className="column"/>
        <div className="column is-half">
          <div className="card is-small">
            <div className="card-image">
              <figure className="image is-48by48">
                <img src={meme.imageUrl} alt="Placeholder image" />
              </figure>
            </div>
            <footer className="card-footer">
              <OfferForm {...this.props} handleSubmit={this.handleSubmit} />
            </footer>
          </div>
        </div>
        <div className="column"/>
      </div>
    )
  }
}

const mapState = (state, {match}) => {
  return {
    user: state.user,
    meme: state.memes.byId[match.params.memeId],
    lastTrade: valueOfLastStockTrade(state, match.params.memeId)
  }
}

const mapDispatch = dispatch => ({
  postOffer: newOffer => dispatch(postOffer(newOffer))
})

export default connect(mapState, mapDispatch)(Offers)

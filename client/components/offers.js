import React from 'react'
import {OfferForm} from '../components'
import {connect} from 'react-redux'
import {valueOfLastStockTrade} from '../store'

const Offers = props => {
    const {meme, lastTrade} = props
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
              <OfferForm {...props} />
            </footer>
          </div>
        </div>
        <div className="column"/>
      </div>
    )
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
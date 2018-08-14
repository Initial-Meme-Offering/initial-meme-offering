import React from 'react'
import {OfferForm} from '../components'
import {connect} from 'react-redux'
import {postOffer, valueOfLastStockTrade} from '../store'
import moment from 'moment'

class Offers extends React.Component {
  handleSubmit = newOffer => {
    newOffer.userId = this.props.user.id
    newOffer.memeId = this.props.meme.id
    this.props.postOffer(newOffer)
  }

  render() {
    const {meme, lastTrade} = this.props
    const lastDate = moment(lastTrade.seedDate).format('LLL')
    return !meme ? (
      'Loading...'
    ) : (
      <div>
        <section className="section">
          <div className="container">
            <div className="notification">Placeholder</div>
          </div>
        </section>

        <section className="section">
          <h3 className="title is-3">Place an Offer</h3>
          <div className="container">
            <div className="notification">
              <article className="media">
                <figure className="media-left">
                  <p className="image is-128x128">
                    <img src={meme.imageUrl} />
                  </p>
                </figure>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>{meme.name}</strong>
                      &nbsp;
                      <small>{meme.symbol || 'DB'}</small>
                      <br />
                      {meme.desc ||
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.'}
                    </p>
                  </div>
                  <nav className="level is-mobile">
                    <div className="level-left">
                      <div className="level-item">
                        <strong>Last Traded At:&nbsp;&nbsp;</strong>
                        {!lastTrade.price
                          ? 'No transactions on record'
                          : `$${lastTrade.price} on ${lastDate}`}
                      </div>
                    </div>
                  </nav>
                </div>
              </article>
            </div>
          </div>

          <div className="container">
            <div className="notification">
              <OfferForm {...this.props} handleSubmit={this.handleSubmit} />
            </div>
          </div>
        </section>
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

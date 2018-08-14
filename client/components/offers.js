import React from 'react'
import {OfferForm} from '../components'
import {connect} from 'react-redux'
import {postOffer} from '../store'

class Offers extends React.Component {
  handleSubmit = newOffer => {
    this.props.postOffer(newOffer)
  }

  render() {
    console.log('meme', this.props.meme)
    const {meme} = this.props
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
                      <strong>{meme.name}</strong> <small>@johnsmith</small>{' '}
                      <small>31m</small>
                      <br />
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Proin ornare magna eros, eu pellentesque tortor vestibulum
                      ut. Maecenas non massa sem. Etiam finibus odio quis
                      feugiat facilisis.
                    </p>
                  </div>
                  <nav className="level is-mobile">
                    <div className="level-left">
                      <a className="level-item">
                        <span className="icon is-small">
                          <i className="fas fa-reply" />
                        </span>
                      </a>
                      <a className="level-item">
                        <span className="icon is-small">
                          <i className="fas fa-retweet" />
                        </span>
                      </a>
                      <a className="level-item">
                        <span className="icon is-small">
                          <i className="fas fa-heart" />
                        </span>
                      </a>
                    </div>
                  </nav>
                </div>
                <div className="media-right">
                  <button className="delete" />
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
    meme: state.memes.byId[match.params.memeId]
  }
}

const mapDispatch = dispatch => ({
  postOffer: newOffer => dispatch(postOffer(newOffer))
})

export default connect(mapState, mapDispatch)(Offers)

{
  /* <div className="box">
          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png" />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>John Smith</strong> <small>@johnsmith</small>{' '}
                  <small>31m</small>
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  ornare magna eros, eu pellentesque tortor vestibulum ut.
                  Maecenas non massa sem. Etiam finibus odio quis feugiat
                  facilisis.
                </p>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  <a className="level-item">
                    <span className="icon is-small">
                      <i className="fas fa-reply" />
                    </span>
                  </a>
                  <a className="level-item">
                    <span className="icon is-small">
                      <i className="fas fa-retweet" />
                    </span>
                  </a>
                  <a className="level-item">
                    <span className="icon is-small">
                      <i className="fas fa-heart" />
                    </span>
                  </a>
                </div>
              </nav>
            </div>
            <div className="media-right">
              <button type="button" className="delete" />
            </div>
          </article>
        </div> */
}

import React from 'react'
import {OfferForm} from '../components'
import {connect} from 'react-redux'
import {postOffer} from '../store'

class Offers extends React.Component {
  handleSubmit = newOffer => {
    this.props.postOffer(newOffer)
  }

  render() {
    return (
      <div>
        {/* <div className="box">
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
        </div> */}

        <section className="section">
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

const mapDispatch = dispatch => ({
  postOffer: newOffer => dispatch(postOffer(newOffer))
})

export default connect(null, mapDispatch)(Offers)

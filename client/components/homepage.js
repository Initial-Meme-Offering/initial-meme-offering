import React from 'react'
import {Link} from 'react-router-dom'
import {
  AllMemes,
  TrendingMemes,
  Indices,
  SearchMemes,
  PurchaseMemes
} from './index'

const HomePage = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline is-centered">
          <div className="column is-one-third">
            <figure className="image is-square">
              <Link to="/allmemes" component={AllMemes}>
                <img src="https://i.imgflip.com/2fzph4.jpg" />
              </Link>
            </figure>
          </div>
          <div className="column is-one-third">
            <figure className="image is-square">
              <Link to="/trendingmemes" component={TrendingMemes}>
                <img src="https://i.imgflip.com/2fzpqs.jpg" />
              </Link>
            </figure>
          </div>
          <div className="column is-one-third">
            <figure className="image is-square">
              <Link to="/indices" component={Indices}>
                <img src="https://i.imgflip.com/2fzpy0.jpg" />
              </Link>
            </figure>
          </div>
          <div className="column is-one-third">
            <figure className="image is-square">
              <Link to="/searchmemes" component={SearchMemes}>
                <img src="https://i.imgflip.com/2fzq2b.jpg" />
              </Link>
            </figure>
          </div>
          <div className="column is-one-third">
            <figure className="image is-square">
              <Link to="/purchasememes" component={PurchaseMemes}>
                <img src="https://i.imgflip.com/2fzq6o.jpg" />
              </Link>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage

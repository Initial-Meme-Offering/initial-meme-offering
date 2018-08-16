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
                <img src="https://www.lifewire.com/thmb/M1ISdSdfLsU36nAuILe3YlFcY1w=/400x400/filters:fill(auto,1)/success-56a9fd1f3df78cf772abee09.jpg" />
              </Link>
            </figure>
          </div>
          <div className="column is-one-third">
            <figure className="image is-square">
              <Link to="/trendingmemes" component={TrendingMemes}>
                <img src="https://www.lifewire.com/thmb/M1ISdSdfLsU36nAuILe3YlFcY1w=/400x400/filters:fill(auto,1)/success-56a9fd1f3df78cf772abee09.jpg" />
              </Link>
            </figure>
          </div>
          <div className="column is-one-third">
            <figure className="image is-square">
              <Link to="/indices" component={Indices}>
                <img src="https://www.lifewire.com/thmb/M1ISdSdfLsU36nAuILe3YlFcY1w=/400x400/filters:fill(auto,1)/success-56a9fd1f3df78cf772abee09.jpg" />
              </Link>
            </figure>
          </div>
          <div className="column is-one-third">
            <figure className="image is-square">
              <Link to="/searchmemes" component={SearchMemes}>
                <img src="https://www.lifewire.com/thmb/M1ISdSdfLsU36nAuILe3YlFcY1w=/400x400/filters:fill(auto,1)/success-56a9fd1f3df78cf772abee09.jpg" />
              </Link>
            </figure>
          </div>
          <div className="column is-one-third">
            <figure className="image is-square">
              <Link to="/purchasememes" component={PurchaseMemes}>
                <img src="https://www.lifewire.com/thmb/M1ISdSdfLsU36nAuILe3YlFcY1w=/400x400/filters:fill(auto,1)/success-56a9fd1f3df78cf772abee09.jpg" />
              </Link>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage

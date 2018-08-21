import React from 'react'
import {Link} from 'react-router-dom'

const HomeButtonCard = () => {
  return (
    <div id="card-rel" className="container">
      <div className="columns">
        <div className="column is-4">
          <Link to="/allmemes">
            <div className="card meme-card">
              <div className="card-image">
                <figure className="image is-5by4">
                  <img src="https://i.imgflip.com/2g4746.jpg" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="subtitle is-5 center">Explore Meme Options</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="column is-4">
          <Link to="/trendingmemes">
            <div className="card meme-card">
              <div className="card-image">
                <figure className="image is-5by4">
                  <img src="https://i.imgflip.com/2g2tb5.jpg" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="subtitle is-5 center">Top 5 Trending Memes</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="column is-4">
          <Link to="/indices">
            <div className="card meme-card">
              <div className="card-image">
                <figure className="image is-5by4">
                  <img src="https://i.imgflip.com/2g47b3.jpg" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="subtitle is-5 center">Browse Indices</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomeButtonCard

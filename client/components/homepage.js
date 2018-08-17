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
    <div>
      <section className="hero is-primary is-large is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 id="nav-title" className="title">
              Memenomics
            </h1>
            <h2 className="subtitle">
              One stop shop for buying, selling, and trading your favorite memes
            </h2>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container body-center">
          <div className="columns">
            <div className="column">
              <br />
              <br />
              <h1>Buy</h1>
              <br />
              <br />
            </div>
            <div className="column">
              <br />
              <br />
              <h2>Flipping ticker tape here</h2>
              <br />
              <br />
            </div>
          </div>
        </div>
      </section>

      <section id="home-middle-section" className="section">
        <div className="container body-center">
          <div className="columns">
            <div className="column">
              <br />
              <br />
              <h1>Market trend graph here</h1>
              <br />
              <br />
            </div>
            <div className="column">
              <br />
              <br />
              <h2>Sell</h2>
              <br />
              <br />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container body-center">
          <div className="columns">
            <div className="column">
              <br />
              <br />
              <h1>Trade</h1>
              <br />
              <br />
            </div>
            <div className="column">
              <br />
              <br />
              <h2>Handshake icon here</h2>
              <br />
              <br />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

{
  /* <div className="column is-one-third">
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
</div> */
}

import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {MarketChart} from './index'
import {getSingleStockChart} from '../store'
import HomeButtonCard from './homepage-card-button'

const HomePage = props => {
  const {totalMarket} = props
  return (
    <div>
      <section id="home-rel" className="hero is-primary is-large is-bold">
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

      <HomeButtonCard />

      <section className="section">
        <div className="container body-center">
          <div className="columns">
            <div className="column">
              <p
                id="buy"
                className="is-size-1 has-text-centered has-text-weight-semibold"
              >
                Buy
              </p>
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
              <div className="card">
                <br />
                <MarketChart
                  data={totalMarket}
                  title="Total Market Value"
                  x={totalMarket.x}
                  y={totalMarket.y}
                />
                <br />
              </div>
            </div>
            <div className="column">
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <h1 className="is-size-1 has-text-white has-text-centered has-text-weight-semibold">
                Sell
              </h1>
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
              <br />
              <br />
              <br />
              <br />
              <br />
              <p className=" is-primary is-size-1 has-text-primary has-text-centered has-text-weight-semibold">
                Trade
              </p>
              <br />
              <br />
            </div>
            <div className="column">
              <br />
              <br />
              {/* <h2>Handshake icon here</h2> */}
              <img src="https://openclipart.org/download/276483/1490609861.svg" />
              <br />
              <br />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
const mapState = state => {
  return {
    totalMarket: getSingleStockChart(state, 1)
  }
}

export default connect(mapState)(HomePage)

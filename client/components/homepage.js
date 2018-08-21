import React from 'react'
import {connect} from 'react-redux'
import {MarketChart} from './index'
import {getSingleStockChart, getTrendingStocks} from '../store'
import HomeButtonCard from './homepage-card-button'
import TickerTape from './ticker-tape'

class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      idx: 0
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const {memes} = this.props
      this.increaseIdx(memes)
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  increaseIdx = memes => {
    this.setState(prevState => {
      return {idx: ++prevState.idx % memes.length || 0}
    })
  }

  render() {
    const {totalMarket, memes} = this.props
    const {idx} = this.state

    return (
      <div>
        <section id="home-rel" className="hero is-primary is-large is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 id="nav-title" className="title">
                Memenomics
              </h1>
              <h2 className="subtitle">
                One stop shop for buying and selling your favorite memes
              </h2>
            </div>
          </div>
        </section>

        <HomeButtonCard />

        <section className="section">
          <div className="container body-center">
            <div className="columns">
              <div className="column">
                <br />
                <br />
                <br />
                <br />
                <br />
                <p
                  id="buy"
                  className="is-size-1 has-text-centered has-text-weight-semibold"
                >
                  Buy
                </p>
              </div>
              <div className="column">
                {memes.length > 0 && <TickerTape meme={memes[idx]} />}
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
                  Manage Portfolio
                </p>
                <br />
                <br />
              </div>
              <div className="column">
                <br />
                <br />
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
}
const mapState = state => {
  const memeIds = getTrendingStocks(state)
  return {
    totalMarket: getSingleStockChart(state, 1),
    memes: memeIds.map(memeId => state.memes.byId[memeId])
  }
}

export default connect(mapState)(HomePage)

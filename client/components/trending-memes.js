import React, {Component} from 'react'
import SmallStockCard from './stock-card-small'
import {Router, Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getTrendingMemes} from '../store'

class TrendingMemes extends Component {
  render() {
    const memes = this.props.memes
    return (
      <section className="section is-medium">
        <div className="container">
          <h1 className="is-size-1 has-text-centered">Trending Memes</h1>
          <br />
          <br />
          <div className="columns is-multiline is-centered">
            {memes.map(meme => (
              <div key={meme.name} className="column is-4">
                <SmallStockCard
                  className=""
                  memeImage={meme.imageUrl}
                  memeName={meme.name}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
}

const mapState = state => {
  //console.log('state', state)
  const memeIds = getTrendingMemes(state)

  return {
    memes: memeIds.map(memeId => state.memes.byId[memeId])
  }
}

export default connect(mapState, null)(TrendingMemes)

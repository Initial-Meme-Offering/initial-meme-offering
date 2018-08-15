import React, {Component} from 'react'
import SmallStockCard from './stock-card-small'
import {Router, Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {} from '../store'

class TrendingMemes extends Component {
  render() {
    const {allIds, byId} = this.props.memes
    return (
      <section className="section is-medium">
        <div className="container">
          <h1 className="is-size-1 has-text-centered">Trending Memes</h1>
          <br />
          <br />
          <div className="columns is-multiline">
            {allIds.map(id => (
              <div key={id} className="column is-4">
                <SmallStockCard
                  className=""
                  memeImage={byId[id].imageUrl}
                  memeName={byId[id].name}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
}

const mapState = state => ({
  memes: state.memes
})

export default connect(mapState, null)(TrendingMemes)

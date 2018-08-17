import React, {Component} from 'react'
import axios from 'axios'
import SmallStockCard from './stock-card-small'
import {Router, Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {} from '../store'

class SingleMeme extends Component {
  render() {
    const {byId} = this.props.memes
    const memeId = this.props.match.params.memeId
    if (byId[memeId]) {
      return (
        <section className="section">
          <h1 className="is-size-1 has-text-centered">{byId[memeId].name}</h1> 
          <div className="container">
            <div className="columns">
              <div className="column is-6">
                  <SmallStockCard 
                    memeImage={byId[memeId].imageUrl}
                    memeName={byId[memeId].name}
                    memeId={memeId} 
                  />
              </div>
              <div className="column is-6">
                <h1>Victory Graph will go here</h1>
              </div>  
             </div>
          </div>
        </section>
      )
    } else {
        return (
          <h1>It didn't load yet</h1>
        )
    }
  }
}

const mapState = state => ({
  memes: state.memes
})

export default connect(mapState, null)(SingleMeme)

import React, {Component} from 'react'
import axios from 'axios'
import SmallStockCard from './stock-card-small'
import {Router, Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {allMemesList, memesListBySearch} from '../store'
import history from '../history'

class MemeList extends Component {
  handleChange = evt => {
    evt.preventDefault()
    history.push(`/search/${evt.target.value}`)
  }

  render() {
    const {memes} = this.props
    return (
      <section className="section">
        <h1 className="is-size-1 has-text-centered">All Memes</h1>
        <div className="container">
          <div className="field has-addons">
            <div className="control">
              <input
                id="nav-search"
                className="input"
                type="text"
                placeholder="Search"
                onChange={this.handleChange}
              />
            </div>
            <div className="control">
              <button type="button" id="nav-search" className="button is-info">
                Search
              </button>
            </div>
          </div>
          <div className="columns is-multiline">
            {memes.map(meme => (
              <div key={meme.id} className="column is-4">
                <SmallStockCard meme={meme} />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
}

const mapMemes = state => ({
  memes: allMemesList(state)
})

const mapSearch = (state, {match}) => ({
  memes: memesListBySearch(state, match.params.memeName)
})

export const AllMemes = connect(mapMemes)(MemeList)
export const MemesBySearch = connect(mapSearch)(MemeList)

import React, {Component} from 'react'
import axios from 'axios'
import SmallStockCard from './stock-card-small'
import {Router, Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'

class AllMemes extends Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }
  }

  render() {
    const {allIds, byId} = this.props.memes
    const searchResults = allIds.filter(id => {
      return byId[id].name.toLowerCase().includes(this.state.text.toLowerCase())
    }) 
    if (this.props.memes && this.props.transactions) {
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
                  onChange={event => this.setState({text: event.target.value})}
                />
              </div>
              <div className="control">
                <button
                  type="button"
                  id="nav-search"
                  className="button is-info"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="columns is-multiline">
              {searchResults.map(id => (
                <div key={id} className="column is-4">
                  <SmallStockCard
                    className=""
                    image={byId[id].imageUrl}
                    name={byId[id].name}
                    id={id}
                    symbol={byId[id].symbol}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    } else {
      return <h1>This view did not render</h1>
    }
  }
}

const mapState = state => ({
  memes: state.memes,
  transactions: state.transactions
})

export default connect(mapState, null)(AllMemes)
import React from 'react'
import {TrendingMemeObject} from '../components'
import {Router, Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {trendingMemesList} from '../store'

const TrendingMemes = props => {
  const memes = props.memes
  return (
    <section>
      <div className="container">
        <h1 id="nav-title" className="title">
          Trending Memes
        </h1>
        {!memes[0]
          ? `No activity just yet`
          : memes &&
            memes.map(meme => <TrendingMemeObject key={meme.id} {...meme} />)}
      </div>
    </section>
  )
}

const mapState = state => ({
  memes: trendingMemesList(state)
})

export default connect(mapState)(TrendingMemes)

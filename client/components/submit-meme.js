import React from 'react'
import {OfferForm} from '../components'
import {connect} from 'react-redux'

const SubmitMeme = props => {
  console.log('meme in Submit Meme', props.meme)
  return !props.meme ? (
    'Loading...'
  ) : (
    <div className="columns">
      <div className="column" />
      <div className="column is-half">
        <div className="card is-small">
          <div className="card-image">
            <figure className="image is-48by48">
              <img src={props.meme.imageUrl} alt="Placeholder image" />
            </figure>
          </div>
          <footer className="card-footer">
            {/* <OfferForm {...props} /> */}
          </footer>
        </div>
      </div>
      <div className="column" />
    </div>
  )
}

const mapState = state => ({
  meme: state.memes.byId[1]
})

export default connect(mapState)(SubmitMeme)

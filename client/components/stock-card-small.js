import React from 'react'
import { Link } from 'react-router-dom'


//May need to afix cemented size to make sure multiple per row fit
const SmallStockCard = props => {
  const {memeImage, memeName, memeId} = props
  console.log('props from stock-card-small', props)
  return (
    <div className="card meme-card">
    <div className="card-image">
      <figure className="image is-4by3">
        <img src={memeImage} alt="Placeholder image"/>
      </figure>
    </div>
    <div className="card-content">
      <div className="media">
          <div className="media-content">
            <p className="subtitle is-4 is-centered">{memeName}</p>
          </div>
        </div>
        <div className='columns'>
          <div className='column is-6 is-centered'>
            <Link to={`/offer/${memeId}`}>
                <button type='button' className='button is-blue'>
                  TRADE THIS MEME
                </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmallStockCard

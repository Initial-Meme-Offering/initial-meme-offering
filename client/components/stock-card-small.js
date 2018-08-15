import React from 'react'
import { Link } from 'react-router-dom'


//May need to afix cemented size to make sure multiple per row fit
const SmallStockCard = props => {
  const {memeImage, memeName} = props
  return (
    <div className="card meme-card">
    <div className="card-image">
      <figure className="image is-4by3">
        <img src={memeImage} alt="Placeholder image"/>
      </figure>
    </div>
    <div className="card-content">
      <div className="media">
        <div className="media-left">
          <figure className="image is-48x48">
            <img src={memeImage} alt="Placeholder image"/>
          </figure>
          </div>
          <div className="media-content">
            <p className="title is-4 meme-font">{memeName}</p>
            <p className="subtitle is-6 meme-font">@{memeName}</p>
          </div>
        </div>
        {/* <div className="content meme-font">
          Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus nec iaculis mauris.
          <br />
        </div> */}
        <div className='columns'>
          <div className='column is-6'>
            <Link to='/buy'>
                <button type='button' className='button is-blue'>
                  BUY THIS MEME
                </button>
            </Link>
          </div>
          <div className='column is-6'>
            <Link to='/sell'>
              <button type='button' className='button is-red'>
                SELL THIS MEME
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmallStockCard

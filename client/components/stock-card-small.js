import React from 'react'

//May need to afix cemented size to make sure multiple per row fit
<<<<<<< HEAD
const SmallStockCard = (props) => {
  const {name, imageUrl, symbol, desc} = props
  return (
    <div className="container column is-one-quarter">
      <div className="card below-nav-bar">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src={imageUrl}
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4 is-center">{name}</p>
              <p className="subtitle is-6 is-center">{`${symbol}`}</p>
            </div>
          </div>
          <div className="content">
            {desc}
            <br />
          </div>
        </div>
      </div>
    

=======
const SmallStockCard = props => {
  const {memeImage, memeName} = props
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={memeImage} alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={memeImage} alt="Placeholder image" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4 meme-font">{memeName}</p>
            <p className="subtitle is-6 meme-font">@{memeName}</p>
          </div>
        </div>
        <div className="content meme-font">
          Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus nec iaculis mauris.
          <br />
        </div>
      </div>
>>>>>>> master
    </div>
  )
}

export default SmallStockCard

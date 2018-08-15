import React from 'react'

//May need to afix cemented size to make sure multiple per row fit
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
              {/* <p className="title is-4 is-center">{name}</p> */}
              <p className="subtitle is-4 is-center">{`${symbol}`}</p>
            </div>
          </div>
        </div>
      </div>
    

    </div>
  )
}

export default SmallStockCard

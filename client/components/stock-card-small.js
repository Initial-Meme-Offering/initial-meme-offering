import React from 'react'

//May need to afix cemented size to make sure multiple per row fit
const SmallStockCard = () => {
  return (
   <div class='container column is-one-quarter'> 
    <div class="card below-nav-bar">
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">Meme Name</p>
          <p class="subtitle is-6">@memename</p>
        </div>
      </div>
      <div class="content">
        Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris.
        <br/>
      </div>
    </div>
  </div>
  </div>
  )
}

export default SmallStockCard

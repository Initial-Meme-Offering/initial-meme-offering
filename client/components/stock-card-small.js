import React from 'react'

//May need to afix cemented size to make sure multiple per row fit
export const smallStockCard = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-48x48">
                      <img src="http://bulma.io/placeholders/96x96.png" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-4">Title</p>
                    <p className="title is-6">Subtitle</p>
                  </div>
                  <div className="content">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa strong.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

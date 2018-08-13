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
                    <figure className="image is-128x128">
                      <img src="https://images.theconversation.com/files/38926/original/5cwx89t4-1389586191.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip" />
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

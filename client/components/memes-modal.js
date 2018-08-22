import React from 'react'
import {MarketChart, SmallIndiceCard} from '../components'
import {Link} from 'react-router-dom'

class MemesModal extends React.Component {
  state = {
    toggleDrop: false
  }

  handleClick = evt => {
    this.setState({
      toggleDrop: !this.state.toggleDrop
    })
  }

  render() {
    const {memes, indiceName} = this.props
    return (
      <div>
        <button
          type="submit"
          className="button"
          aria-haspopup="true"
          data-target="modal"
          onClick={this.handleClick}
        >
          <span>Memes</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
        <div className={this.state.toggleDrop ? 'modal is-active' : 'modal'}>
          <div onClick={this.handleClick} className="modal-background" />
          <div className="modal-card" id="meme-modal">
            <header className="modal-card-head">
              <p className="modal-card-title">
                <strong>{indiceName} Stocks</strong>
              </p>
              <button
                className="delete"
                onClick={this.handleClick}
                aria-label="close"
              />
            </header>
            <section className="modal-card-body">
              <div className="columns columns is-multiline">
                {memes && memes.map(meme => (
                  <div className="column is-4">
                    <SmallIndiceCard key={meme && meme.id} meme={meme} />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export default MemesModal

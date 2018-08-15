import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'

let OfferForm = props => {
  const {lastTrade, meme, memeStocks} = props
  console.log(memeStocks)
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="field">
        <div className="control">
          <label htmlFor="title" className="label">
            Quantity
          </label>
          <Field
            className="field input"
            name="quantity"
            component="input"
            type="text"
            placeholder={0}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label htmlFor="title" className="label">
            Amount ($)
          </label>
          <Field
            className="field input"
            name="price"
            component="input"
            type="number"
            placeholder={!lastTrade.price ? 0 : lastTrade.price}
          />
        </div>
      </div>
      {memeStocks[meme.id] && memeStocks[meme.id].quantity > 0 ? (
        <div>
          <div className="field">
            <div className="control">
              <a className="button is-success">Buy</a>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <a className="button is-failure">Sell</a>
            </div>
          </div>
        </div>
      ) : (
        <div className="field">
          <div className="control">
            <a className="button is-success">Buy</a>
          </div>
        </div>
      )}
    </form>
  )
}

const mapState = (state, ownProps) => ({
  initialValues: {
    ...state.offers.byId[0],
    price: ownProps.lastTrade.price,
    quantity: ownProps.lastTrade.quantity
  },
  memeStocks: state.memeStocks.byId
})

const mapDispatch = dispatch => ({})

OfferForm = reduxForm({form: 'OfferForm'})(OfferForm)
OfferForm = connect(mapState, mapDispatch)(OfferForm)

export default OfferForm

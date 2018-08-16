import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getMemeStocksByUser, postOffer} from '../store'
import {
  renderQuantityField,
  renderPriceField
} from './offers-form-renders'


class OfferForm extends React.Component {
  componentDidMount() {
    const {userId, getMemeStocks} = this.props
    getMemeStocks(userId)
  }

  handleOfferFormSubmit = data => {
    const {userId, meme} = this.props
    const {quantity, price, offerType } = data
    this.props.postOffer({userId, memeId: meme.id, quantity, price, offerType})
  }

  render() {
    const {lastTrade, meme, memeStocks, handleSubmit} = this.props
    return (
      <form>
        <Field
          className="field input"
          name="quantity"
          component={renderQuantityField}
          type="text"
        />
        <Field
          className="field input"
          name="price"
          component={renderPriceField}
          type="number"
          placeholder={!lastTrade.price ? '' : lastTrade.price}
        />
        {memeStocks[meme.id] && memeStocks[meme.id].quantity > 0 ? (
          <div>
            <button
              name="offerType"
              value="Buy"
              className="button is-success"
              type="submit"
              onClick={handleSubmit(values => {
                this.handleOfferFormSubmit({...values, offerType: 'buy'})
              })}
            >
              Buy
            </button>
            <button
              className="button is-danger"
              name="offerType"
              value="Sell"
              type="submit"
              onClick={handleSubmit(values => {
                this.handleOfferFormSubmit({...values, offerType: 'sell'})
              })}
            >
              Sell
            </button>
          </div>
        ) : (
          <button
            name="offerType"
            value="Buy"
            className="button is-success"
            type="submit"
            onClick={handleSubmit(values => {
              this.handleOfferFormSubmit({...values, offerType: 'buy'})
            })}
          >
            Buy
          </button>
        )}
      </form>
    )
  }
}

const validate = values => {
  const errors = {}
  if (!values.quantity || values.quantity <= 0) {
    errors.quantity = 'Can has more than 1 share?'
  }
  if (!values.price || values.price <= 0) {
    errors.price = 'More money plz'
  }
  return errors
}

const mapState = (state, ownProps) => ({
  initialValues: {
    ...state.offers.byId[0],
    price: ownProps.lastTrade.price,
    quantity: ownProps.lastTrade.quantity
  },
  memeStocks: state.memeStocks.byId,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  getMemeStocks: userId => dispatch(getMemeStocksByUser(userId)),
  postOffer: offer => dispatch(postOffer(offer))
})

OfferForm = withRouter(connect(mapState, mapDispatch)(OfferForm))

export default reduxForm({validate, form: 'OfferForm'})(OfferForm)

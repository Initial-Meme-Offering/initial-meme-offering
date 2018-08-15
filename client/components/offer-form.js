import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {getMemeStocksByUser} from '../store'
import {
  renderQuantityField,
  renderPriceField,
  renderBuyButton,
  renderSellButton
} from './offers-form-renders'
class OfferForm extends React.Component {
  componentDidMount() {
    const {userId, getMemeStocks} = this.props
    getMemeStocks(userId)
  }

  handleOfferFormSubmit = data => {
  console.log(data, 'data')
  }

  render() {
    const {lastTrade, meme, memeStocks, handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit(this.handleOfferFormSubmit.bind(this))}>
        <Field
          className="field input"
          name="quantity"
          component={renderQuantityField}
          type="text"
          placeholder={0}
        />
        <Field
          className="field input"
          name="price"
          component={renderPriceField}
          type="number"
          placeholder={!lastTrade.price ? 0 : lastTrade.price}
        />
        {memeStocks[meme.id] && memeStocks[meme.id].quantity > 0 ? (
          <div>
            <Field
              className="field input"
              name="offerType"
              value="Buy"
              component={renderBuyButton}
              placeholder={!lastTrade.price ? 0 : lastTrade.price}
            />
            <Field
              className="field input"
              name="offerType"
              value="Sell"
              component={renderSellButton}
              placeholder={!lastTrade.price ? 0 : lastTrade.price}
            />
          </div>
        ) : (
          <Field
            className="field input"
            name="offerType"
            value="Buy"
            component={renderBuyButton}
            placeholder={!lastTrade.price ? 0 : lastTrade.price}
          />
        )}
      </form>
    )
  }
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
  getMemeStocks: userId => dispatch(getMemeStocksByUser(userId))
})

const connectedForm = connect(mapState, mapDispatch)(OfferForm)

export default reduxForm({form: 'OfferForm'})(connectedForm)

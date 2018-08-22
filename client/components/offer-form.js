import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getMemeStocksByUser, postOffer} from '../store'
import {
  renderQuantityField,
  renderPriceField,
  renderOrderSelect,
  renderSubmitButton
} from './order-form-renders'
import history from '../history'

class OfferForm extends React.Component {
  componentDidMount() {
    const {userId, getMemeStocks} = this.props
    if (userId > 0) {
      getMemeStocks(userId)
    }
  }

  handleOfferFormSubmit = data => {
    const {userId, meme} = this.props
    const {quantity, price, orderType} = data

    if (userId > 0) {
      this.props.postOffer({
        userId,
        memeId: meme.id,
        quantity,
        price,
        orderType
      })
    } else {
      history.push('/login')
    }
  }

  render() {
    const {lastTrade, meme, memeStocks, handleSubmit} = this.props 
    return (
      <form onSubmit={handleSubmit(this.handleOfferFormSubmit.bind(this))}>
        <p className="subtitle">Enter Order</p>
        <div className="field is-grouped">
          <Field name="quantity" component={renderQuantityField} type="text" />
          <Field
            name="price"
            component={renderPriceField}
            type="number"
            placeholder={!lastTrade.price ? '' : lastTrade.price}
          />
          {memeStocks[meme.id] && memeStocks[meme.id].quantity > 0 ? (
            <Field
              name="orderType"
              type="select"
              component={renderOrderSelect}
              props={{value: 'both'}}
            />
          ) : (
            <Field name="orderType" component={renderOrderSelect} props={{value: 'buy'}} />
          )}
          <Field name="submit" component={renderSubmitButton} />
        </div>
      </form>
    )
  }
}

const validate = values => {
  const errors = {}
  if (!values.quantity || values.quantity <= 0) {
    errors.quantity = 'Can has more shares?'
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

export default reduxForm({
  validate,
  form: 'OrderForm',
  destroyOnUnmount: false
})(OfferForm)

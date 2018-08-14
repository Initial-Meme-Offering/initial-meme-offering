import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import moment from 'moment'

let OfferForm = props => {
  const {lastTrade} = props
  const lastDate = moment(lastTrade.seedDate).format('LLL')
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="field">
        <div className="control">
          <label htmlFor="title" className="label">
            Quantity
          </label>
          <Field
            className="field input"
            name="name"
            component="input"
            type="text"
            placeholder="Quantity"
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label htmlFor="title" className="label">
            Amount
          </label>
          <Field
            className="field input"
            name="name"
            component="input"
            type="text"
            placeholder={!lastTrade.price
              ? 'None recorded'
              : `$${lastTrade.price} on ${lastDate}`}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <a className="button is-success">Place Bid</a>
        </div>
      </div>
    </form>
  )
}

const mapState = (state, {match}) => ({
  initialValues: state.offers.byId[0]
})

const mapDispatch = dispatch => ({})

OfferForm = reduxForm({form: 'OfferForm'})(OfferForm)
OfferForm = connect(mapState, mapDispatch)(OfferForm)

export default OfferForm

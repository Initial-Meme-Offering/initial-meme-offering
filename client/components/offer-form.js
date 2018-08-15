import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'

let OfferForm = props => {
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
            Bid Amount
          </label>
          <Field
            className="field input"
            name="name"
            component="input"
            type="text"
            placeholder="Bid Amount"
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <a className="button is-success">Place Bid</a>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <div className="select is-primary">
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  )
}

const mapState = (state, {match}) => ({
  initialValues: state.offers.byId[0]
  // [match.params.offerId]
})

const mapDispatch = dispatch => ({})

OfferForm = reduxForm({form: 'OfferForm'})(OfferForm)
OfferForm = connect(mapState, mapDispatch)(OfferForm)

export default OfferForm

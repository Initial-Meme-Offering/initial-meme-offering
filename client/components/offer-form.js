import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'

let OfferForm = props => {
  console.log('hello offerForm')
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
            placeholder="Text input"
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
            placeholder="Text input"
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label htmlFor="title" className="label">
            Bid Price
          </label>
          <Field
            className="field input"
            name="name"
            component="input"
            type="text"
            placeholder="Text input"
          />
        </div>
      </div>

      {/* <div className="input-field">
          <Field className="field" name="name" component="input" type="text" />
          <label htmlFor="title">Meme Stock</label>
        </div>
        
        
        <div className="input-field">
          <Field className="field" name="price" component="input" type="text" />
          <label htmlFor="title">Price</label>
        </div>
        <div className="input-field">
          <Field className="field" name="price" component="input" type="text" />
          <label htmlFor="title">Price</label>
        </div> */}
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

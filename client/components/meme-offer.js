import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {postCategory, fetchCategory, putCategory} from '../../store'

const mapState = state => ({
})

const mapDispatch = (dispatch, ownProps) => ({
})

class MemeOfferForm extends Component {
  componentDidMount() {
  }

  handleInitialize() {
    const {category} = this.props
    const initData = {
      name: category.name,
      imageUrl: category.imageUrl
    }

    this.props.initialize(initData)
  }

  handleCategoryFormSubmit = data => {
    const {id, addCategory, editCategory} = this.props
    const {name, imageUrl} = data
    if (id) {
      editCategory({id, name, imageUrl})
    } else addCategory({name, imageUrl})
  }

  render() {
    const {} = this.props
    return (
      <div
        className="ui raised very padded text container segment"
        style={styles.div}
      >
        <Header as="h2">{id ? `Edit ${category.name}` : `Add Category`}</Header>
        <Form onSubmit={handleSubmit(this.handleCategoryFormSubmit.bind(this))}>
          <label>Name:</label>
          <field
            name="name"
            component={renderField}
            type="text"
            placeholder="Name"
          />

          <label>Image:</label>
          <field
            name="imageUrl"
            component={renderField}
            type="text"
            placeholder="Image"
          />

          <button >
            Submit
          </button>
          <Button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear
          </Button>
        </Form>
      </div>
    )
  }
}

// render form fields
const renderField = ({input, label, type, meta: {touched, error}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} />
      {touched && (error && <Label pointing>{error}</Label>)}
    </div>
  </div>
)

// validation for form
const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Please enter a name for the category!'
  }
  if (!values.imageUrl) {
    errors.price = 'Please enter an image for the category!'
  }
  return errors
}

CategoryForm = withRouter(connect(mapState, mapDispatch)(CategoryForm))

export default reduxForm({
  form: 'category',
  validate
})(CategoryForm)

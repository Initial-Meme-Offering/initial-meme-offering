import React from 'react'
import {PieChart} from '../components'
import {getMemeStocksByUser, getUserPieChart} from '../store'
import {connect} from 'react-redux'

class Portfolio extends React.Component {
  componentDidMount() {
    this.props.getMemeStocksByUser(2)
    //(this.props.user.id)
  }

  render() {
    return (
      <section className="section is-medium">
        <div className="container">
          <div className="columns is-variable">
            <div className="column is-2">
              <PieChart data={this.props.pieChart} />
            </div>
            <div className="column is-2">Hello World</div>
            <div className="column is-2">Hello World</div>
          </div>
        </div>
      </section>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    memes: state.memes.byId,
    pieChart: getUserPieChart(state)
  }
}

const mapDispatch = dispatch => {
  return {
    getMemeStocksByUser: userId => dispatch(getMemeStocksByUser(userId))
  }
}

export default connect(mapState, mapDispatch)(Portfolio)

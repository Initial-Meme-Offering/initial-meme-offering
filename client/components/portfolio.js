import React from 'react'
import {PieChart} from '../components'
import {getMemeStocksByUser, getUserPieChart} from '../store'
import {connect} from 'react-redux'

class Portfolio extends React.Component {
  componentDidMount() {
    this.props.getMemeStocksByUser(4)
    //(this.props.user.id)
  }

  render() {
    return (
      <div>
        <div className="columns">
          <div className="column">
            <PieChart data={this.props.pieChart} />
          </div>
          <div className="column">Hello World</div>
        </div>
      </div>
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

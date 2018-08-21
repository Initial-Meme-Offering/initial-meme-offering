import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  UserHome,
  SingleIndice,
  Homepage,
  TrendingMemes,
  SingleMeme,
  Portfolio,
  SubmitMeme,
  MemesBySearch,
  AllIndices
} from './components'
import {
  me,
  getMemes,
  getTransactions,
  getIndices,
  getMemeIndices,
  getMarketHistory,
  getOffers,
  getMemeStocksByUser
} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    if (this.props.isLoggedIn) {
      this.props.getOffers()
      this.props.getMemeStocksByUser(this.props.userId)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
      this.props.getOffers()
      this.props.getMemeStocksByUser(this.props.userId)
    }
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/allmemes/:memeId" component={SingleMeme} />
        <Route path="/submit" component={SubmitMeme} />
        <Route path="/indices" component={AllIndices} />
        <Route path="/index/:indiceId" component={SingleIndice} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Login} />
        <Route exact path="/offer/:memeId([0-9]*)" component={SingleMeme} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/allmemes" component={MemesBySearch} />
        <Route exact path="/search" component={MemesBySearch} />
        <Route exact path="/search/:memeName" component={MemesBySearch} />
        <Route path="/trendingmemes" component={TrendingMemes} />
        <Route exact path="/" component={Homepage} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userId: state.user.id || 0
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(getMemes())
      dispatch(getTransactions())
      dispatch(getIndices())
      dispatch(getMemeIndices())
      dispatch(getMarketHistory())
    },
    getOffers: () => dispatch(getOffers()),
    getMemeStocksByUser: userId => dispatch(getMemeStocksByUser(userId))
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

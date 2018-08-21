import React from 'react'
import {IndiceObject} from '../components'
import {allIndicesList} from '../store'
import {connect} from 'react-redux'

const AllIndices = props => {
  const {indices} = props
  console.log('indices', indices)
  return (
    <section>
      <div className="container">
        <h1 id="nav-title" className="title">
          Indices
        </h1>
        {!indices[0]
          ? `No activity just yet`
          : indices.map(indice => <IndiceObject key={indice.id} {...indice} />)}
      </div>
    </section>
  )
}

const mapState = state => {
  return {
    indices: allIndicesList(state)
  }
}

export default connect(mapState)(AllIndices)

import React from 'react'
import {MarketChart, BackgroundVideo, SmallStockCard} from '../components'
import {connect} from 'react-redux'
import {getMemesByIndex, getSingleStockChart} from '../store'

const SingleIndice = props => {
  const {totalMarket, memes, indice} = props
  return (
    <div>
      <div className="container">
        <MarketChart
          data={totalMarket}
          title={indice.name}
          x={totalMarket.x}
          y={totalMarket.y}
        />
      </div>
      {memes.map(meme => <SmallStockCard key={meme.id} />)}
    </div>
  )
}

const mapState = (state, ownProps) => {
  return {
    indice: state.indices.byId[+ownProps.match.params.indiceId] || 0,
    memes: getMemesByIndex(state, +ownProps.match.params.indiceId),
    totalMarket: getSingleStockChart(state, 1)
  }
}

export default connect(mapState)(SingleIndice)

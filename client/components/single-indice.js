import React from 'react'
import {Header} from 'semantic-ui-react'
import {MarketChart, BackgroundVideo, SmallStockCard} from '../components'
import {connect} from 'react-redux'
import {getMemesByIndex, getSingleStockChart} from '../store'

const styles = {
  div: {
    marginTop: 40,
    width: 2000
  },
  subHeader: {
    paddingLeft: 100
  }
}

const SingleIndice = props => {
  const {totalMarket, memes, indice} = props
  return (
    <div>
      <BackgroundVideo className="lowest-level" />
      <MarketChart
        data={totalMarket}
        title={indice.name}
        x={totalMarket.x}
        y={totalMarket.y}
      />
      <Header as="h1" style={styles.subHeader}>
        <Header.Content />
      </Header>
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

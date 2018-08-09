import React from 'react'
import {Button, Grid, Image, Container, Icon, Divider} from 'semantic-ui-react'

// export const Stockcard = () => {
//   return (
//     <div>
//       <Button>Click Me</Button>
//     </div>
//   )
// }

export const Stockcard = () => {
  return (
    <Container>
      <Divider />
      <Grid>
        <Grid.Column width={4}>
          <Image src="https://images.theconversation.com/files/38926/original/5cwx89t4-1389586191.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip" />
        </Grid.Column>
        <Grid.Column width={6}>
          <h3>Name of Meme</h3>
          <h5>Total Available: 50</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa strong.
          </p>
          <Icon name="caret down" color="red" size="huge" />
          <Icon name="caret up" color="green" size="huge" />
        </Grid.Column>
      </Grid>
      <Divider />
    </Container>
  )
}

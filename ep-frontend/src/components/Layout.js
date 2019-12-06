import Container from 'react-bootstrap/Container'

const Container = (props) => {
  return(
    <Container>
      {props.children}
    </Container>
  )
}

export default Container;
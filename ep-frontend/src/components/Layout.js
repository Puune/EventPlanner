/**
 * This module contains bootstrap container
 * @module Layout
 */
import React from 'react'
import Container from 'react-bootstrap/Container'

/**
 * This is the bootstrap container element
 * @class
 * @param {*} props 
 */
const myContainer = (props) => {
  return(
    <Container>
      {props.children}
    </Container>
  )
}

export default myContainer;
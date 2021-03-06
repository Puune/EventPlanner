/**
 * This module contains occasion list component
 * @module OccasionsList
 */

import React from 'react';
import _ from 'lodash';
import Occasion from './OccasionClass';

import ListGroup from 'react-bootstrap/ListGroup';


/**
 * This component builds a list of occasions
 * @class
 * @param {*} props 
 */
const OccasionsList = (props) => {

  const occasions = props.occState.occasions;

  /**
   * This function creates a singular list element for the list
   * @function listBuild
   * @param {*} item 
   */

  return(
    <ListGroup >
      {occasions.map((item) => ListBuild(item, props))}
    </ListGroup>
  )
}


/**
 * @class
 * @param { occasion } item 
 * @param {*} props 
 */
const ListBuild = (item, props) => {
  if(item.type === 'delete'){
    return;
  } else {
    return(
      <ListGroup.Item key={item.id}>
        <Occasion 
          occasion={item} 
          user={props.user}
          userState={props.userState}
          />
      </ListGroup.Item>
    )
  }
}

export default OccasionsList;
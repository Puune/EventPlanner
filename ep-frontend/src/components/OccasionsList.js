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
  const listBuild = (item) => {
    if(item.type === 'delete'){
      return;
    } else {
      return(
        <ListGroup.Item key={item.id}>
          <Occasion 
            occasion={item} 
            user={props.user}
            />
        </ListGroup.Item>
      )
    }
  }

  return(
    <ListGroup >
      {occasions.map((item) => listBuild(item))}
    </ListGroup>
  )
}

export default OccasionsList;
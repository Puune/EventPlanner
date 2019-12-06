import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import Occasion from './Occasion';

import ListGroup from 'react-bootstrap/ListGroup';

const OccasionsList = (props) => {

  const occasionHooks = props.occasionHooks;

  const [combinedList, setCombinedList] = useState([]);

  //combine all events to a list removing duplicates
  useEffect(() => {
    let newCombinedArr = [];    
    //Push public
    occasionHooks.pubOccasions.forEach((occ) => {
      newCombinedArr = newCombinedArr.concat(occ);
    })

    //push private
    occasionHooks.privateOccasions.forEach((occ) => {
      let pubOcc = _.find(occasionHooks.pubOccasions, { 'id': occ.id });
      if(typeof pubOcc !== 'undefined'){
        _.remove(newCombinedArr, (n) => n.id === occ.id);
      }
      newCombinedArr = newCombinedArr.concat(occ);
    })

    //push owned
    occasionHooks.ownOccasions.forEach((occ) => {
      let pubOcc = _.find(occasionHooks.pubOccasions, { 'id': occ.id });
      if(typeof pubOcc !== 'undefined'){
        _.remove(newCombinedArr, (n) => n.id === pubOcc.id);
      }
      newCombinedArr = newCombinedArr.concat(occ);
    })
  
    setCombinedList(_.reverse(combinedList));
    
    setCombinedList(newCombinedArr);
  }, [
    occasionHooks.ownOccasions,
    occasionHooks.privateOccasions,
    occasionHooks.pubOccasions
  ])

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
      {combinedList.map((item) => listBuild(item))}
    </ListGroup>
  )
}

export default OccasionsList;
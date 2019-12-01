import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import Occasion from './Occasion';
import { type } from 'os';

const OccasionsList = (props) => {

  const occasionHooks = props.occasionHooks;

  const [combinedList, setCombinedList] = useState([]);

  useEffect(() => {
    let newCombinedArr = [];    
    occasionHooks.pubOccasions.forEach((occ) => {
      newCombinedArr = newCombinedArr.concat(occ);
      occ.type = 'public'
    })

    occasionHooks.ownOccasions.forEach((occ) => {
      let pubOcc = _.find(occasionHooks.pubOccasions, { 'id': occ.id });
      if(typeof pubOcc !== 'undefined'){
        _.remove(newCombinedArr, (n) => n.id === pubOcc.id);
      }
      occ.type = 'owned';
      newCombinedArr = newCombinedArr.concat(occ);
    })

    occasionHooks.inviteOccasions.forEach((occ) => {
      let pubOcc = _.find(occasionHooks.pubOccasions, { 'id': occ.id });
      if(typeof pubOcc !== 'undefined'){
        _.remove(newCombinedArr, (n) => n.id === occ.id);
      }
      occ.type = 'invited'
      newCombinedArr = newCombinedArr.concat(occ);
    })

    
    setCombinedList(newCombinedArr);
  }, [
    occasionHooks.ownOccasions,
    occasionHooks.inviteOccasions,
    occasionHooks.pubOccasions
  ])

  const listBuild = (item) => {
    return (
      <li 
        className={'no-style'}
        key={item.id}>
        <Occasion occasion={item} />
      </li>
    )
  }

  return(
    <div>
      <ul>
        {combinedList.map((item) => listBuild(item))}
      </ul>
    </div>
  )
}

export default OccasionsList;
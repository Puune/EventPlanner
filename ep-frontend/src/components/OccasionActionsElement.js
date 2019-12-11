/**
 * This module contains all components, that allow operations on occasions.
 * @module OccasionActionElement
 */

import React, {useState} from 'react';

import occasionTyper from '../util/occasionTyper';

import inviteService from '../services/invite';
import occasionService from '../services/occasion';
import InviteForm from './InviteForm';

import Button from 'react-bootstrap/Button';

/**
 * This component reads the type of parent occasion
 * @class
 * @param { occasion } occasion
 * @param { user } user
 * @param {*} props 
 */
const InviteElement = ({occasion, user, ...props}) => {
  
  const [expanded, setExpanded] = useState(false);
  const expansion = (exp) => { return { display: exp ? '' : 'none' }}

  /**
   * Handles overwriting the old occasion.
   * @function setOccasion
   * @param { occasion } occ 
   */
  const setOccasion = (occ) => {
    occ.classname = occasionTyper.getClassName(occ);
    occ.info = occasionTyper.getOccasionInfoText(occ);
    occasionTyper.convertJSONToDate(occ); 
    props.setOccasionState(occ);
  }

  /**
   * This function handles an event, where user accepts/declines an inviter.
   * @function handleInviteResponse
   * @param { Boolean } accept 
   */
  const handleInviteResponse = async (accept) => {
    try{
      var res = await inviteService.answerInvite(user, occasion.id, accept);      
      if(accept){
        res.type = 'participant'
      } else if(!accept){
        res.type = 'delete'
      }
      setOccasion(res)    
    } catch(exception){
      console.log(exception);
    }
  }

  /**
   * This function handles a deletion of an event
   * @function handleDeleteOccasion
   */
  const handleDeleteOccasion = async() => {
    await occasionService.deleteOccasion(user, occasion.id);
    let temp = Object.assign(occasion);
    temp.type = 'delete'
    setOccasion(temp);
  }

  /**
   * This function handles an event where user participates a public event
   * @function handleParticipatePublicEvent
   */
  const handleParticipatePublicEvent = async(participate) => {
    const body = {
      participate,
      occasionId: occasion.id
    }

    var upOccasion = await occasionService.participatePublic({user, body});
    setOccasion(upOccasion);

    if(occasion.isPrivate){
      let temp = Object.assign(occasion);
      temp.type = 'delete'
      setOccasion(temp);
    }
  }
  
  if(occasion.type === 'owned'){
    const isPrivate = () => (occasion.isPrivate) ? {display: ''} : {display: 'none'}
    return(
      <React.Fragment>
        <span style={isPrivate()}><Button onClick={() => setExpanded(!expanded)}>Send Invites</Button></span>
        <Button 
          variant="danger"
          onClick={() => handleDeleteOccasion()}
        >
        Delete
        </Button>

        <div style={expansion(expanded)}>
          <InviteForm user={user} occasion={occasion}/>
        </div>
        <div style={expansion(!expanded)}>

        </div>
      </React.Fragment>
    )
  } else if(occasion.type === 'invited') {
    return(
      <React.Fragment>
        <Button
          onClick={() => handleInviteResponse(true)}
        >
          Accept
        </Button>
        
        <Button
          variant="danger"
          onClick={() => handleInviteResponse(false)}
        >
          Decline
        </Button>
      </React.Fragment>
    )
  } else if(occasion.type === 'participant'){
    return(
      <React.Fragment>
        <Button
          variant='warning'
          onClick={() => handleParticipatePublicEvent(false)}
        >
          Leave  
        </Button>
      </React.Fragment>
    )
  } else if(occasion.type === 'public'){
    if(user){
      return(
        <React.Fragment>
          <Button
            onClick={() => handleParticipatePublicEvent(true)}
          >
            Participate
          </Button>
        </React.Fragment>
      )
    } else {
      return(
        <>
        </>
      )
    }
  } else if(occasion.type === 'delete'){
    return(
      <>
      </>
    )
  } else {
    //error
    console.log('======occasion has no type======');
    console.log(occasion);
    return(
      <>
      </>
    )
  }
}

export default InviteElement;
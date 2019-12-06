import React, {useState, useEffect} from 'react';

import inviteService from '../services/invite';
import occasionService from '../services/occasion';
import InviteForm from './InviteForm';

import Button from 'react-bootstrap/Button';

const InviteElement = ({occasion, user, ...props}) => {
  
  const [expanded, setExpanded] = useState(false);
  const expansion = (exp) => { return { display: exp ? '' : 'none' }}

  
  const handleInviteResponse = async (accept) => {
    try{
      const res = await inviteService.answerInvite(user, occasion.id, accept);      
      if(accept){
        occasion.type = 'participant'
      } else if(!accept){
        occasion.type = 'delete'
      }

      occasion = res;

      props.updateClassname(occasion);
    } catch(exception){
      console.log(exception);
    }
  }

  const handleDeleteOccasion = async() => {
    await occasionService.deleteOccasion(user, occasion.id);
    occasion.type = 'delete'
    props.updateClassname(occasion)
  }

  const handleParticipatePublicEvent = async(participate) => {
    const body = {
      participate,
      occasionId: occasion.id
    }

    const upOccasion = await occasionService.participatePublic({user, body});
    occasion = upOccasion;

    if(occasion.isPrivate){
      occasion.type = 'delete';
    }

    props.updateClassname(occasion);
    console.log(occasion);
    
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
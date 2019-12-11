/**
 * This module contains form elements, for inviting users to occasions
 * @module InviteForm
 */

import React, {useState, useEffect} from 'react';
import usersService from '../services/user';
import inviteService from '../services/invite'
import _ from 'lodash';

import Input from 'react-bootstrap/InputGroup'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';



/**
 * This component allows occasion owner to search and invite users to their occasion.
 * @class
 * @param { user } user
 * @param { occasion } occasion 
 */
const InviteForm = ({user, occasion, userState}) => {

  const [search, setSearch] = useState('');
  const users = userState.users;
  const setUsers = userState.setUsers;   

  /**
   * This function handles submit event
   * @function submitHandler
   * @param { event } event 
   */
  const submitHandler = async(event) => {
    try{
      event.preventDefault();
      const invitee = _.find(users, { 'username': search });
      const response = await inviteService.sendInvite(user, occasion.id, invitee.id);
      const newUsers = users.filter((user) => user.username !== search);
      setUsers(newUsers);

      if(response.status === 200){
      } else {
        console.log(response);
      }
    } catch(exception){
      console.log(exception);
    }
  }

  return(
    <Form onSubmit={submitHandler}>
      <Input>
          <Form.Control 
            placeholder="search for a user"
            value={search}
            onChange={({target}) => setSearch(target.value)}
          />
          <Input.Append>
            <Button
              type="submit"
            >
            Invite</Button>
          </Input.Append>
      </Input>
      <CardGenerator 
        users={users} occasion={occasion}
        search={search} setSearch={setSearch}/>
    </Form>
  )
}



/**
 * This component generates suggestion cards when searching for users
 * @class
 * @param { String } search
 * @param { User[] } users 
 * @param { setState } setSearch
 * @param { Occasion } occasion  
 */
const CardGenerator = ({search, users, setSearch, occasion}) => {

  /**
   * This function creates a filtered list from search input
   * @function filteredList
   */
  const filteredList = () => {
    var arr = [];
    let capSearch = search.toUpperCase();

    users.forEach((user) => {
      let capName = user.username.toUpperCase();
      if(search === ''){
        
      }else if(capName.includes(capSearch)){
        arr.push(user);
      }
    })

    if(occasion.invitees.length > 0){            
      arr = arr.filter((user) => {
        return !occasion.invitees.includes(user.id);
      })
    } 

    if(occasion.participants.length > 0){
      arr = arr.filter((user) => {
        return !occasion.participants.includes(user.id);
      })
    }
    
    return arr;
  }

  return(
    <>
      <ListGroup>
        {filteredList().map((item) => 
          <ListGroup.Item key={item.id}>{CustomCard(item, setSearch)}
            </ListGroup.Item>)}
      </ListGroup>
    </>
  )
}


/**
 * This is a suggestion card. Can be used to select user.
 * @class
 * @param { user } user 
 * @param { setState } setSearch 
 */
const CustomCard = (user, setSearch) => {
  return(
    <Card 
      onClick={()=> setSearch(user.username)}
      key={user.id}
      >
      <Card.Body>
        <Card.Text>
          <b>{user.username}</b> {user.name}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default InviteForm;
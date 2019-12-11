/**
 * This module contains Header component
 * @module components.Header
 */

import React, {useState} from 'react';

import UserInfo from './UserInfo';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Navbar from 'react-bootstrap/Navbar';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

/**
 * This is a 'user button' that open user modal
 * @class
 * @param { user } user 
 * @param { Boolean } setModalVisible 
 */
const User = (user, setModalVisible) => {
  let cont = ""
  if(user){
    cont = user.username
  } else {
    cont = 'Log in'
  }

  return(
    <ButtonToolbar>
      <Button 
        onClick={() => setModalVisible(true)}
        variant='light'
        size='lg'
      >
      {cont}</Button>
    </ButtonToolbar>
  )
}

/**
 * This component is the header of this webpage.
 * @class
 * @param {*} props 
 */
const Header = (props) => {

  const [modalVisible, setModalVisible] = useState(false);

  const modalProps = {
    show: modalVisible,
    onHide: () => setModalVisible(false)
  }  

  return(
    <>
      <Navbar bg='dark' >
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {User(props.user, setModalVisible)}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Jumbotron>
        <div className="jumbo">
          <h1>Event Planner</h1>
        </div>
      </Jumbotron>
      <UserInfo
        modalProps={modalProps}
        user={props.user}
        setUser={props.setUser}
      />
    </>
  )
}

export default Header;
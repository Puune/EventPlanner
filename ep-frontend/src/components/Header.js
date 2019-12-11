/**
 * This module contains Header component
 * @module components.Header
 */

import React, {useState} from 'react';

import UserInfo from './UserInfo';
import About from './About';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Navbar from 'react-bootstrap/Navbar';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';


/**
 * This component is the header of this webpage.
 * @class
 * @param {*} props 
 */
const Header = (props) => {

  const [modalUserVisible, setModalUserVisible] = useState(false);
  const modalUserProps = {
    show: modalUserVisible,
    onHide: () => setModalUserVisible(false)
  }  

  const  [modalAboutVisible, setModalAboutVisible] = useState(false);
  const modalAboutProps = {
    show: modalAboutVisible,
    onHide: () => setModalAboutVisible(false)
  }

  return(
    <>
      <Navbar 
        bg='dark' 
        expand="lg"
        className='navbar-custom'
      >
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {AboutButton(setModalAboutVisible)}
          </Navbar.Text>
          <Navbar.Text>
            {UserButton(props.user, setModalUserVisible)}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Jumbotron>
        <div className="jumbo">
          <h1>Event Planner</h1>
        </div>
      </Jumbotron>
      <UserInfo
        modalProps={modalUserProps}
        user={props.user}
        setUser={props.setUser}
      />
      <About 
        modalProps={modalAboutProps}
      />
    </>
  )
}


/**
 * This is a 'user button' that open user modal
 * @class
 * @param { user } user 
 * @param { Boolean } setModalUserVisible 
 */
const UserButton = (user, setModalUserVisible) => {
  let cont = ""
  if(user){
    cont = user.username
  } else {
    cont = 'Log in'
  }

  return(
    <ButtonToolbar>
      <Button 
        onClick={() => setModalUserVisible(true)}
        variant='light'
        size='lg'
        className='navbar-item'
      >
      {cont}</Button>
    </ButtonToolbar>
  )
}


const AboutButton = (setModalAboutVisible) => {

  return(
    <ButtonToolbar>
      <Button
        onClick={() => setModalAboutVisible(true)}
        variant='light'
        size='lg'
        className='navbar-item'
      >
        About
      </Button>
    </ButtonToolbar>
  )
}


export default Header;
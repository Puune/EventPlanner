import React, {useState} from 'react'

import LogoutBtn from './LogoutButton';
import LoginForm from './LoginForm'
import SignInForm from './SignInForm';

import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const UserInfo = (props) => {  

  const [toggled, setToggled] = useState(false);
  const toggle = (tog) => { return { display: tog ? '' : 'none' }}

  const getHeaderText = () => {
    if(!toggled){
      return 'Log in'
    } else {
      return 'Sign in'
    }
  }
  
  if(props.user){
    return(
      <Modal
        {...props.modalProps}
        size='lg'
        centered
      >
        <Modal.Header>
          <Modal.Title>
            {props.user.username}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs lg="2"> Full name: </Col>
            <Col>{props.user.name}</Col>
          </Row>
          <br/>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col>
              <LogoutBtn />
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    )
  } else {
    return(
      <Modal
        {...props.modalProps}
        size='lg'
      >
        <Modal.Header>
          <Col  lg="6" as="h3" >{getHeaderText()}</Col>
        </Modal.Header>
        <Modal.Body>
          <div style={toggle(!toggled)}>
            <LoginForm 
              setUser={props.setUser}
              toggle={()=> setToggled(!toggled)}
            />
          </div>
          <div style={toggle(toggled)}>
            <SignInForm 
              toggle={()=> setToggled(!toggled)}
            />
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default UserInfo;
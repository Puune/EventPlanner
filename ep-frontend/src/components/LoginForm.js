/**
 * This module contains form for logging in.
 * @module LoginForm
 */

import React, {useState} from 'react';
import loginService from '../services/login';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

/**
 * This component contains elements and handler for logging in
 * @class
 * @param {*} props 
 */
const LoginForm = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /**
   * This function hanles login event
   * @function loginHandler
   * @param { event } event 
   */
  const loginHandler = async (event) => {    
    event.preventDefault();
    try{
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));

      props.setUser(user);
      setPassword('');
      setUsername('');
    } catch(exception) {
      console.log(exception);
    }
  }  

  return(
    <>
      <Form onSubmit={loginHandler}>
        <Row>
          <Col>
            <Form.Group controlId="loginFormUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text"
                value={username}
                onChange={({target}) => setUsername(target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="loginFormPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                value={password}
                onChange={({target}) => setPassword(target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md="auto">
            <Form.Group>
              <Button
                type="submit">
                Log In</Button>
            </Form.Group>
          </Col>
          <Col>
            <Button 
              onClick={props.toggle}
              variant="secondary"
              >  
              Or Sign in</Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default LoginForm;
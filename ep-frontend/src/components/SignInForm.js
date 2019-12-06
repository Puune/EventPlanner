import React, {useState} from 'react'

import signInService from '../services/signIn';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const SignIn = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');  

  const signInHandler = async (event) => {
    event.preventDefault();

    try{
      const body = {
        username,
        name,
        password
      }      
      await signInService.post(body);

      setUsername('');
      setName('');
      setPassword('');
    } catch(exception){
      console.log(exception);
    }
  }


  return(
    <>
      <Form onSubmit={signInHandler}>
        <Row>
          <Col>
            <Form.Group controlId="signInFormUsername">
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
            <Form.Group controlId="signInFormPassword">
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
          <Col>
            <Form.Group controlId="signInFormName">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text"
                value={name}
                onChange={({target}) => setName(target.value)}
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
                  Sing In
                </Button>
            </Form.Group>
          </Col>
          <Col>
            <Button 
              onClick={props.toggle}
              variant="secondary"
              >
              Or Login</Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default SignIn;
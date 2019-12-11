import React from 'react';

import Modal from 'react-bootstrap/Modal';

const About = (props) => {

  const frontEnd = [
    'Axios - for REST connection',
    'react-bootstrap - for easier styling',
    'lodash - to help with tossing objects in arrays around'
  ]

  const backEnd =  [
    'dotenv - to initialize local variables',
    'express - for REST connection',
    'body-parser - for parsing bodies, mainly to json',
    'cors - Cross Origin Resource Sharing to help with back-to-front connection',
    'mongoose - to use MongoDB efficiently',
    'nodemon - to monitor back-end while developing',
    'mongoose-unique-validator - to require unique usernames',
    'bcrypt - to encrypt passwords',
    'jsonwebtoken - to make the site a little more secure',
    'eslint - to give me a migraine',
    'jest - I almost made more than 1 test',
    ]

  return(
    <Modal
      {...props.modalProps}
      size='lg'
      centered
    >
      <Modal.Header>
        <Modal.Title>About</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <React.Fragment>
          This web app is built on Node.js and React.js.
        </React.Fragment>
        <React.Fragment>
          The front utilizes:
          <ul>
            {frontEnd.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </React.Fragment>
        <React.Fragment>
          The backend utilizes
          <ul>
            {backEnd.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </React.Fragment>
      </Modal.Body>
    </Modal>
  )
}

export default About;
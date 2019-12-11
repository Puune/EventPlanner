/**
 * This is the main App.
 * @module App
 * @author Panu Lindqvist
 */

import React, {useState, useEffect} from 'react';
import occasionService from './services/occasion';
import occasionTyper from './util/occasionTyper';

import OccasionsList from './components/OccasionsList'
import OccasionForm from './components/OccasionForm';
import Header from './components/Header';

import Container from './components/Layout';


function App() {

  const [occasions, setOccasions] = useState([]);
  const occState = {
    occasions, setOccasions
  }

  const [user, setUser] = useState();  

  useEffect(() => {
    if(user){      
      occasionService
        .getAll(user)
        .then(occs => setOccasions(occs));
      }    
  }, [user]);


  useEffect(() => {
    //TODO confirm old login with back-end
    /*
    try{
      const loggedUserJSON = window.localStorage.getItem('loggedUser');
      if(loggedUserJSON){
        const user = loginService.login()
      }
    } catch(exception){
      console.log(exception);
    }
    */
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    } else {      
      setUser(null);
      occasionService
        .getAll(user)
        .then(occs => setOccasions(occs)); 
    }
  }, [])

  return (
    <>
      <Header user={user} setUser={setUser}/>
      <Container>
        <OccasionForm user={user} occState={occState}/>
        <OccasionsList 
          occState={occState}
          user={user}/>
      </Container>
    </>
  );
}

export default App;

/**
 * This is the main App.
 * @module App
 * @author Panu Lindqvist
 */

import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import occasionService from './services/occasion';
import userService from './services/user';

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

  const [users, setUsers] = useState([]);  
  const userState = {
    users, setUsers
  }

  const typeOccasion = (occ) => {
    occ.classname = occasionTyper.getClassName(occ);
    occ.info = occasionTyper.getOccasionInfoText(occ);
    occasionTyper.convertJSONToDate(occ);
    return occ;
  } 

  useEffect(() => {
    if(user){      
      occasionService
        .getAll(user)
        .then(occs => {
          occs.map((occ) => occ = typeOccasion(occ));
          setOccasions(occs);
        });
      }    
  }, [user]);

  useEffect(() => {
    if(user){
      userService
        .getUsers({})
        .then(res => {
          res = _.reject(res, { 'username' : user.username })
          setUsers(res)
        })      
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
          user={user}
          userState={userState}/>
      </Container>
    </>
  );
}

export default App;

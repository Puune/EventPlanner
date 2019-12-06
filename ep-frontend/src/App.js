import React, {useState, useEffect} from 'react';
import occasionService from './services/occasion';

import OccasionsList from './components/OccasionsList'
import OccasionForm from './components/OccasionForm';
import Header from './components/Header';

import './App.css';
import Container from 'react-bootstrap/Container';


function App() {

  const [pubOccasions, setPubOccasions] = useState([]);
  const [ownOccasions, setOwnOccasions] = useState([]);
  const [privateOccasions, setPrivateOccasions] = useState([]);

  const occasionHooks = {
    pubOccasions, setPubOccasions,
    ownOccasions, setOwnOccasions,
    privateOccasions, setPrivateOccasions
  }

  const [user, setUser] = useState();

  useEffect(() => {
    if(user){      
      occasionService
      .getPublic(user)
      .then(occs => setPubOccasions(occs)); 
      
      occasionService
        .getPrivates(user)
        .then(occs => setPrivateOccasions(occs));
      
      occasionService
        .getOwned(user)
        .then(occs => setOwnOccasions(occs));
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
      .getPublic(user)
      .then(occs => setPubOccasions(occs)); 
    }
  }, [])

  return (
    <>
      <Header user={user} setUser={setUser}
        occasionHooks={occasionHooks} />
      <Container>
        <OccasionForm user={user} setOwnOccasions={setOwnOccasions} ownOccasions={ownOccasions}/>
        <OccasionsList 
          occasionHooks={occasionHooks}
          user={user}/>
      </Container>
    </>
  );
}

export default App;

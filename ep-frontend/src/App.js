import React, {useState, useEffect} from 'react';
import occasionService from './services/occasion';
import loginService from './services/login';

import LoginForm from './components/LoginForm';
import OccasionsList from './components/OccasionsList'
import './App.css';
import OccasionForm from './components/OccasionForm';


function App() {

  const [pubOccasions, setPubOccasions] = useState([]);
  const [ownOccasions, setOwnOccasions] = useState([]);
  const [inviteOccasions, setInviteOccasions] = useState([]);

  const occasionHooks = {
    pubOccasions, setPubOccasions,
    ownOccasions, setOwnOccasions,
    inviteOccasions, setInviteOccasions
  }

  const [user, setUser] = useState(null);

  useEffect(() => {
    if(user){            
      occasionService
        .getOwned(user)
        .then(occs => setOwnOccasions(occs));
    }
  }, [user]);

  useEffect(() => {
    if(user){
      occasionService
        .getInvited(user)
        .then(occs => setInviteOccasions(occs));
    }
  }, [user]);

  useEffect(() => {
    occasionService
      .getPublic()
      .then(occs => setPubOccasions(occs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  },[])

  return (
    <div>
      <LoginForm setUser={setUser}/>
      <OccasionForm />
      <OccasionsList 
        occasionHooks={occasionHooks}
        user={user}/>
    </div>
  );
}

export default App;

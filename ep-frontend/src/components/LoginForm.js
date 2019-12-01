import React, {useState} from 'react';
import loginService from '../services/login';

const LoginForm = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async (event) => {
    event.preventDefault();

    try{
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));

      props.setUser(user);
      setPassword('');
      setUsername('');
    } catch(exception) {

    }
  }
  
  return(
    <div>
      <form onSubmit={loginHandler}>
        <div>
          Username: 
          <input 
            type="text"
            value={username}
            name="Username"
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          Password: 
          <input 
            type="text"
            value={password}
            name="Password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm;
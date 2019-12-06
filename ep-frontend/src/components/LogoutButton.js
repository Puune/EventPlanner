import React from 'react';

const LogoutButton = () => {

  const logout = () => {
    window.localStorage.removeItem('loggedUser');
    window.location.reload(false);
  }

  return(
    <div>
      <button onClick={logout}>Sign Out</button>
    </div>
  )
}

export default LogoutButton;
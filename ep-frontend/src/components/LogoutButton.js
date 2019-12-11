/**
 * This contains logout component
 * @module LogoutButton
 */

import React from 'react';

/**
 * This component returns a button and handler, that logs current user out of the app.
 * @class
 */
const LogoutButton = () => {

  /**
   * This function handles logout event
   * @function logout
   */
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
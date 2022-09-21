import React from "react"
// import { Link } from 'react-router-dom';
import GoogleAuth from '../components/GoogleAuth';

const Header = ({ user, setUser }) => {
  // console.log(updateUserState)
  
  return(
    <header className="header">
      <h3>RecipEZY</h3>
      {/* <GoogleAuthContainer 
        user={user}
        setUser={setUser}
        /> */}
      <GoogleAuth 
        user={user}
        setUser={setUser}
        />
      {/* <Link to={'/login'}>
        <button 
          type="button"
          className="login-button">
          Login
        </button>
      </Link> */}
      {/* <button className="signup-button">Sign-up</button> */}
    </header>
  )
}


export default Header
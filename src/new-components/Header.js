import React from "react"
// import { Link } from 'react-router-dom';
import GoogleAuth from '../components/GoogleAuth';

const Header = ({ user, setUser }) => {
  // console.log(updateUserState)
  
  return(
    <header className="header">
      <h3>RecipEZY</h3>
      <GoogleAuth 
        user={user}
        setUser={setUser}
        />
    </header>
  )
}


export default Header
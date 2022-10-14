import React from "react"
// import { Link } from 'react-router-dom';
import GoogleAuth from '../components/GoogleAuth';

const Header = ({ user, setUser }) => {
  // console.log(updateUserState)
  
  return(
    <header className="header">
       <GoogleAuth 
        user={user}
        setUser={setUser}
        />
        <h3>RecipEZY</h3>
    </header>
  )
}


export default Header
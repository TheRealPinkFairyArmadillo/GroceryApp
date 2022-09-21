import React from "react"
import { Link } from 'react-router-dom';


const Header = (props) => {

  // const loginPage = () => {
  //   fetch('/login')
  // }

  if (props.user) { 
    return (
      <header className="header">
        <h3>RecipEZY</h3>
        <h5> Hello, {props.user}</h5>
      </header>
    )
  }
  else {
    return(
      <header className="header">
        <h3>RecipEZY</h3>
        <Link to={'/login'}>
          <button 
            type="button"
            className="login-button">
            Login
          </button>
        </Link>
        {/* <button className="signup-button">Sign-up</button> */}
      </header>
    )
  }
}


export default Header
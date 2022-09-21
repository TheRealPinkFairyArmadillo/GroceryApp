import React, { Component, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

function GoogleAuth({ user, setUser }) {

  // const Navigate = useNavigate();
  const clientId =
    '1066770667864-dpu4hu5cv4qgafoji2h8t331qtpo7461.apps.googleusercontent.com';

  const onSuccess = (res) => {
    setUser(true);
    console.log(res);
    //send res.Ca to server 
    // fetch('/user/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     userId: res.Ca,
    //   }),
    // })
    //   .then((res) => {
    //     res.json()
    //     const shouldRedirect = true;
    //     if (shouldRedirect) Navigate('/tasks');
    //   })
  };

  const onFailure = (err) => {
    console.log('failed:', err);
  };

  const onSuccessLogout = (res) => {
    setUser(false);
  }

  const onFailureLogout = (err) => {
    console.log('failed:', err);
  }

  if(user === false){
    return (
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        // isSignedIn={true}
        prompt="consent"
        approvalPrompt="force"
        scope="profile"
      />
    );
  }
  if(user === true){
    return (
      <GoogleLogout
        clientId={clientId}
        buttonText="Sign out with Google"
        onLogoutSuccess={onSuccessLogout}
      />
    );
  }
}

export default GoogleAuth;

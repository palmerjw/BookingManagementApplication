import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import axios from "axios";
import Login from './login.component';
require('dotenv').config()


const GoogleSocialAuth = ({ loginUser, props }) =>{

    const googleResponse = (response) => {
        
        
        if (response.profileObj != undefined) {
            console.log(response.profileObj)
            const google_id = response.profileObj.googleId;
            const firstName = response.profileObj.givenName;
            const lastName = response.profileObj.familyName;
            const email = response.profileObj.email;
            loginUser(google_id, firstName, lastName, email, props);
        }
    };
    return (
        <div>

            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_AUTH}
                buttonText="Sign-in"
                onSuccess={googleResponse}
                onFailure={googleResponse}
            />
        </div>
    );
    
}

export default GoogleSocialAuth;
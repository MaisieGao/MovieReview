import React from "react";
import {GoogleLogout} from 'react-google-login';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Logout({setUser}) {
    let navigate = useNavigate();
    const onSuccess = () => {
        console.log("Clicked")
        googleLogout();  // helper for logging out
        setUser(null);
        localStorage.setItem("login", null);  // clearing local storage
        navigate('/movies')
        console.log('Logout made successfully');
      };
    

    return (
        <div>
            <GoogleLogout
            disabledStyle={false}
            disabled ={false}
            auto_select={true}
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={onSuccess}
            onFailure={onSuccess}
            >
            </GoogleLogout>
        </div>
    );
} export default Logout;


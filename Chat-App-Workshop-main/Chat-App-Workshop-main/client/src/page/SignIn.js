import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase';
import { updateProfile } from "firebase/auth";


import "../App.css"

const SignIn = () => {

    // Hold the useNavigate hook
    const navigate = useNavigate();

    // Hold the state for the email
    const [email, setEmail] = useState('')

    // Hold the state for the password
    const [password, setPassword] = useState('');

    // Hold the state for the error message
    const [errorMsg, setErrorMsg] = useState('');

    /*
    * @brief On form submission use Firebases' Authentication service
    * to authenticate a user using email and password
    * @param e react event the event that submits the form
    * @return promise void
    * */
    const onSubmit = async (e) => {
        
        // Prevent the form submission from reloading the page
        e.preventDefault();

        // Check if there is an email & password
        if( email && password )
        {

            // Call the authentication service to authenticate the user using
            // email & password
            signInWithEmailAndPassword(auth, email, password)
            
            // Catch the promise success
            .then(async(userCredential) => {
                
                // Hold the user 
                const user = userCredential.user;
                
                // Check if there is no display name
                if( user.displayName === null )
                {

                    // Try to update the profile of the user
                    try 
                    {

                        // Hold the display name
                        const tempDisplayName = user.email.slice(0, user.email.indexOf('@'))
 
                        // Update the profile with the display name
                        await updateProfile(user, {
                          displayName: tempDisplayName,
                        });
 
                        // Log out the new display name
                        console.log("Display name updated to ", tempDisplayName);
                    } 
                    
                    // Catch the error from the promise
                    catch (error) 
                    {
                        
                        //  Log out the error
                        console.error("Error updating profile:", error);
                    }
                }

                // Navigate to the root route
                navigate("/")
            })

            // Catch the error from the promise
            .catch((error) => 
            {

                // Hold the error code
                const errorCode = error.code;

                // Hold the error message
                const errorMessage = error.message;
                
                // Check if the error is from invalid credentials
                if( errorMessage.includes("invalid-credential"))
                {

                    // Set the error message
                    setErrorMsg("Email or password incorrect")
                }
                
                // Log the error code
                console.log(errorCode, errorMessage)
            });
        }

        // Else there is no email or/and password
        else
        {

            // Set the appropriate error message
            setErrorMsg("Please enter both email and password.")
        }
      }

    return(
          
        // Hold a container for the form
        <div 
        className="FormContainer"
        >
        
            {/* Hold the form for signing in */}
            <form
            >
                
                {/* Hold the header for the page */}
                <h3 
                className="TextCenter"
                >
                    Login
                </h3>
                
                {/* Hold a line break */}
                <br
                />
                
                {/* Hold the label for the email */}
                <label
                htmlFor="email"
                >
                    Email: 
                </label>

                {/* Hold a line break */}
                <br
                />
                
                {/* Hold the input for the email */}
                <input 
                type="email" 
                id="email" 
                name="email" 
                onChange={(e) => setEmail(e.target.value)} 
                required
                />

                {/* Hold a line break */}
                <br 
                />

                {/* Hold a line break */}
                <br 
                /> 

                {/* Hold a label for the password */}
                <label 
                htmlFor="pwd"
                >
                    Password: 
                </label>
                
                {/* Hold a line break */}
                <br
                />

                {/* Hold an input for the password */}
                <input 
                type="password"
                id="pwd" 
                name="pwd" 
                onChange={(e) => setPassword(e.target.value)} 
                requried
                />

                {/* Hold a line break */}
                <br 
                />

                {/* Hold a line break */}
                <br 
                /> 

                {/* Hold the paragraph for the error message */}
                <p 
                className="ErrorMsg"
                >
                    {errorMsg}
                </p>

                {/* Hold the submit button */}
                <button 
                onClick={onSubmit} 
                className="SubmitBtn"
                >
                    Submit
                </button>

                {/* Hold a line break */}
                <br
                />

                {/* Hold the paragraph to the sign up link */}
                <p
                >
                    Don't have an account?{' '}
                    
                    {/* Hold the navlink to the sign up route */}
                    <NavLink 
                    to="/signup"
                    >
                        Register
                    </NavLink>
                </p>
            </form>
        </div>
    )
}

export default SignIn;
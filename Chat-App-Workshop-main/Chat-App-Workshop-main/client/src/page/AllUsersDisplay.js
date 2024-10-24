import React, { useState, useEffect } from 'react';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar.js'
import axios from 'axios'

import { ClipLoader } from 'react-spinners';
import "../App.css"

import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";



const AllUsersDisplay = () => {

    // Hold the state for the users
    const [users,setUsers] = useState([]);

    // Hold the state for the loading flag
    const [loading, setLoading] = useState(true);

    // Hold the useNavigate hook
    const navigate = useNavigate();

    // On component mount bind a callback function to Firebase Authentication
    // Service's auth singleton object
    useEffect(() => {

        // Bind a callback function to the auth singleton object
        onAuthStateChanged(auth, (user) => 
        {

            // Check if there is a user
            if (user) 
            {
                
                // Hold the user id
                const uid = user.uid;

                // Log the user
                console.log("user: ", user)

                // Log the user id
                console.log("uid: ", uid)
                
                // Hold the saved users 
                const savedUsers = localStorage.getItem("available users")
                
                // Log the saved users
                console.log("savedUsers: ", savedUsers)
                
                // Check if there are no saved users
                if( savedUsers === null )
                {
                    
                    // Use axios to make a get request
                    axios.get('http://localhost:3001/allUsers', {'Access-Control-Allow-Origin':'*'})
                    
                    // Catch the promise success
                    .then(

                        // Catch the response
                        (res) => {

                            // Hold the users
                            let userListArr = []
                            
                            // Map the data 
                            res.data.users.map((u) => 

                                // Check if the display name is not the 
                                // current user
                                u !== user.displayName ? 
                                    
                                    // Push that user to the list 
                                    userListArr.push(u) : null
                            )

                            // Set the state for loading flag
                            setLoading(false)

                            // Set the state for the users
                            setUsers(userListArr)

                            // Set an item for the users l
                            localStorage.setItem("available users", userListArr)
                        }
                    )

                    // Catch the error
                    .catch(

                        // Catch the error
                        (err) => 
                        {

                            // Log the error
                            console.log("errrrr: ", err)
                        }
                    )
                }
                
                // Else there is users
                else
                {

                    // Set the state for the loading flag
                    setLoading(false)

                    // Set state for the users
                    setUsers(savedUsers.split(","))
                }
            } 
            
            // Else there is no user
            else 
            {

                // Navigate the user to the login route
                navigate('/login')
            }
          });
    },[])



    return(
        
        // Hold a div for the page
        <div
        >

            {/* Render the Navbar component */}
            <Navbar />
                <div className="UserBox">
                    <h1 className="TextCenter">Chat with a User!</h1>
                    <div className="CenterContainer">
                    {loading ? (
                            <ClipLoader size={50} color="#123abc"/>
                    ) : (
                        users === undefined ? <div>Loading users...</div> : users.map((u,idx) => 
                            
                                <React.Fragment key={idx}>
                                <Link to={{
                                    pathname: '/chat',
                                    search: createSearchParams({msg: u}).toString()
                                }} className="UserLink">{u}</Link>
                                
                                </React.Fragment>
                            
                        )
                    )}
                    </div>
                </div>

        </div>
    )
}


export default AllUsersDisplay;
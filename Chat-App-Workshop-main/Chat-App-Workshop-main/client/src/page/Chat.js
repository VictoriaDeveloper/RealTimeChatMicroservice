import Navbar from '../components/Navbar'
import ChatBox from '../components/ChatBox'
import { useNavigate, useSearchParams } from 'react-router-dom';
import ChatBar from '../components/ChatBar'

import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import {useEffect} from "react"


const Chat = () => {

    // Hold the useNavigate hook
    const navigate = useNavigate();

    // Hold the useEffect hook
    useEffect(()=>
        {

            // Set a callback function when there is change to auth singleton
            onAuthStateChanged(auth, (user) => 
            {

                // Check if there is no user
                if (!user) 
                {

                    // Navigate the user to the login route
                    navigate('/login')
                }
        });
    },[])

    // Hold params from the useSearchParams hook
    const [searchParams] = useSearchParams();

    // Hold the recipient 
    const toUser = searchParams.get("msg");

    // const { toUser } = location.state || {};
    console.log("toUser in chat: ", toUser)

    return(
        
        // Hold a container for the page
        <div>

            {/* Render a CharBar component */}
            <ChatBar 
            targetUser={toUser}
            />
            
            {/* Render a ChatBox component */}
            <ChatBox 
            targetUser={toUser} 
            />
        </div>
    )

}

export default Chat;
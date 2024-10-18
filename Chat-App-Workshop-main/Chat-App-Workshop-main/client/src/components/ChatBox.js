import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  where
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";

import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

import { ClipLoader } from 'react-spinners';


const ChatBox = ({targetUser}) => {

    const [messages,setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const scroll = useRef();
    const navigate = useNavigate()

    const [user] = useAuthState(auth);

    useEffect(()=> {

      if( user !== null ){
        setLoading(true);
        const current_user_name = user.displayName
        
        const q = query(
          collection(db, "messages"), // Correct collection name
          where("from", "in", [current_user_name, targetUser]), // Filter: either current user or target user as the sender
          where("to", "in", [current_user_name, targetUser]),   // Filter: either current user or target user as the receiver
          orderBy("createdAt", "asc"), // Ordering by timestamp (createdAt or timestamp field)
          limit(50) // Limiting the result to 50 messages
        );

        // onSnapshot is the function that enables real-time chat functionality!
        // It listens to real-time updates to the results from our Firestore query (q in this case)
        // QuerySnapshot contains the current state of all the documents in the result set of the query
        const unsubscribe = onSnapshot(q,(QuerySnapshot) => {
          const fetchedMsgs = []
          QuerySnapshot.forEach((doc) => fetchedMsgs.push({...doc.data(), id: doc.id}))
          setMessages(fetchedMsgs)
          setLoading(false);
          // console.log("fetchedMsgs: ", fetchedMsgs)
        })
        
        return () => unsubscribe;
        
      }      

    },[user])

    useEffect(() => {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    return (
        <>
          {loading ? (
            <div className="LoadingContainer">
              <ClipLoader size={50} color="#123abc"/>
            </div>
          ) : (
          <div className="MessagesWrapper">
            {messages?.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>)}
          <span ref={scroll}></span>
          <SendMessage scroll={scroll} to={targetUser} />
        </>
      );
}

export default ChatBox;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";




// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAtNkLq8cNgK8tSJZKATQYplTvZXune3Bs",
    authDomain: "realtimechatservice.firebaseapp.com",
    projectId: "realtimechatservice",
    storageBucket: "realtimechatservice.appspot.com",
    messagingSenderId: "537360555716",
    appId: "1:537360555716:web:2b9e6687b71a95cce43391",
    measurementId: "G-SYVT01EPFT"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

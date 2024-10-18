
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const cors = require('cors')


const admin = require("firebase-admin");
const serviceAccount = require('./crediential.json');
const {getApps} = require("firebase-admin/app")

app.use(cors({
    origin: process.env.NODE_ENV === "production" ? false : "http://localhost:3000",
    credentials: true,
}))

app.get('/allUsers', (req,res) => {

    let fb_app = null
    if (getApps().length === 0) {
        fb_app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount) 
        });

    }else{
        fb_app = getApps()[0]
    }


    fb_app && fb_app.auth().listUsers(1000) // lists up to 1000 users
        .then((listUsersResult) => {

            const userList = []

            listUsersResult.users.forEach((user) => {
                userList.push(user.displayName)
            } )

            res.status(200).json({users: userList})

        })
        .catch(function (error) {
            console.log('Oh no! Firebase listUsers Error:', error);
            res.status(400).json({message: 'error'})
        });
    
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
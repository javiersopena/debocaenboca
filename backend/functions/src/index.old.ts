//import libraries
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
const jwt = require('jsonwebtoken');

const axios = require('axios');

const config = require('../src/config/config-env') // get our config file

const cors = require('cors');

//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

//initialize express server
const app = express();
const main = express();

//add the path to receive request and set json as bodyParser to process the body
app.use(cors())
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

//initialize the database and the collection
const db = admin.firestore();
const usersCollection = 'users';
const messagesCollection = 'messages';

//define google cloud function name
export const webApi = functions.https.onRequest(main);

interface User {
  firstName: String,
  lastName: String,
  email: String
}
// replace by google-auth-library
app.get('/g_auth/:token', (req, res) => {
  axios.get('https://oauth2.googleapis.com/tokeninfo?id_token=' + req.params.token)
  .then((response: { data: any; }) => {
    const payload = { email: response.data.email }
    const token = jwt.sign(payload, config.secret, {
      expiresIn: "12h"
    })
    response.data.nodetoken = token
    res.status(200).json(response.data);
  })
  .catch((error: any) => {
    console.log(error);
  });
})
// test check jwt

app.get('/checktoken/:token', (req, res) => {
  const token = req.params.token
  // verifies secret and checks exp
  try {
    const decoded = jwt.verify(token, config.secret);
    res.status(200).json(decoded);
  } catch(err) {
    res.status(400).send(`Invalid token`)
  }
})
// Create new user
app.post('/users', async (req, res) => {
  try {
    const user: User = {
      firstName: req.body['firstName'],
      lastName: req.body['lastName'],
      email: req.body['email']
    }

    const newDoc = await db.collection(usersCollection).add(user);
    res.status(201).send(`Created a new user: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send(`User should cointain firstName, lastName, email`)
  }
});

exports.getSubCollections = functions.https.onCall(async (data, context) => {

  const docPath = data.docPath;

  const collections = await admin.firestore().doc(docPath).listCollections();
  const collectionIds = collections.map(col => col.id);

  return { collections: collectionIds };

});

//get messages
app.get('/messages/:userId', async (req, res) => {
  const userId = req.params.userId;
  // db.collection(usersCollection + '/' + userId + '/' + messagesCollection).doc().get()
  try {
    const userQuerySnapshot = await db.collection(usersCollection).doc(userId).collection(messagesCollection).get();
    const messages: any[] = [];
    userQuerySnapshot.forEach(
      (doc)=>{
        messages.push({
          id: doc.id,
          data:doc.data()
        });
      }
    );
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).send(error);
  }
});

//get all users
app.get('/users', async (req, res) => {
  try {
    const userQuerySnapshot = await db.collection(usersCollection).get();
    const users: any[] = [];
    userQuerySnapshot.forEach(
      (doc)=>{
        users.push({
          id: doc.id,
          data:doc.data()
        });
      }
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//get a single contact
app.get('/users/:userId', (req,res) => {
  const userId = req.params.userId;
  db.collection(usersCollection).doc(userId).get()
  .then(user => {
    if(!user.exists) throw new Error('User not found');
    res.status(200).json({id:user.id, data:user.data()})})
  .catch(error => res.status(500).send(error));
});


// Delete a user
app.delete('/users/:userId', (req, res) => {
  db.collection(usersCollection).doc(req.params.userId).delete()
  .then(()=>res.status(204).send("Document successfully deleted!"))
  .catch(function (error) {
    res.status(500).send(error);
  });
})

// Update user
app.put('/users/:userId', async (req, res) => {
  await db.collection(usersCollection).doc(req.params.userId).set(req.body,{merge:true})
  .then(()=> res.json({id:req.params.userId}))
  .catch((error)=> res.status(500).send(error))
});
//import libraries
import * as functions from 'firebase-functions';
import * as express from 'express';
import * as admin from 'firebase-admin';
//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);
const APP = express();
const LOADER = require('./loaders/express');
//initialize express server

export const webApi = functions.https.onRequest(APP);
require('./routes/routes')(APP, LOADER);

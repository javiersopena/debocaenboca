const SERVICES = require('../services/services')
const jwt = require('jsonwebtoken')
import { Request, Response, NextFunction } from 'express'
const CONFIG = require('../../src/config/config-env') // get our config file
const axios = require('axios');

exports.getUsers = async function (req: Request, res: Response, next: NextFunction) {
  try {
    console.log('controllers->getUsers')
    const users = await SERVICES.getUsers()
    return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
  } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
  }
}
exports.getUserByEmail = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const user = await SERVICES.getUserByEmail(req.params.email)
    return res.status(200).json({ status: 200, data: user, message: "Succesfully User Retrieved" });
  } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
  }
}
exports.checkToken = function (req: Request, res: Response, next: NextFunction) {
  const token = req.params.token
  const email = req.params.email
  // verifies secret and checks exp
  try {
    const decoded = jwt.verify(token, CONFIG.secret);
    if (decoded.email == email)
      next()
    else
      res.status(403).send(`Permission denied`)
  } catch(err) {
    res.status(401).send(`Unauthorized`)
  }
}
exports.getGoogleToken = function (req: Request, res: Response, next: NextFunction) {
  axios.get(CONFIG.googleToken + req.params.token)
  .then((response: { data: any; }) => {
    const payload = { email: response.data.email }
    const token = jwt.sign(payload, CONFIG.secret, {
      expiresIn: "12h"
    })
    response.data.nodetoken = token
    res.status(200).json(response.data);
  })
  .catch((error: any) => {
    console.log(error);
  });
}
exports.postUser = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const newDoc = await SERVICES.postUser(req.body.data)
    return res.status(201).send(`Created new user: ${newDoc.id}`);
  } catch (err) {
    return res.status(400).send(`User should cointain firstName, lastName, email`)
  }
}
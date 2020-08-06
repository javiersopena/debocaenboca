const CONTROLLERS = require ('../controllers/controllers')
import { Request, Response, Application } from 'express'
module.exports = function(APP: Application, LOADER: { setCors: (arg0: Application) => void; }) {
  LOADER.setCors(APP);
  APP.get('/users', function (req: Request, res: Response) {
    console.log('routes->users')
    CONTROLLERS.getUsers(req, res)
  });
  APP.get('/user/:email/:token', CONTROLLERS.checkToken, function (req: Request, res: Response) {
    CONTROLLERS.getUserByEmail(req, res)
  });
  APP.get('/g_auth/:token', function (req: Request, res: Response) {
    CONTROLLERS.getGoogleToken(req, res)
  });
  APP.post('/user/:email/:token', CONTROLLERS.checkToken, function (req: Request, res: Response) {
    CONTROLLERS.postUser(req, res)
  });
}

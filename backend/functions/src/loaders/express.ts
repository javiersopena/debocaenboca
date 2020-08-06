
import * as bodyParser from 'body-parser';
const cors = require('cors');
export function setCors(APP: any) {
  //add the path to receive request and set json as bodyParser to process the body
  APP.use(cors())
  APP.use(bodyParser.json());
  APP.use(bodyParser.urlencoded({ extended: false }));
  console.log('cors set')
}

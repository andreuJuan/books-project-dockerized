import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { AppDataSource } from './data-source';
import routes from './routes/route_index';

AppDataSource.initialize()
  .then(async () => {
    // Create express app instance
    const app = express();

    // Call midlewares
    app.use(helmet.default());
    app.use(cors());
    app.use(bodyParser.json());

    // Set all routes from routes folder
    app.use('/', routes);

    // start express server
    app.listen(4000);
  })
  .catch((error) => console.log(error));

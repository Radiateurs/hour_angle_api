//External node module imports
// Third-party
import express from 'express';
import body_parser from 'body-parser';

import angleRouter from './routers/angle.router';
import Options from './core/options';
import ErrorMsg from './utilities/errorMsg';

/**
 * Class HourAngleApp
 * @desc The server app used for the API. Used in an express app for good practices.
 */
class HourAngleApp {
    constructor(config) {
        this.config = new Options(config);
        this.app = express();

        // Remove unwanted express headers
        this.app.set('x-powered-by', false);

        // Allow CORS requests when enabled
        if (this.config.enableCors === true) {
            this.app.use((__unused__req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                next();
            });
        }
    }

    /**
     * @fn start
     * @desc Starts the server app and binds routers and controllers
     * @return an express.js object.
     */
    start() {
        this.app.use(body_parser.json());
        this.app.use('/angle', angleRouter);
        this.app.all('/*', (__unused__req, res) => {
            res.status(400);
            res.json(ErrorMsg('Bad request'));
        });
        // Return the Express application
        return this.app;
    }
}

export default HourAngleApp;
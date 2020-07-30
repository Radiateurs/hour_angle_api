import express from 'express';
import http from 'http';
import os from 'os';


import config from './config/hour_angle_api.config';

import HourAngleApp from './hourAngleApp';
import ErrorMsg from './utilities/errorMsg';

let web_app;
let web_server;
let angleApp = new HourAngleApp(config);

// Create express app as main gate.
const setup = () => {
    web_app = express();
    // Remove unwanted express headers
    web_app.set('x-powered-by', false);
    return web_app;
};

// Start server
let router = angleApp.start();

// Wrap the server (aka router) in express app, powered with an http server.
web_app = setup();
web_app.use('/', router);
web_server = http.createServer(web_app);
web_server.listen(config.port, (error) => {
    if (error) {
        console.error(JSON.stringify(ErrorMsg('An error occurred while starting the HTTP server.', error))); // eslint-disable-line no-console
        return;
    }
    console.log(`Listening at http://${os.hostname()}:${config.port}/`); // eslint-disable-line no-console
});

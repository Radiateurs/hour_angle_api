/**
 * Angle router.
 * @desc Redirect from /angle to proper methods
 */

// Third-party
import express from 'express';

import angleController from '../controllers/angle.controller';

let angle = express();

angle.route('/')
    .get(angleController.get)
    .post(angleController.post);

export default angle;
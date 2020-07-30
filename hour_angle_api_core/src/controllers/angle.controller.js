import ErrorMsg from '../utilities/errorMsg';

class AngleController {

    /**
     * Compute function that avoid code duplication (same action on get and post)
     * @param h the hours. Must be between 0 and 23.
     * @param m the minutes. Must be between 0 and 59.
     * @return {bool} success or failure.
     */
    static compute(h, m, res) {
        try {
            let angle = AngleController.calculate(h, m);
            res.status(200);
            res.json({ result: angle });
            return true;
        } catch (err) {
            res.status(400);
            res.json(ErrorMsg('Caught an error calculating the angle.', err));
            return false;
        }
    }

    /**
     * Calculate the angle between the hours hand and minutes hand on an analog clock.
     * @param h the hours. Must be between 0 and 23.
     * @param m the minutes. Must be between 0 and 59.
     * @return the angle.
     * @throw if the number aren't in the acceptable range (0 <= h <= 23 | 0 <= m <= 59)
     */
    static calculate(h, m) {
        if ((typeof h !== 'number' || typeof m !== 'number') || (h > 23 || h < 0 || m > 59 || m < 0)) {
            throw(new ErrorMsg('Wrong values in the query request. \'h\' must be a number between 0 and 23. \'m\' must be a number between 0 and 59.'));
        }

        // Checking if using military time
        h = h > 12 ? h - 12 : h;

        // Calculating hour hand angle.
        // First part calculate which auqdrant the hour hand is on.
        // The second part of the equation calculate the angle between the quadrant (i.e. 1/4 is the minutes are 15)
        let hAngle = ((h / 12) * 360) + (m / 60 * (360 / 12));
        // Calculating minutes hand angle.
        let mAngle = (m / 60) * 360;
        // ABS to find the smallest angle.
        let finalAngle = Math.abs(hAngle - mAngle);
        return finalAngle;
    }

    /**
     * Answers the get method request.
     * @param query Object from express request object containing the parameters of the query.
     * @param res   Response object from express.
     */
    static get({ query }, res) {
        // eslint-disable-next-line no-prototype-builtins
        if (query && query.hasOwnProperty('h') && query.hasOwnProperty('m')) {
            query.h = parseInt(query.h);
            query.m = parseInt(query.m);

            return AngleController.compute(query.h, query.m, res);
        } else {
            res.status(400);
            res.json(ErrorMsg('Missing parameters \'h\' or \'m\' in the query.'));
            return false;
        }
    }

    /**
     * Answers the post method request.
     * @param body Object from express request object containing the parameters of the query.
     * @param res   Response object from express.
     */
    static post({ body }, res) {
        // eslint-disable-next-line no-prototype-builtins
        if (body.hasOwnProperty('h') && body.hasOwnProperty('m')) {
            return AngleController.compute(body.h, body.m, res);
        } else {
            res.status(400);
            res.json(ErrorMsg('Missing parameters \'h\' or \'m\' in the query.'));
            return false;
        }
    }
}

export default AngleController;
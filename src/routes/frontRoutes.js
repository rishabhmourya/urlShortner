const express = require('express');
const frontController = require('../controllers/frontController');


const frontRouter = express.Router();
function router() {
    const { generate, minified } = frontController();

    frontRouter.route('/')
        .get((req, res) => {
            return res.render('index');
        });

    frontRouter.route('/generate')
        .post(generate);

    frontRouter.route('/:minified')
        .get(minified);

    return frontRouter;
}
module.exports = router;


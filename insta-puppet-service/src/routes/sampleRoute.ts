import controller from '../controllers/sampleController';
import express = require('express');

const router = express.Router();
router
    .route('/route')
    .get((req, res, next) => {
        controller.sampleHealthCheck(req, res, next);
    })
    .post((req, res, next) => {
        controller.sampleHealthCheck(req, res, next);
    })
    .put((req, res, next) => {
        controller.sampleHealthCheck(req, res, next);
    });

module.exports = router;

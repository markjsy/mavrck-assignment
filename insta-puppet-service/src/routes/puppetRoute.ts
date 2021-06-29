import controller from '../controllers/puppetController';
import express = require('express');

const router = express.Router();
router.route('/user/').get((req, res, next) => {
    console.log(req.params);
    // Will make a call to rabbitMQ

    // rabbitMQ will delegate the puppeteer job

    // puppeteer will make a call to graphQL to add/update user and their posts

    controller.addUserRabbitMQ(req, res, next);
});

module.exports = router;

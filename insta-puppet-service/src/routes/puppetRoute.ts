import controller from '../controllers/puppetController';
import express = require('express');

const router = express.Router();
router.route('/user').post((req, res, next) => {
    controller.addUserRabbitMQ(req, res, next);
});


router.route('/userUpdate').post((req, res, next) => {
    controller.updateUserRabbitMQ(req, res, next);
});


module.exports = router;

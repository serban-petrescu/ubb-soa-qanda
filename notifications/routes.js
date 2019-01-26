const express = require('express');
const router = express.Router();
const { body, header, validationResult } = require('express-validator/check');

const controllers = require('./controllers');
const PreferencesController = controllers.PreferencesController;

function ValidationError(errors) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = 'Invalid input';
    this.errors = errors || [];
};

function handleError(error, res) {
    if (error instanceof ValidationError) {
        res.status(400).json({ message: error.message, type: 'BadRequest', errors: error.errors });
    } else if (error instanceof controllers.CastError) {
        res.status(400).json({ message: error.message, type: 'BadRequest' });
    } else {
        res.status(500).json({ message: error.message, type: error.name });
    }
}

function validate(req) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return Promise.resolve();
    } else {
        return Promise.reject(new ValidationError(errors.array()));
    }
}

router.put('/preferences', [
    header('x-user-id').isString().isLength({ min: 1 }),
    body('emailAddress').isEmail(),
    body('push.*').isBoolean(),
    body('email.*').isBoolean()
], function (req, res) {
    const userId = req.header('x-user-id');
    validate(req)
        .then(() => PreferencesController.upsert(userId, req.body.emailAddress, req.body.push, req.body.email))
        .then(results => res.json(results))
        .catch(error => handleError(error, res));
});

router.get('/preferences', [
    header('x-user-id').isString().isLength({ min: 1 })
], function (req, res) {
    const userId = req.header('x-user-id');
    validate(req)
        .then(() => PreferencesController.read(userId))
        .then(results => res.json(results))
        .catch(error => handleError(error, res));
});

router.put('/preferences/push-subscription', [
    header('x-user-id').isString().isLength({ min: 1 })
], function (req, res) {
    const userId = req.header('x-user-id');
    validate(req)
        .then(() => PreferencesController.updateSubscription(userId, req.body))
        .then(results => res.json(results))
        .catch(error => handleError(error, res));
});

router.delete('/preferences/push-subscription', [
    header('x-user-id').isString().isLength({ min: 1 })
], function (req, res) {
    const userId = req.header('x-user-id');
    validate(req)
        .then(() => PreferencesController.updateSubscription(userId))
        .then(results => res.json(results))
        .catch(error => handleError(error, res));
});

module.exports = router;

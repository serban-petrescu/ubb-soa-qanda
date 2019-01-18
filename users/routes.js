const express = require('express');
const router = express.Router();
const { body, header, validationResult } = require('express-validator/check');

const controllers = require('./controllers');
const UserController = controllers.UserController;
const OAuthController = controllers.OAuthController;

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
    } else if (error instanceof controllers.NotFoundError) {
        res.status(404).json({ message: error.message, type: 'NotFound' });
    } else if (error instanceof controllers.UnauthorizedError) {
        res.status(401).json({ message: error.message, type: 'Unauthorized' });
    } else if (error instanceof controllers.OAuthError) {
        res.status(error.status || 400).json({ message: error.message, type: 'Unauthorized', error: error.code });
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

router.post('/users', [
    body('username').isEmail(),
    body('password').isString().isLength({ min: 2, max: 18 })
], function (req, res) {
    validate(req)
        .then(() => UserController.register(req.body.username, req.body.password))
        .then(() => res.sendStatus(204))
        .catch(error => handleError(error, res));
});

router.post('/users/activate', [
    body('token').isString()
], function (req, res) {
    validate(req)
        .then(() => UserController.activate(req.body.token))
        .then(() => res.sendStatus(204))
        .catch(error => handleError(error, res));
});

router.post('/oauth/token', [
    body('username').isEmail(),
    body('password').isString().isLength({ min: 2, max: 18 }),
    body('grant_type').isString(),
    header('authorization').isString()
], function (req, res) {
    validate(req)
        .then(() => OAuthController.authorize(req.body.grant_type, req.header('authorization')))
        .then(client => OAuthController.authenticate(req.body.username, req.body.password)
            .then(user => OAuthController.sign(client, user)))
        .then(token => res.json(token))
        .catch(error => handleError(error, res));
});

module.exports = router;

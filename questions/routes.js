const express = require('express');
const router = express.Router();
const { body, param, query, header, validationResult } = require('express-validator/check');

const controllers = require('./controllers');
const QuestionController = controllers.QuestionController;
const AnswerController = controllers.AnswerController;
const VoteController = controllers.VoteController;

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

router.get('/questions', [
    query('skip').isInt().toInt(10),
    query('limit').isInt().toInt(10)
], function (req, res) {
    validate(req)
        .then(() => QuestionController.readPage(req.query.skip, req.query.limit))
        .then(results => res.json(results))
        .catch(error => handleError(error, res));
});

router.get('/questions/:id', [
    param('id').isMongoId()
], function (req, res) {
    validate(req)
        .then(() => QuestionController.readSingle(req.params.id))
        .then(result => res.json(result))
        .catch(error => handleError(error, res));
});

router.post('/questions', [
    body('text').isString().isLength({ min: 1 }),
    body('title').isString().isLength({ min: 1 }),
    header('x-user-id').isString().isLength({ min: 1 })
], function (req, res) {
    const userId = req.header('x-user-id');
    validate(req)
        .then(() => QuestionController.create(userId, req.body.title, req.body.text))
        .then(result => res.json(result))
        .catch(error => handleError(error, res));
});

router.put('/questions/:id', [
    param('id').isMongoId(),
    body('text').isString().isLength({ min: 1 }),
    header('x-user-id').isString().isLength({ min: 1 })
], function (req, res) {
    const userId = req.header('x-user-id');
    validate(req)
        .then(() => QuestionController.update(userId, req.params.id, req.body.text))
        .then(result => res.json(result))
        .catch(error => handleError(error, res));
});

router.post('/questions/:questionId/answers', [
    param('questionId').isMongoId(),
    body('text').isString().isLength({ min: 1 }),
    header('x-user-id').isString().isLength({ min: 1 })
], function (req, res) {
    const userId = req.header('x-user-id');
    validate(req)
        .then(() => AnswerController.create(userId, req.params.questionId, req.body.text))
        .then(result => res.json(result))
        .catch(error => handleError(error, res));
});

router.put('/questions/:questionId/answers/:answerId', [
    param('questionId').isMongoId(),
    param('answerId').isMongoId(),
    body('text').isString().isLength({ min: 1 }),
    header('x-user-id').isString().isLength({ min: 1 })
], function (req, res) {
    const userId = req.header('x-user-id');
    validate(req)
        .then(() => AnswerController.update(userId, req.params.questionId, req.params.answerId, req.body.text))
        .then(result => res.json(result))
        .catch(error => handleError(error, res));
});

router.post('/questions/:questionId/answers/:answerId/vote', [
    param('questionId').isMongoId(),
    param('answerId').isMongoId(),
    body('positive').isBoolean(),
    header('x-user-id').isString().isLength({ min: 1 })
], function (req, res) {
    const userId = req.header('x-user-id');
    validate(req)
        .then(() => VoteController.vote(userId, req.params.questionId, req.params.answerId, req.body.positive))
        .then(result => res.json(result))
        .catch(error => handleError(error, res));
});

router.delete('/questions/:questionId/answers/:answerId/vote', [
    param('questionId').isMongoId(),
    param('answerId').isMongoId(),
    header('x-user-id').isString().isLength({ min: 1 })
], function (req, res) {
    const userId = req.header('x-user-id');
    validate(req)
        .then(() => VoteController.unvote(userId, req.params.questionId, req.params.answerId))
        .then(result => res.json(result))
        .catch(error => handleError(error, res));
});

module.exports = router;

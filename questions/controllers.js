const QuestionModel = require('./models').QuestionModel;
const { createNotification } = require('./channel');

function NotFoundError() {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = 'Not found';
};

function UnauthorizedError() {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = 'Not authorized';
};

const CastError = require('mongoose').CastError;

const QuestionController = {
    readSingle: function (id) {
        return QuestionModel.findById(id).exec().then(question => {
            if (question) {
                return question;
            } else {
                throw new NotFoundError();
            }
        });
    },
    readPage: function (skip, limit) {
        return QuestionModel.find({}, 'userId title created').skip(skip).limit(limit).exec();
    },
    create: function (userId, title, text) {
        return QuestionModel.create(new QuestionModel({ userId, title, text, answers: [] }));
    },
    update: function (userId, questionId, text) {
        return QuestionController.readSingle(questionId)
            .then(question => {
                if (question.userId === userId) {
                    question.text = text;
                    return question.save().then(question => {
                        createNotification('questionUpdated', { question });
                        return question;
                    });
                } else {
                    throw new UnauthorizedError();
                }
            })
    }
};

const findAnswer = (question, answerId) => question.answers.find(a => a.id === answerId);

const loadQuestionAndAnswer = (questionId, answerId) => {
    return QuestionController.readSingle(questionId)
        .then(question => {
            const answer = findAnswer(question, answerId);
            if (answer) {
                return { answer, question };
            } else {
                throw new NotFoundError();
            }
        });
};

const AnswerController = {
    create: function (userId, questionId, text) {
        return QuestionController.readSingle(questionId)
            .then(question => {
                question.answers.push({ userId, text, votes: [] });
                return question.save()
                    .then(updated => {
                        const answer = updated.answers[updated.answers.length - 1];
                        createNotification('questionAnswered', { question, answer });
                        return answer;
                    });
            });
    },
    update: function (userId, questionId, answerId, text) {
        return loadQuestionAndAnswer(questionId, answerId)
            .then(({ question, answer }) => {
                if (answer.userId !== userId) {
                    throw new UnauthorizedError();
                } else {
                    answer.text = text;
                    return question.save().then(updated => {
                        const answer = findAnswer(updated, answerId);
                        createNotification('answerUpdated', { question, answer });
                        return answer;
                    });
                }
            });
    }
};

const VoteController = {
    vote: function (userId, questionId, answerId, positive) {
        return loadQuestionAndAnswer(questionId, answerId)
            .then(({ question, answer }) => {
                const index = answer.votes.findIndex(v => v.userId === userId);
                if (index >= 0) {
                    answer.votes[index].positive = positive;
                } else {
                    answer.votes.push({ userId, positive });
                }
                return question.save().then(updated => findAnswer(updated, answerId));
            });
    },

    unvote: function (userId, questionId, answerId) {
        return loadQuestionAndAnswer(questionId, answerId)
            .then(({ question, answer }) => {
                const index = answer.votes.findIndex(v => v.userId === userId);
                if (index >= 0) {
                    answer.votes.splice(index, 1);
                }
                return question.save().then(updated => findAnswer(updated, answerId));
            });
    }
};

module.exports = {
    CastError,
    UnauthorizedError,
    NotFoundError,
    QuestionController,
    AnswerController,
    VoteController
};

const uuid = require('uuid/v1');
const bcrypt = require('bcryptjs');
const CastError = require('mongoose').CastError;

const { createEmail } = require('./channel');
const UserModel = require('./models').UserModel;

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

function OAuthError(status, code, message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.code = code;
    this.status = status;
};

const UserController = {
    register: function (userId, rawPassword) {
        const token = uuid();
        return bcrypt.hash(rawPassword, 8)
            .then(password => UserModel.create(new UserModel({ userId, password, token, active: false })))
            .then(user => {
                createEmail(userId, 'registration', { userId, link: process.env.REGISTRATION_BASE_URL + token });
                return user;
            });
    },
    activate: function (token) {
        return UserModel.find({ token }).exec().then(results => {
            if (results && results.length === 1) {
                results[0].active = true;
                results[0].token = '';
                return results[0].save();
            } else {
                throw new NotFoundError();
            }
        });
    },
    readSingle: function (userId, rawPassword) {
        return UserModel.find({ userId }).exec().then(users => {
            if (users && users.length === 1 && users[0].active) {
                return bcrypt.compare(rawPassword, users[0].password).then(result => {
                    if (result) {
                        return users[0];
                    } else {
                        throw new UnauthorizedError();
                    }
                });
            } else {
                throw new NotFoundError();
            }
        });
    }
};

const jwt = require('jsonwebtoken');
const auth = require('basic-auth');

const client = {
    id: process.env.OAUTH_CLIENT,
    secret: process.env.OAUTH_SECRET,
    grants: ['password'],
    accessTokenLifetime: 24 * 3600
}

const OAuthController = {
    authorize(grant, header) {
        if (grant !== 'password') {
            throw new OAuthError(400, 'invalid_grant', 'Only the password grant is supported.');
        } else if (!header) {
            throw new OAuthError(400, 'invalid_client', 'No client credentials provided (via header).');
        } else {
            const credentials = auth.parse(header);
            if (!credentials || credentials.name !== client.id || credentials.pass !== client.secret) {
                throw new OAuthError(401, 'invalid_client', 'No client matches the given credentials.');
            } else {
                return client;
            }
        }
    },

    authenticate(username, password) {
        return UserController.readSingle(username, password).catch(e => {
            console.log('Error while trying to perform password grant: ' + e);
            throw new OAuthError(400, 'invalid_request', e.message);
        });
    },

    sign: function(client, user) {
        const expiresIn = 24 * 3600;
        const now = Math.floor(Date.now() / 1000);
        return new Promise(function(resolve, reject) {
            jwt.sign({
                exp: now + expiresIn,
                nbf: now - 1,
                sub: user.userId,
                aut: client.id,
                iat: now,
                iss: 'Q&A',
                scope: ['user'],
                user_name: user.userId
            }, process.env.JWT_KEY, { jwtid: uuid() }, function(err, token) {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        'access_token': token,
                        'token_type': 'bearer',
                        'expires_in': expiresIn
                    });
                }
            });
        })
    }
};

module.exports = {
    CastError,
    UnauthorizedError,
    NotFoundError,
    OAuthError,
    UserController,
    OAuthController
};

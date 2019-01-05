const mustache = require('mustache');
const fs = require('fs');
const path = require('path');

function NotFoundError() {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = 'Not found';
};

const templates = {};

fs.readdirSync('templates').forEach(filename => {
    const content = fs.readFileSync(path.join('templates', filename), 'utf-8');
    templates[path.basename(filename).split('.')[0]] = content;
    mustache.parse(content);
});

function render(template, data) {
    const content = templates[template];
    if (content) {
        return mustache.render(content, data);
    } else {
        console.log('Unable to render template ' + template + '.');
        throw new NotFoundError();
    }
}

module.exports = {
    NotFoundError,
    render
};

const log4js = require('log4js');

log4js.configure({
    appenders: {
        file: { type: 'file', filename: 'logs/system.log' },
        console: { type: 'console' }
    },
    categories: { default: { appenders: ['file', 'console'], level: 'debug' } }
});

const logger = log4js.getLogger();

function log(message, level = 'info') {
    logger[level](message);
}

module.exports = log;

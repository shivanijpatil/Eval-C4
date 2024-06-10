const fs = require('fs');
const path = require('path');

exports.getLogs = (req, res) => {
    const logFile = path.join(__dirname, '../../logs/system.log');
    fs.readFile(logFile, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading logs');
        } else {
            res.send(data);
        }
    });
};

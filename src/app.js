const express = require('express');
const fs = require('fs');
const path = require('path');
const uploadData = require('./scripts/uploadData');
const app = express();
const port = 4000;


app.use(express.static(path.join(__dirname, 'dashboard')));

app.get('/logs', (req, res) => {
    const level = req.query.level || 'all';
    const logFile = path.join(__dirname, 'logs/app.log');

    fs.readFile(logFile, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading log file');
            return;
        }

        const logs = data.split('\n').filter(log => {
            if (level === 'all') return true;
            return log.includes(`"${level}"`);
        });

        res.json(logs);
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    uploadData();
});

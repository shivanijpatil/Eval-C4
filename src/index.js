const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const log = require('./middleware/logger');
const logRoutes = require('./routes/logRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    log('Client connected', 'info');
    socket.on('disconnect', () => {
        log('Client disconnected', 'info');
    });
});

app.use('/logs', logRoutes);

server.listen(3000, () => {
    log('Server is running on port 3000', 'info');
});

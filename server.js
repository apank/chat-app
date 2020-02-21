const io = require('socket.io')();

const users = {};
const sockmap = {};
const messageque = {};

io.on('connection', (socket) => {
    socket.on('join', (username, room) => {
        socket.join(room);

        if (!users.hasOwnProperty(room)) users[room] = {};

        users[room][socket.id] = {
            username: username,
            id: socket.id,
        };

        sockmap[socket.id] = {
            username: username,
            room: room,
        }

        if (messageque.hasOwnProperty(room)) {
            for (i = 0; i < messageque[room].length; i++) {
                io.to(room).emit('message-que', messageque[room][i].username, messageque[room][i].msg);
            }
        };

        socket.emit('update', `You have connected to the ${room == '' ? 'default' : room} room.`);
        socket.emit('users-list', users[room]);
        socket.to(room).broadcast.emit('add-user', username, socket.id);
        socket.to(room).broadcast.emit('update', `${username} has come online.`);
    });

    socket.on('message', (msg, room) => {
        io.to(room).emit('message', users[room][socket.id].username, msg);
        if (!messageque.hasOwnProperty(room)) messageque[room] = [];

        messageque[room].push({
            username: users[room][socket.id].username,
            msg: msg,
        });

        if (messageque[room].length > 50) messageque[room].shift();
    });

    socket.on('disconnect', () => {
        if (sockmap[socket.id]) {
            const room = sockmap[socket.id].room;
            socket.to(room).broadcast.emit('update', `${sockmap[socket.id].username} has left`);
            io.emit('remove-user', socket.id);
            delete users[room][socket.id];
            delete sockmap[socket.id];
        }
    });
});

const port = 8000;
io.listen(port);
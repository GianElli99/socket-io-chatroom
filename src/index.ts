import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let activeUsers = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/nickname.html');
});

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});

io.on('connection', (socket) => {
  console.log('User Connected');
  console.log(socket.id);
  activeUsers++;
  const newUser = {
    activeUsers,
    user: {
      id: socket.id,
    },
  };
  io.emit('active users', activeUsers);

  socket.on('disconnect', () => {
    console.log('User Disconnected');
    activeUsers--;
    io.emit('active users', activeUsers);
  });

  socket.on('joinear room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('chat message', (msg) => {
    io.to(msg.toRoom).emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});

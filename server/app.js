const express     = require('express');
const app         = express();
const http        = require('http').createServer(app);
const io          = require('socket.io')(http);
const position    = [];
const roomList    = [];
const playerList  = {};

io.on('connection', (socket) => {
  socket.on('user sign-in', (username) => {
    playerList[socket.id] = username;
    socket.emit('user sign-in',  { usersInRoom: roomList, users: playerList });
    socket.broadcast.emit('user sign-in', { usersInRoom: roomList, users: playerList });
  });

  socket.on('user join room', (user) => {
    console.log('joiiiiiin');
    roomList.push(user);
    socket.broadcast.emit('user join room', roomList);
  });

  socket.on('game start', (msg) => {
    randomData();
    socket.emit('game started', position);
    socket.broadcast.emit('game started', position);
  });
});

function randomData() {
  for(let i = 0; i < 10; i++){
    const newPos = Math.floor(Math.random() * 5);
    position.push(newPos);
  }
}

http.listen(3000, () => console.log('server started'));

const express     = require('express');
const app         = express();
const http        = require('http').createServer(app);
const io          = require('socket.io')(http);
let position      = [];
let roomList      = [];
let playerList    = {};

io.on('connection', (socket) => {
  socket.on('user sign-in', (username) => {
    playerList[username] = username;
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

  socket.on('game finish', (user) => {
    console.log(user);
    playerList[user.username] = user;
    let winner = '';
    let winnerScore = 0;
    for (let player in playerList) {
      console.log(playerList[player]);
      if (playerList[player].score > winnerScore) {
        winnerScore = playerList[player].score;
        winner = playerList[player].username;
      }
    }
    socket.emit('winner', winner);
    setTimeout(() => {
      position      = [];
      roomList      = [];
      playerList    = {};
    }, 1000);
  })
});

function randomData() {
  for(let i = 0; i < 100; i++){
    const newPos = Math.floor(Math.random() * 6);
    position.push(newPos);
  }
}

http.listen(3000, () => console.log('server started'));

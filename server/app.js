const express     = require('express');
const app         = express();
const http        = require('http').createServer(app);
const io          = require('socket.io')(http);
const position    = [];
let   playerList  = {};

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('game start', (msg) => {
    playerList = msg;
    randomData();
    socket.emit('game started', position);
  });
});

function randomData() {
  for(let i = 0; i < 10; i++){
    const newPos = Math.floor(Math.random() * 5);
    position.push(newPos);
  }
}

http.listen(3000, () => console.log('server started'));

<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light">
      <span class="navbar-brand mb-0 h1">Mole Gimang</span>
    </nav>
    <div class="container">
      <div class="row justify-content-md-center">
          <div class="col-md-auto" v-if="!user.isSignIn">
            Welcome, welcome! Input your name to enter lobby.
            <form  @submit.prevent="signIn">
              <div class="input-group flex-nowrap">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="addon-wrapping">@</span>
                </div>
                <input type="text" class="form-control" placeholder="Username"
                  v-model="user.username"
                  aria-label="Username" aria-describedby="addon-wrapping"
                >
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
          <div class="col-md-auto" v-if="user.isSignIn">
            Welcome, {{user.username}}!
            <h1>Untuk sementara bisa liat position yg di random kalau click Start</h1>
            <div class="card  mb-5" style="width: 18rem;">
              <div class="card-header">
                Lobby
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"
                  v-for="(guest, index) in guestList" :key="index"
                >
                  {{guest}}
                </li>
              </ul>
            </div>
            <div class="card" style="width: 18rem;">
              <div class="card-header">
                Game Room
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"
                  v-for="(user, index) in gameRoom.users" :key="index"
                >
                  {{user}}
                </li>
                <li class="list-group-item"
                  v-if="!gameRoom.users.length"
                >
                  Room is empty.
                </li>
              </ul>
              <div v-if="user.room === 'lobby' && gameRoom.users.length < 2" class="btn btn-primary"
                @click.prevent="joinRoom"
              >
                Join
              </div>
              <div v-if="user.roomMaster" class="btn btn-primary"
                @click.prevent="gameStart"
              >
                Start Playing
              </div>
            </div>
          </div>
      </div>
      <div class="row">
        <div class="col">
        </div>
        <div class="col-2 bg-info"
          v-for="(dt, index) in data" :key="index"
          @click="panggil">{{ dt }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

const url = 'http://localhost:3000';
const socket = io(url);

export default {
  name: 'app',
  data() {
    return {
      user: {
        username: '',
        room: 'lobby',
        isSignIn: false,
        roomMaster: false,
      },
      gameRoom: {
        name: 'room 1',
        users: [],
      },
      guestList: [],
      data: [],
    };
  },
  methods: {
    signIn() {
      socket.emit('user sign-in', this.user.username);
      this.user.isSignIn = true;
      this.guestList.push(this.user.username);
    },
    joinRoom() {
      this.gameRoom.users.push(this.user.username);
      this.user.room = this.gameRoom.name;
      if (this.gameRoom.users.length === 1) this.users.roomMaster = true;
    },
    panggil() {
      socket.emit('dari client', 'hello');
      this.$store.dispatch('randomData');
    },
    gameStart() {
      if (this.gameRoom.users.length < 2) {
        // popup user kurang, tunggu pemain lain.
      } else {
        socket.emit('game start', 'afif');
      }
    },
  },
  watch: {
  },
  created() {
    this.$store.dispatch('randomData');
    socket.on('game started', (rand) => {
      this.data = rand;
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

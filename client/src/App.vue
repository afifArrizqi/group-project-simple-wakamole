<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light">
      <span class="navbar-brand mb-0 h1">Mole Gimang</span>
    </nav>
    <div class="container">
      <div class="row justify-content-md-center">
          <div class="col-md-auto" v-if="!this.$store.state.user.isSignIn">
            Welcome, welcome! Input your name to enter lobby.
            <form  @submit.prevent="signIn">
              <div class="input-group flex-nowrap">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="addon-wrapping">@</span>
                </div>
                <input type="text" class="form-control" placeholder="Username"
                  v-model="username"
                  aria-label="Username" aria-describedby="addon-wrapping"
                >
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
          <div class="col-md-auto" v-if="this.$store.state.user.isSignIn">
            Welcome, {{username}}!
            <div class="card  mb-5" style="width: 18rem;">
              <div class="card-header">
                Lobby
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"
                  v-for="(guest, index) in this.$store.state.guestList" :key="index"
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
                  v-for="(user, index) in this.$store.state.gameRoom.users" :key="index"
                >
                  {{user}}
                </li>
                <li class="list-group-item"
                  v-if="!this.$store.state.gameRoom.users.length"
                >
                  Room is empty.
                </li>
              </ul>
              <div
                v-if="this.$store.state.user.room === 'lobby'
                  && this.$store.state.gameRoom.users.length < 5"
                class="btn btn-primary"
                @click.prevent="joinRoom"
              >
                Join
              </div>
              <div v-if="this.$store.state.user.roomMaster &&
                this.$store.state.user.room !== 'lobby'"
                class="btn btn-primary"
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
  <!-- game -->
  <div>
      <h1 class="text-center">Smash a Corona</h1>
      <p class="lead text-center">Score: {{ this.$store.state.user.score }}</p>
      <div class="container">
        <div v-if="this.isMuncul[0].isMuncul" class="tanah muncul"
          @click="clickTikus(this.isMuncul[0].isMuncul)">
          <div class="tikus"></div>
        </div>
        <div v-else class="tanah">
          <div class="tikus"></div>
        </div>
        <div v-if="this.isMuncul[1].isMuncul" class="tanah muncul"
          @click="clickTikus(this.isMuncul[1].isMuncul)">
          <div class="tikus"></div>
        </div>
        <div v-else class="tanah">
          <div class="tikus"></div>
        </div>
        <div v-if="this.isMuncul[2].isMuncul" class="tanah muncul"
          @click="clickTikus(this.isMuncul[2].isMuncul)">
          <div class="tikus"></div>
        </div>
        <div v-else class="tanah">
          <div class="tikus"></div>
        </div>
        <div v-if="this.isMuncul[3].isMuncul" class="tanah muncul"
          @click="clickTikus(this.isMuncul[3].isMuncul)">
          <div class="tikus"></div>
        </div>
        <div v-else class="tanah">
          <div class="tikus"></div>
        </div>
        <div v-if="this.isMuncul[4].isMuncul" class="tanah muncul"
          @click="clickTikus(this.isMuncul[4].isMuncul)">
          <div class="tikus"></div>
        </div>
        <div v-else class="tanah">
          <div class="tikus"></div>
        </div>
        <div v-if="this.isMuncul[5].isMuncul" class="tanah muncul"
          @click="clickTikus(this.isMuncul[5].isMuncul)">
          <div class="tikus"></div>
        </div>
        <div v-else class="tanah">
          <div class="tikus"></div>
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
      username: '',
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
      isMulai: false,
      isSelesai: false,
      isMuncul: [
        {
          isMuncul: false,
        },
        {
          isMuncul: false,
        },
        {
          isMuncul: false,
        },
        {
          isMuncul: false,
        },
        {
          isMuncul: false,
        },
        {
          isMuncul: false,
        },
      ],
    };
  },
  methods: {
    signIn() {
      socket.emit('user sign-in', this.username);
      this.$store.dispatch('userSignIn', this.username);
    },
    joinRoom() {
      this.$store.dispatch('addUserToRoom', this.username);
      socket.emit('user join room', this.username);
    },
    panggil() {
      socket.emit('dari client', 'hello');
      this.$store.dispatch('randomData');
    },
    gameStart() {
      if (this.$store.state.gameRoom.users.length < 2) {
        // popup user kurang, tunggu pemain lain.
      } else {
        socket.emit('game start', 'afif');
      }
    },
    munculkanTikus(st) {
      this.isMulai = true;
      let tRandom = this.$store.state.data[st];
      // let tRandom = Math.floor(Math.random() * 6);
      const wRandom = this.randomWaktu(400, 500);
      // console.log(this.isMuncul[tRandom].isMuncul);
      if (tRandom === 6) {
        tRandom -= 1;
      } else {
        this.isMuncul[tRandom].isMuncul = true;
        setTimeout(() => {
          this.isMuncul[tRandom].isMuncul = false;
          if (!this.isSelesai) {
            const a = st + 1;
            this.munculkanTikus(a);
          }
        }, wRandom);
      }
    },
    randomWaktu(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    mulai() {
      const st = 0;
      this.munculkanTikus(st);
      setTimeout(() => {
        this.isSelesai = true;
        this.isMulai = false;
      }, 30000); //  ini durasi permainan, satuan ms
    },
    clickTikus(adaTikus) {
      if (adaTikus) {
        this.$store.dispatch('addScore');
      }
    },
  },
  watch: {
  },
  created() {
    this.$store.dispatch('randomData');
    socket.on('game started', (rand) => {
      this.$store.dispatch('randomData', rand);
      this.mulai();
    });

    socket.on('user sign-in', (users) => {
      this.$store.dispatch('patchGuestList', users.users);
      this.$store.dispatch('patchGameRoomUsers', users.usersInRoom);
    });

    socket.on('user join room', (users) => {
      this.$store.dispatch('patchGameRoomUsers', users);
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

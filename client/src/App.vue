<template>
  <div id="app">
    <div class="btn btn-primary" @click="gameStart">Start</div>
    <h1>Untuk sementara bisa liat position yg di random kalau click Start</h1>
    <div class="container">
      <div class="row">
        <div class="col-2 bg-info"
          v-for="(dt, index) in data" :key="index"
          @click="panggil">{{ dt }}
        </div>
      </div>
    </div>
  <!-- game -->
  <div>
      <h1 class="text-center">Smash a Corona</h1>
      <h1>
        <a v-if="!isMulai" class="text-center">
          <button id="tombolMulai"
          type="button" class="btn btn-primary hvr-pulse-shrink" @click="mulai">Start Game
          </button>
        </a>
      </h1>
      <div class="container">
        <div v-if="this.isMuncul[0].isMuncul" class="tanah muncul">
          <div class="tikus"></div>
        </div>
        <div v-else class="tanah">
          <div class="tikus"></div>
        </div>
        <div v-if="this.isMuncul[1].isMuncul" class="tanah muncul">
          <div class="tikus"></div>
        </div>
        <div v-else class="tanah">
          <div class="tikus"></div>
        </div>
        <div v-if="this.isMuncul[2].isMuncul" class="tanah muncul">
          <div class="tikus"></div>
        </div>
        <div v-else class="tanah">
          <div class="tikus"></div>
        </div>
        <div v-if="this.isMuncul[3].isMuncul" class="tanah muncul">
          <div class="tikus"></div>
        </div>
        <div v-else class="tanah">
          <div class="tikus"></div>
        </div>
        <div v-if="this.isMuncul[4].isMuncul" class="tanah muncul">
          <div class="tikus"></div>
        </div>
        <div v-else class="tanah">
          <div class="tikus"></div>
        </div>
        <div v-if="this.isMuncul[5].isMuncul" class="tanah muncul">
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
    panggil() {
      socket.emit('dari client', 'hello');
      this.$store.dispatch('randomData');
    },
    gameStart() {
      socket.emit('game start', 'afif');
    },
    munculkanTikus() {
      this.isMulai = true;
      let tRandom = Math.floor(Math.random() * 6);
      const wRandom = this.randomWaktu(400, 500);
      console.log(this.isMuncul[tRandom].isMuncul);
      if (tRandom === 6) {
        tRandom -= 1;
      } else {
        this.isMuncul[tRandom].isMuncul = true;
        setTimeout(() => {
          this.isMuncul[tRandom].isMuncul = false;
          if (!this.isSelesai) {
            this.munculkanTikus();
          }
        }, wRandom);
      }
    },
    randomWaktu(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    mulai() {
      this.munculkanTikus();
      setTimeout(() => {
        this.isSelesai = true;
        this.isMulai = false;
      }, 30000); //  ini durasi permainan, satuan ms
    },
  },
  watch: {
  },
  created() {
    this.$store.dispatch('randomData');
    socket.on('game started', (rand) => {
      this.data = rand;
    });
    if (this.isMunculkanTikus) {
      console.log(this.tanah);
    }
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

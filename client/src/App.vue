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

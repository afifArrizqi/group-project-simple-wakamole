import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
    isStart: false,
    user: {
      username: '',
      room: 'lobby',
      isSignIn: false,
      roomMaster: false,
      score: 0,
    },
    gameRoom: {
      name: 'room 1',
      users: [],
    },
    guestList: {},
  },
  mutations: {
    isStart(state) {
      state.isStart = true;
    },
    randomData(state, payload) {
      state.data = payload;
    },
    userSignIn(state, payload) {
      state.user.isSignIn = true;
      state.user.username = payload;
    },
    patchGuestList(state, users) {
      state.guestList = users;
    },
    patchGameRoomUsers(state, users) {
      state.gameRoom.users = users;
      // cadangan
      console.log(state.user.username);
      if (state.gameRoom.users[0] === state.user.username) state.user.roomMaster = true;
    },
    addUserToRoom(state, username) {
      console.log('addTOUserRoom');
      state.gameRoom.users.push(username);
      state.user.room = state.gameRoom.name;
      console.log(state.gameRoom.users);
    },
    addScore(state) {
      state.user.score += 1;
    },
  },
  actions: {
    isStart(context) {
      context.commit('isStart');
    },
    randomData(context, payload) {
      context.commit('randomData', payload);
    },
    userSignIn(context, payload) {
      context.commit('userSignIn', payload);
    },
    patchGuestList(context, users) {
      context.commit('patchGuestList', users);
    },
    patchGameRoomUsers(context, users) {
      context.commit('patchGameRoomUsers', users);
    },
    addUserToRoom(context, username) {
      context.commit('addUserToRoom', username);
    },
    addScore(context) {
      context.commit('addScore');
    },
  },
  modules: {
  },
});

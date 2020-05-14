import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
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
  },
  mutations: {
    randomData(state, payload) {
      state.data = payload;
    },
    userSignIn(state) {
      state.user.isSignIn = true;
    },
    patchGuestList(state, users) {
      state.guestList = users;
    },
    patchGameRoomUsers(state, users) {
      state.gameRoom.users = users;
      // cadangan
      if (state.gameRoom.users.length === 1) state.user.roomMaster = true;
    },
    addUserToRoom(state, username) {
      state.gameRoom.users.push(username);
      state.user.room = state.gameRoom.name;
    },
  },
  actions: {
    randomData(context, payload) {
      context.commit('randomData', payload);
    },
    userSignIn(context) {
      context.commit('userSignIn');
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
  },
  modules: {
  },
});

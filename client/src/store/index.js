import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
  },
  mutations: {
    randomData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    randomData(context, payload) {
      context.commit('randomData', payload);
    },
  },
  modules: {
  },
});

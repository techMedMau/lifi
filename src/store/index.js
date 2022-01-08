import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: null
  },
  actions: {
    getInitialId(context, id){
      context.commit('setId', id)
    }
  },
  mutations: {
    setId(state, id){
      state.id = id+1;
    }
  },
})

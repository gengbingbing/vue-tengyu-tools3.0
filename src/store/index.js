import Vue from 'vue'
import Vuex from 'vuex'
import e2e from './modules/e2e'

Vue.use(Vuex)


const store = new Vuex.Store({
  ...e2e
})

export default store

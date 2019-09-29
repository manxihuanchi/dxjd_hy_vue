import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartData: []
  },

  getters: {
    //在Vuex里面进行数据计算,组件中直接通过mapGetter获取
    careData(state) {
      return state.cartData = cartData;
    }
  },

  actions: {
    getCartData({commit}) {
      Vue.prototype.$axios.post(url)
        .then(res => {
          commit("GET_CART_DATA",{cartData:res.data.data})
        })
    }
  },

  mutations: {
    GET_CART_DATA(state, {cartData}) {
      return state.cartData = cartData;
    }
  }

 })

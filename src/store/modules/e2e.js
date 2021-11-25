export default {
  // 创建命名空间
  namespaced: true,
  // 存储变量
  state: {
    productInfo: {
      domain: 'DOM-001',
    },
    piInfo: {}
  },
  // 定义修改state方法
  mutations: {
    changeProductInfo: (state, params) => {
      state.productInfo = params
    },
    changePiInfo: (state, params) => {
      state.piInfo = params
    },
  },
  actions: {
    changeProductInfo(context, data) {
      context.commit('changeProductInfo', data)
    },
    changePiInfo(context, data) {
      context.commit('changePiInfo', data)
    }
  },
  getters: {
    productInfo: state => state.productInfo,
    piInfo: state => state.piInfo,
  }
}
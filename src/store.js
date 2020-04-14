import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 我的课程
    workStatus: 1,
    // 到校查询
    arriveStatus: 1,
    // 手环中心
    handStatus: 1,
    // 用户中心
    userStatus: 1,
    // 体育课
    sportStatus: 1
  },
  mutations: {

  },
  actions: {

  }
})

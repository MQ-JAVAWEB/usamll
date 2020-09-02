import {
  requestUserList,
  requestUserTotal
} from "../../util/request"

const state = {
  userList: [],
  page: 1,
  size: 2,
  // 获取管理员总数
  total: 0
}

const mutations = {
  changeList(state, arr) {
    state.userList = arr
  },
  changeTotal(state, num) {
    state.total = num
  },
  changePage(state, num) {
    state.page = num
  }
}

const actions = {
  userListAction(context) {
    requestUserList({
      page: context.state.page,
      size: context.state.size
    }).then(res => {
      context.commit('changeList', res.data.list)
    })
  },
  getUserTotalAction(context) {
    requestUserTotal().then(res => {
      context.commit('changeTotal', res.data.list[0].total)
    })
  },
  userPageActions(context,page){
    context.commit('changePage',page);
    context.dispatch('userListAction')
  }

}

const getters = {
  userList(state) {
    return state.userList;
  },
  userTotal(state) {
    return state.total;
  },
  userSize(state) {
    return state.size
  },
  userPage(state){
    return state.page
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}

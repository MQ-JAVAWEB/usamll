const state = {
  loginInfo: sessionStorage.getItem('info') ? JSON.parse(sessionStorage.getItem('info')) : {}
}

const mutations = {
  changeInfo(state, info) {
    state.loginInfo = info;
    if (info.username) {
      sessionStorage.setItem('info', JSON.stringify(info))
    } else {
      sessionStorage.removeItem('info')
    }
  }
}


const actions = {
  loginAction(context, info) {
    context.commit('changeInfo', info)
  }
}

const getters = {
  loginInfo(state) {
    return state.loginInfo
  }
}


export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}

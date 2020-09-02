import { requestSeckList } from "../../util/request"

const state = {
  seckList:[]
}

const mutations = {
  changeList(state,arr){
    state.seckList = arr
  }
}

const actions = {
  seckListAction(context){
    requestSeckList().then(res=>{
      context.commit('changeList',res.data.list)
    })
  }
}

const getters = {
  seckList(state){
    return state.seckList
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}